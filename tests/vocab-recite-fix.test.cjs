const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// Setup mock browser environment
function setupMockEnv() {
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

  // Load storage.js
  const storageJs = fs.readFileSync(path.join(__dirname, '../js/storage.js'), 'utf8');
  eval(storageJs);

  // Load data
  global.window.KAOYAN_VOCAB_BANK = [
    [2016, 'Text 1', [['bull', 'n. 公牛；多头'], ['threat', 'n. 威胁']]],
    [2016, 'Text 2', [['growth', 'n. 增长'], ['market', 'n. 市场']]],
    [2010, 'Text 1', [['interfere', 'vi. 干涉，干扰'], ['interrupt', 'vt. 中断']]]
  ];
  global.window.KAOYAN_VOCAB_DICT = {
    bull: { pos: 'n.', def: '公牛；多头；粗壮有力的人' },
    threat: { pos: 'n.', def: '威胁，恐吓' },
    interfere: { pos: 'vi.', def: '干涉，干预，妨碍' }
  };

  if (fs.existsSync(path.join(__dirname, '../data/vocab_relations.js'))) {
    const relJs = fs.readFileSync(path.join(__dirname, '../data/vocab_relations.js'), 'utf8');
    eval(relJs);
  }

  // Load vocab.js
  const vocabJs = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');
  eval(vocabJs);

  return { storage };
}

test('Vocab Recite: Switching to Bookmarked words list updates count and words immediately', () => {
  setupMockEnv();

  // 1. Add 2 test words to bookmarks
  global.window.StorageModule.addWordToBook('interfere', 'vi. 干涉，干预', 'Government should not interfere.', '2010', 'Text 1');
  global.window.StorageModule.addWordToBook('threat', 'n. 威胁', 'A serious threat to privacy.', '2016', 'Text 1');

  assert.strictEqual(global.window.StorageModule.getVocabBook().length, 2);

  // Create minimal mock DOM elements for vocab section
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

  const container = createElement('vocabSection');
  createElement('vocabSearchInput', 'input');
  createElement('vocabToggleAudioBtn', 'button');
  createElement('vocabToggleDrawerBtn', 'button');

  const sourceSelect = createElement('vocabSourceSelect', 'select');
  sourceSelect.options = [
    { value: 'all', textContent: '全真题词库' },
    { value: 'bookmarked', textContent: '我的生词本' }
  ];
  sourceSelect.value = 'all';

  const yearSelect = createElement('vocabYearSelect', 'select');
  const textSelect = createElement('vocabTextSelect', 'select');
  const stateSelect = createElement('vocabStateSelect', 'select');
  const sortSelect = createElement('vocabSortSelect', 'select');
  stateSelect.value = 'all';
  sortSelect.value = 'default';

  createElement('vocabCurrentListCount');
  createElement('vocabStatTotal');
  createElement('vocabStatDue');
  createElement('vocabStatNew');
  createElement('vocabStatLearning');
  createElement('vocabStatMastered');

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
  createElement('vocabSentenceBox');
  createElement('vocabSentenceEn');
  createElement('vocabSentenceZh');
  createElement('vocabRelationsContainer');

  createElement('vocabBtnForgotFront', 'button');
  createElement('vocabBtnHardFront', 'button');
  createElement('vocabBtnGoodFront', 'button');
  createElement('vocabBtnForgotBack', 'button');
  createElement('vocabBtnHardBack', 'button');
  createElement('vocabBtnGoodBack', 'button');

  createElement('vocabBtnUndo', 'button');
  createElement('vocabBtnFlipBack', 'button');
  createElement('vocabBtnNext', 'button');
  createElement('vocabBtnNextFront', 'button');

  createElement('vocabEmptyState');
  createElement('vocabEmptyTitle');
  createElement('vocabEmptyDesc');
  createElement('vocabToast');

  global.document.getElementById = (id) => elements[id] || null;
  global.document.querySelector = (sel) => {
    if (sel.startsWith('#')) return elements[sel.slice(1)] || null;
    return null;
  };
  global.document.querySelectorAll = () => [];

  // Initialize vocab module
  global.window.VocabModule.init('vocabSection');

  // Initial state should be all words (6 words)
  assert.strictEqual(String(elements['vocabStatTotal'].textContent), '6');
  assert.strictEqual(elements['vocabSessionProgressText'].textContent, '1 / 6');

  // NOW: Switch to Bookmarked words
  global.window.VocabModule.switchToBookmarked();

  // Must reflect the 2 bookmarked words
  assert.strictEqual(String(elements['vocabStatTotal'].textContent), '2');
  assert.strictEqual(elements['vocabSessionProgressText'].textContent, '1 / 2');
  assert.strictEqual(elements['vocabWordFront'].textContent, 'interfere');

  // Verify flip to back displays relations and definitions
  global.window.VocabModule.flipCard(true);
  assert.strictEqual(elements['vocabWordBack'].textContent, 'interfere');
  assert.ok(elements['vocabDefBack'].textContent.includes('干涉') || elements['vocabDefBack'].textContent.includes('干预'));
  assert.ok(elements['vocabRelationsContainer'].innerHTML.includes('真题形近词辨析'));
  assert.ok(elements['vocabRelationsContainer'].innerHTML.includes('interrupt') || elements['vocabRelationsContainer'].innerHTML.includes('interpret'));
});

test('Vocab Recite: No zh-en or cloze buttons in top bar, pure and focused UI', () => {
  const vocabJs = fs.readFileSync(path.join(__dirname, '../js/vocab.js'), 'utf8');
  assert.strictEqual(vocabJs.includes('🀄 中➔英'), false, 'Must not include 中➔英');
  assert.strictEqual(vocabJs.includes('📝 语境挖空'), false, 'Must not include 语境挖空');
  assert.strictEqual(vocabJs.includes('vocabModeGroup'), false, 'Must not include vocabModeGroup switcher');
});

test('Vocab CSS: Natural flow panel layout without 3D flip truncation', () => {
  const vocabCss = fs.readFileSync(path.join(__dirname, '../css/vocab.css'), 'utf8');
  assert.ok(vocabCss.includes('perspective: none'), 'Card scene must not use 3D perspective');
  assert.ok(vocabCss.includes('.vocab-card-flipper.is-flipped .vocab-face-back'), 'Must support natural reveal');
  assert.ok(vocabCss.includes('overflow-y: visible'), 'Back face must have overflow-y: visible to avoid truncation');
});
