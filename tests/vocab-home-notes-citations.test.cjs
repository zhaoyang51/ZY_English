const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// Test Vocab Home Page, Note Editor, Citations Modal and Syllable Display
test('Vocab Home Page: Figure 1 layout, Learn & Review cards, and Random Word display', () => {
  const css = fs.readFileSync(path.join(__dirname, '../css/vocab.css'), 'utf8');
  const js = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');

  // 1. CSS rules for Home frame and background image
  assert.ok(css.includes('.vocab-home-frame'), 'Must define .vocab-home-frame');
  assert.ok(css.includes('vocab_home_bg.jpg'), 'Must reference vocab_home_bg.jpg');
  assert.ok(css.includes('.vocab-home-word-card'), 'Must style .vocab-home-word-card');
  assert.ok(css.includes('.vocab-home-card'), 'Must style .vocab-home-card');
  assert.ok(css.includes('.vocab-home-card-learn'), 'Must style Learn card');
  assert.ok(css.includes('.vocab-home-card-review'), 'Must style Review card');
  assert.ok(css.includes('.vocab-home-bottom-nav'), 'Must style bottom navigation bar');

  // 2. HTML Structure in JS
  assert.ok(js.includes('id="vocabHomeFrame"'), 'Must render #vocabHomeFrame');
  assert.ok(js.includes('id="vocabHomeWord"'), 'Must have #vocabHomeWord');
  assert.ok(js.includes('id="vocabHomeMeaning"'), 'Must have #vocabHomeMeaning');
  assert.ok(js.includes('id="vocabHomeCardLearn"'), 'Must have #vocabHomeCardLearn');
  assert.ok(js.includes('id="vocabHomeCardReview"'), 'Must have #vocabHomeCardReview');
  assert.ok(js.includes('id="vocabHomeCountLearn"'), 'Must have #vocabHomeCountLearn');
  assert.ok(js.includes('id="vocabHomeCountReview"'), 'Must have #vocabHomeCountReview');
  assert.ok(js.includes('id="vocabHomeBtnRefresh"'), 'Must have #vocabHomeBtnRefresh');

  // 3. Methods for Home view
  assert.ok(js.includes('showHomeView()'), 'Must implement showHomeView()');
  assert.ok(js.includes('showStudyView('), 'Must implement showStudyView()');
  assert.ok(js.includes('updateHomeView()'), 'Must implement updateHomeView()');
  assert.ok(js.includes('pickRandomHomeWord()'), 'Must implement pickRandomHomeWord()');
});

test('Vocab Card: Left-top word does not split syllables per user request', () => {
  const js = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');

  // Check that word is directly assigned to momoWord instead of syllabified when revealed
  assert.ok(js.includes('els.momoWord.textContent = word;'), 'Word title must be set directly without syllable dots');
  assert.ok(!js.includes('els.momoWord.textContent = appState.isFlipped ? syllabified : word;'), 'Must not conditionally assign syllabified word on flip');
});

test('Vocab Relations Card: Tab bar at top, content below, independent scrolling, no css errors', () => {
  const css = fs.readFileSync(path.join(__dirname, '../css/vocab.css'), 'utf8');
  const js = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');

  // 1. Verify CSS brace balance
  let depth = 0;
  for (const ch of css) {
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
  }
  assert.strictEqual(depth, 0, 'vocab.css must have zero unbalanced braces');

  // 2. Tab bar order in HTML: tabs bar comes before collocList
  const cardIdx = js.indexOf('id="vocabMomoCardRelations"');
  const tabsIdx = js.indexOf('id="vocabMomoTabsList"', cardIdx);
  const listIdx = js.indexOf('id="vocabMomoCollocList"', cardIdx);

  assert.ok(tabsIdx > cardIdx, 'Tabs must be inside cardRelations');
  assert.ok(listIdx > cardIdx, 'Colloc list must be inside cardRelations');
  assert.ok(tabsIdx < listIdx, 'Tabs bar must be positioned BEFORE colloc list at the top of the card');

  // 3. Independent internal scroll styling
  assert.ok(css.includes('.momo-colloc-list') && css.includes('overflow-y: auto'), 'Colloc list must scroll independently');
});

test('Vocab Personal Notes & Exam Citations Modal features', () => {
  const js = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');

  // 1. Personal Notes
  assert.ok(js.includes('id="vocabMomoNoteEditorBox"'), 'Must have #vocabMomoNoteEditorBox');
  assert.ok(js.includes('id="vocabMomoNoteInput"'), 'Must have #vocabMomoNoteInput');
  assert.ok(js.includes('id="vocabMomoNoteBtnSave"'), 'Must have #vocabMomoNoteBtnSave');
  assert.ok(js.includes('toggleNoteEditor'), 'Must implement toggleNoteEditor()');
  assert.ok(js.includes('saveCurrentNote'), 'Must implement saveCurrentNote()');
  assert.ok(js.includes('loadUserNotes'), 'Must implement loadUserNotes()');
  assert.ok(js.includes('KAOYAN_VOCAB_USER_NOTES_V1'), 'Must store notes in KAOYAN_VOCAB_USER_NOTES_V1');
  assert.ok(js.includes('momo-user-note-card'), 'Must display note in .momo-user-note-card');

  // 2. Exam Citations Modal
  assert.ok(js.includes('id="vocabCitationsModal"'), 'Must have #vocabCitationsModal');
  assert.ok(js.includes('id="vocabCitationsTitle"'), 'Must have #vocabCitationsTitle');
  assert.ok(js.includes('id="vocabCitationsBody"'), 'Must have #vocabCitationsBody');
  assert.ok(js.includes('id="vocabCitationsBtnClose"'), 'Must have #vocabCitationsBtnClose');
  assert.ok(js.includes('showCitationsModal'), 'Must implement showCitationsModal()');
  assert.ok(js.includes('hideCitationsModal'), 'Must implement hideCitationsModal()');
});

test('Vocab Home Page: Today Newly Learned and Reviewed Counters', () => {
  const css = fs.readFileSync(path.join(__dirname, '../css/vocab.css'), 'utf8');
  const js = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');

  // 1. Structure and labels
  assert.ok(js.includes('id="vocabHomeTodayLearn"'), 'Must have #vocabHomeTodayLearn');
  assert.ok(js.includes('id="vocabHomeTodayReview"'), 'Must have #vocabHomeTodayReview');
  assert.ok(js.includes('id="vocabHomeTodayLearnCount"'), 'Must have #vocabHomeTodayLearnCount');
  assert.ok(js.includes('id="vocabHomeTodayReviewCount"'), 'Must have #vocabHomeTodayReviewCount');
  assert.ok(js.includes('今日已新学'), 'Must display 今日已新学');
  assert.ok(js.includes('今日已复习'), 'Must display 今日已复习');

  // 2. CSS rules
  assert.ok(css.includes('.vocab-home-card .card-today-stat'), 'Must style .card-today-stat');
  assert.ok(css.includes('.vocab-home-card .card-today-stat .stat-label'), 'Must style .stat-label');
  assert.ok(css.includes('.vocab-home-card .card-today-stat .stat-num'), 'Must style .stat-num');
  assert.ok(css.includes('body.theme-dark .vocab-home-card .card-today-stat'), 'Must have dark theme styles');

  // 3. Methods & Persistence
  assert.ok(js.includes('KAOYAN_VOCAB_DAILY_LOG_V1'), 'Must use KAOYAN_VOCAB_DAILY_LOG_V1 storage key');
  assert.ok(js.includes('getDailyLog()'), 'Must implement getDailyLog()');
  assert.ok(js.includes('recordDailyActivity('), 'Must implement recordDailyActivity()');
  assert.ok(js.includes('undoDailyActivity('), 'Must implement undoDailyActivity()');
  assert.ok(js.includes('updateTodayStatsUI()'), 'Must implement updateTodayStatsUI()');

  // 4. Interactive Simulation with VM
  const vm = require('node:vm');
  const storage = {};
  const mockLocalStorage = {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; }
  };

  const elements = {};
  const mockDocument = {
    getElementById: (id) => {
      if (!elements[id]) {
        elements[id] = {
          id,
          textContent: '',
          innerHTML: '',
          classList: { add: () => {}, remove: () => {}, toggle: () => {} },
          style: {},
          onclick: null
        };
      }
      return elements[id];
    },
    createElement: () => ({ style: {}, classList: { add: () => {} }, appendChild: () => {} }),
    body: { classList: { contains: () => false, add: () => {}, remove: () => {} } }
  };

  const context = {
    window: {
      localStorage: mockLocalStorage,
      addEventListener: () => {},
      speechSynthesis: { speak: () => {}, cancel: () => {} },
      location: { href: 'http://localhost/' }
    },
    document: mockDocument,
    localStorage: mockLocalStorage,
    console,
    Date,
    Math,
    setTimeout: (fn) => setTimeout(fn, 0),
    clearTimeout: () => {}
  };
  context.window.window = context.window;
  context.window.document = mockDocument;

  vm.createContext(context);
  vm.runInContext(js, context);

  const VocabModule = context.window.VocabModule;
  assert.ok(VocabModule, 'VocabModule must be exposed');

  // Initial daily log should be 0
  const initialLog = VocabModule.getDailyLog();
  assert.strictEqual(initialLog.newLearned.length, 0);
  assert.strictEqual(initialLog.reviewed.length, 0);

  // Record a newly learned word
  VocabModule.recordDailyActivity('testword', 'new');
  const afterNew = VocabModule.getDailyLog();
  assert.strictEqual(afterNew.newLearned.length, 1);
  assert.strictEqual(afterNew.newLearned[0], 'testword');
  assert.strictEqual(afterNew.reviewed.length, 0);

  // Record a reviewed word
  VocabModule.recordDailyActivity('reviewword', 'review');
  const afterReview = VocabModule.getDailyLog();
  assert.strictEqual(afterReview.newLearned.length, 1);
  assert.strictEqual(afterReview.reviewed.length, 1);
  assert.strictEqual(afterReview.reviewed[0], 'reviewword');

  // Undo newly learned word
  VocabModule.undoDailyActivity('testword', true);
  const afterUndo = VocabModule.getDailyLog();
  assert.strictEqual(afterUndo.newLearned.length, 0);
  assert.strictEqual(afterUndo.reviewed.length, 1);
});
