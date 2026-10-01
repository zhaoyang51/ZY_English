const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const y2015 = JSON.parse(fs.readFileSync(path.join(rootDir, 'data/2015.json'), 'utf8'));
const y2022 = JSON.parse(fs.readFileSync(path.join(rootDir, 'data/2022.json'), 'utf8'));

// Setup VM sandbox matching browser
const storageMap = new Map();
const container = { innerHTML: '', querySelector: () => null, querySelectorAll: () => [] };

const context = vm.createContext({
  window: {},
  console,
  localStorage: { getItem: k => storageMap.get(k) ?? null, setItem: (k, v) => storageMap.set(k, v) },
  document: {
    documentElement: { style: { setProperty: () => {} } },
    getElementById: () => container,
    querySelector: () => null,
    querySelectorAll: () => []
  }
});

for (const file of ['js/storage.js', 'js/review_content.js', 'js/reader.js', 'js/quiz.js']) {
  vm.runInContext(fs.readFileSync(path.join(rootDir, file), 'utf8'), context, { filename: file });
}

// Load findSentenceInText from app.js into context
const appJsCode = fs.readFileSync(path.join(rootDir, 'js/app.js'), 'utf8');
const fnMatch = appJsCode.match(/function findSentenceInText\([\s\S]*?\n  \}/);
vm.runInContext(`${fnMatch[0]}; window.findSentenceInText = findSentenceInText;`, context);

const { QuizModule, ReaderModule } = context.window;

test('Review Mode: Section 2 steps contain exact sentence sid in meta', () => {
  const text3 = y2015.texts.find(t => t.text_id === 3);
  assert.ok(text3, '2015 Text 3 should exist');

  const steps = QuizModule.buildReviewSteps(text3);
  const sec2SentenceSteps = steps.filter(s => s.section === 2 && s.meta && typeof s.meta.sentence === 'number');

  assert.ok(sec2SentenceSteps.length > 0, 'Should have Section 2 sentence steps');
  sec2SentenceSteps.forEach(st => {
    assert.strictEqual(typeof st.meta.sid, 'number', `Step ${st.title} should have numerical sid in meta`);
    const sent = text3.sentences.find(s => s.sid === st.meta.sid);
    assert.ok(sent, `Sentence with sid ${st.meta.sid} should exist in textData`);
    assert.strictEqual(sent.pid, st.meta.para, `Paragraph index must match sentence pid`);
  });
});

test('Review Mode: 2015 Text 3 Q31 Option B links to exact source sentence (sid 3, not sid 0)', () => {
  const text3 = y2015.texts.find(t => t.text_id === 3);
  const q31 = text3.questions.find(q => q.qid === 31);
  assert.ok(q31, 'Q31 should exist');

  const steps = QuizModule.buildReviewSteps(text3);

  // Check Q31 Overview step
  const q31Overview = steps.find(s => s.section === 3 && s.meta && s.meta.qid === '31' && s.meta.form === 'overview');
  assert.ok(q31Overview, 'Q31 Overview step should exist');
  assert.strictEqual(q31Overview.meta.para, 0, 'Q31 locates in Para 0');
  // Q31 locate_sentence is: "Even in traditional offices, 'the lingua franca of corporate America has gotten much more emotional...'" (sid 0)
  assert.strictEqual(q31Overview.meta.sid, 0, 'Q31 overview should link to sentence 0');

  // Check Q31 Option B steps (less energetic)
  // Option B source_sentence is: "but we didn't talk about energy; we didn't talk about passion." (sid 3)
  const optBSteps = steps.filter(s => s.section === 3 && s.meta && s.meta.qid === '31' && s.meta.option === 'B');
  assert.ok(optBSteps.length > 0, 'Q31 Option B steps should exist');
  
  optBSteps.forEach(st => {
    assert.strictEqual(st.meta.sid, 3, 'Q31 Option B meta.sid should be 3 (energy sentence), NOT 0!');
    assert.strictEqual(st.meta.para, 0, 'Q31 Option B meta.para should be 0');
  });

  // Verify rendered HTML includes data-sid="3" on the locate badge and blockquote
  const sampleOptBStep = optBSteps[0];
  assert.ok(sampleOptBStep.html.includes('data-sid="3"'), 'Option B HTML should contain data-sid="3"');
  assert.ok(sampleOptBStep.html.includes('source-sent-locate-badge'), 'Option B HTML should contain source-sent-locate-badge');
  assert.ok(sampleOptBStep.html.includes('source-quote-box'), 'Option B HTML should contain source-quote-box');
});

test('ReaderModule: highlightLocatorSentence targets exact sid element', () => {
  let selectedId = null;
  let pulseAdded = false;
  let scrollCalled = false;

  const mockSentEl = {
    offsetWidth: 100,
    classList: {
      add: (cls) => {
        if (cls === 'locator-pulse') pulseAdded = true;
      },
      remove: () => {}
    },
    scrollIntoView: () => {
      scrollCalled = true;
    }
  };

  const oldGetElementById = context.document.getElementById;
  context.document.getElementById = (id) => {
    selectedId = id;
    if (id === 'sent-3') return mockSentEl;
    return null;
  };

  ReaderModule.highlightLocatorSentence(3, 0);
  assert.strictEqual(selectedId, 'sent-3', 'Should search for sent-3 element');
  assert.strictEqual(pulseAdded, true, 'locator-pulse class should be added to target');
  assert.strictEqual(scrollCalled, true, 'scrollIntoView should be called on target');

  context.document.getElementById = oldGetElementById;
});

test('Data Integrity: 2022 Text 3 Q32 contains authentic dark patterns question, not duplicate meat study', () => {
  const text3 = y2022.texts.find(t => t.text_id === 3);
  assert.ok(text3, '2022 Text 3 should exist');

  const q32 = text3.questions.find(q => q.qid === 32);
  assert.ok(q32, '2022 Text 3 Q32 should exist');
  assert.ok(q32.stem.includes('dark patterns'), 'Q32 stem should mention dark patterns');
  assert.strictEqual(q32.locate_pid, 2, 'Q32 locates in paragraph 3 (pid 2)');
  
  const optD = q32.options.find(o => o.key === 'D');
  assert.ok(optD, 'Option D should exist');
  assert.strictEqual(optD.is_correct, true, 'Option D should be the correct answer');
  assert.ok(optD.text.includes('strong presence'), 'Option D should be their strong presence');
  assert.ok(optD.analysis.source_sentence.includes('53,000 product pages and 11,000 websites'), 'Source sentence should cite 2019 study');
});
