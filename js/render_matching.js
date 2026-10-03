/**
 * Matching Renderer: Section II Part B (新题型：多项信息匹配 / 小标题对应 / 正误判断)
 * Full Interactive Two-Column Pairing, Sentence Breakdown, Word Tokenization,
 * Per-paragraph Translation Toggles, & Pedagogical Review Mode
 */
(function() {
  let activeItemQid = 41;
  const SIMPLE_WORDS = new Set([
    'an', 'the', 'this', 'that', 'these', 'those',
    'i', 'me', 'my', 'mine', 'myself',
    'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself',
    'she', 'her', 'hers', 'herself',
    'it', 'its', 'itself',
    'we', 'us', 'our', 'ours', 'ourselves',
    'they', 'them', 'their', 'theirs', 'themselves',
    'who', 'whom', 'whose', 'which', 'what', 'whatever', 'whoever',
    'and', 'or', 'but', 'nor', 'so', 'yet', 'for',
    'if', 'as', 'than', 'because', 'while', 'though', 'although', 'since', 'unless',
    'in', 'on', 'at', 'to', 'of', 'by', 'with', 'from', 'into', 'onto', 'upon',
    'about', 'over', 'under', 'up', 'down', 'out', 'off', 'through', 'between', 'among',
    'after', 'before', 'against', 'during', 'without',
    'be', 'am', 'is', 'are', 'was', 'were', 'been', 'being',
    'have', 'has', 'had', 'having',
    'do', 'does', 'did', 'done', 'doing',
    'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must',
    'not', 'no', 'yes', 'all', 'any', 'some', 'each', 'every', 'both', 'such',
    'too', 'very', 'also', 'just', 'only', 'here', 'there', 'now', 'then',
    'how', 'why', 'when', 'where', 'again', 'ever', 'never',
    "it's", "that's", "there's", "what's", "who's", "here's", "let's", "how's", "where's",
    "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't", "shouldn't", "mustn't",
    "isn't", "aren't", "wasn't", "weren't", "haven't", "hasn't", "hadn't",
    "i'm", "you're", "he's", "she's", "we're", "they're",
    "i've", "you've", "we've", "they've",
    "i'll", "you'll", "he'll", "she'll", "we'll", "they'll",
    "i'd", "you'd", "he'd", "she'd", "we'd", "they'd"
  ]);

  function isSimpleWord(w) {
    if (!w || w.length <= 1) return true;
    const lower = w.toLowerCase().replace(/[\u2018\u2019']/g, "'");
    return SIMPLE_WORDS.has(lower);
  }

  window.TextTokenizer = {
    SIMPLE_WORDS,
    isSimpleWord,
    tokenizeWords: function(text) {
      if (!text) return '';
      const parts = String(text).split(/(<[^>]+>)/g);
      for (let i = 0; i < parts.length; i += 2) {
        if (parts[i]) {
          parts[i] = parts[i].replace(/\b([a-zA-Z]+(?:['’][a-zA-Z]+)?)\b/g, (match) => {
            if (isSimpleWord(match)) return match;
            return `<span class="exam-word-token" data-word="${match}" title="点击查词: ${match}">${match}</span>`;
          });
        }
      }
      return parts.join('');
    }
  };

  window.MatchingRenderer = {
    SIMPLE_WORDS,
    isSimpleWord,
    currentMode: 'practice',

    getShowTrans: function() {
      if (window.ReaderModule?.settings?.showTrans !== undefined) {
        return window.ReaderModule.settings.showTrans;
      }
      return localStorage.getItem('kaoyan_partb_show_trans') === 'true';
    },

    setShowTrans: function(val) {
      if (window.ReaderModule?.settings) {
        window.ReaderModule.settings.showTrans = val;
        window.StorageModule?.saveSettings(window.ReaderModule.settings);
      }
      localStorage.setItem('kaoyan_cloze_show_trans', String(val));
      localStorage.setItem('kaoyan_partb_show_trans', String(val));
    },

    render: function(partBData, year, mode) {
      if (!partBData) return;
      this.currentMode = mode || (window.AppState ? window.AppState.mode : 'practice') || 'practice';
      this.initUserState(partBData, year);
      this.ensureSentences(partBData);
      this.renderLeftPanel(partBData, year);
      this.renderRightPanel(partBData, year, this.currentMode);
    },

    initUserState: function(data, year) {
      const saved = localStorage.getItem(`kaoyan_partb_${year}`);
      if (saved) {
        try { userSelections = JSON.parse(saved); } catch(e) { userSelections = {}; }
      } else {
        userSelections = {};
      }
      activeItemQid = (data.items && data.items[0]) ? data.items[0].qid : 41;
    },

    /**
     * Generate sentence objects for Part B paragraphs to support
     * showSyntaxModal, active sentence highlighting, and sentence navigation.
     */
    ensureSentences: function(data) {
      if (data.sentences && data.sentences.length > 0) {
        if (window.AppState && (window.AppState.textData === data || window.AppState.textId === 'part_b')) {
          window.AppState.textData.sentences = data.sentences;
        }
        return data.sentences;
      }

      let currentSid = 1;
      const sentences = [];
      (data.paragraphs || []).forEach((para, pIdx) => {
        const pText = (typeof para === 'string' ? para : para.text) || '';
        // Skip heading slot placeholders like "(41)______"
        if (/^\(?\s*(4[1-5])\s*\)?\s*[_—]+/.test(pText)) return;

        const sents = (pText.match(/[^.!?]+[.!?]+(?:['"”’]+)?|[^.!?]+$/g) || [pText]).map(s => s.trim()).filter(Boolean);
        const pTrans = (typeof para === 'object' ? para.translation : '') || '';
        const transSents = (pTrans.match(/[^。！？!?]+[。！？!?]+(?:['"”’]+)?|[^。！？!?]+$/g) || [pTrans]).map(s => s.trim()).filter(Boolean);

        sents.forEach((st, sIdx) => {
          let sTrans = pTrans;
          if (transSents.length === sents.length) {
            sTrans = transSents[sIdx];
          } else if (transSents[sIdx]) {
            sTrans = transSents[sIdx];
          }

          sentences.push({
            sid: currentSid++,
            pid: para.pid !== undefined ? para.pid : pIdx,
            text: st,
            en: st,
            translation: sTrans,
            cn: sTrans,
            grammar_breakdown: this.generateGrammarBreakdown(st, sTrans)
          });
        });
      });

      data.sentences = sentences;
      if (window.AppState && (window.AppState.textData === data || window.AppState.textId === 'part_b')) {
        window.AppState.textData.sentences = sentences;
      }
      return sentences;
    },

    /**
     * Generate pedagogical grammar breakdown for syntax modal
     */
    generateGrammarBreakdown: function(en, cn) {
      const lower = en.toLowerCase();
      if (/\b(although|even though|though|while|whereas)\b/.test(lower)) {
        return '【让步与转折复合句】前半句或从句引导让步背景，主句为论述核心重心，注意把握转折对比关系。';
      }
      if (/\b(because|since|as|so that|in order that)\b/.test(lower)) {
        return '【因果论证逻辑句】包含因果关联连词，考查作者阐述事实原因与结论之间的严密因果逻辑。';
      }
      if (/\b(which|who|whom|whose|that)\b/.test(lower) && /\b(is|are|was|were|has|have|had|can|could|will|would)\b/.test(lower)) {
        return '【定语从句与主干修饰分离】含有关系代词引导的定语从句，需准确定位先行词并将修饰成分与句子主干分离。';
      }
      if (/\b(if|unless|provided that|as long as)\b/.test(lower)) {
        return '【条件状语从句】包含条件设定与推导结论，考查在限定条件下的语义推理与事实界定。';
      }
      if (/\b(however|but|yet|nevertheless|nonetheless|on the contrary)\b/.test(lower)) {
        return '【强转折对比逻辑】转折词引出作者真正强调的观点或反驳要点，常为新题型匹配的关键信息点。';
      }
      if (/\b(not only.+but also|either.+or|neither.+nor)\b/.test(lower)) {
        return '【并列平衡平行结构】并列连词连接两个对称结构，考查多维信息点的提炼与互补理解。';
      }
      return '【主干识别与修饰切分】主谓宾/主系表核心结构，考查抓住句法骨干并理解副词、介词短语修饰语的能力。';
    },

    /**
     * Tokenize text so meaningful English words are clickable (.exam-word-token),
     * while simple words (and, she, it, etc.) remain plain text for easy sentence clicking.
     */
    tokenizeWords: function(text) {
      return window.TextTokenizer.tokenizeWords(text);
    },

    /**
     * Locate paragraph / slot / sentence on left panel and smooth scroll
     */
    locateParagraph: function(qid, targetParaIndex) {
      document.querySelectorAll('.exam-para, .partb-heading-slot, .partb-exam-item-row, .partb-sent, .exam-sent').forEach(el => {
        el.classList.remove('locator-pulse', 'highlight-focus');
      });

      let targetEl = null;
      // 1. Heading slot
      const slotEl = document.getElementById(`heading-slot-${qid}`);
      if (slotEl) {
        targetEl = slotEl;
      }
      // 2. Specific paragraph
      if (targetParaIndex !== undefined && targetParaIndex !== null && targetParaIndex !== '') {
        const pEl = document.getElementById(`partb-para-${targetParaIndex}`);
        if (pEl) targetEl = pEl;
      }
      // 3. Question row
      if (!targetEl) {
        targetEl = document.getElementById(`exam-item-row-${qid}`);
      }

      if (targetEl) {
        void targetEl.offsetWidth; // Reflow
        targetEl.classList.add('locator-pulse', 'highlight-focus');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (window.showToast) {
          window.showToast(`📍 已在左侧原文定位第 ${qid} 题出处`);
        }
      }
    },

    /**
     * Switch between Practice and Review mode
     */
    switchMode: function(mode) {
      this.currentMode = mode;
      if (window.AppState) {
        window.AppState.mode = mode;
      }
      const practiceBtn = document.getElementById('practiceModeBtn');
      const reviewBtn = document.getElementById('reviewModeBtn');
      if (practiceBtn) practiceBtn.classList.toggle('active', mode === 'practice');
      if (reviewBtn) reviewBtn.classList.toggle('active', mode === 'review');
      document.body.classList.toggle('mode-review', mode === 'review');
      document.body.classList.toggle('mode-practice', mode === 'practice');

      if (window.AppState && window.AppState.textData) {
        this.render(window.AppState.textData, window.AppState.year, mode);
      }
    },

    renderLeftPanel: function(data, year) {
      const examPaper = document.getElementById('examPaper');
      if (!examPaper) return;

      const leftScroll = document.getElementById('leftScroll');
      const prevScrollTop = leftScroll ? leftScroll.scrollTop : 0;

      const fs = window.ReaderModule?.settings?.fontSize || 17.5;
      const lh = window.ReaderModule?.settings?.lineHeight || 1.85;
      const showTrans = this.getShowTrans();
      const isReviewMode = this.currentMode === 'review';
      const answers = data.answers || {};

      let parasHtml = '';
      (data.paragraphs || []).forEach((p, idx) => {
        const pText = (typeof p === 'string' ? p : p.text) || '';
        const mBlank = pText.match(/^\(?\s*(4[1-5])\s*\)?\s*[_—]+/);

        if (mBlank) {
          const blankQid = Number(mBlank[1]);
          const userPick = userSelections[blankQid];
          const correctKey = answers[blankQid];
          const isActive = activeItemQid === blankQid;

          if (isReviewMode) {
            // Review Mode: Show official answer and authentic translation
            const optEn = correctKey && data.options ? data.options[correctKey] : '';
            const optCn = correctKey && data.options_cn ? data.options_cn[correctKey] : '';
            parasHtml += `
              <div class="partb-heading-slot review-key-slot ${isActive ? 'active' : ''}" data-qid="${blankQid}" id="heading-slot-${blankQid}" title="点击在右侧复盘工作台查看第 ${blankQid} 题解析与解题线索">
                <div class="partb-heading-slot-header">
                  <span class="partb-heading-tag">【第 ${blankQid} 题小标题】</span>
                  <span class="partb-heading-status official">★ 标准正解 [ ${correctKey || '待定'} ]</span>
                </div>
                <div class="partb-heading-content">
                  <strong>[ ${correctKey || '—'} ]</strong> ${this.tokenizeWords(optEn)}
                </div>
                ${optCn ? `<div class="partb-heading-trans">💡 选项译文：${optCn}</div>` : ''}
              </div>
            `;
          } else {
            // Practice Mode
            const matchedOptText = userPick && data.options ? data.options[userPick] : '';
            const matchedOptCn = userPick && data.options_cn ? data.options_cn[userPick] : '';
            parasHtml += `
              <div class="partb-heading-slot ${userPick ? 'matched' : ''} ${isActive ? 'active' : ''}" data-qid="${blankQid}" id="heading-slot-${blankQid}" title="点击在右侧工作台配对第 ${blankQid} 题小标题">
                <div class="partb-heading-slot-header">
                  <span class="partb-heading-tag">【第 ${blankQid} 题小标题】</span>
                  <span class="partb-heading-status">${userPick ? `已选 [ ${userPick} ]` : '👉 待选择 (点击定位此题)'}</span>
                </div>
                <div class="partb-heading-content">
                  ${userPick ? `<strong>[ ${userPick} ]</strong> ${this.tokenizeWords(matchedOptText)}` : '待在右侧工作台选择对应小标题 (A-G)'}
                </div>
                ${showTrans && userPick && matchedOptCn ? `
                  <div class="partb-heading-trans">💡 译：${matchedOptCn}</div>
                ` : ''}
              </div>
            `;
          }
        } else {
          // Regular paragraph: Split into structured sentences (.exam-sent.partb-sent)
          const pPid = p.pid !== undefined ? p.pid : idx;
          const pSents = (data.sentences || []).filter(s => s.pid === pPid);
          let paraSentsHtml = '';

          if (pSents.length > 0) {
            paraSentsHtml = pSents.map(s => `
              <span class="exam-sent partb-sent" id="sent-${s.sid}" data-sid="${s.sid}" data-pid="${s.pid}" title="点击查看长难句拆解、参考译文与考点">${this.tokenizeWords(s.text)}</span>
            `).join(' ');
          } else {
            paraSentsHtml = this.tokenizeWords(pText);
          }

          parasHtml += `
            <div class="exam-para" id="partb-para-${pPid}" data-pid="${pPid}">
              <div class="partb-para-header">
                <span class="para-badge">[Para ${idx + 1}]</span>
                <button type="button" class="partb-trans-toggle-btn ${showTrans ? 'active' : ''}" data-pid="${pPid}" title="展开/收起本段译文">🌐 译文</button>
              </div>
              <span class="para-text" style="font-size:${fs}px;line-height:${lh}">${paraSentsHtml}</span>
              ${showTrans && p.translation ? `
                <div class="partb-para-trans show" id="partb-para-trans-${pPid}">
                  <span class="partb-trans-badge">译文</span>
                  <span class="partb-trans-text">${p.translation}</span>
                </div>
              ` : ''}
            </div>
          `;
        }
      });

      // Questions Section below article for Multiple Matching & True False
      let questionsSectionHtml = '';
      if (data.subtype !== 'heading_matching') {
        const isTrueFalse = data.subtype === 'true_false';
        const sectionTitle = isTrueFalse ? '📋 正误判断题目列表 (Questions 41-45)' : '📋 人名/待匹配项目列表 (Questions 41-45 · 待配对项)';
        questionsSectionHtml = `
          <div class="partb-questions-panel">
            <h3 style="font-size:1.15em;font-weight:700;margin:28px 0 14px;color:var(--ink);display:flex;align-items:center;gap:8px">
              <span>${sectionTitle}</span>
              <span style="font-size:0.75em;color:var(--muted);font-weight:normal">${isReviewMode ? '（官方正解与原文出处对照）' : '（点击题目快速联动右侧工作台）'}</span>
            </h3>
            <div class="partb-exam-items-list">
              ${(data.items || []).map(item => {
                const qid = item.qid;
                const pick = userSelections[qid];
                const correctKey = answers[qid];
                const isActive = activeItemQid === qid;

                if (isReviewMode) {
                  const optText = correctKey && data.options ? data.options[correctKey] : '';
                  const optCn = correctKey && data.options_cn ? data.options_cn[correctKey] : '';
                  return `
                    <div class="partb-exam-item-row review-mode ${isActive ? 'active' : ''}" data-qid="${qid}" id="exam-item-row-${qid}" title="点击在右侧复盘工作台查看解析">
                      <span class="partb-exam-item-qid">${qid}.</span>
                      <div class="partb-exam-item-body">
                        <div class="partb-exam-item-en">${this.tokenizeWords(item.title || item.stem || '')}</div>
                        ${item.title_cn ? `<div class="partb-exam-item-cn">💡 题意：${item.title_cn}</div>` : ''}
                        <div class="partb-exam-item-picked official">
                          ★ 标准正解 [ <strong>${correctKey}</strong> ]: ${this.tokenizeWords(optText)}
                        </div>
                        ${optCn ? `<div class="partb-exam-item-opt-cn">💡 选项译文：${optCn}</div>` : ''}
                      </div>
                      <div class="partb-exam-item-match">
                        <span class="partb-matched-badge official">[ ★ ${correctKey} ]</span>
                      </div>
                    </div>
                  `;
                } else {
                  const optText = pick && data.options ? data.options[pick] : '';
                  return `
                    <div class="partb-exam-item-row ${isActive ? 'active' : ''} ${pick ? 'matched' : ''}" data-qid="${qid}" id="exam-item-row-${qid}" title="点击在右侧工作台配对第 ${qid} 题">
                      <span class="partb-exam-item-qid">${qid}.</span>
                      <div class="partb-exam-item-body">
                        <div class="partb-exam-item-en">${item.title || item.stem || ''}</div>
                        ${showTrans && item.title_cn ? `<div class="partb-exam-item-cn">💡 ${item.title_cn}</div>` : ''}
                        ${pick ? `<div class="partb-exam-item-picked">➔ 已选 [ <strong>${pick}</strong> ]: ${optText}</div>` : ''}
                      </div>
                      <div class="partb-exam-item-match">
                        ${pick ? `<span class="partb-matched-badge">[ ${pick} ]</span>` : `<span class="partb-unmatched-badge">待配对</span>`}
                      </div>
                    </div>
                  `;
                }
              }).join('')}
            </div>
          </div>
        `;
      }

      const modeTitle = isReviewMode ? '深度复盘模式' : '实战做题模式';
      const modeBadgeColor = isReviewMode ? '#059669' : '#7c3aed';

      examPaper.innerHTML = `
        <div class="reader-toolbar">
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">题型:</span>
            <span class="badge" style="background:#7c3aed;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.82em">Section II Part B 新题型 (10分)</span>
            <span class="badge" style="background:${modeBadgeColor};color:#fff;padding:2px 8px;border-radius:4px;font-size:0.82em">${modeTitle}</span>
          </div>
          <div class="toolbar-group" style="margin-left:auto;display:flex;align-items:center;gap:8px">
            <button class="toolbar-btn ${showTrans ? 'active' : ''}" id="btnTogglePartBTrans" title="切换全文与选项中文对照">🌐 全文对照</button>
          </div>
        </div>

        <h2 style="font-size:1.35em;font-weight:800;margin-bottom:4px">${year} 年全国硕士研究生招生考试英语（二）</h2>
        <div style="color:var(--muted);font-size:0.95em;margin-bottom:14px">
          Section II Reading Comprehension Part B ｜ 41-45 题（满分 10 分） ｜ <span style="color:var(--accent);font-weight:600">💡 点击句子查长难句拆解，点击单词即查生词</span>
        </div>

        <div class="matching-banner" style="margin-bottom:18px">
          <strong>Directions:</strong> ${data.directions || 'Read the following text and match each of the numbered items in the left column to its corresponding information in the right column. There are two extra choices in the right column. (10 points)'}
        </div>

        <div class="exam-article-section">
          ${parasHtml}
          ${questionsSectionHtml}
        </div>
      `;

      if (leftScroll && prevScrollTop) {
        leftScroll.scrollTop = prevScrollTop;
      }

      // Bind events in left panel
      const toggleBtn = examPaper.querySelector('#btnTogglePartBTrans');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          this.setShowTrans(!this.getShowTrans());
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
        });
      }


      // Individual paragraph translation toggle buttons
      examPaper.querySelectorAll('.partb-trans-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const pid = Number(btn.getAttribute('data-pid'));
          let transDrawer = document.getElementById(`partb-para-trans-${pid}`);
          if (!transDrawer) {
            const pObj = (data.paragraphs || []).find((pr, pIdx) => (pr.pid !== undefined ? pr.pid : pIdx) === pid);
            if (pObj && pObj.translation) {
              transDrawer = document.createElement('div');
              transDrawer.className = 'partb-para-trans show';
              transDrawer.id = `partb-para-trans-${pid}`;
              transDrawer.innerHTML = `
                <span class="partb-trans-badge">段落译文</span>
                <span class="partb-trans-text">${pObj.translation}</span>
              `;
              const paraEl = document.getElementById(`partb-para-${pid}`);
              if (paraEl) paraEl.appendChild(transDrawer);
              btn.classList.add('active');
            }
          } else {
            transDrawer.classList.toggle('show');
            btn.classList.toggle('active', transDrawer.classList.contains('show'));
          }
        });
      });

      // Clicking sentence opens Syntax Modal
      examPaper.querySelectorAll('.partb-sent').forEach(sentEl => {
        sentEl.addEventListener('click', (e) => {
          if (e.target.closest('.exam-word-token')) return;
          e.stopPropagation();
          const sid = Number(sentEl.getAttribute('data-sid'));
          const sentObj = (data.sentences || []).find(s => s.sid === sid);
          if (sentObj && window.showSyntaxModal) {
            document.querySelectorAll('.exam-sent, .trans-sent').forEach(el => el.classList.remove('active-sent', 'highlight-focus'));
            sentEl.classList.add('active-sent');
            window.showSyntaxModal(sentObj, data.sentences);
          }
        });
      });

      // Clicking heading slot activates item on right
      examPaper.querySelectorAll('.partb-heading-slot').forEach(el => {
        el.addEventListener('click', () => {
          const qid = Number(el.getAttribute('data-qid'));
          activeItemQid = qid;
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
          const targetCard = document.getElementById(`matching-item-${qid}`) || document.getElementById(`matching-review-card-${qid}`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      });

      // Clicking question row activates item on right
      examPaper.querySelectorAll('.partb-exam-item-row').forEach(el => {
        el.addEventListener('click', () => {
          const qid = Number(el.getAttribute('data-qid'));
          activeItemQid = qid;
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
          const targetCard = document.getElementById(`matching-item-${qid}`) || document.getElementById(`matching-review-card-${qid}`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      });
    },

    renderRightPanel: function(data, year, mode) {
      if (mode === 'review') {
        this.renderReviewRightPanel(data, year);
      } else {
        this.renderPracticeRightPanel(data, year);
      }
    },

    /**
     * Practice Mode Workbench
     */
    renderPracticeRightPanel: function(data, year) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;

      const rightScroll = document.getElementById('rightScroll');
      const prevScrollTop = rightScroll ? rightScroll.scrollTop : 0;

      const isSubmitted = localStorage.getItem(`kaoyan_partb_submitted_${year}`) === 'true';
      const answers = data.answers || {};
      const showTrans = this.getShowTrans();

      // 1. Items List (41-45)
      let itemsHtml = '';
      (data.items || []).forEach(item => {
        const qid = item.qid;
        const currentChoice = userSelections[qid] || '';
        const isCorrect = answers[qid] ? (currentChoice === answers[qid]) : null;
        const isCurrentActive = activeItemQid === qid;
        const assignedOptText = currentChoice && data.options ? data.options[currentChoice] : '';
        const assignedOptCn = currentChoice && data.options_cn ? data.options_cn[currentChoice] : '';

        let badgeHtml = '';
        if (isSubmitted) {
          if (isCorrect) {
            badgeHtml = `<span class="matching-badge-assigned correct">✔ 匹配正确</span>`;
          } else {
            badgeHtml = `<span class="matching-badge-assigned wrong">✖ 错选 [ ${currentChoice || '未选'} ] · 正解: [ ${answers[qid]} ]</span>`;
          }
        } else if (currentChoice) {
          badgeHtml = `<span class="matching-badge-assigned">已配对 [ ${currentChoice} ]</span>`;
        } else {
          badgeHtml = `<span style="font-size:0.82em;color:var(--muted);border:1px dashed var(--border);padding:2px 6px;border-radius:4px">待配对</span>`;
        }

        itemsHtml += `
          <div class="matching-item-card ${isCurrentActive ? 'active' : ''}" id="matching-item-${qid}" data-qid="${qid}">
            <div class="matching-item-header">
              <div class="matching-item-title">
                <span class="partb-item-num">${qid}.</span>
                <span class="partb-item-text">${item.title || item.stem || ''}</span>
                ${showTrans && item.title_cn ? `
                  <div class="matching-item-cn">💡 ${item.title_cn}</div>
                ` : ''}
              </div>
              ${badgeHtml}
            </div>

            ${currentChoice ? `
              <div class="matching-item-selected-preview">
                <div class="matching-preview-en"><span class="matching-preview-tag">[ ${currentChoice} ]</span> ${assignedOptText}</div>
                ${showTrans && assignedOptCn ? `<div class="matching-preview-cn">💡 译：${assignedOptCn}</div>` : ''}
              </div>
            ` : ''}

            <!-- Quick dropdown selector -->
            <div style="display:flex;align-items:center;gap:8px;margin-top:10px">
              <span style="font-size:0.82em;color:var(--muted)">匹配选项:</span>
              <select class="select-control partb-item-select" data-qid="${qid}" style="font-size:0.85em;padding:4px 8px;flex:1">
                <option value="">-- 点击选择 A-G --</option>
                ${Object.keys(data.options || {}).sort().map(key => `
                  <option value="${key}" ${currentChoice === key ? 'selected' : ''}>[${key}] ${data.options[key] || ''}</option>
                `).join('')}
              </select>
            </div>
          </div>
        `;
      });

      // 2. Options List (A-G)
      let optionsHtml = '';
      Object.keys(data.options || {}).sort().forEach(key => {
        const optText = data.options[key];
        const optCn = data.options_cn ? data.options_cn[key] : '';
        const assignedQid = Object.keys(userSelections).find(q => userSelections[q] === key);
        const isAssigned = !!assignedQid;
        const isAssignedToActive = isAssigned && (Number(assignedQid) === Number(activeItemQid));

        optionsHtml += `
          <div class="matching-opt-choice ${isAssigned ? 'used' : ''} ${isAssignedToActive ? 'selected' : ''}" data-opt="${key}">
            <span class="matching-opt-tag">${key}</span>
            <div style="flex:1">
              <div style="color:var(--ink)">${optText}</div>
              ${showTrans && optCn ? `
                <div class="matching-opt-cn">译：${optCn}</div>
              ` : ''}
              ${isAssigned ? `<div style="font-size:0.78em;color:var(--accent);margin-top:4px">📌 当前已分配给第 <strong>${assignedQid}</strong> 题</div>` : ''}
            </div>
          </div>
        `;
      });

      // 3. Score & Distractors (if submitted)
      let reviewSectionHtml = '';
      if (isSubmitted) {
        let score = 0;
        Object.keys(answers).forEach(q => {
          if (userSelections[q] === answers[q]) score += 2;
        });

        reviewSectionHtml = `
          <div style="background:var(--surface);border:2px solid var(--accent);border-radius:10px;padding:14px;margin-top:16px">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
              <div>
                <strong style="font-size:1.05em">📊 本次答题得分报告：</strong>
                <span style="font-size:1.3em;font-weight:800;color:${score >= 6 ? 'var(--success)' : 'var(--danger)'}">${score} / 10 分</span>
              </div>
            </div>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="matching-container">
          <div class="cloze-card-header" style="border-bottom:1px solid var(--border);padding-bottom:10px">
            <div>
              <span style="font-size:1.05em;font-weight:700">🧩 新题型匹配工作台 (41-45 题)</span>
              <div style="font-size:0.82em;color:var(--muted);margin-top:2px">每题 2 分 · 满分 10 分 ｜ 点击单词查词</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <button class="toolbar-btn ${showTrans ? 'active' : ''}" id="btnTogglePartBTransRight" style="font-size:0.8em;padding:2px 8px" title="切换全文与选项中文对照">🌐 全文对照</button>
            </div>
          </div>

          <div style="font-size:0.88em;color:var(--muted);line-height:1.5">
            💡 <strong>解题指引：</strong>点击左侧题卡，再点击右侧选项即可快速配对；或在下拉框选择。全篇单词均支持点击即查释义与收藏。
          </div>

          <!-- Left column: 41-45 items -->
          <div class="matching-columns">
            ${itemsHtml}
          </div>

          <!-- Right column: Options A-G -->
          <div style="margin-top:12px">
            <div style="font-weight:700;font-size:0.92em;margin-bottom:8px;color:var(--ink)">
              📋 待选信息栏 (Options A-G · 含 2 个多余干扰项)：
            </div>
            <div class="matching-options-list">
              ${optionsHtml}
            </div>
          </div>

          <!-- Bottom Action Controls -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid var(--border);flex-wrap:wrap;gap:8px">
            <button id="btnResetPartB" class="btn" style="font-size:0.85em">重置选择</button>
            <button id="btnSubmitPartB" class="btn" style="font-size:0.85em;background:var(--accent);color:#fff;border-color:var(--accent-dark);font-weight:700">
              ${isSubmitted ? '重新作答' : '提交交卷并核对 (10分)'}
            </button>
          </div>

          ${reviewSectionHtml}
        </div>
      `;

      if (rightScroll && prevScrollTop) {
        rightScroll.scrollTop = prevScrollTop;
      }

      this.bindPracticeEvents(data, year);
    },

    /**
     * Dedicated Pedagogical Review Mode Workbench
     */
    renderReviewRightPanel: function(data, year) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;

      const rightScroll = document.getElementById('rightScroll');
      const prevScrollTop = rightScroll ? rightScroll.scrollTop : 0;

      const answers = data.answers || {};
      const showTrans = this.getShowTrans();

      // Calculate score if practiced
      let score = 0;
      let correctCount = 0;
      let attemptedCount = 0;
      Object.keys(answers).forEach(q => {
        if (userSelections[q]) {
          attemptedCount++;
          if (userSelections[q] === answers[q]) {
            score += 2;
            correctCount++;
          }
        }
      });

      // 1. Sticky Question Navigation Bar
      const navPillsHtml = (data.items || []).map(item => `
        <button type="button" class="btn-review-q-nav ${activeItemQid === item.qid ? 'active' : ''}" data-qid="${item.qid}">
          第 ${item.qid} 题
        </button>
      `).join('');

      // 2. Question Review Cards (41 to 45)
      let cardsHtml = '';
      (data.items || []).forEach(item => {
        const qid = item.qid;
        const ansKey = answers[qid];
        const userPick = userSelections[qid];
        const isCurrentActive = activeItemQid === qid;
        const optEn = ansKey && data.options ? data.options[ansKey] : '';
        const optCn = ansKey && data.options_cn ? data.options_cn[ansKey] : '';

        // Pedagogical matching rationale
        let rationale = '';
        if (data.subtype === 'heading_matching') {
          rationale = `
            <div style="margin-bottom:6px"><strong>📌 段落主题聚焦：</strong>本段重点围绕“<strong>${item.title_cn || '核心主旨'}</strong>”展开论述。</div>
            <div style="margin-bottom:6px"><strong>🔍 词汇复现与同义替换：</strong>选项 [ <strong>${ansKey}</strong> ] 准确提炼了该段落核心论点，与原文论据及主题句高度呼应。</div>
            <div style="color:var(--muted);font-size:0.92em">💡 做题技巧：小标题题目需优先抓取段首第一句、转折词后句子以及总结句，避免被局部细节词带偏。</div>
          `;
        } else if (data.subtype === 'true_false') {
          rationale = `
            <div style="margin-bottom:6px"><strong>📌 事实信息核对：</strong>在原文中查找该题干事实陈述的客观对应依据。</div>
            <div style="margin-bottom:6px"><strong>🔍 判断关键点：</strong>选项 [ <strong>${ansKey}</strong> ] 与文章事实完全吻合，符合真题命题客观基准。</div>
          `;
        } else {
          rationale = `
            <div style="margin-bottom:6px"><strong>📌 专有名词与人物定位：</strong>定位题干中的【<strong>${item.title || item.stem || ''}</strong>】出处段落。</div>
            <div style="margin-bottom:6px"><strong>🔍 观点改写与同义对应：</strong>选项 [ <strong>${ansKey}</strong> ] 对原文观点进行了精准的同义转述（Paraphrase）。</div>
          `;
        }

        cardsHtml += `
          <div class="matching-review-card ${isCurrentActive ? 'active' : ''}" id="matching-review-card-${qid}" data-qid="${qid}">
            <div class="matching-review-header">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span class="partb-review-qid-badge">第 ${qid} 题</span>
                <span class="partb-review-key-badge">★ 官方正解: [ ${ansKey} ]</span>
                ${userPick ? (userPick === ansKey ? '<span class="partb-user-status correct">✔ 你的作答正确 (+2分)</span>' : `<span class="partb-user-status wrong">✖ 你的作答: [ ${userPick} ] (错误)</span>`) : ''}
              </div>
              <button type="button" class="btn-locate-para" data-qid="${qid}" data-para="${item.locate_para !== undefined ? item.locate_para : ''}">📍 定位原文出处</button>
            </div>

            <!-- Stem / Paragraph Title -->
            <div class="partb-review-stem-box">
              <div class="partb-review-stem-en">${this.tokenizeWords(item.title || item.stem || '')}</div>
              ${item.title_cn ? `<div class="partb-review-stem-cn">💡 题意概括：${item.title_cn}</div>` : ''}
            </div>

            <!-- Standard Matched Option -->
            <div class="partb-review-ans-box">
              <div class="partb-review-ans-tag">★ 标准匹配选项 [ ${ansKey} ]</div>
              <div class="partb-review-ans-en">${this.tokenizeWords(optEn)}</div>
              ${optCn ? `<div class="partb-review-ans-cn">💡 选项译文：${optCn}</div>` : ''}
            </div>

            <!-- Matching Logic & Clues -->
            <div class="partb-review-clue-box">
              <div class="partb-review-clue-title">💡 命题逻辑与解题线索：</div>
              <div class="partb-review-clue-content">${rationale}</div>
            </div>
          </div>
        `;
      });

      // 3. Distractors Breakdown (2 extra options)
      let distractorSectionHtml = '';
      if (data.distractors && data.distractors.length > 0) {
        distractorSectionHtml = `
          <div class="partb-distractor-section">
            <div class="partb-distractor-header">
              <strong style="color:var(--danger);font-size:1.02em">⚠️ 2 个未被选择的多余干扰项深度解密 (Distractors Analysis)</strong>
              <div style="font-size:0.82em;color:var(--muted);margin-top:2px">命题人精心设置的干扰陷阱，彻底扫清迷惑：</div>
            </div>
            <div class="partb-distractor-list">
              ${data.distractors.map(dKey => `
                <div class="partb-distractor-card">
                  <div class="partb-distractor-tag">【多余干扰项 ${dKey}】</div>
                  <div class="partb-distractor-en">${this.tokenizeWords(data.options[dKey] || '')}</div>
                  ${data.options_cn && data.options_cn[dKey] ? `<div class="partb-distractor-cn">💡 选项译文：${data.options_cn[dKey]}</div>` : ''}
                  <div class="partb-distractor-trap">
                    <strong>⚠️ 陷阱剖析：</strong>${data.distractor_analysis?.[dKey] || '原文未提供直接依据支持此表述，为命题人制造的无中生有、过度推断或张冠李戴的干扰项。'}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      // 4. Core Part B High-Frequency Vocabulary
      const vocabList = this.extractKeyVocab(data);
      let vocabSectionHtml = '';
      if (vocabList && vocabList.length > 0) {
        vocabSectionHtml = `
          <div class="partb-vocab-matrix-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <div>
                <strong style="font-size:1.02em;color:var(--ink)">📚 本篇新题型核心考点词汇库 (${vocabList.length} 词)</strong>
                <div style="font-size:0.82em;color:var(--muted);margin-top:2px">点击任意单词即享发音朗读 🔊、大纲释义与一键加入生词本 ⭐</div>
              </div>
            </div>
            <div class="partb-vocab-chips-container">
              ${vocabList.map(v => `
                <div class="partb-vocab-chip">
                  <span class="exam-word-token partb-vocab-word" data-word="${v.word}">${v.word}</span>
                  <button type="button" class="btn-vocab-chip-speak" data-word="${v.word}" title="🔊 朗读发音">🔊</button>
                  <span class="partb-vocab-pos">${v.pos || '考研'}</span>
                  <span class="partb-vocab-def">${v.def}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="matching-container review-mode">
          <!-- Review Header -->
          <div class="cloze-card-header" style="border-bottom:1px solid var(--border);padding-bottom:10px">
            <div>
              <span style="font-size:1.1em;font-weight:800;color:var(--ink)">🧩 新题型深度复盘工作台 (41-45 题)</span>
              <div style="font-size:0.82em;color:var(--muted);margin-top:3px">官方正解对照 · 命题线索揭秘 · 干扰项深度避坑</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <button class="toolbar-btn ${showTrans ? 'active' : ''}" id="btnTogglePartBTransReview" style="font-size:0.8em;padding:2px 8px" title="切换全文与选项中文对照">🌐 全文对照</button>
            </div>
          </div>

          <!-- Score / Summary Banner -->
          <div class="partb-review-score-banner">
            ${attemptedCount > 0 ? `
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <div>
                  <span style="font-size:0.9em;color:var(--muted)">你的实战成绩：</span>
                  <span style="font-size:1.35em;font-weight:800;color:${score >= 6 ? 'var(--success)' : 'var(--danger)'}">${score} / 10 分</span>
                  <span style="font-size:0.85em;color:var(--muted);margin-left:8px">(答对 ${correctCount} 题 · 答错 ${5 - correctCount} 题)</span>
                </div>
                <button type="button" id="btnRetestPartB" class="btn" style="font-size:0.82em;padding:3px 10px">🔄 重新做题测试</button>
              </div>
            ` : `
              <div style="font-size:0.92em;color:var(--ink);display:flex;align-items:center;gap:8px">
                <span class="badge" style="background:#059669;color:#fff;padding:2px 8px;border-radius:4px">官方复盘</span>
                <span>本篇共 5 道题（满分 10 分），请结合左侧原文及右侧考点线索进行深度复盘研读。</span>
              </div>
            `}
          </div>

          <!-- Sticky Question Quick Jump Nav -->
          <div class="partb-review-q-nav">
            <span style="font-size:0.85em;font-weight:700;color:var(--muted)">🎯 题号直达:</span>
            ${navPillsHtml}
          </div>

          <!-- Questions 41-45 Detailed Review Cards -->
          <div class="partb-review-cards-list">
            ${cardsHtml}
          </div>

          <!-- 2 Distractors Analysis -->
          ${distractorSectionHtml}

          <!-- Core Vocabulary Matrix -->
          ${vocabSectionHtml}

          <!-- Footer Actions -->
          <div style="display:flex;justify-content:flex-end;align-items:center;margin-top:20px;padding-top:14px;border-top:1px solid var(--border);flex-wrap:wrap;gap:8px">
            <button id="btnFooterToggleTrans" class="btn" style="font-size:0.85em">🌐 切换全文对照</button>
          </div>
        </div>
      `;

      if (rightScroll && prevScrollTop) {
        rightScroll.scrollTop = prevScrollTop;
      }

      this.bindReviewEvents(data, year);
    },

    /**
     * Extract key vocabulary from Part B options and text
     */
    extractKeyVocab: function(data) {
      const vocabDict = (typeof window !== 'undefined' && window.KAOYAN_VOCAB_DICT) ? window.KAOYAN_VOCAB_DICT : {};
      const foundWords = new Map();

      // Collect all text from options and paragraphs
      let corpus = '';
      Object.keys(data.options || {}).forEach(k => { corpus += ' ' + (data.options[k] || ''); });
      (data.paragraphs || []).forEach(p => { corpus += ' ' + ((typeof p === 'string' ? p : p.text) || ''); });

      const cleanTokens = corpus.toLowerCase().match(/\b[a-zA-Z]{5,}\b/g) || [];
      const stopWords = new Set([
        'about', 'above', 'after', 'again', 'against', 'also', 'and', 'another', 'because', 'been',
        'before', 'being', 'below', 'between', 'both', 'could', 'down', 'during', 'each', 'from',
        'have', 'having', 'into', 'just', 'more', 'most', 'only', 'other', 'over', 'same',
        'should', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'then',
        'there', 'these', 'they', 'this', 'those', 'through', 'under', 'until', 'very', 'were',
        'what', 'when', 'where', 'which', 'while', 'will', 'with', 'would', 'your', 'words'
      ]);

      cleanTokens.forEach(tok => {
        if (stopWords.has(tok)) return;
        if (foundWords.has(tok)) return;
        const entry = vocabDict[tok];
        foundWords.set(tok, {
          word: tok,
          pos: entry ? (entry.pos || '考研') : '考研',
          def: entry ? (entry.def || entry.full || '真题重点核心词汇') : '真题高频核心词汇'
        });
      });

      return Array.from(foundWords.values()).slice(0, 16);
    },

    bindPracticeEvents: function(data, year) {
      // 1. Item card click to set active item
      document.querySelectorAll('.matching-item-card').forEach(el => {
        el.addEventListener('click', (e) => {
          if (e.target.tagName.toLowerCase() === 'select') return;
          const qid = Number(el.getAttribute('data-qid'));
          activeItemQid = qid;
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
          const item = (data.items || []).find(it => it.qid === qid);
          this.locateParagraph(qid, item ? item.locate_para : undefined);
        });
      });

      // 2. Select dropdown change
      document.querySelectorAll('.partb-item-select').forEach(sel => {
        sel.addEventListener('change', () => {
          const qid = Number(sel.getAttribute('data-qid'));
          const opt = sel.value;
          if (opt) {
            Object.keys(userSelections).forEach(k => {
              if (userSelections[k] === opt && Number(k) !== qid) delete userSelections[k];
            });
            userSelections[qid] = opt;
          } else {
            delete userSelections[qid];
          }
          localStorage.setItem(`kaoyan_partb_${year}`, JSON.stringify(userSelections));
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
        });
      });

      // 3. Option choice card click
      document.querySelectorAll('.matching-opt-choice').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.exam-word-token')) return;
          const opt = card.getAttribute('data-opt');
          if (userSelections[activeItemQid] === opt) {
            delete userSelections[activeItemQid];
          } else {
            Object.keys(userSelections).forEach(k => {
              if (userSelections[k] === opt) delete userSelections[k];
            });
            userSelections[activeItemQid] = opt;
          }
          localStorage.setItem(`kaoyan_partb_${year}`, JSON.stringify(userSelections));
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
        });
      });

      // 4. Submit & Reset
      const submitBtn = document.getElementById('btnSubmitPartB');
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          const isSubmitted = localStorage.getItem(`kaoyan_partb_submitted_${year}`) === 'true';
          if (isSubmitted) {
            localStorage.removeItem(`kaoyan_partb_submitted_${year}`);
          } else {
            localStorage.setItem(`kaoyan_partb_submitted_${year}`, 'true');
          }
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
        });
      }

      const resetBtn = document.getElementById('btnResetPartB');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm('确定要清空新题型已作答的选项吗？')) {
            userSelections = {};
            localStorage.removeItem(`kaoyan_partb_${year}`);
            localStorage.removeItem(`kaoyan_partb_submitted_${year}`);
            this.renderLeftPanel(data, year);
            this.renderRightPanel(data, year, this.currentMode);
          }
        });
      }

      // 5. Toggle translation button
      const toggleBtnRight = document.getElementById('btnTogglePartBTransRight');
      if (toggleBtnRight) {
        toggleBtnRight.addEventListener('click', () => {
          this.setShowTrans(!this.getShowTrans());
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
        });
      }


    },

    bindReviewEvents: function(data, year) {
      // 1. Sticky Question Nav Buttons
      document.querySelectorAll('.btn-review-q-nav').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = Number(btn.getAttribute('data-qid'));
          activeItemQid = qid;
          document.querySelectorAll('.btn-review-q-nav').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          document.querySelectorAll('.matching-review-card').forEach(c => c.classList.remove('active'));
          const card = document.getElementById(`matching-review-card-${qid}`);
          if (card) {
            card.classList.add('active');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          const item = (data.items || []).find(it => it.qid === qid);
          this.locateParagraph(qid, item ? item.locate_para : undefined);
        });
      });

      // 2. Locate Paragraph Button inside each review card
      document.querySelectorAll('.btn-locate-para').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const qid = Number(btn.getAttribute('data-qid'));
          const pIndex = btn.getAttribute('data-para');
          this.locateParagraph(qid, pIndex !== '' ? Number(pIndex) : undefined);
        });
      });

      // 3. Card click to activate
      document.querySelectorAll('.matching-review-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.exam-word-token') || e.target.closest('button')) return;
          const qid = Number(card.getAttribute('data-qid'));
          activeItemQid = qid;
          document.querySelectorAll('.matching-review-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          document.querySelectorAll('.btn-review-q-nav').forEach(b => {
            b.classList.toggle('active', Number(b.getAttribute('data-qid')) === qid);
          });
          const item = (data.items || []).find(it => it.qid === qid);
          this.locateParagraph(qid, item ? item.locate_para : undefined);
        });
      });

      // 4. Vocabulary chip speak button
      document.querySelectorAll('.btn-vocab-chip-speak').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const word = btn.getAttribute('data-word');
          if (word && window.speakWord) {
            window.speakWord(word);
          }
        });
      });

      // 5. Toggle translation button
      const toggleReviewTrans = document.getElementById('btnTogglePartBTransReview');
      if (toggleReviewTrans) {
        toggleReviewTrans.addEventListener('click', () => {
          this.setShowTrans(!this.getShowTrans());
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
        });
      }

      const footerToggleTrans = document.getElementById('btnFooterToggleTrans');
      if (footerToggleTrans) {
        footerToggleTrans.addEventListener('click', () => {
          this.setShowTrans(!this.getShowTrans());
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
        });
      }



      // 7. Retest Part B
      const retestBtn = document.getElementById('btnRetestPartB');
      if (retestBtn) {
        retestBtn.addEventListener('click', () => {
          if (confirm('确定要清空作答并重新自测新题型吗？')) {
            userSelections = {};
            localStorage.removeItem(`kaoyan_partb_${year}`);
            localStorage.removeItem(`kaoyan_partb_submitted_${year}`);
            this.switchMode('practice');
          }
        });
      }
    }
  };
})();
