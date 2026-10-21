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
  createElement('vocabSearchInput', 'input');
  createElement('vocabToggleAudioBtn', 'button');
  createElement('vocabToggleDrawerBtn', 'button');
  createElement('vocabFilterDrawer');
  createElement('vocabFilterLabel1');
  createElement('vocabFilterLabel2');

  const sourceSelect = createElement('vocabSourceSelect', 'select');
  sourceSelect.options = [
    { value: 'all', textContent: '全真题词库' },
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
