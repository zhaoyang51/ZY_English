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
    let rowsHtml = '';
    const pairs = window.ReviewModel.pairs(q);
    if (pairs.length > 0) {
      rowsHtml = pairs.map(pair => `
        <tr>
          <td><strong style="color:var(--success)">${window.ReviewModel.escape(pair.target)}</strong></td>
          <td style="text-align:center">↔</td>
          <td><strong style="color:var(--accent)">${window.ReviewModel.escape(pair.source)}</strong></td>
          <td>${window.ReviewModel.escape(pair.logic)}</td>
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

    // 2. Step-by-Step Practice Mode: Focused Question Solving & Deduction
    buildPracticeSteps(textData) {
      const steps = [];
      const questions = textData.questions;

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
<li><p><strong>考研英语骗局三</strong>：拒绝所谓单一神技秒杀，采用定位比对与写作视角交叉验证。</p></li>
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
        steps.push({
          section: "先读题干",
          title: `${q.qid}题题干`,
          html: `<h2>${q.qid}题题干</h2><p><strong>${q.stem}</strong></p><blockquote><p>${q.stem_cn}</p></blockquote><p>题型：<strong>${q.type}</strong>。</p><p>定位预判：<strong>第 ${q.locate_pid + 1} 段</strong></p><hr />`,
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
          const analysis = window.ReviewModel.analysis(q, opt);
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
  <p>${analysis.comparison || '请核对选项与定位句中的主体、范围和逻辑关系。'}</p>
  <h4>2. 写作视角反事实论证</h4>
  <p>${analysis.perspective || '思考：该句在段落中承担什么作用？用前后句验证你的判断。'}</p>
  <h4>3. 全文主旨交叉验证</h4>
  <p>${analysis.theme || '核对：本选项是否超出原文讨论范围？不要只因符合主旨就忽略细节证据。'}</p>
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

      // Section 1: 第一鸟 · 重点词汇库 (升级现代自适应网格 + 自测遮挡 + TTS + 生词本 + 考点筛选 + 真题语境)
      const totalParas = paras.length;

      paras.forEach((p, pid) => {
        const vocabList = window.ReviewModel.vocabulary(textData, p);

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

      return window.ReviewLearningModule.buildSteps(textData, steps.filter(step => step.section === 1));
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
      window.ReviewLearningModule.mount(container);

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
      window.ReviewLearningModule.mount(container);
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

  };
})();
