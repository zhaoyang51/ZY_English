/**
 * Reader Component: Interactive Exam Paper, Locator Pulse & Dual-Panel Font Adjustments
 */
(function() {
  const LOGIC_CONNECTORS = {
    turn: [
      'on the other hand', 'on the contrary', 'even though', 'in spite of', 'by contrast', 'in contrast',
      'instead of', 'rather than', 'nevertheless', 'nonetheless', 'although', 'however', 'whereas',
      'despite', 'even if', 'instead', 'though', 'while', 'as if', 'as though', 'yet', 'but'
    ],
    condition: [
      'on condition that', 'supposing that', 'providing that', 'provided that', 'in so far as',
      'as long as', 'so long as', 'suppose that', 'so far as', 'as far as', 'providing', 'provided',
      'only if', 'if only', 'unless'
    ],
    purpose: [
      'in order that', 'in order to', 'so that', 'so as to'
    ],
    cause: [
      'for this reason', 'consequently', 'on account of', 'as a result', 'result from', 'result in',
      'given that', 'therefore', 'owing to', 'because', 'due to', 'now that', 'in that', 'hence', 'since', 'thus'
    ],
    summary: [
      'as a matter of fact', 'not only ... but also', 'in particular', 'particularly', 'in conclusion',
      'for instance', 'for example', 'furthermore', 'what is more', 'in addition', 'in summary',
      'all in all', 'to sum up', 'as well as', 'above all', 'actually', 'moreover', 'in fact',
      'in short', 'finally', 'besides', 'indeed'
    ]
  };

  const ORDERED_LOGIC_CONNECTORS = [];
  Object.keys(LOGIC_CONNECTORS).forEach(type => {
    LOGIC_CONNECTORS[type].forEach(phrase => {
      ORDERED_LOGIC_CONNECTORS.push({ phrase, type });
    });
  });
  ORDERED_LOGIC_CONNECTORS.sort((a, b) => b.phrase.length - a.phrase.length);

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

        <h2 style="font-size:1.35em;font-weight:800;margin-bottom:4px">${data.year || (window.AppState ? window.AppState.year : '') || ''} 年全国硕士研究生招生考试英语（二）阅读理解</h2>
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
        const allVocab = data.paragraphs ? data.paragraphs.flatMap(p => p.vocabulary || []) : [];
        const formattedStem = this.formatQuestionText(q.stem, allVocab);
        const transClass = this.settings.showTrans ? 'show' : '';
        html += `
          <div class="exam-question-card" id="exam-q-${q.qid}" data-qid="${q.qid}">
            <div class="q-stem-header">
              <div class="q-stem" data-qid="${q.qid}">
                <span class="q-num-badge" title="点击查看本题考点拆解与逐项剖析">${q.qid}.</span>
                <span class="q-stem-text">${formattedStem}</span>
              </div>
              <div style="display:inline-flex;align-items:center;gap:4px;flex-shrink:0">
                <button type="button" class="btn-jump-to-review-q" data-qid="${q.qid}" title="直达右侧命题复盘">🎯 复盘</button>
                <button class="q-trans-btn" data-qid="${q.qid}" title="切换本题与选项中文翻译">🌐 题意</button>
              </div>
            </div>
            <div class="stem-trans-inline ${transClass}" data-qid="${q.qid}">${q.stem_cn || ''}</div>
            <div class="q-options">
              ${q.options.map(opt => {
                const formattedOpt = this.formatQuestionText(opt.text, allVocab);
                return `
                  <div class="q-opt" data-qid="${q.qid}" data-opt="${opt.key}">
                    <span class="opt-key">[${opt.key}]</span>
                    <div class="opt-content">
                      <span class="opt-text">${formattedOpt}</span>
                      <div class="opt-trans-inline ${transClass}" data-qid="${q.qid}" data-opt="${opt.key}">${opt.text_cn || ''}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;

      this.bindToolbarEvents(data, containerId);
    },

    formatQuestionText(rawText, vocabList) {
      if (window.ReviewContent && window.ReviewContent.formatQuestionText) {
        return window.ReviewContent.formatQuestionText(rawText, vocabList);
      }
      return rawText || '';
    },

    safeReplaceText(html, word, wrapFn) {
      if (!word) return html;
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
      const parts = html.split(/(<[^>]+>)/g);
      let inProtected = 0;
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 1) {
          // Tag segment
          if (/^<span\b[^>]*\bclass=["'][^"']*\b(?:exam-connector|exam-vocab)\b/i.test(parts[i])) {
            inProtected++;
          } else if (/^<\/span>/i.test(parts[i]) && inProtected > 0) {
            inProtected--;
          }
        } else {
          // Text segment outside protected tags
          if (parts[i] && inProtected === 0) {
            parts[i] = parts[i].replace(regex, wrapFn);
          }
        }
      }
      return parts.join('');
    },

    safeReplaceTextWithRegex(html, regex, wrapFn) {
      if (!regex) return html;
      const parts = html.split(/(<[^>]+>)/g);
      let inProtected = 0;
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 1) {
          if (/^<span\b[^>]*\bclass=["'][^"']*\b(?:exam-connector|exam-vocab)\b/i.test(parts[i])) {
            inProtected++;
          } else if (/^<\/span>/i.test(parts[i]) && inProtected > 0) {
            inProtected--;
          }
        } else {
          if (parts[i] && inProtected === 0) {
            parts[i] = parts[i].replace(regex, wrapFn);
          }
        }
      }
      return parts.join('');
    },

    formatSentenceText(sentText, paraVocab) {
      let text = sentText;

      const isHighlight = this.settings.highlightLogic;
      // 1. Process multi-word phrases and standard connectors ordered by longest first
      ORDERED_LOGIC_CONNECTORS.forEach(({ phrase, type }) => {
        const typeClass = `transition-${type}`;
        const cls = isHighlight ? `exam-connector ${typeClass}` : 'exam-connector';
        text = this.safeReplaceText(text, phrase, `<span class="${cls}" data-connector="$1" title="🧭 点击查看逻辑功能与考点定位">$1</span>`);
      });

      // 2. Safe replacement for causal coordinating conjunction 'so'
      // Only match 'so' at sentence-initial position or after punctuation (e.g. ', so...'), 
      // strictly excluding adverbs of degree (e.g. 'so important', 'so much', 'only in so far as')
      const causalSoRegex = /(^|[;,.?!—]\s*)(so)\b(?!\s+(?:that|far|as|long|much|many|few|little|[a-zA-Z]+ly\b|[a-zA-Z]+ed\b|[a-zA-Z]+ing\b))/gi;
      const clsCause = isHighlight ? 'exam-connector transition-cause' : 'exam-connector';
      text = this.safeReplaceTextWithRegex(text, causalSoRegex, (match, prefix, soWord) => {
        return `${prefix}<span class="${clsCause}" data-connector="${soWord}" title="🧭 点击查看逻辑功能与考点定位">${soWord}</span>`;
      });

      if (paraVocab && paraVocab.length > 0) {
        const sortedVocab = [...paraVocab].sort((a, b) => (b.word ? b.word.length : 0) - (a.word ? a.word.length : 0));
        sortedVocab.forEach(v => {
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

    highlightLocatorSentence(sid, pid) {
      if (typeof document === 'undefined') return;
      if (typeof document.querySelectorAll === 'function') {
        document.querySelectorAll('.exam-sent').forEach(el => el.classList && el.classList.remove('locator-pulse'));
      }
      let targetEl = null;

      if (sid !== undefined && sid !== null && sid !== '') {
        if (typeof document.getElementById === 'function') {
          targetEl = document.getElementById(`sent-${sid}`);
        }
        if (!targetEl && typeof document.querySelector === 'function') {
          targetEl = document.querySelector(`.exam-sent[data-sid="${sid}"]`);
        }
      }

      // Fallback to first sentence of paragraph if specific sentence not found
      if (!targetEl && pid !== undefined && pid !== null && pid !== '') {
        const pEl = typeof document.getElementById === 'function' ? document.getElementById(`exam-para-${pid}`) : null;
        if (pEl && typeof pEl.querySelector === 'function') {
          targetEl = pEl.querySelector('.exam-sent');
        }
      }

      if (targetEl) {
        void targetEl.offsetWidth; // Force CSS reflow to re-trigger pulse animation reliably
        if (targetEl.classList && typeof targetEl.classList.add === 'function') {
          targetEl.classList.add('locator-pulse');
        }
        if (typeof targetEl.scrollIntoView === 'function') {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };
})();
