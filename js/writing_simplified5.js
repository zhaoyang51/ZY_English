/**
 * ZY_English Fine-Tuned Simplified 5-Template Interactive Workspace
 * 写作宝典体系三：基于 HTML 简化版微调的 5 套万能模板（左题右练独立分栏 · 替换英文用【】标出）
 */
(function(window) {
  'use strict';

  const SLOT_LABELS = {
    chartType: '图表类型',
    relation: '比较关系',
    theme: '主题词',
    themeCap: '主题词',
    behavior: '具体行为',
    domain: '相关领域',
    surveyTarget: '调查对象',
    topItem: '最大类别',
    topPct: '最大比例',
    item2: '第二类别',
    item3: '第三类别',
    item4: '第四类别',
    item5: '第五类别',
    pct2: '第二比例',
    pct3: '第三比例',
    pct4: '第四比例',
    pct5: '第五比例',
    startYear: '起始年份',
    endYear: '终止年份',
    metric: '统计指标',
    subject: '统计对象',
    trendVerb: '变化方向',
    startVal: '起始比例',
    endVal: '终止比例',
    trendNote: '总体增幅',
    item1: '类别一',
    verb1: '变化一',
    start1: '起点一',
    end1: '终点一',
    verb2: '变化二',
    degree2: '幅度',
    start2: '起点二',
    end2: '终点二'
  };

  const CORE_BLUE_SLOTS = new Set(['theme', 'themeCap', 'behavior', 'domain']);

  const WritingSimplified5Module = {
    container: null,
    activeTab: 's5_t1', // 's5_t1'..'s5_t5' | 's5_matrix'
    viewScope: 'exam', // 'blank' | 'exam'
    selectedYear: 2026,
    showHighlight: true,
    showCn: true,
    customSlots: {},

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

    getFontSize() {
      return (window.WritingModule && window.WritingModule.fontSize) || 18;
    },

    stepFontSize(delta) {
      if (window.WritingModule && window.WritingModule.applyFontSize) {
        if (delta === 0) window.WritingModule.applyFontSize(18);
        else window.WritingModule.applyFontSize(this.getFontSize() + delta);
      }
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

    getP1Template(tpl, scopeKey) {
      if (scopeKey === 'blank') return tpl.p1_blank;
      const data = this.getData();
      const mapping = (data.examMappings && data.examMappings[Number(scopeKey)]) || {};
      const lead = tpl.p1Lead || 'The figures in the {{chartType}} reveal notable {{relation}} concerning {{theme}}.';
      return mapping.p1BodyTpl ? `${lead} ${mapping.p1BodyTpl}` : tpl.p1_blank;
    },

    getP1CnTemplate(tpl, scopeKey) {
      if (scopeKey === 'blank') return tpl.p1Cn_blank;
      const data = this.getData();
      const mapping = (data.examMappings && data.examMappings[Number(scopeKey)]) || {};
      const lead = tpl.p1CnLead || '{{chartType}}中的数据揭示了有关{{theme}}的显著{{relation}}。';
      return mapping.p1CnBodyTpl ? `${lead}${mapping.p1CnBodyTpl}` : tpl.p1Cn_blank;
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

    getCnSlotsForScope(scopeKey) {
      const data = this.getData();
      const isBlank = scopeKey === 'blank';
      const mapping = (!isBlank && data.examMappings && data.examMappings[Number(scopeKey)]) || {};
      const baseCn = (!isBlank && mapping.cnSlots) ? Object.assign({}, mapping.cnSlots) : {};
      const baseEn = (!isBlank && mapping.slots) ? mapping.slots : {};
      const overrides = this.customSlots[scopeKey] || {};
      const out = Object.assign({}, baseCn);

      // If user edited a slot with custom text or picked a preset from another year, reflect it in Chinese
      Object.keys(overrides).forEach(k => {
        const val = (overrides[k] || '').trim();
        if (!val) {
          delete out[k];
          return;
        }
        if (val === baseEn[k] && baseCn[k]) {
          out[k] = baseCn[k];
          return;
        }
        // Try matching preset Chinese translation across all years
        let matchedCn = '';
        if (k === 'chartType') {
          const map = { 'bar chart': '条形图', 'pie chart': '饼图', 'line chart': '折线图', 'table': '表格' };
          matchedCn = map[val] || val;
        } else if (k === 'relation') {
          const map = { differences: '差异', changes: '变化' };
          matchedCn = map[val] || val;
        } else {
          Object.keys(data.examMappings || {}).some(y => {
            const m = data.examMappings[y];
            if (m && m.slots && m.slots[k] === val && m.cnSlots && m.cnSlots[k]) {
              matchedCn = m.cnSlots[k];
              return true;
            }
            return false;
          });
        }
        out[k] = matchedCn || val;
      });
      return out;
    },

    buildPlainParagraph(tplText, slots) {
      return String(tplText || '').replace(/\{\{(\w+)\}\}/g, (_, k) => {
        const val = (slots[k] || '').trim();
        return val || `【${SLOT_LABELS[k] || k}】`;
      });
    },

    buildCnParagraphHtml(cnTplText, cnSlots) {
      const esc = (s) => this.escapeHtml(s);
      return esc(String(cnTplText || '')).replace(/\{\{(\w+)\}\}/g, (_, key) => {
        const baseKey = key === 'themeCap' ? 'theme' : key;
        const val = (cnSlots[baseKey] || '').trim();
        const label = SLOT_LABELS[key] || key;
        if (!val) {
          return `<span style="color:var(--w-ink);font-weight:600">【${esc(label)}】</span>`;
        }
        return `<span style="color:var(--w-ink);font-weight:600">【${esc(val)}】</span>`;
      });
    },

    buildRenderedParagraph(tplText, slots, scopeKey) {
      const esc = (s) => this.escapeHtml(s);
      return esc(String(tplText || '')).replace(/\{\{(\w+)\}\}/g, (_, key) => {
        const baseKey = key === 'themeCap' ? 'theme' : key;
        const val = (slots[key] || '').trim();
        const label = SLOT_LABELS[key] || key;
        const isPromptData = !CORE_BLUE_SLOTS.has(baseKey);
        const canEdit = CORE_BLUE_SLOTS.has(baseKey) || baseKey === 'chartType' || baseKey === 'relation';

        if (!val) {
          return `<span class="slot-blank ${canEdit ? 's5-slot-trigger' : ''}" data-scope="${esc(scopeKey)}" data-slot="${baseKey}" title="${canEdit ? '点击填入或试填历年表达' : esc(label)}">【${esc(label)}】</span>`;
        }
        const clickableCls = canEdit ? 's5-slot-trigger' : '';
        if (this.showHighlight) {
          return `<span class="pr-var ${clickableCls} ${isPromptData ? 'is-prompt-data' : ''}" data-scope="${esc(scopeKey)}" data-slot="${baseKey}" ${canEdit ? `title="点击修改【${esc(label)}】"` : ''}><span class="pr-var-tag">${esc(label)}</span>【${esc(val)}】</span>`;
        }
        return `<span class="${clickableCls}" data-scope="${esc(scopeKey)}" data-slot="${baseKey}" style="${canEdit ? 'cursor:pointer;' : ''}font-weight:600">【${esc(val)}】</span>`;
      });
    },

    renderLeftPromptHtml(yearNum) {
      const data = this.getData();
      const examInfo = (data.examMappings && data.examMappings[yearNum]) || {};
      const promptObj = (window.WRITING_PROMPTS && window.WRITING_PROMPTS.e2_part_b && window.WRITING_PROMPTS.e2_part_b[yearNum]) || {};
      const directionsEn = promptObj.directionsEn || `48. Directions:\nWrite an essay based on the chart below. In your essay, you should\n1) describe and interpret the chart, and\n2) give your comments.\nWrite your answer in about 150 words on the ANSWER SHEET. (15 points)`;

      return `
        <aside class="pr-split-left" aria-label="真题原题面板">
          <div class="paper-sheet pr-prompt-sheet">
            <div class="paper-toolbar">
              <div class="paper-toolbar-left">
                <strong style="font-size:0.96em">真题原题 · ${yearNum} 年</strong>
                <span style="font-size:0.84em;color:var(--w-muted)">${this.escapeHtml(examInfo.title || '')}</span>
              </div>
              <div class="paper-toolbar-right">
                <button class="paper-text-btn" id="s5MockExamBtn" data-year="${yearNum}">进入大作文套写</button>
              </div>
            </div>
            <div class="paper-section">
              <div class="paper-section-head" style="margin-bottom:10px">
                <span class="paper-section-title">48. Directions</span>
              </div>
              <div class="paper-en-text no-indent pr-prompt-directions">${this.escapeHtml(directionsEn)}</div>
              <div class="pr-prompt-chart-box">
                <img src="images/charts/chart_${yearNum}.jpg" alt="${yearNum}年英语二大作文真题图表：${this.escapeHtml(examInfo.title || '')}" onerror="this.parentElement.style.display='none'" />
              </div>
              ${examInfo.chartInfo ? `
                <div class="paper-note-text" style="margin-top:12px;font-size:0.86em">
                  <strong>图表要点：</strong>${this.escapeHtml(examInfo.chartInfo)}
                </div>
              ` : ''}
            </div>
          </div>
        </aside>
      `;
    },

    renderEssaySheetHtml(tpl, scopeKey) {
      const data = this.getData();
      const isBlank = scopeKey === 'blank';
      const yearNum = Number(scopeKey);
      const examInfo = (!isBlank && data.examMappings && data.examMappings[yearNum]) || {};
      const slots = this.getSlotsForScope(scopeKey);
      const cnSlots = this.getCnSlotsForScope(scopeKey);
      const p1Tpl = this.getP1Template(tpl, scopeKey);
      const p1CnTpl = this.getP1CnTemplate(tpl, scopeKey);

      const p1Plain = this.buildPlainParagraph(p1Tpl, slots);
      const p2Plain = this.buildPlainParagraph(tpl.p2, slots);
      const p3Plain = this.buildPlainParagraph(tpl.p3, slots);
      const fullPlain = `${p1Plain}\n\n${p2Plain}\n\n${p3Plain}`;
      const wordCount = fullPlain.trim().split(/\s+/).filter(Boolean).length;
      const needsDomain = tpl.p2.includes('{{domain}}');

      const paraItems = [
        { title: '第一段 · 图表数据与主题', html: this.buildRenderedParagraph(p1Tpl, slots, scopeKey), plain: p1Plain, cnHtml: this.buildCnParagraphHtml(p1CnTpl, cnSlots) },
        { title: '第二段 · 个人行为与政策社会论证', html: this.buildRenderedParagraph(tpl.p2, slots, scopeKey), plain: p2Plain, cnHtml: this.buildCnParagraphHtml(tpl.cn.p2, cnSlots) },
        { title: '第三段 · 总结与倡导', html: this.buildRenderedParagraph(tpl.p3, slots, scopeKey), plain: p3Plain, cnHtml: this.buildCnParagraphHtml(tpl.cn.p3, cnSlots) }
      ];

      return `
        <div class="paper-sheet s5-essay-card" data-year="${isBlank ? 'blank' : yearNum}">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong style="font-size:0.98em">${isBlank ? `${tpl.name}` : `${yearNum} 年英语二套写 · ${examInfo.title || ''}`}</strong>
              <span style="font-size:0.86em;color:var(--w-muted)">${isBlank ? tpl.badge : `${examInfo.topicZh || ''}`}</span>
            </div>
            <div class="paper-toolbar-right">
              ${isBlank ? `<button class="paper-text-btn s5-reset-scope-btn" data-scope="blank">清空试填</button>` : ''}
              <button class="paper-text-btn s5-copy-clean-btn" data-raw="${encodeURIComponent(fullPlain)}">复制</button>
            </div>
          </div>

          ${isBlank ? `
            <div class="paper-section" style="padding-top:14px;padding-bottom:14px">
              <div class="paper-note-text" style="margin-top:0">
                <strong>相比原 HTML 简化版的微调说明：</strong>${this.escapeHtml(tpl.tweakNote)}<br>
                <strong>填空语法：</strong>${this.escapeHtml(tpl.grammarNote)}
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
              ${this.showCn ? `<div class="paper-cn-text">${p.cnHtml}</div>` : ''}
            </div>
          `).join('')}

          <div class="paper-footer">
            <div class="paper-footer-stats">
              <span>${isBlank ? `P2/P3 核心【】槽位 <strong>${needsDomain ? '3 个（主题词/具体行为/相关领域）' : '仅 2 个（主题词/具体行为）'}</strong>` : `英文词数 <strong>${wordCount}</strong>`}</span>
              <span>${isBlank ? '点击【主题词】或【具体行为】可试填（可对照左侧真题图表）' : '英文与中文中【】部分即为对应替换内容'}</span>
            </div>
            <button class="paper-text-btn s5-copy-clean-btn" data-raw="${encodeURIComponent(fullPlain)}">复制</button>
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
      const scopeKey = this.viewScope === 'blank' ? 'blank' : String(this.selectedYear);
      const fontSize = this.getFontSize();

      host.innerHTML = `
        <div class="writing-inline-bar">
          <div class="filter-group">
            <button class="filter-btn s5-scope-btn ${this.viewScope === 'blank' ? 'active' : ''}" data-scope="blank">空白模板</button>
          </div>
          <div class="filter-group">
            ${years.map(y => `
              <button class="filter-btn s5-year-btn ${this.viewScope === 'exam' && this.selectedYear === y ? 'active' : ''}" data-year="${y}">${y}</button>
            `).join('')}
          </div>
          <div class="filter-group" style="margin-left:auto;gap:10px">
            <div class="s5-inline-font" role="group" aria-label="调整字体大小">
              <button type="button" class="font-step-btn" id="s5FontDecBtn" title="缩小字体">A-</button>
              <span class="font-size-val" id="s5FontVal" title="点击恢复默认 18px">${fontSize}px</span>
              <button type="button" class="font-step-btn" id="s5FontIncBtn" title="放大字体">A+</button>
            </div>
            <label class="w-switch-label">
              <input type="checkbox" class="w-switch-input" id="s5HighlightToggle" ${this.showHighlight ? 'checked' : ''}>
              <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
              <span>高亮标签</span>
            </label>
            <label class="w-switch-label">
              <input type="checkbox" class="w-switch-input" id="s5CnToggle" ${this.showCn ? 'checked' : ''}>
              <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
              <span>中文参考</span>
            </label>
          </div>
        </div>

        <div class="pr-split-layout s5-split-layout">
          ${this.renderLeftPromptHtml(this.selectedYear)}
          <div class="pr-split-right">
            ${this.renderEssaySheetHtml(tpl, scopeKey)}
          </div>
        </div>
      `;

      host.querySelectorAll('.s5-scope-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.viewScope = 'blank';
          this.renderTemplatePanel(host);
        });
      });

      host.querySelectorAll('.s5-year-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectedYear = Number(btn.dataset.year);
          this.viewScope = 'exam';
          this.renderTemplatePanel(host);
        });
      });

      const fDec = host.querySelector('#s5FontDecBtn');
      const fInc = host.querySelector('#s5FontIncBtn');
      const fVal = host.querySelector('#s5FontVal');
      if (fDec) fDec.addEventListener('click', () => this.stepFontSize(-1));
      if (fInc) fInc.addEventListener('click', () => this.stepFontSize(1));
      if (fVal) fVal.addEventListener('click', () => this.stepFontSize(0));

      const hlT = host.querySelector('#s5HighlightToggle');
      if (hlT) hlT.addEventListener('change', (e) => { this.showHighlight = !!e.target.checked; this.renderTemplatePanel(host); });

      const cnT = host.querySelector('#s5CnToggle');
      if (cnT) cnT.addEventListener('change', (e) => { this.showCn = !!e.target.checked; this.renderTemplatePanel(host); });

      const mockBtn = host.querySelector('#s5MockExamBtn');
      if (mockBtn) {
        mockBtn.addEventListener('click', () => {
          if (window.loadSectionFromWriting) {
            window.loadSectionFromWriting('writing_b', mockBtn.dataset.year);
          }
        });
      }

      host.querySelectorAll('.s5-reset-scope-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          delete this.customSlots[btn.dataset.scope || 'blank'];
          this.renderTemplatePanel(host);
        });
      });

      host.querySelectorAll('.s5-copy-para, .s5-copy-clean-btn').forEach(btn => {
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
      const meta = (data.slotsMeta || []).find(m => m.key === slotKey) || { key: slotKey, label: SLOT_LABELS[slotKey] || slotKey, hint: '' };
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
            const cnHint = (m.cnSlots && m.cnSlots[slotKey]) ? `（${m.cnSlots[slotKey]}）` : '';
            options.push({ label: `${y} 年 · ${m.title}${cnHint}`, val: m.slots[slotKey] });
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
          <div style="font-size:0.82em;font-weight:700;color:var(--w-muted);margin-bottom:8px">点击快速填入历年真题表达：</div>
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
              <strong>2020–2026 年英语二大作文 · HTML 简化版微调核心替换速查表</strong>
              <span style="font-size:0.88em;color:var(--w-muted)">微调模板 1–4 只需记忆【主题词】与【具体行为】（首段看图填写）；微调模板 5 仅多 1 个超短【相关领域】</span>
            </div>
          </div>
          <div class="paper-section" style="border-bottom:none">
            <div class="clean-table-wrap">
              <table class="clean-table">
                <thead>
                  <tr>
                    <th style="width:14%">年份与题目</th>
                    <th style="width:22%">【主题词】</th>
                    <th style="width:28%">【具体行为】（接 people 后）</th>
                    <th style="width:16%">【相关领域】（仅微调5）</th>
                    <th style="width:12%">首段图表类型</th>
                    <th style="width:8%">操作</th>
                  </tr>
                </thead>
                <tbody>
                  ${years.map(y => {
                    const m = (data.examMappings && data.examMappings[y]) || {};
                    const s = m.slots || {};
                    const c = m.cnSlots || {};
                    return `
                      <tr>
                        <td>
                          <strong>${y} 年</strong><br>
                          <span style="font-size:0.88em;color:var(--w-muted)">${this.escapeHtml(m.title || '')}</span>
                        </td>
                        <td>
                          <strong>【${this.escapeHtml(s.theme || '')}】</strong><br>
                          <span style="font-size:0.85em;color:var(--w-muted)">【${this.escapeHtml(c.theme || m.topicZh || '')}】</span>
                        </td>
                        <td>
                          【${this.escapeHtml(s.behavior || '')}】<br>
                          <span style="font-size:0.85em;color:var(--w-muted)">【${this.escapeHtml(c.behavior || '')}】</span>
                        </td>
                        <td>
                          【${this.escapeHtml(s.domain || '')}】<br>
                          <span style="font-size:0.85em;color:var(--w-muted)">【${this.escapeHtml(c.domain || '')}】</span>
                        </td>
                        <td style="font-size:0.9em">
                          <strong>【${this.escapeHtml(s.chartType || '')}】</strong><br>
                          <span style="color:var(--w-muted)">【${this.escapeHtml(c.chartType || '')}】</span>
                        </td>
                        <td>
                          <button type="button" class="clean-link-btn s5-jump-exam" data-year="${y}">查看套写</button>
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
