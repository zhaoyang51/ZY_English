/**
 * Writing Renderer: Section IV Writing (小作文 & 大作文)
 * High-Fidelity Authentic Exam Paper Layout (模仿真题排版)
 * - Part A: 47题 (应用文小作文 · 10分 · 约100词)
 * - Part B: 48题 (短文大作文 · 15分 · 约150词)
 * Interactive ANSWER SHEET 2 Workstation with live word count, draft auto-save,
 * official prompts, authentic chart inspection, and model essay comparison.
 */
(function() {
  'use strict';

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
    'not', 'no', 'yes', 'all', 'any', 'some', 'each', 'every', 'both', 'such'
  ]);

  function isSimpleWord(w) {
    if (!w) return true;
    const clean = w.toLowerCase().replace(/[^a-z']/g, '');
    if (clean.length <= 1) return true;
    return SIMPLE_WORDS.has(clean);
  }

  const WritingRenderer = {
    currentYear: 2025,
    currentPart: 'writing_a',
    currentMode: 'practice',
    showTrans: false,

    getPrompts() {
      return window.WRITING_PROMPTS || {};
    },

    getPromptData(year, partKey) {
      const data = this.getPrompts();
      if (partKey === 'writing_a') {
        const pool = data.e2_part_a || {};
        return pool[year] || pool[2025] || {};
      } else {
        const pool = data.e2_part_b || {};
        return pool[year] || pool[2025] || {};
      }
    },

    render(year, partKey, mode) {
      this.currentYear = parseInt(year, 10) || 2025;
      this.currentPart = partKey || 'writing_a';
      this.currentMode = mode || (window.AppState ? window.AppState.mode : 'practice') || 'practice';

      const promptData = this.getPromptData(this.currentYear, this.currentPart);

      this.renderLeftPanel(promptData, this.currentYear, this.currentPart);
      this.renderRightPanel(promptData, this.currentYear, this.currentPart, this.currentMode);
    },

    tokenizeWords(text) {
      if (!text) return '';
      return text.split('\n').map(line => {
        if (!line.trim()) return '';
        const tokens = line.split(/(\s+|[.,!?;:()""'—–-]+)/);
        const htmlTokens = tokens.map(token => {
          if (/^[A-Za-z]+['’]?[A-Za-z]*$/.test(token) && !isSimpleWord(token)) {
            return `<span class="exam-word-token" data-word="${token}" title="点击查词">${token}</span>`;
          }
          return token;
        }).join('');
        return `<div class="exam-line">${htmlTokens}</div>`;
      }).join('');
    },

    renderLeftPanel(data, year, partKey) {
      const examPaper = document.getElementById('examPaper');
      if (!examPaper) return;

      const fs = window.ReaderModule?.settings?.fontSize || 17.5;
      const lh = window.ReaderModule?.settings?.lineHeight || 1.85;
      const isPartA = partKey === 'writing_a';
      const partLabel = isPartA ? 'Part A' : 'Part B';
      const qid = isPartA ? 47 : 48;
      const points = isPartA ? 10 : 15;
      const wordReq = isPartA ? '约 100 词' : '不少于 150 词';

      examPaper.innerHTML = `
        <!-- Floating Reader Toolbar -->
        <div class="reader-toolbar" id="writingReaderToolbar">
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">题型:</span>
            <span class="badge" style="background:#0284c7;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.82em">
              Section IV ${partLabel} ${isPartA ? '应用文小作文' : '短文大作文'} (${points}分)
            </span>
          </div>
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">字号:</span>
            <button class="toolbar-btn" id="btnWritingFontDec" title="缩小字号">A-</button>
            <span class="font-size-badge" id="writingFontBadge">${fs}px</span>
            <button class="toolbar-btn" id="btnWritingFontInc" title="放大字号">A+</button>
          </div>
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">行距:</span>
            <button class="toolbar-btn ${lh === 1.6 ? 'active' : ''}" data-lh="1.6" id="btnWritingLhTight">紧凑</button>
            <button class="toolbar-btn ${lh === 1.85 ? 'active' : ''}" data-lh="1.85" id="btnWritingLhNormal">舒适</button>
            <button class="toolbar-btn ${lh === 2.2 ? 'active' : ''}" data-lh="2.2" id="btnWritingLhLoose">宽松</button>
          </div>
          <div class="toolbar-group" style="margin-left:auto;display:flex;align-items:center;gap:8px">
            <button class="toolbar-btn ${this.showTrans ? 'active' : ''}" id="btnToggleWritingTrans" title="切换中文翻译与题型点拨">
              🌐 中文解析
            </button>
          </div>
        </div>

        <!-- Authentic Exam Paper Container (模仿真题排版) -->
        <div class="authentic-exam-sheet" style="font-size:${fs}px;line-height:${lh}">
          <!-- Official Exam Header -->
          <div class="authentic-exam-header">
            <div class="exam-header-super">${year} 年全国硕士研究生招生考试</div>
            <h1 class="exam-header-title">英 语（二）试 题</h1>
            <div class="exam-header-meta-row">
              <span>（科目代码：204）</span>
              <span>考试时间：180 分钟</span>
              <span>满分：100 分</span>
            </div>
            <div class="exam-header-rule"></div>
            <div class="exam-header-section-title">Section IV  Writing</div>
            <div class="exam-header-part-title">${partLabel}</div>
          </div>

          <!-- Official Question Prompt (Directions) -->
          <div class="authentic-directions-box">
            <div class="authentic-question-num">${qid}.</div>
            <div class="authentic-directions-content">
              <div class="directions-en-text">
                ${this.tokenizeWords(data.directionsEn || (isPartA ? '47. Directions:\nWrite an essay on the ANSWER SHEET. (10 points)' : '48. Directions:\nWrite an essay based on the chart below. (15 points)'))}
              </div>

              <!-- Part B Authentic Chart Image Block -->
              ${!isPartA && data.chartImage ? `
                <div class="authentic-chart-wrapper">
                  <div class="chart-wrapper-header">
                    <span class="chart-caption-tag">【真题图表】</span>
                    <strong class="chart-caption-title">${data.title || `${year} 年图表作文`}</strong>
                    <span class="chart-caption-badge">${data.chartType || '图表类'}</span>
                  </div>
                  <div class="chart-img-container">
                    <img src="${data.chartImage}" alt="${data.title || '考研真题图表'}" class="authentic-chart-img" id="examChartImage" title="点击查看大图" onerror="this.style.display='none'" />
                  </div>
                  ${data.summary ? `
                    <div class="chart-data-notes">
                      <strong>📊 图表核心信息提要：</strong>${data.summary}
                    </div>
                  ` : ''}
                </div>
              ` : ''}

              <!-- Collapsible Chinese Translation & Strategy Box -->
              <div class="authentic-prompt-cn-box" id="writingPromptCnBox" style="display:${this.showTrans ? 'block' : 'none'}">
                <div class="prompt-cn-header">
                  <span>💡 题目中文解析与写作要点</span>
                  <span class="badge" style="background:#e0f2fe;color:#0369a1;font-size:0.85em;padding:2px 8px;border-radius:4px">
                    ${data.form || data.chartType || '真题考查'}
                  </span>
                </div>
                <div class="prompt-cn-title"><strong>中文题意：</strong>${data.title || ''}</div>
                ${data.pointsSummary ? `
                  <div class="prompt-cn-points"><strong>写作要点：</strong>${data.pointsSummary}</div>
                ` : ''}
                ${data.matchTemplate ? `
                  <div class="prompt-cn-template"><strong>推荐模板：</strong>${data.matchTemplate}</div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;

      this.bindLeftEvents(data, year, partKey);
    },

    renderRightPanel(data, year, partKey, mode) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;

      const isPartA = partKey === 'writing_a';
      const qid = isPartA ? 47 : 48;
      const points = isPartA ? 10 : 15;
      const partLabel = isPartA ? 'Part A' : 'Part B';
      const targetWords = isPartA ? 100 : 150;
      const minWords = isPartA ? 80 : 130;
      const maxWords = isPartA ? 130 : 220;

      const storageKey = `kaoyan_writing_${partKey}_${year}`;
      const savedDraft = localStorage.getItem(storageKey) || '';
      const wordCount = this.countWords(savedDraft);

      // Model essay data from data or pastExams
      const enEssay = data.enEssay || '';
      const cnEssay = data.cnEssay || '';
      const origins = data.origins || '';
      const strategy = data.strategy || '';

      container.innerHTML = `
        <div class="authentic-answer-sheet-container">
          <!-- Official Answer Sheet 2 Top Header -->
          <div class="answer-sheet-official-header">
            <div class="sheet-top-notice">绝密 ★ 启用前</div>
            <div class="sheet-main-title">全国硕士研究生招生考试答题卡 2</div>
            <div class="sheet-meta-grid">
              <div class="sheet-meta-item"><strong>科目：</strong>英语（二）</div>
              <div class="sheet-meta-item"><strong>题号：</strong>第 ${qid} 题 (${partLabel})</div>
              <div class="sheet-meta-item"><strong>分值：</strong>${points} 分</div>
            </div>
            <div class="sheet-instruction-text">
              ※ 请在密封线内作答；请保持字迹工整、卷面整洁；要求书写字数${isPartA ? '约 100 词' : '不少于 150 词'}。
            </div>
          </div>

          <!-- Interactive Ruled Writing Canvas -->
          <div class="answer-sheet-canvas-box">
            <div class="canvas-status-bar">
              <div class="status-left">
                <span class="live-count-badge" id="writingLiveCountBadge">
                  当前字数: <strong>${wordCount}</strong> 词
                </span>
                <span class="target-hint ${wordCount >= minWords ? 'hit' : ''}" id="writingTargetHint">
                  ${wordCount >= minWords ? '✅ 已达标' : `(需${targetWords}词)`}
                </span>
              </div>
              <div class="status-right" id="writingSaveStatus">
                <span style="color:var(--success,#10b981);font-size:0.85em">● 草稿已自动保存</span>
              </div>
            </div>

            <textarea 
              id="writingAnswerSheetTextarea" 
              class="authentic-answer-sheet-textarea" 
              placeholder="${isPartA ? 'Write your essay for Part A here (about 100 words)...' : 'Write your essay for Part B here (at least 150 words)...'}"
              spellcheck="false"
            >${savedDraft}</textarea>

            <div class="canvas-action-toolbar">
              <button class="btn btn-outline" id="btnWritingClearDraft" title="清空答题卡内容">
                🗑️ 清空
              </button>
              <button class="btn btn-outline" id="btnWritingCopyDraft" title="复制我的作答草稿">
                📋 复制
              </button>
              <button class="btn btn-primary" id="btnWritingToggleModel" style="margin-left:auto;background:#0284c7;border-color:#0284c7;color:#fff">
                ${mode === 'review' ? '📖 收起/展开范文对照' : '✨ 提交作答并对照权威高分范文'}
              </button>
            </div>
          </div>

          <!-- Authentic Model Essay Comparison Section -->
          <div class="model-essay-comparison-section" id="modelEssayComparisonSection" style="display:${mode === 'review' || savedDraft ? 'block' : 'none'}">
            <div class="model-essay-card">
              <div class="model-card-header">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:1.2em">🏆</span>
                  <div>
                    <h3 class="model-card-title" style="margin:0">${year} 年真题权威满分标准范文</h3>
                    <div style="font-size:0.84em;color:var(--muted);margin-top:2px">
                      标准三段式齐头排版 · 地道词块搭配 · 绝无生硬套痕
                    </div>
                  </div>
                </div>
                <button class="writing-copy-btn" id="btnCopyModelEssay" style="font-size:0.8em;padding:4px 10px">
                  📋 复制范文
                </button>
              </div>

              <div class="model-card-body">
                ${strategy ? `
                  <div class="model-strategy-callout">
                    <strong>💡 秘密哥构思与套用思路：</strong>${strategy}
                  </div>
                ` : ''}

                <!-- English Model Essay -->
                <div class="model-en-box">
                  <strong class="model-box-label">【标准三段式英文高分范文】</strong>
                  <div class="model-en-text" id="modelEssayEnText">${enEssay || '（暂无对应英文范文）'}</div>
                </div>

                <!-- Chinese Translation -->
                ${cnEssay ? `
                  <div class="model-cn-box">
                    <strong class="model-box-label" style="color:var(--muted)">【全篇参考对译】</strong>
                    <div class="model-cn-text">${cnEssay}</div>
                  </div>
                ` : ''}

                <!-- Origins / Breakdown -->
                ${origins ? `
                  <div class="model-origins-box">
                    <strong style="color:var(--ink);font-size:0.9em;display:block;margin-bottom:6px">
                      🔍 逐句来源与功能句组合拆解：
                    </strong>
                    <div style="font-size:0.88em;color:var(--muted);line-height:1.75;white-space:pre-wrap">${origins}</div>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;

      this.bindRightEvents(year, partKey, storageKey, enEssay);
    },

    bindLeftEvents(data, year, partKey) {
      const examPaper = document.getElementById('examPaper');
      if (!examPaper) return;

      // Token click for vocabulary
      examPaper.querySelectorAll('.exam-word-token').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const word = el.getAttribute('data-word');
          const rect = el.getBoundingClientRect();
          if (typeof window.showVocabPopup === 'function') {
            window.showVocabPopup(word, rect.left, rect.bottom + 6);
          }
        });
      });

      // Toggle translation
      const btnTrans = examPaper.querySelector('#btnToggleWritingTrans');
      const cnBox = examPaper.querySelector('#writingPromptCnBox');
      if (btnTrans && cnBox) {
        btnTrans.addEventListener('click', () => {
          this.showTrans = !this.showTrans;
          btnTrans.classList.toggle('active', this.showTrans);
          cnBox.style.display = this.showTrans ? 'block' : 'none';
        });
      }

      // Font size buttons
      const btnDec = examPaper.querySelector('#btnWritingFontDec');
      const btnInc = examPaper.querySelector('#btnWritingFontInc');
      const badge = examPaper.querySelector('#writingFontBadge');
      const sheet = examPaper.querySelector('.authentic-exam-sheet');

      if (btnDec && btnInc && sheet) {
        btnDec.addEventListener('click', () => {
          let cur = parseFloat(sheet.style.fontSize) || 17.5;
          cur = Math.max(13, cur - 1);
          sheet.style.fontSize = `${cur}px`;
          if (badge) badge.textContent = `${cur}px`;
        });
        btnInc.addEventListener('click', () => {
          let cur = parseFloat(sheet.style.fontSize) || 17.5;
          cur = Math.min(26, cur + 1);
          sheet.style.fontSize = `${cur}px`;
          if (badge) badge.textContent = `${cur}px`;
        });
      }

      // Line height buttons
      ['btnWritingLhTight', 'btnWritingLhNormal', 'btnWritingLhLoose'].forEach(id => {
        const btn = examPaper.querySelector(`#${id}`);
        if (btn && sheet) {
          btn.addEventListener('click', () => {
            const lh = btn.getAttribute('data-lh');
            sheet.style.lineHeight = lh;
            ['btnWritingLhTight', 'btnWritingLhNormal', 'btnWritingLhLoose'].forEach(otherId => {
              const other = examPaper.querySelector(`#${otherId}`);
              if (other) other.classList.toggle('active', other === btn);
            });
          });
        }
      });
    },

    bindRightEvents(year, partKey, storageKey, enEssay) {
      const textarea = document.getElementById('writingAnswerSheetTextarea');
      const countBadge = document.getElementById('writingLiveCountBadge');
      const savedDraft = (typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : '') || '';
      const initialCount = this.countWords(savedDraft);

      if (textarea) {
        textarea.value = savedDraft;
        textarea.textContent = savedDraft;
      }
      if (countBadge) {
        countBadge.innerHTML = '当前字数: <strong>' + initialCount + '</strong> 词';
      }
      const targetHint = document.getElementById('writingTargetHint');
      const saveStatus = document.getElementById('writingSaveStatus');
      const clearBtn = document.getElementById('btnWritingClearDraft');
      const copyBtn = document.getElementById('btnWritingCopyDraft');
      const toggleModelBtn = document.getElementById('btnWritingToggleModel');
      const modelSection = document.getElementById('modelEssayComparisonSection');
      const copyModelBtn = document.getElementById('btnCopyModelEssay');

      const isPartA = partKey === 'writing_a';
      const targetWords = isPartA ? 100 : 150;
      const minWords = isPartA ? 80 : 130;

      let saveTimer = null;

      if (textarea) {
        textarea.addEventListener('input', () => {
          const val = textarea.value;
          const count = this.countWords(val);

          if (countBadge) {
            countBadge.innerHTML = `当前字数: <strong>${count}</strong> 词`;
          }
          if (targetHint) {
            if (count >= minWords) {
              targetHint.className = 'target-hint hit';
              targetHint.textContent = '✅ 已达标';
            } else {
              targetHint.className = 'target-hint';
              targetHint.textContent = `(需${targetWords}词)`;
            }
          }

          if (saveStatus) {
            saveStatus.innerHTML = '<span style="color:#d97706;font-size:0.85em">● 正在输入保存...</span>';
          }

          clearTimeout(saveTimer);
          saveTimer = setTimeout(() => {
            try {
              localStorage.setItem(storageKey, val);
              if (saveStatus) {
                saveStatus.innerHTML = '<span style="color:var(--success,#10b981);font-size:0.85em">● 草稿已自动保存</span>';
              }
            } catch (e) {}
          }, 350);
        });
      }

      if (clearBtn && textarea) {
        clearBtn.addEventListener('click', () => {
          if (confirm('确认清空当前写作草稿吗？')) {
            textarea.value = '';
            localStorage.removeItem(storageKey);
            textarea.dispatchEvent(new Event('input'));
          }
        });
      }

      if (copyBtn && textarea) {
        copyBtn.addEventListener('click', () => {
          this.copyToClipboard(textarea.value, copyBtn);
        });
      }

      if (toggleModelBtn && modelSection) {
        toggleModelBtn.addEventListener('click', () => {
          const isHidden = modelSection.style.display === 'none';
          modelSection.style.display = isHidden ? 'block' : 'none';
          if (isHidden) {
            modelSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      }

      if (copyModelBtn && enEssay) {
        copyModelBtn.addEventListener('click', () => {
          this.copyToClipboard(enEssay, copyModelBtn);
        });
      }
    },

    countWords(text) {
      if (!text) return 0;
      const clean = text.trim();
      if (!clean) return 0;
      const matches = clean.match(/[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*/g);
      return matches ? matches.length : 0;
    },

    copyToClipboard(text, btn) {
      if (!text) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          const orig = btn.innerHTML;
          btn.innerHTML = '✅ 已复制！';
          setTimeout(() => { btn.innerHTML = orig; }, 1800);
        }).catch(() => {});
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          const orig = btn.innerHTML;
          btn.innerHTML = '✅ 已复制！';
          setTimeout(() => { btn.innerHTML = orig; }, 1800);
        } catch (e) {}
        document.body.removeChild(ta);
      }
    }
  };

  window.WritingRenderer = WritingRenderer;
})();
