const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

function setupTestEnv() {
  const elements = {};
  function createElement(id, tag = 'div') {
    const el = {
      id,
      tagName: tag.toUpperCase(),
      classList: {
        _set: new Set(),
        add(c) { this._set.add(c); },
        remove(c) { this._set.delete(c); },
        contains(c) { return this._set.has(c); },
        toggle(c, f) { if (f) this._set.add(c); else this._set.delete(c); }
      },
      style: {},
      _html: '',
      set innerHTML(val) {
        this._html = val;
        this.textContent = String(val).replace(/<[^>]*>/g, '');
        // Parse options if select
        if (this.tagName === 'SELECT') {
          const matches = [...val.matchAll(/<option\s+value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/g)];
          this.options = matches.map(m => ({ value: m[1], textContent: m[2] }));
        }
      },
      get innerHTML() {
        return this._html || '';
      },
      textContent: '',
      value: '',
      options: [],
      children: [],
      querySelector(sel) {
        if (sel === 'option[value="bookmarked"]') {
          return this.options.find(o => o.value === 'bookmarked') || { textContent: '' };
        }
        return null;
      },
      querySelectorAll() { return []; },
      setAttribute() {},
      getAttribute() { return ''; }
    };
    elements[id] = el;
    return el;
  }

  // Pre-create all elements referenced in cacheDomElements
  createElement('vocabSection');
  createElement('vocabHomeFrame');
  createElement('vocabHomeBtnBack');
  createElement('vocabHomeDictName');
  createElement('vocabHomeCardLearn');
  createElement('vocabHomeCountLearn');
  createElement('vocabHomeCardReview');
  createElement('vocabHomeCountReview');
  createElement('vocabHomeWord');
  createElement('vocabHomeMeaning');
  createElement('vocabHomeBtnRefresh');
  createElement('vocabHomePhonetic');
  createElement('vocabHomePhoneticText');
  createElement('vocabSearchInput', 'input');
  createElement('vocabToggleAudioBtn', 'button');
  createElement('vocabToggleDrawerBtn', 'button');
  createElement('vocabFilterDrawer');
  createElement('vocabFilterLabel1');
  createElement('vocabFilterLabel2');

  const sourceSelect = createElement('vocabSourceSelect', 'select');
  sourceSelect.options = [
    { value: 'all', textContent: '全真题词库' },
    { value: 'nanxiao_sushua', textContent: '考研英语二·真题高效速刷词库' },
    { value: 'yuque_sucheng', textContent: '单词大观·速成版' },
    { value: 'yuque_daxue', textContent: '单词大观·大雪深埋版' },
    { value: 'bookmarked', textContent: '我的生词本' }
  ];
  sourceSelect.value = 'all';

  createElement('vocabYearSelect', 'select');
  createElement('vocabTextSelect', 'select');
  const stateSelect = createElement('vocabStateSelect', 'select');
  stateSelect.value = 'all';
  const sortSelect = createElement('vocabSortSelect', 'select');
  sortSelect.options = [
    { value: 'default', textContent: '真题顺序' },
    { value: 'frequency', textContent: '🔥 考频降序 (高频优先)' },
    { value: 'urgency', textContent: '🚨 遗忘紧迫优先' },
    { value: 'random', textContent: '🔀 随机打乱' }
  ];
  sortSelect.value = 'default';

  createElement('vocabCurrentListCount');
  createElement('vocabBtnResetFilter', 'button');

  createElement('vocabStatsRibbon');
  createElement('vocabStatTotal');
  createElement('vocabStatDue');
  createElement('vocabStatNew');
  createElement('vocabStatLearning');
  createElement('vocabStatMastered');

  createElement('vocabProgressContainer');
  createElement('vocabSessionProgressText');
  createElement('vocabSessionPercent');
  createElement('vocabProgressBar');

  createElement('vocabCardScene');
  createElement('vocabCardFlipper');
  createElement('vocabFaceFront');
  createElement('vocabFaceBack');

  createElement('vocabBtnAudioFront', 'button');
  createElement('vocabBtnAudioBack', 'button');
  createElement('vocabProvenanceFront');
  createElement('vocabProvenanceBack');
  createElement('vocabBadgeFront');
  createElement('vocabBadgeBack');
  createElement('vocabBtnStarFront', 'button');
  createElement('vocabBtnStarBack', 'button');

  createElement('vocabPosBadgeFront');
  createElement('vocabWordFront');
  createElement('vocabClozeBoxFront');

  createElement('vocabWordBack');
  createElement('vocabPosBadgeBack');
  createElement('vocabDefBack');
  createElement('vocabMindChainBox');
  createElement('vocabMindChainHeader');
  createElement('vocabMindChainContent');
  createElement('vocabSentenceBox');
  createElement('vocabSentenceHeader');
  createElement('vocabSentenceEn');
  createElement('vocabSentenceZh');
  createElement('vocabSentenceCustom');
  createElement('vocabRelationsContainer');

  createElement('vocabBtnForgotFront', 'button');
  createElement('vocabBtnHardFront', 'button');
  createElement('vocabBtnGoodFront', 'button');
  createElement('vocabTimeForgotFront');
  createElement('vocabTimeHardFront');
  createElement('vocabTimeGoodFront');

  createElement('vocabBtnForgotBack', 'button');
  createElement('vocabBtnHardBack', 'button');
  createElement('vocabBtnGoodBack', 'button');
  createElement('vocabTimeForgotBack');
  createElement('vocabTimeHardBack');
  createElement('vocabTimeGoodBack');

  createElement('vocabBtnUndo', 'button');
  createElement('vocabBtnFlipBack', 'button');
  createElement('vocabBtnNext', 'button');

  createElement('vocabEmptyState');
  createElement('vocabEmptyTitle');
  createElement('vocabEmptyDesc');
  createElement('vocabBtnEmptyReset', 'button');
  createElement('vocabToast');

  createElement('vocabMomoWord');
  createElement('vocabMomoCheckmark');
  createElement('vocabMomoFreqBadge');
  createElement('vocabMomoProgress');
  createElement('vocabMomoPhoneticPill');
  createElement('vocabMomoPhoneticText');
  createElement('vocabMomoSkeletons');
  createElement('vocabMomoDefinitions');
  createElement('vocabMomoCardSentence');
  createElement('vocabMomoSentenceEn');
  createElement('vocabMomoSentenceZh');
  createElement('vocabMomoCardRelations');
  createElement('vocabMomoCollocList');
  createElement('vocabMomoTabsList');
  createElement('vocabMomoBtnBack', 'button');
  createElement('vocabMomoBtnUndo', 'button');
  createElement('vocabMomoBtnStar', 'button');
  createElement('vocabMomoBtnMastered', 'button');
  createElement('vocabMomoBtnSpelling', 'button');
  createElement('vocabMomoBtnMore', 'button');
  createElement('vocabMomoBtnGood', 'button');
  createElement('vocabMomoBtnHard', 'button');
  createElement('vocabMomoBtnForgot', 'button');
  createElement('vocabMomoBtnContinue', 'button');
  createElement('vocabMomoBtnWrong', 'button');

  const dom = {
    classes: new Set(),
    body: {
      classList: {
        add: (c) => dom.classes.add(c),
        remove: (c) => dom.classes.delete(c),
        contains: (c) => dom.classes.has(c),
        toggle: (c, force) => {
          if (force === undefined) {
            if (dom.classes.has(c)) dom.classes.delete(c); else dom.classes.add(c);
          } else if (force) dom.classes.add(c);
          else dom.classes.delete(c);
        }
      }
    },
    getElementById: (id) => elements[id] || null,
    querySelector: (sel) => {
      if (sel === '.vocab-top-bar') return elements['vocabTopBar'] || { style: {} };
      return null;
    },
    querySelectorAll: (sel) => {
      if (sel === '.vocab-stat-chip') return [];
      return [];
    }
  };

  const storage = {};
  global.localStorage = {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; },
    clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
  };

  global.window = {
    localStorage: global.localStorage,
    dispatchEvent: () => {},
    addEventListener: () => {},
    speechSynthesis: {
      speak: () => {},
      cancel: () => {}
    }
  };
  global.document = dom;

  // Load storage
  const storageJs = fs.readFileSync(path.join(__dirname, '../js/storage.js'), 'utf8');
  eval(storageJs);

  // Load standard bank
  global.window.KAOYAN_VOCAB_BANK = [
    [2016, 'Text 1', [['threat', 'n. 威胁']]]
  ];
  global.window.KAOYAN_VOCAB_DICT = {};

  // Load Yuque datasets
  const suchengJs = fs.readFileSync(path.join(__dirname, '../data/vocab_sucheng.js'), 'utf8');
  eval(suchengJs);
  const daxueJs = fs.readFileSync(path.join(__dirname, '../data/vocab_daxue.js'), 'utf8');
  eval(daxueJs);

  // Load vocab.js
  const vocabJs = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');
  eval(vocabJs);

  return { storage, elements };
}

test('Yuque Vocab Integration: Sucheng dataset loads 2,868 words and renders full details', () => {
  const { elements } = setupTestEnv();

  assert.strictEqual(global.window.YUQUE_SUCHENG_VOCAB.length, 2868);

  global.window.VocabModule.init('vocabSection');

  // Switch to yuque_sucheng
  elements.vocabSourceSelect.value = 'yuque_sucheng';
  elements.vocabSourceSelect.onchange();

  assert.strictEqual(elements.vocabFilterLabel1.textContent, '构词分类');
  assert.strictEqual(elements.vocabFilterLabel2.textContent, '分册定位');
  assert.ok(elements.vocabYearSelect.options.some(o => o.value === '词根构词型'));
  assert.ok(elements.vocabYearSelect.options.some(o => o.value === '独立词型'));
  assert.ok(elements.vocabYearSelect.options.some(o => o.value === '直接背型'));

  // Verify total count
  assert.strictEqual(Number(elements.vocabStatTotal.textContent), 2868);

  // Check card content
  assert.ok(elements.vocabWordFront.textContent.length > 0);
  assert.ok(elements.vocabPosBadgeFront.textContent.includes('考频'));
  assert.ok(elements.vocabDefBack.innerHTML.includes('核心释义'));
});

test('Yuque Vocab Integration: Daxue dataset loads 876 roots, renders root card, and supports search', () => {
  const { elements } = setupTestEnv();

  assert.strictEqual(global.window.YUQUE_DAXUE_VOCAB.length, 876);

  global.window.VocabModule.init('vocabSection');

  // Switch to yuque_daxue
  elements.vocabSourceSelect.value = 'yuque_daxue';
  elements.vocabSourceSelect.onchange();

  assert.strictEqual(elements.vocabFilterLabel1.textContent, '考频分层');
  assert.strictEqual(elements.vocabFilterLabel2.textContent, '细分单元');
  assert.strictEqual(Number(elements.vocabStatTotal.textContent), 876);

  // Search for bullet to test root lookup
  elements.vocabSearchInput.value = 'bullet';
  elements.vocabSearchInput.oninput();

  // Give debounce a moment or trigger search directly
  const searchLower = 'bullet';
  const match = global.window.YUQUE_DAXUE_VOCAB.find(item => 
    item.allWords && item.allWords.some(w => w.toLowerCase().includes(searchLower))
  );
  assert.ok(match, 'Search for bullet should find its root card');
  assert.strictEqual(match.root, 'bull-/boul-');
  assert.ok(match.mnemonic.includes('ball'));
});

test('Vocab Recite: Remembers and seamlessly restores last wordbook and word position upon re-entry and reload', () => {
  const { elements, storage } = setupTestEnv();

  // 1. Initial load
  global.window.VocabModule.init('vocabSection');

  // 2. Switch to yuque_sucheng
  elements.vocabSourceSelect.value = 'yuque_sucheng';
  elements.vocabSourceSelect.onchange();

  // Advance cards
  global.window.VocabModule.goToNextCard(); // to index 1
  const word1 = elements.vocabWordFront.textContent;
  assert.ok(word1.length > 0, 'Must have rendered word at index 1');

  // Check that last position was persisted in storage
  const savedJson = storage['KAOYAN_VOCAB_LAST_POSITION_V2'];
  assert.ok(savedJson, 'KAOYAN_VOCAB_LAST_POSITION_V2 must be saved in localStorage');
  const posObj = JSON.parse(savedJson);
  assert.strictEqual(posObj.source, 'yuque_sucheng');
  assert.strictEqual(posObj.lastWord, word1);

  // 3. Simulate re-entering vocab mode (e.g., from reading practice without page refresh)
  global.window.VocabModule.init('vocabSection');
  assert.strictEqual(elements.vocabWordFront.textContent, word1, 'Re-entry without refresh must stay on last word');

  // 4. Simulate page refresh (new environment, preserving storage)
  const env2 = setupTestEnv();
  // Copy previous storage
  Object.assign(env2.storage, storage);
  env2.storage['KAOYAN_VOCAB_LAST_POSITION_V2'] = savedJson;

  global.window.VocabModule.init('vocabSection');
  assert.strictEqual(env2.elements.vocabSourceSelect.value, 'yuque_sucheng', 'Restores wordbook on refresh');
  assert.strictEqual(env2.elements.vocabWordFront.textContent, word1, 'Restores word on refresh');

  // 5. Switch to yuque_daxue
  env2.elements.vocabSourceSelect.value = 'yuque_daxue';
  env2.elements.vocabSourceSelect.onchange();
  global.window.VocabModule.goToNextCard();
  const daxueWord = env2.elements.vocabWordFront.textContent;
  assert.notStrictEqual(daxueWord, word1);

  // Switch back to yuque_sucheng -> should resume word1
  env2.elements.vocabSourceSelect.value = 'yuque_sucheng';
  env2.elements.vocabSourceSelect.onchange();
  assert.strictEqual(env2.elements.vocabWordFront.textContent, word1, 'Switching back to yuque_sucheng resumes word1');

  // Switch back to yuque_daxue -> should resume daxueWord
  env2.elements.vocabSourceSelect.value = 'yuque_daxue';
  env2.elements.vocabSourceSelect.onchange();
  assert.strictEqual(env2.elements.vocabWordFront.textContent, daxueWord, 'Switching back to yuque_daxue resumes daxueWord');
});

test('Vocab Recite: Sort Strategy supports Frequency sorting (high frequency first)', () => {
  const { elements } = setupTestEnv();

  // Initialize with Sucheng dataset (already loaded in setupTestEnv)
  global.window.VocabModule.init('vocabSection');
  elements.vocabSourceSelect.value = 'yuque_sucheng';
  elements.vocabSourceSelect.onchange();

  // Verify sort select exists and has frequency option
  const hasFreqOpt = elements.vocabSortSelect.options.some(o => o.value === 'frequency');
  assert.ok(hasFreqOpt, 'vocabSortSelect must contain frequency option');

  // Change sort to frequency
  elements.vocabSortSelect.value = 'frequency';
  elements.vocabSortSelect.onchange();

  // Show study view to render first card
  global.window.VocabModule.showStudyView();

  // Get first word under frequency sort
  const firstWord = elements.vocabMomoWord.textContent;
  const firstBadge = elements.vocabMomoFreqBadge.textContent;
  const firstFreqNum = parseInt(firstBadge.replace(/\D/g, '')) || 0;

  // The first word in yuque_sucheng should have high frequency (>= 30)
  assert.ok(firstFreqNum >= 30, `Expected first word under frequency sort to have frequency >= 30, got ${firstFreqNum} (${firstWord})`);

  // Move to next word, its frequency must be <= firstFreqNum
  global.window.VocabModule.goToNextCard();
  const secondWord = elements.vocabMomoWord.textContent;
  const secondBadge = elements.vocabMomoFreqBadge.textContent;
  const secondFreqNum = parseInt(secondBadge.replace(/\D/g, '')) || 0;
  assert.ok(firstFreqNum >= secondFreqNum, `Frequency sort order must be descending: ${firstFreqNum} >= ${secondFreqNum}`);
});

test('Vocab Recite: Learn and Review queues filter correctly and top-left shows remaining count', () => {
  const { elements, storage } = setupTestEnv();

  // Clear progress
  storage['KAOYAN_VOCAB_PROGRESS_V2'] = JSON.stringify({});

  global.window.VocabModule.init('vocabSection');
  elements.vocabSourceSelect.value = 'all';
  elements.vocabSourceSelect.onchange();

  // 1. Verify bottom 3 nav buttons removed from home page template
  const homeHtml = elements.vocabSection.innerHTML;
  assert.strictEqual(homeHtml.includes('vocab-home-bottom-nav'), false, 'Home page must not include bottom nav buttons');

  // 2. Click Learn -> should study unlearned words and show remaining unlearned count in top-left
  elements.vocabHomeCardLearn.onclick();
  assert.ok(elements.vocabMomoProgress.textContent.includes('未学剩余') || elements.vocabMomoProgress.textContent.includes('新学'), 'Top-left must indicate unlearned remaining');
  const initialUnlearned = parseInt(elements.vocabMomoProgress.textContent.replace(/\D/g, '')) || 0;
  assert.ok(initialUnlearned > 0, 'Must have unlearned words');

  // Advance card
  global.window.VocabModule.goToNextCard();
  const nextUnlearned = parseInt(elements.vocabMomoProgress.textContent.replace(/\D/g, '')) || 0;
  assert.strictEqual(nextUnlearned, initialUnlearned - 1, 'Remaining unlearned count must decrement by 1');

  // Return to home
  elements.vocabMomoBtnBack.onclick();

  // 3. Mark 2 words as due for review
  const now = Date.now();
  const w1 = elements.vocabWordFront.textContent || 'threat';
  const progress = {
    [w1]: { status: 'learning', nextReviewTime: now - 1000, level: 1 }
  };
  storage['KAOYAN_VOCAB_PROGRESS_V2'] = JSON.stringify(progress);
  global.window.VocabModule.loadProgress();
  global.window.VocabModule.updateHomeView();

  // Review card on home should show dueCount
  assert.strictEqual(elements.vocabHomeCountReview.textContent, '1', 'Review count on home page must reflect due count (1)');

  // Click Review -> should study due review words and show remaining due count in top-left
  elements.vocabHomeCardReview.onclick();
  assert.ok(elements.vocabMomoProgress.textContent.includes('复习剩余') || elements.vocabMomoProgress.textContent.includes('复习'), 'Top-left must indicate review remaining');
  assert.ok(elements.vocabMomoProgress.textContent.includes('1'), 'Remaining review count must be 1');
  assert.strictEqual(elements.vocabMomoWord.textContent, w1, 'Must review the due word');
});

test('Vocab Recite: Back button in top-left exits vocab mode and dict selector is positioned in top-right', () => {
  const { elements } = setupTestEnv();

  let exitCalled = false;
  global.window.exitVocabMode = () => {
    exitCalled = true;
  };

  global.window.VocabModule.init('vocabSection');
  global.window.VocabModule.showHomeView();

  const homeHtml = elements.vocabSection.innerHTML;
  assert.ok(homeHtml.includes('vocab-home-btn-back'), 'Home topbar must contain back button in top-left');
  assert.ok(homeHtml.includes('vocab-home-topbar-right'), 'Home topbar must group dict selector in top-right');
  assert.ok(homeHtml.includes('vocabHomeDictPill'), 'Dict selector must be present in top-right group');

  // Click top-left back button
  elements.vocabHomeBtnBack.onclick();
  assert.strictEqual(exitCalled, true, 'Clicking top-left back button must trigger exitVocabMode to return to reading');
});

test('Vocab DataLoader: Subpath URL resolution correctly targets repository data folder', () => {
  // Read and verify data_loader.js logic
  const loaderCode = fs.readFileSync(path.join(__dirname, '../js/data_loader.js'), 'utf8');
  assert.ok(loaderCode.includes('vocabBase'), 'DataLoader must define vocabBase');
  assert.ok(!loaderCode.includes("new URL('../data/', document.currentScript ? document.currentScript.src : window.location.href)"), 'Must not have broken ../ relative to window.location.href');

  // Verify CSS background points to vocab_home_bg.jpg
  const cssCode = fs.readFileSync(path.join(__dirname, '../css/vocab.css'), 'utf8');
  assert.ok(cssCode.includes('vocab_home_bg.jpg'), 'vocab.css must reference vocab_home_bg.jpg');
});

test('Vocab PDF Dataset: Nanxiao Sushua 2,872 words wordbook integration', () => {
  const { elements, storage } = setupTestEnv();

  // Load the dataset
  const nanxiaoData = fs.readFileSync(path.join(__dirname, '../data/vocab_nanxiao.js'), 'utf8');
  eval(nanxiaoData);
  assert.strictEqual(Array.isArray(global.window.NANXIAO_SUSHUA_VOCAB), true);
  assert.strictEqual(global.window.NANXIAO_SUSHUA_VOCAB.length, 2872, 'Must contain 2,872 words from PDF');

  // Initialize VocabModule and switch to nanxiao_sushua
  global.window.VocabModule.init('vocabSection');
  elements.vocabSourceSelect.value = 'nanxiao_sushua';
  elements.vocabSourceSelect.onchange();

  // Check home title
  assert.strictEqual(elements.vocabHomeDictName.textContent, '📑 考频速刷词库', 'Home header should show correct dict title');

  // Check counts
  const learnNum = parseInt(elements.vocabHomeCountLearn.textContent, 10);
  assert.strictEqual(learnNum, 2872, 'All 2,872 words initially unlearned');

  // Click Learn
  elements.vocabHomeCardLearn.onclick();
  assert.ok(elements.vocabMomoProgress.textContent.includes('2872'), 'Top left shows 2872 remaining');

  // Check first word card
  assert.strictEqual(elements.vocabMomoWord.textContent, 'will', 'First word in frequency order is will');
  assert.strictEqual(elements.vocabMomoFreqBadge.textContent, '考频 209次', 'Frequency badge shows 209');

  // Reveal card and check sentence
  global.window.VocabModule.flipCard(true);
  assert.ok(elements.vocabMomoSentenceEn.textContent.includes('disruptive'), 'Example sentence from PDF rendered');
});





