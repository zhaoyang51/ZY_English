const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

function setupForecastEnv() {
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
      attrs: {},
      classList: {
        _set: new Set(),
        add(c) { this._set.add(c); },
        remove(c) { this._set.delete(c); },
        contains(c) { return this._set.has(c); },
        toggle(c, f) {
          if (f === undefined) {
            if (this._set.has(c)) this._set.delete(c);
            else this._set.add(c);
          } else if (f) {
            this._set.add(c);
          } else {
            this._set.delete(c);
          }
        }
      },
      set innerHTML(val) {
        this._html = String(val);
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
      setAttribute(k, v) { this.attrs[k] = v; },
      getAttribute(k) { return this.attrs[k] || ''; },
      appendChild(c) { this.children.push(c); return c; },
      querySelector(sel) {
        if (sel.startsWith('#')) return elements.get(sel.slice(1)) || null;
        return null;
      },
      querySelectorAll(sel) {
        if (sel === '.vocab-fc-day-col') {
          return [...this._html.matchAll(/data-day-idx="(\d+)"/g)].map(m => {
            const btn = makeEl('', 'button');
            btn.setAttribute('data-day-idx', m[1]);
            return btn;
          });
        }
        return [];
      }
    };
    if (id) elements.set(id, el);
    return el;
  };

  makeEl('vocabSection');
  const srcSel = makeEl('vocabSourceSelect', 'select');
  srcSel.options = [{ value: 'nanxiao_sushua', textContent: '高频' }];

  global.CustomEvent = class CustomEvent { constructor(type, detail) { this.type = type; this.detail = detail; } };
  global.localStorage = localStorageMock;
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
      { word: 'alpha', meaning: 'n. 阿尔法', freq: 10 },
      { word: 'bravo', meaning: 'n. 喝彩', freq: 9 },
      { word: 'charlie', meaning: 'n. 查理', freq: 8 },
      { word: 'delta', meaning: 'n. 三角洲', freq: 7 },
      { word: 'echo', meaning: 'n. 回声', freq: 6 },
      { word: 'foxtrot', meaning: 'n. 狐步舞', freq: 5 },
      { word: 'golf', meaning: 'n. 高尔夫', freq: 4 },
      { word: 'hotel', meaning: 'n. 旅馆', freq: 3 },
      { word: 'india', meaning: 'n. 印第安', freq: 2 }
    ],
    KAOYAN_VOCAB_DICT: {},
    KAOYAN_VOCAB_BANK: [],
    KAOYAN_VOCAB_RELATIONS: {}
  };

  eval(fs.readFileSync(path.join(__dirname, '../js/storage.js'), 'utf8'));
  eval(fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8'));

  return { storageMap, elements };
}

test('Ebbinghaus Intervals: Level 0 5-minute interval is removed; minimum reset interval is 12 hours', () => {
  const vocabSource = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');
  assert.ok(!vocabSource.includes('5 * 60 * 1000'), '5-minute interval must be removed from EBB_INTERVALS');

  const { storageMap } = setupForecastEnv();
  window.VocabModule.init('vocabSection');
  window.VocabModule.showStudyView('new');

  const before = Date.now();
  window.VocabModule.gradeWord('forgot');
  const progAfterForgot = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  const deltaForgot = progAfterForgot.alpha.nextReviewTime - before;
  assert.strictEqual(progAfterForgot.alpha.level, 0);
  assert.ok(deltaForgot >= 11.9 * 3600 * 1000 && deltaForgot <= 12.1 * 3600 * 1000, `Forgot interval must be ~12h, got ${deltaForgot}`);

  // handleMarkWrong must also schedule ~12h instead of 5 minutes
  window.VocabModule.handleMarkWrong();
  const progAfterWrong = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  const deltaWrong = progAfterWrong.alpha.nextReviewTime - before;
  assert.ok(deltaWrong >= 11.9 * 3600 * 1000 && deltaWrong <= 12.1 * 3600 * 1000, `Wrong interval must be ~12h, got ${deltaWrong}`);

  // Grading 'good' on level 0 advances to level 1 (1 day)
  window.VocabModule.showStudyView('new');
  const beforeGood = Date.now();
  window.VocabModule.gradeWord('good');
  const progAfterGood = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(progAfterGood.bravo.level, 1);
  const deltaGood = progAfterGood.bravo.nextReviewTime - beforeGood;
  assert.ok(deltaGood >= 23.9 * 3600 * 1000 && deltaGood <= 24.1 * 3600 * 1000, `Level 1 interval must be ~24h (1 day), got ${deltaGood}`);
});

test('8-Day Review Forecast: Computes exact daily buckets for next 8 days and renders modal', () => {
  const { storageMap, elements } = setupForecastEnv();
  // Anchor "now" at local 10:00 AM so today +1h is still same day
  const d = new Date(2026, 10, 23, 10, 0, 0); // 2026-11-23 10:00:00
  const now = d.getTime();
  const DAY = 24 * 60 * 60 * 1000;
  const midnight = new Date(2026, 10, 23, 0, 0, 0).getTime();

  storageMap.set('KAOYAN_VOCAB_PROGRESS_V2', JSON.stringify({
    alpha: { status: 'learning', level: 0, nextReviewTime: now - 3600000 },       // Day 0 overdue
    bravo: { status: 'learning', level: 0, nextReviewTime: now + 3 * 3600000 },   // Day 0 later today (13:00)
    charlie: { status: 'learning', level: 1, nextReviewTime: midnight + 1 * DAY + 9 * 3600000 }, // Day 1 (tomorrow)
    delta: { status: 'learning', level: 2, nextReviewTime: midnight + 2 * DAY + 9 * 3600000 },   // Day 2
    echo: { status: 'learning', level: 5, nextReviewTime: midnight + 5 * DAY + 9 * 3600000 },    // Day 5
    foxtrot: { status: 'learning', level: 7, nextReviewTime: midnight + 7 * DAY + 9 * 3600000 }, // Day 7
    golf: { status: 'learning', level: 9, nextReviewTime: midnight + 9 * DAY + 9 * 3600000 },    // Beyond 8 days
    hotel: { status: 'mastered', level: 10, nextReviewTime: now - 1000 }          // Mastered -> excluded
    // india: unlearned ('new') -> excluded
  }));

  window.VocabModule.init('vocabSection');

  const forecast = window.VocabModule.getReviewForecast(8, 'current', now);
  assert.strictEqual(forecast.days.length, 8);
  assert.strictEqual(forecast.overdueNow, 1, 'Only alpha is already overdue at 10:00 AM');
  assert.strictEqual(forecast.beyondWindowCount, 1, 'golf is beyond 8-day window');

  assert.strictEqual(forecast.days[0].shortLabel, '今天');
  assert.strictEqual(forecast.days[0].count, 2);
  assert.strictEqual(forecast.days[0].overdueCount, 1);
  assert.deepStrictEqual(forecast.days[0].words.map(w => w.word), ['alpha', 'bravo']);

  assert.strictEqual(forecast.days[1].shortLabel, '明天');
  assert.strictEqual(forecast.days[1].count, 1);
  assert.strictEqual(forecast.days[1].words[0].word, 'charlie');

  assert.strictEqual(forecast.days[2].shortLabel, '后天');
  assert.strictEqual(forecast.days[2].count, 1);
  assert.strictEqual(forecast.days[2].words[0].word, 'delta');

  assert.strictEqual(forecast.days[3].count, 0);
  assert.strictEqual(forecast.days[4].count, 0);
  assert.strictEqual(forecast.days[5].count, 1);
  assert.strictEqual(forecast.days[6].count, 0);
  assert.strictEqual(forecast.days[7].count, 1);
  assert.strictEqual(forecast.days[7].words[0].word, 'foxtrot');

  // Verify Forecast Modal renders cleanly
  window.VocabModule.openForecastModal(0, 'current');
  assert.strictEqual(elements.get('vocabForecastModal').style.display, 'flex');
  assert.ok(elements.get('vocabForecastBody').innerHTML.includes('vocab-fc-day-col'));
});
