/**
 * ZY_English One-Page Essay Module (Minimalist Paper Edition)
 * 27届大作文一页纸 · 极简纸感交互稿纸版
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

  const SLOT_LABELS = {
    theme: { name: '主题词', hint: '贯穿全文的核心名词或动名词短语，如 fostering well-rounded development' },
    chartType: { name: '图表名称', hint: 'bar chart / line chart / pie chart / table' },
    desc: { name: '题面描述', hint: '第一段对图画人物动作、图表起止/占比数据或文段核心观点的英文描述' },
    behavior: { name: '具体行为', hint: '接在 the way people / desire to 后，填动词原形短语', corpusKey: 'behavior' },
    outcome: { name: '可见成果', hint: '接在 contributing to 后，填名词或动名词短语', corpusKey: 'outcome' },
    domain: { name: '相关领域', hint: '接在 National policies on 后，填名词短语', corpusKey: 'domain' },
    ability: { name: '个人能力/行为', hint: '接在 empowering individuals to 后，填动词原形短语', corpusKey: 'ability' },
    socialEffect: { name: '社会效果', hint: '接在 by 后，填 V-ing 动名词短语', corpusKey: 'socialEffect' },
    strategy: { name: '相关战略', hint: '接在 national strategies for / commitment to 后，填名词短语', corpusKey: 'strategy' },
    socialChange: { name: '社会变化', hint: '接在 as this principle takes root, 后，填完整主谓小句', corpusKey: 'socialChange' },
    authority: { name: '权威机构/期刊', hint: '如 Beijing Normal University / Peking University / China Daily' }
  };

  const MATERIAL_ORDER = ['picture', 'static_chart', 'dynamic_chart', 'passage'];
  const MATERIAL_NAMES = {
    picture: '图画题',
    static_chart: '静态图表',
    dynamic_chart: '动态图表',
    passage: '文本评论'
  };

  const WritingOnePageModule = {
    container: null,
    currentSubTab: 'opPaper',
    showBilingual: false,
    isFullscreen: false,
    corpusFilterId: 'all',
    corpusSearch: '',
    practiceYear: 2026,
    practiceTier: 'full',
    practiceShowHighlight: true,
    practiceShowPrompt: true,
    practiceShowCn: false,
    practiceShowAnalysis: false,
    builderState: {
      tier: 'full', // full | simplified | fast
      materialType: 'picture',
      fastCarrier: 'bar chart',
      selectedValue: 'harmony',
      fastMode: 'theme', // theme (图画/通用倾向) | trend (图表趋势倾向)
      slots: {
        theme: '',
        chartType: 'bar chart',
        desc: '',
        behavior: '',
        outcome: '',
        domain: '',
        ability: '',
        socialEffect: '',
        strategy: '',
        socialChange: '',
        authority: 'Beijing Normal University'
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
          <button class="writing-tab-btn op-tab-btn ${this.currentSubTab === 'opPaper' ? 'active' : ''}" data-optab="opPaper" role="tab">模板与套写稿纸</button>
          <button class="writing-tab-btn op-tab-btn ${this.currentSubTab === 'opCorpus' ? 'active' : ''}" data-optab="opCorpus" role="tab">七类价值观语料</button>
          <button class="writing-tab-btn op-tab-btn ${this.currentSubTab === 'opPractice' ? 'active' : ''}" data-optab="opPractice" role="tab">20-26英二实操</button>
          <button class="writing-tab-btn op-tab-btn ${this.currentSubTab === 'opGuide' ? 'active' : ''}" data-optab="opGuide" role="tab">考纲与使用说明</button>
        </nav>

        <div class="op-tab-panel writing-tab-panel ${this.currentSubTab === 'opPaper' ? 'active' : ''}" id="opPanel_opPaper"></div>
        <div class="op-tab-panel writing-tab-panel ${this.currentSubTab === 'opCorpus' ? 'active' : ''}" id="opPanel_opCorpus"></div>
        <div class="op-tab-panel writing-tab-panel ${this.currentSubTab === 'opPractice' ? 'active' : ''}" id="opPanel_opPractice"></div>
        <div class="op-tab-panel writing-tab-panel ${this.currentSubTab === 'opGuide' ? 'active' : ''}" id="opPanel_opGuide"></div>
      `;

      this.container.querySelectorAll('.op-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => this.switchSubTab(btn.dataset.optab));
      });

      this.renderPanel(this.currentSubTab);
    },

    renderPanel(tabKey) {
      if (tabKey === 'opPaper') this.renderPaperPanel();
      else if (tabKey === 'opCorpus') this.renderCorpusPanel();
      else if (tabKey === 'opPractice') this.renderPracticePanel();
      else if (tabKey === 'opGuide') this.renderGuidePanel();
    },

    copyText(text, btnEl) {
      if (window.WritingModule && window.WritingModule.copyToClipboard) {
        window.WritingModule.copyToClipboard(text, btnEl);
      }
    },

    /* ==========================================================================
       1. 极简一页纸模板与所见即所得点填套写工作台 (复刻截图风格)
       ========================================================================== */
    renderPaperPanel() {
      const panel = this.container.querySelector('#opPanel_opPaper');
      if (!panel) return;
      const st = this.builderState;
      const s = st.slots;
      const corpus = this.getData().corpus || [];

      const capFirst = (str) => {
        if (!str) return '';
        const t = str.trim();
        return t.charAt(0).toUpperCase() + t.slice(1);
      };

      const renderSlot = (key, defaultLabel, forceCap = false) => {
        const raw = (s[key] || '').trim();
        if (!raw) {
          return `<span class="slot-blank" data-slot="${key}" title="点击填写或选用语料">【${defaultLabel}】</span>`;
        }
        const safe = (forceCap ? capFirst(raw) : raw).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<span class="slot-blank is-filled" data-slot="${key}" title="点击修改【${defaultLabel}】">${safe}</span>`;
      };

      const plainSlot = (key, defaultLabel, forceCap = false) => {
        const raw = (s[key] || '').trim();
        if (!raw) return `【${defaultLabel}】`;
        return forceCap ? capFirst(raw) : raw;
      };

      // Build Paragraphs
      let p1Html = '', p1Plain = '', p1Cn = '';
      let p2Html = '', p2Plain = '', p2Cn = '';
      let p3Html = '', p3Plain = '', p3Cn = '';

      if (st.tier === 'fast') {
        p1Html = `Though deceptively simple, this ${renderSlot('chartType', st.fastCarrier || '图表/画面名称')} conveys a meaningful message: ${renderSlot('desc', '图画／图表／文本描述')}. It serves as a compelling testament to the significance of ${renderSlot('theme', '主题词')}.`;
        p1Plain = `Though deceptively simple, this ${plainSlot('chartType', st.fastCarrier || 'scene/chart')} conveys a meaningful message: ${plainSlot('desc', '图画／图表／文本描述')}. It serves as a compelling testament to the significance of ${plainSlot('theme', '主题词')}.`;
        p1Cn = `尽管画面／【图表名称】／文本看似简单，却传递出深刻的寓意／信息：【图画／图表／文本描述】。它有力地证明了【主题词】的重要性。`;

        const isTrend = st.fastMode === 'trend';
        const s1H = isTrend
          ? `To begin with, experience suggests that this trend/pattern can be explained in part by people's desire to ${renderSlot('behavior', '具体行为')}.`
          : `To begin with, experience suggests that ${renderSlot('theme', '主题词')} finds direct expression in phenomena exemplified by the way people ${renderSlot('behavior', '具体行为')}.`;
        const s1P = isTrend
          ? `To begin with, experience suggests that this trend/pattern can be explained in part by people's desire to ${plainSlot('behavior', '具体行为')}.`
          : `To begin with, experience suggests that ${plainSlot('theme', '主题词')} finds direct expression in phenomena exemplified by the way people ${plainSlot('behavior', '具体行为')}.`;

        const s2 = isTrend
          ? `This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences.`
          : `Those who value such practices are exemplars of self-improvement and higher achievement.`;
        const s3 = `However, we should recognise that social conditions fundamentally shape the choices available to individuals.`;

        const s4H = isTrend
          ? `From this perspective, it is the promotion of national strategies for ${renderSlot('strategy', '相关战略')} that provides impetus for these developments.`
          : `From this perspective, a shared commitment to ${renderSlot('strategy', '相关战略')} can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress.`;
        const s4P = isTrend
          ? `From this perspective, it is the promotion of national strategies for ${plainSlot('strategy', '相关战略')} that provides impetus for these developments.`
          : `From this perspective, a shared commitment to ${plainSlot('strategy', '相关战略')} can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress.`;

        const s5H = isTrend
          ? `A study published by ${renderSlot('authority', '权威机构／期刊')} lends support to the view that ${renderSlot('theme', '主题词')} plays an important role in driving this trend.`
          : `An article published by ${renderSlot('authority', '权威机构／期刊')} lends support to the view that societies placing greater emphasis on ${renderSlot('theme', '主题词')} enjoy higher levels of vitality and prosperity, a pattern consistent across multiple indicators.`;
        const s5P = isTrend
          ? `A study published by ${plainSlot('authority', '权威机构／期刊')} lends support to the view that ${plainSlot('theme', '主题词')} plays an important role in driving this trend.`
          : `An article published by ${plainSlot('authority', '权威机构／期刊')} lends support to the view that societies placing greater emphasis on ${plainSlot('theme', '主题词')} enjoy higher levels of vitality and prosperity, a pattern consistent across multiple indicators.`;

        p2Html = `${s1H} ${s2} ${s3} ${s4H} ${s5H}`;
        p2Plain = `${s1P} ${s2} ${s3} ${s4P} ${s5P}`;
        p2Cn = isTrend
          ? `首先，从经验上讲，这一趋势可以部分归因于人们【具体行为】的愿望。这并不令人意外，因为人们倾向于选择自己认为会带来理想结果的行为。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，正是国家在【相关战略】方面的战略倡导与推广，为这些发展变化提供了动力。【权威机构】刊载的一项研究支持这样一种观点，即【主题词】在推动这一趋势方面发挥着重要作用。`
          : `首先，从经验上讲，【主题词】直接体现在以人们【具体行为】为代表的现象之中。重视这类做法的人，是自我完善和更高成就的典范。然而，我们应该认识到，社会条件从根本上塑造了个人能够作出的选择。基于这一认识，对【相关战略】的共同坚持能够为社区和国家在和谐中蓬勃发展创造条件，为可持续进步奠定基础。【权威机构】刊载的一篇文章支持这种观点，即更重视【主题词】的社会拥有更高水平的活力与繁荣。`;
      } else {
        if (st.materialType === 'picture') {
          p1Html = `Though deceptively simple, this scene conveys a meaningful message: ${renderSlot('desc', '图画描述')}. It serves as a compelling testament to the significance of ${renderSlot('theme', '主题词')}.`;
          p1Plain = `Though deceptively simple, this scene conveys a meaningful message: ${plainSlot('desc', '图画描述')}. It serves as a compelling testament to the significance of ${plainSlot('theme', '主题词')}.`;
          p1Cn = `尽管画面看似简单，却传递出深刻的寓意：【图画描述】。它有力地证明了【主题词】的重要性。`;
        } else if (st.materialType === 'passage') {
          p1Html = `${renderSlot('theme', '主题词', true)} has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that ${renderSlot('desc', '提炼文段大意')}. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.`;
          p1Plain = `${plainSlot('theme', '主题词', true)} has long been a subject of public debate. The passage offers a fresh perspective on this issue, arguing that ${plainSlot('desc', '提炼文段大意')}. While this view may not convince everyone, I find it original and illuminating, and I agree with it wholeheartedly.`;
          p1Cn = `长期以来，【主题词】一直是公众讨论的议题。上述文段为这一问题提供了新的视角，主张【提炼文段大意】。虽然这一观点未必能说服所有人，但我认为它新颖而富有启发性，并完全赞同。`;
        } else {
          const noun = st.materialType === 'dynamic_chart' ? 'changes' : 'differences';
          const defaultDesc = st.materialType === 'dynamic_chart'
            ? 'Between 【起始时间】 and 【终止时间】, the proportion of 【类别一】 rose from about 【数据1】 to around 【数据2】'
            : '【类别一】 accounts for the largest share, at 【最大比例】, followed by 【类别二】 and 【类别三】 at 【第二比例】 and 【第三比例】 respectively';
          p1Html = `The figures in the ${renderSlot('chartType', '图表类型')} reveal notable ${noun} concerning ${renderSlot('theme', '主题词')}. ${renderSlot('desc', st.materialType === 'dynamic_chart' ? '动态趋势数据描述' : '静态占比数据描述', true)}.`;
          p1Plain = `The figures in the ${plainSlot('chartType', '图表类型')} reveal notable ${noun} concerning ${plainSlot('theme', '主题词')}. ${plainSlot('desc', defaultDesc, true)}.`;
          p1Cn = `图表中的数据揭示了有关【主题词】的显著${st.materialType === 'dynamic_chart' ? '变化' : '差异'}。${st.materialType === 'dynamic_chart' ? '从【起始时间】到【终止时间】，【类别一】从【数据1】变化至【数据2】。' : '【类别一】占比最高，随后是【类别二】、【类别三】。'}`;
        }

        if (st.tier === 'full') {
          p2Html = `${renderSlot('theme', '主题词', true)} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ${renderSlot('behavior', '具体行为')}, ultimately contributing to ${renderSlot('outcome', '可见成果')}. National policies on ${renderSlot('domain', '相关领域')} likewise focus on empowering individuals to ${renderSlot('ability', '个人能力/行为')}. Beyond personal advancement, this principle can strengthen communities by ${renderSlot('socialEffect', '社会效果')}, laying the groundwork for sustainable progress. This is in line with national strategies for ${renderSlot('strategy', '相关战略')}: as this principle takes root, ${renderSlot('socialChange', '社会变化')}.`;
          p2Plain = `${plainSlot('theme', '主题词', true)} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ${plainSlot('behavior', '具体行为')}, ultimately contributing to ${plainSlot('outcome', '可见成果')}. National policies on ${plainSlot('domain', '相关领域')} likewise focus on empowering individuals to ${plainSlot('ability', '个人能力/行为')}. Beyond personal advancement, this principle can strengthen communities by ${plainSlot('socialEffect', '社会效果')}, laying the groundwork for sustainable progress. This is in line with national strategies for ${plainSlot('strategy', '相关战略')}: as this principle takes root, ${plainSlot('socialChange', '社会变化')}.`;
          p2Cn = `【主题词】受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们【具体行为】的方式之中，最终有助于【可见成果】。国家在【相关领域】方面的政策，同样着重于使个人能够【个人能力/行为】。除个人发展之外，这一原则还可以通过【社会效果】增强社区，为可持续进步奠定基础。这与国家的【相关战略】相契合：随着这一理念逐渐扎根，【社会变化】。`;
        } else {
          p2Html = `${renderSlot('theme', '主题词', true)} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ${renderSlot('behavior', '具体行为')}, ultimately contributing to personal development and well-being. National policies on ${renderSlot('domain', '相关领域')} likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by ${renderSlot('socialEffect', '社会效果')}, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.`;
          p2Plain = `${plainSlot('theme', '主题词', true)} has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ${plainSlot('behavior', '具体行为')}, ultimately contributing to personal development and well-being. National policies on ${plainSlot('domain', '相关领域')} likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by ${plainSlot('socialEffect', '社会效果')}, laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.`;
          p2Cn = `【主题词】受到关注，一个重要原因是其影响深远。在个人层面，它体现在人们【具体行为】的方式之中，最终有助于个人发展与福祉。国家在【相关领域】方面的政策，同样着重于使个人能够充分发挥自身潜能。除个人发展之外，这一原则还可以通过【社会效果】增强社区，为可持续进步奠定基础。随着这一理念在全社会逐渐扎根，它会产生连锁效应，促进社会和谐与长期繁荣。`;
        }
      }

      p3Html = `In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when ${renderSlot('theme', '主题词')} guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.`;
      p3Plain = `In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when ${plainSlot('theme', '主题词')} guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.`;
      p3Cn = `总之，人们已经形成一种基于理性认识的共识，即当【主题词】指导行动时，个人与社区都能获得不可估量的益处。因此，倡导这一原则不仅可取，而且是全面发展的必要条件。`;

      const cleanDots = (str) => str.replace(/\.\./g, '.');
      p1Html = cleanDots(p1Html); p1Plain = cleanDots(p1Plain);
      const fullPlain = `${p1Plain}\n\n${p2Plain}\n\n${p3Plain}`;

      // Count pure English scaffold/filled words (excluding 【...】 placeholders)
      const pureEnglish = fullPlain.replace(/【[^】]+】/g, ' ');
      const wordCount = (pureEnglish.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
      const blankCount = (fullPlain.match(/【[^】]+】/g) || []).length;
      const totalSlotsCount = st.tier === 'full' ? 10 : (st.tier === 'simplified' ? 6 : 6);

      panel.innerHTML = `
        <!-- Top Lightweight Controls -->
        <div class="writing-inline-bar">
          <div class="filter-group">
            <button class="filter-btn op-paper-tier ${st.tier === 'full' ? 'active' : ''}" data-tier="full">满分版</button>
            <button class="filter-btn op-paper-tier ${st.tier === 'simplified' ? 'active' : ''}" data-tier="simplified">简化版</button>
            <button class="filter-btn op-paper-tier ${st.tier === 'fast' ? 'active' : ''}" data-tier="fast">速通版</button>
          </div>
          <div class="filter-group">
            <select id="opPaperValueSelect" class="w-select" title="选择配套语料核心价值观">
              ${corpus.filter(c => c.index <= 7).map(c => `
                <option value="${c.id}" ${st.selectedValue === c.id ? 'selected' : ''}>价值观语料库：${c.index}. ${c.name}</option>
              `).join('')}
            </select>
            <button class="paper-text-btn" id="opFillDemoBtn" title="填入当前价值观真题套写示范">填入【${(corpus.find(c => c.id === st.selectedValue) || { name: '示范' }).name}】示范</button>
            <button class="paper-text-btn" id="opClearSlotsBtn" title="还原为纯虚线填空模板">清空空位</button>
          </div>
        </div>

        <!-- Minimalist Paper Sheet (Matches Reference Image) -->
        <div class="paper-sheet ${this.isFullscreen ? 'is-fullscreen' : ''}" id="opMainPaperSheet">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <button class="paper-icon-btn" id="opToggleFullscreenBtn" title="${this.isFullscreen ? '退出全屏' : '展开聚焦'}">
                ${this.isFullscreen ? '✕ 退出' : '⤢'}
              </button>
              <span style="font-size:0.9em;color:var(--w-muted)">
                ${st.tier === 'fast' ? '全题型通用' : MATERIAL_NAMES[st.materialType]} · 当前语料【${(corpus.find(c => c.id === st.selectedValue) || { name: '和谐' }).name}】 · 点击文中虚线填词
              </span>
            </div>
            <div class="paper-toolbar-right">
              <label class="w-switch-label">
                <input type="checkbox" class="w-switch-input" id="opBilingualToggle" ${this.showBilingual ? 'checked' : ''}>
                <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                <span>中英对照</span>
              </label>
            </div>
          </div>

          <!-- Paragraph 1 -->
          <div class="paper-section">
            <div class="paper-section-head">
              <span class="paper-section-title">第一段 · 材料与主题</span>
              <button class="paper-swap-btn" id="opSwapP1Btn" title="切换首段材料类型（图画 / 静态图 / 动态图 / 文本）">
                <span class="swap-hint">${st.tier === 'fast' ? '速通起手' : MATERIAL_NAMES[st.materialType]}</span> ⇄
              </button>
            </div>
            <div class="paper-en-text">${p1Html}</div>
            ${this.showBilingual ? `<div class="paper-cn-text">${p1Cn}</div>` : ''}
          </div>

          <!-- Paragraph 2 -->
          <div class="paper-section">
            <div class="paper-section-head">
              <span class="paper-section-title">第二段 · 分析与论证</span>
              ${st.tier === 'fast' ? `
                <button class="paper-swap-btn" id="opSwapP2Btn" title="切换速通版逻辑分支">
                  <span class="swap-hint">${st.fastMode === 'trend' ? '图表趋势分支' : '图画/主题分支'}</span> ⇄
                </button>
              ` : `
                <button class="paper-swap-btn op-copy-para" data-raw="${encodeURIComponent(p2Plain)}" title="复制第二段">⇄</button>
              `}
            </div>
            <div class="paper-en-text">${p2Html}</div>
            ${this.showBilingual ? `<div class="paper-cn-text">${p2Cn}</div>` : ''}
          </div>

          <!-- Paragraph 3 -->
          <div class="paper-section">
            <div class="paper-section-head">
              <span class="paper-section-title">第三段 · 总结与措施</span>
              <button class="paper-swap-btn op-copy-para" data-raw="${encodeURIComponent(p3Plain)}" title="复制第三段">⇄</button>
            </div>
            <div class="paper-en-text">${p3Html}</div>
            ${this.showBilingual ? `<div class="paper-cn-text">${p3Cn}</div>` : ''}
          </div>

          <!-- Footer Bar -->
          <div class="paper-footer">
            <div class="paper-footer-stats">
              <span>英文词数 <strong>${wordCount}</strong></span>
              <span>${blankCount > 0 ? `<strong>${blankCount}</strong> 个可替换位置` : `全部空位已填完（共 ${totalSlotsCount} 处）`}</span>
            </div>
            <button class="paper-text-btn" id="opCopyWholePaperBtn">复制全文</button>
          </div>
        </div>
      `;

      // Bind Paper Events
      panel.querySelectorAll('.op-paper-tier').forEach(btn => {
        btn.addEventListener('click', () => {
          this.builderState.tier = btn.dataset.tier;
          this.renderPaperPanel();
        });
      });

      const valSel = panel.querySelector('#opPaperValueSelect');
      if (valSel) {
        valSel.addEventListener('change', (e) => {
          const newVal = e.target.value;
          this.builderState.selectedValue = newVal;
          const valObj = corpus.find(c => c.id === newVal);
          const vName = valObj ? valObj.name : newVal;
          const hasFilled = !!(this.builderState.slots.theme || this.builderState.slots.behavior || this.builderState.slots.strategy);
          if (hasFilled && VALUE_PRESETS[newVal]) {
            this.builderState.slots = Object.assign({}, VALUE_PRESETS[newVal]);
            this.builderState.materialType = VALUE_PRESETS[newVal].chartType === 'scene' ? 'picture' : (newVal === 'prosperity' ? 'dynamic_chart' : 'static_chart');
            if (typeof window.showToast === 'function') {
              window.showToast(`已切换并填入【${vName}】示范搭配`);
            }
          } else {
            if (typeof window.showToast === 'function') {
              window.showToast(`已切换语料库为【${vName}】，点击文中虚线可选词`);
            }
          }
          this.renderPaperPanel();
        });
      }

      const demoBtn = panel.querySelector('#opFillDemoBtn');
      if (demoBtn) {
        demoBtn.addEventListener('click', () => {
          const vid = this.builderState.selectedValue;
          if (VALUE_PRESETS[vid]) {
            this.builderState.slots = Object.assign({}, VALUE_PRESETS[vid]);
            this.builderState.materialType = VALUE_PRESETS[vid].chartType === 'scene' ? 'picture' : (vid === 'prosperity' ? 'dynamic_chart' : 'static_chart');
            this.renderPaperPanel();
          }
        });
      }

      const clearBtn = panel.querySelector('#opClearSlotsBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          Object.keys(this.builderState.slots).forEach(k => {
            this.builderState.slots[k] = k === 'authority' ? 'Beijing Normal University' : (k === 'chartType' ? 'bar chart' : '');
          });
          this.builderState.slots.chartType = '';
          this.builderState.slots.authority = '';
          this.renderPaperPanel();
        });
      }

      const fsBtn = panel.querySelector('#opToggleFullscreenBtn');
      if (fsBtn) {
        fsBtn.addEventListener('click', () => {
          this.isFullscreen = !this.isFullscreen;
          this.renderPaperPanel();
        });
      }

      const biToggle = panel.querySelector('#opBilingualToggle');
      if (biToggle) {
        biToggle.addEventListener('change', (e) => {
          this.showBilingual = !!e.target.checked;
          this.renderPaperPanel();
        });
      }

      const swapP1 = panel.querySelector('#opSwapP1Btn');
      if (swapP1) {
        swapP1.addEventListener('click', () => {
          const idx = MATERIAL_ORDER.indexOf(this.builderState.materialType);
          this.builderState.materialType = MATERIAL_ORDER[(idx + 1) % MATERIAL_ORDER.length];
          this.renderPaperPanel();
        });
      }

      const swapP2 = panel.querySelector('#opSwapP2Btn');
      if (swapP2) {
        swapP2.addEventListener('click', () => {
          this.builderState.fastMode = this.builderState.fastMode === 'trend' ? 'theme' : 'trend';
          this.renderPaperPanel();
        });
      }

      panel.querySelectorAll('.op-copy-para').forEach(btn => {
        btn.addEventListener('click', () => {
          this.copyText(decodeURIComponent(btn.dataset.raw || ''), btn);
        });
      });

      const copyAll = panel.querySelector('#opCopyWholePaperBtn');
      if (copyAll) {
        copyAll.addEventListener('click', () => {
          this.copyText(fullPlain, copyAll);
        });
      }

      // Clickable dashed blanks inside paper
      panel.querySelectorAll('.slot-blank').forEach(span => {
        span.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openSlotPopover(span, span.dataset.slot);
        });
      });
    },

    openSlotPopover(anchorEl, slotKey) {
      this.closeSlotPopover();
      const meta = SLOT_LABELS[slotKey] || { name: slotKey, hint: '' };
      const corpus = this.getData().corpus || [];
      const curValObj = corpus.find(c => c.id === this.builderState.selectedValue) || corpus[0];
      const supportsValuesSwitch = !!(meta.corpusKey || slotKey === 'theme');

      let options = [];
      if (meta.corpusKey && curValObj && curValObj.slots && curValObj.slots[meta.corpusKey]) {
        options = curValObj.slots[meta.corpusKey].filter(x => x.en);
      } else if (slotKey === 'chartType') {
        options = [
          { en: 'bar chart', zh: '柱状图 / 条形图' },
          { en: 'line chart', zh: '折线图' },
          { en: 'pie chart', zh: '饼图' },
          { en: 'table', zh: '表格' },
          { en: 'scene', zh: '图画场景' },
          { en: 'passage', zh: '文本评论材料' }
        ];
      } else if (slotKey === 'authority') {
        options = [
          { en: 'Beijing Normal University', zh: '北京师范大学' },
          { en: 'Peking University', zh: '北京大学' },
          { en: "People's Daily", zh: '人民日报' },
          { en: 'China Daily', zh: '中国日报' },
          { en: 'Guangming Daily', zh: '光明日报' }
        ];
      } else if (slotKey === 'desc') {
        options = [
          { en: 'by the river, an elderly resident who seems delighted watches a dragon boat race, saying that the event in the village is becoming livelier', zh: '单主语图画公式（示例：23英一龙舟赛）' },
          { en: 'at a desk, a girl who is working attentively wants to finish early, while a boy sits back at another desk, saying that he will not start until the last minute', zh: '双主语对比图画公式（示例：20英一习惯）' },
          { en: 'in a survey of [调查对象], [最大类别] accounts for the largest share, at [50%], followed by [类别2] and [类别3] at [30%] and [20%] respectively', zh: '静态图表占比公式（饼图/单年柱图/表）' },
          { en: 'between [2014] and [2023], the proportion of [类别1] rose from about [20%] to around [65%], while that of [类别2] increased slightly from roughly [15%] to approximately [25%]', zh: '动态图表趋势公式（多年份折线/柱图）' }
        ];
      } else if (slotKey === 'theme' && curValObj) {
        const preset = VALUE_PRESETS[curValObj.id];
        if (preset) options.push({ en: preset.theme, zh: '推荐核心主题词' });
        ((curValObj.slots && curValObj.slots.strategy) || []).slice(0, 6).forEach(stItem => {
          if (stItem.en) options.push({ en: stItem.en, zh: stItem.zh + '（战略词汇用作主题）' });
        });
      }

      const backdrop = document.createElement('div');
      backdrop.className = 'slot-popover-backdrop';
      backdrop.id = 'opSlotBackdrop';

      const pop = document.createElement('div');
      pop.className = 'slot-popover';
      pop.id = 'opSlotPopover';

      const curVal = this.builderState.slots[slotKey] || '';
      const isMulti = slotKey === 'desc';

      pop.innerHTML = `
        <div class="slot-popover-head">
          <strong>填写【${meta.name}】</strong>
          <button class="paper-icon-btn" id="opPopoverClose">✕</button>
        </div>
        <div class="slot-popover-body">
          <div style="font-size:0.88em;color:var(--w-muted);margin-bottom:8px;line-height:1.5">${meta.hint}</div>
          ${isMulti
            ? `<textarea class="slot-popover-input" id="opPopoverInput" rows="3" placeholder="直接输入英文描述，按 Ctrl+Enter 或点击确认...">${curVal.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>`
            : `<input type="text" class="slot-popover-input" id="opPopoverInput" value="${curVal.replace(/"/g, '&quot;')}" placeholder="直接输入英文，按 Enter 确认...">`
          }
          <div style="display:flex;justify-content:flex-end;gap:8px">
            <button class="paper-text-btn" id="opPopoverClear">清除</button>
            <button class="paper-text-btn" id="opPopoverSave" style="background:var(--w-ink);color:var(--w-paper);border-color:var(--w-ink)">确认填入</button>
          </div>
          ${supportsValuesSwitch ? `
            <div class="popover-val-pills">
              ${corpus.filter(c => c.index <= 7).map(c => `
                <button class="popover-val-pill ${this.builderState.selectedValue === c.id ? 'active' : ''}" data-vid="${c.id}">${c.index}.${c.name}</button>
              `).join('')}
            </div>
          ` : ''}
          ${options.length > 0 ? `
            <div style="font-size:0.88em;color:var(--w-muted);margin-top:6px">
              ${slotKey === 'desc' ? '点击下方万能句型公式填入模板并改写细节：' : `点击下方【${curValObj ? curValObj.name : ''}】语料直接填入：`}
            </div>
            <div class="slot-popover-opts">
              ${options.map(o => `
                <button class="slot-popover-opt" data-en="${encodeURIComponent(o.en)}">
                  <span class="opt-en">${o.en}</span>
                  ${o.zh ? `<span class="opt-zh">${o.zh}</span>` : ''}
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;

      document.body.appendChild(backdrop);
      document.body.appendChild(pop);

      const rect = anchorEl.getBoundingClientRect();
      const popW = Math.min(460, window.innerWidth - 24);
      let left = rect.left;
      if (left + popW > window.innerWidth - 12) left = window.innerWidth - popW - 12;
      if (left < 12) left = 12;
      let top = rect.bottom + 8;
      if (top + 380 > window.innerHeight) {
        top = Math.max(12, rect.top - 390);
      }
      pop.style.left = left + 'px';
      pop.style.top = top + 'px';

      const inp = document.getElementById('opPopoverInput');
      if (inp) {
        inp.focus();
        if (!isMulti) inp.select();
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && (!isMulti || e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            this.builderState.slots[slotKey] = inp.value.trim();
            this.closeSlotPopover();
            this.renderPaperPanel();
          } else if (e.key === 'Escape') {
            this.closeSlotPopover();
          }
        });
      }

      document.getElementById('opPopoverClose').addEventListener('click', () => this.closeSlotPopover());
      backdrop.addEventListener('click', () => this.closeSlotPopover());

      document.getElementById('opPopoverSave').addEventListener('click', () => {
        this.builderState.slots[slotKey] = inp ? inp.value.trim() : '';
        this.closeSlotPopover();
        this.renderPaperPanel();
      });

      document.getElementById('opPopoverClear').addEventListener('click', () => {
        this.builderState.slots[slotKey] = '';
        this.closeSlotPopover();
        this.renderPaperPanel();
      });

      pop.querySelectorAll('.popover-val-pill').forEach(vBtn => {
        vBtn.addEventListener('click', () => {
          this.builderState.selectedValue = vBtn.dataset.vid;
          this.renderPaperPanel();
          // Re-open popover anchored at the refreshed slot element
          const refreshedPanel = this.container.querySelector('#opPanel_opPaper');
          const refreshedSpan = refreshedPanel && refreshedPanel.querySelector(`.slot-blank[data-slot="${slotKey}"]`);
          if (refreshedSpan) {
            this.openSlotPopover(refreshedSpan, slotKey);
          } else {
            this.closeSlotPopover();
          }
        });
      });

      pop.querySelectorAll('.slot-popover-opt').forEach(optBtn => {
        optBtn.addEventListener('click', () => {
          const picked = decodeURIComponent(optBtn.dataset.en || '');
          if (slotKey === 'desc') {
            if (inp) {
              inp.value = picked;
              inp.focus();
            }
          } else {
            this.builderState.slots[slotKey] = picked;
            this.closeSlotPopover();
            this.renderPaperPanel();
          }
        });
      });
    },

    closeSlotPopover() {
      const b = document.getElementById('opSlotBackdrop');
      const p = document.getElementById('opSlotPopover');
      if (b) b.remove();
      if (p) p.remove();
    },

    /* ==========================================================================
       2. 七类核心价值观语料库
       ========================================================================== */
    renderCorpusPanel() {
      const panel = this.container.querySelector('#opPanel_opCorpus');
      const corpus = this.getData().corpus || [];
      if (!panel) return;

      const slotMeta = [
        { key: 'behavior', label: '具体行为 (the way people + 动词原形)' },
        { key: 'outcome', label: '可见成果 (contributing to + 名词/动名词)' },
        { key: 'domain', label: '相关领域 (National policies on + 名词)' },
        { key: 'ability', label: '政策能力 (empowering individuals to + 动词原形)' },
        { key: 'socialEffect', label: '社会效果 (strengthen communities by + V-ing)' },
        { key: 'strategy', label: '相关战略 (strategies for + 名词/动名词)' },
        { key: 'socialChange', label: '社会变化 (as this principle takes root, + 完整小句)' }
      ];

      const q = (this.corpusSearch || '').trim().toLowerCase();
      const filteredVals = corpus.filter(v => this.corpusFilterId === 'all' || v.id === this.corpusFilterId);

      panel.innerHTML = `
        <div class="writing-inline-bar">
          <div class="filter-group">
            <button class="filter-btn op-val-btn ${this.corpusFilterId === 'all' ? 'active' : ''}" data-vid="all">全部</button>
            ${corpus.map(v => `
              <button class="filter-btn op-val-btn ${this.corpusFilterId === v.id ? 'active' : ''}" data-vid="${v.id}">
                ${v.index <= 7 ? v.index + '. ' : ''}${v.name}
              </button>
            `).join('')}
          </div>
          <input type="text" id="opCorpusSearchInput" value="${this.corpusSearch.replace(/"/g, '&quot;')}" placeholder="搜索短语或年份..." class="w-input">
        </div>

        ${filteredVals.map(val => {
          const sectionsHtml = slotMeta.map(sm => {
            const items = (val.slots && val.slots[sm.key]) || [];
            const matched = q ? items.filter(it => (it.en + ' ' + it.zh).toLowerCase().includes(q)) : items;
            if (!matched.length) return '';
            return `
              <div style="margin-bottom:18px">
                <div style="font-size:0.9em;font-weight:700;color:var(--w-muted);margin-bottom:8px">${sm.label}</div>
                <div class="clean-phrase-list">
                  ${matched.map(it => `
                    <div class="clean-phrase-row op-copy-phrase" data-raw="${encodeURIComponent(it.en || it.zh)}" title="点击复制">
                      <div>
                        ${it.en ? `<div class="clean-phrase-en">${it.en}</div>` : ''}
                        ${it.zh ? `<div class="clean-phrase-zh">${it.zh}</div>` : ''}
                      </div>
                      ${it.en ? `<button class="clean-link-btn op-fill-slot" data-slot="${sm.key}" data-val="${encodeURIComponent(it.en)}" data-vid="${val.id}" style="flex-shrink:0">填入</button>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('');

          if (q && !sectionsHtml && !(val.topics + val.exams + val.name).toLowerCase().includes(q)) {
            return '';
          }

          return `
            <div class="paper-sheet">
              <div class="paper-toolbar">
                <div class="paper-toolbar-left">
                  <strong style="font-size:1.02em">${val.index <= 7 ? val.index + '. ' : ''}${val.name} · ${val.enName}</strong>
                  <span style="font-size:0.9em;color:var(--w-muted)">${val.topics || ''} ${val.exams ? '｜' + val.exams : ''}</span>
                </div>
                ${VALUE_PRESETS[val.id] ? `<button class="paper-text-btn op-use-value-preset" data-vid="${val.id}">套用此主题词示范</button>` : ''}
              </div>
              <div class="paper-section" style="border-bottom:none">
                ${sectionsHtml || '<div style="color:var(--w-muted)">无匹配条目</div>'}
              </div>
            </div>
          `;
        }).join('')}
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
          const pos = searchEl.selectionStart;
          this.renderCorpusPanel();
          const newInp = this.container.querySelector('#opCorpusSearchInput');
          if (newInp) {
            newInp.focus();
            try { newInp.setSelectionRange(pos, pos); } catch (_) {}
          }
        });
      }

      panel.querySelectorAll('.op-fill-slot').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const slot = btn.dataset.slot;
          const valStr = decodeURIComponent(btn.dataset.val || '');
          const vid = btn.dataset.vid;
          if (slot && valStr) {
            this.builderState.slots[slot] = valStr;
            if (vid && VALUE_PRESETS[vid]) this.builderState.selectedValue = vid;
            if (typeof window.showToast === 'function') {
              window.showToast(`已填入【${(SLOT_LABELS[slot] && SLOT_LABELS[slot].name) || slot}】`);
            }
            this.switchSubTab('opPaper');
          }
        });
      });

      panel.querySelectorAll('.op-copy-phrase').forEach(row => {
        row.addEventListener('click', () => {
          this.copyText(decodeURIComponent(row.dataset.raw || ''), null);
        });
      });

      panel.querySelectorAll('.op-use-value-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const vid = btn.dataset.vid;
          if (vid && VALUE_PRESETS[vid]) {
            this.builderState.selectedValue = vid;
            this.builderState.slots = Object.assign({}, VALUE_PRESETS[vid]);
            this.builderState.materialType = VALUE_PRESETS[vid].chartType === 'scene' ? 'picture' : (vid === 'prosperity' ? 'dynamic_chart' : 'static_chart');
            this.switchSubTab('opPaper');
          }
        });
      });
    },

    /* ==========================================================================
       3. 2020-2026 英语二四档实操 (极简纸面排版)
       ========================================================================== */
    highlightPracticeParagraph(text, paraIdx, tierKey) {
      const esc = (s) => this.escapeHtml(String(s || ''));
      const spanVar = (tag, val, isPromptData = false) =>
        `<span class="pr-var${isPromptData ? ' is-prompt-data' : ''}"><span class="pr-var-tag">${esc(tag)}</span>${esc(val)}</span>`;

      // P1: Introduction
      if (paraIdx === 0) {
        let m = text.match(/^Though deceptively simple, this (.+?) conveys a meaningful message:\s*(.+?)\.\s*It serves as a compelling testament to the significance of (.+?)\.$/);
        if (m) {
          return (
            'Though deceptively simple, this ' +
            spanVar('材料载体', m[1], true) +
            ' conveys a meaningful message: ' +
            spanVar('题面数据/描述', m[2], true) +
            '. It serves as a compelling testament to the significance of ' +
            spanVar('主题词', m[3], false) +
            '.'
          );
        }
        m = text.match(/^The figures in the (.+?) reveal notable (changes|differences) concerning (.+?)\.\s*(.+)$/);
        if (m) {
          return (
            'The figures in the ' +
            spanVar('图表类型', m[1], true) +
            ' reveal notable ' +
            esc(m[2]) +
            ' concerning ' +
            spanVar('主题词', m[3], false) +
            '. ' +
            spanVar('图表数据描述', m[4], true)
          );
        }
        return esc(text);
      }

      // P2: Body
      if (paraIdx === 1) {
        if (tierKey === 'full') {
          const m = text.match(/^(.+?) has attracted attention, not least because of its far-reaching implications\.\s*At the individual level, it is reflected in the way people (.+?), ultimately contributing to (.+?)\.\s*National policies on (.+?) likewise focus on empowering individuals to (.+?)\.\s*Beyond personal advancement, this principle can strengthen communities by (.+?), laying the groundwork for sustainable progress\.\s*This is in line with national strategies for (.+?):\s*as this principle takes root, (.+?)\.$/);
          if (m) {
            return (
              spanVar('主题词', m[1]) +
              ' has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ' +
              spanVar('具体行为', m[2]) +
              ', ultimately contributing to ' +
              spanVar('可见成果', m[3]) +
              '. National policies on ' +
              spanVar('相关领域', m[4]) +
              ' likewise focus on empowering individuals to ' +
              spanVar('个人能力/行为', m[5]) +
              '. Beyond personal advancement, this principle can strengthen communities by ' +
              spanVar('社会效果', m[6]) +
              ', laying the groundwork for sustainable progress. This is in line with national strategies for ' +
              spanVar('相关战略', m[7]) +
              ': as this principle takes root, ' +
              spanVar('社会变化', m[8]) +
              '.'
            );
          }
        } else if (tierKey === 'simplified') {
          const m = text.match(/^(.+?) has attracted attention, not least because of its far-reaching implications\.\s*At the individual level, it is reflected in the way people (.+?), ultimately contributing to personal development and well-being\.\s*National policies on (.+?) likewise focus on empowering individuals to achieve their full potential\.\s*Beyond personal advancement, this principle can strengthen communities by (.+?), laying the groundwork for sustainable progress\.\s*As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity\.$/);
          if (m) {
            return (
              spanVar('主题词', m[1]) +
              ' has attracted attention, not least because of its far-reaching implications. At the individual level, it is reflected in the way people ' +
              spanVar('具体行为', m[2]) +
              ', ultimately contributing to personal development and well-being. National policies on ' +
              spanVar('相关领域', m[3]) +
              ' likewise focus on empowering individuals to achieve their full potential. Beyond personal advancement, this principle can strengthen communities by ' +
              spanVar('社会效果', m[4]) +
              ', laying the groundwork for sustainable progress. As this principle takes root across society, it creates a ripple effect that benefits social harmony and long-term prosperity.'
            );
          }
        } else {
          let rem = text;
          let out = '';

          let s1 = rem.match(/^To begin with, experience suggests that (.+?) finds direct expression in phenomena exemplified by the way people (.+?)\.\s*/);
          if (s1) {
            out += 'To begin with, experience suggests that ' + spanVar('主题词', s1[1]) + ' finds direct expression in phenomena exemplified by the way people ' + spanVar('具体行为', s1[2]) + '. ';
            rem = rem.slice(s1[0].length);
          } else {
            s1 = rem.match(/^To begin with, experience suggests that this (trend|pattern) can be explained in part by people's desire to (.+?)\.\s*/);
            if (!s1) return esc(text);
            out += "To begin with, experience suggests that this " + esc(s1[1]) + " can be explained in part by people's desire to " + spanVar('具体行为', s1[2]) + '. ';
            rem = rem.slice(s1[0].length);
          }

          const s23 = rem.match(/^(This is hardly surprising, as people tend to favour behaviour they believe will have desirable consequences\.|Those who value such practices are exemplars of self-improvement and higher achievement\.)\s*(However, we should recognise that social conditions fundamentally shape the choices available to individuals\.)\s*/);
          if (!s23) return esc(text);
          out += esc(s23[1]) + ' ' + esc(s23[2]) + ' ';
          rem = rem.slice(s23[0].length);

          let s4 = rem.match(/^From this perspective, it is the promotion of national strategies for (.+?) that provides impetus for these developments\.\s*/);
          if (s4) {
            out += 'From this perspective, it is the promotion of national strategies for ' + spanVar('相关战略', s4[1]) + ' that provides impetus for these developments. ';
            rem = rem.slice(s4[0].length);
          } else {
            s4 = rem.match(/^From this perspective, a shared commitment to (.+?) can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress\.\s*/);
            if (!s4) return esc(text);
            out += 'From this perspective, a shared commitment to ' + spanVar('相关战略', s4[1]) + ' can create the conditions for communities and nations to flourish in harmony, laying the groundwork for sustainable progress. ';
            rem = rem.slice(s4[0].length);
          }

          let s5 = rem.match(/^(A study|An article) published by (.+?) lends support to the view that (.+?) plays an important role in (driving this trend|fostering community prosperity)\.$/);
          if (s5) {
            out += esc(s5[1]) + ' published by ' + spanVar('权威机构/期刊', s5[2]) + ' lends support to the view that ' + spanVar('主题词', s5[3]) + ' plays an important role in ' + esc(s5[4]) + '.';
            return out;
          }
          s5 = rem.match(/^(A study|An article) published by (.+?) lends support to the view that societies placing greater emphasis on (.+?) enjoy higher levels of vitality and prosperity, a pattern consistent across multiple indicators\.$/);
          if (s5) {
            out += esc(s5[1]) + ' published by ' + spanVar('权威机构/期刊', s5[2]) + ' lends support to the view that societies placing greater emphasis on ' + spanVar('主题词', s5[3]) + ' enjoy higher levels of vitality and prosperity, a pattern consistent across multiple indicators.';
            return out;
          }
        }
        return esc(text);
      }

      // P3: Conclusion
      if (paraIdx === 2) {
        const m = text.match(/^In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when (.+?) guides action\. Promoting this principle is therefore not merely advisable but essential for holistic development\.$/);
        if (m) {
          return (
            'In conclusion, a rational consensus has emerged that both individuals and communities benefit immeasurably when ' +
            spanVar('主题词', m[1]) +
            ' guides action. Promoting this principle is therefore not merely advisable but essential for holistic development.'
          );
        }
      }
      return esc(text);
    },

    escapeHtml(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },

    renderPracticePanel() {
      const panel = this.container.querySelector('#opPanel_opPractice');
      const list = this.getData().practiceE2 || [];
      if (!panel) return;

      const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
      const yearItems = list.filter(x => x.year === this.practiceYear);
      const item = yearItems.find(x => x.tierKey === this.practiceTier) || yearItems[0];

      const tiers = [
        { key: 'full', label: '满分版' },
        { key: 'simplified', label: '简化版' },
        { key: 'fast_std', label: '速通·标准' },
        { key: 'fast_ez', label: '速通·无脑' }
      ];

      const enParas = item ? item.enEssay.split('\n\n') : [];
      const cnParas = item ? item.cnEssay.split('\n\n') : [];
      const paraNames = ['第一段 · 材料与主题', '第二段 · 分析与论证', '第三段 · 总结与措施'];

      const promptObj = (window.WRITING_PROMPTS && window.WRITING_PROMPTS.e2_part_b && window.WRITING_PROMPTS.e2_part_b[this.practiceYear]) || {};
      const directionsEn = promptObj.directionsEn || `48. Directions:\nWrite an essay based on the chart below. In your essay, you should\n1) describe and interpret the chart, and\n2) give your comments.\nWrite your answer in about 150 words on the ANSWER SHEET. (15 points)`;

      panel.innerHTML = `
        <div class="writing-inline-bar">
          <div class="filter-group">
            ${years.map(y => `
              <button class="filter-btn op-pr-year ${y === this.practiceYear ? 'active' : ''}" data-year="${y}">${y}</button>
            `).join('')}
          </div>
          <div class="filter-group">
            ${tiers.map(t => `
              <button class="filter-btn op-pr-tier ${t.key === this.practiceTier ? 'active' : ''}" data-tier="${t.key}">${t.label}</button>
            `).join('')}
          </div>
        </div>

        ${item ? `
          ${this.practiceShowPrompt ? '<div class="pr-split-layout">' : ''}
            ${this.practiceShowPrompt ? `
              <aside class="pr-split-left" aria-label="真题原题面板">
                <div class="paper-sheet pr-prompt-sheet">
                  <div class="paper-toolbar">
                    <div class="paper-toolbar-left">
                      <strong style="font-size:0.96em">真题原题 · ${item.year} 年</strong>
                    </div>
                    <div class="paper-toolbar-right">
                      <button class="paper-text-btn" id="opPrMockExamBtn" data-year="${item.year}">进入大作文套写</button>
                    </div>
                  </div>
                  <div class="paper-section">
                    <div class="paper-section-head" style="margin-bottom:10px">
                      <span class="paper-section-title">48. Directions</span>
                    </div>
                    <div class="paper-en-text no-indent pr-prompt-directions">${directionsEn}</div>
                    <div class="pr-prompt-chart-box">
                      <img src="images/charts/chart_${item.year}.jpg" alt="${item.year}年英语二大作文真题图表：${item.title}" onerror="this.parentElement.style.display='none'" />
                    </div>
                  </div>
                </div>
              </aside>
            ` : ''}

            <div class="${this.practiceShowPrompt ? 'pr-split-right' : ''}">
              <div class="paper-sheet">
                <div class="paper-toolbar">
                  <div class="paper-toolbar-left">
                    <strong style="font-size:1em">${item.year} 年英语二 · ${item.title}</strong>
                    <span style="font-size:0.9em;color:var(--w-muted)">${item.coreTheme}</span>
                  </div>
                  <div class="paper-toolbar-right">
                    <label class="w-switch-label">
                      <input type="checkbox" class="w-switch-input" id="opPrHighlightToggle" ${this.practiceShowHighlight ? 'checked' : ''}>
                      <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                      <span>标注替换</span>
                    </label>
                    <label class="w-switch-label">
                      <input type="checkbox" class="w-switch-input" id="opPrPromptToggle" ${this.practiceShowPrompt ? 'checked' : ''}>
                      <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                      <span>真题题目</span>
                    </label>
                    <label class="w-switch-label">
                      <input type="checkbox" class="w-switch-input" id="opPrCnToggle" ${this.practiceShowCn ? 'checked' : ''}>
                      <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                      <span>中英对照</span>
                    </label>
                    <label class="w-switch-label">
                      <input type="checkbox" class="w-switch-input" id="opPrAnaToggle" ${this.practiceShowAnalysis ? 'checked' : ''}>
                      <span class="w-switch-track"><span class="w-switch-thumb"></span></span>
                      <span>写作解析</span>
                    </label>
                  </div>
                </div>
                ${this.practiceShowHighlight ? `
                  <div class="pr-legend-bar" role="note" aria-label="模板结构图例">
                    <span class="pr-legend-item"><span class="pr-legend-sample-fixed">常规字体</span> = 模板固定骨架</span>
                    <span class="pr-legend-item"><span class="pr-var"><span class="pr-var-tag">主题/语料</span>蓝框高亮</span> = 语料与主题替换部分</span>
                    <span class="pr-legend-item"><span class="pr-var is-prompt-data"><span class="pr-var-tag">题面/数据</span>绿框高亮</span> = 首段需结合题目自写部分</span>
                  </div>` : ''}

                ${enParas.map((ep, idx) => `
                  <div class="paper-section">
                    <div class="paper-section-head">
                      <span class="paper-section-title">${paraNames[idx] || ('第' + (idx+1) + '段')}</span>
                      <button class="paper-swap-btn op-copy-pr-para" data-raw="${encodeURIComponent(ep)}" title="复制本段">⇄</button>
                    </div>
                    <div class="paper-en-text">${this.practiceShowHighlight ? this.highlightPracticeParagraph(ep, idx, item.tierKey) : this.escapeHtml(ep)}</div>
                    ${this.practiceShowCn && cnParas[idx] ? `<div class="paper-cn-text">${cnParas[idx]}</div>` : ''}
                  </div>
                `).join('')}

                ${this.practiceShowAnalysis ? `
                  <div class="paper-section">
                    <div class="paper-section-head">
                      <span class="paper-section-title">写作解析与语料拆解</span>
                    </div>
                    <div class="paper-note-text" style="white-space:pre-wrap">${item.analysis}</div>
                  </div>
                ` : ''}

                <div class="paper-footer">
                  <div class="paper-footer-stats">
                    <span>英文词数 <strong>${item.wordCount}</strong></span>
                    <span>档位 <strong>${item.tier}</strong></span>
                  </div>
                  <button class="paper-text-btn" id="opPrCopyAllBtn" data-raw="${encodeURIComponent(item.enEssay)}">复制全文</button>
                </div>
              </div>
            </div>
          ${this.practiceShowPrompt ? '</div>' : ''}
        ` : ''}
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

      const hlT = panel.querySelector('#opPrHighlightToggle');
      if (hlT) hlT.addEventListener('change', (e) => { this.practiceShowHighlight = !!e.target.checked; this.renderPracticePanel(); });

      const prT = panel.querySelector('#opPrPromptToggle');
      if (prT) prT.addEventListener('change', (e) => { this.practiceShowPrompt = !!e.target.checked; this.renderPracticePanel(); });

      const cnT = panel.querySelector('#opPrCnToggle');
      if (cnT) cnT.addEventListener('change', (e) => { this.practiceShowCn = !!e.target.checked; this.renderPracticePanel(); });

      const anaT = panel.querySelector('#opPrAnaToggle');
      if (anaT) anaT.addEventListener('change', (e) => { this.practiceShowAnalysis = !!e.target.checked; this.renderPracticePanel(); });

      const mockBtn = panel.querySelector('#opPrMockExamBtn');
      if (mockBtn) {
        mockBtn.addEventListener('click', () => {
          if (window.loadSectionFromWriting) {
            window.loadSectionFromWriting('writing_b', mockBtn.dataset.year);
          }
        });
      }

      panel.querySelectorAll('.op-copy-pr-para, #opPrCopyAllBtn').forEach(btn => {
        btn.addEventListener('click', () => this.copyText(decodeURIComponent(btn.dataset.raw || ''), btn));
      });
    },

    /* ==========================================================================
       4. 考纲与使用说明
       ========================================================================== */
    renderGuidePanel() {
      const panel = this.container.querySelector('#opPanel_opGuide');
      const guide = this.getData().guideAndMethods || {};
      const sections = guide.sections || [];
      if (!panel) return;

      panel.innerHTML = `
        <div class="paper-sheet">
          <div class="paper-toolbar">
            <div class="paper-toolbar-left">
              <strong>${guide.title || '宏大叙事考纲与使用说明'}</strong>
            </div>
          </div>
          ${sections.map(sec => `
            <div class="paper-section">
              <div class="paper-section-head">
                <span class="paper-section-title">${sec.title}</span>
              </div>
              ${(sec.items || []).map(it => `
                <div style="margin-bottom:14px">
                  <div style="font-weight:600;font-size:0.92em;color:var(--w-ink);margin-bottom:4px">${it.subtitle}</div>
                  <div class="paper-note-text" style="white-space:pre-wrap;margin-top:0">${it.content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      `;
    }
  };

  window.WritingOnePageModule = WritingOnePageModule;
})(window);
