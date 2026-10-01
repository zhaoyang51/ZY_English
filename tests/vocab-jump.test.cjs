const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Mock browser environment for unit test
function setupMockEnv() {
  const storage = {};
  const mockLocalStorage = {
    getItem: (key) => storage[key] || null,
    setItem: (key, val) => { storage[key] = String(val); },
    removeItem: (key) => { delete storage[key]; },
    clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
  };

  const listeners = {};
  const elements = {};

  const mockDoc = {
    getElementById: (id) => elements[id] || null,
    querySelector: (sel) => elements[sel] || null,
    querySelectorAll: (sel) => Object.values(elements).filter(el => el._matches && el._matches(sel)),
    createElement: (tag) => {
      const el = {
        tagName: tag.toUpperCase(),
        classList: {
          _classes: new Set(),
          add(c) { this._classes.add(c); },
          remove(c) { this._classes.delete(c); },
          toggle(c, force) {
            if (force === undefined) {
              if (this._classes.has(c)) this._classes.delete(c);
              else this._classes.add(c);
            } else if (force) {
              this._classes.add(c);
            } else {
              this._classes.delete(c);
            }
          },
          contains(c) { return this._classes.has(c); }
        },
        style: {},
        setAttribute(k, v) { this[k] = v; },
        getAttribute(k) { return this[k]; },
        addEventListener(evt, fn) {
          listeners[evt] = listeners[evt] || [];
          listeners[evt].push(fn);
        },
        scrollIntoView() { this._scrolled = true; }
      };
      return el;
    },
    body: {
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        toggle(c, force) {
          if (force === undefined) {
            if (this._classes.has(c)) this._classes.delete(c);
            else this._classes.add(c);
          } else if (force) {
            this._classes.add(c);
          } else {
            this._classes.delete(c);
          }
        },
        contains(c) { return this._classes.has(c); }
      },
      appendChild: () => {}
    }
  };

  global.window = global;
  global.document = mockDoc;
  global.localStorage = mockLocalStorage;
  global.CSS = { escape: (s) => s };
  global.dispatchEvent = () => {};
  global.CustomEvent = class CustomEvent {
    constructor(type, params) {
      this.type = type;
      this.detail = params && params.detail;
    }
  };

  return { mockLocalStorage, mockDoc, storage, elements };
}

test('Vocabulary Book: StorageModule persists sid and pid', () => {
  setupMockEnv();

  // Load storage.js
  const storageCode = fs.readFileSync(path.join(__dirname, '../js/storage.js'), 'utf8');
  eval(storageCode);

  assert.ok(global.StorageModule, 'StorageModule should be loaded');

  // Add word with sid and pid
  const res = global.StorageModule.addWordToBook(
    'nonsense',
    'n. 无稽之谈、荒谬的想法',
    `As a linguist once said, "You can get people to think it's nonsense at the same time that you buy into it."`,
    2015,
    3,
    15,
    4
  );

  assert.strictEqual(res.added, true);
  const book = global.StorageModule.getVocabBook();
  assert.strictEqual(book.length, 1);
  assert.strictEqual(book[0].word, 'nonsense');
  assert.strictEqual(book[0].sid, 15);
  assert.strictEqual(book[0].pid, 4);
  assert.strictEqual(book[0].year, 2015);
  assert.strictEqual(book[0].textId, 3);

  // Toggle bookmark (remove)
  const toggleOff = global.StorageModule.toggleBookmark('nonsense');
  assert.strictEqual(toggleOff.added, false);
  assert.strictEqual(global.StorageModule.getVocabBook().length, 0);

  // Toggle bookmark (add with sid, pid)
  const toggleOn = global.StorageModule.toggleBookmark(
    'dominated',
    'adj. 受支配的',
    `"Let's not forget sports—in male-dominated corporate America, it's still a big deal."`,
    2015,
    3,
    5,
    1
  );
  assert.strictEqual(toggleOn.added, true);
  const book2 = global.StorageModule.getVocabBook();
  assert.strictEqual(book2[0].word, 'dominated');
  assert.strictEqual(book2[0].sid, 5);
  assert.strictEqual(book2[0].pid, 1);
});

test('Vocabulary Book: findSentenceInText matches sentences by sid, text, and word', () => {
  const raw2015 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/2015.json'), 'utf8'));
  const text3 = raw2015.texts.find(t => t.text_id === 3);
  assert.ok(text3, '2015 Text 3 should exist');

  // Extract findSentenceInText definition from app.js
  const appCode = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
  assert.ok(appCode.includes('function findSentenceInText'), 'findSentenceInText function should be defined in app.js');

  const fnMatch = appCode.match(/function findSentenceInText\([\s\S]*?\n  \}/);
  assert.ok(fnMatch, 'findSentenceInText declaration should be found');
  const findSentenceInText = new Function(`${fnMatch[0]}; return findSentenceInText;`)();

  // Test 1: Match by explicit sid
  const matchSid = findSentenceInText(text3, '', '', 15);
  assert.ok(matchSid, 'Should find sentence by sid 15');
  assert.strictEqual(matchSid.sid, 15);
  assert.strictEqual(matchSid.pid, 4);

  // Test 2: Match by exact or partial sentence text with quote variants (like the user screenshot)
  const userNonsenseSent = `As a linguist once said, "You can get people to think it's nonsense at the same time that you buy into it." In a workplace that's fundamentally indifferent to your life and its meaning, office speak can help you figure out how you relate to your work—and how your work defines who you are.`;
  const matchText = findSentenceInText(text3, userNonsenseSent, 'nonsense', null);
  assert.ok(matchText, 'Should match nonsense context sentence');
  assert.strictEqual(matchText.sid, 15);
  assert.strictEqual(matchText.pid, 4);

  // Test 3: Match dominated context sentence from 2015 Text 3
  const userDominatedSent = `“Let's not forget sports—in male-dominated corporate America, it's still a big deal.`;
  const matchDominated = findSentenceInText(text3, userDominatedSent, 'dominated', null);
  assert.ok(matchDominated, 'Should match dominated context sentence');
  assert.strictEqual(matchDominated.sid, 5);
  assert.strictEqual(matchDominated.pid, 1);

  // Test 4: Match coincidence from 2015 Text 3 (Sentence 4)
  const userCoincidenceSent = `Koehn pointed out that this new era of corporate vocabulary is very “team”-oriented— and not by coincidence.`;
  const matchCoincidence = findSentenceInText(text3, userCoincidenceSent, 'coincidence', null);
  assert.ok(matchCoincidence, 'Should match coincidence context sentence');
  assert.strictEqual(matchCoincidence.sid, 4);
  assert.strictEqual(matchCoincidence.pid, 1);
});

test('Review Mode: Sentence analysis step mapping for target sentence', () => {
  setupMockEnv();
  const raw2015 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/2015.json'), 'utf8'));
  const text3 = raw2015.texts.find(t => t.text_id === 3);

  // Load review_content.js and quiz.js
  const reviewContentCode = fs.readFileSync(path.join(__dirname, '../js/review_content.js'), 'utf8');
  eval(reviewContentCode);
  const quizCode = fs.readFileSync(path.join(__dirname, '../js/quiz.js'), 'utf8');
  eval(quizCode);

  assert.ok(global.QuizModule, 'QuizModule should be loaded');
  const reviewSteps = global.QuizModule.buildReviewSteps(text3);
  assert.ok(reviewSteps.length > 0, 'Review steps should be built');

  // When jumping to nonsense (sid: 15, pid: 4):
  const targetSid = 15;
  const targetPid = 4;
  const sentsInPara = text3.sentences.filter(s => s.pid === targetPid);
  const sIdx = sentsInPara.findIndex(s => s.sid === targetSid);
  assert.ok(sIdx >= 0, 'Sentence should exist within paragraph');

  // Find corresponding review step in Section 2
  const stepIdx = reviewSteps.findIndex(st => st.section === 2 && st.meta && st.meta.para === targetPid && st.meta.sentence === sIdx);
  assert.ok(stepIdx >= 0, 'Corresponding Section 2 sentence analysis step should exist');
  
  const targetStep = reviewSteps[stepIdx];
  assert.strictEqual(targetStep.section, 2);
  assert.strictEqual(targetStep.meta.para, targetPid);
  assert.strictEqual(targetStep.meta.sentence, sIdx);
});
