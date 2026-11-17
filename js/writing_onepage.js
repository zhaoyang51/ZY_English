/**
 * ZY_English One-Page Essay Module (27届大作文一页纸 · 南萧核心价值观体系)
 * Provides:
 * 1. opTemplates: 三档万能模板 (满分/简化/速通) & 首段公式
 * 2. opCorpus: 七类核心价值观语料库 + 搜索过滤 + 点击复制 / 一键填入套写器
 * 3. opBuilder: 实时交互套写器 (档位切换 + 材料类型 + 语料联动快选 + 词数统计 + 高亮预览 + 一键复制)
 * 4. opPractice: 2020-2026 英语二 28 篇四档套写实操 & 横向同屏对比
 * 5. opGuide: 宏大叙事化考纲真相、多图审题法、动作表情高频词库
 */

(function(window) {
  'use strict';

  const VALUE_PRESETS = {
    harmony: {
      theme: "promoting older adults' physical and mental well-being",
      desc: "among older residents in one community, watching television accounts for the largest share, at 90.8%, followed by taking walks, tending flowers, reading and playing chess at 68.3%, 34.7%, 31.8% and 18.4% respectively",
      chartType: "bar chart",
      behavior: "pursue healthy lifestyles",
      outcome: "inner peace and overall well-being",
      domain: "public health and well-being",
      ability: "access improved public services and recreational facilities",
      socialEffect: "creating livable environments and improving quality of life",
      strategy: "building a healthy China",
      socialChange: "green areas expand and fitness facilities become more accessible",
      authority: "Beijing Normal University"
    },
    civilization: {
      theme: "fostering children's well-rounded development",
      desc: "in a survey of views on children's outdoor activities, satisfying curiosity accounts for the largest share, at 54.6%, followed by improving observation skills, building physical fitness and increasing parent-child interaction at 54.5%, 37.2% and 33.2% respectively",
      chartType: "bar chart",
      behavior: "learn through observation and hands-on practice",
      outcome: "enhanced intellectual capacity and cultural confidence",
      domain: "quality education",
      ability: "pursue lifelong learning and develop cultural literacy",
      socialEffect: "developing practical skills and a cooperative spirit",
      strategy: "fostering well-rounded development",
      socialChange: "more people participate in lifelong learning",
      authority: "Peking University"
    },
    prosperity: {
      theme: "promoting people-centered technological and economic development",
      desc: "between 2014 and 2023, the number of air conditioners per hundred households in China rose from about 75.2 to around 145.9, while that of washing machines increased from roughly 83.7 to approximately 98.2",
      chartType: "bar chart",
      behavior: "make use of economic opportunities and improved facilities",
      outcome: "enhanced quality of life and expanded opportunities",
      domain: "infrastructure development",
      ability: "benefit from infrastructure upgrades and technological progress",
      socialEffect: "upgrading infrastructure and expanding public services",
      strategy: "high-quality development",
      socialChange: "technology makes daily life more convenient",
      authority: "People's Daily"
    },
    dedication: {
      theme: "cultivating a spirit of diligence and practical action",
      desc: "at a desk, a girl who is working attentively wants to finish early, while a boy sits back at another desk, saying that he will not start until the last minute",
      chartType: "scene",
      behavior: "turn plans into action and replace excuses with effort",
      outcome: "tangible achievements and growing capabilities",
      domain: "talent development",
      ability: "bridge the gap between knowing and doing",
      socialEffect: "building a culture of excellence and accountability",
      strategy: "a spirit of hard work and dedication",
      socialChange: "professional standards rise across industries",
      authority: "China Daily"
    },
    kindness: {
      theme: "fostering mutual care and social warmth",
      desc: "in a community center, young volunteers are helping elderly neighbors carry groceries and organize cultural activities",
      chartType: "scene",
      behavior: "offer help proactively and care for those in need",
      outcome: "supportive networks and meaningful relationships",
      domain: "community governance",
      ability: "volunteer and help vulnerable groups",
      socialEffect: "reducing isolation and encouraging mutual assistance",
      strategy: "the cultivation of traditional virtues",
      socialChange: "mutual assistance becomes commonplace and social isolation declines",
      authority: "Beijing Normal University"
    },
    patriotism: {
      theme: "preserving cultural heritage and strengthening national identity",
      desc: "by the river, an elderly resident who seems delighted watches a dragon boat race, saying that the event in the village is becoming livelier",
      chartType: "scene",
      behavior: "participate in cultural practices and preserve shared customs",
      outcome: "cultural confidence and national pride",
      domain: "cultural identity development",
      ability: "embrace cultural heritage and develop national consciousness",
      socialEffect: "reviving traditions and strengthening national identity",
      strategy: "preserving China's cultural heritage",
      socialChange: "cultural traditions revive and patriotic sentiment strengthens",
      authority: "Guangming Daily"
    },
    integrity: {
      theme: "upholding honesty and building social trust",
      desc: "in a marketplace, a shop owner returns a lost wallet to a customer with a warm smile, earning heartfelt praise from passers-by",
      chartType: "scene",
      behavior: "deal honestly and consistently honor commitments",
      outcome: "trustworthy reputations and stable relationships",
      domain: "social credit system development",
      ability: "uphold honesty in transactions and honor commitments reliably",
      socialEffect: "building trust-based relationships and reliable systems",
      strategy: "building a trustworthy society",
      socialChange: "contracts are honored and promises are kept",
      authority: "China Daily"
    }
  };

  const WritingOnePageModule = {
    container: null,
    currentSubTab: 'opTemplates',
    activeTemplateTier: 'full',
    corpusFilterId: 'all',
    corpusSearch: '',
    practiceYear: 2026,
    practiceTier: 'full',
    builderState: {
      tier: 'full',
      materialType: 'static_chart',
      fastCarrier: 'bar chart',
      selectedValue: 'civilization',
      slots: Object.assign({}, VALUE_PRESETS.civilization),
      fastBranches: {
        s1: 'theme',
        s2: 'reason',
        s4: 'impetus',
        s5: 'role'
      }
    },

    getData() {
      return window.WRITING_ONEPAGE_DATA || {};
    },

    mount(containerEl, initialSubTab, initialYear) {
      this.container = containerEl;
      if (!this.container) return;
      if (initialSubTab) this.currentSubTab = initialSubTab;
      if (initialYear && initialYear >= 2020 && initialYear <= 2026) {
        this.practiceYear = Number(initialYear);
      }
      this.render();
    },

    onYearChange(year) {
      const y = Number(year);
      if (y >= 2020 && y <= 2026) {
        this.practiceYear = y;
        if (this.currentSubTab === 'opPractice') {
          this.renderPanel('opPractice');
        }
      }
    },

    switchSubTab(tabKey) {
      this.currentSubTab = tabKey;
      if (!this.container) return;
      this.container.querySelectorAll('.op-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.optab === tabKey);
      });
      this.container.querySelectorAll('.op-tab-panel').forEach(p => {
        p.classList.toggle('active', p.id === 'opPanel_' + tabKey);
      });
      this.renderPanel(tabKey);
      const scrollHost = document.getElementById('writingSection');
      if (scrollHost) scrollHost.scrollTop = 0;
    },

    render() {
      this.container.innerHTML = `
        <nav class="writing-nav-tabs op-nav-tabs" role="tablist">
          <button class="writing-tab-btn op-tab-btn ${this.currentSubTab === 'opTemplates' ? 'active' : ''}" data-optab="opTemplates" role="tab">
            <span>📄</span> 三档万能模板
          </button>
          <button class="writing-tab-btn op-tab-btn ${this.currentSubTab === 'opCorpus' ? 'active' : ''}" data-optab="opCorpus" role="tab">
            <span>🧭</span> 七类核心价值观语料库
          </button>
          <button class="writing-tab-btn op-tab-btn ${this.currentSubTab === 'opBuilder' ? 'active' : ''}" data-optab="opBuilder" role="tab">
            <span>⚡</span> 实时交互套写器
          </button>
          <button class="writing-tab-btn op-tab-btn ${this.currentSubTab === 'opPractice' ? 'active' : ''}" data-optab="opPractice" role="tab">
            <span>📝</span> 20-26英二四档实操
          </button>
          <button class="writing-tab-btn op-tab-btn ${this.currentSubTab === 'opGuide' ? 'active' : ''}" data-optab="opGuide" role="tab">
            <span>💡</span> 宏大叙事与使用说明
          </button>
        </nav>

        <div class="op-tab-panel writing-tab-panel ${this.currentSubTab === 'opTemplates' ? 'active' : ''}" id="opPanel_opTemplates"></div>
        <div class="op-tab-panel writing-tab-panel ${this.currentSubTab === 'opCorpus' ? 'active' : ''}" id="opPanel_opCorpus"></div>
        <div class="op-tab-panel writing-tab-panel ${this.currentSubTab === 'opBuilder' ? 'active' : ''}" id="opPanel_opBuilder"></div>
        <div class="op-tab-panel writing-tab-panel ${this.currentSubTab === 'opPractice' ? 'active' : ''}" id="opPanel_opPractice"></div>
        <div class="op-tab-panel writing-tab-panel ${this.currentSubTab === 'opGuide' ? 'active' : ''}" id="opPanel_opGuide"></div>
      `;

      this.container.querySelectorAll('.op-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => this.switchSubTab(btn.dataset.optab));
      });

      this.renderPanel(this.currentSubTab);
    },

    renderPanel(tabKey) {
      if (tabKey === 'opTemplates') this.renderTemplatesPanel();
      else if (tabKey === 'opCorpus') this.renderCorpusPanel();
      else if (tabKey === 'opBuilder') this.renderBuilderPanel();
      else if (tabKey === 'opPractice') this.renderPracticePanel();
      else if (tabKey === 'opGuide') this.renderGuidePanel();
    },

    highlightSlots(text) {
      if (!text) return '';
      return String(text)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/(【[^】]+】)/g, '<span class="template-variable">$1</span>');
    },

    copyText(text, btnEl) {
      if (window.WritingModule && window.WritingModule.copyToClipboard) {
        window.WritingModule.copyToClipboard(text, btnEl);
      }
    },

    /* ==========================================================================
       1. 三档万能模板 (满分版 / 简化版 / 速通版)
       ========================================================================== */
    renderTemplatesPanel() {
      const panel = this.container.querySelector('#opPanel_opTemplates');
      const data = this.getData().templates || {};
      const p1Formulas = data.firstParagraphFormulas || [];
      const tiers = data.tiers || [];
      if (!panel) return;

      const currentTier = tiers.find(t => t.key === this.activeTemplateTier) || tiers[0];

      panel.innerHTML = `
        <div class="writing-card" style="border-left:4px solid var(--accent)">
          <div class="writing-card-header">
            <div>
              <h3 class="writing-card-title" style="margin:0">📌 27届大作文一页纸体系总览</h3>
              <div style="font-size:0.88em;color:var(--muted);margin-top:4px">${data.intro || ''}</div>
            </div>
            <button class="writing-copy-btn op-go-builder-btn" style="background:var(--accent);color:#fff;border-color:var(--accent)">
              ⚡ 打开实时交互套写器
            </button>
          </div>
        </div>

        <!-- 首段 4 类通用公式 -->
        <div class="writing-card">
          <div class="writing-card-header">
            <h3 class="writing-card-title" style="margin:0">🖼️ 第一段：四大题型起手万能公式（图画 / 动态图 / 静态图 / 文本评论）</h3>
            <span class="writing-badge badge-primary">英一 & 英二通用</span>
          </div>
          <div class="writing-card-body">
            <div class="op-grid-2">
              ${p1Formulas.map(f => `
                <div class="op-subcard">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:8px">
                    <div>
                      <strong style="color:var(--accent);font-size:1.02em">${f.name}</strong>
                      <span class="writing-badge badge-primary" style="margin-left:6px">${f.badge}</span>
                    </div>
                    <button class="writing-copy-btn op-copy-raw" data-raw="${encodeURIComponent(f.en)}">📋 复制</button>
                  </div>
                  <div class="op-en-box">${this.highlightSlots(f.en)}</div>
                  <div class="op-cn-box">${this.highlightSlots(f.cn)}</div>
                  <div style="font-size:0.84em;color:var(--muted);margin-top:8px;line-height:1.55">
                    💡 <strong>套用要点：</strong>${f.tips}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 三档通用模板切换 -->
        <div class="filter-bar" style="margin-top:22px">
          <div class="filter-group">
            <span style="font-weight:700;font-size:0.92em;color:var(--muted)">选择模板档位对比：</span>
            ${tiers.map(t => `
              <button class="filter-btn op-tier-btn ${t.key === this.activeTemplateTier ? 'active' : ''}" data-tier="${t.key}">
                ${t.name} (${t.slotCount}个空)
              </button>
            `).join('')}
          </div>
        </div>

        ${currentTier ? this.renderTierDetailCard(currentTier) : ''}
      `;

      panel.querySelectorAll('.op-tier-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.activeTemplateTier = btn.dataset.tier;
          this.renderTemplatesPanel();
        });
      });

      panel.querySelectorAll('.op-copy-raw').forEach(btn => {
        btn.addEventListener('click', () => {
          this.copyText(decodeURIComponent(btn.dataset.raw || ''), btn);
        });
      });

      const goBuilder = panel.querySelector('.op-go-builder-btn');
      if (goBuilder) {
        goBuilder.addEventListener('click', () => this.switchSubTab('opBuilder'));
      }

      const tryTierBtn = panel.querySelector('.op-try-tier-btn');
      if (tryTierBtn) {
        tryTierBtn.addEventListener('click', () => {
          this.builderState.tier = tryTierBtn.dataset.tier;
          this.switchSubTab('opBuilder');
        });
      }
    },

    renderTierDetailCard(tier) {
      let enBodyHtml = '';
      let copyFullText = '';

      if (tier.key === 'fast') {
        const b = tier.en.p2_branches;
        copyFullText = `${tier.en.p1_all}\n\n${b.s1_theme} ${b.s2_reason} ${b.s3_social} ${b.s4_impetus} ${b.s5_role}\n\n${tier.en.p3}`;
        enBodyHtml = `
          <div class="op-para-block">
            <div class="op-para-label">第一段（万能通用起手）</div>
            <div class="op-en-box">${this.highlightSlots(tier.en.p1_all)}</div>
          </div>
          <div class="op-para-block">
            <div class="op-para-label">第二段（五句推进 · 支持双分支自由拼装）</div>
            <div class="op-branch-list">
              <div class="op-branch-item"><span class="writing-badge badge-primary">句① 主流分支(图画优先)</span> ${this.highlightSlots(b.s1_theme)}</div>
              <div class="op-branch-item"><span class="writing-badge badge-warning">句① 趋势分支(图表优先)</span> ${this.highlightSlots(b.s1_trend)}</div>
              <div class="op-branch-item"><span class="writing-badge badge-primary">句② 动机解释</span> ${this.highlightSlots(b.s2_reason)}</div>
              <div class="op-branch-item"><span class="writing-badge badge-warning">句② 典范人物(备选)</span> ${this.highlightSlots(b.s2_exemplar)}</div>
              <div class="op-branch-item"><span class="writing-badge badge-success">句③ 转入社会条件(固定)</span> ${this.highlightSlots(b.s3_social)}</div>
              <div class="op-branch-item"><span class="writing-badge badge-primary">句④ 战略推动(图表优先)</span> ${this.highlightSlots(b.s4_impetus)}</div>
              <div class="op-branch-item"><span class="writing-badge badge-warning">句④ 和谐共生(图画优先)</span> ${this.highlightSlots(b.s4_harmony)}</div>
              <div class="op-branch-item"><span class="writing-badge badge-primary">句⑤ 权威研究引证A</span> ${this.highlightSlots(b.s5_role)}</div>
              <div class="op-branch-item"><span class="writing-badge badge-warning">句⑤ 活力繁荣引证B</span> ${this.highlightSlots(b.s5_vitality)}</div>
            </div>
          </div>
          <div class="op-para-block">
            <div class="op-para-label">第三段（通用收束）</div>
            <div class="op-en-box">${this.highlightSlots(tier.en.p3)}</div>
          </div>
        `;
      } else {
        copyFullText = `${tier.en.p1_picture}\n\n${tier.en.p2}\n\n${tier.en.p3}`;
        enBodyHtml = `
          <div class="op-para-block">
            <div class="op-para-label">第一段（以图画起手为例，图表/文本可按上方公式切换）</div>
            <div class="op-en-box">${this.highlightSlots(tier.en.p1_picture)}</div>
          </div>
          <div class="op-para-block">
            <div class="op-para-label">第二段中心段落</div>
            <div class="op-en-box">${this.highlightSlots(tier.en.p2)}</div>
          </div>
          <div class="op-para-block">
            <div class="op-para-label">第三段总结</div>
            <div class="op-en-box">${this.highlightSlots(tier.en.p3)}</div>
          </div>
        `;
      }

      return `
        <div class="writing-card" style="border-top:3px solid var(--accent)">
          <div class="writing-card-header">
            <div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <h3 class="writing-card-title" style="margin:0">${tier.name}</h3>
                <span class="writing-badge badge-success">${tier.badge}</span>
              </div>
              <div style="font-size:0.88em;color:var(--muted);margin-top:4px">${tier.summary}</div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <button class="writing-copy-btn op-try-tier-btn" data-tier="${tier.key}" style="background:rgba(16,185,129,0.1);border-color:rgba(16,185,129,0.35);color:#059669">
                ⚡ 用此模板开始套写
              </button>
              <button class="writing-copy-btn op-copy-raw" data-raw="${encodeURIComponent(copyFullText)}">
                📋 复制完整英文模板
              </button>
            </div>
          </div>
          <div class="writing-card-body">
            ${enBodyHtml}

            <div class="op-para-block" style="margin-top:16px;padding-top:14px;border-top:1px dashed var(--line)">
              <div class="op-para-label">【完整中文参考对照】</div>
              <div class="op-cn-box" style="white-space:pre-wrap">${this.highlightSlots(tier.cn.p1 + '\n\n' + tier.cn.p2 + '\n\n' + tier.cn.p3)}</div>
            </div>

            <div style="margin-top:18px">
              <strong style="display:block;margin-bottom:8px;font-size:0.94em">🔍 需准备的填空类型（共 ${tier.slotCount} 类）：</strong>
              <div class="history-table-container">
                <table class="history-table">
                  <thead>
                    <tr>
                      <th style="width:170px">槽位名称</th>
                      <th style="width:190px">语料来源</th>
                      <th>语法形式要求</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(tier.slotsInfo || []).map(s => `
                      <tr>
                        <td><span class="template-variable">${s.slot}</span></td>
                        <td>${s.from}</td>
                        <td style="color:var(--muted)">${s.grammar}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    /* ==========================================================================
       2. 七类核心价值观语料库
       ========================================================================== */
    renderCorpusPanel() {
      const panel = this.container.querySelector('#opPanel_opCorpus');
      const corpus = this.getData().corpus || [];
      if (!panel) return;

      const slotMeta = [
        { key: 'behavior', label: '【具体行为】个人行为 (the way people + 动词原形)' },
        { key: 'outcome', label: '【可见成果】个人成果 (contributing to + 名词/动名词)' },
        { key: 'domain', label: '【相关领域】政策领域 (National policies on + 名词)' },
        { key: 'ability', label: '【个人能力/行为】政策能力 (empowering individuals to + 动词原形)' },
        { key: 'socialEffect', label: '【社会效果】社会效果 (strengthen communities by + V-ing)' },
        { key: 'strategy', label: '【相关战略】国家政策与核心概念 (strategies for + 名词/动名词)' },
        { key: 'socialChange', label: '【社会变化】宏观结果 (as this principle takes root, + 完整小句)' }
      ];

      const q = (this.corpusSearch || '').trim().toLowerCase();
      const filteredVals = corpus.filter(v => this.corpusFilterId === 'all' || v.id === this.corpusFilterId);

      panel.innerHTML = `
        <div class="filter-bar" style="gap:10px">
          <div class="filter-group" style="flex:1;min-width:240px">
            <button class="filter-btn op-val-btn ${this.corpusFilterId === 'all' ? 'active' : ''}" data-vid="all">全部 (8类)</button>
            ${corpus.map(v => `
              <button class="filter-btn op-val-btn ${this.corpusFilterId === v.id ? 'active' : ''}" data-vid="${v.id}">
                ${v.index <= 7 ? v.index + '. ' : ''}${v.name}${v.isKey ? ' ★' : ''}
              </button>
            `).join('')}
          </div>
          <div class="filter-group">
            <input type="text" id="opCorpusSearchInput" value="${this.corpusSearch.replace(/"/g, '&quot;')}"
              placeholder="🔍 搜中/英文短语或真题年份..." class="op-search-input">
          </div>
        </div>

        <div id="opCorpusContent">
          ${filteredVals.map(val => {
            // Check slots matching search query
            const renderedSlots = slotMeta.map(sm => {
              const items = (val.slots && val.slots[sm.key]) || [];
              const matched = q ? items.filter(it => (it.en + ' ' + it.zh).toLowerCase().includes(q)) : items;
              if (!matched.length) return '';
              return `
                <div class="op-slot-group">
                  <div class="op-slot-group-title">${sm.label}</div>
                  <div class="op-phrase-grid">
                    ${matched.map(it => {
                      const fillVal = it.en || it.zh;
                      return `
                        <div class="op-phrase-item">
                          <div class="op-phrase-text">
                            ${it.en ? `<div class="op-phrase-en">${it.en}</div>` : ''}
                            ${it.zh ? `<div class="op-phrase-zh">${it.zh}</div>` : ''}
                          </div>
                          <div class="op-phrase-actions">
                            <button class="writing-copy-btn op-copy-phrase" data-raw="${encodeURIComponent(fillVal)}" title="复制英文短语">复制</button>
                            ${it.en ? `<button class="writing-copy-btn op-fill-slot" data-slot="${sm.key}" data-val="${encodeURIComponent(it.en)}" data-vid="${val.id}" title="直接填入实时交互套写器对应槽位" style="color:var(--accent);border-color:rgba(37,99,235,0.35)">⚡ 填入</button>` : ''}
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('');

            if (q && !renderedSlots && !(val.topics + val.exams + val.name).toLowerCase().includes(q)) {
              return '';
            }

            return `
              <div class="writing-card" style="border-left:4px solid ${val.isKey ? 'var(--accent)' : 'var(--success)'}">
                <div class="writing-card-header">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                      <h3 class="writing-card-title" style="margin:0">${val.index <= 7 ? val.index + '. ' : ''}${val.name} (${val.enName})</h3>
                      ${val.isKey ? '<span class="writing-badge badge-warning">★ 高频重点</span>' : ''}
                    </div>
                    <div style="font-size:0.86em;color:var(--muted);margin-top:4px">
                      📌 适用主题：${val.topics || '-'} &nbsp;|&nbsp; 📅 真题覆盖：${val.exams || '通用'}
                    </div>
                  </div>
                  ${VALUE_PRESETS[val.id] ? `
                    <button class="writing-copy-btn op-use-value-preset" data-vid="${val.id}" style="background:rgba(37,99,235,0.08);color:var(--accent);border-color:rgba(37,99,235,0.3)">
                      ⚡ 一键带入此价值观套写
                    </button>
                  ` : ''}
                </div>
                <div class="writing-card-body">
                  ${renderedSlots || '<div style="color:var(--muted);padding:10px">无匹配条目</div>'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      panel.querySelectorAll('.op-val-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.corpusFilterId = btn.dataset.vid;
          this.renderCorpusPanel();
        });
      });

      const searchEl = panel.querySelector('#opCorpusSearchInput');
      if (searchEl) {
        searchEl.addEventListener('input', (e) => {
          this.corpusSearch = e.target.value;
          const curPos = searchEl.selectionStart;
          this.renderCorpusPanel();
          const newInput = this.container.querySelector('#opCorpusSearchInput');
          if (newInput) {
            newInput.focus();
            try { newInput.setSelectionRange(curPos, curPos); } catch (_) {}
          }
        });
      }

      panel.querySelectorAll('.op-copy-phrase').forEach(btn => {
        btn.addEventListener('click', () => {
          this.copyText(decodeURIComponent(btn.dataset.raw || ''), btn);
        });
      });

      panel.querySelectorAll('.op-fill-slot').forEach(btn => {
        btn.addEventListener('click', () => {
          const slot = btn.dataset.slot;
          const valStr = decodeURIComponent(btn.dataset.val || '');
          const vid = btn.dataset.vid;
          if (slot && valStr) {
            this.builderState.slots[slot] = valStr;
            if (vid && VALUE_PRESETS[vid]) this.builderState.selectedValue = vid;
            if (typeof window.showToast === 'function') {
              window.showToast(`⚡ 已填入【${slot}】，即将为您跳转至实时套写器！`);
            }
            this.switchSubTab('opBuilder');
          }
        });
      });

      panel.querySelectorAll('.op-use-value-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const vid = btn.dataset.vid;
          if (vid && VALUE_PRESETS[vid]) {
            this.builderState.selectedValue = vid;
            this.builderState.slots = Object.assign({}, VALUE_PRESETS[vid]);
            this.builderState.materialType = VALUE_PRESETS[vid].chartType === 'scene' ? 'picture' : 'static_chart';
            this.switchSubTab('opBuilder');
          }
        });
      });
    },

    /* ==========================================================================
       3. ⚡ 一页纸实时交互套写器 (Interactive Essay Builder)
       ========================================================================== */
    renderBuilderPanel() {
      const panel = this.container.querySelector('#opPanel_opBuilder');
      const corpus = this.getData().corpus || [];
      if (!panel) return;

      const st = this.builderState;
      const activeValObj = corpus.find(c => c.id === st.selectedValue) || corpus[0] || { slots: {} };

      const getOptionsForSlot = (slotKey) => {
        // Combine options from selectedValue first, plus indicate source
        const items = (activeValObj.slots && activeValObj.slots[slotKey]) || [];
        return items.filter(it => it.en);
      };

      const renderSlotControl = (slotKey, label, hint, isTextarea) => {
        const opts = getOptionsForSlot(slotKey);
        const val = st.slots[slotKey] || '';
        return `
          <div class="op-builder-field">
            <div class="op-builder-field-head">
              <label><strong>${label}</strong> <span class="op-field-hint">(${hint})</span></label>
              ${opts.length > 0 ? `
                <select class="op-quick-pick" data-target-slot="${slotKey}">
                  <option value="">✨ 从【${activeValObj.name}】语料快选...</option>
                  ${opts.map(o => `<option value="${encodeURIComponent(o.en)}">${o.zh ? o.zh + ' — ' : ''}${o.en}</option>`).join('')}
                </select>
              ` : ''}
            </div>
            ${isTextarea ? `
              <textarea class="op-builder-input op-builder-textarea" data-slot="${slotKey}" rows="3" placeholder="请输入${label}...">${val}</textarea>
            ` : `
              <input type="text" class="op-builder-input" data-slot="${slotKey}" value="${val.replace(/"/g, '&quot;')}" placeholder="请输入${label}...">
            `}
          </div>
        `;
      };

      const isFull = st.tier === 'full';
      const isSimp = st.tier === 'simplified';
      const isFast = st.tier === 'fast';

      panel.innerHTML = `
        <div class="op-builder-layout">
          <!-- 左侧：交互配置与填槽面板 -->
          <div class="op-builder-controls writing-card">
            <div class="writing-card-header" style="margin-bottom:12px">
              <h3 class="writing-card-title" style="margin:0">⚡ 实时交互套写工作台</h3>
              <button class="writing-copy-btn" id="opBuilderResetBtn">🔄 清空重填</button>
            </div>

            <!-- 1. 快速示例/价值观导入 -->
            <div class="op-builder-section">
              <div class="op-builder-sec-title">1. 选择核心价值观底色（同步加载右侧语料下拉库）</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
                ${corpus.filter(c => c.index <= 7).map(c => `
                  <button class="filter-btn op-builder-val-pill ${st.selectedValue === c.id ? 'active' : ''}" data-vid="${c.id}">
                    ${c.index}. ${c.name}
                  </button>
                `).join('')}
              </div>
              <button class="writing-copy-btn" id="opApplyPresetBtn" style="font-size:0.8em;color:var(--accent);border-color:rgba(37,99,235,0.35)">
                🪄 一键填入当前价值观满分真题示范
              </button>
            </div>

            <!-- 2. 模板档位与题型设置 -->
            <div class="op-builder-section">
              <div class="op-builder-sec-title">2. 选择模板档位与第一段材料类型</div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
                <button class="filter-btn op-builder-tier-pill ${isFull ? 'active' : ''}" data-tier="full">满分版 (9槽位)</button>
                <button class="filter-btn op-builder-tier-pill ${isSimp ? 'active' : ''}" data-tier="simplified">简化版 (5槽位)</button>
                <button class="filter-btn op-builder-tier-pill ${isFast ? 'active' : ''}" data-tier="fast">速通版 (全能起手+双分支)</button>
              </div>
              ${!isFast ? `
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  <button class="filter-btn op-builder-mat-pill ${st.materialType === 'picture' ? 'active' : ''}" data-mat="picture">🖼️ 图画</button>
                  <button class="filter-btn op-builder-mat-pill ${st.materialType === 'static_chart' ? 'active' : ''}" data-mat="static_chart">📊 静态图表</button>
                  <button class="filter-btn op-builder-mat-pill ${st.materialType === 'dynamic_chart' ? 'active' : ''}" data-mat="dynamic_chart">📈 动态图表</button>
                  <button class="filter-btn op-builder-mat-pill ${st.materialType === 'passage' ? 'active' : ''}" data-mat="passage">📄 文本评论</button>
                </div>
              ` : `
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                  <span style="font-size:0.85em;color:var(--muted)">首段材料载体：</span>
                  <select id="opFastCarrierSelect" class="op-quick-pick" style="max-width:220px">
                    <option value="scene" ${st.fastCarrier === 'scene' ? 'selected' : ''}>scene (图画)</option>
                    <option value="bar chart" ${st.fastCarrier === 'bar chart' ? 'selected' : ''}>bar chart (柱状图)</option>
                    <option value="line chart" ${st.fastCarrier === 'line chart' ? 'selected' : ''}>line chart (折线图)</option>
                    <option value="pie chart" ${st.fastCarrier === 'pie chart' ? 'selected' : ''}>pie chart (饼图)</option>
                    <option value="table" ${st.fastCarrier === 'table' ? 'selected' : ''}>table (表格)</option>
                    <option value="passage" ${st.fastCarrier === 'passage' ? 'selected' : ''}>passage (文本材料)</option>
                  </select>
                </div>
              `}
            </div>

            <!-- 3. 逐槽位输入与快选 -->
            <div class="op-builder-section">
              <div class="op-builder-sec-title">3. 填写核心内容与调用语料槽位</div>
              ${renderSlotControl('theme', '【主题词】', '贯穿1-3段，名词或V-ing短语', false)}
              ${(!isFast && (st.materialType === 'static_chart' || st.materialType === 'dynamic_chart')) ? renderSlotControl('chartType', '【图表名称】', 'bar chart / pie chart / line chart / table', false) : ''}
              ${renderSlotControl('desc', '【题面/图画/数据/文段描述】', '第一段客观描述语句，注意时态与句首小写/大写', true)}
              ${renderSlotControl('behavior', '【具体行为】', '接在 the way people / desire to 后，填动词原形短语', false)}
              ${isFull ? renderSlotControl('outcome', '【可见成果】', '接在 contributing to 后，填名词/动名词短语', false) : ''}
              ${(isFull || isSimp) ? renderSlotControl('domain', '【相关领域】', '接在 National policies on 后，填名词短语', false) : ''}
              ${isFull ? renderSlotControl('ability', '【个人能力/行为】', '接在 empowering individuals to 后，填动词原形短语', false) : ''}
              ${(isFull || isSimp) ? renderSlotControl('socialEffect', '【社会效果】', '接在 by 后，填 V-ing 动名词短语', false) : ''}
              ${(isFull || isFast) ? renderSlotControl('strategy', '【相关战略】', '接在 strategies for / commitment to 后，填名词短语', false) : ''}
              ${isFull ? renderSlotControl('socialChange', '【社会变化】', '接在 takes root, 后，填完整主谓小句', false) : ''}
              ${isFast ? `
                ${renderSlotControl('authority', '【权威机构/期刊】', '如 Beijing Normal University / Peking University / China Daily', false)}
                <div class="op-builder-field" style="background:rgba(37,99,235,0.04);padding:10px 12px;border-radius:6px">
                  <div style="font-weight:700;font-size:0.86em;margin-bottom:6px;color:var(--accent)">速通版第二段句型分支微调：</div>
                  <div class="op-branch-toggles">
                    <label>句①：<select class="op-fast-br" data-br="s1">
                      <option value="theme" ${st.fastBranches.s1 === 'theme' ? 'selected' : ''}>主题体现分支 (图画优先)</option>
                      <option value="trend" ${st.fastBranches.s1 === 'trend' ? 'selected' : ''}>趋势动机分支 (图表优先)</option>
                    </select></label>
                    <label>句②：<select class="op-fast-br" data-br="s2">
                      <option value="reason" ${st.fastBranches.s2 === 'reason' ? 'selected' : ''}>趋利合理性解释</option>
                      <option value="exemplar" ${st.fastBranches.s2 === 'exemplar' ? 'selected' : ''}>自我完善典范人物</option>
                    </select></label>
                    <label>句④：<select class="op-fast-br" data-br="s4">
                      <option value="impetus" ${st.fastBranches.s4 === 'impetus' ? 'selected' : ''}>国家战略提供动力 (图表优先)</option>
                      <option value="harmony" ${st.fastBranches.s4 === 'harmony' ? 'selected' : ''}>社会与国家和谐蓬勃 (图画优先)</option>
                    </select></label>
                    <label>句⑤：<select class="op-fast-br" data-br="s5">
                      <option value="role" ${st.fastBranches.s5 === 'role' ? 'selected' : ''}>推动趋势与社区繁荣</option>
                      <option value="vitality" ${st.fastBranches.s5 === 'vitality' ? 'selected' : ''}>多项指标下的活力与繁荣</option>
                    </select></label>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- 右侧：实时生成结果与词数监控 -->
          <div class="op-builder-preview writing-card" id="opBuilderPreviewCard">
            <!-- Dynamically updated by updateBuilderPreview() -->
          </div>
        </div>
      `;

      this.updateBuilderPreview();
      this.bindBuilderEvents();
    },

    buildComposedEssay() {
      const st = this.builderState;
      const s = st.slots;
      const capFirst = (str) => {
        if (!str) return '';
        const t = str.trim();
        return t.charAt(0).toUpperCase() + t.slice(1);
      };
      const slotHtml = (key, fallback, forceCap = false) => {
        const raw = (s[key] || '').trim();
        if (!raw) {
          return { html: `<span class="op-slot-empty">[待填: ${fallback}]</span>`, plain: `[${fallback}]` };
        }
        const txt = forceCap ? capFirst(raw) : raw;
        const safe = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return { html: `<mark class="op-slot-filled">${safe}</mark>`, plain: txt };
      };

      const theme = slotHtml('theme', '主题词');
      const themeCap = slotHtml('theme', '主题词', true);
      const desc = slotHtml('desc', '题面描述', st.materialType === 'static_chart' || st.materialType === 'dynamic_chart');
      const descRaw = slotHtml('desc', '题面/图画描述');
      const chartType = slotHtml('chartType', 'bar chart');
      const behavior = slotHtml('behavior', '具体行为');
      const outcome = slotHtml('outcome', '可见成果');
      const domain = slotHtml('domain', '相关领域');
      const ability = slotHtml('ability', '个人能力/行为');
      const socialEffect = slotHtml('socialEffect', '社会效果');
      const strategy = slotHtml('strategy', '相关战略');
      const socialChange = slotHtml('socialChange', '社会变化');
      const authority = slotHtml('authority', '权威机构');

      let p1H = '', p1P = '';
      let p2H = '', p2P = '';
      let p3H = '', p3P = '';

      if (st.tier === 'fast') {
        const carrier = st.fastCarrier || 'bar chart';
        p1H = `Though deceptively simple, this <mark class="op-slot-filled">${carrier}</mark> conveys a meaningful message: ${descRaw.html}. It serves as a compelling testament to the significance of ${theme.html}.`;
        p1P = `Though deceptively simple, this ${carrier} conveys a meaningful message: ${descRaw.plain}. It serves as a compelling testament to the significance of ${theme.plain}.`;

        const br = st.fastBranches;
        const s1H = br.s1 === 'trend'
          ? `To begin with, experience suggests that this trend/pattern can be explained in part by people's desire to ${behavior.html}.`
          : `To begin with, experience suggests that ${theme.html} finds direct expression in phenomena exemplified by the way people ${behavior.html}.`;
        const s1P = br.s1 === 'trend'
          ? `To begin with, experience suggests that this trend/pattern can be explained in part by people's desire to ${behavior.plain}.`
          : `To begin with, experience suggests that ${theme.plain} finds direct expression in phenomena exemplified by the way people ${behavior.plain}.`;

        const s2 = br.s2 === 'exemplar'
          ? `Those who value such practices are exemplars of self-improvement and higher achievement.`
          : `This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.`;

        const s3 = `However, we should recognise that social conditions fundamentally shape the choices available to individuals.`;

        const s4H = br.s4 === 'harmony'
          ? `From this perspective, a shared commitment to ${strategy.html} can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress.`
          : `From this perspective, it is the promotion of national strategies for ${strategy.html} that provides impetus for these developments.`;
        const s4P = br.s4 === 'harmony'
          ? `From this perspective, a shared commitment to ${strategy.plain} can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress.`
          : `From this perspective, it is the promotion of national strategies for ${strategy.plain} that provides impetus for these developments.`;

        const s5H = br.s5 === 'vitality'
          ? `A study published by ${authority.html} lends support to the view that societies placing greater emphasis on ${theme.html} enjoy higher levels of vitality and prosperity, a pattern consistent across multiple indicators.`
          : `An article published by ${authority.html} lends support to the view that ${theme.html} plays an important role in fostering community prosperity.`;
        const s5P = br.s5 === 'vitality'
          ? `A study published by ${authority.plain} lends support to the view that societies placing greater emphasis on ${theme.plain} enjoy higher levels of vitality and prosperity, a pattern consistent across multiple indicators.`
          : `An article published by ${authority.plain} lends support to the view that ${theme.plain} plays an important role in fostering community prosperity.`;

        p2H = `${s1H} ${s2} ${s3} ${s4H} ${s5H}`;
        p2P = `${s1P} ${s2} ${s3} ${s4P} ${s5P}`;
      } else {
        if (st.materialType === 'picture') {
          p1H = `Though deceptively simple, this scene conveys a meaningful message: ${descRaw.html}. It serves as a compelling testament to the significance of ${theme.html}.`;
          p1P = `Though deceptively simple, this scene conveys a meaningful message: ${descRaw.plain}. It serves as a compelling testament to the significance of ${theme.plain}.`;
        } else if (st.materialType === 'passage') {
          p1H = `${themeCap.html} has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that ${descRaw.html}. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.`;
          p1P = `${themeCap.plain} has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that ${descRaw.plain}. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.`;
        } else {
          const word = st.materialType === 'dynamic_chart' ? 'changes' : 'differences';
          p1H = `The figures in the ${chartType.html} reveal notable ${word} concerning ${theme.html}. ${desc.html}.`;
          p1P = `The figures in the ${chartType.plain} reveal notable ${word} concerning ${theme.plain}. ${desc.plain}.`;
        }

        if (st.tier === 'full') {
          p2H = `${themeCap.html} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ${behavior.html}, ultimately contributing to ${outcome.html}. National policies on ${domain.html} likewise focus on empowering individuals to ${ability.html}. Beyond personal advancement, this principle can strengthen communities by ${socialEffect.html}, laying the groundwork for sustainable progress. This is in line with national strategies for ${strategy.html}: as this principle takes root, ${socialChange.html}.`;
          p2P = `${themeCap.plain} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ${behavior.plain}, ultimately contributing to ${outcome.plain}. National policies on ${domain.plain} likewise focus on empowering individuals to ${ability.plain}. Beyond personal advancement, this principle can strengthen communities by ${socialEffect.plain}, laying the groundwork for sustainable progress. This is in line with national strategies for ${strategy.plain}: as this principle takes root, ${socialChange.plain}.`;
        } else {
          p2H = `${themeCap.html} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ${behavior.html}, ultimately contributing to personal development and well-being. National policies on ${domain.html} likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by ${socialEffect.html}, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.`;
          p2P = `${themeCap.plain} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ${behavior.plain}, ultimately contributing to personal development and well-being. National policies on ${domain.plain} likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by ${socialEffect.plain}, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.`;
        }
      }

      p3H = `In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when ${theme.html} guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.`;
      p3P = `In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when ${theme.plain} guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.`;

      const cleanDots = (str) => str.replace(/\.\./g, '.');
      p1H = cleanDots(p1H); p1P = cleanDots(p1P);

      const countW = (txt) => (txt.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
      const wc1 = countW(p1P), wc2 = countW(p2P), wc3 = countW(p3P);
      const totalWc = wc1 + wc2 + wc3;

      return {
        htmlParas: [p1H, p2H, p3H],
        plainText: `${p1P}\n\n${p2P}\n\n${p3P}`,
        wordCounts: { total: totalWc, p1: wc1, p2: wc2, p3: wc3 }
      };
    },

    updateBuilderPreview() {
      const card = this.container.querySelector('#opBuilderPreviewCard');
      if (!card) return;
      const res = this.buildComposedEssay();
      const wc = res.wordCounts.total;
      let statusBadge = `<span class="writing-badge badge-success">✅ 黄金篇幅 (160-210词完美区间)</span>`;
      if (wc < 145) statusBadge = `<span class="writing-badge badge-warning">⚠️ 偏短 (&lt;150词)，请充实首段或槽位</span>`;
      else if (wc > 225) statusBadge = `<span class="writing-badge badge-warning">⚠️ 略长 (&gt;220词)，注意考场时间分配</span>`;

      card.innerHTML = `
        <div class="writing-card-header">
          <div>
            <h3 class="writing-card-title" style="margin:0">📝 实时生成结果预览</h3>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:6px">
              <strong style="color:var(--accent);font-size:1.05em">总词数：${wc} 词</strong>
              <span style="font-size:0.82em;color:var(--muted)">(首段 ${res.wordCounts.p1} · 次段 ${res.wordCounts.p2} · 尾段 ${res.wordCounts.p3})</span>
              ${statusBadge}
            </div>
          </div>
          <button class="writing-copy-btn" id="opCopyComposedBtn" style="background:var(--accent);color:#fff;border-color:var(--accent)">
            📋 复制纯净英文全文
          </button>
        </div>
        <div class="writing-card-body">
          <div class="op-preview-paper">
            <p>${res.htmlParas[0]}</p>
            <p>${res.htmlParas[1]}</p>
            <p>${res.htmlParas[2]}</p>
          </div>
          <div style="font-size:0.83em;color:var(--muted);margin-top:12px;line-height:1.6">
            💡 <strong>对齐与检查提示：</strong>蓝色高亮为您的自填/选词部分，请核对紧邻骨架介词后的词性是否匹配（如 <code>the way people + 动词原形</code>、<code>by + 动名词</code>、<code>takes root, + 完整主谓小句</code>）。复制的纯文本为标准三段齐头式格式。
          </div>
        </div>
      `;

      const copyBtn = card.querySelector('#opCopyComposedBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => this.copyText(res.plainText, copyBtn));
      }
    },

    bindBuilderEvents() {
      const panel = this.container.querySelector('#opPanel_opBuilder');
      if (!panel) return;

      panel.querySelectorAll('.op-builder-val-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          this.builderState.selectedValue = btn.dataset.vid;
          this.renderBuilderPanel();
        });
      });

      const presetBtn = panel.querySelector('#opApplyPresetBtn');
      if (presetBtn) {
        presetBtn.addEventListener('click', () => {
          const vid = this.builderState.selectedValue;
          if (VALUE_PRESETS[vid]) {
            this.builderState.slots = Object.assign({}, VALUE_PRESETS[vid]);
            this.builderState.materialType = VALUE_PRESETS[vid].chartType === 'scene' ? 'picture' : 'static_chart';
            this.renderBuilderPanel();
            if (typeof window.showToast === 'function') {
              window.showToast('🪄 已套入该价值观的标准示范搭配！');
            }
          }
        });
      }

      const resetBtn = panel.querySelector('#opBuilderResetBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          Object.keys(this.builderState.slots).forEach(k => {
            if (k !== 'chartType' && k !== 'authority') this.builderState.slots[k] = '';
          });
          this.renderBuilderPanel();
        });
      }

      panel.querySelectorAll('.op-builder-tier-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          this.builderState.tier = btn.dataset.tier;
          this.renderBuilderPanel();
        });
      });

      panel.querySelectorAll('.op-builder-mat-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          this.builderState.materialType = btn.dataset.mat;
          this.renderBuilderPanel();
        });
      });

      const carrierSel = panel.querySelector('#opFastCarrierSelect');
      if (carrierSel) {
        carrierSel.addEventListener('change', (e) => {
          this.builderState.fastCarrier = e.target.value;
          this.updateBuilderPreview();
        });
      }

      panel.querySelectorAll('.op-builder-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const slot = e.target.dataset.slot;
          this.builderState.slots[slot] = e.target.value;
          this.updateBuilderPreview();
        });
      });

      panel.querySelectorAll('.op-quick-pick[data-target-slot]').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const slot = sel.dataset.targetSlot;
          const val = decodeURIComponent(e.target.value || '');
          if (val && slot) {
            this.builderState.slots[slot] = val;
            const inputEl = panel.querySelector(`.op-builder-input[data-slot="${slot}"]`);
            if (inputEl) inputEl.value = val;
            this.updateBuilderPreview();
          }
        });
      });

      panel.querySelectorAll('.op-fast-br').forEach(sel => {
        sel.addEventListener('change', (e) => {
          this.builderState.fastBranches[sel.dataset.br] = e.target.value;
          this.updateBuilderPreview();
        });
      });
    },

    /* ==========================================================================
       4. 2020-2026 英语二四档实操 (28 篇)
       ========================================================================== */
    renderPracticePanel() {
      const panel = this.container.querySelector('#opPanel_opPractice');
      const list = this.getData().practiceE2 || [];
      if (!panel) return;

      const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
      const yearItems = list.filter(x => x.year === this.practiceYear);
      const topicTitle = yearItems[0] ? yearItems[0].title : '';

      const tiers = [
        { key: 'full', label: '满分版' },
        { key: 'simplified', label: '简化版' },
        { key: 'fast_std', label: '速通·标准套写' },
        { key: 'fast_ez', label: '速通·无脑套写' },
        { key: 'compare', label: '📊 四档同屏对比' }
      ];

      let contentHtml = '';
      if (this.practiceTier === 'compare') {
        contentHtml = `
          <div class="op-grid-2">
            ${yearItems.map(item => `
              <div class="writing-card" style="border-top:3px solid var(--accent)">
                <div class="writing-card-header">
                  <div>
                    <strong style="color:var(--accent);font-size:1.05em">${item.tier}</strong>
                    <span style="font-size:0.84em;color:var(--muted);margin-left:8px">${item.wordCount} 词</span>
                    <div style="font-size:0.84em;color:var(--muted);margin-top:4px">核心主题：<code>${item.coreTheme}</code></div>
                  </div>
                  <button class="writing-copy-btn op-copy-practice" data-raw="${encodeURIComponent(item.enEssay)}">📋 复制范文</button>
                </div>
                <div class="writing-card-body">
                  <div class="op-en-box" style="white-space:pre-wrap;font-size:0.9em">${item.enEssay}</div>
                  <details style="margin-top:10px">
                    <summary style="cursor:pointer;font-size:0.86em;font-weight:700;color:var(--muted)">查看中文对照与写作解析</summary>
                    <div class="op-cn-box" style="white-space:pre-wrap;margin-top:8px">${item.cnEssay}</div>
                    <div class="op-analysis-box" style="white-space:pre-wrap;margin-top:8px">${item.analysis}</div>
                  </details>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        const item = yearItems.find(x => x.tierKey === this.practiceTier) || yearItems[0];
        if (item) {
          contentHtml = `
            <div class="writing-card" style="border-left:4px solid var(--accent)">
              <div class="writing-card-header">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                    <span class="writing-badge badge-primary">${item.year}年 英语二 · ${item.tier}</span>
                    <h3 class="writing-card-title" style="margin:0">${item.title}</h3>
                    <span class="writing-badge badge-success">${item.wordCount} 词</span>
                  </div>
                  <div style="font-size:0.88em;color:var(--muted);margin-top:6px">
                    🎯 核心主题词：<strong style="color:var(--accent)">${item.coreTheme}</strong>
                  </div>
                </div>
                <button class="writing-copy-btn op-copy-practice" data-raw="${encodeURIComponent(item.enEssay)}">📋 一键复制整篇英文范文</button>
              </div>
              <div class="writing-card-body">
                <div style="margin-bottom:16px">
                  <strong style="color:var(--accent);display:block;margin-bottom:6px">【标准三段式英文范文】</strong>
                  <div class="op-en-box" style="white-space:pre-wrap">${item.enEssay}</div>
                </div>
                <div style="margin-bottom:16px">
                  <strong style="color:var(--muted);display:block;margin-bottom:6px">【参考中文对照】</strong>
                  <div class="op-cn-box" style="white-space:pre-wrap">${item.cnEssay}</div>
                </div>
                <div>
                  <strong style="color:var(--ink);display:block;margin-bottom:6px">🔍 审题思路、填槽拆解与语料取用解析：</strong>
                  <div class="op-analysis-box" style="white-space:pre-wrap">${item.analysis}</div>
                </div>
              </div>
            </div>
          `;
        }
      }

      panel.innerHTML = `
        <div class="filter-bar" style="justify-content:space-between;gap:12px">
          <div class="filter-group">
            <span style="font-weight:700;font-size:0.9em;color:var(--muted)">真题年份：</span>
            ${years.map(y => `
              <button class="filter-btn op-pr-year ${y === this.practiceYear ? 'active' : ''}" data-year="${y}">${y}</button>
            `).join('')}
          </div>
          <div class="filter-group">
            <span style="font-weight:700;font-size:0.9em;color:var(--muted)">套写档位：</span>
            ${tiers.map(t => `
              <button class="filter-btn op-pr-tier ${t.key === this.practiceTier ? 'active' : ''}" data-tier="${t.key}">${t.label}</button>
            `).join('')}
          </div>
        </div>
        <div style="margin-bottom:14px;font-size:0.92em;color:var(--muted)">
          📌 当前题目：<strong style="color:var(--ink)">${this.practiceYear} 年英语二 —— ${topicTitle}</strong>
        </div>
        ${contentHtml}
      `;

      panel.querySelectorAll('.op-pr-year').forEach(btn => {
        btn.addEventListener('click', () => {
          this.practiceYear = Number(btn.dataset.year);
          this.renderPracticePanel();
        });
      });

      panel.querySelectorAll('.op-pr-tier').forEach(btn => {
        btn.addEventListener('click', () => {
          this.practiceTier = btn.dataset.tier;
          this.renderPracticePanel();
        });
      });

      panel.querySelectorAll('.op-copy-practice').forEach(btn => {
        btn.addEventListener('click', () => {
          this.copyText(decodeURIComponent(btn.dataset.raw || ''), btn);
        });
      });
    },

    /* ==========================================================================
       5. 宏大叙事与使用说明
       ========================================================================== */
    renderGuidePanel() {
      const panel = this.container.querySelector('#opPanel_opGuide');
      const guide = this.getData().guideAndMethods || {};
      const sections = guide.sections || [];
      if (!panel) return;

      panel.innerHTML = `
        <div class="writing-card" style="border-left:4px solid var(--accent)">
          <div class="writing-card-header">
            <h3 class="writing-card-title" style="margin:0">💡 ${guide.title || '宏大叙事与使用指南'}</h3>
          </div>
          <div class="writing-card-body" style="color:var(--muted);font-size:0.92em">
            先吃透命题组的底层“宏大叙事化”逻辑，再背熟三档中的任意一套骨架与核心价值观语料，即可举一反三、以不变应万变。
          </div>
        </div>
        ${sections.map(sec => `
          <div class="writing-card">
            <div class="writing-card-header">
              <h3 class="writing-card-title" style="margin:0"><span>${sec.icon || '📌'}</span> ${sec.title}</h3>
            </div>
            <div class="writing-card-body">
              ${(sec.items || []).map(it => `
                <div style="margin-bottom:16px">
                  <h4 style="margin:0 0 6px;color:var(--accent);font-size:1em">▶ ${it.subtitle}</h4>
                  <div style="white-space:pre-wrap;line-height:1.8;font-size:0.94em">${it.content.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--accent)">$1</strong>')}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      `;
    }
  };

  window.WritingOnePageModule = WritingOnePageModule;
})(window);
