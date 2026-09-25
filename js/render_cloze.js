/**
 * Cloze Renderer: Section I Use of English (完形填空 / 英语知识运用)
 * Supports two practice styles:
 * 1. 'instant': 逐题即时批改 (写一道题批改一道，即时展现正误与精析)
 * 2. 'submit': 全篇统一交卷 (20题全部选完后，自主交卷统一核算得分与全解)
 */
(function() {
  let clozeSelections = {}; // { 1: 'D', 2: 'C', ... }
  let activeBlankQid = 1;

  window.ClozeRenderer = {
    currentMode: 'practice',

    getShowTrans: function() {
      if (window.ReaderModule?.settings?.showTrans !== undefined) {
        return window.ReaderModule.settings.showTrans;
      }
      return localStorage.getItem('kaoyan_cloze_show_trans') === 'true';
    },

    setShowTrans: function(val) {
      if (window.ReaderModule?.settings) {
        window.ReaderModule.settings.showTrans = val;
        window.StorageModule?.saveSettings(window.ReaderModule.settings);
      }
      localStorage.setItem('kaoyan_cloze_show_trans', String(val));
      localStorage.setItem('kaoyan_partb_show_trans', String(val));
    },

    getPracticeStyle: function() {
      return localStorage.getItem('kaoyan_cloze_practice_style') || 'instant';
    },

    setPracticeStyle: function(style) {
      localStorage.setItem('kaoyan_cloze_practice_style', style || 'instant');
    },

    isSubmittedForYear: function(year) {
      return localStorage.getItem(`kaoyan_cloze_submitted_${year}`) === 'true';
    },

    setSubmittedForYear: function(year, val) {
      if (val) {
        localStorage.setItem(`kaoyan_cloze_submitted_${year}`, 'true');
      } else {
        localStorage.removeItem(`kaoyan_cloze_submitted_${year}`);
        localStorage.removeItem(`kaoyan_cloze_${year}_submitted`);
      }
    },

    render: function(clozeData, year, mode) {
      if (!clozeData) return;
      this.currentMode = mode || 'practice';
      this.initUserState(clozeData, year);
      this.renderLeftPanel(clozeData, year, this.currentMode);
      this.renderRightPanel(clozeData, year, this.currentMode);
    },

    initUserState: function(data, year) {
      const saved = localStorage.getItem(`kaoyan_cloze_${year}`);
      if (saved) {
        try { clozeSelections = JSON.parse(saved); } catch(e) { clozeSelections = {}; }
      } else {
        clozeSelections = {};
      }
      if (!activeBlankQid) activeBlankQid = 1;
    },

    lookupWord: function(word, def, qid, opt, clientX, clientY, data, year, mode) {
      if (!word) return;
      const isReview = (mode === 'review');
      const practiceStyle = this.getPracticeStyle();
      const isSubmitted = this.isSubmittedForYear(year);
      const isMockExam = !isReview && (practiceStyle === 'submit');

      // Find sentence context for this blank
      let contextSent = '';
      if (data && data.paragraphs && qid) {
        const blankRegex = new RegExp(`_{1,4}${qid}_{1,4}|\\[\\s*${qid}\\s*\\]`);
        for (const p of data.paragraphs) {
          const text = p.text || p;
          if (blankRegex.test(text)) {
            const sents = text.split(/(?<=[.?!])\s+/);
            const matchSent = sents.find(s => blankRegex.test(s));
            contextSent = matchSent ? matchSent.trim() : text.trim();
            break;
          }
        }
      }

      const extraAction = (!isReview && (!isMockExam || !isSubmitted) && qid && opt) ? `
        <button id="btnPickThisClozeOpt" class="toolbar-btn" style="color:var(--accent);font-weight:700" title="确认选择该选项">👉 选为 [${opt}] 答案</button>
      ` : '';

      if (window.showVocabPopup) {
        window.showVocabPopup(word, clientX, clientY, contextSent, def, extraAction);
        const pickBtn = document.getElementById('btnPickThisClozeOpt');
        if (pickBtn) {
          pickBtn.onclick = () => {
            const popup = document.getElementById('vocabPopup');
            if (popup) popup.classList.remove('show');
            clozeSelections[qid] = opt;
            localStorage.setItem(`kaoyan_cloze_${year}`, JSON.stringify(clozeSelections));
            activeBlankQid = qid;
            this.renderLeftPanel(data, year, mode);
            this.renderRightPanel(data, year, mode);
            this.highlightBlank(qid, data, year, false);
          };
        }
      }
    },

    renderLeftPanel: function(data, year, mode) {
      const examPaper = document.getElementById('examPaper');
      if (!examPaper) return;

      const fs = window.ReaderModule?.settings?.fontSize || 17.5;
      const lh = window.ReaderModule?.settings?.lineHeight || 1.85;
      const isReview = (mode === 'review');
      const practiceStyle = this.getPracticeStyle();
      const isSubmitted = this.isSubmittedForYear(year);
      const isMockExam = !isReview && (practiceStyle === 'submit');
      const showTrans = this.getShowTrans();

      let parasHtml = '';
      (data.paragraphs || []).forEach((p, idx) => {
        let text = p.text || p;

        // Replace __1__ or [1] or [ 1 ] with interactive cloze-blank span
        text = text.replace(/_{1,4}(\d+)_{1,4}|\[\s*(\d+)\s*\]/g, (match, p1, p2) => {
          const qid = Number(p1 || p2);
          const chosenOpt = clozeSelections[qid];
          const qObj = (data.questions || []).find(q => q.qid === qid);
          const isAnswered = Boolean(chosenOpt);
          const isActive = activeBlankQid === qid;

          let stateCls = '';
          let wordHtml = '';

          if (isReview) {
            stateCls = 'filled correct';
            const rightWord = qObj?.options?.[qObj.answer] || '_______';
            wordHtml = `<span class="blank-word">${rightWord}</span>`;
          } else if (isMockExam && !isSubmitted) {
            if (isAnswered) {
              stateCls = 'filled picked';
              const chosenWord = qObj?.options?.[chosenOpt] || '_______';
              wordHtml = `<span class="blank-word picked-word">${chosenWord}</span>`;
            } else {
              wordHtml = `<span class="blank-word">_______</span>`;
            }
          } else if (isAnswered) {
            const isCorrect = qObj && (chosenOpt === qObj.answer);
            if (isCorrect) {
              stateCls = 'filled correct';
              const rightWord = qObj?.options?.[chosenOpt] || '_______';
              wordHtml = `<span class="blank-word">${rightWord}</span> <span class="blank-check">✔</span>`;
            } else {
              stateCls = 'filled wrong';
              const wrongWord = qObj?.options?.[chosenOpt] || '_______';
              const rightWord = qObj?.options?.[qObj.answer] || '';
              wordHtml = `<span class="blank-word wrong-text">${wrongWord}</span> <span class="blank-cross">✖</span>${rightWord ? `<span class="blank-correct-hint">正解:${rightWord}</span>` : ''}`;
            }
          } else {
            wordHtml = `<span class="blank-word">_______</span>`;
          }

          if (isActive) stateCls += ' active';

          return `<span class="cloze-blank ${stateCls}" id="cloze-blank-${qid}" data-qid="${qid}" title="第 ${qid} 空，点击定位右侧选项"><span class="blank-num">${qid}</span> ${wordHtml}</span>`;
        });

        parasHtml += `
          <div class="exam-para" id="cloze-para-${idx}">
            <span class="para-badge">[Para ${idx + 1}]</span>
            <span class="para-text" style="font-size:${fs}px;line-height:${lh}">${text}</span>
            ${showTrans && p.translation ? `
              <div class="cloze-para-trans">
                <span class="cloze-trans-badge">译文</span>
                <span class="cloze-trans-text">${p.translation}</span>
              </div>
            ` : ''}
          </div>
        `;
      });

      examPaper.innerHTML = `
        <div class="reader-toolbar">
          <div class="toolbar-group" style="display:flex;align-items:center;gap:8px">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">题型:</span>
            <span class="badge" style="background:#0284c7;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.82em">Section I 完形填空 (10分)</span>
            ${!isReview ? `
              <span class="badge" style="background:rgba(2,132,199,0.1);color:#0284c7;border:1px solid rgba(2,132,199,0.25);padding:2px 8px;border-radius:4px;font-size:0.8em">
                ${isMockExam ? '📝 全篇模考交卷' : '⚡ 逐题即时批改'}
              </span>
            ` : ''}
          </div>
          <div class="toolbar-group" style="margin-left:auto;display:flex;align-items:center;gap:8px">
            <button class="toolbar-btn ${showTrans ? 'active' : ''}" id="btnToggleClozeTrans" title="切换全文与选项中文对照">🌐 中文对照</button>
            <span style="font-size:0.82em;color:var(--muted)">20 题 · 每题 0.5 分</span>
          </div>
        </div>

        <h2 style="font-size:1.35em;font-weight:800;margin-bottom:4px">${year} 年全国硕士研究生招生考试英语（二）</h2>
        <div style="color:var(--muted);font-size:0.95em;margin-bottom:14px">
          Section I Use of English ｜ 1-20 题（满分 10 分）
        </div>

        <div class="matching-banner" style="margin-bottom:18px">
          <strong>Directions:</strong> ${data.directions || 'Read the following text. Choose the best word(s) for each numbered blank and mark A, B, C or D on the ANSWER SHEET. (10 points)'}
        </div>

        <div class="exam-article-section">
          ${parasHtml}
        </div>
      `;

      // Bind blank clicks and double-clicks
      examPaper.querySelectorAll('.cloze-blank').forEach(el => {
        el.addEventListener('click', () => {
          const qid = Number(el.getAttribute('data-qid'));
          activeBlankQid = qid;
          this.highlightBlank(qid, data, year, true);
        });

        el.addEventListener('dblclick', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const qid = Number(el.getAttribute('data-qid'));
          const qObj = (data.questions || []).find(q => q.qid === qid);
          const chosenOpt = clozeSelections[qid] || qObj?.answer;
          const word = qObj?.options?.[chosenOpt];
          const def = qObj?.options_cn?.[chosenOpt] || '';
          if (word) {
            this.lookupWord(word, def, qid, chosenOpt, e.clientX, e.clientY, data, year, mode);
          }
        });
      });

      // Bind toggle translation button in left panel toolbar
      const toggleBtn = examPaper.querySelector('#btnToggleClozeTrans');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          this.setShowTrans(!this.getShowTrans());
          this.renderLeftPanel(data, year, mode);
          this.renderRightPanel(data, year, mode);
        });
      }
    },

    renderRightPanel: function(data, year, mode) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;

      const prevScrollTop = container.scrollTop;
      const isReview = (mode === 'review');
      const practiceStyle = this.getPracticeStyle();
      const isSubmitted = this.isSubmittedForYear(year);
      const isMockExam = !isReview && (practiceStyle === 'submit');
      const showTrans = this.getShowTrans();
      const questions = data.questions || [];
      const totalQuestions = questions.length || 20;

      let answeredCount = 0;
      let correctCount = 0;
      let wrongCount = 0;

      questions.forEach(q => {
        const chosen = clozeSelections[q.qid];
        if (chosen) {
          answeredCount++;
          if (chosen === q.answer) correctCount++;
          else wrongCount++;
        }
      });

      const score = (correctCount * 0.5).toFixed(1);
      const progressPct = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;

      // 1. Mini Question Navigation Chips
      let navChipsHtml = '';
      questions.forEach(q => {
        const qid = q.qid;
        const chosen = clozeSelections[qid];
        let chipCls = '';
        let chipText = String(qid);

        if (isReview) {
          chipCls = 'correct';
        } else if (isMockExam && !isSubmitted) {
          if (chosen) chipCls = 'picked';
        } else if (chosen) {
          if (chosen === q.answer) {
            chipCls = 'correct';
            chipText = `${qid}`;
          } else {
            chipCls = 'wrong';
            chipText = `${qid}`;
          }
        }

        if (activeBlankQid === qid) chipCls += ' active';
        const statusDesc = (isMockExam && !isSubmitted)
          ? (chosen ? `已作答 [${chosen}]` : '未作答')
          : (chosen ? (chosen === q.answer ? '答对' : '答错') : '未答');
        navChipsHtml += `<button class="cloze-nav-chip ${chipCls}" data-qid="${qid}" title="第 ${qid} 题 (${statusDesc})">${chipText}</button>`;
      });

      // 2. Real-time Dashboard / Status Banner
      let bannerHtml = '';
      let statsHtml = '';

      if (isReview) {
        bannerHtml = `
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding:8px 12px;background:rgba(124, 58, 237, 0.08);border:1px solid rgba(124, 58, 237, 0.22);border-radius:6px;font-size:0.88em;color:#7c3aed;font-weight:600">
            <span>📖 复盘精读模式：20 题全量答案、语境线索与长难句考点解析已全部展示</span>
          </div>
        `;
        statsHtml = `
          <div class="cloze-stat-item">
            <span class="cloze-stat-label">已作答</span>
            <span class="cloze-stat-val">${answeredCount} <small style="font-size:0.65em;color:var(--muted)">/ ${totalQuestions}</small></span>
          </div>
          <div class="cloze-stat-item correct">
            <span class="cloze-stat-label">答对</span>
            <span class="cloze-stat-val">${correctCount} 题</span>
          </div>
          <div class="cloze-stat-item wrong">
            <span class="cloze-stat-label">答错</span>
            <span class="cloze-stat-val">${wrongCount} 题</span>
          </div>
          <div class="cloze-stat-item score">
            <span class="cloze-stat-label">实时得分</span>
            <span class="cloze-stat-val highlight">${score} <small style="font-size:0.65em;color:var(--muted)">/ 10分</small></span>
          </div>
        `;
      } else if (isMockExam && !isSubmitted) {
        bannerHtml = `
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding:8px 12px;background:rgba(37, 99, 235, 0.07);border:1px solid rgba(37, 99, 235, 0.22);border-radius:6px;font-size:0.88em;color:var(--accent);font-weight:600">
            <span>📝 全篇模考模式：自主选完 20 题后点击“提交全篇批改”统一核算成绩与解析</span>
            <button id="btnSubmitClozeTop" class="btn" style="background:var(--accent);color:#fff;border:none;border-radius:4px;padding:4px 12px;font-size:0.82em;font-weight:700;cursor:pointer">
              🚀 提交批改
            </button>
          </div>
        `;
        statsHtml = `
          <div class="cloze-stat-item">
            <span class="cloze-stat-label">已作答</span>
            <span class="cloze-stat-val">${answeredCount} <small style="font-size:0.65em;color:var(--muted)">/ ${totalQuestions}</small></span>
          </div>
          <div class="cloze-stat-item" style="color:var(--muted)">
            <span class="cloze-stat-label">待作答</span>
            <span class="cloze-stat-val">${totalQuestions - answeredCount} 题</span>
          </div>
          <div class="cloze-stat-item score">
            <span class="cloze-stat-label">当前进度</span>
            <span class="cloze-stat-val highlight">${progressPct}% <small style="font-size:0.65em;color:var(--muted)">(${answeredCount}/${totalQuestions})</small></span>
          </div>
        `;
      } else if (isMockExam && isSubmitted) {
        bannerHtml = `
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding:8px 12px;background:rgba(22, 163, 74, 0.08);border:1px solid rgba(22, 163, 74, 0.25);border-radius:6px;font-size:0.88em;color:#15803d;font-weight:600">
            <span>🎉 模考交卷完成！最终得分: <strong>${score}</strong> / 10 分（答对 ${correctCount} 题，答错 ${wrongCount} 题）</span>
            <button id="btnReExamCloze" class="btn" style="background:#15803d;color:#fff;border:none;border-radius:4px;padding:4px 12px;font-size:0.82em;cursor:pointer">
              ↺ 重新模考
            </button>
          </div>
        `;
        statsHtml = `
          <div class="cloze-stat-item">
            <span class="cloze-stat-label">已作答</span>
            <span class="cloze-stat-val">${answeredCount} <small style="font-size:0.65em;color:var(--muted)">/ ${totalQuestions}</small></span>
          </div>
          <div class="cloze-stat-item correct">
            <span class="cloze-stat-label">答对</span>
            <span class="cloze-stat-val">${correctCount} 题</span>
          </div>
          <div class="cloze-stat-item wrong">
            <span class="cloze-stat-label">答错</span>
            <span class="cloze-stat-val">${wrongCount} 题</span>
          </div>
          <div class="cloze-stat-item score">
            <span class="cloze-stat-label">最终得分</span>
            <span class="cloze-stat-val highlight">${score} <small style="font-size:0.65em;color:var(--muted)">/ 10分</small></span>
          </div>
        `;
      } else {
        // Default instant feedback mode
        statsHtml = `
            <div class="cloze-stat-item">
              <span class="cloze-stat-label">已作答</span>
              <span class="cloze-stat-val">${answeredCount} <small style="font-size:0.65em;color:var(--muted)">/ ${totalQuestions}</small></span>
            </div>
            <div class="cloze-stat-item correct">
              <span class="cloze-stat-label">答对</span>
              <span class="cloze-stat-val">${correctCount} 题</span>
            </div>
            <div class="cloze-stat-item wrong">
              <span class="cloze-stat-label">答错</span>
              <span class="cloze-stat-val">${wrongCount} 题</span>
            </div>
            <div class="cloze-stat-item score">
              <span class="cloze-stat-label">实时得分</span>
              <span class="cloze-stat-val highlight">${score} <small style="font-size:0.65em;color:var(--muted)">/ 10分</small></span>
            </div>
          `;
      }

      const dashboardHtml = `
        <div class="cloze-dashboard">
          ${bannerHtml}
          <div class="cloze-dashboard-stats">${statsHtml}</div>
          <div class="cloze-progress-track">
            <div class="cloze-progress-fill" style="width: ${progressPct}%"></div>
          </div>
          <div class="cloze-mini-nav">
            ${navChipsHtml}
          </div>
        </div>
      `;

      // 3. Question Cards
      let cardsHtml = '';
      questions.forEach(q => {
        const qid = q.qid;
        const currentChoice = clozeSelections[qid] || '';
        const isAnswered = Boolean(currentChoice);
        const isCorrect = isAnswered && (currentChoice === q.answer);

        let isGraded = false;
        if (isReview) {
          isGraded = true;
        } else if (isMockExam) {
          isGraded = isSubmitted;
        } else {
          isGraded = isAnswered;
        }

        const isActive = activeBlankQid === qid;

        let optionsHtml = '';
        ['A', 'B', 'C', 'D'].forEach(opt => {
          const optText = q.options ? q.options[opt] : '';
          const optCn = q.options_cn ? q.options_cn[opt] : '';
          const isPicked = (currentChoice === opt);
          const isTarget = (opt === q.answer);

          let optCls = '';
          let flagHtml = '';

          if (isGraded) {
            if (isTarget) {
              optCls = 'correct';
              flagHtml = `<span class="cloze-opt-flag correct">${isPicked ? '✔ 正确答案' : '✔ 正解'}</span>`;
            } else if (isPicked) {
              optCls = 'wrong';
              flagHtml = '<span class="cloze-opt-flag wrong">✖ 选错项</span>';
            } else {
              optCls = isReview ? 'review-opt' : 'dimmed';
            }
          } else if (isPicked) {
            optCls = 'selected';
          }

          optionsHtml += `
            <button class="cloze-opt-btn ${optCls}" data-qid="${qid}" data-opt="${opt}">
              <span class="cloze-opt-letter">${opt}</span>
              <div class="cloze-opt-content">
                <span class="cloze-opt-en">
                  <span class="cloze-word-token exam-word-token" data-word="${optText}" data-def="${optCn || ''}" data-qid="${qid}" data-opt="${opt}" title="点击或双击：查看释义与生词收藏">${optText}</span>
                  <span class="cloze-opt-lookup-btn" data-word="${optText}" data-def="${optCn || ''}" data-qid="${qid}" data-opt="${opt}" title="点击查词释义与收藏生词">📖 释义</span>
                </span>
                ${(showTrans || isGraded) && optCn ? `<span class="cloze-opt-cn">${optCn}</span>` : ''}
              </div>
              ${flagHtml}
            </button>
          `;
        });

        // Header status badge & retry/clear button
        let statusBadge = '';
        let retryBtn = '';
        if (isGraded) {
          if (isReview) {
            statusBadge = `<span class="cloze-status-badge review-key">🎯 正解: [${q.answer}]</span>`;
          } else if (isCorrect) {
            statusBadge = '<span class="cloze-status-badge correct">✔ 回答正确 (+0.5分)</span>';
            if (!isMockExam) {
              retryBtn = `<button class="cloze-retry-btn" data-qid="${qid}" title="清除作答，重新选择">↺ 重做</button>`;
            }
          } else {
            statusBadge = `<span class="cloze-status-badge wrong">✖ 错选 [${currentChoice || '未答'}] · 正解: [${q.answer}]</span>`;
            if (!isMockExam) {
              retryBtn = `<button class="cloze-retry-btn" data-qid="${qid}" title="清除作答，重新选择">↺ 重做</button>`;
            }
          }
        } else if (isAnswered) {
          statusBadge = `<span class="cloze-status-badge picked">已选 [${currentChoice}]</span>`;
          retryBtn = `<button class="cloze-clear-btn" data-qid="${qid}" title="清除本题选择">✕ 清除</button>`;
        } else {
          statusBadge = '<span class="cloze-status-badge unpicked">未作答 · 0.5分</span>';
        }

        // Analysis box: revealed when graded
        let analysisHtml = '';
        if (isGraded && (q.analysis || q.context_clue)) {
          const rightWord = q.options ? q.options[q.answer] : '';
          analysisHtml = `
            <div class="cloze-analysis-box">
              <div class="cloze-analysis-header">
                <span class="badge" style="background:#0284c7;color:#fff">${q.category || '词义辨析'}</span>
                <strong>【考点精析 · 正确答案 [${q.answer}] ${rightWord}】</strong>
              </div>
              <div class="cloze-analysis-content" style="color:var(--ink);font-size:0.9em;line-height:1.6;margin-top:6px">
                ${q.analysis}
              </div>
              ${q.context_clue ? `
                <div style="color:#0369a1;background:rgba(2,132,199,0.08);padding:6px 10px;border-radius:6px;margin-top:8px;font-size:0.86em;line-height:1.5">
                  🎯 <strong>语境线索：</strong>${q.context_clue}
                </div>
              ` : ''}
            </div>
          `;
        }

        cardsHtml += `
          <div class="cloze-card ${isActive ? 'active-focus' : ''}" id="cloze-card-${qid}" data-qid="${qid}">
            <div class="cloze-card-header">
              <div style="display:flex;align-items:center;gap:8px">
                <span>第 <strong style="color:var(--accent)">${qid}</strong> 题</span>
                ${q.category ? `<span class="badge" style="font-size:0.75em;background:var(--card-bg);border:1px solid var(--border);color:var(--muted)">${q.category}</span>` : ''}
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                ${statusBadge}
                ${retryBtn}
              </div>
            </div>
            <div class="cloze-options-grid">
              ${optionsHtml}
            </div>
            ${analysisHtml}
          </div>
        `;
      });

      // Bottom status hint
      let bottomHint = '';
      if (isReview) {
        bottomHint = `<span style="font-size:0.88em;color:var(--muted)">20 题精读解析与中文对照已全部展示</span>`;
      } else if (isMockExam && !isSubmitted) {
        bottomHint = `<span style="font-size:0.85em;color:var(--muted)">已答 ${answeredCount}/20 题 · 选完后点击右侧按钮统一交卷批改</span>`;
      } else if (isMockExam && isSubmitted) {
        bottomHint = `<span style="font-size:0.9em;font-weight:700;color:var(--success)">🎉 模考批改完成！最终得分: ${score} / 10 分 (答对 ${correctCount} / 答错 ${wrongCount})</span>`;
      } else if (answeredCount === totalQuestions) {
        bottomHint = `<span style="font-size:0.9em;font-weight:700;color:var(--success)">🎉 20 题已全部完成！最终得分: ${score} / 10 分</span>`;
      } else {
        bottomHint = `<span style="font-size:0.85em;color:var(--muted)">已答 ${answeredCount}/20 题 · 点击任意选项即可自动批改</span>`;
      }

      container.innerHTML = `
        <div class="cloze-workspace">
          <div class="cloze-card-header" style="border-bottom:1px solid var(--border);padding-bottom:10px;flex-wrap:wrap;gap:10px">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <span style="font-size:1.05em;font-weight:700">🧩 完形填空工作台 (1-20 题)</span>
              ${!isReview ? `
                <div class="cloze-submode-segmented">
                  <button class="cloze-submode-btn ${practiceStyle === 'instant' ? 'active' : ''}" data-style="instant" title="做一道批改一道，即时查看正误与解析">
                    ⚡ 逐题即时批改
                  </button>
                  <button class="cloze-submode-btn ${practiceStyle === 'submit' ? 'active' : ''}" data-style="submit" title="全篇20题作答完毕后统一交卷批改">
                    📝 全篇统一交卷
                  </button>
                </div>
              ` : `
                <span class="badge" style="background:#7c3aed;color:#fff;font-size:0.8em;padding:2px 8px;border-radius:4px">复盘精读模式</span>
              `}
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-left:auto">
              <button class="toolbar-btn ${showTrans ? 'active' : ''}" id="btnToggleClozeTransRight" style="font-size:0.8em;padding:2px 8px" title="切换全文与选项中文对照">🌐 中文对照</button>
              <span class="badge" style="background:#0284c7;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8em">每题 0.5 分 · 满分 10 分</span>
            </div>
          </div>

          ${dashboardHtml}

          <!-- Question Cards -->
          <div class="cloze-cards-list">
            ${cardsHtml}
          </div>

          <!-- Bottom Actions -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid var(--border);flex-wrap:wrap;gap:10px">
            <div>${bottomHint}</div>
            <div style="display:flex;align-items:center;gap:8px">
              ${isMockExam && !isSubmitted ? `
                <button id="btnSubmitClozeBottom" class="btn" style="background:var(--accent);color:#fff;border-color:var(--accent-dark);font-weight:700;font-size:0.85em;padding:6px 14px;box-shadow:0 2px 4px rgba(37,99,235,0.25)">
                  🚀 提交全篇批改 (10分)
                </button>
              ` : ''}
              <button id="btnResetCloze" class="btn" style="font-size:0.85em;color:var(--muted)">
                ${isMockExam && isSubmitted ? '↺ 清空并重新模考' : '清空所有作答 (重新练习)'}
              </button>
            </div>
          </div>
        </div>
      `;

      // Restore scroll top so page does not jump
      container.scrollTop = prevScrollTop;

      // Bind events
      this.bindEvents(data, year, mode);
    },

    bindEvents: function(data, year, mode) {
      const isReview = (mode === 'review');
      const practiceStyle = this.getPracticeStyle();
      const isSubmitted = this.isSubmittedForYear(year);
      const isMockExam = !isReview && (practiceStyle === 'submit');

      // 1. Word token / lookup badge click & double click
      document.querySelectorAll('.cloze-word-token, .cloze-opt-lookup-btn').forEach(el => {
        const handleLookup = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const word = el.getAttribute('data-word');
          const def = el.getAttribute('data-def') || '';
          const qid = Number(el.getAttribute('data-qid'));
          const opt = el.getAttribute('data-opt');
          this.lookupWord(word, def, qid, opt, e.clientX, e.clientY, data, year, mode);
        };

        el.addEventListener('click', handleLookup);
        el.addEventListener('dblclick', handleLookup);
      });

      // 2. Option click & double click
      document.querySelectorAll('.cloze-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (e.target.closest('.cloze-word-token, .cloze-opt-lookup-btn')) {
            return;
          }
          const qid = Number(btn.getAttribute('data-qid'));
          const opt = btn.getAttribute('data-opt');

          // If in mock exam mode and already submitted, option click focuses without altering answers
          if (isMockExam && isSubmitted) {
            activeBlankQid = qid;
            this.highlightBlank(qid, data, year, false);
            return;
          }

          clozeSelections[qid] = opt;
          localStorage.setItem(`kaoyan_cloze_${year}`, JSON.stringify(clozeSelections));
          activeBlankQid = qid;
          this.renderLeftPanel(data, year, mode);
          this.renderRightPanel(data, year, mode);
          this.highlightBlank(qid, data, year, false);
        });

        btn.addEventListener('dblclick', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const qid = Number(btn.getAttribute('data-qid'));
          const opt = btn.getAttribute('data-opt');
          const qObj = (data.questions || []).find(q => q.qid === qid);
          const word = qObj?.options?.[opt];
          const def = qObj?.options_cn?.[opt] || '';
          if (word) {
            this.lookupWord(word, def, qid, opt, e.clientX, e.clientY, data, year, mode);
          }
        });
      });

      // 2. Clear single question button (in submit mode pre-submission)
      document.querySelectorAll('.cloze-clear-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const qid = Number(btn.getAttribute('data-qid'));
          delete clozeSelections[qid];
          localStorage.setItem(`kaoyan_cloze_${year}`, JSON.stringify(clozeSelections));
          activeBlankQid = qid;
          this.renderLeftPanel(data, year, mode);
          this.renderRightPanel(data, year, mode);
          this.highlightBlank(qid, data, year, false);
        });
      });

      // 3. Retry single question button (in instant mode)
      document.querySelectorAll('.cloze-retry-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const qid = Number(btn.getAttribute('data-qid'));
          delete clozeSelections[qid];
          localStorage.setItem(`kaoyan_cloze_${year}`, JSON.stringify(clozeSelections));
          activeBlankQid = qid;
          this.renderLeftPanel(data, year, mode);
          this.renderRightPanel(data, year, mode);
          this.highlightBlank(qid, data, year, false);
        });
      });

      // 4. Mini navigator chips
      document.querySelectorAll('.cloze-nav-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const qid = Number(chip.getAttribute('data-qid'));
          activeBlankQid = qid;
          this.highlightBlank(qid, data, year, true);
        });
      });

      // 5. Submit all answers handler
      const handleSubmit = () => {
        const questions = data.questions || [];
        const total = questions.length || 20;
        let answered = 0;
        questions.forEach(q => {
          if (clozeSelections[q.qid]) answered++;
        });

        if (answered < total) {
          const unpicked = total - answered;
          if (!confirm(`您还有 ${unpicked} 道题未作答，确定现在提前提交批改吗？\n（未作答题目将按 0 分计）`)) {
            return;
          }
        }

        this.setSubmittedForYear(year, true);
        this.renderLeftPanel(data, year, mode);
        this.renderRightPanel(data, year, mode);
        const container = document.getElementById('workspaceContent');
        if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
      };

      const submitBtnTop = document.getElementById('btnSubmitClozeTop');
      if (submitBtnTop) submitBtnTop.addEventListener('click', handleSubmit);

      const submitBtnBottom = document.getElementById('btnSubmitClozeBottom');
      if (submitBtnBottom) submitBtnBottom.addEventListener('click', handleSubmit);

      // 6. Re-exam button
      const reExamBtn = document.getElementById('btnReExamCloze');
      if (reExamBtn) {
        reExamBtn.addEventListener('click', () => {
          if (confirm('确定要重新开始全篇模考吗？将清空本篇完形填空的作答与批改结果。')) {
            clozeSelections = {};
            localStorage.removeItem(`kaoyan_cloze_${year}`);
            this.setSubmittedForYear(year, false);
            activeBlankQid = 1;
            this.renderLeftPanel(data, year, mode);
            this.renderRightPanel(data, year, mode);
            this.highlightBlank(1, data, year, true);
          }
        });
      }

      // 7. Reset all answers
      const resetBtn = document.getElementById('btnResetCloze');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          const msg = (isMockExam && isSubmitted)
            ? '确定要清空作答并重新模考吗？'
            : '确定要清空本年份完形填空的作答记录，重新开始练习吗？';
          if (confirm(msg)) {
            clozeSelections = {};
            localStorage.removeItem(`kaoyan_cloze_${year}`);
            this.setSubmittedForYear(year, false);
            activeBlankQid = 1;
            this.renderLeftPanel(data, year, mode);
            this.renderRightPanel(data, year, mode);
            this.highlightBlank(1, data, year, true);
          }
        });
      }

      // 8. Toggle practice style buttons
      document.querySelectorAll('.cloze-submode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const style = btn.getAttribute('data-style');
          if (style && style !== this.getPracticeStyle()) {
            this.setPracticeStyle(style);
            this.renderLeftPanel(data, year, mode);
            this.renderRightPanel(data, year, mode);
          }
        });
      });

      // 9. Toggle translation button from right panel header
      const toggleBtnRight = document.getElementById('btnToggleClozeTransRight');
      if (toggleBtnRight) {
        toggleBtnRight.addEventListener('click', () => {
          this.setShowTrans(!this.getShowTrans());
          this.renderLeftPanel(data, year, mode);
          this.renderRightPanel(data, year, mode);
        });
      }
    },

    highlightBlank: function(qid, data, year, scrollBoth = true) {
      document.querySelectorAll('.cloze-blank').forEach(el => el.classList.remove('active'));
      const targetBlank = document.getElementById(`cloze-blank-${qid}`);
      if (targetBlank) {
        targetBlank.classList.add('active');
        if (scrollBoth) {
          targetBlank.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      document.querySelectorAll('.cloze-card').forEach(el => el.classList.remove('active-focus'));
      const targetCard = document.getElementById(`cloze-card-${qid}`);
      if (targetCard) {
        targetCard.classList.add('active-focus');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      document.querySelectorAll('.cloze-nav-chip').forEach(el => {
        el.classList.toggle('active', Number(el.getAttribute('data-qid')) === qid);
      });
    }
  };
})();
