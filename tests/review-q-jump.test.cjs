const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const map = new Map();
const container = { innerHTML: '', querySelector: () => null, querySelectorAll: () => [] };

const context = vm.createContext({
  window: {},
  console,
  localStorage: { getItem: k => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) },
  document: {
    documentElement: { style: { setProperty: () => {} } },
    getElementById: () => container,
    querySelectorAll: () => []
  }
});

for (const file of ['data/all_data.js', 'js/storage.js', 'js/review_content.js', 'js/quiz.js', 'js/reader.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}

const { KAOYAN_PURE_DATA: db, QuizModule: quiz, ReaderModule: reader } = context.window;
const text1 = db['2010'].texts[0];

test('Review Mode Section 3 Question Jump Navigation Feature', async (t) => {
  await t.test('Section 3 steps have question metadata', () => {
    const steps = quiz.buildReviewSteps(text1);
    const sec3Steps = steps.filter(s => s.section === 3);
    assert.ok(sec3Steps.length > 0, 'Section 3 steps should exist');
    
    const overviews = sec3Steps.filter(s => s.meta && s.meta.form === 'overview');
    assert.equal(overviews.length, 5, 'Should have 5 overview steps for 5 questions');
    overviews.forEach((s, idx) => {
      assert.equal(s.meta.qid, String(21 + idx));
    });
  });

  await t.test('renderStep in Section 3 renders question navigation pills', () => {
    const steps = quiz.buildReviewSteps(text1);
    const q22Overview = steps.find(s => s.section === 3 && s.meta && s.meta.qid === '22' && s.meta.form === 'overview');
    const stepIdx = steps.indexOf(q22Overview);

    let renderedHtml = '';
    const mockContainer = {
      set innerHTML(val) { renderedHtml = val; },
      get innerHTML() { return renderedHtml; }
    };
    context.document.getElementById = (id) => (id === 'workspaceContent' ? mockContainer : null);

    quiz.renderStep(q22Overview, stepIdx, steps.length, 'workspaceContent', text1);

    assert.ok(renderedHtml.includes('class="review-q-nav"'), 'Review question navigation bar should be rendered');
    assert.ok(renderedHtml.includes('🎯 题号直达:'), 'Label should be rendered');
    assert.ok(renderedHtml.includes('data-qid="21"'), 'Question 21 button should exist');
    assert.ok(renderedHtml.includes('data-qid="22"'), 'Question 22 button should exist');
    assert.ok(renderedHtml.includes('btn-review-q-jump active" data-qid="22"'), 'Question 22 button should have active class');
    assert.ok(renderedHtml.includes('data-qid="25"'), 'Question 25 button should exist');
  });

  await t.test('renderFull renders sticky question navigation and question card anchors', () => {
    const steps = quiz.buildReviewSteps(text1);
    let fullHtml = '';
    const mockContainer = {
      set innerHTML(val) { fullHtml = val; },
      get innerHTML() { return fullHtml; }
    };
    context.document.getElementById = (id) => (id === 'workspaceContent' ? mockContainer : null);

    quiz.renderFull(steps, 'workspaceContent');

    assert.ok(fullHtml.includes('class="review-q-nav sticky-q-nav"'), 'Sticky question navigation should be rendered in Full Mode');
    assert.ok(fullHtml.includes('id="review-q-card-21"'), 'Card anchor for Q21 should exist');
    assert.ok(fullHtml.includes('id="review-q-card-22"'), 'Card anchor for Q22 should exist');
    assert.ok(fullHtml.includes('id="review-q-card-23"'), 'Card anchor for Q23 should exist');
    assert.ok(fullHtml.includes('id="review-q-card-24"'), 'Card anchor for Q24 should exist');
    assert.ok(fullHtml.includes('id="review-q-card-25"'), 'Card anchor for Q25 should exist');
  });

  await t.test('renderExamPaper includes 🎯 复盘 button on each question card', () => {
    let paperHtml = '';
    const mockContainer = {
      style: {},
      querySelectorAll: () => [],
      set innerHTML(val) { paperHtml = val; },
      get innerHTML() { return paperHtml; }
    };
    context.document.getElementById = (id) => (id === 'examPaper' ? mockContainer : null);

    reader.renderExamPaper(text1, 'examPaper');

    for (let qid = 21; qid <= 25; qid++) {
      assert.ok(paperHtml.includes(`class="btn-jump-to-review-q" data-qid="${qid}"`), `Q${qid} should have direct review jump button`);
    }
  });
});
