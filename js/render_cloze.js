/**
 * Cloze Renderer: Section I Use of English (完形填空 / 英语知识运用)
 * Interactive In-text Blanks, Instant Grading upon Selection, Real-time Dashboard & Error Analysis
 */
(function() {
  let clozeSelections = {}; // { 1: 'D', 2: 'C', ... }
  let activeBlankQid = 1;

  window.ClozeRenderer = {
    currentMode: 'practice',

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

    renderLeftPanel: function(data, year, mode) {
      const examPaper = document.getElementById('examPaper');
      if (!examPaper) return;

      const fs = window.ReaderModule?.settings?.fontSize || 17.5;
      const lh = window.ReaderModule?.settings?.lineHeight || 1.85;
      const isReview = (mode === 'review');

      let parasHtml = '';
      (data.paragraphs || []).forEach((p, idx) => {
        let text = p.text || p;

        // Replace __1__ or [1] or [ 1 ] with interactive cloze-blank span
        text = text.replace(/_{1,4}(\d+)_{1,4}|\[\s*(\d+)\s*\]/g, (match, p1, p2) => {
          const qid = Number(p1 || p2);
          const chosenOpt = clozeSelections[qid];
          const qObj = (data.questions || []).find(q => q.qid === qid);
          const isAnswered = Boolean(chosenOpt);
          const isCorrect = qObj && (chosenOpt === qObj.answer);
          const isActive = activeBlankQid === qid;

          let stateCls = '';
          let wordHtml = '';

          if (isReview) {
            stateCls = 'filled correct';
            const rightWord = qObj?.options?.[qObj.answer] || '_______';
            wordHtml = `<span class="blank-word">${rightWord}</span>`;
          } else if (isAnswered) {
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
          </div>
        `;
      });

      examPaper.innerHTML = `
        <div class="reader-toolbar">
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">题型:</span>
            <span class="badge" style="background:#0284c7;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.82em">Section I 完形填空 (10分)</span>
          </div>
          <div class="toolbar-group" style="margin-left:auto">
            <span style="font-size:0.82em;color:var(--muted)">20 题 · 每题 0.5 分 · 即做即改</span>
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

      // Bind blank clicks
      examPaper.querySelectorAll('.cloze-blank').forEach(el => {
        el.addEventListener('click', () => {
          const qid = Number(el.getAttribute('data-qid'));
          activeBlankQid = qid;
          this.highlightBlank(qid, data, year, true);
        });
      });
    },

    renderRightPanel: function(data, year, mode) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;

      const prevScrollTop = container.scrollTop;
      const isReview = (mode === 'review');
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
        navChipsHtml += `<button class="cloze-nav-chip ${chipCls}" data-qid="${qid}" title="第 ${qid} 题 (${chosen ? (chosen === q.answer ? '答对' : '答错') : '未答'})">${chipText}</button>`;
      });

      // 2. Real-time Dashboard
      const dashboardHtml = `
        <div class="cloze-dashboard">
          <div class="cloze-dashboard-stats">
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
          </div>
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
        const isGraded = isAnswered || isReview;
        const isActive = activeBlankQid === qid;

        let optionsHtml = '';
        ['A', 'B', 'C', 'D'].forEach(opt => {
          const optText = q.options ? q.options[opt] : '';
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
              optCls = 'dimmed';
            }
          } else if (isPicked) {
            optCls = 'selected';
          }

          optionsHtml += `
            <button class="cloze-opt-btn ${optCls}" data-qid="${qid}" data-opt="${opt}">
              <span class="cloze-opt-letter">${opt}</span>
              <span style="flex:1;text-align:left">${optText}</span>
              ${flagHtml}
            </button>
          `;
        });

        // Header status badge & retry button
        let statusBadge = '';
        let retryBtn = '';
        if (isGraded) {
          if (isReview) {
            statusBadge = `<span class="cloze-status-badge correct">正解 [${q.answer}]</span>`;
          } else if (isCorrect) {
            statusBadge = '<span class="cloze-status-badge correct">✔ 回答正确 (+0.5分)</span>';
            retryBtn = `<button class="cloze-retry-btn" data-qid="${qid}" title="清除作答，重新选择">↺ 重做</button>`;
          } else {
            statusBadge = `<span class="cloze-status-badge wrong">✖ 回答错误 (正解: [${q.answer}])</span>`;
            retryBtn = `<button class="cloze-retry-btn" data-qid="${qid}" title="清除作答，重新选择">↺ 重做</button>`;
          }
        } else {
          statusBadge = '<span class="cloze-status-badge unpicked">未作答 · 0.5分</span>';
        }

        // Analysis box: revealed immediately when graded
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
      if (answeredCount === totalQuestions) {
        bottomHint = `<span style="font-size:0.9em;font-weight:700;color:var(--success)">🎉 20 题已全部完成！最终得分: ${score} / 10 分</span>`;
      } else {
        bottomHint = `<span style="font-size:0.85em;color:var(--muted)">已答 ${answeredCount}/20 题 · 点击任意选项即可自动批改</span>`;
      }

      container.innerHTML = `
        <div class="cloze-workspace">
          <div class="cloze-card-header" style="border-bottom:1px solid var(--border);padding-bottom:10px">
            <span style="font-size:1.05em;font-weight:700">🧩 完形填空即时批改工作台 (1-20 题)</span>
            <span class="badge" style="background:#0284c7;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8em">每题 0.5 分 · 满分 10 分</span>
          </div>

          ${dashboardHtml}

          <!-- Question Cards -->
          <div class="cloze-cards-list">
            ${cardsHtml}
          </div>

          <!-- Bottom Actions -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
            <div>${bottomHint}</div>
            <button id="btnResetCloze" class="btn" style="font-size:0.85em;color:var(--muted)">清空所有作答 (重新练习)</button>
          </div>
        </div>
      `;

      // Restore scroll top so page does not jump
      container.scrollTop = prevScrollTop;

      // Bind events
      this.bindEvents(data, year, mode);
    },

    bindEvents: function(data, year, mode) {
      // 1. Option click -> Immediate Grading!
      document.querySelectorAll('.cloze-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = Number(btn.getAttribute('data-qid'));
          const opt = btn.getAttribute('data-opt');
          clozeSelections[qid] = opt;
          localStorage.setItem(`kaoyan_cloze_${year}`, JSON.stringify(clozeSelections));
          activeBlankQid = qid;
          this.renderLeftPanel(data, year, mode);
          this.renderRightPanel(data, year, mode);
          this.highlightBlank(qid, data, year, false);
        });
      });

      // 2. Retry single question button
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

      // 3. Mini navigator chips
      document.querySelectorAll('.cloze-nav-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const qid = Number(chip.getAttribute('data-qid'));
          activeBlankQid = qid;
          this.highlightBlank(qid, data, year, true);
        });
      });

      // 4. Reset all answers
      const resetBtn = document.getElementById('btnResetCloze');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm('确定要清空本年份完形填空的作答记录，重新开始练习吗？')) {
            clozeSelections = {};
            localStorage.removeItem(`kaoyan_cloze_${year}`);
            activeBlankQid = 1;
            this.renderLeftPanel(data, year, mode);
            this.renderRightPanel(data, year, mode);
            this.highlightBlank(1, data, year, true);
          }
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
