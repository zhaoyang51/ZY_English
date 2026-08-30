/**
 * Reader Component: Interactive Exam Paper, Locator Pulse & Dual-Panel Font Adjustments
 */
(function() {
  const LOGIC_CONNECTORS = {
    turn: [
      'however', 'nevertheless', 'nonetheless', 'whereas', 'although', 'though', 'even though', 'even if',
      'on the other hand', 'on the contrary', 'in contrast', 'instead of', 'despite', 'in spite of'
    ],
    cause: [
      'because', 'since', 'therefore', 'thus', 'hence', 'consequently', 'as a result', 'result in', 'due to', 'owing to'
    ],
    summary: [
      'moreover', 'furthermore', 'in addition', 'besides', 'finally', 'in conclusion', 'in summary', 'in short', 'indeed'
    ]
  };

  window.ReaderModule = {
    settings: {
      fontSize: 17.5,
      lineHeight: 1.85,
      workspaceFontSize: 16,
      workspaceLineHeight: 1.75,
      showTrans: false,
      highlightLogic: false
    },

    init() {
      const s = window.StorageModule.loadSettings();
      if (s) Object.assign(this.settings, s);
      this.applySettings();
      this.bindWorkspaceToolbarEvents();
    },

    applySettings() {
      document.documentElement.style.setProperty('--reader-font-size', `${this.settings.fontSize}px`);
      document.documentElement.style.setProperty('--reader-line-height', `${this.settings.lineHeight}`);
      document.documentElement.style.setProperty('--workspace-font-size', `${this.settings.workspaceFontSize}px`);
      document.documentElement.style.setProperty('--workspace-line-height', `${this.settings.workspaceLineHeight}`);
      window.StorageModule.saveSettings(this.settings);
      this.updateToolbarActiveStates();
    },

    updateToolbarActiveStates() {
      // Left Toolbar Line Height states
      const btnTight = document.getElementById('btnLhTight');
      const btnNormal = document.getElementById('btnLhNormal');
      const btnLoose = document.getElementById('btnLhLoose');
      if (btnTight && btnNormal && btnLoose) {
        btnTight.classList.toggle('active', this.settings.lineHeight === 1.6);
        btnNormal.classList.toggle('active', this.settings.lineHeight === 1.85);
        btnLoose.classList.toggle('active', this.settings.lineHeight === 2.2);
      }

      // Right Workspace Toolbar Line Height states
      const btnWsTight = document.getElementById('btnWsLhTight');
      const btnWsNormal = document.getElementById('btnWsLhNormal');
      const btnWsLoose = document.getElementById('btnWsLhLoose');
      if (btnWsTight && btnWsNormal && btnWsLoose) {
        btnWsTight.classList.toggle('active', this.settings.workspaceLineHeight === 1.5);
        btnWsNormal.classList.toggle('active', this.settings.workspaceLineHeight === 1.75);
        btnWsLoose.classList.toggle('active', this.settings.workspaceLineHeight === 2.1);
      }
    },

    bindWorkspaceToolbarEvents() {
      const btnWsDec = document.getElementById('btnWsFontDec');
      const btnWsInc = document.getElementById('btnWsFontInc');
      const btnWsTight = document.getElementById('btnWsLhTight');
      const btnWsNormal = document.getElementById('btnWsLhNormal');
      const btnWsLoose = document.getElementById('btnWsLhLoose');

      if (btnWsDec && !btnWsDec.hasAttribute('data-bound')) {
        btnWsDec.setAttribute('data-bound', 'true');
        btnWsDec.onclick = () => {
          if (this.settings.workspaceFontSize > 13) {
            this.settings.workspaceFontSize -= 1;
            this.applySettings();
          }
        };
      }

      if (btnWsInc && !btnWsInc.hasAttribute('data-bound')) {
        btnWsInc.setAttribute('data-bound', 'true');
        btnWsInc.onclick = () => {
          if (this.settings.workspaceFontSize < 26) {
            this.settings.workspaceFontSize += 1;
            this.applySettings();
          }
        };
      }

      if (btnWsTight && !btnWsTight.hasAttribute('data-bound')) {
        btnWsTight.setAttribute('data-bound', 'true');
        btnWsTight.onclick = () => {
          this.settings.workspaceLineHeight = 1.5;
          this.applySettings();
        };
      }

      if (btnWsNormal && !btnWsNormal.hasAttribute('data-bound')) {
        btnWsNormal.setAttribute('data-bound', 'true');
        btnWsNormal.onclick = () => {
          this.settings.workspaceLineHeight = 1.75;
          this.applySettings();
        };
      }

      if (btnWsLoose && !btnWsLoose.hasAttribute('data-bound')) {
        btnWsLoose.setAttribute('data-bound', 'true');
        btnWsLoose.onclick = () => {
          this.settings.workspaceLineHeight = 2.1;
          this.applySettings();
        };
      }
    },

    renderExamPaper(textData, containerId) {
      const container = document.getElementById(containerId || 'examPaper');
      if (!container || !textData) return;

      this.init();

      let html = `
        <div class="reader-toolbar" id="readerToolbar">
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">字号:</span>
            <button class="toolbar-btn" id="btnFontDec" title="缩小字号">A-</button>
            <button class="toolbar-btn" id="btnFontInc" title="放大字号">A+</button>
          </div>
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">行距:</span>
            <button class="toolbar-btn ${this.settings.lineHeight === 1.6 ? 'active' : ''}" data-lh="1.6" id="btnLhTight">紧凑</button>
            <button class="toolbar-btn ${this.settings.lineHeight === 1.85 ? 'active' : ''}" data-lh="1.85" id="btnLhNormal">舒适</button>
            <button class="toolbar-btn ${this.settings.lineHeight === 2.2 ? 'active' : ''}" data-lh="2.2" id="btnLhLoose">宽松</button>
          </div>
          <div class="toolbar-group">
            <button class="toolbar-btn ${this.settings.showTrans ? 'active' : ''}" id="btnToggleTrans">🌐 中文对照</button>
            <button class="toolbar-btn ${this.settings.highlightLogic ? 'active' : ''}" id="btnToggleLogic">💡 逻辑连接词</button>
          </div>
        </div>

        <h2 style="font-size:1.35em;font-weight:800;margin-bottom:4px">${textData.year} 年全国硕士研究生招生考试英语（二）阅读理解</h2>
        <div style="color:var(--muted);font-size:0.95em;margin-bottom:18px">Text ${textData.text_id} (${textData.q_range} 题) ｜ <span style="font-size:0.9em;color:var(--mode-color)">💡 点击句子查看语法拆解，双击单词即查释义</span></div>
        <div class="exam-article-section">
      `;

      textData.paragraphs.forEach((p) => {
        const pSents = textData.sentences.filter(s => s.pid === p.pid);
        let paraSentsHtml = '';

        pSents.forEach(s => {
          let formattedText = this.formatSentenceText(s.text, p.vocabulary);
          let transHtml = this.settings.showTrans ? `<span class="sent-trans-inline">${s.translation}</span>` : '';
          paraSentsHtml += `<span class="exam-sent" id="sent-${s.sid}" data-sid="${s.sid}" data-pid="${s.pid}" title="点击查看长难句拆解">${formattedText}</span> ${transHtml}`;
        });

        html += `
          <div class="exam-para" id="exam-para-${p.pid}" data-pid="${p.pid}">
            <span class="para-badge">[Para ${p.pid + 1}]</span>
            <span class="para-text">${paraSentsHtml}</span>
          </div>
        `;
      });

      html += `</div><hr style="margin:24px 0;border:none;border-top:1px dashed var(--border)"><div class="exam-questions-section"><h3 style="font-size:1.15em;font-weight:700;margin-bottom:12px">Questions (${textData.q_range})</h3>`;

      textData.questions.forEach(q => {
        html += `
          <div class="exam-question-card" id="exam-q-${q.qid}" data-qid="${q.qid}">
            <div class="q-stem">${q.qid}. ${q.stem}</div>
            <div class="q-options">
              ${q.options.map(opt => `
                <div class="q-opt" data-opt="${opt.key}">
                  <span class="opt-key">[${opt.key}]</span>
                  <span class="opt-text">${opt.text}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;

      this.bindToolbarEvents(textData, containerId);
    },

    formatSentenceText(sentText, paraVocab) {
      let text = sentText;

      if (this.settings.highlightLogic) {
        LOGIC_CONNECTORS.turn.forEach(w => {
          const reg = new RegExp(`\\b(${w})\\b`, 'gi');
          text = text.replace(reg, '<span class="transition-turn">$1</span>');
        });
        LOGIC_CONNECTORS.cause.forEach(w => {
          const reg = new RegExp(`\\b(${w})\\b`, 'gi');
          text = text.replace(reg, '<span class="transition-cause">$1</span>');
        });
        LOGIC_CONNECTORS.summary.forEach(w => {
          const reg = new RegExp(`\\b(${w})\\b`, 'gi');
          text = text.replace(reg, '<span class="transition-summary">$1</span>');
        });
      }

      if (paraVocab && paraVocab.length > 0) {
        paraVocab.forEach(v => {
          const reg = new RegExp(`\\b(${v.word})\\b`, 'gi');
          text = text.replace(reg, '<span class="exam-vocab" data-word="$1" title="点击查词: $1">$1</span>');
        });
      }

      return text;
    },

    bindToolbarEvents(textData, containerId) {
      const decBtn = document.getElementById('btnFontDec');
      const incBtn = document.getElementById('btnFontInc');
      const transBtn = document.getElementById('btnToggleTrans');
      const logicBtn = document.getElementById('btnToggleLogic');

      if (decBtn) {
        decBtn.onclick = () => {
          if (this.settings.fontSize > 14) {
            this.settings.fontSize -= 1;
            this.applySettings();
          }
        };
      }

      if (incBtn) {
        incBtn.onclick = () => {
          if (this.settings.fontSize < 28) {
            this.settings.fontSize += 1;
            this.applySettings();
          }
        };
      }

      document.querySelectorAll('#readerToolbar [data-lh]').forEach(btn => {
        btn.onclick = () => {
          this.settings.lineHeight = Number(btn.getAttribute('data-lh'));
          this.applySettings();
        };
      });

      if (transBtn) {
        transBtn.onclick = () => {
          this.settings.showTrans = !this.settings.showTrans;
          transBtn.classList.toggle('active', this.settings.showTrans);
          this.renderExamPaper(textData, containerId);
        };
      }

      if (logicBtn) {
        logicBtn.onclick = () => {
          this.settings.highlightLogic = !this.settings.highlightLogic;
          logicBtn.classList.toggle('active', this.settings.highlightLogic);
          this.renderExamPaper(textData, containerId);
        };
      }
    },

    highlight(meta) {
      document.querySelectorAll('.exam-para').forEach(el => el.classList.remove('highlight-focus'));
      if (meta && typeof meta.para === 'number') {
        const pEl = document.getElementById(`exam-para-${meta.para}`);
        if (pEl) {
          pEl.classList.add('highlight-focus');
          pEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    },

    highlightLocatorSentence(pid) {
      document.querySelectorAll('.exam-sent').forEach(el => el.classList.remove('locator-pulse'));
      const pEl = document.getElementById(`exam-para-${pid}`);
      if (pEl) {
        const firstSent = pEl.querySelector('.exam-sent');
        if (firstSent) firstSent.classList.add('locator-pulse');
      }
    }
  };
})();
