const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

function setupCloudTestEnv(mockFetchImpl) {
  const storageMap = new Map();
  const localStorageMock = {
    getItem: k => (storageMap.has(k) ? storageMap.get(k) : null),
    setItem: (k, v) => storageMap.set(k, String(v)),
    removeItem: k => storageMap.delete(k),
    clear: () => storageMap.clear()
  };

  const listeners = new Map();
  const elements = new Map();
  const makeEl = (id) => {
    const el = {
      id,
      style: {},
      textContent: '',
      classList: {
        _set: new Set(),
        add(c) { this._set.add(c); },
        remove(c) { this._set.delete(c); },
        contains(c) { return this._set.has(c); },
        toggle(c, f) { if (f) this._set.add(c); else this._set.delete(c); }
      },
      addEventListener() {},
      querySelector() { return makeEl('sub'); },
      querySelectorAll() { return []; }
    };
    if (id) elements.set(id, el);
    return el;
  };

  global.CustomEvent = class CustomEvent { constructor(type, detail) { this.type = type; this.detail = detail; } };
  global.localStorage = localStorageMock;
  global.navigator = { onLine: true };
  global.document = {
    hidden: false,
    body: makeEl('body'),
    getElementById: id => elements.get(id) || null,
    createElement: () => makeEl('dyn'),
    addEventListener: () => {}
  };
  global.window = {
    localStorage: localStorageMock,
    document: global.document,
    addEventListener: (ev, fn) => {
      listeners.set(ev, [...(listeners.get(ev) || []), fn]);
    },
    dispatchEvent: (evObj) => {
      const fns = listeners.get(evObj.type) || [];
      fns.forEach(fn => fn(evObj));
    },
    NANXIAO_SUSHUA_VOCAB: [],
    KAOYAN_VOCAB_DICT: {},
    KAOYAN_VOCAB_BANK: [],
    KAOYAN_VOCAB_RELATIONS: {}
  };
  global.fetch = mockFetchImpl;

  const storageJs = fs.readFileSync(path.join(__dirname, '../js/storage.js'), 'utf8');
  const vocabJs = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');
  const cloudJs = fs.readFileSync(path.join(__dirname, '../js/cloud_sync.js'), 'utf8');

  eval(storageJs);
  eval(vocabJs);
  eval(cloudJs);

  return { storageMap, listeners, cloudJs };
}

test('CloudSync Security: Only uses public publishable key, never embeds secret key', () => {
  const cloudJs = fs.readFileSync(path.join(__dirname, '../js/cloud_sync.js'), 'utf8');
  assert.ok(cloudJs.includes('sb_publishable_tCA4qx0caaXzIqV_kFmaTQ_FTeB42VZ'));
  assert.ok(!cloudJs.includes('sb_secret_'), 'Secret key must NEVER be placed in frontend code');
});

test('CloudSync Two-Way Sync: Sign-in pulls cloud row, merges with local offline progress, and pushes superset back', async () => {
  const now = Date.now();
  const requests = [];
  let cloudDbRow = {
    user_id: 'uid-123',
    vocab_book: [{ word: 'resilient', def: 'adj. 有弹性的', sentence: 'Cloud sentence.', year: '2020', textId: '2', time: now - 1000 }],
    progress: {
      resilient: { status: 'mastered', level: 11, lastReviewTime: now - 1000, nextReviewTime: now + 864000000, reviewCount: 4 }
    },
    user_notes: { resilient: 'Cloud note' },
    daily_log: { date: '2026-11-20', newLearned: ['resilient'], reviewed: [], history: {} },
    updated_at: new Date(now - 1000).toISOString()
  };

  const mockFetch = async (url, opts = {}) => {
    requests.push({ url, method: opts.method || 'GET', body: opts.body ? JSON.parse(opts.body) : null });

    if (url.includes('/auth/v1/token?grant_type=password')) {
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify({
          access_token: 'jwt-abc',
          refresh_token: 'ref-xyz',
          expires_in: 3600,
          user: { id: 'uid-123', email: 'student@example.com' }
        })
      };
    }

    if (url.includes('/rest/v1/user_sync_data?user_id=eq.uid-123')) {
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify(cloudDbRow ? [cloudDbRow] : [])
      };
    }

    if (url.includes('/rest/v1/user_sync_data?on_conflict=user_id')) {
      cloudDbRow = JSON.parse(opts.body);
      return {
        ok: true,
        status: 201,
        text: async () => JSON.stringify([cloudDbRow])
      };
    }

    return { ok: false, status: 404, text: async () => '{}' };
  };

  const { storageMap } = setupCloudTestEnv(mockFetch);

  // Seed local device with offline word 'substantial' before login
  storageMap.set('KAOYAN_VOCAB_PROGRESS_V2', JSON.stringify({
    substantial: { status: 'learning', level: 2, lastReviewTime: now - 200, nextReviewTime: now + 3600000, reviewCount: 2 }
  }));
  window.StorageModule.addWordToBook('abandon', 'v. 放弃', 'Local sentence.', '2018', '1', 1, 1);

  // Sign in & trigger automatic two-way sync
  await window.CloudSyncModule.signIn('student@example.com', 'secret123');

  // Verify local storage now has BOTH cloud & local words!
  const localBook = window.StorageModule.getVocabBook();
  assert.strictEqual(localBook.length, 2, 'Local vocab book should have merged cloud + local words');
  assert.ok(localBook.some(w => w.word === 'resilient'));
  assert.ok(localBook.some(w => w.word === 'abandon'));

  const localProg = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(localProg.resilient.status, 'mastered');
  assert.strictEqual(localProg.substantial.level, 2);

  // Verify cloud row was updated with merged superset
  assert.strictEqual(cloudDbRow.vocab_book.length, 2);
  assert.ok(cloudDbRow.progress.resilient && cloudDbRow.progress.substantial);

  // Verify overwriteFromCloud removes local-only additions if user explicitly chooses it
  window.StorageModule.addWordToBook('ephemeral', 'adj. 短暂的');
  cloudDbRow.vocab_book = [{ word: 'resilient', def: 'adj. 有弹性的', sentence: 'Cloud sentence.' }];
  const restoreRes = await window.CloudSyncModule.syncNow({ overwriteFromCloud: true });
  assert.strictEqual(restoreRes.ok, true);
  assert.strictEqual(window.StorageModule.getVocabBook().length, 1);
  assert.strictEqual(window.StorageModule.getVocabBook()[0].word, 'resilient');
});

test('CloudSync Missing Table Handling: Gracefully explains PGRST205 error without crashing', async () => {
  const mockFetch = async (url) => {
    if (url.includes('/rest/v1/user_sync_data')) {
      return {
        ok: false,
        status: 404,
        text: async () => JSON.stringify({
          code: 'PGRST205',
          message: "Could not find the table 'public.user_sync_data' in the schema cache"
        })
      };
    }
    return { ok: true, status: 200, text: async () => '{}' };
  };

  const { storageMap } = setupCloudTestEnv(mockFetch);
  storageMap.set('KAOYAN_CLOUD_SESSION_V1', JSON.stringify({
    access_token: 'jwt-valid',
    refresh_token: 'ref',
    expires_at: Date.now() + 3600000,
    user: { id: 'uid-1', email: 'a@b.com' }
  }));

  const res = await window.CloudSyncModule.syncNow({ reason: 'manual' });
  assert.strictEqual(res.ok, false);
  assert.ok(res.message.includes('user_sync_data'), 'Must surface clear setup hint for missing table');
});
