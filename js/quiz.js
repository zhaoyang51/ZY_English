/**
 * Quiz & Review Module: Pure Data Template Engine
 * Supports:
 * 1. Mock Exam Mode (Blind answering + submit scoring + error book archiving)
 * 2. Step-by-Step Reasoning Mode (Instant deduction + locator sentence pulse + synonym cards)
 * 3. Five-Bird Review Mode (Comprehensive in-depth review)
 */
(function() {
  function getTrapPillHtml(trapType) {
    if (!trapType) return '';
    let cls = 'trap-pill-concept';
    if (trapType.includes('反向')) cls = 'trap-pill-opposite';
    else if (trapType.includes('无中生有')) cls = 'trap-pill-unfounded';
    else if (trapType.includes('过度')) cls = 'trap-pill-overextrapolate';
    else if (trapType.includes('因果') || trapType.includes('张冠李戴')) cls = 'trap-pill-causality';
    return `<span class="trap-pill ${cls}">🏷️ ${trapType}</span>`;
  }

  function getSynonymCardHtml(q, opt) {
    return `
      <div class="synonym-card">
        <div class="synonym-title">🎯 命题人同义替换核心对照</div>
        <table class="synonym-table">
          <thead>
            <tr><th>选项核心表达</th><th>↔</th><th>原文定位句</th><th>命题机制</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong style="color:var(--success)">${opt.text}</strong></td>
              <td style="text-align:center">↔</td>
              <td><strong style="color:var(--accent)">${q.locate_sentence.substring(0, 48)}...</strong></td>
              <td>精准主干同义改写</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  window.QuizModule = {
    // 1. Mock Exam Mode: Render 5 Questions for blind testing
    renderMockExam(textData, containerId, onOptionSelect, onSubmit) {
      const container = document.getElementById(containerId || 'workspaceContent');
      if (!container || !textData) return;

      const savedMock = window.StorageModule.loadMockAnswers(textData.year, textData.text_id) || { answers: {}, isSubmitted: false };
      const answers = savedMock.answers || {};
      const isSubmitted = savedMock.isSubmitted || false;

      let answeredCount = Object.keys(answers).length;
      let scoreHtml = '';

      if (isSubmitted) {
        let correctCount = 0;
        textData.questions.forEach(q => {
          const corrKey = (q.options.find(o => o.is_correct) || q.options[0]).key;
          if (answers[q.qid] === corrKey) correctCount++;
        });
        const score = correctCount * 2;
        scoreHtml = `
          <div class="score-summary-card">
            <h3 style="margin:0;color:var(--ink)">🎉 模考成绩报告</h3>
            <div class="score-number">${score} <span style="font-size:0.45em;font-weight:600">/ 10 分</span></div>
            <p style="margin:0;font-weight:600;color:var(--muted)">答对 ${correctCount} 题 ｜ 答错 ${5 - correctCount} 题 (错题已自动标红入库错题本)</p>
          </div>
        `;
      }

      let html = `
        <div class="mock-exam-header">
          <div>
            <h2 style="margin:0;font-size:1.3em;color:var(--mode-color)">📝 盲做模考模式 · Text ${textData.text_id}</h2>
            <p style="margin:4px 0 0;font-size:0.88em;color:var(--muted)">考场全真测试：隐藏答案与译文，自主作答交卷后解锁全真解析</p>
          </div>
          <span class="badge" style="padding:4px 10px;background:var(--mode-bg);color:var(--mode-color);border-radius:999px;font-weight:700">
            已作答: ${answeredCount} / 5
          </span>
        </div>

        ${scoreHtml}

        <div class="mock-questions-container">
      `;

      textData.questions.forEach(q => {
        const corrKey = (q.options.find(o => o.is_correct) || q.options[0]).key;
        const userChoice = answers[q.qid];
        const isAnswered = Boolean(userChoice);
        const isRight = isSubmitted && (userChoice === corrKey);
        const isWrong = isSubmitted && isAnswered && !isRight;

        let cardClass = 'mock-q-card';
        if (isAnswered) cardClass += ' answered';
        if (isSubmitted) cardClass += isRight ? ' result-correct' : ' result-wrong';

        let analysisHtml = '';
        if (isSubmitted) {
          const selectedOpt = q.options.find(o => o.key === userChoice);
          const correctOpt = q.options.find(o => o.is_correct);
          const savedReasons = window.StorageModule.loadErrorReasons(textData.year, textData.text_id, q.qid);

          let errorChecklistHtml = '';
          if (!isRight) {
            errorChecklistHtml = `
              <div class="error-reason-box" data-qid="${q.qid}">
                <div class="error-reason-title">⚠️ 本题做错归因自查（勾选后自动保存到错题本）：</div>
                <div class="error-reason-options">
                  <label class="error-reason-label"><input type="checkbox" value="生词障碍" ${savedReasons.includes('生词障碍') ? 'checked' : ''} onchange="window.handleErrorReasonChange(${textData.year}, ${textData.text_id}, ${q.qid}, this)"> 🔤 生词障碍</label>
                  <label class="error-reason-label"><input type="checkbox" value="长难句结构看错" ${savedReasons.includes('长难句结构看错') ? 'checked' : ''} onchange="window.handleErrorReasonChange(${textData.year}, ${textData.text_id}, ${q.qid}, this)"> 📐 句子结构看错</label>
                  <label class="error-reason-label"><input type="checkbox" value="掉入干扰项" ${savedReasons.includes('掉入干扰项') ? 'checked' : ''} onchange="window.handleErrorReasonChange(${textData.year}, ${textData.text_id}, ${q.qid}, this)"> 🪤 掉入干扰项</label>
                  <label class="error-reason-label"><input type="checkbox" value="定位错误" ${savedReasons.includes('定位错误') ? 'checked' : ''} onchange="window.handleErrorReasonChange(${textData.year}, ${textData.text_id}, ${q.qid}, this)"> 🎯 定位错误</label>
                  <label class="error-reason-label"><input type="checkbox" value="粗心审题" ${savedReasons.includes('粗心审题') ? 'checked' : ''} onchange="window.handleErrorReasonChange(${textData.year}, ${textData.text_id}, ${q.qid}, this)"> ⚡ 粗心审题不清</label>
                </div>
              </div>
            `;
          }

          analysisHtml = `
            <div style="margin-top:16px;padding-top:14px;border-top:1px dashed var(--border)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
                <span style="font-weight:700">【官方标准正解】：<strong style="color:var(--success)">${corrKey}</strong></span>
                <span style="font-size:0.85em;color:var(--muted)">题型：${q.type} ｜ 定位：第 ${q.locate_pid + 1} 段</span>
              </div>
              <p style="font-size:0.92em;color:var(--muted);margin-bottom:10px"><strong>题干释义：</strong>${q.stem_cn}</p>
              ${getSynonymCardHtml(q, correctOpt)}
              <div style="background:var(--surface);padding:10px 14px;border-radius:6px;border:1px solid var(--border);margin-top:10px">
                <p style="font-weight:700;color:var(--mode-color);margin-bottom:4px">💡 命题人设题思路与避坑剖析：</p>
                <p style="font-size:0.92em;line-height:1.6">${q.summary}</p>
              </div>
              ${errorChecklistHtml}
            </div>
          `;
        }

        html += `
          <div class="${cardClass}" id="mock-card-${q.qid}">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
              <div style="font-weight:700;font-size:1.05em">${q.qid}. ${q.stem}</div>
              ${isSubmitted ? (isRight ? '<span class="correct-badge">✔ 正确</span>' : '<span class="trap-badge">✘ 错误</span>') : ''}
            </div>
            
            <div class="mock-opt-list">
              ${q.options.map(opt => {
                let optClass = 'mock-opt-item';
                const isSelected = userChoice === opt.key;
                if (isSelected) optClass += ' selected';
                if (isSubmitted) {
                  if (opt.is_correct) optClass += ' opt-correct';
                  else if (isSelected && !opt.is_correct) optClass += ' opt-wrong';
                }

                const trapPill = (isSubmitted && !opt.is_correct) ? getTrapPillHtml(opt.trap_type) : '';

                return `
                  <div class="${optClass}" data-qid="${q.qid}" data-opt="${opt.key}" onclick="window.handleMockOptionClick(${textData.year}, ${textData.text_id}, ${q.qid}, '${opt.key}')">
                    <span style="font-weight:800;color:var(--mode-color)">[${opt.key}]</span>
                    <span style="flex:1">${opt.text}</span>
                    ${trapPill}
                  </div>
                `;
              }).join('')}
            </div>

            ${analysisHtml}
          </div>
        `;
      });

      html += `
        </div>
        <div style="margin:24px 0 60px;text-align:center">
          ${isSubmitted 
            ? `<button class="float-btn" style="position:static;display:inline-flex;padding:10px 28px;font-size:1em" onclick="window.handleMockReset(${textData.year}, ${textData.text_id})">🔄 重新模考答题</button>`
            : `<button class="float-btn" style="position:static;display:inline-flex;padding:12px 36px;font-size:1.05em;background:var(--accent)" onclick="window.handleMockSubmit(${textData.year}, ${textData.text_id})">📤 提交试卷并解锁全真解析</button>`
          }
        </div>
      `;

      container.innerHTML = html;
    },

    // 2. Step-by-Step Practice Mode: 5-Stage Progressive Reasoning
    buildPracticeSteps(textData) {
      const steps = [];
      const paras = textData.paragraphs;
      const questions = textData.questions;

      // 0. 阅前须知
      steps.push({
        section: "阅前须知",
        title: "0. 阅前须知",
        html: `<h1>0.阅前须知</h1>
<p>阅前声明，本教程对英语一英语二均适用。</p>
<p>本教程主要解决考研英语阅读备考中的三个结构性问题：</p>
<ol>
<li><p><strong>考研英语骗局一</strong>：拒绝上帝视角生词全懂，带着超纲生词读宏观主旨同样能做全对；</p></li>
<li><p><strong>考研英语骗局二</strong>：放弃考场即时信达雅机械翻译，采用意群粗读抓取核心信息；</p></li>
<li><p><strong>考研英语骗局三</strong>：拒绝所谓单一神技秒杀，采用定位比对与写作视角交叉验证。</p></li>
</ol>`,
        meta: {}
      });

      // 1. 先读题干
      steps.push({
        section: "先读题干",
        title: "1. 先读题干",
        html: `<h1>1. 先读题干</h1><p>首先先看题干再用意群法粗读一遍文章，不看选项是因为提前看选项会干扰粗读理解。看题干对考查重点建立大致印象，借助题文同序原则提前获取文章逻辑脉络。</p>`,
        meta: {}
      });

      questions.forEach(q => {
        steps.push({
          section: "先读题干",
          title: `${q.qid}题题干`,
          html: `<h2>${q.qid}题题干</h2><p><strong>${q.stem}</strong></p><blockquote><p>${q.stem_cn}</p></blockquote><p>题型：<strong>${q.type}</strong>。</p><p>定位预判：<strong>第 ${q.locate_pid + 1} 段</strong></p><hr />`,
          meta: { qid: String(q.qid), kind: "stem", para: q.locate_pid }
        });
      });

      // 2. 读文章过程 (4-Stage Progressive Reveal per Paragraph)
      steps.push({
        section: "读文章过程",
        title: "2. 读文章过程",
        html: `<h1>2. 读文章过程</h1><p>扫读全文，注重段落首尾句，识别论点与论据。关注核心逻辑转折词与态度评价词。</p>`,
        meta: {}
      });

      paras.forEach((p, pid) => {
        const maskHtml = p.slashed_text.replace(/([a-zA-Z]{5,})/g, '<span class="mask" onclick="this.classList.toggle(\'revealed\')">$1</span>');
        
        steps.push({
          section: "读文章过程",
          title: `第${pid+1}段 · 考场粗读`,
          html: `<h2>第${pid+1}段 考场粗读</h2><p>${p.text}</p>`,
          meta: { para: pid, stage: 0 }
        });

        steps.push({
          section: "读文章过程",
          title: `第${pid+1}段 · 考场粗读`,
          html: `<h2>第${pid+1}段 考场粗读</h2><p>${p.text}</p><h3>意群划分</h3><p>${p.slashed_text}</p>`,
          meta: { para: pid, stage: 1 }
        });

        steps.push({
          section: "读文章过程",
          title: `第${pid+1}段 · 考场粗读`,
          html: `<h2>第${pid+1}段 考场粗读</h2><p>${p.text}</p><h3>意群划分</h3><p>${p.slashed_text}</p><h3>生词遮挡模拟（点击揭示）</h3><p>${maskHtml}</p>`,
          meta: { para: pid, stage: 2 }
        });

        steps.push({
          section: "读文章过程",
          title: `第${pid+1}段 · 考场粗读`,
          html: `<h2>第${pid+1}段 考场粗读</h2><p>${p.text}</p><h3>意群划分</h3><p>${p.slashed_text}</p><h3>生词遮挡模拟</h3><p>${maskHtml}</p><h3>意群速译</h3><p style="color:#2563eb;font-weight:500">${p.chunk_translation}</p>`,
          meta: { para: pid, stage: 3 }
        });
      });

      // 3. 开始做题 (Deep Options Paraphrasing & Comparative Deduction + Synonym Cards + Traps)
      steps.push({
        section: "开始做题",
        title: "3. 开始做题",
        html: `<h1>3. 开始做题</h1><p>严格按照定位比对、写作视角与排除干扰的三大判据，逐题逐项展开深度推演。</p>`,
        meta: {}
      });

      questions.forEach((q) => {
        const corrKey = (q.options.find(o => o.is_correct) || q.options[0]).key;
        const correctOpt = q.options.find(o => o.is_correct);

        // Question Intro
        steps.push({
          section: "开始做题",
          title: `第${q.qid}题（${q.type}）`,
          html: `<h2>第${q.qid}题 · ${q.type}</h2><p><strong>题干：</strong>${q.stem}</p><blockquote><p>${q.stem_cn}</p></blockquote><p><strong>定位出处：</strong>第 ${q.locate_pid + 1} 段核心定位句</p>
          <div style="margin:10px 0;padding:8px 12px;background:rgba(245, 158, 11, 0.1);border-left:3px solid #f59e0b;border-radius:0 4px 4px 0">
            <span style="font-weight:700;color:#b45309">🎯 原文定位句：</span>
            <span>${q.locate_sentence}</span>
          </div>`,
          meta: { qid: String(q.qid), kind: "question", para: q.locate_pid }
        });

        // 4 Options Breakdown with Trap Pills and Synonym Paraphrase Card
        q.options.forEach(opt => {
          const isC = opt.is_correct;
          const badgeClass = isC ? 'correct-badge' : 'trap-badge';
          const badgeLabel = isC ? '★ 标准正确答案' : `干扰项 (${opt.trap_type})`;
          const trapPill = !isC ? getTrapPillHtml(opt.trap_type) : '';
          const synonymCard = isC ? getSynonymCardHtml(q, opt) : '';

          steps.push({
            section: "开始做题",
            title: `第${q.qid}题 · 选项 ${opt.key}`,
            html: `<h3>选项 ${opt.key}：${opt.text}</h3>
<p><strong>选项汉译：</strong>${opt.text_cn}</p>
<p><strong>选项判定：</strong><span class="${badgeClass}">${badgeLabel}</span> ${trapPill}</p>
${synonymCard}
<div class="revealPart">
  <h4>1. 定位比对与同义替换推演</h4>
  <p>${opt.analysis.locator_comparison}</p>
  <h4>2. 写作视角反事实论证</h4>
  <p>${opt.analysis.writing_perspective}</p>
  <h4>3. 全文主旨交叉验证</h4>
  <p>${opt.analysis.theme_validation}</p>
  <p><strong>${opt.analysis.verdict}</strong></p>
</div>`,
            meta: { qid: String(q.qid), option: opt.key, para: q.locate_pid }
          });
        });

        // Question Conclusion
        steps.push({
          section: "开始做题",
          title: `第${q.qid}题 · 决断小结`,
          html: `<h2>第${q.qid}题决断小结</h2><blockquote><p><strong>标准答案：${corrKey}</strong></p></blockquote><p>${q.summary}</p>`,
          meta: { qid: String(q.qid), kind: "conclusion", para: q.locate_pid }
        });
      });

      // 4. 进阶技巧
      steps.push({
        section: "进阶技巧",
        title: "4. 进阶技巧",
        html: `<h1>4. 进阶技巧 · 交叉验证总结</h1><p>孤证不立：做考研阅读必须结合定位句主干、作者行文逻辑与全文主旨三大支点进行闭环验证！</p>`,
        meta: {}
      });

      return steps;
    },

    // 3. Review Mode: Five-Bird In-depth Review
    buildReviewSteps(textData) {
      const steps = [];
      const paras = textData.paragraphs;
      const questions = textData.questions;

      // Section 0: 方法论总览
      steps.push({
        section: 0,
        title: "一石五鸟复盘法 · 方法论总览",
        html: `<h1>一石五鸟复盘法</h1>
<p>真正的高效复盘绝不是对个答案看错题，而是将一篇真题价值吃干抹净：</p>
<ul>
<li><strong>第一鸟</strong>：重点单词与词汇量提升（语境释义+高频拓展）</li>
<li><strong>第二鸟</strong>：精读文章与长难句翻译（意群断句+句法拆解）</li>
<li><strong>第三鸟</strong>：题目命题思维与避坑解析（定位比对+写作视角+主旨验证）</li>
<li><strong>第四鸟</strong>：语篇逻辑与新题型能力迁移</li>
<li><strong>第五鸟</strong>：大作文高分主题表达与写作语料积累</li>
</ul>`,
        meta: { section: 0 }
      });

      // Section 1: 第一鸟 · 词汇矩阵
      paras.forEach((p, pid) => {
        let rowsHtml = '';
        for (let i = 0; i < p.vocabulary.length; i += 3) {
          const chunk = p.vocabulary.slice(i, i + 3);
          let tds = '';
          chunk.forEach(v => {
            tds += `<td><strong>${v.word}</strong></td><td>${v.definition}</td>`;
          });
          while (chunk.length < 3) {
            tds += '<td></td><td></td>';
            chunk.push(null);
          }
          rowsHtml += `<tr>${tds}</tr>`;
        }

        steps.push({
          section: 1,
          title: `第${pid+1}段 · 重点词汇矩阵`,
          html: `<div class="table-wrap"><table>
<thead>
<tr><th>表达</th><th>词性＋意思</th><th>表达</th><th>词性＋意思</th><th>表达</th><th>词性＋意思</th></tr>
</thead>
<tbody>${rowsHtml}</tbody>
</table></div>`,
          meta: { section: 1, para: pid }
        });
      });

      // Section 2: 第二鸟 · 精读文章与长难句剖析
      paras.forEach((p, pid) => {
        steps.push({
          section: 2,
          title: `第${pid+1}段 · 篇章精读`,
          html: `<section class="revealPart"><h3>完整原文 · 第${pid+1}段</h3><p>${p.text}</p></section>`,
          meta: { section: 2, para: pid, stage: 0 }
        });

        steps.push({
          section: 2,
          title: `第${pid+1}段 · 篇章精读`,
          html: `<section class="revealPart"><h3>完整原文 · 第${pid+1}段</h3><p>${p.text}</p></section>
<section class="revealPart"><h3>意群划分 · 第${pid+1}段</h3><p>${p.slashed_text}</p></section>`,
          meta: { section: 2, para: pid, stage: 1 }
        });

        steps.push({
          section: 2,
          title: `第${pid+1}段 · 篇章精读`,
          html: `<section class="revealPart"><h3>完整原文 · 第${pid+1}段</h3><p>${p.text}</p></section>
<section class="revealPart"><h3>意群划分 · 第${pid+1}段</h3><p>${p.slashed_text}</p></section>
<section class="revealPart"><h3>意群翻译 · 第${pid+1}段</h3><p style="color:#7c3aed;font-weight:500">${p.chunk_translation}</p></section>`,
          meta: { section: 2, para: pid, stage: 2 }
        });

        steps.push({
          section: 2,
          title: `第${pid+1}段 · 篇章精读`,
          html: `<section class="revealPart"><h3>完整原文 · 第${pid+1}段</h3><p>${p.text}</p></section>
<section class="revealPart"><h3>意群划分 · 第${pid+1}段</h3><p>${p.slashed_text}</p></section>
<section class="revealPart"><h3>意群翻译 · 第${pid+1}段</h3><p style="color:#7c3aed;font-weight:500">${p.chunk_translation}</p></section>
<section class="revealPart"><h3>标准译文 · 第${pid+1}段</h3><p>${p.translation}</p></section>`,
          meta: { section: 2, para: pid, stage: 3 }
        });

        const sents = textData.sentences.filter(s => s.pid === pid);
        sents.forEach((sent, s_idx) => {
          const breakdownHtml = sent.syntax.breakdown.map(b => `<li style="margin-bottom:6px"><b>${b.type}</b>：<code>${b.content}</code> — ${b.explanation}</li>`).join('');
          
          steps.push({
            section: 2,
            title: `第${pid+1}段 · 句${s_idx+1}`,
            html: `<section class="revealPart">
<h4>句子精析 (${s_idx+1}/${sents.length})</h4>
<p style="font-size:1.1em;line-height:1.7"><strong>原句：</strong>${sent.text}</p>
<p><strong>意群断句：</strong><code>${sent.slashed_text}</code></p>
<p style="margin:8px 0"><strong>【意群翻译】：</strong><span style="color:#7c3aed;font-weight:500">${sent.chunk_translation}</span></p>
<div style="background:var(--card-bg);border-left:4px solid var(--review-accent);padding:10px 14px;border-radius:0 6px 6px 0;margin:10px 0">
  <p style="font-weight:700;color:var(--review-accent);margin-bottom:6px">【句法拆解与逻辑剖析】</p>
  <ul style="padding-left:18px">${breakdownHtml}</ul>
</div>
<p style="margin-top:8px"><strong>【满分参考汉译】</strong><span style="color:var(--review-accent);font-weight:600">${sent.translation}</span></p>
</section>`,
            meta: { section: 2, para: pid, sentence: s_idx }
          });
        });
      });

      // Section 3: 第三鸟 · 题目命题思维与避坑解析
      steps.push({
        section: 3,
        title: "3. 题目命题思维深度复盘",
        html: `<h1>第三鸟 · 题目命题复盘</h1>
<p>站在命题人的角度剖析每道题的设题思路、同义改写机制与干扰项避坑方法：</p>`,
        meta: { section: 3 }
      });

      questions.forEach(q => {
        const corrKey = (q.options.find(o => o.is_correct) || q.options[0]).key;
        const correctOpt = q.options.find(o => o.is_correct);

        // Question Overview
        steps.push({
          section: 3,
          title: `${q.qid}题 · 题干、题型与核心出处`,
          html: `<blockquote><p>${q.stem}<br>${q.stem_cn}</p></blockquote>
<h3>题型判定与解题策略</h3>
<p>这是一道<strong>${q.type}</strong>，考查考生对第 <strong>${q.locate_pid + 1}</strong> 段核心事实或论证逻辑的精准理解。</p>
<h3>定位出处（第 ${q.locate_pid + 1} 段核心定位句）</h3>
<blockquote><p>${q.locate_sentence}<br>${q.locate_sentence_cn}</p></blockquote>
${getSynonymCardHtml(q, correctOpt)}`,
          meta: { section: 3, qid: String(q.qid), form: "overview", para: q.locate_pid }
        });

        // 4 Options
        q.options.forEach(opt => {
          const isC = opt.is_correct;
          const a = opt.analysis;
          const trapPill = !isC ? getTrapPillHtml(opt.trap_type) : '';

          const leadHtml = `<section class="revealPart optionLead">
<blockquote><p>${opt.text_cn}</p></blockquote>
<p><strong>做题模式中的状态：</strong>${a.practice_status}</p>
<p><strong>选项性质：${a.option_nature}。</strong> ${trapPill}</p>
<strong>出处：</strong><blockquote><p>${a.source_sentence}</p></blockquote>
</section>`;

          const compHtml = `<section class="revealPart">
<h3>定位比对法</h3>
<p>${a.locator_comparison}</p>
</section>`;

          const writeHtml = `<section class="revealPart">
<h3>写作视角法</h3>
<p>${a.writing_perspective}</p>
</section>`;

          const crossHtml = `<section class="revealPart">
<h3>主旨交叉验证法</h3>
<p>${a.theme_validation}</p>
<p><strong>${a.verdict}</strong></p>
</section>`;

          steps.push({
            section: 3,
            title: `${opt.key}. ${opt.text}`,
            html: leadHtml,
            meta: { section: 3, qid: String(q.qid), option: opt.key, stage: 0, para: q.locate_pid }
          });

          steps.push({
            section: 3,
            title: `${opt.key}. ${opt.text}`,
            html: leadHtml + compHtml,
            meta: { section: 3, qid: String(q.qid), option: opt.key, stage: 1, para: q.locate_pid }
          });

          steps.push({
            section: 3,
            title: `${opt.key}. ${opt.text}`,
            html: leadHtml + compHtml + writeHtml,
            meta: { section: 3, qid: String(q.qid), option: opt.key, stage: 2, para: q.locate_pid }
          });

          steps.push({
            section: 3,
            title: `${opt.key}. ${opt.text}`,
            html: leadHtml + compHtml + writeHtml + crossHtml,
            meta: { section: 3, qid: String(q.qid), option: opt.key, stage: 3, para: q.locate_pid }
          });
        });

        // Question Conclusion
        steps.push({
          section: 3,
          title: `${q.qid}题结论`,
          html: `<blockquote><p><strong>${q.qid}. ${corrKey}</strong></p></blockquote><p>${q.summary}</p>`,
          meta: { section: 3, qid: String(q.qid), form: "conclusion", para: q.locate_pid }
        });
      });

      // Section 4: 第四鸟 · 语篇逻辑
      steps.push({
        section: 4,
        title: "4. 语篇逻辑与新题型迁移训练",
        html: `<h1>第四鸟 · 语篇逻辑链条</h1>
<p><strong>全文宏观主旨：</strong>${textData.macro_logic.main_theme}</p>
<h3>逻辑推进脉络</h3>
<ul>${textData.macro_logic.logic_chain.map(item => `<li style="margin-bottom:6px">${item}</li>`).join('')}</ul>`,
        meta: { section: 4 }
      });

      // Section 5: 第五鸟 · 写作语料库
      steps.push({
        section: 5,
        title: "5. 考研大作文高分语料库",
        html: `<h1>第五鸟 · 考研大作文高分表达</h1>
<div class="table-wrap"><table>
<thead><tr><th>表达分类</th><th>核心表达</th><th>中文释义</th><th>可复用写作例句</th></tr></thead>
<tbody>${textData.writing_corpus.map(w => `<tr><td><strong>${w.category}</strong></td><td><code>${w.expression}</code></td><td>${w.translation}</td><td>${w.application_sentence}</td></tr>`).join('')}</tbody>
</table></div>`,
        meta: { section: 5 }
      });

      return steps;
    },

    renderStep(step, stepIndex, totalSteps, containerId, textData) {
      const container = document.getElementById(containerId || 'workspaceContent');
      if (!container || !step) return;

      const secName = typeof step.section === 'number' 
        ? ['0. 方法论总览', '1. 重点词汇库', '2. 精读与长难句', '3. 题目命题复盘', '4. 语篇与新题型', '5. 写作语料库'][step.section] || `Section ${step.section}`
        : step.section;

      let html = `<div style="font-size:12px;font-weight:700;color:var(--mode-color);text-transform:uppercase;margin-bottom:6px">★ ${secName} (步骤 ${stepIndex + 1} / ${totalSteps})</div>`;
      if (step.title) {
        html += `<h2 style="margin-top:0;margin-bottom:12px;font-size:1.4em">${step.title}</h2>`;
      }
      html += step.html || '';

      container.innerHTML = html;
      window.ReaderModule.highlight(step.meta);

      if (step.meta && typeof step.meta.para === 'number') {
        window.ReaderModule.highlightLocatorSentence(step.meta.para);
      }
    },

    renderFull(steps, containerId) {
      const container = document.getElementById(containerId || 'workspaceContent');
      if (!container) return;

      let html = '<div class="all-mode-container">';
      steps.forEach((step) => {
        html += `<article class="step-card" style="margin-bottom:24px;padding:16px 20px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-md);box-shadow:var(--shadow-sm)">
          ${step.title ? `<h3 style="margin-top:0">${step.title}</h3>` : ''}
          ${step.html || ''}
        </article>`;
      });
      html += '</div>';
      container.innerHTML = html;
    }
  };
})();
