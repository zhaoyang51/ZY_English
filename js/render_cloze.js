/**
 * Cloze Renderer: Section I Use of English (完形填空 / 英语知识运用)
 * Interactive In-text Blanks, Real-time Word Display, Auto-Scoring & Context Clue Analysis
 */
(function() {
  let clozeSelections = {}; // { 1: 'D', 2: 'C', ... }
  let activeBlankQid = 1;

  window.ClozeRenderer = {
    render: function(clozeData, year, mode) {
      if (!clozeData) return;
      this.initUserState(clozeData, year);
      this.renderLeftPanel(clozeData, year);
      this.renderRightPanel(clozeData, year, mode);
    },

    initUserState: function(data, year) {
      const saved = localStorage.getItem(`kaoyan_cloze_${year}`);
      if (saved) {
        try { clozeSelections = JSON.parse(saved); } catch(e) { clozeSelections = {}; }
      } else {
        clozeSelections = {};
      }
      activeBlankQid = 1;
    },

    renderLeftPanel: function(data, year) {
      const examPaper = document.getElementById('examPaper');
      if (!examPaper) return;

      const fs = window.ReaderModule?.settings?.fontSize || 17.5;
      const lh = window.ReaderModule?.settings?.lineHeight || 1.85;
      const isSubmitted = localStorage.getItem(`kaoyan_cloze_submitted_${year}`) === 'true';

      let parasHtml = '';
      (data.paragraphs || []).forEach((p, idx) => {
        let text = p.text || p;

        // Replace __1__ or [1] or [ 1 ] with interactive cloze-blank span
        // Regex matches __(\d+)__ or \[(\d+)\] or \b_(\d+)_\b
        text = text.replace(/_{1,4}(\d+)_{1,4}|\[\s*(\d+)\s*\]/g, (match, p1, p2) => {
          const qid = Number(p1 || p2);
          const chosenOpt = clozeSelections[qid];
          const qObj = (data.questions || []).find(q => q.qid === qid);
          const word = (chosenOpt && qObj?.options) ? qObj.options[chosenOpt] : '_______';
          const isFilled = !!chosenOpt;
          const isActive = activeBlankQid === qid;
          
          let stateCls = '';
          if (isSubmitted && qObj) {
            stateCls = (chosenOpt === qObj.answer) ? 'filled correct' : (isFilled ? 'filled wrong' : '');
          } else if (isFilled) {
            stateCls = 'filled';
          }
          if (isActive) stateCls += ' active';

          return `<span class="cloze-blank ${stateCls}" id="cloze-blank-${qid}" data-qid="${qid}" title="第 ${qid} 空，点击跳转做题"><span class="blank-num">${qid}</span> <span class="blank-word">${word}</span></span>`;
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

      // Bind blank clicks
      examPaper.querySelectorAll('.cloze-blank').forEach(el => {
        el.addEventListener('click', () => {
          const qid = Number(el.getAttribute('data-qid'));
          activeBlankQid = qid;
          this.highlightBlank(qid, data, year);
        });
      });
    },

    renderRightPanel: function(data, year, mode) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;

      const isSubmitted = localStorage.getItem(`kaoyan_cloze_submitted_${year}`) === 'true' || mode === 'review';
      let cardsHtml = '';
      let correctCount = 0;

      (data.questions || []).forEach(q => {
        const qid = q.qid;
        const currentChoice = clozeSelections[qid] || '';
        const isCorrect = q.answer ? (currentChoice === q.answer) : null;
        if (isCorrect) correctCount++;
        const isActive = activeBlankQid === qid;

        let optionsHtml = '';
        ['A', 'B', 'C', 'D'].forEach(opt => {
          const optText = q.options ? q.options[opt] : '';
          const isSelected = currentChoice === opt;
          let optCls = isSelected ? 'selected' : '';
          if (isSubmitted) {
            if (opt === q.answer) optCls = 'correct';
            else if (isSelected && !isCorrect) optCls = 'wrong';
          }

          optionsHtml += `
            <button class="cloze-opt-btn ${optCls}" data-qid="${qid}" data-opt="${opt}">
              <span class="cloze-opt-letter">${opt}</span>
              <span style="flex:1">${optText}</span>
            </button>
          `;
        });

        // Analysis box
        let analysisHtml = '';
        if (isSubmitted && q.analysis) {
          analysisHtml = `
            <div style="background:var(--card-bg);border-radius:6px;padding:10px;margin-top:10px;font-size:0.86em;line-height:1.5">
              <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px">
                <span class="badge" style="background:var(--accent);color:#fff">${q.category || '词义辨析'}</span>
                <strong>【正确答案：${q.answer}】</strong>
              </div>
              <div style="color:var(--ink)">${q.analysis}</div>
              ${q.context_clue ? `<div style="color:var(--accent);margin-top:4px">🎯 <strong>语境线索：</strong>${q.context_clue}</div>` : ''}
            </div>
          `;
        }

        cardsHtml += `
          <div class="cloze-card ${isActive ? 'active-focus' : ''}" id="cloze-card-${qid}" data-qid="${qid}">
            <div class="cloze-card-header">
              <span>第 <strong style="color:var(--accent)">${qid}</strong> 题 ${q.category ? `(${q.category})` : ''}</span>
              ${isSubmitted ? `
                <span class="badge" style="background:${isCorrect ? 'var(--success)' : 'var(--danger)'};color:#fff">
                  ${isCorrect ? '✔ 正确 +0.5分' : '✖ 错误 正解: ' + q.answer}
                </span>
              ` : `
                <span style="font-size:0.82em;color:var(--muted)">0.5 分</span>
              `}
            </div>
            <div class="cloze-options-grid">
              ${optionsHtml}
            </div>
            ${analysisHtml}
          </div>
        `;
      });

      // Score report if submitted
      let reportHtml = '';
      if (isSubmitted) {
        const score = (correctCount * 0.5).toFixed(1);
        reportHtml = `
          <div style="background:var(--surface);border:2px solid var(--accent);border-radius:10px;padding:14px;margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <strong style="font-size:1.05em">📊 完形填空答题得分：</strong>
              <span style="font-size:1.3em;font-weight:800;color:${score >= 6 ? 'var(--success)' : 'var(--danger)'}">
                ${score} / 10 分 (答对 ${correctCount} / 20 题)
              </span>
            </div>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="cloze-workspace">
          <div class="cloze-card-header" style="border-bottom:1px solid var(--border);padding-bottom:10px">
            <span style="font-size:1.05em;font-weight:700">🧩 完形填空答题工作台 (1-20 题)</span>
            <span class="badge" style="background:#0284c7;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8em">满分 10 分</span>
          </div>

          ${reportHtml}

          <!-- Question Cards -->
          <div class="cloze-cards-list">
            ${cardsHtml}
          </div>

          <!-- Bottom Actions -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
            <button id="btnResetCloze" class="btn" style="font-size:0.85em">重置清空</button>
            <button id="btnSubmitCloze" class="btn" style="font-size:0.85em;background:var(--accent);color:#fff;border-color:var(--accent-dark);font-weight:700">
              ${isSubmitted ? '重新作答' : '提交交卷并核对 (10分)'}
            </button>
          </div>
        </div>
      `;

      // Bind events
      this.bindEvents(data, year);
    },

    bindEvents: function(data, year) {
      // 1. Option click
      document.querySelectorAll('.cloze-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = Number(btn.getAttribute('data-qid'));
          const opt = btn.getAttribute('data-opt');
          clozeSelections[qid] = opt;
          localStorage.setItem(`kaoyan_cloze_${year}`, JSON.stringify(clozeSelections));
          activeBlankQid = qid;
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year);
        });
      });

      // 2. Submit & Reset
      const submitBtn = document.getElementById('btnSubmitCloze');
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          const isSubmitted = localStorage.getItem(`kaoyan_cloze_submitted_${year}`) === 'true';
          if (isSubmitted) {
            localStorage.removeItem(`kaoyan_cloze_submitted_${year}`);
          } else {
            localStorage.setItem(`kaoyan_cloze_submitted_${year}`, 'true');
          }
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year);
        });
      }

      const resetBtn = document.getElementById('btnResetCloze');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm('确定要清空完形填空的作答记录吗？')) {
            clozeSelections = {};
            localStorage.removeItem(`kaoyan_cloze_${year}`);
            localStorage.removeItem(`kaoyan_cloze_submitted_${year}`);
            this.renderLeftPanel(data, year);
            this.renderRightPanel(data, year);
          }
        });
      }
    },

    highlightBlank: function(qid, data, year) {
      document.querySelectorAll('.cloze-blank').forEach(el => el.classList.remove('active'));
      const targetBlank = document.getElementById(`cloze-blank-${qid}`);
      if (targetBlank) {
        targetBlank.classList.add('active');
        targetBlank.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      document.querySelectorAll('.cloze-card').forEach(el => el.classList.remove('active-focus'));
      const targetCard = document.getElementById(`cloze-card-${qid}`);
      if (targetCard) {
        targetCard.classList.add('active-focus');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
})();
