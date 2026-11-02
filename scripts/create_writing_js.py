# -*- coding: utf-8 -*-
"""
Generate js/writing.js for ZY_English
"""

content = r'''/**
 * ZY_English Writing Masterclass Module
 * 考研英语高分写作宝典交互系统
 * Integrates:
 * 1. 写作起步全流程与 AI 智能换词咒语
 * 2. 英语二历年小作文考情对照表 (2010-2025)
 * 3. 17 套中英对照三段式小作文模板 (10种基础 + 7种混合)
 * 4. 大作文段落功能句库 (首段3大类、第二段6大专题、第三段正反通用 + 110+精选功能句)
 * 5. 2010-2026 英语一 & 英语二全量 34 篇真题套用范文与逐句来源拆解
 * 6. 2010-2026 历年真题核心主题词矩阵与避坑提醒
 * 7. 5 份原版 PDF 资料在线预览与下载
 */

(function(window) {
  'use strict';

  const WritingModule = {
    initialized: false,
    container: null,
    currentTab: 'guide',
    selectedExamSubject: 'english2',
    selectedExamYear: '2025',
    smallEssayFilter: 'all',

    init(containerId, initialYear) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;

      if (initialYear) {
        this.selectedExamYear = String(initialYear);
      }

      if (!this.initialized) {
        this.renderShell();
        this.bindEvents();
        this.initialized = true;
      }

      this.switchTab(this.currentTab);
    },

    onYearChange(year) {
      this.selectedExamYear = String(year);
      if (this.currentTab === 'pastExams') {
        const yearSelect = document.getElementById('examYearSelect');
        if (yearSelect) yearSelect.value = String(year);
        this.renderExamArticle();
      }
    },

    renderShell() {
      const data = window.WritingData || {};
      this.container.innerHTML = `
        <!-- Header Banner -->
        <div class="writing-header-banner">
          <div class="writing-header-title">
            <span style="font-size:2.2em;line-height:1">✍️</span>
            <div>
              <h2>考研英语高分写作宝典</h2>
              <div class="writing-header-desc">
                精细结构化收录：起步全流程 · 17套小作文模板 · 6大专题大作文句库 · 2010-2026 全真范文 · 历年主题词矩阵 · 5大原版PDF资料
              </div>
            </div>
          </div>
          <div class="writing-header-badges">
            <span class="writing-badge badge-primary">英语一 & 英语二通用</span>
            <span class="writing-badge badge-success">2010—2026 全覆盖</span>
            <span class="writing-badge badge-warning">真题逐句拆解</span>
          </div>
        </div>

        <!-- Sub Navigation Tabs -->
        <nav class="writing-nav-tabs" id="writingNavTabs" role="tablist">
          <button class="writing-tab-btn active" data-tab="guide" role="tab">
            <span>🚀</span> 起步与流程
          </button>
          <button class="writing-tab-btn" data-tab="smallEssay" role="tab">
            <span>✉️</span> 小作文模板库
          </button>
          <button class="writing-tab-btn" data-tab="bigEssay" role="tab">
            <span>📊</span> 大作文功能句库
          </button>
          <button class="writing-tab-btn" data-tab="pastExams" role="tab">
            <span>🏆</span> 历年真题套用范文
          </button>
          <button class="writing-tab-btn" data-tab="themeKeywords" role="tab">
            <span>🏷️</span> 主题词与换词矩阵
          </button>
          <button class="writing-tab-btn" data-tab="materials" role="tab">
            <span>📥</span> 原始资料与下载
          </button>
        </nav>

        <!-- Content Panels -->
        <div class="writing-tab-panel active" id="panelGuide" role="tabpanel"></div>
        <div class="writing-tab-panel" id="panelSmallEssay" role="tabpanel"></div>
        <div class="writing-tab-panel" id="panelBigEssay" role="tabpanel"></div>
        <div class="writing-tab-panel" id="panelPastExams" role="tabpanel"></div>
        <div class="writing-tab-panel" id="panelThemeKeywords" role="tabpanel"></div>
        <div class="writing-tab-panel" id="panelMaterials" role="tabpanel"></div>
      `;

      this.renderGuide();
      this.renderSmallEssay();
      this.renderBigEssay();
      this.renderPastExams();
      this.renderThemeKeywords();
      this.renderMaterials();
    },

    bindEvents() {
      const tabs = this.container.querySelectorAll('.writing-tab-btn');
      tabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tabKey = btn.dataset.tab;
          if (tabKey) this.switchTab(tabKey);
        });
      });
    },

    switchTab(tabKey) {
      this.currentTab = tabKey;
      const tabs = this.container.querySelectorAll('.writing-tab-btn');
      tabs.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabKey);
      });

      const panels = this.container.querySelectorAll('.writing-tab-panel');
      panels.forEach(p => {
        p.classList.remove('active');
      });

      const targetPanel = this.container.querySelector(`#panel${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      // If switching to pastExams, sync year
      if (tabKey === 'pastExams') {
        const yearSelect = document.getElementById('examYearSelect');
        if (yearSelect && this.selectedExamYear) {
          yearSelect.value = this.selectedExamYear;
          this.renderExamArticle();
        }
      }
    },

    /* ==========================================================================
       Tab 1: 写作起步与流程 (Guide)
       ========================================================================== */
    renderGuide() {
      const panel = this.container.querySelector('#panelGuide');
      const data = (window.WritingData && window.WritingData.guide) || {};
      if (!panel) return;

      panel.innerHTML = `
        <div class="writing-grid-2">
          <!-- 小作文起步 -->
          <div class="writing-card">
            <div class="writing-card-header">
              <h3 class="writing-card-title">
                <span>✉️</span> ${data.smallEssaySteps ? data.smallEssaySteps.title : '小作文起步三步走'}
              </h3>
              <span class="writing-badge badge-primary">保7争8分</span>
            </div>
            <div class="writing-card-body">
              <p style="color:var(--muted);font-size:0.92em;margin-top:0">
                ${data.smallEssaySteps ? data.smallEssaySteps.description : ''}
              </p>
              <div class="steps-list">
                ${(data.smallEssaySteps && data.smallEssaySteps.steps ? data.smallEssaySteps.steps : []).map(s => `
                  <div class="step-item" style="margin-bottom:14px;padding:12px 14px;background:rgba(37,99,235,0.04);border-left:3px solid var(--accent);border-radius:4px">
                    <strong style="color:var(--accent);display:block;margin-bottom:4px">${s.step}：${s.name}</strong>
                    <div style="font-size:0.92em;line-height:1.6;color:var(--ink)">${s.detail}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- 大作文起步 -->
          <div class="writing-card">
            <div class="writing-card-header">
              <h3 class="writing-card-title">
                <span>📊</span> ${data.bigEssaySteps ? data.bigEssaySteps.title : '大作文套用全流程'}
              </h3>
              <span class="writing-badge badge-success">保12争13+分</span>
            </div>
            <div class="writing-card-body">
              <p style="color:var(--muted);font-size:0.92em;margin-top:0">
                ${data.bigEssaySteps ? data.bigEssaySteps.description : ''}
              </p>
              <div class="steps-list">
                ${(data.bigEssaySteps && data.bigEssaySteps.steps ? data.bigEssaySteps.steps : []).map(s => `
                  <div class="step-item" style="margin-bottom:14px;padding:12px 14px;background:rgba(16,185,129,0.04);border-left:3px solid var(--success);border-radius:4px">
                    <strong style="color:var(--success);display:block;margin-bottom:4px">${s.step}：${s.name}</strong>
                    <div style="font-size:0.92em;line-height:1.6;color:var(--ink)">${s.detail}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- AI 换词咒语 -->
        <div class="writing-card" style="border-left:4px solid #8b5cf6">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.4em">🤖</span>
              <h3 class="writing-card-title" style="margin:0">${data.aiPrompt ? data.aiPrompt.title : 'AI 智能换词咒语 (防雷同提分神器)'}</h3>
            </div>
            <button class="writing-copy-btn" id="copyAiPromptBtn">📋 一键复制提示词</button>
          </div>
          <div class="writing-card-body">
            <p style="color:var(--muted);font-size:0.92em;margin-top:0">
              ${data.aiPrompt ? data.aiPrompt.description : ''}
            </p>
            <div style="background:var(--code-bg, #1e293b);color:#f8fafc;padding:16px 20px;border-radius:8px;font-family:monospace;font-size:0.9em;line-height:1.7;white-space:pre-wrap;overflow-x:auto" id="aiPromptContent">${data.aiPrompt ? data.aiPrompt.promptText : ''}</div>
          </div>
        </div>

        <!-- 规范与常见问题 -->
        <div class="writing-grid-2">
          <!-- 字数与格式规范 -->
          <div class="writing-card">
            <div class="writing-card-header">
              <h3 class="writing-card-title">
                <span>📏</span> ${data.formatRules ? data.formatRules.title : '答卷排版与字数黄金法则'}
              </h3>
            </div>
            <div class="writing-card-body">
              <ul style="padding-left:18px;margin:0;line-height:1.8;font-size:0.92em;color:var(--ink)">
                ${(data.formatRules && data.formatRules.rules ? data.formatRules.rules : []).map(r => `
                  <li style="margin-bottom:10px">${r}</li>
                `).join('')}
              </ul>
            </div>
          </div>

          <!-- 常见问题答疑 -->
          <div class="writing-card">
            <div class="writing-card-header">
              <h3 class="writing-card-title">
                <span>💡</span> 常见疑问解答 (FAQ)
              </h3>
            </div>
            <div class="writing-card-body">
              ${(data.faq || []).map((f, idx) => `
                <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px dashed var(--line)">
                  <strong style="color:var(--ink);display:block;font-size:0.94em;margin-bottom:4px">
                    Q${idx+1}: ${f.question}
                  </strong>
                  <div style="color:var(--muted);font-size:0.9em;line-height:1.6">
                    A: ${f.answer}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      const copyBtn = panel.querySelector('#copyAiPromptBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const content = panel.querySelector('#aiPromptContent');
          if (content) {
            this.copyToClipboard(content.textContent, copyBtn);
          }
        });
      }
    },

    /* ==========================================================================
       Tab 2: 小作文模板库 (Small Essay Templates & History Table)
       ========================================================================== */
    renderSmallEssay() {
      const panel = this.container.querySelector('#panelSmallEssay');
      const data = window.WritingData || {};
      const historyList = data.smallEssayHistory || [];
      const templateList = data.smallEssayTemplates || [];
      if (!panel) return;

      panel.innerHTML = `
        <!-- Section 1: 历年考情对照表 (来自用户上传的图片与真题档案) -->
        <div class="writing-card" style="border-top:3px solid var(--accent)">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">📋</span>
              <div>
                <h3 class="writing-card-title" style="margin:0">英语二小作文历年形式与作文主题表 (2010—2025 全量考情对照)</h3>
                <div style="font-size:0.85em;color:var(--muted);margin-top:2px">
                  全面收录历年英语二应用文题型形态分布，点击“推荐模板”可直达下方精准对应三段式模板
                </div>
              </div>
            </div>
            <span class="writing-badge badge-primary">2010—2025 共 16 篇</span>
          </div>
          <div class="writing-card-body" style="padding:0">
            <div class="history-table-container">
              <table class="history-table">
                <thead>
                  <tr>
                    <th style="width:75px">年份</th>
                    <th style="width:110px">类型/形式</th>
                    <th>真题作文主题</th>
                    <th style="width:160px">推荐精准匹配模板</th>
                  </tr>
                </thead>
                <tbody>
                  ${historyList.map(item => `
                    <tr>
                      <td style="font-weight:700;color:var(--accent)">${item.year}</td>
                      <td>
                        <span class="history-type-badge">${item.type}</span>
                      </td>
                      <td style="line-height:1.5">${item.topic}</td>
                      <td>
                        <button class="template-jump-btn" data-tid="${item.recommendedTemplateId}">
                          👉 ${item.recommendedTemplate}
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 2: 17 套中英对照小作文模板 -->
        <div class="filter-bar" style="margin-top:26px">
          <div class="filter-group">
            <span style="font-weight:700;font-size:0.92em;color:var(--muted)">模板分类筛选:</span>
            <button class="filter-btn active" data-filter="all">全部 (17套)</button>
            <button class="filter-btn" data-filter="basic">10 种基础类型</button>
            <button class="filter-btn" data-filter="mixed">7 种混合类型</button>
          </div>
        </div>

        <div class="templates-container" id="templatesContainer" style="margin-top:16px">
          <!-- Dynamically populated -->
        </div>
      `;

      this.renderTemplateCards();
      this.bindSmallEssayEvents();
    },

    renderTemplateCards() {
      const container = this.container.querySelector('#templatesContainer');
      const templates = (window.WritingData && window.WritingData.smallEssayTemplates) || [];
      if (!container) return;

      const filter = this.smallEssayFilter;
      const filtered = templates.filter(t => {
        if (filter === 'basic') return t.category === 'basic';
        if (filter === 'mixed') return t.category === 'mixed';
        return true;
      });

      container.innerHTML = filtered.map(t => `
        <div class="writing-card template-card" id="template-${t.id}">
          <div class="writing-card-header">
            <div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span class="writing-badge ${t.category === 'mixed' ? 'badge-warning' : 'badge-primary'}">
                  ${t.categoryName}
                </span>
                <h3 class="writing-card-title" style="margin:0">${t.title}</h3>
                <span style="font-size:0.85em;color:var(--muted)">（${t.sentenceCount} 句三段式）</span>
              </div>
              <div style="font-size:0.85em;color:var(--muted);margin-top:4px">
                📌 适用场景：${t.scenario} | 来源：${t.source}
              </div>
            </div>
            <button class="writing-copy-btn copy-template-btn" data-content="${encodeURIComponent(t.englishTemplate)}">
              📋 复制英文模板
            </button>
          </div>
          <div class="writing-card-body">
            <div class="template-content-block">
              <strong style="color:var(--accent);display:block;margin-bottom:6px;font-size:0.92em">【英文模板 (带填空变量)】</strong>
              <div style="line-height:1.75;font-size:0.94em;color:var(--ink)">
                ${this.highlightPlaceholders(t.englishTemplate)}
              </div>
            </div>
            <div class="template-zh-block" style="margin-top:12px">
              <strong style="color:var(--muted);display:block;margin-bottom:6px;font-size:0.92em">【中文对照与变量解析】</strong>
              <div style="line-height:1.7;font-size:0.9em;color:var(--muted)">
                ${t.chineseTranslation}
              </div>
            </div>
          </div>
        </div>
      `).join('');

      // Bind copy buttons
      container.querySelectorAll('.copy-template-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const raw = decodeURIComponent(btn.dataset.content);
          this.copyToClipboard(raw, btn);
        });
      });
    },

    bindSmallEssayEvents() {
      const panel = this.container.querySelector('#panelSmallEssay');
      if (!panel) return;

      // Filter buttons
      panel.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          panel.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.smallEssayFilter = btn.dataset.filter || 'all';
          this.renderTemplateCards();
        });
      });

      // Jump buttons in history table
      panel.querySelectorAll('.template-jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tid = btn.dataset.tid;
          if (tid) this.scrollToTemplate(tid);
        });
      });
    },

    scrollToTemplate(templateId) {
      // Switch filter to all if needed
      if (this.smallEssayFilter !== 'all') {
        this.smallEssayFilter = 'all';
        const panel = this.container.querySelector('#panelSmallEssay');
        if (panel) {
          panel.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.filter === 'all');
          });
        }
        this.renderTemplateCards();
      }

      setTimeout(() => {
        const target = document.getElementById(`template-${templateId}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.style.transition = 'outline 0.3s ease, box-shadow 0.3s ease';
          target.style.outline = '2px solid var(--accent)';
          target.style.boxShadow = '0 0 15px rgba(37,99,235,0.3)';
          setTimeout(() => {
            target.style.outline = '';
            target.style.boxShadow = '';
          }, 2000);
        }
      }, 100);
    },

    highlightPlaceholders(text) {
      // Replace [ ... ] with highlighted spans
      return text.replace(/\[([^\]]+)\]/g, '<span class="template-variable">[$1]</span>');
    },

    /* ==========================================================================
       Tab 3: 大作文功能句库 (Big Essay Paragraphs & Sentences)
       ========================================================================== */
    renderBigEssay() {
      const panel = this.container.querySelector('#panelBigEssay');
      const data = (window.WritingData && window.WritingData.bigEssaySections) || {};
      if (!panel) return;

      const p1 = data.paragraph1 || [];
      const p2 = data.paragraph2 || [];
      const p3 = data.paragraph3 || [];
      const sentences = data.highScoringSentences || [];

      panel.innerHTML = `
        <!-- 第一段：图表/图画首段套用 -->
        <div class="writing-card">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">📈</span>
              <h3 class="writing-card-title" style="margin:0">第一段：首段引出与数据/图画描绘模板 (3 大题型分类)</h3>
            </div>
            <span class="writing-badge badge-primary">静态 · 动态 · 图画</span>
          </div>
          <div class="writing-card-body">
            <div class="writing-grid-3">
              ${p1.map(item => `
                <div style="background:var(--surface-hover, rgba(0,0,0,0.02));border:1px solid var(--border);border-radius:8px;padding:14px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <strong style="color:var(--accent)">${item.type}</strong>
                    <button class="writing-copy-btn copy-block-btn" data-content="${encodeURIComponent(item.template)}" style="font-size:0.75em;padding:2px 8px">复制</button>
                  </div>
                  <div style="font-size:0.85em;color:var(--muted);margin-bottom:8px">适用：${item.applicableTo}</div>
                  <div style="font-size:0.9em;line-height:1.6;color:var(--ink);background:var(--surface);padding:8px 10px;border-radius:6px;border:1px solid var(--line);margin-bottom:8px">
                    ${this.highlightPlaceholders(item.template)}
                  </div>
                  <div style="font-size:0.82em;color:var(--muted);line-height:1.5">
                    译：${item.chinese}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 第二段：6 大常考专题模板 -->
        <div class="writing-card">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">🎯</span>
              <h3 class="writing-card-title" style="margin:0">第二段：核心原因与论述 (6 大常考专题归类)</h3>
            </div>
            <span class="writing-badge badge-success">考研核心 6 大母题</span>
          </div>
          <div class="writing-card-body">
            <div class="writing-grid-2">
              ${p2.map(item => `
                <div style="background:var(--surface-hover, rgba(0,0,0,0.02));border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:12px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                    <strong style="color:var(--ink);font-size:1.02em">${item.topic}</strong>
                    <button class="writing-copy-btn copy-block-btn" data-content="${encodeURIComponent(item.template)}" style="font-size:0.75em;padding:2px 8px">复制模板</button>
                  </div>
                  <div style="font-size:0.84em;color:var(--muted);margin-bottom:8px">
                    历年考频：${item.frequency} | 适用真题：${item.applicableYears}
                  </div>
                  <div style="font-size:0.9em;line-height:1.65;color:var(--ink);background:var(--surface);padding:10px 12px;border-radius:6px;border:1px solid var(--line);margin-bottom:8px">
                    ${this.highlightPlaceholders(item.template)}
                  </div>
                  <div style="font-size:0.84em;color:var(--muted);line-height:1.5">
                    <strong>套用思路：</strong>${item.logicExplain}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 第三段：总结建议与展望 -->
        <div class="writing-card">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">🏁</span>
              <h3 class="writing-card-title" style="margin:0">第三段：总结建议与未来展望模板 (正向支持 / 反面引导)</h3>
            </div>
            <span class="writing-badge badge-warning">正反两套速通</span>
          </div>
          <div class="writing-card-body">
            <div class="writing-grid-2">
              ${p3.map(item => `
                <div style="background:var(--surface-hover, rgba(0,0,0,0.02));border:1px solid var(--border);border-radius:8px;padding:16px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                    <strong style="color:var(--accent);font-size:1.02em">${item.type}</strong>
                    <button class="writing-copy-btn copy-block-btn" data-content="${encodeURIComponent(item.template)}" style="font-size:0.75em;padding:2px 8px">复制</button>
                  </div>
                  <div style="font-size:0.85em;color:var(--muted);margin-bottom:8px">适用：${item.applicableTo}</div>
                  <div style="font-size:0.9em;line-height:1.65;color:var(--ink);background:var(--surface);padding:10px 12px;border-radius:6px;border:1px solid var(--line);margin-bottom:8px">
                    ${this.highlightPlaceholders(item.template)}
                  </div>
                  <div style="font-size:0.84em;color:var(--muted);line-height:1.5">
                    译：${item.chinese}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 精选 110+ 高分功能句库 -->
        <div class="writing-card">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">💎</span>
              <h3 class="writing-card-title" style="margin:0">精选 110+ 高分功能句与情境替换库</h3>
            </div>
            <span class="writing-badge badge-primary">自由组装 · 告别模板感</span>
          </div>
          <div class="writing-card-body">
            <p style="color:var(--muted);font-size:0.9em;margin-top:0">
              按作文段落与行文功能梳理的黄金表达，考试时可根据主题词自由拆分与组合。
            </p>
            <div class="sentence-list">
              ${sentences.map((cat, idx) => `
                <div style="margin-bottom:20px;border-bottom:1px solid var(--line);padding-bottom:16px">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
                    <span class="writing-badge badge-primary">${cat.section}</span>
                    <strong style="color:var(--ink);font-size:1.02em">${cat.category}</strong>
                  </div>
                  ${(cat.items || []).map((sent, sIdx) => `
                    <div class="sentence-item" style="padding:8px 12px;margin-bottom:6px;background:var(--surface);border-radius:6px;display:flex;justify-content:space-between;align-items:center;gap:10px">
                      <div style="flex:1">
                        <div style="font-size:0.92em;color:var(--ink);line-height:1.5">${sent.en}</div>
                        <div style="font-size:0.82em;color:var(--muted);margin-top:2px">${sent.zh}</div>
                      </div>
                      <button class="writing-copy-btn copy-sentence-btn" data-content="${encodeURIComponent(sent.en)}" style="font-size:0.75em;padding:2px 8px;flex-shrink:0">复制</button>
                    </div>
                  `).join('')}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      // Bind copy buttons
      panel.querySelectorAll('.copy-block-btn, .copy-sentence-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const raw = decodeURIComponent(btn.dataset.content);
          this.copyToClipboard(raw, btn);
        });
      });
    },

    /* ==========================================================================
       Tab 4: 历年真题套用范文 (Past Exams 2010-2026)
       ========================================================================== */
    renderPastExams() {
      const panel = this.container.querySelector('#panelPastExams');
      const pastData = (window.WritingData && window.WritingData.pastExams) || {};
      if (!panel) return;

      const e2List = pastData.english2 || [];
      const years = e2List.map(item => item.year).reverse(); // 2026 -> 2010

      panel.innerHTML = `
        <div class="exam-header" style="margin-bottom:20px">
          <div class="filter-bar" style="border:none;padding:0;margin:0">
            <!-- 科目切换 -->
            <div class="filter-group">
              <span style="font-weight:700;font-size:0.92em;color:var(--muted)">试卷科目:</span>
              <button class="filter-btn active" id="btnSubjectE2">英语二 (图表作文)</button>
              <button class="filter-btn" id="btnSubjectE1">英语一 (图画作文)</button>
            </div>

            <!-- 年份选择 -->
            <div class="filter-group" style="margin-left:auto">
              <span style="font-weight:700;font-size:0.92em;color:var(--muted)">选择年份:</span>
              <select id="examYearSelect" class="select-control" style="padding:6px 14px;font-weight:700;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--ink)">
                ${years.map(y => `<option value="${y}" ${String(y) === String(this.selectedExamYear) ? 'selected' : ''}>${y} 年真题</option>`).join('')}
              </select>
            </div>
          </div>
        </div>

        <div id="examArticleContainer">
          <!-- Dynamically populated -->
        </div>
      `;

      this.renderExamArticle();
      this.bindPastExamEvents();
    },

    renderExamArticle() {
      const container = this.container.querySelector('#examArticleContainer');
      const pastData = (window.WritingData && window.WritingData.pastExams) || {};
      if (!container) return;

      const subjectKey = this.selectedExamSubject;
      const list = pastData[subjectKey] || [];
      const currentYear = this.selectedExamYear;

      const exam = list.find(item => String(item.year) === String(currentYear)) || list[list.length - 1];
      if (!exam) {
        container.innerHTML = `<div style="padding:30px;text-align:center;color:var(--muted)">暂无该年份作文范文</div>`;
        return;
      }

      container.innerHTML = `
        <div class="writing-card" style="border-left:4px solid var(--accent)">
          <div class="writing-card-header">
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                <span class="writing-badge badge-primary">${subjectKey === 'english2' ? '英语二' : '英语一'} · ${exam.year} 年真题</span>
                <h3 class="writing-card-title" style="margin:0">${exam.topic}</h3>
              </div>
              <div style="font-size:0.88em;color:var(--muted);margin-top:6px">
                🏷️ 核心主题词：<strong style="color:var(--accent)">${exam.themeKeyword}</strong> | 题型类别：${exam.chartType || '图表/图画'}
              </div>
            </div>
            <button class="writing-copy-btn" id="copyFullEssayBtn">
              📋 一键复制整篇范文
            </button>
          </div>

          <div class="writing-card-body">
            <!-- 套用逻辑说明 -->
            <div style="background:rgba(37,99,235,0.05);border-radius:6px;padding:12px 16px;margin-bottom:18px;border:1px dashed var(--accent)">
              <div style="font-size:0.92em;color:var(--ink);line-height:1.6">
                <strong>💡 秘密哥套用思路：</strong>${exam.logic}
              </div>
              ${exam.wordCount ? `<div style="font-size:0.85em;color:var(--muted);margin-top:4px">字数统计：约 ${exam.wordCount} 词（黄金字数区间，齐头式排版无涂改）</div>` : ''}
            </div>

            <!-- 三段范文及逐句解析 -->
            <div class="essay-sections">
              <!-- Paragraph 1 -->
              <div class="essay-p-block" style="margin-bottom:18px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <span class="writing-badge badge-primary">第一段：引出与描绘</span>
                  <button class="writing-copy-btn copy-para-btn" data-content="${encodeURIComponent(exam.fullEnglish ? exam.fullEnglish.p1 : '')}" style="font-size:0.75em;padding:2px 8px">复制本段</button>
                </div>
                <div style="font-size:0.95em;line-height:1.75;color:var(--ink);background:var(--surface);padding:12px 14px;border-radius:6px;border:1px solid var(--line);margin-bottom:6px">
                  ${exam.fullEnglish ? exam.fullEnglish.p1 : ''}
                </div>
                <div style="font-size:0.88em;color:var(--muted);line-height:1.6">
                  <strong>译文：</strong>${exam.fullChinese ? exam.fullChinese.p1 : ''}
                </div>
                ${exam.breakdown && exam.breakdown.p1 ? `
                  <div style="margin-top:6px;font-size:0.82em;color:var(--muted);background:var(--surface-hover, rgba(0,0,0,0.02));padding:8px 10px;border-radius:4px">
                    ${exam.breakdown.p1.map((b, i) => `<div>第${i+1}句：${b.role} ➔ <span style="color:var(--accent)">${b.origin}</span></div>`).join('')}
                  </div>
                ` : ''}
              </div>

              <!-- Paragraph 2 -->
              <div class="essay-p-block" style="margin-bottom:18px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <span class="writing-badge badge-success">第二段：核心原因论述</span>
                  <button class="writing-copy-btn copy-para-btn" data-content="${encodeURIComponent(exam.fullEnglish ? exam.fullEnglish.p2 : '')}" style="font-size:0.75em;padding:2px 8px">复制本段</button>
                </div>
                <div style="font-size:0.95em;line-height:1.75;color:var(--ink);background:var(--surface);padding:12px 14px;border-radius:6px;border:1px solid var(--line);margin-bottom:6px">
                  ${exam.fullEnglish ? exam.fullEnglish.p2 : ''}
                </div>
                <div style="font-size:0.88em;color:var(--muted);line-height:1.6">
                  <strong>译文：</strong>${exam.fullChinese ? exam.fullChinese.p2 : ''}
                </div>
                ${exam.breakdown && exam.breakdown.p2 ? `
                  <div style="margin-top:6px;font-size:0.82em;color:var(--muted);background:var(--surface-hover, rgba(0,0,0,0.02));padding:8px 10px;border-radius:4px">
                    ${exam.breakdown.p2.map((b, i) => `<div>第${i+1}句：${b.role} ➔ <span style="color:var(--success)">${b.origin}</span></div>`).join('')}
                  </div>
                ` : ''}
              </div>

              <!-- Paragraph 3 -->
              <div class="essay-p-block" style="margin-bottom:14px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <span class="writing-badge badge-warning">第三段：总结与建议</span>
                  <button class="writing-copy-btn copy-para-btn" data-content="${encodeURIComponent(exam.fullEnglish ? exam.fullEnglish.p3 : '')}" style="font-size:0.75em;padding:2px 8px">复制本段</button>
                </div>
                <div style="font-size:0.95em;line-height:1.75;color:var(--ink);background:var(--surface);padding:12px 14px;border-radius:6px;border:1px solid var(--line);margin-bottom:6px">
                  ${exam.fullEnglish ? exam.fullEnglish.p3 : ''}
                </div>
                <div style="font-size:0.88em;color:var(--muted);line-height:1.6">
                  <strong>译文：</strong>${exam.fullChinese ? exam.fullChinese.p3 : ''}
                </div>
                ${exam.breakdown && exam.breakdown.p3 ? `
                  <div style="margin-top:6px;font-size:0.82em;color:var(--muted);background:var(--surface-hover, rgba(0,0,0,0.02));padding:8px 10px;border-radius:4px">
                    ${exam.breakdown.p3.map((b, i) => `<div>第${i+1}句：${b.role} ➔ <span style="color:var(--warning)">${b.origin}</span></div>`).join('')}
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;

      // Bind full essay copy
      const copyAllBtn = container.querySelector('#copyFullEssayBtn');
      if (copyAllBtn) {
        copyAllBtn.addEventListener('click', () => {
          const text = [
            exam.fullEnglish ? exam.fullEnglish.p1 : '',
            exam.fullEnglish ? exam.fullEnglish.p2 : '',
            exam.fullEnglish ? exam.fullEnglish.p3 : ''
          ].join('\n\n');
          this.copyToClipboard(text, copyAllBtn);
        });
      }

      // Bind paragraph copy
      container.querySelectorAll('.copy-para-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const raw = decodeURIComponent(btn.dataset.content);
          this.copyToClipboard(raw, btn);
        });
      });
    },

    bindPastExamEvents() {
      const panel = this.container.querySelector('#panelPastExams');
      if (!panel) return;

      const e2Btn = panel.querySelector('#btnSubjectE2');
      const e1Btn = panel.querySelector('#btnSubjectE1');
      const yearSelect = panel.querySelector('#examYearSelect');

      if (e2Btn && e1Btn) {
        e2Btn.addEventListener('click', () => {
          e2Btn.classList.add('active');
          e1Btn.classList.remove('active');
          this.selectedExamSubject = 'english2';
          this.renderExamArticle();
        });

        e1Btn.addEventListener('click', () => {
          e1Btn.classList.add('active');
          e2Btn.classList.remove('active');
          this.selectedExamSubject = 'english1';
          this.renderExamArticle();
        });
      }

      if (yearSelect) {
        yearSelect.addEventListener('change', (e) => {
          this.selectedExamYear = e.target.value;
          this.renderExamArticle();
        });
      }
    },

    /* ==========================================================================
       Tab 5: 主题词与换词矩阵 (Theme Keywords & Traps)
       ========================================================================== */
    renderThemeKeywords() {
      const panel = this.container.querySelector('#panelThemeKeywords');
      const data = (window.WritingData && window.WritingData.themeKeywords) || {};
      if (!panel) return;

      const e2Keywords = data.english2 || [];
      const e1Keywords = data.english1 || [];
      const traps = data.avoidingTraps || [];

      panel.innerHTML = `
        <!-- 避坑指南 -->
        <div class="writing-card" style="border-left:4px solid #ef4444">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">⚠️</span>
              <h3 class="writing-card-title" style="margin:0">秘密哥考场避坑指南与扣分警示</h3>
            </div>
            <span class="writing-badge badge-warning">阅卷现场实测避坑</span>
          </div>
          <div class="writing-card-body">
            <div class="writing-grid-2">
              ${traps.map(item => `
                <div style="background:rgba(239,68,68,0.03);border:1px solid rgba(239,68,68,0.2);border-radius:6px;padding:12px 14px;margin-bottom:10px">
                  <strong style="color:#ef4444;display:block;margin-bottom:4px">🚫 ${item.trap}</strong>
                  <div style="font-size:0.9em;color:var(--ink);line-height:1.6">${item.solution}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 英语二 历年主题词 3 选 1 替换矩阵 -->
        <div class="writing-card">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">📊</span>
              <h3 class="writing-card-title" style="margin:0">英语二 历年真题核心主题词矩阵 (2010—2026 全量 3 选 1 换词)</h3>
            </div>
            <span class="writing-badge badge-primary">防重复高频替换</span>
          </div>
          <div class="writing-card-body" style="padding:0">
            <div class="history-table-container">
              <table class="history-table">
                <thead>
                  <tr>
                    <th style="width:70px">年份</th>
                    <th style="width:140px">真题题目</th>
                    <th>核心主题词 (首选)</th>
                    <th>替换词 Option 1</th>
                    <th>替换词 Option 2</th>
                    <th style="width:180px">套用锦囊与换词建议</th>
                  </tr>
                </thead>
                <tbody>
                  ${e2Keywords.map(k => `
                    <tr>
                      <td style="font-weight:700;color:var(--accent)">${k.year}</td>
                      <td style="font-weight:600">${k.topic}</td>
                      <td><code style="background:rgba(37,99,235,0.08);color:var(--accent);padding:2px 6px;border-radius:4px;font-weight:700">${k.keyword}</code></td>
                      <td><code>${k.alt1 || '-'}</code></td>
                      <td><code>${k.alt2 || '-'}</code></td>
                      <td style="font-size:0.88em;color:var(--muted)">${k.tip || '保持首段与次段词汇丰富度，避免全篇单调重复'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 英语一 历年主题词 3 选 1 替换矩阵 -->
        <div class="writing-card">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">🎨</span>
              <h3 class="writing-card-title" style="margin:0">英语一 历年图画真题核心主题词矩阵 (2010—2026 全量)</h3>
            </div>
            <span class="writing-badge badge-success">英语一经典图画</span>
          </div>
          <div class="writing-card-body" style="padding:0">
            <div class="history-table-container">
              <table class="history-table">
                <thead>
                  <tr>
                    <th style="width:70px">年份</th>
                    <th style="width:140px">真题题目</th>
                    <th>核心主题词 (首选)</th>
                    <th>替换词 Option 1</th>
                    <th>替换词 Option 2</th>
                    <th style="width:180px">套用锦囊与寓意阐述</th>
                  </tr>
                </thead>
                <tbody>
                  ${e1Keywords.map(k => `
                    <tr>
                      <td style="font-weight:700;color:var(--success)">${k.year}</td>
                      <td style="font-weight:600">${k.topic}</td>
                      <td><code style="background:rgba(16,185,129,0.08);color:var(--success);padding:2px 6px;border-radius:4px;font-weight:700">${k.keyword}</code></td>
                      <td><code>${k.alt1 || '-'}</code></td>
                      <td><code>${k.alt2 || '-'}</code></td>
                      <td style="font-size:0.88em;color:var(--muted)">${k.tip || '图画寓意深远，需紧扣首段象征意义'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    /* ==========================================================================
       Tab 6: 原始资料与下载 (Materials & PDF Previews)
       ========================================================================== */
    renderMaterials() {
      const panel = this.container.querySelector('#panelMaterials');
      const data = (window.WritingData && window.WritingData.materialsDownload) || [];
      if (!panel) return;

      panel.innerHTML = `
        <div class="writing-card" style="border-top:3px solid var(--accent)">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">📦</span>
              <div>
                <h3 class="writing-card-title" style="margin:0">原版写作高分资料电子书与 PDF 下载库</h3>
                <div style="font-size:0.85em;color:var(--muted);margin-top:2px">
                  系统已将 5 份核心高价值写作资料原件完整归档，支持直接在浏览器中打开预览或一键下载离线备考
                </div>
              </div>
            </div>
            <span class="writing-badge badge-primary">官方原件 5 份</span>
          </div>
          <div class="writing-card-body">
            <div class="pdf-grid">
              ${data.map(item => `
                <div class="pdf-card">
                  <div style="display:flex;gap:14px;align-items:flex-start">
                    <span class="pdf-icon">📄</span>
                    <div style="flex:1">
                      <div class="pdf-title">${item.title}</div>
                      <div class="pdf-meta">
                        <span>大小: ${item.size}</span>
                        <span>页数: ${item.pages}</span>
                        <span class="writing-badge badge-primary" style="font-size:0.75em;padding:1px 6px">${item.badge}</span>
                      </div>
                      <div style="font-size:0.88em;color:var(--muted);line-height:1.5;margin-bottom:12px">
                        ${item.description}
                      </div>
                      <div class="pdf-actions">
                        <a href="${item.path}" target="_blank" rel="noopener noreferrer" class="pdf-btn pdf-btn-preview">
                          👁️ 在线阅读预览
                        </a>
                        <a href="${item.path}" download="${item.title}.pdf" class="pdf-btn pdf-btn-download">
                          ⬇️ 立即下载 PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
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
          btnElement.innerHTML = '✓ 已复制';
          btnElement.style.background = 'var(--success, #10b981)';
          btnElement.style.color = '#fff';
          setTimeout(() => {
            btnElement.innerHTML = originalText;
            btnElement.style.background = '';
            btnElement.style.color = '';
          }, 1800);
        }
        if (typeof window.showToast === 'function') {
          window.showToast('📋 内容已成功复制到剪贴板！');
        }
      }).catch(err => {
        console.error('Copy failed:', err);
        if (typeof window.showToast === 'function') {
          window.showToast('复制失败，请手动选择复制');
        }
      });
    }
  };

  window.WritingModule = WritingModule;
})(window);
'''

with open('js/writing.js', 'w', encoding='utf-8') as f:
    f.write(content.strip() + '\n')
print(f"js/writing.js created successfully, length: {len(content)}")
