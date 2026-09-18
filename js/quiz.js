/**
 * Quiz & Review Module: Pure Data Template Engine
 * Supports:
 * 1. Mock Exam Mode (Blind answering + submit scoring + error book archiving)
 * 2. Step-by-Step Reasoning Mode (Instant deduction + locator sentence pulse + synonym cards)
 * 3. Five-Bird Review Mode (Comprehensive in-depth review)
 */
(function() {
  let currentActiveTextData = null;

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
    let rowsHtml = '';
    const pairs = window.ReviewContent.pairs(q);
    if (pairs.length > 0) {
      rowsHtml = pairs.map(pair => `
        <tr>
          <td><strong style="color:var(--success)">${pair.opt_term}</strong></td>
          <td style="text-align:center">↔</td>
          <td><strong style="color:var(--accent)">${pair.text_term}</strong></td>
          <td>${pair.logic || '精准同义改写'}</td>
        </tr>
      `).join('');
    } else {
      const locSnippet = q.locate_sentence.length > 55 ? q.locate_sentence.substring(0, 55) + '...' : q.locate_sentence;
      rowsHtml = `
        <tr>
          <td><strong style="color:var(--success)">${opt.text}</strong></td>
          <td style="text-align:center">↔</td>
          <td><strong style="color:var(--accent)">${locSnippet}</strong></td>
          <td>精准主干同义改写</td>
        </tr>
      `;
    }

    return `
      <div class="synonym-card">
        <div class="synonym-title">🎯 命题人同义替换核心对照</div>
        <table class="synonym-table">
          <thead>
            <tr><th>选项核心表达</th><th>↔</th><th>原文对应定位点</th><th>同义替换与命题机制</th></tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderColoredChunks(slashedText) {
    if (!slashedText) return '';
    const chunks = slashedText.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    if (chunks.length === 0) return slashedText;
    return chunks.map((chunk, i) => {
      const colorIdx = i % 6;
      return `<span class="chunk-c${colorIdx}">${chunk.trim()}</span>`;
    }).join('<span class="chunk-slash"> / </span>');
  }
  window.renderColoredChunks = renderColoredChunks;
  function escapeHtmlAttr(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function highlightWordInSentence(sentText, word) {
    if (!sentText || !word) return sentText || '';
    try {
      const cleanW = word.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(\\b${cleanW}\\b)`, 'gi');
      if (regex.test(sentText)) {
        return sentText.replace(regex, '<strong class="vocab-highlight">$1</strong>');
      }
      const parts = word.trim().split(/\s+/).filter(p => p.length > 2);
      if (parts.length > 1) {
        let res = sentText;
        parts.forEach(p => {
          const re = new RegExp(`(\\b${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b)`, 'gi');
          res = res.replace(re, '<strong class="vocab-highlight">$1</strong>');
        });
        return res;
      }
      return sentText;
    } catch(e) {
      return sentText;
    }
  }

  window.QuizModule = {
    renderColoredChunks,
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

        const allVocab = textData.paragraphs ? textData.paragraphs.flatMap(p => p.vocabulary || []) : [];
        const formatText = (window.ReviewContent && window.ReviewContent.formatQuestionText) || (t => t);
        const formattedStem = formatText(q.stem, allVocab);

        html += `
          <div class="${cardClass}" id="mock-card-${q.qid}">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
              <div style="font-weight:700;font-size:1.05em">${q.qid}. ${formattedStem}</div>
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
                const formattedOpt = formatText(opt.text, allVocab);

                return `
                  <div class="${optClass}" data-qid="${q.qid}" data-opt="${opt.key}" onclick="window.handleMockOptionClick(${textData.year}, ${textData.text_id}, ${q.qid}, '${opt.key}')">
                    <span style="font-weight:800;color:var(--mode-color)">[${opt.key}]</span>
                    <span style="flex:1">${formattedOpt}</span>
                    ${trapPill}
                  </div>
                  ${isSubmitted ? `<div class="opt-trans-inline show" style="margin:2px 0 6px 36px;font-size:0.88em;color:var(--muted)">${opt.text_cn || ''}</div>` : ''}
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

    // 2. Step-by-Step Practice Mode: Focused Question Solving & Deduction
    buildPracticeSteps(textData) {
      const steps = [];
      const questions = textData.questions;
      const allVocab = textData.paragraphs ? textData.paragraphs.flatMap(p => p.vocabulary || []) : [];
      const formatText = (window.ReviewContent && window.ReviewContent.formatQuestionText) || (t => t);

      // 0. 阅前须知
      steps.push({
        section: "阅前须知",
        title: "0. 阅前须知",
        html: `<h1>0. 阅前须知</h1>
<p>阅前声明，本教程对英语一英语二均适用。</p>
<p>本教程主要解决考研英语阅读备考中的三个结构性问题：</p>
<ol>
<li><p><strong>考研英语骗局一</strong>：拒绝上帝视角生词全懂，带着超纲生词读宏观主旨同样能做全对；</p></li>
<li><p><strong>考研英语骗局二</strong>：放弃考场即时信达雅机械翻译，采用意群粗读抓取核心信息；</p></li>
<li><p><strong>考研英语骗局三</strong>：避免逐字逐句死磕细节，依托题干与全文主旨交叉印证答案。</p></li>
</ol>`,
        meta: {}
      });

      // 1. 先读题干
      steps.push({
        section: "先读题干",
        title: "1. 先读题干",
        html: `<h1>1. 先读题干</h1><p>首先先看题干再用意群法粗读文章，不看选项是因为提前看选项会干扰粗读理解。看题干对考查重点建立大致印象，借助题文同序原则提前获取文章逻辑脉络。</p>`,
        meta: {}
      });

      questions.forEach(q => {
        const formattedStem = formatText(q.stem, allVocab);
        steps.push({
          section: "先读题干",
          title: `${q.qid}题题干`,
          html: `<h2>${q.qid}题题干</h2><p><strong>${formattedStem}</strong></p><blockquote><p>${q.stem_cn}</p></blockquote><p>题型：<strong>${q.type}</strong>。</p><p>定位预判：<strong>第 ${q.locate_pid + 1} 段</strong></p><hr />`,
          meta: { qid: String(q.qid), kind: "stem", para: q.locate_pid }
        });
      });

      // 2. 开始做题 (Deep Options Paraphrasing & Comparative Deduction + Synonym Cards + Traps)
      steps.push({
        section: "开始做题",
        title: "2. 开始做题",
        html: `<h1>2. 开始做题</h1><p>严格按照定位比对、写作视角与排除干扰的三大判据，逐题逐项展开深度推演。</p>`,
        meta: {}
      });

      questions.forEach((q) => {
        const corrKey = (q.options.find(o => o.is_correct) || q.options[0]).key;
        const correctOpt = q.options.find(o => o.is_correct);
        const formattedStem = formatText(q.stem, allVocab);

        // Question Intro
        steps.push({
          section: "开始做题",
          title: `第${q.qid}题（${q.type}）`,
          html: `<h2>第${q.qid}题 · ${q.type}</h2><p><strong>题干：</strong>${formattedStem}</p><blockquote><p>${q.stem_cn}</p></blockquote><p><strong>定位出处：</strong>第 ${q.locate_pid + 1} 段核心定位句</p>
          <div style="margin:10px 0;padding:8px 12px;background:rgba(245, 158, 11, 0.1);border-left:3px solid #f59e0b;border-radius:0 4px 4px 0">
            <span style="font-weight:700;color:#b45309">🎯 原文定位句：</span>
            <span>${q.locate_sentence}</span>
          </div>`,
          meta: { qid: String(q.qid), kind: "question", para: q.locate_pid }
        });

        // 4 Options Breakdown with Trap Pills and Synonym Paraphrase Card
        q.options.forEach(opt => {
          const isC = opt.is_correct;
          const analysis = window.ReviewContent.analysis(q, opt);
          const badgeClass = isC ? 'correct-badge' : 'trap-badge';
          const badgeLabel = isC ? '★ 标准正确答案' : `干扰项 (${opt.trap_type})`;
          const trapPill = !isC ? getTrapPillHtml(opt.trap_type) : '';
          const synonymCard = isC ? getSynonymCardHtml(q, opt) : '';
          const formattedOpt = formatText(opt.text, allVocab);

          steps.push({
            section: "开始做题",
            title: `第${q.qid}题 · 选项 ${opt.key}`,
            html: `<h3>选项 ${opt.key}：${formattedOpt}</h3>
<p><strong>选项汉译：</strong>${opt.text_cn}</p>
<p><strong>选项判定：</strong><span class="${badgeClass}">${badgeLabel}</span> ${trapPill}</p>
${synonymCard}
<div class="revealPart">
  <h4>1. 定位比对与同义替换推演</h4>
  <p>${analysis.locator_comparison || '本选项暂缺独立证据比对说明。'}</p>
  <h4>2. 写作视角反事实论证</h4>
  <p>${analysis.writing_perspective || '本题现有解析以定位比对为主，未提供独立的写作视角说明。'}</p>
  <h4>3. 全文主旨交叉验证</h4>
  <p>${analysis.theme_validation || q.summary || ''}</p>
  <p><strong>${analysis.verdict}</strong></p>
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

      // 3. 进阶技巧
      steps.push({
        section: "进阶技巧",
        title: "3. 进阶技巧",
        html: `<h1>3. 进阶技巧 · 交叉验证总结</h1><p>孤证不立：做考研阅读必须结合定位句主干、作者行文逻辑与全文主旨三大支点进行闭环验证！</p>`,
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

      // Section 1: 第一鸟 · 重点词汇库 (升级现代自适应网格 + 自测遮挡 + TTS + 生词本 + 考点筛选 + 真题语境)
      const allSentences = textData.sentences || [];
      const totalParas = paras.length;

      paras.forEach((p, pid) => {
        const vocabList = window.ReviewContent.vocabulary(textData, p);

        let correctCount = 0;
        let phraseCount = 0;
        let optCount = 0;
        let coreCount = 0;

        // Pre-process vocabulary
        const processedVocab = vocabList.map(v => {
          let cleanDef = v.definition || '';
          let cat = 'core';
          let badgeHtml = '';

          if (cleanDef.startsWith('【🎯解题正解】') || cleanDef.includes('🎯') || cleanDef.includes('解题正解')) {
            cat = 'correct';
            correctCount++;
            badgeHtml = '<span class="vocab-card-badge badge-correct">🎯 命题正解</span>';
            cleanDef = cleanDef.replace('【🎯解题正解】', '').trim();
          } else if (cleanDef.startsWith('【💡题项表达】') || cleanDef.startsWith('【💡题项考点】') || cleanDef.includes('💡')) {
            cat = 'opt';
            optCount++;
            badgeHtml = '<span class="vocab-card-badge badge-opt">💡 题项考点</span>';
            cleanDef = cleanDef.replace('【💡题项表达】', '').replace('【💡题项考点】', '').trim();
          } else if ((v.pos && v.pos.toLowerCase().includes('phr')) || v.word.trim().includes(' ')) {
            cat = 'phrase';
            phraseCount++;
            badgeHtml = '<span class="vocab-card-badge badge-phrase">🔗 黄金词组</span>';
          } else {
            cat = 'core';
            coreCount++;
            badgeHtml = '<span class="vocab-card-badge badge-core">📚 篇章重点</span>';
          }

          // Context sentence lookup
          const matchedSent = v.context;

          const contextEn = matchedSent ? matchedSent.text : '';
          const contextSid = matchedSent ? matchedSent.sid : null;
          const contextLabel = matchedSent ? matchedSent.label : '';
          const contextCn = matchedSent ? (matchedSent.translation || '') : '';
          const highlightedEn = contextEn ? highlightWordInSentence(contextEn, v.word) : '';

          const isB = (window.StorageModule && window.StorageModule.isBookmarked) 
            ? window.StorageModule.isBookmarked(v.word) 
            : false;

          return {
            ...v,
            cleanDef,
            cat,
            badgeHtml,
            contextEn,
            contextSid,
            contextLabel,
            contextCn,
            highlightedEn,
            isB
          };
        });

        // 1. Build Card Grid HTML
        let cardsHtml = '';
        processedVocab.forEach(item => {
          const escWord = escapeHtmlAttr(item.word);
          const escDef = escapeHtmlAttr(item.cleanDef);
          const escSent = escapeHtmlAttr(item.contextEn);

          cardsHtml += `
            <div class="vocab-card" data-word="${escWord}" data-cat="${item.cat}">
              <div class="vocab-card-header">
                <div class="vocab-card-title">
                  <span class="vocab-word-text">${item.word}</span>
                  ${item.pos ? `<span class="vocab-pos-tag">${item.pos}</span>` : ''}
                  ${item.badgeHtml}
                </div>
                <div class="vocab-card-actions">
                  <button class="vocab-icon-btn vocab-tts-btn" data-word="${escWord}" title="🔊 朗读发音">🔊</button>
                  <button class="vocab-icon-btn vocab-star-btn ${item.isB ? 'bookmarked' : ''}" data-word="${escWord}" data-def="${escDef}" data-sentence="${escSent}" data-year="${textData.year || ''}" data-textid="${textData.text_id || ''}" title="${item.isB ? '★ 已在生词本' : '☆ 收藏至生词本'}">${item.isB ? '★' : '☆'}</button>
                </div>
              </div>
              <div class="vocab-card-def" title="自测模式下点击或悬停揭晓">
                <span class="vocab-def-text">${item.cleanDef}</span>
              </div>
              ${item.usage_note ? `<div class="reading-vocab-note"><b>搭配与辨析</b> · ${escapeHtmlAttr(item.usage_note)}</div>` : ''}
              ${item.contextEn ? `
              <div class="vocab-card-footer">
                <button class="vocab-context-btn" ${item.contextSid != null ? `data-sid="${escapeHtmlAttr(String(item.contextSid))}"` : ''} title="查看表达出处">
                  <span>📖</span> ${escapeHtmlAttr(item.contextLabel)}
                </button>
                <div class="vocab-context-drawer" style="display:none">
                  <div class="vocab-context-en">${item.highlightedEn}</div>
                  ${item.contextCn ? `<div class="vocab-context-cn">${item.contextCn}</div>` : ''}
                </div>
              </div>` : ''}
            </div>
          `;
        });

        // 2. Build Compact Table Rows HTML
        let tableRowsHtml = '';
        processedVocab.forEach(item => {
          const escWord = escapeHtmlAttr(item.word);
          const escDef = escapeHtmlAttr(item.cleanDef);
          const escSent = escapeHtmlAttr(item.contextEn);

          tableRowsHtml += `
            <tr class="vocab-table-row" data-cat="${item.cat}">
              <td class="col-word">
                <strong style="color:var(--ink)">${item.word}</strong> ${item.badgeHtml}
              </td>
              <td class="col-pos">${item.pos || ''}</td>
              <td class="col-def">
                <div class="vocab-card-def" style="margin:0" title="自测模式下点击或悬停揭晓">
                  <span class="vocab-def-text">${item.cleanDef}</span>
                </div>
                ${item.usage_note ? `<div class="reading-vocab-note">${escapeHtmlAttr(item.usage_note)}</div>` : ''}
              </td>
              <td class="col-act">
                <button class="vocab-icon-btn vocab-tts-btn" data-word="${escWord}" title="🔊 朗读发音">🔊</button>
                <button class="vocab-icon-btn vocab-star-btn ${item.isB ? 'bookmarked' : ''}" data-word="${escWord}" data-def="${escDef}" data-sentence="${escSent}" data-year="${textData.year || ''}" data-textid="${textData.text_id || ''}" title="${item.isB ? '★ 已在生词本' : '☆ 收藏至生词本'}">${item.isB ? '★' : '☆'}</button>
                ${item.contextSid != null ? `<button class="vocab-icon-btn vocab-context-jump-btn" data-sid="${escapeHtmlAttr(String(item.contextSid))}" title="📖 联动左侧原文定位">📖</button>` : ''}
              </td>
            </tr>
          `;
        });

        // 3. Assemble Section 1 step HTML (persisting user's view and mask preferences)
        const savedView = (window.StorageModule && window.StorageModule.getVocabViewPreference)
          ? window.StorageModule.getVocabViewPreference()
          : 'grid';
        const savedMask = (window.StorageModule && window.StorageModule.getVocabMaskPreference)
          ? window.StorageModule.getVocabMaskPreference()
          : false;
        const isTable = (savedView === 'table');

        const stepHtml = `
          <p class="reading-section-note">本段词汇按语境理解；“原文第 N 段”与“第 N 题选项”分别标注出处。词义与搭配说明可直接阅读，原句沿用原有展开按钮。</p>
          <div class="vocab-matrix-wrap ${savedMask ? 'mask-active' : ''}" data-pid="${pid}">
            <!-- Top Control Bar -->
            <div class="vocab-matrix-toolbar">
              <div class="vocab-toolbar-left">
                <button class="toolbar-btn vocab-mask-toggle" title="隐藏所有中文释义进行主动回忆自测，悬停或轻点单项可揭晓">
                  <span class="mask-icon">${savedMask ? '👁️' : '🙈'}</span> <span class="mask-label">${savedMask ? '退出自测模式' : '自测遮挡模式'}</span>
                </button>
                <div class="vocab-view-toggle">
                  <button class="toolbar-btn ${!isTable ? 'active' : ''}" data-view="grid" title="📇 现代考研词卡网格视图">📇 卡片</button>
                  <button class="toolbar-btn ${isTable ? 'active' : ''}" data-view="table" title="📋 紧凑矩阵表格视图">📋 矩阵</button>
                </div>
              </div>
              <div class="vocab-toolbar-right">
                <span class="vocab-count-badge">第 <strong>${pid + 1}</strong> / ${totalParas} 段 · 共 <strong>${vocabList.length}</strong> 词</span>
              </div>
            </div>

            <!-- Category Filter Tabs -->
            <div class="vocab-filter-tabs">
              <button class="vocab-filter-pill active" data-filter="all">全部 (${vocabList.length})</button>
              ${correctCount > 0 ? `<button class="vocab-filter-pill" data-filter="correct">🎯 命题核心 (${correctCount})</button>` : ''}
              ${phraseCount > 0 ? `<button class="vocab-filter-pill" data-filter="phrase">🔗 黄金词组 (${phraseCount})</button>` : ''}
              ${optCount > 0 ? `<button class="vocab-filter-pill" data-filter="opt">💡 题项考点 (${optCount})</button>` : ''}
              ${coreCount > 0 ? `<button class="vocab-filter-pill" data-filter="core">📚 篇章重点 (${coreCount})</button>` : ''}
            </div>

            <!-- View 1: Card Grid View -->
            <div class="vocab-grid-view" style="${isTable ? 'display:none' : ''}">
              <div class="vocab-card-grid">
                ${cardsHtml}
              </div>
            </div>

            <!-- View 2: Compact Table View -->
            <div class="vocab-table-view" style="${isTable ? 'display:block' : 'display:none'}">
              <div class="table-wrap">
                <table class="vocab-matrix-table">
                  <thead>
                    <tr>
                      <th class="col-word">单词 / 核心短语</th>
                      <th class="col-pos">词性</th>
                      <th class="col-def">考研真题语境释义</th>
                      <th class="col-act">学习操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tableRowsHtml}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;

        steps.push({
          section: 1,
          title: `第${pid+1}段 · 重点词汇库`,
          html: stepHtml,
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
<section class="revealPart"><h3>意群划分 · 第${pid+1}段</h3><p class="chunk-group">${renderColoredChunks(p.slashed_text)}</p></section>`,
          meta: { section: 2, para: pid, stage: 1 }
        });

        steps.push({
          section: 2,
          title: `第${pid+1}段 · 篇章精读`,
          html: `<section class="revealPart"><h3>完整原文 · 第${pid+1}段</h3><p>${p.text}</p></section>
<section class="revealPart"><h3>意群划分 · 第${pid+1}段</h3><p class="chunk-group">${renderColoredChunks(p.slashed_text)}</p></section>
<section class="revealPart"><h3>意群翻译 · 第${pid+1}段</h3><p class="chunk-group">${renderColoredChunks(p.chunk_translation)}</p></section>`,
          meta: { section: 2, para: pid, stage: 2 }
        });

        steps.push({
          section: 2,
          title: `第${pid+1}段 · 篇章精读`,
          html: `<section class="revealPart"><h3>完整原文 · 第${pid+1}段</h3><p>${p.text}</p></section>
<section class="revealPart"><h3>意群划分 · 第${pid+1}段</h3><p class="chunk-group">${renderColoredChunks(p.slashed_text)}</p></section>
<section class="revealPart"><h3>意群翻译 · 第${pid+1}段</h3><p class="chunk-group">${renderColoredChunks(p.chunk_translation)}</p></section>
<section class="revealPart"><h3>标准译文 · 第${pid+1}段</h3><p>${p.translation}</p></section>`,
          meta: { section: 2, para: pid, stage: 3 }
        });

        const sents = textData.sentences.filter(s => s.pid === pid);
        sents.forEach((sent, s_idx) => {
          const breakdown = sent.syntax?.breakdown || [];
          const backbone = breakdown.find(b => /主干/.test(b.type));
          const logic = breakdown.filter(b => /逻辑|考点/.test(b.type));
          const breakdownHtml = breakdown.filter(b => !/逻辑|考点/.test(b.type)).map(b => {
            let tagClass = 'tag-modifier';
            if (b.type.includes('主干')) tagClass = 'tag-backbone';
            if (b.type.includes('定语')) tagClass = 'tag-attributive';
            if (b.type.includes('状语')) tagClass = 'tag-adverbial';
            if (b.type.includes('名词')) tagClass = 'tag-noun';
            if (b.type.includes('逻辑') || b.type.includes('考点')) tagClass = 'tag-logic';
            if (b.type.includes('非谓语') || b.type.includes('特殊') || b.type.includes('同位语') || b.type.includes('修饰')) tagClass = 'tag-special';
            return `<li style="margin-bottom:8px;line-height:1.75"><span class="syntax-tag ${tagClass}">[${b.type}]</span> <strong style="color:var(--ink)">${b.content}</strong> — <span>${b.explanation}</span></li>`;
          }).join('');
          
          steps.push({
            section: 2,
            title: `第${pid+1}段 · 句${s_idx+1}`,
            html: `<section class="revealPart">
<h4>句子精析 (${s_idx+1}/${sents.length})</h4>
<p style="font-size:1.1em;line-height:1.7"><strong>原句：</strong>${sent.text}</p>
${backbone ? `<div class="reading-backbone"><b>主干速览</b><p>${backbone.content}</p></div>` : ''}
<p><strong>意群断句：</strong></p>
<p class="chunk-group" style="margin:4px 0 8px 0">${renderColoredChunks(sent.slashed_text)}</p>
<p style="margin:8px 0"><strong>【意群翻译】：</strong></p>
<p class="chunk-group" style="margin:4px 0 8px 0">${renderColoredChunks(sent.chunk_translation)}</p>
<div style="background:var(--card-bg);border-left:4px solid var(--review-accent);padding:10px 14px;border-radius:0 6px 6px 0;margin:10px 0">
  <p style="font-weight:700;color:var(--review-accent);margin-bottom:6px">【句法拆解：修饰成分如何连接主干】</p>
  <ul style="padding-left:18px">${breakdownHtml}</ul>
</div>
${logic.length ? `<div class="reading-logic"><b>语篇作用与考点</b>${logic.map(b => `<p><strong>${b.content}</strong> — ${b.explanation}</p>`).join('')}</div>` : ''}
<p style="margin-top:8px"><strong>【参考译文】</strong><span style="color:var(--review-accent);font-weight:600">${sent.translation}</span></p>
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
        const allVocab = textData.paragraphs ? textData.paragraphs.flatMap(p => p.vocabulary || []) : [];
        const formatText = (window.ReviewContent && window.ReviewContent.formatQuestionText) || (t => t);
        const formattedStem = formatText(q.stem, allVocab);
        const formattedCorrText = correctOpt ? formatText(correctOpt.text, allVocab) : '';

        // Question Overview
        steps.push({
          section: 3,
          title: `${q.qid}题 · 题干、题型与核心出处`,
          html: `<blockquote><p><b>[题干]</b> ${formattedStem}<br><span style="color:var(--muted)">${q.stem_cn}</span></p></blockquote>
<div class="reading-answer"><b>答案：${corrKey}</b> · ${formattedCorrText}</div>
<h3>题型判定与解题策略</h3>
<p>这是一道<strong>${q.type}</strong>，考查考生对第 <strong>${q.locate_pid + 1}</strong> 段核心事实或论证逻辑的精准理解。</p>
<p class="reading-section-note">${window.ReviewContent.typeExplanation(q.type || '')}</p>
<h3>定位出处（第 ${q.locate_pid + 1} 段核心定位句）</h3>
<blockquote><p>${q.locate_sentence}<br>${q.locate_sentence_cn}</p></blockquote>
${getSynonymCardHtml(q, correctOpt)}`,
          meta: { section: 3, qid: String(q.qid), form: "overview", para: q.locate_pid }
        });

        // 4 Options
        q.options.forEach(opt => {
          const isC = opt.is_correct;
          const a = window.ReviewContent.analysis(q, opt);
          const trapPill = !isC ? getTrapPillHtml(opt.trap_type) : '';
          const formattedOpt = formatText(opt.text, allVocab);

          const leadHtml = `<section class="revealPart optionLead">
<blockquote><p><strong style="color:var(--primary)">[${opt.key}]</strong> ${formattedOpt}<br><span style="color:var(--muted)">${opt.text_cn}</span></p></blockquote>
${a.practice_status ? `<p><strong>选项判断：</strong>${a.practice_status}</p>` : ''}
<p><strong>选项性质：${a.option_nature}。</strong> ${trapPill}</p>
${a.position ? `<p><strong>依据位置：</strong>${a.position}</p>` : ''}
<strong>出处：</strong><blockquote><p>${a.source_sentence}</p></blockquote>
</section>`;

          const compHtml = `<section class="revealPart">
<h3>定位比对法</h3>
<p>${a.locator_comparison}</p>
</section>`;

          const writeHtml = a.writing_perspective ? `<section class="revealPart">
<h3>写作视角法</h3>
<p>${a.writing_perspective}</p>
</section>` : '';

          const crossHtml = `<section class="revealPart">
${a.theme_validation ? `
<h3>主旨交叉验证法</h3>
<p>${a.theme_validation}</p>
` : ''}
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

          if (writeHtml) steps.push({
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

      // Save reference to current text data
      currentActiveTextData = textData;

      // Section 4: 第四鸟 · 语篇与新题型
      steps.push({
        section: 4,
        title: "4. 语篇逻辑与小标题对应解析",
        html: buildSection4Html(textData),
        meta: { section: 4 }
      });

      // Section 5: 第五鸟 · 写作语料库
      steps.push({
        section: 5,
        title: "5. 写作表达与句式讲解",
        html: buildSection5Html(textData),
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
    },

    // --- Interactive Writing Corpus Tabs ---
    filterWritingCorpus(category, btnElem) {
      const container = document.getElementById('corpusGrid');
      if (!container) return;
      if (btnElem && btnElem.parentElement) {
        btnElem.parentElement.querySelectorAll('.corpus-tab-btn').forEach(b => b.classList.remove('active'));
        btnElem.classList.add('active');
      }
      const cards = container.querySelectorAll('.corpus-card');
      cards.forEach(card => {
        if (category === '全部' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    },

    // --- Interactive Copy Writing Template Slot ---
    copyTemplateSlot(btn, text) {
      function showToast(msg) {
        let toast = document.getElementById('copyToast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'copyToast';
          toast.className = 'copy-toast';
          document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('✅ 已复制写作模板到剪贴板！');
        }).catch(() => {
          fallbackCopy(text);
        });
      } else {
        fallbackCopy(text);
      }

      function fallbackCopy(str) {
        const ta = document.createElement('textarea');
        ta.value = str;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showToast('✅ 已复制写作模板到剪贴板！');
        } catch (e) {
          alert('复制失败，请手动选中复制');
        }
        document.body.removeChild(ta);
      }
    },

    // --- Interactive Part B Checking & Trap Analysis ---
    checkPartB() {
      const selects = document.querySelectorAll('.part-b-select');
      const resBox = document.getElementById('partBResultBox');
      if (!selects.length || !resBox) return;

      const textData = currentActiveTextData || (window.AppState && window.AppState.textData);
      const pb = (textData && textData.macro_logic && textData.macro_logic.part_b_training) ? textData.macro_logic.part_b_training : null;
      const options = pb ? (pb.options || []) : [];

      let total = selects.length;
      let correct = 0;
      let detailsHtml = '<h4 style="margin-top:0;margin-bottom:10px;font-size:1.05em">📋 新题型核对结果与考点剖析</h4>';

      selects.forEach((sel, idx) => {
        const userVal = sel.value;
        const correctVal = sel.getAttribute('data-correct');
        const isRight = (userVal === correctVal);
        if (isRight) correct++;

        sel.style.borderColor = isRight ? '#16a34a' : '#dc2626';
        sel.style.backgroundColor = isRight ? 'rgba(22, 163, 74, 0.08)' : 'rgba(220, 38, 38, 0.08)';

        const parentRow = sel.closest('.part-b-match-row');
        const label = parentRow ? parentRow.querySelector('.part-b-match-para').textContent.trim() : `段落 ${idx + 1}`;
        const correctOpt = options.find(o => o.key === correctVal);

        detailsHtml += `
          <div style="margin-bottom:12px;padding-bottom:10px;border-bottom:1px dashed var(--border)">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
              <b>${label}</b>：
              <span>你的选择: <b style="color:${isRight ? '#16a34a' : '#dc2626'}">[${userVal || '未选择'}]</b></span>
              <span style="font-weight:700;color:${isRight ? '#16a34a' : '#dc2626'}">${isRight ? '✓ 正确' : '✗ 错误'}</span>
              <span>正确答案: <b style="color:var(--review-accent)">[${correctVal}] ${correctOpt ? correctOpt.heading : ''}</b></span>
            </div>
            ${correctOpt && correctOpt.trap_analysis ? `<div style="font-size:0.9em;color:var(--muted);line-height:1.5;margin-top:4px">💡 <b>解析与依据</b>：${correctOpt.trap_analysis}</div>` : ''}
          </div>
        `;
      });

      if (pb) {
        const distractors = options.filter(o => o.is_distractor);
        if (distractors.length > 0) {
          detailsHtml += '<div style="margin-top:14px;font-size:0.92em">';
          detailsHtml += '<div style="font-weight:800;color:var(--review-accent);margin-bottom:8px">🔍 干扰小标题避坑精析（设陷归因）：</div>';
          distractors.forEach(opt => {
            detailsHtml += `
              <div style="margin-bottom:8px;line-height:1.5;padding:8px 10px;background:var(--surface);border-radius:var(--radius-sm);border:1px solid var(--border)">
                <span class="trap-tag trap-distractor">❌ 干扰小标题</span>
                <b>[${opt.key}] ${opt.heading}</b>：
                <span style="color:var(--muted)">${opt.trap_analysis || ''}</span>
              </div>
            `;
          });
          detailsHtml += '</div>';
        }
      }

      const scoreRate = Math.round((correct / total) * 100);
      const scoreColor = correct === total ? '#16a34a' : (scoreRate >= 60 ? 'var(--review-accent)' : '#dc2626');
      resBox.innerHTML = `
        <div style="font-size:1.1em;font-weight:800;margin-bottom:12px;color:${scoreColor};display:flex;align-items:center;gap:8px">
          <span>${correct === total ? '🎉 全部答对！' : '📊 答题成绩：'}答对 ${correct} / ${total} 题 (${scoreRate}%)</span>
        </div>
        ${detailsHtml}
      `;
      resBox.style.display = 'block';
    },

    resetPartB() {
      const selects = document.querySelectorAll('.part-b-select');
      selects.forEach(sel => {
        sel.value = '';
        sel.style.borderColor = '';
        sel.style.backgroundColor = '';
      });
      const resBox = document.getElementById('partBResultBox');
      if (resBox) {
        resBox.style.display = 'none';
        resBox.innerHTML = '';
      }
    }
  };

  // --- Helper: Build Section 4 HTML ---
  function buildSection4Html(tData) {
    const ml = tData.macro_logic || {};
    const genre = ml.genre || '本篇体裁待补充';
    const model = ml.discourse_model || '本篇推进关系待补充';
    const theme = ml.main_theme || '暂无宏观主旨分析';
    
    let headerMeta = `
      <div class="discourse-header-meta">
        <span class="discourse-badge">📖 体裁：${genre}</span>
        <span class="discourse-badge">🔄 论述模型：${model}</span>
      </div>
      <div class="discourse-theme-box">
        <div class="discourse-theme-title">🎯 全篇宏观主旨与作者立场</div>
        <div class="discourse-theme-text">${theme}</div>
      </div>
    `;

    let flowHtml = '';
    if (ml.paragraph_functions && Array.isArray(ml.paragraph_functions) && ml.paragraph_functions.length > 0) {
      flowHtml = `
        <h3 style="margin-top:20px;margin-bottom:12px;font-size:1.1em;display:flex;align-items:center;gap:6px">
          📊 语篇微观推进与论证图谱
        </h3>
        <div class="flow-timeline">
          ${ml.paragraph_functions.map((pf, idx) => `
            <div class="flow-card">
              <div class="flow-card-head">
                <span class="flow-para-label">Paragraph ${pf.pid !== undefined ? (pf.pid + 1) : (idx + 1)}</span>
                <span class="flow-role-badge">${pf.role || '段落论述'}</span>
              </div>
              <div class="flow-core-point">${pf.core_point || ''}</div>
              ${pf.evidence ? `<div class="reading-evidence"><b>原文依据：</b>${escapeHtmlAttr(pf.evidence)}</div>` : ''}
              ${pf.cohesive_devices ? `<div class="flow-cohesion">🔗 <b>段际衔接纽带</b>：${pf.cohesive_devices}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    } else if (ml.logic_chain && Array.isArray(ml.logic_chain) && ml.logic_chain.length > 0) {
      flowHtml = `
        <h3 style="margin-top:20px;margin-bottom:10px">逻辑推进脉络</h3>
        <ul>${ml.logic_chain.map(item => `<li style="margin-bottom:6px">${item}</li>`).join('')}</ul>
      `;
    }

    let partBHtml = '';
    if (ml.part_b_training) {
      const pb = ml.part_b_training;
      const options = pb.options || [];
      const targets = pb.target_paragraphs || [];

      partBHtml = `
        <div class="part-b-box">
          <h3>🧩 段落小标题对应与解析（实战自测）</h3>
          <p class="reading-section-note">结合左侧原文对应段落的核心论点与推导脉络，从备选库中为各段选出最精准的小标题。选择完毕后点击“核对小标题答案”查看正误反馈与命题设陷剖析。</p>
          
          <div class="part-b-options-pool">
            <div class="part-b-options-pool-title">备选小标题库 (Options Pool)</div>
            ${options.map(opt => `
              <div class="part-b-opt-item">
                <strong>[${escapeHtmlAttr(opt.key)}]</strong> ${escapeHtmlAttr(opt.heading)}
              </div>
            `).join('')}
          </div>

          <div class="part-b-matching-area">
            ${targets.map(tp => `
              <div class="part-b-match-row">
                <span class="part-b-match-para" style="cursor:pointer" title="点击联动定位左侧段落" onclick="window.ReaderModule&&window.ReaderModule.highlight({para:${tp.pid}})">
                  📍 第 ${tp.pid + 1} 段 (${escapeHtmlAttr(tp.label || ('Paragraph ' + (tp.pid + 1)))})
                </span>
                <select class="part-b-select" data-pid="${tp.pid}" data-correct="${escapeHtmlAttr(tp.correct_key)}">
                  <option value="">-- 请选择对应小标题 --</option>
                  ${options.map(opt => `<option value="${escapeHtmlAttr(opt.key)}">[${escapeHtmlAttr(opt.key)}] ${escapeHtmlAttr(opt.heading.length > 40 ? opt.heading.substring(0, 40) + '...' : opt.heading)}</option>`).join('')}
                </select>
              </div>
            `).join('')}
          </div>

          <div style="display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap">
            <button class="part-b-btn-check" onclick="window.QuizModule.checkPartB()">🎯 核对小标题答案与考点剖析</button>
            <button class="part-b-btn-reset" onclick="window.QuizModule.resetPartB()">🔄 重新作答</button>
          </div>
          
          <div id="partBResultBox" class="part-b-result-box" style="display:none"></div>

          ${pb.skills_breakdown ? `
            <div style="margin-top:14px;padding:10px 14px;background:var(--review-light);border-left:3px solid var(--review-accent);border-radius:var(--radius-sm);font-size:0.88em;line-height:1.6">
              💡 <b>解题策略与考点剖析</b>：${escapeHtmlAttr(pb.skills_breakdown)}
            </div>
          ` : ''}
        </div>
      `;
    }

    return `
      <div class="discourse-container">
        ${headerMeta}
        ${flowHtml}
        ${partBHtml}
      </div>
    `;
  }

  // --- Helper: Build Section 5 HTML ---
  function buildSection5Html(tData) {
    const corpus = tData.writing_corpus || [];
    if (!corpus || corpus.length === 0) {
      return '<p>暂无语料数据</p>';
    }

    // Collect unique categories
    const rawCategories = corpus.map(w => w.category || '核心表达');
    const uniqueCategories = ['全部', ...Array.from(new Set(rawCategories))];

    const tabsHtml = `
      <div class="corpus-tabs" id="corpusTabs">
        ${uniqueCategories.map((cat, idx) => `
          <button class="corpus-tab-btn ${idx === 0 ? 'active' : ''}" onclick="window.QuizModule.filterWritingCorpus(${escapeHtmlAttr(JSON.stringify(cat))}, this)">${escapeHtmlAttr(cat)}</button>
        `).join('')}
      </div>
    `;

    const cardsHtml = `
      <div class="corpus-grid" id="corpusGrid">
        ${corpus.map(w => {
          const cat = w.category || '核心表达';
          const expr = w.expression || '';
          const trans = w.translation || '';
          const sent = w.application_sentence || '';
          const sentCn = w.sentence_cn || '';
          const slot = w.template_slot || sent;
          const source = window.ReviewContent.writingSource(tData, w);
          const usage = window.ReviewContent.writingUsage(w);
          const synType = w.syntactic_type ? `<span class="matrix-badge badge-opt">${w.syntactic_type}</span>` : '';

          return `
            <div class="corpus-card" data-category="${cat}">
              <div class="corpus-card-header">
                <div style="display:flex;align-items:center;gap:6px">
                  <span class="corpus-cat-badge">${cat}</span>
                  ${synType}
                </div>
              </div>
              <div class="corpus-expression-title"><code>${expr}</code></div>
              <div class="corpus-translation-text">${trans}</div>
              ${source ? `<div class="reading-writing-source"><b>原文依据：</b>${escapeHtmlAttr(source)}</div>` : '<p class="reading-source-label">拓展表达（教学改写，非原文直接引用）</p>'}
              <div class="reading-writing-note"><b>搭配与使用范围：</b>${escapeHtmlAttr(usage)}</div>
              <div class="corpus-sent-box">
                <div class="reading-source-label">迁移例句 · 展示用法，不代表原文事实或统计</div>
                <div class="corpus-sent-en">📝 ${sent}</div>
                ${sentCn ? `<div class="corpus-sent-cn">🇨🇳 ${sentCn}</div>` : ''}
              </div>
              <div class="corpus-slot-box">
                <div class="corpus-slot-code">
                  <span style="color:var(--review-accent);font-weight:700">可复用模板：</span>
                  <span>${slot}</span>
                </div>
                <button class="btn-copy-slot" onclick="window.QuizModule.copyTemplateSlot(this, ${escapeHtmlAttr(JSON.stringify(slot))})">📋 复制模板</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    return `
      <div class="corpus-container">
        <p style="font-size:0.92em;color:var(--muted);margin-bottom:12px">
          按“表达含义 → 原文依据或改写说明 → 搭配与适用范围 → 句式例句”阅读。示例用于展示表达方法，时态、主语、数字和论证范围需要与实际写作话题一致。
        </p>
        ${tabsHtml}
        ${cardsHtml}
      </div>
    `;
  }
})();
