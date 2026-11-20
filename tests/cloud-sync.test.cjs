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

test('CloudSync Security: Only uses public publishable key, never embeds secret key, includes password eye toggle', () => {
  const cloudJs = fs.readFileSync(path.join(__dirname, '../js/cloud_sync.js'), 'utf8');
  assert.ok(cloudJs.includes('sb_publishable_tCA4qx0caaXzIqV_kFmaTQ_FTeB42VZ'));
  assert.ok(!cloudJs.includes('sb_secret_'), 'Secret key must NEVER be placed in frontend code');
  assert.ok(cloudJs.includes('id="cloudTogglePasswordBtn"'), 'Password visibility eye toggle button must exist');
  assert.ok(cloudJs.includes('cloudEyeOpenIcon') && cloudJs.includes('cloudEyeClosedIcon'));
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

test('Regression: Background cloud sync does NOT hijack active Learn queue into Review words', async () => {
  const now = Date.now();
  const cloudSnapshot = {
    user_id: 'uid-learn-fix',
    vocab_book: [],
    progress: {
      gap: { status: 'learning', level: 1, lastReviewTime: now - 5000, nextReviewTime: now - 1000, reviewCount: 1 }
    },
    last_position: {
      source: 'nanxiao_sushua',
      state: 'due',
      lastWord: 'gap',
      lastIndex: 0
    },
    updated_at: new Date(now - 5000).toISOString()
  };

  const mockFetch = async (url) => {
    if (url.includes('/rest/v1/user_sync_data?user_id=eq.')) {
      return { ok: true, status: 200, text: async () => JSON.stringify([cloudSnapshot]) };
    }
    if (url.includes('/rest/v1/user_sync_data?on_conflict=user_id')) {
      return { ok: true, status: 201, text: async () => JSON.stringify([cloudSnapshot]) };
    }
    return { ok: true, status: 200, text: async () => '{}' };
  };

  // Minimal DOM supporting innerHTML & getElementById so VocabModule.init runs
  const storageMap = new Map();
  const localStorageMock = {
    getItem: k => (storageMap.has(k) ? storageMap.get(k) : null),
    setItem: (k, v) => storageMap.set(k, String(v)),
    removeItem: k => storageMap.delete(k),
    clear: () => storageMap.clear()
  };
  const elements = new Map();
  const makeEl = (id, tag = 'div') => {
    const el = {
      id,
      tagName: tag.toUpperCase(),
      style: {},
      options: [],
      children: [],
      value: '',
      _html: '',
      textContent: '',
      classList: {
        _set: new Set(),
        add(c) { this._set.add(c); },
        remove(c) { this._set.delete(c); },
        contains(c) { return this._set.has(c); },
        toggle(c, f) { if (f) this._set.add(c); else this._set.delete(c); }
      },
      set innerHTML(val) {
        this._html = String(val);
        // Register child ids crudely so getElementById finds them
        const idMatches = [...this._html.matchAll(/id="([^"]+)"/g)];
        for (const m of idMatches) {
          if (!elements.has(m[1])) makeEl(m[1]);
        }
        if (this.tagName === 'SELECT') {
          const matches = [...this._html.matchAll(/<option\s+value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/g)];
          this.options = matches.map(m => ({ value: m[1], textContent: m[2] }));
        }
      },
      get innerHTML() { return this._html; },
      addEventListener() {},
      removeEventListener() {},
      setAttribute() {},
      getAttribute() { return ''; },
      appendChild(c) { this.children.push(c); return c; },
      querySelector() { return makeEl(''); },
      querySelectorAll() { return []; }
    };
    if (id) elements.set(id, el);
    return el;
  };
  makeEl('vocabSection');
  const srcSel = makeEl('vocabSourceSelect', 'select');
  srcSel.options = [{ value: 'nanxiao_sushua', textContent: '高频' }];

  global.CustomEvent = class CustomEvent { constructor(type, detail) { this.type = type; this.detail = detail; } };
  global.localStorage = localStorageMock;
  global.navigator = { onLine: true };
  global.document = {
    hidden: false,
    body: makeEl('body'),
    getElementById: id => elements.get(id) || null,
    createElement: tag => makeEl('', tag),
    querySelectorAll: () => [],
    addEventListener: () => {}
  };
  global.window = {
    localStorage: localStorageMock,
    document: global.document,
    addEventListener: () => {},
    dispatchEvent: () => {},
    speechSynthesis: { cancel: () => {}, speak: () => {} },
    NANXIAO_SUSHUA_VOCAB: [
      { word: 'gap', meaning: 'n. 缺口', freq: 39, category: '核心高频 (20次以上)' },
      { word: 'consequence', meaning: 'n. 结果', freq: 7, category: '中频考词 (5-9次)' },
      { word: 'resilient', meaning: 'adj. 有弹性的', freq: 8, category: '中频考词 (5-9次)' }
    ],
    KAOYAN_VOCAB_DICT: {},
    KAOYAN_VOCAB_BANK: [],
    KAOYAN_VOCAB_RELATIONS: {}
  };
  global.fetch = mockFetch;

  eval(fs.readFileSync(path.join(__dirname, '../js/storage.js'), 'utf8'));
  eval(fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8'));
  eval(fs.readFileSync(path.join(__dirname, '../js/cloud_sync.js'), 'utf8'));

  // Seed local progress: gap is ALREADY in learning/review; consequence is unlearned (new)
  storageMap.set('KAOYAN_VOCAB_PROGRESS_V2', JSON.stringify({
    gap: { status: 'learning', level: 1, lastReviewTime: now - 5000, nextReviewTime: now - 1000, reviewCount: 1 }
  }));
  storageMap.set('KAOYAN_CLOUD_SESSION_V1', JSON.stringify({
    access_token: 'jwt-valid',
    refresh_token: 'ref',
    expires_at: now + 3600000,
    user: { id: 'uid-learn-fix', email: 'a@b.com' }
  }));

  window.VocabModule.init('vocabSection');
  // User clicks Learn ("新学")
  window.VocabModule.showStudyView('new');

  assert.strictEqual(elements.get('vocabMomoWord').textContent, 'consequence', 'Initial Learn word must be consequence');
  assert.ok(elements.get('vocabMomoProgress').innerHTML.includes('新学'), 'Must show 新学 tag');

  // Now background cloud startup sync completes with last_position { state: 'due', lastWord: 'gap' }
  const syncRes = await window.CloudSyncModule.syncNow({ reason: 'startup' });
  assert.strictEqual(syncRes.ok, true);

  // Must stay on consequence in Learn queue — MUST NOT switch to Review's 'gap'!
  assert.strictEqual(elements.get('vocabMomoWord').textContent, 'consequence', 'Background sync must NOT jump Learn word to Review word gap');
  assert.ok(elements.get('vocabMomoProgress').innerHTML.includes('新学'), 'Must remain in 新学 mode');
});
