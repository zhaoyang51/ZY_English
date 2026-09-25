const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

function setupDOM() {
  const elements = new Map();
  function makeEl(id) {
    const el = {
      id,
      innerHTML: '',
      textContent: '',
      style: {},
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        toggle(c, v) { if (v) this._classes.add(c); else this._classes.delete(c); },
        contains(c) { return this._classes.has(c); }
      },
      attributes: {},
      setAttribute(k, v) { this.attributes[k] = String(v); },
      getAttribute(k) { return this.attributes[k]; },
      removeAttribute(k) { delete this.attributes[k]; },
      addEventListener() {},
      querySelectorAll() { return []; },
      querySelector() { return null; },
      scrollIntoView() {}
    };
    elements.set(id, el);
    return el;
  }

  const document = {
    getElementById(id) {
      if (!elements.has(id)) makeEl(id);
      return elements.get(id);
    },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    documentElement: { style: { setProperty() {} } },
    body: { classList: { toggle() {}, add() {}, remove() {} } }
  };

  const context = vm.createContext({
    window: {},
    document,
    localStorage: {
      _data: {},
      getItem(k) { return this._data[k] || null; },
      setItem(k, v) { this._data[k] = String(v); },
      removeItem(k) { delete this._data[k]; }
    },
    console: { log() {}, warn() {}, error() {} }
  });

  vm.runInContext(read('js/render_cloze.js'), context);
  vm.runInContext(read('js/render_matching.js'), context);
  vm.runInContext(read('js/render_translation.js'), context);

  return { context, document, elements };
}

test('Renderer modules can render all years 2010 to 2026 without errors', () => {
  const { context, document } = setupDOM();
  assert.ok(context.window.ClozeRenderer);
  assert.ok(context.window.MatchingRenderer);
  assert.ok(context.window.TranslationRenderer);

  for (let yr = 2010; yr <= 2026; yr++) {
    const data = JSON.parse(read(`data/${yr}.json`));
    
    // 1. Cloze
    context.window.ClozeRenderer.render(data.use_of_english, yr, 'practice');
    assert.ok(document.getElementById('examPaper').innerHTML.includes('Section I'));
    assert.ok(document.getElementById('workspaceContent').innerHTML.includes('cloze-card'));

    // 2. Matching
    context.window.MatchingRenderer.render(data.part_b, yr, 'practice');
    assert.ok(document.getElementById('examPaper').innerHTML.includes('Part B'));
    assert.ok(document.getElementById('workspaceContent').innerHTML.includes('matching-item-card'));

    // 3. Translation
    context.window.TranslationRenderer.render(data.translation, yr, 'practice');
    assert.ok(document.getElementById('examPaper').innerHTML.includes('Section III'));
    assert.ok(document.getElementById('workspaceContent').innerHTML.includes('trans-textarea'));
  }
});

test('ClozeRenderer immediately grades upon option selection (both correct and wrong)', () => {
  const { context, document } = setupDOM();
  const data = JSON.parse(read('data/2012.json'));
  
  // 1. Initial render without answers: all unpicked
  context.window.ClozeRenderer.render(data.use_of_english, 2012, 'practice');
  const initialHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(initialHtml.includes('未作答'));
  assert.ok(initialHtml.includes('cloze-dashboard'));

  // 2. Select Question 1 with correct answer ('A') and Question 2 with wrong answer ('A')
  // For 2012, Q1 verified answer is 'A' (served), Q2 answer is 'B' (common)
  context.localStorage.setItem('kaoyan_cloze_2012', JSON.stringify({ 1: 'A', 2: 'A' }));
  context.window.ClozeRenderer.render(data.use_of_english, 2012, 'practice');

  const gradedHtml = document.getElementById('workspaceContent').innerHTML;
  const leftHtml = document.getElementById('examPaper').innerHTML;

  // Question 1: correct
  assert.ok(gradedHtml.includes('回答正确 (+0.5分)'));
  assert.ok(leftHtml.includes('cloze-blank filled correct'));

  // Question 2: wrong (with gentle soft styling and clear distinction)
  assert.ok(gradedHtml.includes('错选 [A] · 正解: [B]'));
  assert.ok(gradedHtml.includes('cloze-opt-flag wrong'));
  assert.ok(leftHtml.includes('cloze-blank filled wrong'));

  // Analysis shown directly for graded questions
  assert.ok(gradedHtml.includes('cloze-analysis-box'));

  // Dashboard stats
  assert.ok(gradedHtml.includes('答对</span>\n              <span class="cloze-stat-val">1 题'));
  assert.ok(gradedHtml.includes('答错</span>\n              <span class="cloze-stat-val">1 题'));
  assert.ok(gradedHtml.includes('0.5 <small'));

  // 3. In Review Mode (mode === 'review'), verify clean review badge without '错误'
  context.window.ClozeRenderer.render(data.use_of_english, 2012, 'review');
  const reviewHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(reviewHtml.includes('review-key'));
  assert.ok(reviewHtml.includes('正解: [B]'));
  assert.ok(!reviewHtml.includes('✖ 错误 正解'));
  assert.ok(!reviewHtml.includes('cloze-opt-btn dimmed'), 'Review mode options should not be dimmed');
  assert.ok(reviewHtml.includes('cloze-opt-btn review-opt'), 'Review mode options should have review-opt class');
});

test('Cloze and Part B bilingual Chinese translation toggle and data coverage (2010-2026)', () => {
  const { context, document } = setupDOM();

  for (let yr = 2010; yr <= 2026; yr++) {
    const data = JSON.parse(read(`data/${yr}.json`));

    // Verify Use of English translation coverage
    const uoe = data.use_of_english;
    assert.ok(uoe, `Missing use_of_english for ${yr}`);
    assert.ok(uoe.paragraphs.length > 0, `No paragraphs in cloze for ${yr}`);
    uoe.paragraphs.forEach((p, idx) => {
      assert.ok(p.translation && p.translation.length > 5, `Missing paragraph ${idx} translation in cloze ${yr}`);
    });
    assert.equal(uoe.questions.length, 20, `Expected 20 questions in cloze ${yr}`);
    uoe.questions.forEach((q) => {
      assert.ok(q.options_cn, `Missing options_cn for question ${q.qid} in cloze ${yr}`);
      assert.ok(q.options_cn.A && q.options_cn.B && q.options_cn.C && q.options_cn.D, `Incomplete options_cn for Q${q.qid} in ${yr}`);
    });

    // Verify Part B translation coverage
    const pb = data.part_b;
    assert.ok(pb, `Missing part_b for ${yr}`);
    assert.ok(pb.paragraphs.length > 0, `No paragraphs in part_b for ${yr}`);
    pb.paragraphs.forEach((p, idx) => {
      assert.ok(p.translation && p.translation.length > 5, `Missing paragraph ${idx} translation in part_b ${yr}`);
    });
    assert.equal(pb.items.length, 5, `Expected 5 items in part_b ${yr}`);
    pb.items.forEach((it) => {
      assert.ok(it.title_cn && it.title_cn.length > 0, `Missing title_cn for item ${it.qid} in ${yr}`);
    });
    assert.ok(pb.options_cn, `Missing options_cn in part_b ${yr}`);
  }

  // Test interactive rendering & toggle in Cloze
  const data2015 = JSON.parse(read('data/2015.json'));

  // 1. By default (showTrans = false), no cloze-para-trans
  context.localStorage.setItem('kaoyan_cloze_show_trans', 'false');
  context.window.ClozeRenderer.render(data2015.use_of_english, 2015, 'practice');
  let paperHtml = document.getElementById('examPaper').innerHTML;
  let wsHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(!paperHtml.includes('cloze-para-trans'), 'cloze-para-trans should not be visible when showTrans is false');
  assert.ok(paperHtml.includes('id="btnToggleClozeTrans"'), 'btnToggleClozeTrans button must exist in toolbar');

  // 2. Set showTrans = true, verify cloze-para-trans and option translations
  context.window.ClozeRenderer.setShowTrans(true);
  context.window.ClozeRenderer.render(data2015.use_of_english, 2015, 'practice');
  paperHtml = document.getElementById('examPaper').innerHTML;
  wsHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(paperHtml.includes('cloze-para-trans'), 'cloze-para-trans must be rendered when showTrans is true');
  assert.ok(paperHtml.includes('cloze-trans-badge'), 'cloze-trans-badge must be rendered');
  assert.ok(wsHtml.includes('cloze-opt-cn'), 'cloze-opt-cn should be rendered for options');

  // Test interactive rendering & toggle in Part B
  // 1. When showTrans is false, no partb-para-trans
  context.window.MatchingRenderer.setShowTrans(false);
  context.window.MatchingRenderer.render(data2015.part_b, 2015, 'practice');
  paperHtml = document.getElementById('examPaper').innerHTML;
  wsHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(!paperHtml.includes('partb-para-trans'), 'partb-para-trans should not be visible when showTrans is false');
  assert.ok(paperHtml.includes('id="btnTogglePartBTrans"'), 'btnTogglePartBTrans button must exist in toolbar');

  // 2. When showTrans is true, verify partb-para-trans, matching-item-cn, matching-opt-cn
  context.window.MatchingRenderer.setShowTrans(true);
  context.window.MatchingRenderer.render(data2015.part_b, 2015, 'practice');
  paperHtml = document.getElementById('examPaper').innerHTML;
  wsHtml = document.getElementById('workspaceContent').innerHTML;
  assert.ok(paperHtml.includes('partb-para-trans'), 'partb-para-trans must be rendered when showTrans is true');
  assert.ok(paperHtml.includes('partb-trans-badge'), 'partb-trans-badge must be rendered');
  assert.ok(wsHtml.includes('matching-item-cn'), 'matching-item-cn must be rendered');
  assert.ok(wsHtml.includes('matching-opt-cn'), 'matching-opt-cn must be rendered');
});

test('Part B items for all 17 years (2010-2026) have authentic question titles and full interactive elements', () => {
  const { context, document } = setupDOM();

  for (let yr = 2010; yr <= 2026; yr++) {
    const data = JSON.parse(read(`data/${yr}.json`));
    const pb = data.part_b;
    assert.ok(pb, `Year ${yr} must have part_b`);
    assert.equal(pb.items.length, 5, `Year ${yr} must have 5 items (41-45)`);

    pb.items.forEach(it => {
      assert.ok(it.title && it.title.length > 3, `Year ${yr} item ${it.qid} must have non-empty title`);
      assert.ok(!it.title.includes('【第 41 题】 (选择对应小标题)'), `Year ${yr} item ${it.qid} must not have placeholder title`);
      assert.ok(it.title_cn && it.title_cn.length > 2, `Year ${yr} item ${it.qid} must have non-empty title_cn`);
    });

    // Render in practice mode
    context.window.MatchingRenderer.render(pb, yr, 'practice');
    const paperHtml = document.getElementById('examPaper').innerHTML;
    const wsHtml = document.getElementById('workspaceContent').innerHTML;

    if (pb.subtype === 'heading_matching') {
      // Must contain interactive heading slots
      assert.ok(paperHtml.includes('partb-heading-slot'), `Year ${yr} heading matching must have partb-heading-slot`);
    } else {
      // Multiple matching / true false must contain questions panel with authentic items
      assert.ok(paperHtml.includes('partb-questions-panel'), `Year ${yr} must have partb-questions-panel`);
      assert.ok(paperHtml.includes('partb-exam-item-row'), `Year ${yr} must have partb-exam-item-row`);
    }

    // Verify workspace displays authentic item titles
    pb.items.forEach(it => {
      assert.ok(wsHtml.includes(it.title.substring(0, 15)), `Workspace must render item title for ${yr} ${it.qid}`);
    });
  }
});

test('ClozeRenderer supports two practice styles: instant grading and whole submit mode', () => {
  const { context, document } = setupDOM();
  const data = JSON.parse(read('data/2012.json'));

  // 1. Initial practice style defaults to 'instant'
  assert.equal(context.window.ClozeRenderer.getPracticeStyle(), 'instant');

  // 2. Switch to 'submit' (全篇统一交卷) mode
  context.window.ClozeRenderer.setPracticeStyle('submit');
  assert.equal(context.window.ClozeRenderer.getPracticeStyle(), 'submit');

  // Clear any existing submission for 2012
  context.window.ClozeRenderer.setSubmittedForYear(2012, false);
  context.localStorage.setItem('kaoyan_cloze_2012', JSON.stringify({ 1: 'A', 2: 'A' })); // 1 correct, 2 wrong

  context.window.ClozeRenderer.render(data.use_of_english, 2012, 'practice');
  const paperHtmlPre = document.getElementById('examPaper').innerHTML;
  const wsHtmlPre = document.getElementById('workspaceContent').innerHTML;

  // Before submission:
  // - Mode selector rendered and shows active submit button
  assert.ok(wsHtmlPre.includes('cloze-submode-segmented'));
  assert.ok(wsHtmlPre.includes('data-style="submit"'));
  // - No answers or correct/wrong flags revealed
  assert.ok(!wsHtmlPre.includes('✔ 回答正确'));
  assert.ok(!wsHtmlPre.includes('✖ 错选'));
  assert.ok(!wsHtmlPre.includes('cloze-opt-flag'));
  assert.ok(!wsHtmlPre.includes('cloze-analysis-box'), 'Analysis must be hidden before submit in submit mode');
  // - Options have 'selected' class
  assert.ok(wsHtmlPre.includes('cloze-opt-btn selected'));
  // - Badges show '已选 [A]'
  assert.ok(wsHtmlPre.includes('已选 [A]'));
  // - Left paper blank has 'filled picked', but not 'filled correct' or 'filled wrong'
  assert.ok(paperHtmlPre.includes('cloze-blank filled picked'));
  assert.ok(!paperHtmlPre.includes('blank-correct-hint'));
  // - Submit buttons present
  assert.ok(wsHtmlPre.includes('btnSubmitClozeTop') || wsHtmlPre.includes('btnSubmitClozeBottom'));

  // 3. Submit all answers
  context.window.ClozeRenderer.setSubmittedForYear(2012, true);
  context.window.ClozeRenderer.render(data.use_of_english, 2012, 'practice');

  const paperHtmlPost = document.getElementById('examPaper').innerHTML;
  const wsHtmlPost = document.getElementById('workspaceContent').innerHTML;

  // After submission:
  // - Graded flags & correct/wrong badges appear
  assert.ok(wsHtmlPost.includes('回答正确 (+0.5分)'));
  assert.ok(wsHtmlPost.includes('错选 [A] · 正解: [B]'));
  assert.ok(wsHtmlPost.includes('cloze-opt-flag correct'));
  assert.ok(wsHtmlPost.includes('cloze-analysis-box'), 'Analysis must be revealed after submission');
  // - Left paper blanks now show correct / wrong states
  assert.ok(paperHtmlPost.includes('cloze-blank filled correct'));
  assert.ok(paperHtmlPost.includes('cloze-blank filled wrong'));
  // - Re-exam button is rendered
  assert.ok(wsHtmlPost.includes('btnReExamCloze'));

  // Clean up
  context.window.ClozeRenderer.setPracticeStyle('instant');
  context.window.ClozeRenderer.setSubmittedForYear(2012, false);
});

test('TranslationRenderer renders accurate paragraph sentence placement and syntax modal buttons without duplicates (2010-2026)', () => {
  const { context, document } = setupDOM();

  for (let yr = 2010; yr <= 2026; yr++) {
    const data = JSON.parse(read(`data/${yr}.json`));
    context.window.TranslationRenderer.render(data.translation, yr, 'practice');
    const paperHtml = document.getElementById('examPaper').innerHTML;
    const wsHtml = document.getElementById('workspaceContent').innerHTML;

    // Check that each sentence span is present exactly once
    data.translation.sentences.forEach(s => {
      const regex = new RegExp(`trans-sent-${s.sid}`, 'g');
      const matches = paperHtml.match(regex) || [];
      assert.strictEqual(matches.length, 1, `Year ${yr} sentence ${s.sid} should appear exactly once in examPaper`);
    });

    // Check that every sentence row has a syntax trigger button
    assert.ok(wsHtml.includes('btn-trans-syntax'), `Year ${yr} should contain syntax buttons in workspace`);
  }
});

test('showSyntaxModal renders complete breakdown for translation sentences and reading comprehension without regressions', () => {
  const { context, document } = setupDOM();

  // Load showSyntaxModal from app.js into context
  const appCode = read('js/app.js');
  const start = appCode.indexOf('function formatColoredChunks');
  const end = appCode.indexOf('window.syncActiveSentenceToDOM = syncActiveSentenceToDOM;') + 'window.syncActiveSentenceToDOM = syncActiveSentenceToDOM;'.length;
  const syntaxCode = appCode.slice(start, end);
  vm.runInContext(syntaxCode, context);

  assert.strictEqual(typeof context.window.showSyntaxModal, 'function');
  assert.strictEqual(typeof context.window.navigateSyntaxSentence, 'function');

  // 1. Test translation sentence (2010 Sentence 1)
  const trans2010 = JSON.parse(read('data/2010.json')).translation;
  const sent1 = trans2010.sentences[0];
  context.window.showSyntaxModal(sent1, trans2010.sentences);

  const titleEl = document.getElementById('syntaxModalTitle');
  const contentEl = document.getElementById('syntaxModalContent');
  const prevBtn = document.getElementById('syntaxPrevSentBtn');
  const nextBtn = document.getElementById('syntaxNextSentBtn');
  const navIndexEl = document.getElementById('syntaxSentNavIndex');

  assert.strictEqual(titleEl.textContent, '🔍 英译汉句子拆解与采分点剖析');
  assert.strictEqual(navIndexEl.textContent, '第 1 / 7 句');
  assert.strictEqual(prevBtn.disabled, true, 'First sentence should disable prev button');
  assert.strictEqual(nextBtn.disabled, false, 'First sentence should enable next button');

  const transModalHtml = contentEl.innerHTML;
  assert.ok(transModalHtml.includes(sent1.en), 'Must render English sentence');
  assert.ok(transModalHtml.includes('【采分点拆解与评分要领】'), 'Must render scoring rubrics header');
  assert.ok(transModalHtml.includes('1 分'), 'Must render score badge');
  assert.ok(transModalHtml.includes(sent1.scoring_points[0].phrase), 'Must render rubric phrase');
  assert.ok(transModalHtml.includes(sent1.scoring_points[0].guide), 'Must render rubric guide');
  assert.ok(transModalHtml.includes('【主干识别与句法拆解】'), 'Must render grammar breakdown header');
  assert.ok(transModalHtml.includes(sent1.grammar_breakdown), 'Must render grammar breakdown text');
  assert.ok(transModalHtml.includes('【满分参考译文与考点】'), 'Must render reference translation header');
  assert.ok(transModalHtml.includes(sent1.cn), 'Must render Chinese translation');
  // Slashed text should not render when not present
  assert.ok(!transModalHtml.includes('【意群断句与速译】'), 'Should not render empty slashed text block');
  // Footer navigation should be rendered
  assert.ok(transModalHtml.includes('btn-modal-footer-prev'));
  assert.ok(transModalHtml.includes('btn-modal-footer-next'));

  // Navigate to Next Sentence (Sentence 2)
  context.window.navigateSyntaxSentence(1);
  const sent2 = trans2010.sentences[1];
  assert.strictEqual(navIndexEl.textContent, '第 2 / 7 句');
  assert.strictEqual(prevBtn.disabled, false, 'Sentence 2 should enable prev button');
  assert.strictEqual(nextBtn.disabled, false, 'Sentence 2 should enable next button');
  assert.ok(contentEl.innerHTML.includes(sent2.en), 'Must render second sentence after next');

  // Navigate back to Previous Sentence (Sentence 1)
  context.window.navigateSyntaxSentence(-1);
  assert.strictEqual(navIndexEl.textContent, '第 1 / 7 句');
  assert.strictEqual(prevBtn.disabled, true);
  assert.ok(contentEl.innerHTML.includes(sent1.en));

  // Navigate to the last sentence (Sentence 7)
  const lastSent = trans2010.sentences[trans2010.sentences.length - 1];
  context.window.showSyntaxModal(lastSent, trans2010.sentences);
  assert.strictEqual(navIndexEl.textContent, '第 7 / 7 句');
  assert.strictEqual(prevBtn.disabled, false);
  assert.strictEqual(nextBtn.disabled, true, 'Last sentence should disable next button');

  // 2. Test reading comprehension sentence (2010 Text 1 Sentence 1)
  const reading2010 = JSON.parse(read('data/2010.json')).texts[0];
  const readSent1 = reading2010.sentences[0];
  context.window.showSyntaxModal(readSent1, reading2010.sentences);

  const readModalHtml = contentEl.innerHTML;
  assert.strictEqual(titleEl.textContent, '🔍 长难句结构化拆解与考点剖析');
  assert.ok(readModalHtml.includes(readSent1.text), 'Must render reading English sentence');
  assert.ok(readModalHtml.includes('【意群断句与速译】'), 'Must render chunks block');
  assert.ok(readModalHtml.includes('【主干识别与句法拆解】'), 'Must render syntax breakdown block');
  assert.ok(readModalHtml.includes('【满分参考译文与考点】'), 'Must render reading reference translation');
  assert.ok(readModalHtml.includes(readSent1.translation), 'Must render translation text');
  // Scoring points should not render for reading sentences
  assert.ok(!readModalHtml.includes('【采分点拆解与评分要领】'), 'Should not render scoring points block for reading');
});

test('Translation strategy modal contains comprehensive 3-step strategy and rubric flowchart content and toggles properly', () => {
  const indexHtml = read('index.html');

  // Verify full mindmap flowchart content present in index.html
  assert.ok(indexHtml.includes('transStrategyModal'), 'Must have #transStrategyModal');
  assert.ok(indexHtml.includes('考研英语（二）英译汉核心三步法与提分全攻略'));
  assert.ok(indexHtml.includes('严复《天演论》'));
  assert.ok(indexHtml.includes('傅雷'));
  assert.ok(indexHtml.includes('最多不超过 0.5 分'), 'Must include 0.5 rubric rule');
  assert.ok(indexHtml.includes('按错误译文给分'), 'Must include multiple translations penalty rule');
  assert.ok(indexHtml.includes('三个及以上错别字扣 0.5 分'), 'Must include typos rule');
  assert.ok(indexHtml.includes('核心断句标尺：划出语义相对完整、逻辑清晰的 3~4 个意群'));
  assert.ok(indexHtml.includes('六大断句断点信号标尺'));
  assert.ok(indexHtml.includes('从属连词断句（理清从句归属）'));
  assert.ok(indexHtml.includes('并列连词断句（严守分界线）'));
  assert.ok(indexHtml.includes('game') && indexHtml.includes('猎物'));
  assert.ok(indexHtml.includes('wrong') && indexHtml.includes('不公对待/委屈'));
  assert.ok(indexHtml.includes('company') && indexHtml.includes('剧团/演出团'));
  assert.ok(indexHtml.includes('lay') && indexHtml.includes('外行的/非专业的'));
  assert.ok(indexHtml.includes('考研五大常考翻译方法技巧速查'));
  assert.ok(indexHtml.includes('定语从句的翻译'));
  assert.ok(indexHtml.includes('同位语从句的翻译'));
  assert.ok(indexHtml.includes('被动结构的翻译'));
  assert.ok(indexHtml.includes('of 结构的翻译'));
  assert.ok(indexHtml.includes('非谓语动词的翻译'));
  assert.ok(indexHtml.includes('长句拆短句经典对比'));
  assert.ok(indexHtml.includes('考研翻译 4 大常见误区'));

  // Verify TranslationRenderer openStrategyModal and closeStrategyModal interactive behavior
  const { context, document } = setupDOM();
  const modalEl = document.getElementById('transStrategyModal');
  const closeBtn = document.getElementById('closeTransStrategyBtn');
  const confirmBtn = document.getElementById('btnTransStrategyConfirm');

  assert.strictEqual(modalEl.classList.contains('show'), false);

  context.window.TranslationRenderer.openStrategyModal();
  assert.strictEqual(modalEl.classList.contains('show'), true, 'Modal must have show class when opened');

  context.window.TranslationRenderer.closeStrategyModal();
  assert.strictEqual(modalEl.classList.contains('show'), false, 'Modal must remove show class when closed');
});


