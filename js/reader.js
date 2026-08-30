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
      if (s) {
        Object.assign(this.settings, s);
      }
      this.settings.fontSize = Number(this.settings.fontSize) || 17.5;
      this.settings.lineHeight = Number(this.settings.lineHeight) || 1.85;
      this.settings.workspaceFontSize = Number(this.settings.workspaceFontSize) || 16;
      this.settings.workspaceLineHeight = Number(this.settings.workspaceLineHeight) || 1.75;

      this.applySettings();
      this.bindWorkspaceToolbarEvents();
    },

    applySettings() {
      const fs = Number(this.settings.fontSize) || 17.5;
      const lh = Number(this.settings.lineHeight) || 1.85;
      const wsFs = Number(this.settings.workspaceFontSize) || 16;
      const wsLh = Number(this.settings.workspaceLineHeight) || 1.75;

      document.documentElement.style.setProperty('--reader-font-size', `${fs}px`);
      document.documentElement.style.setProperty('--reader-line-height', `${lh}`);
      document.documentElement.style.setProperty('--workspace-font-size', `${wsFs}px`);
      document.documentElement.style.setProperty('--workspace-line-height', `${wsLh}`);

      // Also set inline style on #workspaceContent for immediate reaction
      const wsEl = document.getElementById('workspaceContent');
      if (wsEl) {
        wsEl.style.fontSize = `${wsFs}px`;
        wsEl.style.lineHeight = `${wsLh}`;
      }

      const examEl = document.getElementById('examPaper');
      if (examEl) {
        examEl.style.fontSize = `${fs}px`;
        examEl.style.lineHeight = `${lh}`;
      }

      window.StorageModule.saveSettings(this.settings);
      this.updateToolbarActiveStates();
    },

    updateToolbarActiveStates() {
      // 1. Left reader toolbar badges & buttons
      const readerFontBadge = document.getElementById('readerFontBadge');
      if (readerFontBadge) {
        readerFontBadge.textContent = `${this.settings.fontSize}px`;
      }

      const btnTight = document.getElementById('btnLhTight');
      const btnNormal = document.getElementById('btnLhNormal');
      const btnLoose = document.getElementById('btnLhLoose');
      if (btnTight) btnTight.classList.toggle('active', this.settings.lineHeight === 1.6);
      if (btnNormal) btnNormal.classList.toggle('active', this.settings.lineHeight === 1.85);
      if (btnLoose) btnLoose.classList.toggle('active', this.settings.lineHeight === 2.2);

      // 2. Right workspace toolbar badges & buttons
      const wsFontBadge = document.getElementById('wsFontBadge');
      if (wsFontBadge) {
        wsFontBadge.textContent = `${this.settings.workspaceFontSize}px`;
      }

      const btnWsTight = document.getElementById('btnWsLhTight');
      const btnWsNormal = document.getElementById('btnWsLhNormal');
      const btnWsLoose = document.getElementById('btnWsLhLoose');
      if (btnWsTight) btnWsTight.classList.toggle('active', this.settings.workspaceLineHeight === 1.5);
      if (btnWsNormal) btnWsNormal.classList.toggle('active', this.settings.workspaceLineHeight === 1.75);
      if (btnWsLoose) btnWsLoose.classList.toggle('active', this.settings.workspaceLineHeight === 2.1);
    },

    bindWorkspaceToolbarEvents() {
      const btnWsDec = document.getElementById('btnWsFontDec');
      const btnWsInc = document.getElementById('btnWsFontInc');
      const btnWsTight = document.getElementById('btnWsLhTight');
      const btnWsNormal = document.getElementById('btnWsLhNormal');
      const btnWsLoose = document.getElementById('btnWsLhLoose');

      if (btnWsDec) {
        btnWsDec.onclick = (e) => {
          e.preventDefault();
          if (this.settings.workspaceFontSize > 12) {
            this.settings.workspaceFontSize = Math.max(12, Number((this.settings.workspaceFontSize - 1.5).toFixed(1)));
            this.applySettings();
          }
        };
      }

      if (btnWsInc) {
        btnWsInc.onclick = (e) => {
          e.preventDefault();
          if (this.settings.workspaceFontSize < 28) {
            this.settings.workspaceFontSize = Math.min(28, Number((this.settings.workspaceFontSize + 1.5).toFixed(1)));
            this.applySettings();
          }
        };
      }

      if (btnWsTight) {
        btnWsTight.onclick = (e) => {
          e.preventDefault();
          this.settings.workspaceLineHeight = 1.5;
          this.applySettings();
        };
      }

      if (btnWsNormal) {
        btnWsNormal.onclick = (e) => {
          e.preventDefault();
          this.settings.workspaceLineHeight = 1.75;
          this.applySettings();
        };
      }

      if (btnWsLoose) {
        btnWsLoose.onclick = (e) => {
          e.preventDefault();
          this.settings.workspaceLineHeight = 2.1;
          this.applySettings();
        };
      }
    },

    renderExamPaper(textData, containerId) {
      const data = textData || (window.AppState ? window.AppState.textData : null);
      const container = document.getElementById(containerId || 'examPaper');
      if (!container || !data) return;

      this.applySettings();

      let html = `
        <div class="reader-toolbar" id="readerToolbar">
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">字号:</span>
            <button class="toolbar-btn" id="btnFontDec" title="缩小文章字号">A-</button>
            <span class="font-size-badge" id="readerFontBadge">${this.settings.fontSize}px</span>
            <button class="toolbar-btn" id="btnFontInc" title="放大文章字号">A+</button>
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

        <h2 style="font-size:1.35em;font-weight:800;margin-bottom:4px">${data.year} 年全国硕士研究生招生考试英语（二）阅读理解</h2>
        <div style="color:var(--muted);font-size:0.95em;margin-bottom:18px">Text ${data.text_id} (${data.q_range} 题) ｜ <span style="font-size:0.9em;color:var(--mode-color)">💡 点击句子查看语法拆解，双击单词即查释义</span></div>
        <div class="exam-article-section">
      `;

      data.paragraphs.forEach((p) => {
        const pSents = data.sentences.filter(s => s.pid === p.pid);
        let paraSentsHtml = '';

        pSents.forEach(s => {
          let formattedText = this.formatSentenceText(s.text, p.vocabulary);
          let transHtml = this.settings.showTrans ? `<span class="sent-trans-inline">${s.translation}</span>` : '';
          paraSentsHtml += `<span class="exam-sent" id="sent-${s.sid}" data-sid="${s.sid}" data-pid="${p.pid}" title="点击查看长难句拆解">${formattedText}</span> ${transHtml}`;
        });

        html += `
          <div class="exam-para" id="exam-para-${p.pid}" data-pid="${p.pid}">
            <span class="para-badge">[Para ${p.pid + 1}]</span>
            <span class="para-text">${paraSentsHtml}</span>
          </div>
        `;
      });

      html += `</div><hr style="margin:24px 0;border:none;border-top:1px dashed var(--border)"><div class="exam-questions-section"><h3 style="font-size:1.15em;font-weight:700;margin-bottom:12px">Questions (${data.q_range})</h3>`;

      data.questions.forEach(q => {
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

      this.bindToolbarEvents(data, containerId);
    },

    safeReplaceText(html, word, wrapFn) {
      if (!word) return html;
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
      const parts = html.split(/(<[^>]+>)/g);
      for (let i = 0; i < parts.length; i += 2) {
        if (parts[i]) {
          parts[i] = parts[i].replace(regex, wrapFn);
        }
      }
      return parts.join('');
    },

    formatSentenceText(sentText, paraVocab) {
      let text = sentText;

      if (this.settings.highlightLogic) {
        LOGIC_CONNECTORS.turn.forEach(w => {
          text = this.safeReplaceText(text, w, '<span class="transition-turn">$1</span>');
        });
        LOGIC_CONNECTORS.cause.forEach(w => {
          text = this.safeReplaceText(text, w, '<span class="transition-cause">$1</span>');
        });
        LOGIC_CONNECTORS.summary.forEach(w => {
          text = this.safeReplaceText(text, w, '<span class="transition-summary">$1</span>');
        });
      }

      if (paraVocab && paraVocab.length > 0) {
        paraVocab.forEach(v => {
          if (v && v.word) {
            text = this.safeReplaceText(text, v.word, '<span class="exam-vocab" data-word="$1" title="点击查词: $1">$1</span>');
          }
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
        decBtn.onclick = (e) => {
          e.preventDefault();
          if (this.settings.fontSize > 13) {
            this.settings.fontSize = Math.max(13, Number((this.settings.fontSize - 1.5).toFixed(1)));
            this.applySettings();
          }
        };
      }

      if (incBtn) {
        incBtn.onclick = (e) => {
          e.preventDefault();
          if (this.settings.fontSize < 28) {
            this.settings.fontSize = Math.min(28, Number((this.settings.fontSize + 1.5).toFixed(1)));
            this.applySettings();
          }
        };
      }

      document.querySelectorAll('#readerToolbar [data-lh]').forEach(btn => {
        btn.onclick = (e) => {
          e.preventDefault();
          this.settings.lineHeight = Number(btn.getAttribute('data-lh'));
          this.applySettings();
        };
      });

      if (transBtn) {
        transBtn.onclick = (e) => {
          e.preventDefault();
          this.settings.showTrans = !this.settings.showTrans;
          window.StorageModule.saveSettings(this.settings);
          this.renderExamPaper(textData, containerId);
        };
      }

      if (logicBtn) {
        logicBtn.onclick = (e) => {
          e.preventDefault();
          this.settings.highlightLogic = !this.settings.highlightLogic;
          window.StorageModule.saveSettings(this.settings);
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
