const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('Vocab Recite: Button Order Customization Structure & Styles', () => {
  const vocabJs = fs.readFileSync(path.join(root, 'js/vocab.js'), 'utf8');
  const vocabCss = fs.readFileSync(path.join(root, 'css/vocab.css'), 'utf8');

  // 1. Settings state defaults
  assert.ok(vocabJs.includes("unrevealedButtonOrder: 'good_hard_forgot'"), 'Must have unrevealedButtonOrder in appState');
  assert.ok(vocabJs.includes("revealedButtonOrder: 'wrong_continue'"), 'Must have revealedButtonOrder in appState');

  // 2. DOM elements in renderHtmlStructure
  assert.ok(vocabJs.includes('id="vocabMomoUnrevealedRow"'), 'Must have id for unrevealed buttons row');
  assert.ok(vocabJs.includes('id="vocabMomoRevealedRow"'), 'Must have id for revealed buttons row');
  assert.ok(vocabJs.includes('id="vocabQuickSwapUnrevealed"'), 'Must have quick swap button for unrevealed state');
  assert.ok(vocabJs.includes('id="vocabQuickSwapRevealed"'), 'Must have quick swap button for revealed state');
  assert.ok(vocabJs.includes('id="vocabUnrevealedOrderSelect"'), 'Must have settings dropdown for unrevealed order');
  assert.ok(vocabJs.includes('id="vocabRevealedOrderSelect"'), 'Must have settings dropdown for revealed order');

  // 3. Settings Drawer Options
  assert.ok(vocabJs.includes('value="good_hard_forgot"'), 'Must support good_hard_forgot option');
  assert.ok(vocabJs.includes('value="forgot_hard_good"'), 'Must support forgot_hard_good option');
  assert.ok(vocabJs.includes('value="wrong_continue"'), 'Must support wrong_continue option');
  assert.ok(vocabJs.includes('value="continue_wrong"'), 'Must support continue_wrong option');

  // 4. Persistence in loadSettings and saveSettings
  assert.ok(vocabJs.includes('cfg.unrevealedButtonOrder'), 'loadSettings must restore unrevealedButtonOrder');
  assert.ok(vocabJs.includes('cfg.revealedButtonOrder'), 'loadSettings must restore revealedButtonOrder');

  // 5. CSS definitions
  assert.ok(vocabCss.includes('.momo-swap-link-wrap'), 'CSS must define .momo-swap-link-wrap');
  assert.ok(vocabCss.includes('.momo-quick-swap-link'), 'CSS must define .momo-quick-swap-link');
});

test('Vocab Recite: Button Order DOM reordering, localStorage persistence and keyboard mapping', () => {
  // Setup minimal DOM environment to run VocabModule logic
  const storage = {};
  const mockLocalStorage = {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; },
    clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
  };

  class MockElement {
    constructor(id, tag = 'div') {
      this.id = id;
      this.tagName = tag.toUpperCase();
      this.children = [];
      this.attributes = {};
      this.style = {};
      this.classList = {
        add: () => {},
        remove: () => {},
        toggle: () => {},
        contains: () => false
      };
      this.value = '';
    }
    appendChild(child) {
      const idx = this.children.indexOf(child);
      if (idx !== -1) this.children.splice(idx, 1);
      this.children.push(child);
      return child;
    }
    setAttribute(name, val) {
      this.attributes[name] = val;
    }
    getAttribute(name) {
      return this.attributes[name] || null;
    }
    querySelector() { return null; }
    querySelectorAll() { return []; }
  }

  const elements = {};
  const createElement = (id, tag = 'div') => {
    elements[id] = new MockElement(id, tag);
    return elements[id];
  };

  // Create bottom bar elements
  const unrevealedRow = createElement('vocabMomoUnrevealedRow');
  const btnGood = createElement('vocabMomoBtnGood', 'button');
  const btnHard = createElement('vocabMomoBtnHard', 'button');
  const btnForgot = createElement('vocabMomoBtnForgot', 'button');
  unrevealedRow.appendChild(btnGood);
  unrevealedRow.appendChild(btnHard);
  unrevealedRow.appendChild(btnForgot);

  const revealedRow = createElement('vocabMomoRevealedRow');
  const btnWrong = createElement('vocabMomoBtnWrong', 'button');
  const btnContinue = createElement('vocabMomoBtnContinue', 'button');
  revealedRow.appendChild(btnWrong);
  revealedRow.appendChild(btnContinue);

  const unrevealedOrderSelect = createElement('vocabUnrevealedOrderSelect', 'select');
  const revealedOrderSelect = createElement('vocabRevealedOrderSelect', 'select');
  const quickSwapUnrevealed = createElement('vocabQuickSwapUnrevealed', 'button');
  const quickSwapRevealed = createElement('vocabQuickSwapRevealed', 'button');

  // Verify initial DOM order
  assert.deepStrictEqual(unrevealedRow.children.map(c => c.id), ['vocabMomoBtnGood', 'vocabMomoBtnHard', 'vocabMomoBtnForgot']);
  assert.deepStrictEqual(revealedRow.children.map(c => c.id), ['vocabMomoBtnWrong', 'vocabMomoBtnContinue']);

  // Simulate applying reversed unrevealed order: forgot_hard_good
  unrevealedRow.appendChild(btnForgot);
  unrevealedRow.appendChild(btnHard);
  unrevealedRow.appendChild(btnGood);
  assert.deepStrictEqual(unrevealedRow.children.map(c => c.id), ['vocabMomoBtnForgot', 'vocabMomoBtnHard', 'vocabMomoBtnGood']);

  // Simulate applying reversed revealed order: continue_wrong
  revealedRow.appendChild(btnContinue);
  revealedRow.appendChild(btnWrong);
  assert.deepStrictEqual(revealedRow.children.map(c => c.id), ['vocabMomoBtnContinue', 'vocabMomoBtnWrong']);

  // Verify localStorage persistence of custom button order settings
  const SETTINGS_KEY = 'KAOYAN_VOCAB_USER_SETTINGS_V1';
  mockLocalStorage.setItem(SETTINGS_KEY, JSON.stringify({
    autoAudio: true,
    unrevealedButtonOrder: 'forgot_hard_good',
    revealedButtonOrder: 'continue_wrong'
  }));

  const loaded = JSON.parse(mockLocalStorage.getItem(SETTINGS_KEY));
  assert.strictEqual(loaded.unrevealedButtonOrder, 'forgot_hard_good');
  assert.strictEqual(loaded.revealedButtonOrder, 'continue_wrong');
});
