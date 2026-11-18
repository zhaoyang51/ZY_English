/**
 * ZY_English New Simplified 5-Template Interactive Workspace
 * 写作宝典体系三：新简化版5套万能模板（2020-2026英二全适配）
 */
(function(window) {
  'use strict';

  const WritingSimplified5Module = {
    container: null,
    activeTab: 's5_t1', // 's5_t1'..'s5_t5' | 's5_matrix'
    viewScope: 'all', // 'all' (空白模板 + 20-26全部7年套用) | 'blank' | 'exam' (单年精练)
    selectedYear: 2026,
    showHighlight: true,
    showCn: false,
    showPrompt: false,
    customSlots: {}, // optional user overrides keyed by 'blank' or year string

    getData() {
      return window.WRITING_SIMPLIFIED5_DATA || { templates: [], examMappings: {}, slotsMeta: [] };
    },

    mount(containerEl, initialYear) {
      this.container = containerEl;
      if (!this.container) return;
      const y = Number(initialYear);
      if (y >= 2020 && y <= 2026) this.selectedYear = y;
      this.render();
    },

    onYearChange(year) {
      const y = Number(year);
      if (y >= 2020 && y <= 2026) {
        this.selectedYear = y;
        if (this.container) this.renderActiveTab();
      }
    },

    escapeHtml(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },

    capFirst(str) {
      const s = String(str || '').trim();
      if (!s) return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
    },

    copyText(text, btnEl) {
      if (window.WritingModule && window.WritingModule.copyToClipboard) {
        window.WritingModule.copyToClipboard(text, btnEl);
      }
    },

    render() {
      const data = this.getData();
      const templates = data.templates || [];
      if (!this.container) return;

      this.container.innerHTML = `
        <nav class="writing-nav-tabs s5-nav-tabs" role="tablist">
          ${templates.map(t => `
            <button class="writing-tab-btn s5-tab-btn ${this.activeTab === t.id ? 'active' : ''}" data-s5tab="${t.id}" role="tab">${t.shortName}</button>
          `).join('')}
          <button class="writing-tab-btn s5-tab-btn ${this.activeTab === 's5_matrix' ? 'active' : ''}" data-s5tab="s5_matrix" role="tab">20-26 替换词表</button>
        </nav>
        <div class="writing-tab-panel active" id="s5PanelHost" role="tabpanel"></div>
      `;

      this.container.querySelectorAll('.s5-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.activeTab = btn.dataset.s5tab;
          this.container.querySelectorAll('.s5-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.s5tab === this.activeTab);
          });
          this.renderActiveTab();
          const host = this.container.querySelector('#s5PanelHost');
          if (host) host.scrollTop = 0;
        });
      });

      this.renderActiveTab();
    },

    renderActiveTab() {
      const host = this.container && this.container.querySelector('#s5PanelHost');
      if (!host) return;
      if (this.activeTab === 's5_matrix') {
        this.renderMatrixPanel(host);
      } else {
        this.renderTemplatePanel(host);
      }
    },

    getSlotsForScope(scopeKey) {
      const data = this.getData();
      const isBlank = scopeKey === 'blank';
      const mapping = (!isBlank && data.examMappings && data.examMappings[Number(scopeKey)]) || {};
      const base = (!isBlank && mapping.slots) ? Object.assign({}, mapping.slots) : {};
      const overrides = this.customSlots[scopeKey] || {};
      const merged = Object.assign({}, base, overrides);
      if (merged.theme && !overrides.themeCap) {
        merged.themeCap = this.capFirst(merged.theme);
      }
      return merged;
    },

    /**
     * Build plain text for copying. When wrapBrackets is true, substituted values are enclosed in 【...】.
     */
    buildPlainParagraph(tplText, slots, wrapBrackets) {
      const labels = {
        chartType: '【图表类型】',
        relation: '【changes/differences】',
        theme: '【主题词】',
        themeCap: '【主题词】',
        dataDesc: '【图表数据描述】',
        behavior: '【具体行为】'
      };
      return String(tplText || '').replace(/\{\{(\w+)\}\}/g, (_, k) => {
        const val = (slots[k] || '').trim();
        if (!val) return labels[k] || `【${k}】`;
        return wrapBrackets ? `【${val}】` : val;
      });
    },

    /**
     * Render paragraph HTML. Filled exam slots always display 【...】 around the substituted English.
     */
    buildRenderedParagraph(tplText, slots, scopeKey) {
      const esc = (s) => this.escapeHtml(s);
      const slotLabels = {
        chartType: '图表类型',
        relation: '趋势/差异',
        theme: '主题词',
        themeCap: '主题词',
        dataDesc: '图表数据描述',
        behavior: '具体行为'
      };
      const promptKeys = new Set(['chartType', 'relation', 'dataDesc']);

      return esc(String(tplText || '')).replace(/\{\{(\w+)\}\}/g, (_, key) => {
        const baseKey = key === 'themeCap' ? 'theme' : key;
        const val = (slots[key] || '').trim();
        const label = slotLabels[key] || key;
        const isPrompt = promptKeys.has(baseKey);

        if (!val) {
          return `<span class="slot-blank s5-slot-trigger" data-scope="${esc(scopeKey)}" data-slot="${baseKey}" title="点击填入或参考20-26真题表达">【${esc(label)}】</span>`;
        }
        if (this.showHighlight) {
          return `<span class="pr-var s5-slot-trigger ${isPrompt ? 'is-prompt-data' : ''}" data-scope="${esc(scopeKey)}" data-slot="${baseKey}" title="点击修改【${esc(label)}】"><span class="pr-var-tag">${esc(label)}</span>【${esc(val)}】</span>`;
        }
        return `<span class="s5-slot-trigger" data-scope="${esc(scopeKey)}" data-slot="${baseKey}" style="cursor:pointer;font-weight:600" title="点击修改【${esc(label)}】">【${esc(val)}】</span>`;
      });
    },

    renderEssaySheetHtml(tpl, scopeKey) {
      const data = this.getData();
      const isBlank = scopeKey === 'blank';
      const yearNum = Number(scopeKey);
      const examInfo = (!isBlank && data.examMappings && data.examMappings[yearNum]) || {};
      const slots = this.getSlotsForScope(scopeKey);

      const p1Plain = this.buildPlainParagraph(tpl.p1, slots, false);
      const p2Plain = this.buildPlainParagraph(tpl.p2, slots, false);
      const p3Plain = this.buildPlainParagraph(tpl.p3, slots, false);
      const fullPlain = `${p1Plain}\n\n${p2Plain}\n\n${p3Plain}`;

      const fullMarked = [
        this.buildPlainParagraph(tpl.p1, slots, true),
        this.buildPlainParagraph(tpl.p2, slots, true),
        this.buildPlainParagraph(tpl.p3, slots, true)
      ].join('\n\n');

      const wordCount = fullPlain.trim().split(/\s+/).filter(Boolean).length;

      const paraItems = [
        { title: '第一段 · 图表描述与点题', html: this.buildRenderedParagraph(tpl.p1, slots, scopeKey), plain: this.buildPlainParagraph(tpl.p1, slots, !isBlank), cn: tpl.cn.p1 },
        { title: '第二段 · 个人与社会双层论证', html: this.buildRenderedParagraph(tpl.p2, slots, scopeKey), plain: this.buildPlainParagraph(tpl.p2, slots, !isBlank), cn: tpl.cn.p2 },
        { title: '第三段 · 总结与倡导', html: this.buildRenderedParagraph(tpl.p3, slots, scopeKey), plain: this.buildPlainParagraph(tpl.p3, slots, !isBlank), cn: tpl.cn.p3 }
      ];

      const promptObj = (!isBlank && window.WRITING_PROMPTS && window.WRITING_PROMPTS.e2_part_b && window.WRITING_PROMPTS.e2_part_b[yearNum]) || {};
      const directionsEn = promptObj.directionsEn || '';

      return `
        <div class="paper-sheet s5-essay-card" data-year="${isBlank ? 'blank' : yearNum}">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong style="font-size:0.98em">${isBlank ? `${tpl.name} · 空白模板` : `${yearNum} 年英语二实操 · ${examInfo.title || ''}`}</strong>
              <span style="font-size:0.86em;color:var(--w-muted)">${isBlank ? tpl.badge : `${examInfo.topicZh || ''} ｜ ${examInfo.chartInfo || ''}`}</span>
            </div>
            <div class="paper-toolbar-right">
              ${isBlank ? `
                <button class="paper-text-btn s5-reset-scope-btn" data-scope="blank" title="清空自定义试填">清空试填</button>
              ` : `
                <button class="paper-text-btn s5-copy-marked-btn" data-raw="${encodeURIComponent(fullMarked)}" title="复制带【】标注的英文套写">复制带【】版</button>
                <button class="paper-text-btn s5-copy-clean-btn" data-raw="${encodeURIComponent(fullPlain)}" title="复制纯英文范文">复制纯英文</button>
              `}
            </div>
          </div>

          ${isBlank ? `
            <div class="paper-section" style="padding-top:14px;padding-bottom:14px">
              <div class="paper-note-text" style="margin-top:0">
                <strong>模板特点：</strong>${this.escapeHtml(tpl.summary)}<br>
                <strong>填空语法：</strong>${this.escapeHtml(tpl.grammarNote)}
              </div>
            </div>
          ` : ''}

          ${!isBlank && this.showPrompt ? `
            <div class="paper-section">
              <div class="paper-section-head">
                <span class="paper-section-title">${yearNum} 年真题原题 · 48. Directions</span>
              </div>
              ${directionsEn ? `<div class="paper-en-text no-indent" style="white-space:pre-wrap;font-size:0.9em;line-height:1.7;margin-bottom:12px">${this.escapeHtml(directionsEn)}</div>` : ''}
              <div class="pr-prompt-chart-box" style="max-width:500px;margin:0 auto">
                <img src="images/charts/chart_${yearNum}.jpg" alt="${yearNum}年真题图表" onerror="this.parentElement.style.display='none'" />
              </div>
            </div>
          ` : ''}

          ${paraItems.map(p => `
            <div class="paper-section">
              <div class="paper-section-head">
                <span class="paper-section-title">${p.title}</span>
                <button class="paper-swap-btn s5-copy-para" data-raw="${encodeURIComponent(p.plain)}" title="复制本段">⇄</button>
              </div>
              <div class="paper-en-text">${p.html}</div>
              ${this.showCn ? `<div class="paper-cn-text">${this.escapeHtml(p.cn)}</div>` : ''}
            </div>
          `).join('')}

          <div class="paper-footer">
            <div class="paper-footer-stats">
              <span>${isBlank ? '待填词槽 <strong>3 类核心【】</strong>' : `英文词数 <strong>${wordCount}</strong>`}</span>
              <span>${isBlank ? '点击任意【】空白可试填或挑选历年真题表达' : '英文中【】部分即为本篇替换内容'}</span>
            </div>
            ${isBlank ? `<button class="paper-text-btn s5-copy-clean-btn" data-raw="${encodeURIComponent(fullPlain)}">复制空白模板</button>` : ''}
          </div>
        </div>
      `;
    },

    renderTemplatePanel(host) {
      const data = this.getData();
      const templates = data.templates || [];
      const tpl = templates.find(t => t.id === this.activeTab) || templates[0];
      if (!tpl) return;

      const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
      let sheetsHtml = '';

      if (this.viewScope === 'blank') {
        sheetsHtml = this.renderEssaySheetHtml(tpl, 'blank');
      } else if (this.viewScope === 'exam') {
        sheetsHtml = this.renderEssaySheetHtml(tpl, String(this.selectedYear));
      } else {
        // 'all': blank template card at top + all 7 real exams (2026 -> 2020) applied directly below
        sheetsHtml = this.renderEssaySheetHtml(tpl, 'blank') +
          years.map(y => this.renderEssaySheetHtml(tpl, String(y))).join('');
      }

      host.innerHTML = `
        <div class="writing-inline-bar">
          <div class="filter-group">
            <button class="filter-btn s5-scope-btn ${this.viewScope === 'all' ? 'active' : ''}" data-scope="all">模板 + 20-26全部使用</button>
            <button class="filter-btn s5-scope-btn ${this.viewScope === 'blank' ? 'active' : ''}" data-scope="blank">仅看空白模板</button>
          </div>
          <div class="filter-group">
            ${years.map(y => `
              <button class="filter-btn s5-year-btn ${this.viewScope === 'exam' && this.selectedYear === y ? 'active' : ''}" data-year="${y}">${y}</button>
            `).join('')}
          </div>
          <div class="filter-group" style="margin-left:auto;gap:12px">
            <label class="w-switch-label">
              <input type="checkbox" class="w-switch-input" id="s5HighlightToggle" ${this.showHighlight ? 'checked' : ''}>
              <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
              <span>高亮标签</span>
            </label>
            ${this.viewScope !== 'blank' ? `
              <label class="w-switch-label">
                <input type="checkbox" class="w-switch-input" id="s5PromptToggle" ${this.showPrompt ? 'checked' : ''}>
                <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                <span>真题题目</span>
              </label>
            ` : ''}
            <label class="w-switch-label">
              <input type="checkbox" class="w-switch-input" id="s5CnToggle" ${this.showCn ? 'checked' : ''}>
              <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
              <span>中文翻译</span>
            </label>
          </div>
        </div>

        ${sheetsHtml}
      `;

      host.querySelectorAll('.s5-scope-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.viewScope = btn.dataset.scope;
          this.renderTemplatePanel(host);
          host.scrollTop = 0;
        });
      });

      host.querySelectorAll('.s5-year-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectedYear = Number(btn.dataset.year);
          this.viewScope = 'exam';
          this.renderTemplatePanel(host);
          host.scrollTop = 0;
        });
      });

      const hlT = host.querySelector('#s5HighlightToggle');
      if (hlT) hlT.addEventListener('change', (e) => { this.showHighlight = !!e.target.checked; this.renderTemplatePanel(host); });

      const prT = host.querySelector('#s5PromptToggle');
      if (prT) prT.addEventListener('change', (e) => { this.showPrompt = !!e.target.checked; this.renderTemplatePanel(host); });

      const cnT = host.querySelector('#s5CnToggle');
      if (cnT) cnT.addEventListener('change', (e) => { this.showCn = !!e.target.checked; this.renderTemplatePanel(host); });

      host.querySelectorAll('.s5-reset-scope-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          delete this.customSlots[btn.dataset.scope || 'blank'];
          this.renderTemplatePanel(host);
        });
      });

      host.querySelectorAll('.s5-copy-para, .s5-copy-marked-btn, .s5-copy-clean-btn').forEach(btn => {
        btn.addEventListener('click', () => this.copyText(decodeURIComponent(btn.dataset.raw || ''), btn));
      });

      host.querySelectorAll('.s5-slot-trigger').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openSlotPopover(el.dataset.slot, el.dataset.scope || 'blank', host);
        });
      });
    },

    openSlotPopover(slotKey, scopeKey, host) {
      const existingBd = document.getElementById('slotPopoverBackdrop');
      const existingPop = document.getElementById('slotPopover');
      if (existingBd) existingBd.remove();
      if (existingPop) existingPop.remove();

      const data = this.getData();
      const meta = (data.slotsMeta || []).find(m => m.key === slotKey) || { key: slotKey, label: slotKey, hint: '' };
      const curSlots = this.getSlotsForScope(scopeKey);
      const currentVal = curSlots[slotKey] || '';
      const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

      const options = [];
      if (slotKey === 'chartType') {
        ['bar chart', 'pie chart', 'line chart', 'table'].forEach(v => options.push({ label: v, val: v }));
      } else if (slotKey === 'relation') {
        [{ label: 'differences（静态比例对比）', val: 'differences' }, { label: 'changes（动态年份变化）', val: 'changes' }].forEach(o => options.push(o));
      } else {
        years.forEach(y => {
          const m = data.examMappings && data.examMappings[y];
          if (m && m.slots && m.slots[slotKey]) {
            options.push({ label: `${y} 年 · ${m.title}`, val: m.slots[slotKey] });
          }
        });
      }

      const backdrop = document.createElement('div');
      backdrop.id = 'slotPopoverBackdrop';
      backdrop.className = 'slot-popover-backdrop';

      const pop = document.createElement('div');
      pop.id = 'slotPopover';
      pop.className = 'slot-popover';
      pop.innerHTML = `
        <div class="slot-popover-head">
          <div>
            <strong>编辑槽位：【${this.escapeHtml(meta.label)}】${scopeKey !== 'blank' ? `（${scopeKey}年）` : ''}</strong>
            <div style="font-size:0.8em;color:var(--w-muted);margin-top:2px">${this.escapeHtml(meta.hint || '')}</div>
          </div>
          <button class="paper-icon-btn" id="s5PopClose">✕</button>
        </div>
        <div class="slot-popover-body">
          <div class="slot-popover-custom">
            <input type="text" class="w-input" id="s5PopInput" value="${this.escapeHtml(currentVal)}" placeholder="输入自定义英文表达（留空则恢复默认）" style="flex:1">
            <button class="paper-text-btn" id="s5PopApply">应用</button>
          </div>
          <div style="font-size:0.82em;font-weight:700;color:var(--w-muted);margin-bottom:8px">点击快速填入历年真题参考表达：</div>
          <div class="slot-popover-list">
            ${options.map(opt => `
              <button type="button" class="slot-popover-opt s5-pop-opt" data-val="${encodeURIComponent(opt.val)}">
                <span class="opt-en">${this.escapeHtml(opt.val)}</span>
                <span class="opt-zh">${this.escapeHtml(opt.label)}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;

      document.body.appendChild(backdrop);
      document.body.appendChild(pop);

      const rectWidth = Math.min(480, window.innerWidth - 24);
      pop.style.left = Math.max(12, Math.round((window.innerWidth - rectWidth) / 2)) + 'px';
      pop.style.top = Math.max(24, Math.round(window.innerHeight * 0.14)) + 'px';

      const close = () => {
        backdrop.remove();
        pop.remove();
      };

      const applyVal = (val) => {
        if (!this.customSlots[scopeKey]) this.customSlots[scopeKey] = {};
        const cleaned = String(val || '').trim();
        this.customSlots[scopeKey][slotKey] = cleaned;
        if (slotKey === 'theme') {
          this.customSlots[scopeKey].themeCap = cleaned ? this.capFirst(cleaned) : '';
        }
        close();
        this.renderTemplatePanel(host);
      };

      backdrop.addEventListener('click', close);
      pop.querySelector('#s5PopClose').addEventListener('click', close);
      pop.querySelector('#s5PopApply').addEventListener('click', () => {
        applyVal(pop.querySelector('#s5PopInput').value);
      });
      pop.querySelector('#s5PopInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') applyVal(e.target.value);
        if (e.key === 'Escape') close();
      });
      pop.querySelectorAll('.s5-pop-opt').forEach(btn => {
        btn.addEventListener('click', () => applyVal(decodeURIComponent(btn.dataset.val || '')));
      });
    },

    renderMatrixPanel(host) {
      const data = this.getData();
      const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
      const templates = data.templates || [];

      host.innerHTML = `
        <div class="paper-sheet">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong>2020–2026 年英语二大作文 · 3 类核心替换槽位速查表</strong>
              <span style="font-size:0.88em;color:var(--w-muted)">背熟 5 套模板中任意 1 套，只需按此表替换【主题词】【具体行为】与【首段数据】即可全覆盖</span>
            </div>
          </div>
          <div class="paper-section" style="border-bottom:none">
            <div class="clean-table-wrap">
              <table class="clean-table">
                <thead>
                  <tr>
                    <th style="width:15%">年份与题目</th>
                    <th style="width:20%">【主题词】</th>
                    <th style="width:27%">【具体行为】（接 people/to 后）</th>
                    <th style="width:28%">首段【图表类型 + 数据描述】</th>
                    <th style="width:10%">操作</th>
                  </tr>
                </thead>
                <tbody>
                  ${years.map(y => {
                    const m = (data.examMappings && data.examMappings[y]) || {};
                    const s = m.slots || {};
                    return `
                      <tr>
                        <td>
                          <strong>${y} 年</strong><br>
                          <span style="font-size:0.88em;color:var(--w-muted)">${this.escapeHtml(m.title || '')}</span>
                        </td>
                        <td>
                          <strong>【${this.escapeHtml(s.theme || '')}】</strong><br>
                          <span style="font-size:0.85em;color:var(--w-muted)">${this.escapeHtml(m.topicZh || '')}</span>
                        </td>
                        <td>【${this.escapeHtml(s.behavior || '')}】</td>
                        <td style="font-size:0.9em">
                          <span style="font-weight:600">【${this.escapeHtml(s.chartType || '')}】 / 【${this.escapeHtml(s.relation || '')}】</span><br>
                          <span style="color:var(--w-muted)">【${this.escapeHtml(s.dataDesc || '')}】</span>
                        </td>
                        <td>
                          <button type="button" class="clean-link-btn s5-jump-exam" data-year="${y}">单独查看</button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;

      host.querySelectorAll('.s5-jump-exam').forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectedYear = Number(btn.dataset.year);
          this.viewScope = 'exam';
          if (templates.length) {
            this.activeTab = templates[0].id;
            this.container.querySelectorAll('.s5-tab-btn').forEach(b => {
              b.classList.toggle('active', b.dataset.s5tab === this.activeTab);
            });
          }
          this.renderActiveTab();
          const newHost = this.container.querySelector('#s5PanelHost');
          if (newHost) newHost.scrollTop = 0;
        });
      });
    }
  };

  window.WritingSimplified5Module = WritingSimplified5Module;
})(window);
