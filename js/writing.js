/**
 * ZY_English Writing Masterclass Module (考研英语高分写作宝典交互系统)
 * Strictly matches window.WRITING_DATA schema:
 * - guide: 01 结构拆解, 02 套用四步法, 03 AI换词咒语, 04 避坑指南
 * - smallEssayHistory: 2010-2025 英语二历年考情对照表 (带推荐模板一键直达)
 * - smallEssayTemplates: 17 套中英对照三段式小作文模板 (10基础 + 7混合)
 * - bigEssaySections: 首段(3类)、次段(6大专题)、末段(正反2类)及80+高分例句
 * - pastExams: 2010-2026 英语一(17篇) + 英语二(17篇)共34篇真题套用范文
 * - themeKeywords: 历年主题词3选1矩阵、角色替换词库与避坑提醒
 * - materialsDownload: 5份原版PDF资料在线预览与下载
 */

(function(window) {
  'use strict';

  const WritingModule = {
    initialized: false,
    container: null,
    currentTab: 'guide',
    selectedExamSubject: '英语二',
    selectedExamYear: 2025,
    selectedKeywordSubject: '英语二',
    smallEssayFilter: 'all',

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

      this.renderShell();
      this.bindTabEvents();
      this.initialized = true;

      this.switchTab(this.currentTab);
    },

    onYearChange(year) {
      const y = parseInt(year, 10);
      if (!isNaN(y)) {
        this.selectedExamYear = y;
        if (this.currentTab === 'pastExams') {
          const yearSelect = document.getElementById('examYearSelect');
          if (yearSelect) yearSelect.value = String(y);
          this.renderExamArticle();
        }
      }
    },

    renderShell() {
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

    bindTabEvents() {
      const tabs = this.container.querySelectorAll('.writing-tab-btn');
      tabs.forEach(btn => {
        btn.addEventListener('click', () => {
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
      panels.forEach(p => p.classList.remove('active'));

      const targetPanel = this.container.querySelector(`#panel${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
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
       Tab 1: 🚀 起步与流程 (Guide)
       ========================================================================== */
    renderGuide() {
      const panel = this.container.querySelector('#panelGuide');
      const data = this.getData();
      const guide = data.guide || {};
      const sections = guide.sections || [];
      if (!panel) return;

      panel.innerHTML = `
        <div class="guide-header-tip" style="margin-bottom:20px;padding:14px 18px;background:rgba(37,99,235,0.06);border-left:4px solid var(--accent);border-radius:6px;font-size:0.95em;line-height:1.7;color:var(--ink)">
          💡 <strong>核心理念：</strong>${guide.title || '考研英语作文模板使用全流程指南'}（${guide.author || '秘密哥 / 苦瓜学长'}）<br>
          模板不是一字不差地死记硬背，而是掌握标准的三段式骨架、段落功能句搭配以及精准换词策略，做到“结构稳健、行文地道、自然点题、绝无雷同”。
        </div>

        <div class="guide-sections-list">
          ${sections.map(sec => {
            const isAi = sec.id === 'ai_prompt';
            return `
              <div class="writing-card" id="guide-${sec.id}">
                <div class="writing-card-header">
                  <div style="display:flex;align-items:center;gap:10px">
                    <span style="font-size:1.4em">${sec.icon || '📌'}</span>
                    <h3 class="writing-card-title" style="margin:0">${sec.title}</h3>
                  </div>
                  ${isAi ? `<button class="writing-copy-btn" id="copyAiInstructionBtn">📋 一键复制AI换词指令</button>` : ''}
                </div>
                <div class="writing-card-body">
                  ${(sec.content || []).map(item => `
                    <div class="guide-item" style="margin-bottom:18px">
                      <h4 style="margin:0 0 8px 0;font-size:1.02em;color:var(--accent);display:flex;align-items:center;gap:6px">
                        <span>▶</span> ${item.subtitle}
                      </h4>
                      <div class="guide-text" style="font-size:0.94em;line-height:1.75;color:var(--ink)">
                        ${this.formatGuideText(item.text, isAi && item.subtitle.includes('换词指令'))}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      // Bind AI copy button
      const copyBtn = panel.querySelector('#copyAiInstructionBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const aiBlock = panel.querySelector('#aiPromptBox');
          const promptText = aiBlock ? aiBlock.innerText : `请根据以下考研英语作文题目：[填写题目]，对给出的模板进行同义换词处理。要求：\n1. 黑色固定句架绝对保持不变，切勿改动核心语法与句式结构；\n2. 仅将中文和英文中的可替换内容（局部修饰词/宾语/动词短语）替换为与题目切合的词汇；\n3. 填入题目相关词（点题核心词）；\n4. 将替换前后的中英文逐句对照展示，并在替换处加粗；\n5. 最后输出一整段润色后的完整段落汇总。`;
          this.copyToClipboard(promptText, copyBtn);
        });
      }
    },

    formatGuideText(text, isAiPromptBlock) {
      if (!text) return '';
      // Escape HTML
      let formatted = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Format bold **...**
      formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--accent)">$1</strong>');

      // Check if it's AI prompt text block
      if (isAiPromptBlock || text.includes('【换词指令】')) {
        const parts = formatted.split('【换词指令】：');
        if (parts.length > 1) {
          return `${parts[0]}<div class="code-block" id="aiPromptBox" style="margin-top:10px;padding:16px 20px;background:var(--card-bg, #f8fafc);border:1px solid var(--border);border-left:4px solid #8b5cf6;border-radius:6px;font-family:monospace;white-space:pre-wrap;line-height:1.8;color:var(--ink)"><strong>【换词指令】：</strong>\n${parts[1].trim()}</div>`;
        }
      }

      // Convert line breaks and bullet points
      formatted = formatted.replace(/\n/g, '<br>');
      return formatted;
    },

    /* ==========================================================================
       Tab 2: ✉️ 小作文模板库 (Small Essay Templates & History)
       ========================================================================== */
    renderSmallEssay() {
      const panel = this.container.querySelector('#panelSmallEssay');
      const data = this.getData();
      const historyList = data.smallEssayHistory || [];
      if (!panel) return;

      panel.innerHTML = `
        <!-- Section 1: 历年考情对照表 -->
        <div class="writing-card" style="border-top:3px solid var(--accent)">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">📋</span>
              <div>
                <h3 class="writing-card-title" style="margin:0">英语二小作文历年形式与作文主题表 (2010—2025 全量考情对照)</h3>
                <div style="font-size:0.86em;color:var(--muted);margin-top:3px">
                  涵盖历年真实考题形式与写作要点，点击右侧“推荐模板”按钮可直接直达下方对应的中英三段式模板
                </div>
              </div>
            </div>
            <span class="writing-badge badge-primary">2010—2025 连续 16 年</span>
          </div>
          <div class="writing-card-body" style="padding:0">
            <div class="history-table-container">
              <table class="history-table">
                <thead>
                  <tr>
                    <th style="width:75px">年份</th>
                    <th style="width:130px">题型形式</th>
                    <th>真题作文主题与写作要点</th>
                    <th style="width:180px">推荐精准匹配模板</th>
                  </tr>
                </thead>
                <tbody>
                  ${historyList.map(item => `
                    <tr>
                      <td style="font-weight:700;color:var(--accent)">${item.year}</td>
                      <td><span class="history-type-badge">${item.form}</span></td>
                      <td>
                        <div style="font-weight:600;color:var(--ink);margin-bottom:3px">${item.topic}</div>
                        <div style="font-size:0.85em;color:var(--muted);line-height:1.5">${item.points || ''}</div>
                      </td>
                      <td>
                        <button class="template-jump-btn" data-match="${item.matchTemplate}">
                          👉 ${item.matchTemplate}
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 2: 17 套中英对照模板库 -->
        <div class="filter-bar" style="margin-top:28px">
          <div class="filter-group">
            <span style="font-weight:700;font-size:0.92em;color:var(--muted)">模板分类筛选:</span>
            <button class="filter-btn active" data-filter="all">全部 (17套)</button>
            <button class="filter-btn" data-filter="basic">10 种基本类型</button>
            <button class="filter-btn" data-filter="mixed">7 种混合类型</button>
          </div>
        </div>

        <div class="templates-container" id="templatesContainer" style="margin-top:16px"></div>
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

      container.innerHTML = filtered.map(t => `
        <div class="writing-card template-card" id="template-${t.id}">
          <div class="writing-card-header">
            <div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span class="writing-badge ${t.category === 'mixed' ? 'badge-warning' : 'badge-primary'}">
                  ${t.categoryName || (t.category === 'mixed' ? '混合类型' : '基本类型')}
                </span>
                <h3 class="writing-card-title" style="margin:0">${t.title}</h3>
                <span style="font-size:0.85em;color:var(--muted)">（句数结构：${t.sentencesCount || '2 / 4 / 2'}）</span>
              </div>
              <div style="font-size:0.85em;color:var(--muted);margin-top:5px">
                📌 来源组成：${t.origin || '经典功能句组合'}
              </div>
            </div>
            <button class="writing-copy-btn copy-template-btn" data-id="${t.id}">
              📋 复制英文模板
            </button>
          </div>
          <div class="writing-card-body">
            <!-- 英文模板 -->
            <div class="template-content-block">
              <strong style="color:var(--accent);display:block;margin-bottom:6px;font-size:0.92em">【英文三段式模板】</strong>
              <div style="line-height:1.8;font-size:0.95em;color:var(--ink);white-space:pre-wrap" class="en-template-text" id="tpl-en-${t.id}">${this.highlightPlaceholders(t.enTemplate)}</div>
            </div>

            <!-- 中文对照与变量说明 -->
            <div class="template-zh-block" style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--line)">
              <strong style="color:var(--muted);display:block;margin-bottom:6px;font-size:0.92em">【中文对照翻译】</strong>
              <div style="line-height:1.75;font-size:0.92em;color:var(--muted);white-space:pre-wrap">${t.cnTranslation}</div>
            </div>

            <!-- 可替换变量清单 -->
            ${Array.isArray(t.variables) && t.variables.length > 0 ? `
              <div style="margin-top:12px;display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                <span style="font-size:0.82em;font-weight:700;color:var(--muted)">填空变量提示：</span>
                ${t.variables.map(v => `<span class="template-variable" style="font-size:0.82em;padding:2px 6px">${v}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `).join('');

      // Bind copy buttons
      container.querySelectorAll('.copy-template-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id, 10);
          const tpl = templates.find(item => item.id === id);
          if (tpl) {
            this.copyToClipboard(tpl.enTemplate, btn);
          }
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
          const matchStr = btn.dataset.match || '';
          // Extract first template number e.g. "模版 16" -> 16, or "模版 1" -> 1
          const m = matchStr.match(/模版\s*(\d+)/);
          if (m && m[1]) {
            this.scrollToTemplate(parseInt(m[1], 10));
          }
        });
      });
    },

    scrollToTemplate(templateId) {
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
          target.style.transition = 'all 0.3s ease';
          target.style.outline = '2px solid var(--accent)';
          target.style.boxShadow = '0 0 16px rgba(37,99,235,0.35)';
          setTimeout(() => {
            target.style.outline = '';
            target.style.boxShadow = '';
          }, 2400);
        }
      }, 100);
    },

    highlightPlaceholders(text) {
      if (!text) return '';
      // Escape HTML
      let s = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      // Highlight bracketed variables e.g. [要做的事] or 题目相关词
      s = s.replace(/(\[[^\]]+\])/g, '<span class="template-variable">$1</span>');
      s = s.replace(/(题目相关词)/g, '<span class="template-variable" style="background:rgba(239,68,68,0.1);color:#ef4444;border-color:rgba(239,68,68,0.3)">$1</span>');
      return s;
    },

    /* ==========================================================================
       Tab 3: 📊 大作文功能句库 (Big Essay Paragraphs & Sentences)
       ========================================================================== */
    renderBigEssay() {
      const panel = this.container.querySelector('#panelBigEssay');
      const data = this.getData();
      const sections = data.bigEssaySections || {};
      const first = sections.firstParagraph || [];
      const second = sections.secondParagraph || [];
      const third = sections.thirdParagraph || [];
      if (!panel) return;

      panel.innerHTML = `
        <!-- 第一段：首段引题与描绘 -->
        <div class="writing-card" style="border-top:3px solid var(--accent)">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">📈</span>
              <div>
                <h3 class="writing-card-title" style="margin:0">第一段：引题与图画/图表描述模板 (3 大题型分类)</h3>
                <div style="font-size:0.86em;color:var(--muted);margin-top:3px">
                  包含图画类首段、静态图表类首段与动态图表类首段，附带万能套用模板与逐句替换功能句库
                </div>
              </div>
            </div>
            <span class="writing-badge badge-primary">3大首段分类</span>
          </div>
          <div class="writing-card-body">
            ${first.map(item => this.renderBigEssaySectionBlock(item, 'p1')).join('')}
          </div>
        </div>

        <!-- 第二段：核心原因论述 (6大专题) -->
        <div class="writing-card" style="border-top:3px solid var(--success);margin-top:24px">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">🎯</span>
              <div>
                <h3 class="writing-card-title" style="margin:0">第二段：核心原因与多维论述 (6 大常考母题专题)</h3>
                <div style="font-size:0.86em;color:var(--muted);margin-top:3px">
                  全面覆盖考研大作文核心专题：经济生活、校园品质、体育健康、生态环境、文化自信、社会民生
                </div>
              </div>
            </div>
            <span class="writing-badge badge-success">6大母题归类</span>
          </div>
          <div class="writing-card-body">
            ${second.map(item => this.renderBigEssaySectionBlock(item, 'p2')).join('')}
          </div>
        </div>

        <!-- 第三段：总结建议与展望 -->
        <div class="writing-card" style="border-top:3px solid var(--warning);margin-top:24px">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">🏁</span>
              <div>
                <h3 class="writing-card-title" style="margin:0">第三段：归纳建议与未来展望 (正向支持 / 反面引导)</h3>
                <div style="font-size:0.86em;color:var(--muted);margin-top:3px">
                  根据主题词的褒贬色彩灵活抉择：正面提倡支持，反面警示防范与协同治理
                </div>
              </div>
            </div>
            <span class="writing-badge badge-warning">正反两套速通</span>
          </div>
          <div class="writing-card-body">
            ${third.map(item => this.renderBigEssaySectionBlock(item, 'p3')).join('')}
          </div>
        </div>
      `;

      // Bind copy buttons for templates and sentence items
      panel.querySelectorAll('.copy-text-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const raw = decodeURIComponent(btn.dataset.text || '');
          this.copyToClipboard(raw, btn);
        });
      });
    },

    renderBigEssaySectionBlock(item, prefix) {
      const sentences = item.sentences || [];
      return `
        <div class="big-section-box" style="margin-bottom:20px;padding:16px 18px;background:var(--card-bg, #fbfbfb);border:1px solid var(--border);border-radius:8px">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px">
            <div>
              <strong style="color:var(--ink);font-size:1.05em">${item.name}</strong>
              <span style="font-size:0.85em;color:var(--muted);margin-left:8px">（${item.chartType || item.category || ''}）</span>
            </div>
            <button class="writing-copy-btn copy-text-btn" data-text="${encodeURIComponent(item.mainTemplate ? item.mainTemplate.en : '')}" style="font-size:0.8em;padding:3px 10px">
              📋 复制本段模板
            </button>
          </div>

          <!-- 段落万能模板 -->
          <div style="background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:12px 14px;margin-bottom:14px">
            <div style="font-size:0.92em;line-height:1.75;color:var(--ink);margin-bottom:6px">
              ${this.highlightPlaceholders(item.mainTemplate ? item.mainTemplate.en : '')}
            </div>
            <div style="font-size:0.86em;color:var(--muted);line-height:1.6">
              <strong>中文译文：</strong>${item.mainTemplate ? item.mainTemplate.cn : ''}
            </div>
          </div>

          <!-- 逐句功能句库 -->
          ${sentences.length > 0 ? `
            <details style="margin-top:10px">
              <summary style="font-size:0.88em;font-weight:700;color:var(--accent);cursor:pointer;user-select:none;padding:6px 0">
                🔍 查看该模块精选逐句功能句 (${sentences.length} 句)
              </summary>
              <div class="sentences-table" style="margin-top:10px">
                ${sentences.map(s => `
                  <div class="sentence-item" style="padding:10px 12px;margin-bottom:8px;background:var(--surface);border:1px solid var(--line);border-radius:6px">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
                      <div style="flex:1">
                        <div style="font-weight:700;font-size:0.92em;color:var(--ink);line-height:1.5">
                          <span style="color:var(--accent);margin-right:6px">${s.num}</span>${this.highlightPlaceholders(s.pattern)}
                        </div>
                        <div style="font-size:0.85em;color:var(--muted);margin:4px 0 6px 0">${s.cn}</div>
                        ${s.example ? `
                          <div style="font-size:0.84em;background:rgba(37,99,235,0.03);padding:6px 10px;border-radius:4px;border-left:2px solid var(--accent);color:var(--ink);line-height:1.5">
                            <strong>真题高分例句：</strong>${s.example}<br>
                            <span style="color:var(--muted)">${s.exampleCn || ''}</span>
                          </div>
                        ` : ''}
                      </div>
                      <button class="writing-copy-btn copy-text-btn" data-text="${encodeURIComponent(s.pattern)}" style="font-size:0.75em;padding:2px 8px;flex-shrink:0">
                        复制
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </details>
          ` : ''}
        </div>
      `;
    },

    /* ==========================================================================
       Tab 4: 🏆 历年真题套用范文 (Past Exams 2010-2026)
       ========================================================================== */
    renderPastExams() {
      const panel = this.container.querySelector('#panelPastExams');
      const data = this.getData();
      const pastList = data.pastExams || [];
      if (!panel) return;

      // Extract available years for current subject
      const years = Array.from(new Set(pastList.map(item => item.year))).sort((a, b) => b - a); // 2026 down to 2010

      panel.innerHTML = `
        <div class="exam-header" style="margin-bottom:20px">
          <div class="filter-bar" style="border:none;padding:0;margin:0">
            <!-- 科目切换 -->
            <div class="filter-group">
              <span style="font-weight:700;font-size:0.92em;color:var(--muted)">科目选择:</span>
              <button class="filter-btn ${this.selectedExamSubject === '英语二' ? 'active' : ''}" id="btnExamE2">英语二 (图表类 17篇)</button>
              <button class="filter-btn ${this.selectedExamSubject === '英语一' ? 'active' : ''}" id="btnExamE1">英语一 (图画类 17篇)</button>
            </div>

            <!-- 年份选择 -->
            <div class="filter-group" style="margin-left:auto;display:flex;align-items:center;gap:6px">
              <button class="filter-btn" id="btnPrevExamYear" title="上一年" style="padding:4px 10px">◀</button>
              <select id="examYearSelect" class="select-control" style="padding:6px 14px;font-weight:700;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--ink)">
                ${years.map(y => `<option value="${y}" ${y === this.selectedExamYear ? 'selected' : ''}>${y} 年全真范文</option>`).join('')}
              </select>
              <button class="filter-btn" id="btnNextExamYear" title="下一年" style="padding:4px 10px">▶</button>
            </div>
          </div>
        </div>

        <div id="examArticleContainer"></div>
      `;

      this.renderExamArticle();
      this.bindPastExamEvents();
    },

    renderExamArticle() {
      const container = this.container.querySelector('#examArticleContainer');
      const data = this.getData();
      const pastList = data.pastExams || [];
      if (!container) return;

      const subject = this.selectedExamSubject;
      const year = this.selectedExamYear;

      const exam = pastList.find(item => item.exam === subject && item.year === year) 
                || pastList.find(item => item.exam === subject) 
                || pastList[0];

      if (!exam) {
        container.innerHTML = `<div style="padding:40px;text-align:center;color:var(--muted)">暂无 ${year} 年 ${subject} 真题范文</div>`;
        return;
      }

      container.innerHTML = `
        <div class="writing-card" style="border-left:4px solid var(--accent)">
          <div class="writing-card-header">
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                <span class="writing-badge badge-primary">${exam.exam} · ${exam.year} 年真题</span>
                <h3 class="writing-card-title" style="margin:0">${exam.title}</h3>
                ${exam.wordCount ? `<span style="font-size:0.86em;color:var(--muted)">（约 ${exam.wordCount} 词 · 齐头式排版）</span>` : ''}
              </div>
              <div style="font-size:0.88em;color:var(--muted);margin-top:6px">
                📌 题材形式：<strong style="color:var(--accent)">${exam.chartType || '图表/图画'}</strong>
              </div>
            </div>
            <button class="writing-copy-btn" id="copyFullExamEssayBtn">
              📋 一键复制整篇范文
            </button>
          </div>

          <div class="writing-card-body">
            <!-- 套用逻辑策略 -->
            ${exam.strategy ? `
              <div style="background:rgba(37,99,235,0.05);border-radius:6px;padding:12px 16px;margin-bottom:18px;border:1px dashed var(--accent)">
                <div style="font-size:0.92em;color:var(--ink);line-height:1.65">
                  <strong>💡 秘密哥套用思路：</strong>${exam.strategy}
                </div>
              </div>
            ` : ''}

            <!-- 英文范文 -->
            <div class="essay-english-box" style="margin-bottom:18px">
              <strong style="color:var(--accent);display:block;margin-bottom:8px;font-size:0.95em">【标准三段式高分范文 (英文)】</strong>
              <div style="font-size:0.96em;line-height:1.8;color:var(--ink);background:var(--surface);padding:14px 18px;border-radius:6px;border:1px solid var(--line);white-space:pre-wrap" id="examFullEn">${exam.enText || ''}</div>
            </div>

            <!-- 中文对照 -->
            <div class="essay-chinese-box" style="margin-bottom:18px">
              <strong style="color:var(--muted);display:block;margin-bottom:8px;font-size:0.95em">【范文参考译文 (中文)】</strong>
              <div style="font-size:0.92em;line-height:1.75;color:var(--muted);background:var(--surface);padding:14px 18px;border-radius:6px;border:1px solid var(--line);white-space:pre-wrap">${exam.cnText || ''}</div>
            </div>

            <!-- 逐句来源与功能句组合 -->
            ${exam.origins ? `
              <div class="essay-origins-box" style="background:var(--card-bg, #f8fafc);border:1px solid var(--border);border-radius:6px;padding:12px 16px">
                <strong style="color:var(--ink);display:block;margin-bottom:6px;font-size:0.9em">🔍 逐句来源与功能句拆解：</strong>
                <div style="font-size:0.86em;color:var(--muted);line-height:1.7;white-space:pre-wrap">${exam.origins}</div>
              </div>
            ` : ''}
          </div>
        </div>
      `;

      // Copy full essay
      const copyBtn = container.querySelector('#copyFullExamEssayBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          this.copyToClipboard(exam.enText || '', copyBtn);
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
          e2Btn.classList.add('active');
          e1Btn.classList.remove('active');
          this.selectedExamSubject = '英语二';
          this.renderExamArticle();
        });

        e1Btn.addEventListener('click', () => {
          e1Btn.classList.add('active');
          e2Btn.classList.remove('active');
          this.selectedExamSubject = '英语一';
          this.renderExamArticle();
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
       Tab 5: 🏷️ 主题词与换词矩阵 (Theme Keywords & Traps)
       ========================================================================== */
    renderThemeKeywords() {
      const panel = this.container.querySelector('#panelThemeKeywords');
      const data = this.getData();
      const themeData = data.themeKeywords || {};
      const allYears = themeData.years || [];
      if (!panel) return;

      panel.innerHTML = `
        <div class="filter-bar" style="margin-bottom:20px">
          <div class="filter-group">
            <span style="font-weight:700;font-size:0.92em;color:var(--muted)">科目选择:</span>
            <button class="filter-btn ${this.selectedKeywordSubject === '英语二' ? 'active' : ''}" id="btnKwE2">英语二 历年核心词矩阵</button>
            <button class="filter-btn ${this.selectedKeywordSubject === '英语一' ? 'active' : ''}" id="btnKwE1">英语一 历年核心词矩阵</button>
          </div>
        </div>

        <div id="keywordsListContainer"></div>
      `;

      this.renderKeywordsList();
      this.bindThemeKeywordsEvents();
    },

    renderKeywordsList() {
      const container = this.container.querySelector('#keywordsListContainer');
      const data = this.getData();
      const themeData = data.themeKeywords || {};
      const allYears = themeData.years || [];
      if (!container) return;

      const subject = this.selectedKeywordSubject;
      const list = allYears.filter(item => item.exam === subject).sort((a, b) => b.year - a.year);

      container.innerHTML = list.map(item => `
        <div class="writing-card" style="margin-bottom:20px;border-left:4px solid ${subject === '英语二' ? 'var(--accent)' : 'var(--success)'}">
          <div class="writing-card-header">
            <div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span class="writing-badge ${subject === '英语二' ? 'badge-primary' : 'badge-success'}">${item.year} 年 ${item.exam}</span>
                <h3 class="writing-card-title" style="margin:0">${item.topic}</h3>
              </div>
            </div>
          </div>
          <div class="writing-card-body">
            <!-- 3 选 1 核心主题词 -->
            <div style="margin-bottom:14px">
              <strong style="color:var(--ink);font-size:0.92em;display:block;margin-bottom:6px">🎯 核心主题词 3 选 1（防全篇单调重复）：</strong>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${(item.themeOptions || []).map(opt => `
                  <code style="background:rgba(37,99,235,0.08);color:var(--accent);padding:4px 10px;border-radius:4px;font-size:0.92em;font-weight:700">${opt}</code>
                `).join('')}
              </div>
            </div>

            <!-- 角色替换词库表格 -->
            ${Array.isArray(item.replacements) && item.replacements.length > 0 ? `
              <div style="margin-bottom:14px">
                <strong style="color:var(--muted);font-size:0.9em;display:block;margin-bottom:6px">📋 角色与语境替换矩阵表：</strong>
                <div class="history-table-container">
                  <table class="history-table" style="font-size:0.9em">
                    <thead>
                      <tr>
                        <th style="width:90px">句子成分</th>
                        <th style="width:180px">中文含义</th>
                        <th>地道英文表达</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${item.replacements.map(r => `
                        <tr>
                          <td><span class="writing-badge badge-primary" style="font-size:0.75em">${r.role}</span></td>
                          <td>${r.cn}</td>
                          <td><code>${r.en}</code></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            ` : ''}

            <!-- 套用思路与避坑提醒 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px;margin-top:12px">
              ${item.approach ? `
                <div style="padding:10px 14px;background:rgba(37,99,235,0.04);border-radius:6px;border-left:3px solid var(--accent);font-size:0.88em;line-height:1.6">
                  <strong>💡 套用思路：</strong>${item.approach}
                </div>
              ` : ''}
              ${item.tips ? `
                <div style="padding:10px 14px;background:rgba(239,68,68,0.04);border-radius:6px;border-left:3px solid #ef4444;font-size:0.88em;line-height:1.6">
                  <strong>⚠️ 避坑提醒：</strong>${item.tips}
                </div>
              ` : ''}
            </div>
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
          e2Btn.classList.add('active');
          e1Btn.classList.remove('active');
          this.selectedKeywordSubject = '英语二';
          this.renderKeywordsList();
        });

        e1Btn.addEventListener('click', () => {
          e1Btn.classList.add('active');
          e2Btn.classList.remove('active');
          this.selectedKeywordSubject = '英语一';
          this.renderKeywordsList();
        });
      }
    },

    /* ==========================================================================
       Tab 6: 📥 原始资料与下载 (Materials & PDF Previews)
       ========================================================================== */
    renderMaterials() {
      const panel = this.container.querySelector('#panelMaterials');
      const data = this.getData();
      const list = data.materialsDownload || [];
      if (!panel) return;

      panel.innerHTML = `
        <div class="writing-card" style="border-top:3px solid var(--accent)">
          <div class="writing-card-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3em">📦</span>
              <div>
                <h3 class="writing-card-title" style="margin:0">原版写作高分资料电子书与 PDF 下载库</h3>
                <div style="font-size:0.86em;color:var(--muted);margin-top:3px">
                  系统已将 5 份核心高价值写作资料原件完整归档，支持直接在浏览器中打开预览或一键下载离线备考
                </div>
              </div>
            </div>
            <span class="writing-badge badge-primary">官方原件 5 份</span>
          </div>
          <div class="writing-card-body">
            <div class="pdf-grid">
              ${list.map(item => `
                <div class="pdf-card">
                  <div style="display:flex;gap:14px;align-items:flex-start">
                    <span class="pdf-icon">📄</span>
                    <div style="flex:1">
                      <div class="pdf-title">${item.title}</div>
                      <div class="pdf-meta">
                        <span>大小: ${item.size}</span>
                        <span>页数: ${item.pages} 页</span>
                        <span class="writing-badge badge-primary" style="font-size:0.75em;padding:1px 6px">PDF 原版</span>
                      </div>
                      <div style="font-size:0.88em;color:var(--muted);line-height:1.55;margin-bottom:14px">
                        ${item.desc || ''}
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
