const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const map = new Map();
const container = { innerHTML: '' };
const context = vm.createContext({ window: {}, console,
  localStorage: { getItem: k => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) },
  document: { getElementById: () => container }
});
for (const file of ['data/all_data.js', 'js/storage.js', 'js/review_content.js', 'js/exporter.js', 'js/quiz.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
const { KAOYAN_PURE_DATA: db, QuizModule: quiz, ReviewContent: C, ExporterModule: exporter, StorageModule: storage } = context.window;

test('all 68 reviews remain directly readable, with no form fields or answer-gating', () => {
  let count = 0;
  for (const [year, data] of Object.entries(db)) {
    assert.equal(JSON.stringify(data), JSON.stringify(JSON.parse(fs.readFileSync(path.join(root, 'data', `${year}.json`), 'utf8'))));
    for (const t of data.texts) {
      count++;
      const start = Number(t.q_range.split('-')[0]);
      assert.equal(t.questions.length, 5);
      t.questions.forEach((q, i) => {
        assert.equal(q.qid, start + i);
        assert.equal(q.options.length, 4);
        assert.equal(q.options.filter(o => o.is_correct).length, 1);
      });
      const steps = quiz.buildReviewSteps(t);
      assert.equal(new Set(steps.map(s => s.section)).size, 6);
      const html = steps.map(s => s.html).join('\n');
      assert.doesNotMatch(html, /\bundefined\b|\bNaN\b|data-sid="null"/, `${year} T${t.text_id}`);
      assert.doesNotMatch(html, /<(?:textarea|input|select|details)\b/i, 'Reading must not introduce tasks or conceal explanations');
      const overview = steps.filter(s => s.meta?.form === 'overview');
      assert.equal(overview.length, 5);
      overview.forEach((s, i) => assert.ok(s.html.includes(`答案：${t.questions[i].options.find(o => o.is_correct).key}`)));
      const section4 = steps.find(s => s.section === 4).html;
      assert.ok(section4.includes('段落小标题对应与解析'));
      assert.ok(!section4.includes('checkPartB'));
      const md = exporter.buildMarkdownNotes(t);
      assert.doesNotMatch(md, /\bundefined\b|\bNaN\b/);
      assert.equal((md.match(/^## [一二三四五]、/gm) || []).length, 5);
      assert.doesNotMatch(quiz.buildPracticeSteps(t).map(s => s.html).join('\n'), /\bundefined\b|\bNaN\b/);
      storage.saveMockAnswers(t.year, t.text_id, {}, true);
      quiz.renderMockExam(t, 'workspaceContent');
      assert.doesNotMatch(container.innerHTML, /\bundefined\b|\bNaN\b/);
    }
  }
  assert.equal(count, 68);
});

test('recent 12 passages have 60 literal paragraph evidence anchors and 36 sourced writing examples', () => {
  let paragraphs = 0, writing = 0;
  for (const year of [2024, 2025, 2026]) for (const t of db[year].texts) {
    for (const f of t.macro_logic.paragraph_functions) {
      assert.ok(t.paragraphs.find(p => p.pid === f.pid)?.text.includes(f.evidence));
      paragraphs++;
    }
    for (const w of t.writing_corpus) {
      assert.ok(C.writingSource(t, w));
      assert.ok(w.usage_note && w.application_sentence && w.sentence_cn);
      writing++;
    }
    const pb = t.macro_logic.part_b_training;
    for (const p of pb.target_paragraphs) {
      assert.ok(t.paragraphs.some(x => x.pid === p.pid));
      assert.ok(pb.options.some(o => o.key === p.correct_key && !o.is_distractor));
    }
  }
  assert.equal(paragraphs, 60);
  assert.equal(writing, 36);
  assert.match(db[2024].texts[0].macro_logic.main_theme, /数字经济/);
  assert.doesNotMatch(db[2024].texts[0].macro_logic.main_theme, /龋齿|骨骼/);
  assert.match(db[2024].texts[2].macro_logic.main_theme, /老年|医生/);
  assert.match(db[2024].texts[3].macro_logic.main_theme, /健康应用/);
  assert.match(db[2026].texts[3].macro_logic.paragraph_functions[3].core_point, /商业赞助/);
});

test('vocabulary context does not guess using a phrase first word', () => {
  const t = { sentences: [{ sid: 0, pid: 0, text: 'The artist visited the library.' }], questions: [{ qid: 21, options: [{ key: 'B', text: 'the public library' }] }] };
  assert.equal(C.context(t, 'the private library', 0), null);
  assert.equal(C.context(t, 'the public library', 0).label, '第 21 题 · 选项 B');
  assert.equal(C.contains('artist', 'art'), false);
  assert.equal(C.contains('Hirst’s sale', "Hirst's sale"), true);
  const p = { pid: 0, vocabulary: [{ word: 'artist' }, { word: 'Artist' }] };
  assert.equal(C.vocabulary(t, p).length, 1);
});

test('new analysis schema is read faithfully without inventing missing arguments', () => {
  const q = db[2026].texts[0].questions[0], o = q.options[0];
  assert.equal(C.analysis(q, o).locator_comparison, o.analysis.logic_check);
  assert.equal(C.analysis(q, o).writing_perspective, '');
  assert.equal(C.pairs(q)[0].text_term, q.synonym_pairs[0].source);
});

test('eight repaired abbreviation splits retain complete sentences inside their original paragraphs', () => {
  for (const [year, id, sid] of [[2010,1,8], [2010,3,2], [2010,3,5], [2010,3,16], [2011,1,2], [2011,1,4], [2011,1,20], [2021,3,7]]) {
    const t = db[year].texts.find(t => t.text_id === id);
    const s = t.sentences.find(s => s.sid === sid);
    assert.ok(t.paragraphs.find(p => p.pid === s.pid).text.includes(s.text));
    assert.doesNotMatch(s.text, /\b(?:Dr|Mr|Ms)\.$/);
    assert.ok(s.syntax.breakdown.length >= 2);
    assert.ok(!t.sentences.some(s => s.sid === sid + 1));
  }
});

test('all 340 questions across 68 passages support word tokenization and complete bilingual translation', () => {
  let qCount = 0;
  let optCount = 0;
  for (const [year, data] of Object.entries(db)) {
    for (const t of data.texts) {
      const allVocab = t.paragraphs ? t.paragraphs.flatMap(p => p.vocabulary || []) : [];
      for (const q of t.questions) {
        qCount++;
        assert.ok(q.stem && q.stem_cn, `${year} T${t.text_id} Q${q.qid} missing stem or stem_cn`);
        const tokenizedStem = C.formatQuestionText(q.stem, allVocab);
        assert.match(tokenizedStem, /class="(?:exam-word-token|exam-vocab|exam-connector)"/, `${year} T${t.text_id} Q${q.qid} stem not tokenized`);

        for (const opt of q.options) {
          optCount++;
          assert.ok(opt.text && opt.text_cn, `${year} T${t.text_id} Q${q.qid} opt ${opt.key} missing text or text_cn`);
          const tokenizedOpt = C.formatQuestionText(opt.text, allVocab);
          assert.match(tokenizedOpt, /class="(?:exam-word-token|exam-vocab|exam-connector)"/, `${year} T${t.text_id} Q${q.qid} opt ${opt.key} not tokenized`);
        }
      }
    }
  }
  assert.equal(qCount, 340);
  assert.equal(optCount, 1360);

  // Test word tokenization with contractions and connectors
  const sample = C.formatQuestionText("In the first paragraph, Damien Hirst’s sale was referred to because .");
  assert.match(sample, /data-word="Hirst’s"/);
  assert.match(sample, /class="exam-connector" data-connector="because"/);
});

