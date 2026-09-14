const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const values = new Map();
const container = { innerHTML: '' };
const ctx = vm.createContext({ window: {}, console, localStorage: {
  getItem: k => values.get(k) ?? null,
  setItem: (k, v) => values.set(k, v), removeItem: k => values.delete(k)
}, document: { getElementById: () => container } });
for (const file of ['data/all_data.js', 'js/storage.js', 'js/review_model.js', 'js/review_learning.js', 'js/quiz.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
}
const { KAOYAN_PURE_DATA: db, ReviewModel: model, ReviewLearningModule: review, StorageModule: storage, QuizModule: quiz } = ctx.window;

test('all 68 texts render five-part review, practice, submitted mocks and notes without missing values', () => {
  let count = 0;
  for (const [year, data] of Object.entries(db)) {
    assert.equal(JSON.stringify(data), JSON.stringify(JSON.parse(fs.readFileSync(path.join(root, 'data', `${year}.json`), 'utf8'))));
    for (const t of data.texts) {
      count++;
      assert.equal(t.questions.length, 5);
      const ids = t.questions.map(q => q.qid);
      assert.equal(new Set(ids).size, 5, `${year} T${t.text_id} unique question IDs`);
      const start = Number(t.q_range.split('-')[0]);
      t.questions.forEach((q, i) => {
        assert.equal(q.qid, start + i);
        assert.equal(q.options.filter(o => o.is_correct).length, 1);
        assert.equal(q.options.length, 4);
      });
      const steps = quiz.buildReviewSteps(t);
      assert.equal(new Set(steps.map(s => s.section)).size, 6);
      assert.ok(steps.filter(s => s.section === 2).length >= t.sentences.length);
      const html = steps.map(s => s.html).join('\n');
      assert.doesNotMatch(html, /\bundefined\b|\bNaN\b|data-sid="null"/, `${year} T${t.text_id} review`);
      for (let s = 1; s <= 5; s++) assert.ok(html.includes(`data-review-check="${s}"`));
      assert.doesNotMatch(quiz.buildPracticeSteps(t).map(s => s.html).join('\n'), /\bundefined\b|\bNaN\b/);
      storage.saveMockAnswers(t.year, t.text_id, {}, true);
      quiz.renderMockExam(t, 'workspaceContent');
      assert.doesNotMatch(container.innerHTML, /\bundefined\b|\bNaN\b/);
      const md = review.markdown(t);
      assert.doesNotMatch(md, /\bundefined\b|\bNaN\b/);
      assert.equal((md.match(/^## [1-5]\. /gm) || []).length, 5);
      const pb = t.macro_logic?.part_b_training;
      for (const p of pb?.target_paragraphs || []) {
        assert.ok(t.paragraphs.some(x => x.pid === p.pid));
        assert.ok(pb.options.some(o => o.key === p.correct_key && !o.is_distractor));
      }
    }
  }
  assert.equal(count, 68);
});

test('context uses whole expressions, never a shared first word or word substring', () => {
  const t = { sentences: [{ sid: 0, pid: 0, text: 'The artist studies art in a library.', translation: 'test' }], questions: [{ qid: 21, options: [{ key: 'B', text: 'the public library', text_cn: '公共图书馆' }] }] };
  assert.equal(model.context(t, 'the public library', 0).label, '第 21 题选项 B（题项表达）');
  assert.equal(model.context(t, 'the private library', 0), null);
  assert.equal(model.contains('artist', 'art'), false);
  assert.equal(model.contains('Hirst’s sale', "Hirst's sale"), true);
  assert.equal(model.context(t, 'art', 0).sid, 0);
});

test('new-style evidence and synonym pairs are preserved without inventing deeper analysis', () => {
  const q = db[2026].texts[0].questions[0];
  const opt = q.options[0];
  assert.equal(model.analysis(q, opt).comparison, opt.analysis.logic_check);
  assert.equal(model.analysis(q, opt).perspective, '');
  assert.equal(model.pairs(q)[0].source, q.synonym_pairs[0].source);
});

test('notes, choices and checklists survive reloads, remain isolated, and are exported', () => {
  const t = db[2025].texts[1];
  const message = '主干：主语 + 谓语；我的英文：Students can learn together.';
  assert.equal(storage.saveReviewDraftField(2025, 2, 'notes', 'writing:paragraph', message), true);
  storage.saveReviewDraftField(2025, 2, 'choices', '26', 'C');
  storage.saveReviewDraftField(2025, 2, 'checks', '5', true);
  assert.equal(storage.loadReviewDraft(2025, 2).notes['writing:paragraph'], message);
  assert.equal(storage.loadReviewDraft(2025, 3).notes['writing:paragraph'], undefined);
  assert.ok(review.markdown(t).includes(message));
  assert.ok(review.markdown(t).includes('我的复选：C'));
  values.set('KAOYAN_REVIEW_DRAFT_V1_2025_3', '{broken json');
  assert.equal(Object.keys(storage.loadReviewDraft(2025, 3).notes).length, 0);
});

test('editorial corrections follow the local passage and repair abbreviation splitting', () => {
  const a = db[2010].texts[0];
  assert.ok(a.sentences.some(s => s.text.includes('Mr. Hirst’s sale, spending')));
  assert.ok(!a.sentences.some(s => /Mr\.$/.test(s.text)));
  assert.match(a.macro_logic.main_theme, /供给不足/);
  assert.doesNotMatch(a.macro_logic.main_theme, /洗钱|回归.*审美/);
  const b = db[2026].texts[3].macro_logic;
  assert.match(b.paragraph_functions[3].core_point, /商业赞助/);
  assert.match(b.paragraph_functions[2].core_point, /税基/);
  assert.match(b.paragraph_functions[4].core_point, /公共职责/);
});
