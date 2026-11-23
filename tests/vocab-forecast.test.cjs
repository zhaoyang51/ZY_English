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

test('Plan B Level 0 rules: forgot/wrong at Level 0 schedule 5 minutes and stay in Learn (新学中)', () => {
  const { storageMap, elements } = setupForecastEnv();
  window.VocabModule.init('vocabSection');
  window.VocabModule.showStudyView('new');

  // 1) alpha at Level 0 + 'forgot' -> 5 minutes later, remains status: 'new' (新学中)
  const before = Date.now();
  window.VocabModule.gradeWord('forgot');
  const progAfterForgot = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  const deltaForgot = progAfterForgot.alpha.nextReviewTime - before;
  assert.strictEqual(progAfterForgot.alpha.level, 0);
  assert.strictEqual(progAfterForgot.alpha.status, 'new');
  assert.ok(deltaForgot >= 4.9 * 60 * 1000 && deltaForgot <= 5.1 * 60 * 1000, `Level 0 forgot interval must be ~5min, got ${deltaForgot}`);

  // 2) handleMarkWrong on alpha after flipping must also schedule ~5min and stay status: 'new'
  window.VocabModule.handleMarkWrong();
  const progAfterWrong = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  const deltaWrong = progAfterWrong.alpha.nextReviewTime - before;
  assert.strictEqual(progAfterWrong.alpha.level, 0);
  assert.strictEqual(progAfterWrong.alpha.status, 'new');
  assert.ok(deltaWrong >= 4.9 * 60 * 1000 && deltaWrong <= 5.1 * 60 * 1000, `Level 0 wrong interval must be ~5min, got ${deltaWrong}`);

  // 3) alpha is still counted in Learn (all 9 words in Learn, 0 in Review & Forecast)
  window.VocabModule.showHomeView();
  assert.strictEqual(elements.get('vocabHomeCountLearn').textContent, '9');
  assert.strictEqual(elements.get('vocabHomeCountReview').textContent, '0');
  const fc = window.VocabModule.getReviewForecast(8, 'current');
  assert.strictEqual(fc.totalLearning, 0, 'Level 0 words must NOT appear in Review Forecast');

  // Re-entering Learn puts cooldown alpha after untouched words, so bravo is first
  window.VocabModule.showStudyView('new');
  assert.strictEqual(elements.get('vocabMomoWord').textContent, 'bravo', 'Cooldown alpha should move after untouched bravo');

  // Once 5 minutes elapse (nextReviewTime <= now), re-entering Learn puts alpha first
  const stored = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  stored.alpha.nextReviewTime = Date.now() - 1000;
  storageMap.set('KAOYAN_VOCAB_PROGRESS_V2', JSON.stringify(stored));
  window.VocabModule.init('vocabSection');
  const env2 = setupForecastEnv();
  env2.storageMap.set('KAOYAN_VOCAB_PROGRESS_V2', JSON.stringify(stored));
  window.VocabModule.init('vocabSection');
  window.VocabModule.showStudyView('new');
  assert.strictEqual(env2.elements.get('vocabMomoWord').textContent, 'alpha', 'Due Level 0 word must appear first after 5min cooldown');

  // 4) Grading 'good' on Level 0 advances to Level 1 (1 day) & status 'learning' (graduates out of Learn)
  const beforeGood = Date.now();
  window.VocabModule.gradeWord('good');
  const progAfterGood = JSON.parse(env2.storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(progAfterGood.alpha.level, 1);
  assert.strictEqual(progAfterGood.alpha.status, 'learning');
  const deltaGood = progAfterGood.alpha.nextReviewTime - beforeGood;
  assert.ok(deltaGood >= 23.9 * 3600 * 1000 && deltaGood <= 24.1 * 3600 * 1000, `Level 1 interval must be ~24h (1 day), got ${deltaGood}`);
});

test('8-Day Review Forecast: Computes exact daily buckets for next 8 days (excluding Level 0 new) and renders modal', () => {
  const { storageMap, elements } = setupForecastEnv();
  // Anchor "now" at local 10:00 AM so today +1h is still same day
  const d = new Date(2026, 10, 23, 10, 0, 0); // 2026-11-23 10:00:00
  const now = d.getTime();
  const DAY = 24 * 60 * 60 * 1000;
  const midnight = new Date(2026, 10, 23, 0, 0, 0).getTime();

  storageMap.set('KAOYAN_VOCAB_PROGRESS_V2', JSON.stringify({
    alpha: { status: 'learning', level: 1, nextReviewTime: now - 3600000 },       // Day 0 overdue (Lv.1)
    bravo: { status: 'learning', level: 1, nextReviewTime: now + 3 * 3600000 },   // Day 0 later today (13:00, Lv.1)
    charlie: { status: 'learning', level: 1, nextReviewTime: midnight + 1 * DAY + 9 * 3600000 }, // Day 1 (tomorrow)
    delta: { status: 'learning', level: 2, nextReviewTime: midnight + 2 * DAY + 9 * 3600000 },   // Day 2
    echo: { status: 'learning', level: 5, nextReviewTime: midnight + 5 * DAY + 9 * 3600000 },    // Day 5
    foxtrot: { status: 'learning', level: 7, nextReviewTime: midnight + 7 * DAY + 9 * 3600000 }, // Day 7
    golf: { status: 'learning', level: 9, nextReviewTime: midnight + 9 * DAY + 9 * 3600000 },    // Beyond 8 days
    hotel: { status: 'mastered', level: 10, nextReviewTime: now - 1000 },         // Mastered -> excluded
    india: { status: 'new', level: 0, nextReviewTime: now + 5 * 60 * 1000 }       // Level 0 新学中 -> excluded from Review
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
  assert.strictEqual(elements.get('vocabForecastBody').innerHTML.includes('vocab-fc-day-col'), true);
  assert.strictEqual(elements.get('vocabForecastModal').style.display, 'flex');
});

test('Review downgrade rules: forgot/wrong drop 2 levels (using pre-flip base on markWrong) and hard drops 1 level', () => {
  const { storageMap } = setupForecastEnv();
  const pastDue = Date.now() - 60000;
  storageMap.set('KAOYAN_VOCAB_PROGRESS_V2', JSON.stringify({
    alpha: { status: 'learning', level: 6, firstStudied: pastDue - 10000, lastReviewed: pastDue - 5000, nextReviewTime: pastDue, reviewCount: 5 },
    bravo: { status: 'learning', level: 6, firstStudied: pastDue - 10000, lastReviewed: pastDue - 5000, nextReviewTime: pastDue, reviewCount: 5 },
    charlie: { status: 'learning', level: 1, firstStudied: pastDue - 10000, lastReviewed: pastDue - 5000, nextReviewTime: pastDue, reviewCount: 2 },
    delta: { status: 'learning', level: 6, firstStudied: pastDue - 10000, lastReviewed: pastDue - 5000, nextReviewTime: pastDue, reviewCount: 5 }
  }));

  window.VocabModule.init('vocabSection');
  window.VocabModule.showStudyView('review');

  const DAY = 24 * 60 * 60 * 1000;

  // 1) alpha at level 6 -> 'forgot' drops 2 levels to level 4 (4 days)
  const t1 = Date.now();
  window.VocabModule.gradeWord('forgot'); // flips card
  let prog = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(prog.alpha.level, 4, 'forgot from level 6 should drop 2 levels to 4');
  assert.strictEqual(prog.alpha.status, 'learning');
  assert.ok(prog.alpha.nextReviewTime - t1 >= 3.99 * DAY && prog.alpha.nextReviewTime - t1 <= 4.01 * DAY);
  window.VocabModule.goToNextCard(); // advance to bravo

  // 2) bravo at level 6 -> 'hard' drops 1 level to level 5 (5 days)
  const t2 = Date.now();
  window.VocabModule.gradeWord('hard');
  prog = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(prog.bravo.level, 5, 'hard from level 6 should drop 1 level to 5');
  assert.strictEqual(prog.bravo.status, 'learning');
  assert.ok(prog.bravo.nextReviewTime - t2 >= 4.99 * DAY && prog.bravo.nextReviewTime - t2 <= 5.01 * DAY);
  window.VocabModule.goToNextCard(); // advance to charlie

  // 3) charlie at level 1 -> 'forgot' drops to level 0 (12h) and becomes status 'new' (新学中)
  const t3 = Date.now();
  window.VocabModule.gradeWord('forgot');
  prog = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(prog.charlie.level, 0, 'forgot from level 1 should clamp at 0');
  assert.strictEqual(prog.charlie.status, 'new', 'Level 0 word under Plan B must have status new');
  assert.ok(prog.charlie.nextReviewTime - t3 >= 11.9 * 3600 * 1000 && prog.charlie.nextReviewTime - t3 <= 12.1 * 3600 * 1000);
  window.VocabModule.goToNextCard(); // advance to delta

  // 4) delta at level 6 -> user clicks 'good' (flips card, temporarily bumps to 7) then clicks '记错了' (handleMarkWrong)
  // Must drop 2 levels from pre-flip level 6 -> level 4 (4 days), NOT 7 - 2 = 5 and NOT reset to 0
  const t4 = Date.now();
  window.VocabModule.gradeWord('good');
  prog = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(prog.delta.level, 7, 'pre-check: good temporarily bumps level 6 to 7 on flip');
  window.VocabModule.handleMarkWrong();
  prog = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(prog.delta.level, 4, 'handleMarkWrong after flip must drop 2 levels from pre-flip level 6 -> 4');
  assert.ok(prog.delta.nextReviewTime - t4 >= 3.99 * DAY && prog.delta.nextReviewTime - t4 <= 4.01 * DAY);
});

test('Vocab Audit Fixes: Home vs Drawer stats consistency, Home reset scope, undo across modes & markMastered undo', () => {
  const { storageMap, elements } = setupForecastEnv();
  const pastDue = Date.now() - 60000;
  storageMap.set('KAOYAN_VOCAB_PROGRESS_V2', JSON.stringify({
    alpha: { status: 'learning', level: 2, firstStudied: pastDue - 10000, lastReviewed: pastDue - 5000, nextReviewTime: pastDue, reviewCount: 2 },
    bravo: { status: 'new', level: 0, firstStudied: pastDue - 10000, lastReviewed: pastDue - 5000, nextReviewTime: pastDue + 600000, reviewCount: 1 },
    charlie: { status: 'mastered', level: 10, firstStudied: pastDue - 10000, lastReviewed: pastDue - 5000, nextReviewTime: pastDue + 99999999, reviewCount: 5 }
  }));

  window.VocabModule.init('vocabSection');

  // 1) Home view counts and Settings Drawer stats must match strictly (7 new incl. Lv.0 bravo, 1 learning/due alpha, 1 mastered charlie)
  assert.strictEqual(elements.get('vocabHomeCountLearn').textContent, '7');
  assert.strictEqual(elements.get('vocabStatNew').textContent, '7');
  assert.strictEqual(elements.get('vocabHomeCountReview').textContent, '1');
  assert.strictEqual(elements.get('vocabStatDue').textContent, '1');
  assert.strictEqual(elements.get('vocabStatLearning').textContent, '1');
  assert.strictEqual(elements.get('vocabStatMastered').textContent, '1');

  // 2) Returning Home from Review must restore full dictionary scope & clear cross-session historyStack
  window.VocabModule.showStudyView('review');
  assert.strictEqual(elements.get('vocabCurrentListCount').textContent, '1');
  window.VocabModule.gradeWord('good'); // alpha moves to level 3, flips card
  window.VocabModule.showHomeView();
  assert.strictEqual(elements.get('vocabCurrentListCount').textContent, '9', 'Returning home must restore full list count');

  // Switching to Learn and pressing undo must NOT undo alpha from the previous Review session
  window.VocabModule.showStudyView('new');
  window.VocabModule.undoLastGrade();
  let prog = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(prog.alpha.level, 3, 'Cross-session undo must be blocked after switching study modes');

  // 3) markMastered() must support undoLastGrade(), and manual flip + handleMarkWrong() must also support undoLastGrade()
  const currentWord = elements.get('vocabMomoWord').textContent;
  window.VocabModule.markMastered();
  prog = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(prog[currentWord].status, 'mastered');
  window.VocabModule.undoLastGrade();
  prog = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.notStrictEqual(prog[currentWord]?.status, 'mastered', 'markMastered must be undoable');
  assert.strictEqual(elements.get('vocabMomoWord').textContent, currentWord);

  window.VocabModule.flipCard(true);
  window.VocabModule.handleMarkWrong();
  prog = JSON.parse(storageMap.get('KAOYAN_VOCAB_PROGRESS_V2'));
  assert.strictEqual(prog[currentWord].level, 0);
  window.VocabModule.undoLastGrade();
  assert.strictEqual(elements.get('vocabMomoWord').textContent, currentWord, 'Manual flip + handleMarkWrong must be undoable');
});

test('Vocab Audit 2 Fixes: Star icon reflects StorageModule.isBookmarked, bookmarked def/textId map cleanly, and stats deduplicate words', () => {
  const { elements } = setupForecastEnv();
  window.KAOYAN_VOCAB_BANK = [
    [2018, 'Text 1', [['alpha', 'n. 阿尔法'], ['bravo', 'n. 布拉沃']]],
    [2020, 'Text 2', [['alpha', 'n. 阿尔法（复现）']]]
  ];

  // Add alpha to vocab book BEFORE initializing vocab module
  window.StorageModule.addWordToBook('alpha', 'n. 专属生词本释义', 'Alpha example sentence.', '2020', 'Text 2');
  window.VocabModule.init('vocabSection');
  elements.get('vocabSourceSelect').options = [
    { value: 'nanxiao_sushua', textContent: '高频' },
    { value: 'all', textContent: '全真题' },
    { value: 'bookmarked', textContent: '生词本' }
  ];
  window.VocabModule.showStudyView('new');

  // 1) Topbar star icon must show ★ because alpha is already bookmarked
  assert.strictEqual(elements.get('vocabMomoWord').textContent, 'alpha');
  assert.strictEqual(elements.get('vocabMomoBtnStar').textContent, '★', 'Already-bookmarked word must render ★ on card load');

  // 2) Switch to bookmarked source -> must read b.def as meaning & b.textId as text (not undefined)
  elements.get('vocabSourceSelect').value = 'bookmarked';
  elements.get('vocabSourceSelect').onchange();
  window.VocabModule.flipCard(true);
  assert.ok(elements.get('vocabMomoDefinitions').innerHTML.includes('专属生词本释义'), 'Bookmarked word must display its saved def');
  assert.strictEqual(elements.get('vocabProvenanceFront').textContent, '2020 · Text 2', 'Bookmarked word must display saved textId');
  assert.ok(elements.get('vocabTextSelect').innerHTML.includes('全部收藏篇章'), 'textSelect must reset options when switching to bookmarked');

  // 3) Switch to 'all' (rawVocabData with duplicate alpha across years) -> computeScopeStats deduplicates alpha
  elements.get('vocabSourceSelect').value = 'all';
  elements.get('vocabSourceSelect').onchange();
  assert.strictEqual(elements.get('vocabHomeCountLearn').textContent, '2', 'Duplicate words across years must be deduplicated in stats');
});
