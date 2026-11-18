/**
 * ZY_English Writing Masterclass Module (Minimalist Paper Aesthetic)
 * Integrates Dual Writing Systems:
 * - System 1 (classic): 功能句与真题范文库 (起步流程 / 小作文17模板 / 大作文句库 / 34篇真题范文 / 主题词矩阵 / PDF资料)
 * - System 2 (onepage): 27届大作文一页纸 (极简点填工作台 / 七类价值观语料 / 20-26英二四档实操 / 使用说明)
 */

(function(window) {
  'use strict';

  const WritingModule = {
    initialized: false,
    container: null,
    activeSystem: (function() {
      try {
        const s = window.localStorage && window.localStorage.getItem('ZY_WRITING_ACTIVE_SYSTEM');
        return (s === 'onepage' || s === 'classic' || s === 'simplified5') ? s : 'onepage';
      } catch (e) { return 'onepage'; }
    })(),
    fontSize: (function() {
      try {
        const s = parseInt(window.localStorage && window.localStorage.getItem('ZY_WRITING_FONT_SIZE'), 10);
        return (s >= 14 && s <= 26) ? s : 18;
      } catch (e) { return 18; }
    })(),
    currentTab: 'guide',
    selectedExamSubject: '英语二',
    selectedExamYear: 2025,
    selectedKeywordSubject: '英语二',
    selectedSmallEssaySubject: '英语二',
    smallEssayFilter: 'all',
    smallEssayShowCn: false,
    pastExamShowCn: false,
    pastExamShowOrigins: false,

    getData() {
      return window.WRITING_DATA || window.WritingData || {};
    },

    init(containerId, initialYear) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      if (initialYear) {
        const y = parseInt(initialYear, 10);
        if (!isNaN(y)) this.selectedExamYear = y;
      }

      if (!this.initialized) {
        this.renderShell();
        this.bindTabEvents();
        this.initialized = true;
      }

      this.applyFontSize(this.fontSize, true);
      this.switchSystem(this.activeSystem, true);
    },

    applyFontSize(px, skipSave) {
      const clamped = Math.max(14, Math.min(26, Number(px) || 18));
      this.fontSize = clamped;
      if (document.body && document.body.style && document.body.style.setProperty) {
        document.body.style.setProperty('--w-font-size', clamped + 'px');
      }
      if (this.container && this.container.style && this.container.style.setProperty) {
        this.container.style.setProperty('--w-font-size', clamped + 'px');
      }
      const badge = document.getElementById('writingFontVal');
      if (badge) badge.textContent = clamped + 'px';
      const s5Badge = document.getElementById('s5FontVal');
      if (s5Badge) s5Badge.textContent = clamped + 'px';
      if (!skipSave) {
        try { localStorage.setItem('ZY_WRITING_FONT_SIZE', String(clamped)); } catch (e) {}
      }
    },

    onYearChange(year) {
      const y = parseInt(year, 10);
      if (!isNaN(y)) {
        this.selectedExamYear = y;
        if (this.activeSystem === 'onepage' && window.WritingOnePageModule) {
          window.WritingOnePageModule.onYearChange(y);
          return;
        }
        if (this.activeSystem === 'simplified5' && window.WritingSimplified5Module) {
          window.WritingSimplified5Module.onYearChange(y);
          return;
        }
        if (this.currentTab === 'pastExams') {
          const yearSelect = document.getElementById('examYearSelect');
          if (yearSelect) yearSelect.value = String(y);
          this.renderExamArticle();
        }
      }
    },

    switchSystem(sysKey, skipSave) {
      this.activeSystem = (sysKey === 'onepage' || sysKey === 'simplified5') ? sysKey : 'classic';
      if (!skipSave) {
        try { localStorage.setItem('ZY_WRITING_ACTIVE_SYSTEM', this.activeSystem); } catch (e) {}
      }

      const classicBox = this.container.querySelector('#classicSystemContainer');
      const onepageBox = this.container.querySelector('#onePageSystemContainer');
      const s5Box = this.container.querySelector('#simplified5SystemContainer');
      this.container.querySelectorAll('.system-switch-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.system === this.activeSystem);
      });

      if (classicBox) classicBox.style.display = 'none';
      if (onepageBox) onepageBox.style.display = 'none';
      if (s5Box) s5Box.style.display = 'none';

      if (this.activeSystem === 'onepage') {
        if (onepageBox) {
          onepageBox.style.display = '';
          if (window.WritingOnePageModule && !onepageBox.dataset.mounted) {
            window.WritingOnePageModule.mount(onepageBox, null, this.selectedExamYear);
            onepageBox.dataset.mounted = '1';
          }
        }
      } else if (this.activeSystem === 'simplified5') {
        if (s5Box) {
          s5Box.style.display = '';
          if (window.WritingSimplified5Module && !s5Box.dataset.mounted) {
            window.WritingSimplified5Module.mount(s5Box, this.selectedExamYear);
            s5Box.dataset.mounted = '1';
          }
        }
      } else {
        if (classicBox) classicBox.style.display = '';
        this.switchTab(this.currentTab);
      }

      if (this.container) this.container.scrollTop = 0;
    },

    renderShell() {
      this.container.innerHTML = `
        <div class="writing-inner-container">
          <!-- Minimalist Header + Dual System Segmented Control -->
          <div class="writing-minimal-header">
            <div class="writing-minimal-title">
              <h2>写作宝典</h2>
              <span>三段式模板 · 语料库 · 真题套写</span>
            </div>
            <div class="writing-header-actions">
              <div class="writing-font-control" role="group" aria-label="写作字号调节">
                <button class="font-step-btn" id="writingFontDecBtn" title="缩小字体">A-</button>
                <span class="font-size-val" id="writingFontVal" title="点击恢复默认大小 (18px)">${this.fontSize}px</span>
                <button class="font-step-btn" id="writingFontIncBtn" title="放大字体">A+</button>
              </div>
              <div class="writing-segmented-control" role="group" aria-label="写作体系切换">
                <button class="system-switch-btn ${this.activeSystem === 'onepage' ? 'active' : ''}" data-system="onepage">
                  大作文一页纸
                </button>
                <button class="system-switch-btn ${this.activeSystem === 'simplified5' ? 'active' : ''}" data-system="simplified5">
                  新简化版5套模板
                </button>
                <button class="system-switch-btn ${this.activeSystem === 'classic' ? 'active' : ''}" data-system="classic">
                  功能句与真题范文库
                </button>
              </div>
            </div>
          </div>

          <!-- 体系一容器 -->
          <div id="classicSystemContainer">
            <nav class="writing-nav-tabs" id="writingNavTabs" role="tablist">
              <button class="writing-tab-btn active" data-tab="guide" role="tab">起步与流程</button>
              <button class="writing-tab-btn" data-tab="smallEssay" role="tab">小作文模板</button>
              <button class="writing-tab-btn" data-tab="bigEssay" role="tab">大作文句库</button>
              <button class="writing-tab-btn" data-tab="pastExams" role="tab">历年真题范文</button>
              <button class="writing-tab-btn" data-tab="themeKeywords" role="tab">主题词矩阵</button>
              <button class="writing-tab-btn" data-tab="materials" role="tab">原版资料下载</button>
            </nav>

            <div class="writing-tab-panel active" id="panelGuide" role="tabpanel"></div>
            <div class="writing-tab-panel" id="panelSmallEssay" role="tabpanel"></div>
            <div class="writing-tab-panel" id="panelBigEssay" role="tabpanel"></div>
            <div class="writing-tab-panel" id="panelPastExams" role="tabpanel"></div>
            <div class="writing-tab-panel" id="panelThemeKeywords" role="tabpanel"></div>
            <div class="writing-tab-panel" id="panelMaterials" role="tabpanel"></div>
          </div>

          <!-- 体系二容器 (大作文一页纸) -->
          <div id="onePageSystemContainer" style="display:none"></div>

          <!-- 体系三容器 (20-26新简化版5套模板) -->
          <div id="simplified5SystemContainer" style="display:none"></div>
        </div>
      `;

      this.renderGuide();
      this.renderSmallEssay();
      this.renderBigEssay();
      this.renderPastExams();
      this.renderThemeKeywords();
      this.renderMaterials();
    },

    bindTabEvents() {
      const decBtn = this.container.querySelector('#writingFontDecBtn');
      const incBtn = this.container.querySelector('#writingFontIncBtn');
      const valBadge = this.container.querySelector('#writingFontVal');
      if (decBtn) decBtn.addEventListener('click', () => this.applyFontSize(this.fontSize - 1));
      if (incBtn) incBtn.addEventListener('click', () => this.applyFontSize(this.fontSize + 1));
      if (valBadge) valBadge.addEventListener('click', () => this.applyFontSize(18));

      this.container.querySelectorAll('.system-switch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sys = btn.dataset.system;
          if (sys) this.switchSystem(sys);
        });
      });

      const tabs = this.container.querySelectorAll('#writingNavTabs .writing-tab-btn');
      tabs.forEach(btn => {
        btn.addEventListener('click', () => {
          const tabKey = btn.dataset.tab;
          if (tabKey) this.switchTab(tabKey);
        });
      });
    },

    switchTab(tabKey) {
      this.currentTab = tabKey;
      const tabs = this.container.querySelectorAll('#writingNavTabs .writing-tab-btn');
      tabs.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabKey);
      });

      const panels = this.container.querySelectorAll('#classicSystemContainer > .writing-tab-panel');
      panels.forEach(p => p.classList.remove('active'));

      const targetPanel = this.container.querySelector(`#panel${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
      if (this.container) {
        this.container.scrollTop = 0;
      }
      if (targetPanel) {
        targetPanel.scrollTop = 0;
      }

      if (tabKey === 'pastExams') {
        const yearSelect = document.getElementById('examYearSelect');
        if (yearSelect && this.selectedExamYear) {
          yearSelect.value = String(this.selectedExamYear);
          this.renderExamArticle();
        }
      }
    },

    /* ==========================================================================
       Tab 1: 起步与流程
       ========================================================================== */
    renderGuide() {
      const panel = this.container.querySelector('#panelGuide');
      const guide = this.getData().guide || {};
      const sections = guide.sections || [];
      if (!panel) return;

      panel.innerHTML = `
        <div class="paper-sheet">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong>${guide.title || '考研英语作文模板使用全流程指南'}</strong>
              <span style="font-size:0.9em;color:var(--w-muted)">${guide.author || '秘密哥 / 苦瓜学长'}</span>
            </div>
          </div>
          ${sections.map(sec => {
            const isAi = sec.id === 'ai_prompt';
            return `
              <div class="paper-section" id="guide-${sec.id}">
                <div class="paper-section-head">
                  <span class="paper-section-title">${sec.title}</span>
                  ${isAi ? `<button class="paper-text-btn" id="copyAiInstructionBtn">复制AI换词指令</button>` : ''}
                </div>
                ${(sec.content || []).map(item => `
                  <div style="margin-bottom:14px">
                    <div style="font-weight:600;font-size:0.92em;color:var(--w-ink);margin-bottom:4px">${item.subtitle}</div>
                    <div class="paper-note-text" style="margin-top:0">${this.formatGuideText(item.text, isAi && item.subtitle.includes('换词指令'))}</div>
                  </div>
                `).join('')}
              </div>
            `;
          }).join('')}
        </div>
      `;

      const copyBtn = panel.querySelector('#copyAiInstructionBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const aiBlock = panel.querySelector('#aiPromptBox');
          const promptText = aiBlock ? aiBlock.innerText : '';
          this.copyToClipboard(promptText, copyBtn);
        });
      }
    },

    formatGuideText(text, isAiPromptBlock) {
      if (!text) return '';
      let formatted = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

      if (isAiPromptBlock || text.includes('【换词指令】')) {
        const parts = formatted.split('【换词指令】：');
        if (parts.length > 1) {
          return `${parts[0]}<div class="clean-code-box" id="aiPromptBox"><strong>【换词指令】：</strong>\n${parts[1].trim()}</div>`;
        }
      }
      return formatted.replace(/\n/g, '<br>');
    },

    /* ==========================================================================
       Tab 2: 小作文模板与历年真题
       ========================================================================== */
    renderSmallEssay() {
      const panel = this.container.querySelector('#panelSmallEssay');
      const prompts = window.WRITING_PROMPTS || {};
      const e2Prompts = prompts.e2_part_a || {};
      const e1Prompts = prompts.e1_part_a || {};
      if (!panel) return;

      const sub = this.selectedSmallEssaySubject || '英语二';
      const promptList = (sub === '英语二' ? Object.values(e2Prompts) : Object.values(e1Prompts)).sort((a, b) => b.year - a.year);

      panel.innerHTML = `
        <div class="writing-inline-bar">
          <div class="filter-group">
            <button class="filter-btn ${this.smallEssayFilter === 'all' ? 'active' : ''}" data-filter="all">全部模板 (17)</button>
            <button class="filter-btn ${this.smallEssayFilter === 'basic' ? 'active' : ''}" data-filter="basic">基础类型 (10)</button>
            <button class="filter-btn ${this.smallEssayFilter === 'mixed' ? 'active' : ''}" data-filter="mixed">混合类型 (7)</button>
          </div>
          <label class="w-switch-label">
            <input type="checkbox" class="w-switch-input" id="smallEssayCnToggle" ${this.smallEssayShowCn ? 'checked' : ''}>
            <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
            <span>中英对照</span>
          </label>
        </div>

        <div id="templatesContainer"></div>

        <!-- 历年小作文真题题目速查表 -->
        <div class="paper-sheet" style="margin-top:24px">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong>历年小作文真题题目与推荐模板（2010—2026）</strong>
            </div>
            <div class="filter-group">
              <button class="filter-btn ${sub === '英语二' ? 'active' : ''}" id="btnSmallSubE2">英语二</button>
              <button class="filter-btn ${sub === '英语一' ? 'active' : ''}" id="btnSmallSubE1">英语一</button>
            </div>
          </div>
          <div class="clean-table-wrap">
            <table class="clean-table">
              <thead>
                <tr>
                  <th style="width:70px">年份</th>
                  <th style="width:110px">类型</th>
                  <th>真题主题与要求</th>
                  <th style="width:200px">操作</th>
                </tr>
              </thead>
              <tbody>
                ${promptList.map(item => `
                  <tr>
                    <td><strong>${item.year}</strong></td>
                    <td>${item.form}</td>
                    <td>
                      <div style="font-weight:600;color:var(--w-ink)">${item.title}</div>
                      ${item.pointsSummary ? `<div style="font-size:0.9em;color:var(--w-muted);margin-top:3px">${item.pointsSummary}</div>` : ''}
                    </td>
                    <td>
                      ${item.matchTemplate ? `<button class="clean-link-btn template-jump-btn" data-match="${item.matchTemplate}">${item.matchTemplate}</button>` : ''}
                      ${sub === '英语二' ? `<button class="paper-text-btn practice-jump-btn" data-year="${item.year}" data-part="writing_a" style="margin-left:6px">模拟作答</button>` : ''}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      this.renderTemplateCards();
      this.bindSmallEssayEvents();
    },

    renderTemplateCards() {
      const container = this.container.querySelector('#templatesContainer');
      const templates = (this.getData().smallEssayTemplates) || [];
      if (!container) return;

      const filter = this.smallEssayFilter;
      const filtered = templates.filter(t => {
        if (filter === 'basic') return t.category === 'basic';
        if (filter === 'mixed') return t.category === 'mixed';
        return true;
      });

      container.innerHTML = filtered.map(t => {
        const enParas = (t.enTemplate || '').split(/\n\n+/);
        const cnParas = (t.cnTranslation || '').split(/\n\n+/);
        const paraTitles = ['第一段 · 问候与目的', '第二段 · 核心正文', '第三段 · 礼貌收尾'];
        return `
          <div class="paper-sheet" id="template-${t.id}">
            <div class="paper-toolbar">
              <div class="paper-toolbar-left">
                <strong style="font-size:1em">${t.title}</strong>
                <span style="font-size:0.9em;color:var(--w-muted)">${t.categoryName || ''} · 句数 ${t.sentencesCount || '2/4/2'}</span>
              </div>
              <button class="paper-text-btn copy-template-btn" data-id="${t.id}">复制模板</button>
            </div>
            ${enParas.map((ep, idx) => `
              <div class="paper-section">
                <div class="paper-section-head">
                  <span class="paper-section-title">${paraTitles[idx] || ('第' + (idx+1) + '段')}</span>
                </div>
                <div class="paper-en-text no-indent">${this.highlightPlaceholders(ep)}</div>
                ${this.smallEssayShowCn && cnParas[idx] ? `<div class="paper-cn-text" style="text-indent:0">${cnParas[idx]}</div>` : ''}
              </div>
            `).join('')}
            <div class="paper-footer">
              <span>来源：${t.origin || '经典功能句组合'}</span>
            </div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('.copy-template-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id, 10);
          const tpl = templates.find(item => item.id === id);
          if (tpl) this.copyToClipboard(tpl.enTemplate, btn);
        });
      });
    },

    bindSmallEssayEvents() {
      const panel = this.container.querySelector('#panelSmallEssay');
      if (!panel) return;

      const cnToggle = panel.querySelector('#smallEssayCnToggle');
      if (cnToggle) {
        cnToggle.addEventListener('change', (e) => {
          this.smallEssayShowCn = !!e.target.checked;
          this.renderTemplateCards();
        });
      }

      const btnE2 = panel.querySelector('#btnSmallSubE2');
      const btnE1 = panel.querySelector('#btnSmallSubE1');
      if (btnE2 && btnE1) {
        btnE2.addEventListener('click', () => { this.selectedSmallEssaySubject = '英语二'; this.renderSmallEssay(); });
        btnE1.addEventListener('click', () => { this.selectedSmallEssaySubject = '英语一'; this.renderSmallEssay(); });
      }

      panel.querySelectorAll('.practice-jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (window.loadSectionFromWriting) {
            window.loadSectionFromWriting(btn.getAttribute('data-part'), btn.getAttribute('data-year'));
          }
        });
      });

      panel.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
          panel.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.smallEssayFilter = btn.dataset.filter || 'all';
          this.renderTemplateCards();
        });
      });

      panel.querySelectorAll('.template-jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const m = (btn.dataset.match || '').match(/模版\s*(\d+)/);
          if (m && m[1]) this.scrollToTemplate(parseInt(m[1], 10));
        });
      });
    },

    scrollToTemplate(templateId) {
      if (this.smallEssayFilter !== 'all') {
        this.smallEssayFilter = 'all';
        const panel = this.container.querySelector('#panelSmallEssay');
        if (panel) {
          panel.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
        }
        this.renderTemplateCards();
      }

      setTimeout(() => {
        const target = document.getElementById(`template-${templateId}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.style.boxShadow = '0 0 0 2px var(--w-accent)';
          setTimeout(() => { target.style.boxShadow = ''; }, 2000);
        }
      }, 80);
    },

    highlightPlaceholders(text) {
      if (!text) return '';
      let s = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      s = s.replace(/(\[[^\]]+\])/g, '<span class="template-variable">$1</span>');
      s = s.replace(/(题目相关词)/g, '<span class="template-variable" style="color:var(--w-accent);border-bottom-color:var(--w-accent)">$1</span>');
      return s;
    },

    /* ==========================================================================
       Tab 3: 大作文功能句库
       ========================================================================== */
    renderBigEssay() {
      const panel = this.container.querySelector('#panelBigEssay');
      const sections = this.getData().bigEssaySections || {};
      const groups = [
        { title: '第一段 · 引题与描述模板', list: sections.firstParagraph || [] },
        { title: '第二段 · 六大常考专题论证', list: sections.secondParagraph || [] },
        { title: '第三段 · 总结建议与展望', list: sections.thirdParagraph || [] }
      ];
      if (!panel) return;

      panel.innerHTML = groups.map(g => `
        <div class="paper-sheet">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong>${g.title}</strong>
            </div>
          </div>
          ${g.list.map(item => {
            const sentences = item.sentences || [];
            return `
              <div class="paper-section">
                <div class="paper-section-head">
                  <div>
                    <span class="paper-section-title">${item.name}</span>
                    <span style="font-size:0.9em;color:var(--w-muted);margin-left:8px">${item.chartType || item.category || ''}</span>
                  </div>
                  <button class="paper-text-btn copy-text-btn" data-text="${encodeURIComponent(item.mainTemplate ? item.mainTemplate.en : '')}">复制整段</button>
                </div>
                <div class="paper-en-text no-indent">${this.highlightPlaceholders(item.mainTemplate ? item.mainTemplate.en : '')}</div>
                <div class="paper-cn-text" style="text-indent:0">${item.mainTemplate ? item.mainTemplate.cn : ''}</div>
                ${sentences.length > 0 ? `
                  <details style="margin-top:12px">
                    <summary style="font-size:0.9em;font-weight:600;color:var(--w-accent);cursor:pointer">查看逐句功能句与真题例句 (${sentences.length}句)</summary>
                    <div style="margin-top:10px;display:flex;flex-direction:column;gap:8px">
                      ${sentences.map(s => `
                        <div class="clean-phrase-row copy-text-btn" data-text="${encodeURIComponent(s.pattern)}" title="点击复制该句模板">
                          <div style="flex:1">
                            <div class="clean-phrase-en">${s.num} ${this.highlightPlaceholders(s.pattern)}</div>
                            <div class="clean-phrase-zh">${s.cn}</div>
                            ${s.example ? `<div style="font-size:0.9em;color:var(--w-muted);margin-top:4px">例：${s.example}（${s.exampleCn || ''}）</div>` : ''}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </details>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `).join('');

      panel.querySelectorAll('.copy-text-btn').forEach(btn => {
        btn.addEventListener('click', () => this.copyToClipboard(decodeURIComponent(btn.dataset.text || ''), btn.tagName === 'BUTTON' ? btn : null));
      });
    },

    /* ==========================================================================
       Tab 4: 历年真题套用范文 (2010-2026)
       ========================================================================== */
    renderPastExams() {
      const panel = this.container.querySelector('#panelPastExams');
      const pastList = this.getData().pastExams || [];
      if (!panel) return;
      const years = Array.from(new Set(pastList.map(item => item.year))).sort((a, b) => b - a);

      panel.innerHTML = `
        <div class="writing-inline-bar">
          <div class="filter-group">
            <button class="filter-btn ${this.selectedExamSubject === '英语二' ? 'active' : ''}" id="btnExamE2">英语二 (17篇)</button>
            <button class="filter-btn ${this.selectedExamSubject === '英语一' ? 'active' : ''}" id="btnExamE1">英语一 (17篇)</button>
          </div>
          <div class="filter-group">
            <button class="paper-text-btn" id="btnPrevExamYear">上一年</button>
            <select id="examYearSelect" class="w-select">
              ${years.map(y => `<option value="${y}" ${y === this.selectedExamYear ? 'selected' : ''}>${y} 年真题</option>`).join('')}
            </select>
            <button class="paper-text-btn" id="btnNextExamYear">下一年</button>
          </div>
        </div>
        <div id="examArticleContainer"></div>
      `;

      this.renderExamArticle();
      this.bindPastExamEvents();
    },

    renderExamArticle() {
      const container = this.container.querySelector('#examArticleContainer');
      const pastList = this.getData().pastExams || [];
      if (!container) return;

      const exam = pastList.find(item => item.exam === this.selectedExamSubject && item.year === this.selectedExamYear)
                || pastList.find(item => item.exam === this.selectedExamSubject)
                || pastList[0];

      if (!exam) {
        container.innerHTML = `<div class="paper-sheet" style="padding:40px;text-align:center;color:var(--w-muted)">暂无范文</div>`;
        return;
      }

      const enParas = (exam.enText || '').split(/\n\n+/);
      const cnParas = (exam.cnText || '').split(/\n\n+/);
      const paraNames = ['第一段 · 材料与引题', '第二段 · 分析与论述', '第三段 · 总结与建议'];

      container.innerHTML = `
        <div class="paper-sheet">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong>${exam.year}年 ${exam.exam} · ${exam.title}</strong>
              <span style="font-size:0.9em;color:var(--w-muted)">${exam.chartType || ''}</span>
            </div>
            <div class="paper-toolbar-right">
              <label class="w-switch-label">
                <input type="checkbox" class="w-switch-input" id="pastExamCnToggle" ${this.pastExamShowCn ? 'checked' : ''}>
                <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                <span>中英对照</span>
              </label>
              <label class="w-switch-label">
                <input type="checkbox" class="w-switch-input" id="pastExamOriginToggle" ${this.pastExamShowOrigins ? 'checked' : ''}>
                <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                <span>来源与审题</span>
              </label>
            </div>
          </div>

          ${enParas.map((ep, idx) => `
            <div class="paper-section">
              <div class="paper-section-head">
                <span class="paper-section-title">${paraNames[idx] || ('第' + (idx+1) + '段')}</span>
                <button class="paper-swap-btn copy-exam-para" data-raw="${encodeURIComponent(ep)}" title="复制本段">⇄</button>
              </div>
              <div class="paper-en-text">${ep}</div>
              ${this.pastExamShowCn && cnParas[idx] ? `<div class="paper-cn-text">${cnParas[idx]}</div>` : ''}
            </div>
          `).join('')}

          ${this.pastExamShowOrigins ? `
            <div class="paper-section">
              <div class="paper-section-head">
                <span class="paper-section-title">套用思路、来源拆解与真题图表</span>
                ${exam.exam === '英语二' ? `<button class="paper-text-btn practice-jump-btn" data-year="${exam.year}" data-part="writing_b">进入答题卡模考</button>` : ''}
              </div>
              ${exam.strategy ? `<div class="paper-note-text" style="margin-top:0;margin-bottom:8px"><strong>套用思路：</strong>${exam.strategy}</div>` : ''}
              ${exam.origins ? `<div class="paper-note-text" style="white-space:pre-wrap">${exam.origins}</div>` : ''}
              ${exam.exam === '英语二' ? `
                <div style="margin-top:12px">
                  <img src="images/charts/chart_${exam.year}.jpg" alt="${exam.title}" style="max-width:100%;border-radius:6px;border:1px solid var(--w-line)" onerror="this.style.display='none'" />
                </div>
              ` : ''}
            </div>
          ` : ''}

          <div class="paper-footer">
            <div class="paper-footer-stats">
              <span>英文词数 <strong>${exam.wordCount || '-'}</strong></span>
              <span>排版建议 <strong>三段齐头式</strong></span>
            </div>
            <button class="paper-text-btn" id="copyFullExamEssayBtn">复制全文</button>
          </div>
        </div>
      `;

      const cnT = container.querySelector('#pastExamCnToggle');
      if (cnT) cnT.addEventListener('change', (e) => { this.pastExamShowCn = !!e.target.checked; this.renderExamArticle(); });

      const orT = container.querySelector('#pastExamOriginToggle');
      if (orT) orT.addEventListener('change', (e) => { this.pastExamShowOrigins = !!e.target.checked; this.renderExamArticle(); });

      container.querySelectorAll('.copy-exam-para').forEach(b => {
        b.addEventListener('click', () => this.copyToClipboard(decodeURIComponent(b.dataset.raw || ''), b));
      });

      const copyAll = container.querySelector('#copyFullExamEssayBtn');
      if (copyAll) copyAll.addEventListener('click', () => this.copyToClipboard(exam.enText || '', copyAll));

      const jumpBtn = container.querySelector('.practice-jump-btn');
      if (jumpBtn) {
        jumpBtn.addEventListener('click', () => {
          if (window.loadSectionFromWriting) {
            window.loadSectionFromWriting(jumpBtn.getAttribute('data-part'), jumpBtn.getAttribute('data-year'));
          }
        });
      }
    },

    bindPastExamEvents() {
      const panel = this.container.querySelector('#panelPastExams');
      if (!panel) return;
      const e2Btn = panel.querySelector('#btnExamE2');
      const e1Btn = panel.querySelector('#btnExamE1');
      const yearSelect = panel.querySelector('#examYearSelect');
      const prevBtn = panel.querySelector('#btnPrevExamYear');
      const nextBtn = panel.querySelector('#btnNextExamYear');

      if (e2Btn && e1Btn) {
        e2Btn.addEventListener('click', () => {
          e2Btn.classList.add('active'); e1Btn.classList.remove('active');
          this.selectedExamSubject = '英语二'; this.renderExamArticle();
        });
        e1Btn.addEventListener('click', () => {
          e1Btn.classList.add('active'); e2Btn.classList.remove('active');
          this.selectedExamSubject = '英语一'; this.renderExamArticle();
        });
      }

      if (yearSelect) {
        yearSelect.addEventListener('change', (e) => {
          this.selectedExamYear = parseInt(e.target.value, 10);
          this.renderExamArticle();
        });
      }
      if (prevBtn && yearSelect) {
        prevBtn.addEventListener('click', () => {
          if (yearSelect.selectedIndex < yearSelect.options.length - 1) {
            yearSelect.selectedIndex += 1;
            this.selectedExamYear = parseInt(yearSelect.value, 10);
            this.renderExamArticle();
          }
        });
      }
      if (nextBtn && yearSelect) {
        nextBtn.addEventListener('click', () => {
          if (yearSelect.selectedIndex > 0) {
            yearSelect.selectedIndex -= 1;
            this.selectedExamYear = parseInt(yearSelect.value, 10);
            this.renderExamArticle();
          }
        });
      }
    },

    /* ==========================================================================
       Tab 5: 主题词与换词矩阵
       ========================================================================== */
    renderThemeKeywords() {
      const panel = this.container.querySelector('#panelThemeKeywords');
      if (!panel) return;
      panel.innerHTML = `
        <div class="writing-inline-bar">
          <div class="filter-group">
            <button class="filter-btn ${this.selectedKeywordSubject === '英语二' ? 'active' : ''}" id="btnKwE2">英语二主题词</button>
            <button class="filter-btn ${this.selectedKeywordSubject === '英语一' ? 'active' : ''}" id="btnKwE1">英语一主题词</button>
          </div>
        </div>
        <div id="keywordsListContainer"></div>
      `;
      this.renderKeywordsList();
      this.bindThemeKeywordsEvents();
    },

    renderKeywordsList() {
      const container = this.container.querySelector('#keywordsListContainer');
      const allYears = (this.getData().themeKeywords && this.getData().themeKeywords.years) || [];
      if (!container) return;

      const list = allYears.filter(item => item.exam === this.selectedKeywordSubject).sort((a, b) => b.year - a.year);
      container.innerHTML = list.map(item => `
        <div class="paper-sheet">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong>${item.year}年 ${item.exam} · ${item.topic}</strong>
            </div>
          </div>
          <div class="paper-section">
            <div style="font-size:0.9em;color:var(--w-muted);margin-bottom:8px">核心主题词 3 选 1</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
              ${(item.themeOptions || []).map(opt => `<span class="slot-blank" style="cursor:default">${opt}</span>`).join('')}
            </div>
            ${Array.isArray(item.replacements) && item.replacements.length > 0 ? `
              <div class="clean-table-wrap">
                <table class="clean-table">
                  <thead>
                    <tr><th style="width:90px">成分</th><th style="width:180px">中文</th><th>地道英文表达</th></tr>
                  </thead>
                  <tbody>
                    ${item.replacements.map(r => `<tr><td><strong>${r.role}</strong></td><td>${r.cn}</td><td>${r.en}</td></tr>`).join('')}
                  </tbody>
                </table>
              </div>
            ` : ''}
            ${item.approach ? `<div class="paper-note-text"><strong>思路：</strong>${item.approach}</div>` : ''}
            ${item.tips ? `<div class="paper-note-text"><strong>避坑：</strong>${item.tips}</div>` : ''}
          </div>
        </div>
      `).join('');
    },

    bindThemeKeywordsEvents() {
      const panel = this.container.querySelector('#panelThemeKeywords');
      if (!panel) return;
      const e2Btn = panel.querySelector('#btnKwE2');
      const e1Btn = panel.querySelector('#btnKwE1');
      if (e2Btn && e1Btn) {
        e2Btn.addEventListener('click', () => {
          e2Btn.classList.add('active'); e1Btn.classList.remove('active');
          this.selectedKeywordSubject = '英语二'; this.renderKeywordsList();
        });
        e1Btn.addEventListener('click', () => {
          e1Btn.classList.add('active'); e2Btn.classList.remove('active');
          this.selectedKeywordSubject = '英语一'; this.renderKeywordsList();
        });
      }
    },

    /* ==========================================================================
       Tab 6: 原版 PDF 资料下载
       ========================================================================== */
    renderMaterials() {
      const panel = this.container.querySelector('#panelMaterials');
      const list = this.getData().materialsDownload || [];
      if (!panel) return;

      panel.innerHTML = `
        <div class="paper-sheet">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong>功能句体系原版 PDF 资料归档</strong>
            </div>
          </div>
          <div class="clean-table-wrap">
            <table class="clean-table">
              <thead>
                <tr><th>资料名称与说明</th><th style="width:120px">规格</th><th style="width:180px">操作</th></tr>
              </thead>
              <tbody>
                ${list.map(item => `
                  <tr>
                    <td>
                      <div style="font-weight:600;color:var(--w-ink)">${item.title}</div>
                      <div style="font-size:0.9em;color:var(--w-muted);margin-top:3px">${item.desc || ''}</div>
                    </td>
                    <td style="font-size:0.9em;color:var(--w-muted)">${item.size} · ${item.pages}页</td>
                    <td>
                      <a href="${item.path}" target="_blank" rel="noopener noreferrer" class="clean-link-btn">预览</a>
                      <a href="${item.path}" download="${item.title}.pdf" class="clean-link-btn" style="margin-left:10px">下载</a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    /* ==========================================================================
       Utility: Copy to Clipboard
       ========================================================================== */
    copyToClipboard(text, btnElement) {
      if (!text) return;
      const performCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          return Promise.resolve();
        }
      };

      performCopy().then(() => {
        if (btnElement) {
          const originalText = btnElement.innerHTML;
          btnElement.innerHTML = '已复制 ✓';
          setTimeout(() => { btnElement.innerHTML = originalText; }, 1600);
        }
        if (typeof window.showToast === 'function') {
          window.showToast('已复制到剪贴板');
        }
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    }
  };

  window.loadSectionFromWriting = function(sectionId, year) {
    if (window.AppState) {
      window.AppState.mode = 'practice';
      window.AppState.year = Number(year);
      window.AppState.textId = sectionId;
      window.AppState.savedStepIndex = 0;

      document.body.classList.remove('mode-writing');
      document.body.classList.add('mode-practice');
      const writingSection = document.getElementById('writingSection');
      if (writingSection) {
        writingSection.style.display = 'none';
        writingSection.inert = true;
      }
      const writingBtn = document.getElementById('writingModeBtn');
      if (writingBtn) writingBtn.classList.remove('active');
      const practiceBtn = document.getElementById('practiceModeBtn');
      if (practiceBtn) practiceBtn.classList.add('active');

      const yearSelect = document.getElementById('yearSelect');
      if (yearSelect) yearSelect.value = String(year);

      if (typeof window.loadCurrentText === 'function') {
        window.loadCurrentText();
      } else if (window.WritingRenderer) {
        window.WritingRenderer.render(year, sectionId, 'practice');
      }
    }
  };

  window.WritingModule = WritingModule;
})(window);
