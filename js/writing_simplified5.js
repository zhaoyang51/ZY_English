/**
 * ZY_English New Simplified 5-Template Interactive Workspace
 * 写作宝典体系三：新简化版5套万能模板（2020-2026英二全适配）
 */
(function(window) {
  'use strict';

  const WritingSimplified5Module = {
    container: null,
    activeTab: 's5_t1', // 's5_t1'..'s5_t5' | 's5_matrix'
    previewMode: 'blank', // 'blank' | 'exam'
    selectedYear: 2026,
    showHighlight: true,
    showCn: true,
    showPrompt: false,
    customSlots: {}, // optional user overrides per year or blank mode

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

    getEffectiveSlots() {
      const data = this.getData();
      const mapping = (data.examMappings && data.examMappings[this.selectedYear]) || {};
      const base = (this.previewMode === 'exam' && mapping.slots) ? Object.assign({}, mapping.slots) : {};
      const overrides = this.customSlots[this.previewMode === 'exam' ? String(this.selectedYear) : 'blank'] || {};
      const merged = Object.assign({}, base, overrides);
      if (merged.theme && !overrides.themeCap) {
        merged.themeCap = this.capFirst(merged.theme);
      }
      return merged;
    },

    buildPlainParagraph(tplText, slots) {
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
        return val || labels[k] || `【${k}】`;
      });
    },

    buildRenderedParagraph(tplText, slots) {
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
          return `<span class="slot-blank s5-slot-trigger" data-slot="${baseKey}" title="点击填入或参考20-26真题表达">【${esc(label)}】</span>`;
        }
        if (this.showHighlight) {
          return `<span class="pr-var s5-slot-trigger ${isPrompt ? 'is-prompt-data' : ''}" data-slot="${baseKey}" title="点击修改【${esc(label)}】"><span class="pr-var-tag">${esc(label)}</span>${esc(val)}</span>`;
        }
        return `<span class="s5-slot-trigger" data-slot="${baseKey}" style="cursor:pointer;border-bottom:1px dashed var(--w-border)" title="点击修改【${esc(label)}】">${esc(val)}</span>`;
      });
    },

    renderTemplatePanel(host) {
      const data = this.getData();
      const templates = data.templates || [];
      const tpl = templates.find(t => t.id === this.activeTab) || templates[0];
      if (!tpl) return;

      const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
      const examInfo = (data.examMappings && data.examMappings[this.selectedYear]) || {};
      const slots = this.getEffectiveSlots();

      const p1Plain = this.buildPlainParagraph(tpl.p1, slots);
      const p2Plain = this.buildPlainParagraph(tpl.p2, slots);
      const p3Plain = this.buildPlainParagraph(tpl.p3, slots);
      const fullPlain = `${p1Plain}\n\n${p2Plain}\n\n${p3Plain}`;
      const wordCount = fullPlain.trim().split(/\s+/).filter(Boolean).length;

      const paraItems = [
        { title: '第一段 · 图表描述与点题', html: this.buildRenderedParagraph(tpl.p1, slots), plain: p1Plain, cn: tpl.cn.p1 },
        { title: '第二段 · 个人与社会双层论证', html: this.buildRenderedParagraph(tpl.p2, slots), plain: p2Plain, cn: tpl.cn.p2 },
        { title: '第三段 · 总结与倡导', html: this.buildRenderedParagraph(tpl.p3, slots), plain: p3Plain, cn: tpl.cn.p3 }
      ];

      const promptObj = (window.WRITING_PROMPTS && window.WRITING_PROMPTS.e2_part_b && window.WRITING_PROMPTS.e2_part_b[this.selectedYear]) || {};
      const directionsEn = promptObj.directionsEn || '';

      host.innerHTML = `
        <div class="writing-inline-bar">
          <div class="filter-group">
            <button class="filter-btn s5-mode-btn ${this.previewMode === 'blank' ? 'active' : ''}" data-mode="blank">仅看【】空白模板</button>
            <button class="filter-btn s5-mode-btn ${this.previewMode === 'exam' ? 'active' : ''}" data-mode="exam">套用真题检验</button>
          </div>
          <div class="filter-group">
            ${years.map(y => `
              <button class="filter-btn s5-year-btn ${this.previewMode === 'exam' && this.selectedYear === y ? 'active' : ''}" data-year="${y}">${y}</button>
            `).join('')}
          </div>
        </div>

        <div class="paper-sheet">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong style="font-size:1em">${tpl.name}</strong>
              <span style="font-size:0.88em;color:var(--w-muted)">${this.previewMode === 'exam' ? `${this.selectedYear} 年：${examInfo.title || ''}（${examInfo.topicZh || ''}）` : tpl.badge}</span>
            </div>
            <div class="paper-toolbar-right">
              <label class="w-switch-label">
                <input type="checkbox" class="w-switch-input" id="s5HighlightToggle" ${this.showHighlight ? 'checked' : ''}>
                <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                <span>标注替换</span>
              </label>
              ${this.previewMode === 'exam' ? `
                <label class="w-switch-label">
                  <input type="checkbox" class="w-switch-input" id="s5PromptToggle" ${this.showPrompt ? 'checked' : ''}>
                  <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                  <span>真题题目</span>
                </label>
              ` : ''}
              <label class="w-switch-label">
                <input type="checkbox" class="w-switch-input" id="s5CnToggle" ${this.showCn ? 'checked' : ''}>
                <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                <span>中英对照</span>
              </label>
              <button class="paper-text-btn" id="s5ResetSlotsBtn" title="恢复当前视图默认内容">重置槽位</button>
            </div>
          </div>

          ${this.showHighlight ? `
            <div class="pr-legend-bar" role="note" aria-label="槽位图例">
              <span class="pr-legend-item"><span class="pr-legend-sample-fixed">常规字体</span> = 固定背诵模板</span>
              <span class="pr-legend-item"><span class="pr-var"><span class="pr-var-tag">主题/行为</span>蓝框槽位</span> = 仅需替换【主题词】【具体行为】</span>
              <span class="pr-legend-item"><span class="pr-var is-prompt-data"><span class="pr-var-tag">题面/数据</span>绿框槽位</span> = 首段看图直填（点击任意槽位可自由改写或挑选真题句）</span>
            </div>
          ` : ''}

          <div class="paper-section" style="padding-top:14px;padding-bottom:14px">
            <div class="paper-note-text" style="margin-top:0">
              <strong>模板特点：</strong>${this.escapeHtml(tpl.summary)}<br>
              <strong>填空语法：</strong>${this.escapeHtml(tpl.grammarNote)}
            </div>
          </div>

          ${this.previewMode === 'exam' && this.showPrompt ? `
            <div class="paper-section">
              <div class="paper-section-head">
                <span class="paper-section-title">${this.selectedYear} 年英语二真题 · 48. Directions</span>
                <span style="font-size:0.84em;color:var(--w-muted)">${examInfo.chartInfo || ''}</span>
              </div>
              ${directionsEn ? `<div class="paper-en-text no-indent" style="white-space:pre-wrap;font-size:0.9em;line-height:1.7;margin-bottom:12px">${this.escapeHtml(directionsEn)}</div>` : ''}
              <div class="pr-prompt-chart-box" style="max-width:520px;margin:0 auto">
                <img src="images/charts/chart_${this.selectedYear}.jpg" alt="${this.selectedYear}年真题图表" onerror="this.parentElement.style.display='none'" />
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
              <span>当前词数 <strong>${wordCount}</strong></span>
              <span>可变核心槽位 <strong>仅 3 类（图表数据 / 主题词 / 具体行为）</strong></span>
            </div>
            <button class="paper-text-btn" id="s5CopyAllBtn" data-raw="${encodeURIComponent(fullPlain)}">复制全文</button>
          </div>
        </div>
      `;

      host.querySelectorAll('.s5-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.previewMode = btn.dataset.mode === 'exam' ? 'exam' : 'blank';
          this.renderTemplatePanel(host);
        });
      });

      host.querySelectorAll('.s5-year-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectedYear = Number(btn.dataset.year);
          this.previewMode = 'exam';
          this.renderTemplatePanel(host);
        });
      });

      const hlT = host.querySelector('#s5HighlightToggle');
      if (hlT) hlT.addEventListener('change', (e) => { this.showHighlight = !!e.target.checked; this.renderTemplatePanel(host); });

      const prT = host.querySelector('#s5PromptToggle');
      if (prT) prT.addEventListener('change', (e) => { this.showPrompt = !!e.target.checked; this.renderTemplatePanel(host); });

      const cnT = host.querySelector('#s5CnToggle');
      if (cnT) cnT.addEventListener('change', (e) => { this.showCn = !!e.target.checked; this.renderTemplatePanel(host); });

      const resetBtn = host.querySelector('#s5ResetSlotsBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          const scopeKey = this.previewMode === 'exam' ? String(this.selectedYear) : 'blank';
          delete this.customSlots[scopeKey];
          this.renderTemplatePanel(host);
        });
      }

      host.querySelectorAll('.s5-copy-para, #s5CopyAllBtn').forEach(btn => {
        btn.addEventListener('click', () => this.copyText(decodeURIComponent(btn.dataset.raw || ''), btn));
      });

      host.querySelectorAll('.s5-slot-trigger').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openSlotPopover(el.dataset.slot, host);
        });
      });
    },

    openSlotPopover(slotKey, host) {
      const existingBd = document.getElementById('slotPopoverBackdrop');
      const existingPop = document.getElementById('slotPopover');
      if (existingBd) existingBd.remove();
      if (existingPop) existingPop.remove();

      const data = this.getData();
      const meta = (data.slotsMeta || []).find(m => m.key === slotKey) || { key: slotKey, label: slotKey, hint: '' };
      const curSlots = this.getEffectiveSlots();
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
            <strong>编辑槽位：【${this.escapeHtml(meta.label)}】</strong>
            <div style="font-size:0.8em;color:var(--w-muted);margin-top:2px">${this.escapeHtml(meta.hint || '')}</div>
          </div>
          <button class="paper-icon-btn" id="s5PopClose">✕</button>
        </div>
        <div class="slot-popover-body">
          <div class="slot-popover-custom">
            <input type="text" class="w-input" id="s5PopInput" value="${this.escapeHtml(currentVal)}" placeholder="输入自定义英文表达（留空则恢复默认【】）" style="flex:1">
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
        const scopeKey = this.previewMode === 'exam' ? String(this.selectedYear) : 'blank';
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
              <strong>2020–2026 年英语二大作文 · 3 类核心槽位速查表</strong>
              <span style="font-size:0.88em;color:var(--w-muted)">背熟 5 套模板中任意 1 套，只需按此表逻辑替换【主题词】【具体行为】与【首段数据】即可全覆盖</span>
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
                          <strong>${this.escapeHtml(s.theme || '')}</strong><br>
                          <span style="font-size:0.85em;color:var(--w-muted)">${this.escapeHtml(m.topicZh || '')}</span>
                        </td>
                        <td>${this.escapeHtml(s.behavior || '')}</td>
                        <td style="font-size:0.9em">
                          <span style="font-weight:600">${this.escapeHtml(s.chartType || '')} (${this.escapeHtml(s.relation || '')})</span><br>
                          <span style="color:var(--w-muted)">${this.escapeHtml(s.dataDesc || '')}</span>
                        </td>
                        <td>
                          <button type="button" class="clean-link-btn s5-jump-exam" data-year="${y}">套用检验</button>
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
          this.previewMode = 'exam';
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
