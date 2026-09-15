/**
 * Kaoyan English II Main Application Orchestrator
 * Full In-depth Reading, Mock Exam, Analytics Dashboard & Multi-Format Exporter
 */
(function() {
  const AppState = {
    year: 2010,
    textId: 1,
    mode: 'practice', // 'practice' | 'review'
    practiceSubmode: 'step', // 'mock' | 'step'
    stepIndex: 0,
    savedStepIndex: null,
    isFullMode: false,
    theme: 'light',
    textData: null,
    steps: []
  };

  let textLoadSequence = 0;

  // Study Time Tracker (Heartbeat every 5 seconds)
  setInterval(() => {
    if (AppState.textData && !document.hidden) {
      window.StorageModule.recordTimeSpent(AppState.year, AppState.textId, 5);
    }
  }, 5000);

  // 考研语篇逻辑连接词定位与解题指南库 (Discourse & Question Positioning Signposts)
  const LOGIC_SIGNPOST_DICT = {
    // 1. 转折对比类 (Adversative & Contrast)
    'but': {
      category: '转折对比标志词 (Adversative)',
      focus: '👉 重点聚焦于【but 之后】的内容！',
      strategy: '考研阅读第一铁律：“转折后是核心，转折前是铺垫/让步/大众假象”。作者真正的核心立场与命题答案（尤其是态度题、主旨题、细节题）85% 以上直接取材自 but 之后的表述！转折前内容常被命题人设计为强干扰项。'
    },
    'however': {
      category: '强转折对比标志词 (Contrast)',
      focus: '👉 重点聚焦于【however 之后】的全句核心主干！',
      strategy: '极高频核心题眼！句首或句中 however 标志着全篇或全段论述的重大转向，往往彻底推翻前文预设。解题时需高度聚焦 however 后的谓语动词与褒贬色彩，答案往往在此进行同义替换。'
    },
    'yet': {
      category: '转折对比标志词 (Adversative)',
      focus: '👉 重点聚焦于【yet 之后】的新信息！',
      strategy: '连接句首或从句时表强烈转折，常用于打破前文陈述的“普遍预期”或“传统共识”，引出作者关注的实际矛盾或残酷现实，常考查转折后的因果或事实推论。'
    },
    'nevertheless': {
      category: '高阶让步转折词 (Concession & Contrast)',
      focus: '👉 重点聚焦于【nevertheless 之后】的坚定立场！',
      strategy: '意为“尽管如此，然而”，作者在承认前文困难或反向事实后，依然坚持的结论。重点在于说明尽管存在阻力，后文的核心事实或趋势依然成立。'
    },
    'nonetheless': {
      category: '高阶让步转折词 (Concession & Contrast)',
      focus: '👉 重点聚焦于【nonetheless 之后】的论断！',
      strategy: '同 nevertheless，表强力反折。后文内容为作者破局的核心切入点，常作为正解的核心依据。'
    },
    'whereas': {
      category: '对照对比连词 (Direct Contrast)',
      focus: '👉 重点聚焦于【两事物/两群体的鲜明反差对比】！',
      strategy: '引导鲜明对照，前后两个分句形成强烈的二元对立（如富人 vs 穷人、传统媒体 vs 算法平台）。考题常就两者的反差特征或对立属性设题。'
    },
    'while': {
      category: '对照对比 / 让步连词 (Contrast / Concession)',
      focus: '👉 若表对比，重点在【前后反差】；若引导让步从句，重点在【逗号后的主句】！',
      strategy: 'while 引导句首让步从句时（尽管……），主句才是作者立场重心！若在句中表对照（然而/而），则重点对比两个主体的不同走向。'
    },
    'although': {
      category: '让步状语从句引导词 (Concession)',
      focus: '👉 重点聚焦于【逗号之后的主句】！让步从句只是铺垫！',
      strategy: '考研阅读核心法则：“让步不重要，主句才是宝”。although 引导的从句是作者“退一步承认”的次要或不利事实，主句才是作者真正捍卫的观点与命题出题点。选项若单采从句事实，通常为片面干扰项！'
    },
    'though': {
      category: '让步状语从句引导词 (Concession)',
      focus: '👉 重点聚焦于【逗号之后的主句】！',
      strategy: '逻辑同 although。无论从句位于句首还是句尾，核心信息均落在主句的主干谓语上。'
    },
    'even though': {
      category: '强让步状语从句引导词 (Strong Concession)',
      focus: '👉 重点聚焦于【逗号之后的主句核心主干】！',
      strategy: '即使让步条件极其极端，主句所陈述的事实依然不可动摇。解题紧盯主句。'
    },
    'even if': {
      category: '假设让步连词 (Hypothetical Concession)',
      focus: '👉 重点聚焦于【逗号之后的主句推论】！',
      strategy: '纵使假设成立，主句的结论依然有效。主句往往揭示作者的深刻预警或终极定论。'
    },
    'despite': {
      category: '介词性让步标志 (Concession)',
      focus: '👉 重点聚焦于【despite 短语之后的主句核心】！',
      strategy: '后接名词或短语表让步背景，真正的句意重心和考点均在句子主干。'
    },
    'in spite of': {
      category: '介词性让步标志 (Concession)',
      focus: '👉 重点聚焦于【短语之后的主句核心事实】！',
      strategy: '功能同 despite，让步成分为背景噪音，主干信息为命题题眼。'
    },
    'on the other hand': {
      category: '视角转换与对比 (Aspect Shift)',
      focus: '👉 重点聚焦于【引出的另一侧面或对立观点】！',
      strategy: '常用于多视角探讨或辩证论述，后文常引入对前文观点的反思或替代方案。'
    },
    'on the contrary': {
      category: '完全对立反驳 (Direct Rebuttal)',
      focus: '👉 重点聚焦于【on the contrary 之后的正面主张】！',
      strategy: '彻底否定前文叙述，引出完全相反的真实情况。后文内容为主旨正解之源。'
    },
    'in contrast': {
      category: '鲜明反差对比 (Contrast)',
      focus: '👉 重点聚焦于【对比引出的新事物或新机制】！',
      strategy: '通过鲜明比照烘托主体，重点通常落在后文被重点强调的对象上。'
    },
    'by contrast': {
      category: '鲜明反差对比 (Contrast)',
      focus: '👉 重点聚焦于【对比引出的新事物或新趋势】！',
      strategy: '前后两方形成显著对立，重点在后文引入的新特征。'
    },
    'instead': {
      category: '否定取舍与替代 (Substitution)',
      focus: '👉 重点聚焦于【instead 后面引出的新动作/新方案】！',
      strategy: '前文否定某条死路或旧模式（not...），instead 之后提出真正的出路与解决对策（破局之举），极易作为应对举措或态度题正解。'
    },
    'instead of': {
      category: '否定取舍介词短语 (Substitution)',
      focus: '👉 重点聚焦于【主句谓语动作，而非 instead of 后的被放弃项】！',
      strategy: 'instead of 后面跟的是被抛弃、被否定的对象，主句实施的动作才是重心！切勿选错肯定与否定方向。'
    },
    'rather than': {
      category: '否定取舍连词短语 (Preferential Negation)',
      focus: '👉 重点聚焦于【rather than 之前被肯定/采纳的内容】！',
      strategy: '否定 rather than 之后的内容，肯定其前的内容（宁要前者，不要后者）。解题时警惕偷换肯定对象！'
    },
    // 2. 因果推论类 (Causality)
    'because': {
      category: '直接原因引导词 (Direct Cause)',
      focus: '👉 重点聚焦于【because 之后引出的本质原因与深层机理】！',
      strategy: '考研“因果细节题（Why / Reason）”的黄金定位标！题干问原因时，答案必定直接同义替换 because 引导的内容。警惕“因果倒置”陷阱。'
    },
    'since': {
      category: '已知原因引导词 (Known Cause)',
      focus: '👉 重点聚焦于【原因从句背后的逻辑推导结果】！',
      strategy: '引出显而易见或前文已述的原因，主句往往借助该前提引出更深层次的推断。'
    },
    'therefore': {
      category: '逻辑因果结论词 (Logical Deduction)',
      focus: '👉 重点聚焦于【therefore 之后的总结性结论与推论】！',
      strategy: '段落或全篇的核心论点往往由 therefore 引出！前文均为论据事实铺陈，therefore 后的命题为段落主题句（Topic Sentence）的高频载体。'
    },
    'thus': {
      category: '推论与结果引导词 (Deductive Result)',
      focus: '👉 重点聚焦于【thus 引导的研究结论或总结论断】！',
      strategy: '承接上文推导出的必然结果，常用于学术论文的定性分析或段落收官总结，是推断题与主旨题的极佳线索。'
    },
    'hence': {
      category: '书面因果推论词 (Causal Inference)',
      focus: '👉 重点聚焦于【hence 引出的推导后果】！',
      strategy: '同 thus / therefore，高度概括前文事实所引发的必然连锁反应。'
    },
    'consequently': {
      category: '必然结果标志词 (Direct Consequence)',
      focus: '👉 重点聚焦于【事件造成的实质影响与严重后果】！',
      strategy: '常用于论述某项危机、政策偏差或科技滥用所带来的深远负面效应，细节题高频考点。'
    },
    'as a result': {
      category: '结果短语 (Resulting Outcome)',
      focus: '👉 重点聚焦于【最终导致的事实或社会影响】！',
      strategy: '前因后果结构，答案往往考核前后两者的因果映射关系。'
    },
    'due to': {
      category: '介词性原因短语 (Attributed Cause)',
      focus: '👉 重点聚焦于【due to 后面的核心归因名词】！',
      strategy: '常用于解释现象的病根或体制原因，是原因题的核心定位词。'
    },
    'owing to': {
      category: '介词性原因短语 (Attributed Cause)',
      focus: '👉 重点聚焦于【owing to 后面的具体成因】！',
      strategy: '同 due to，常考查对复杂社会现象的根本原因剖析。'
    },
    'result in': {
      category: '导致结果动词短语 (Cause to Happen)',
      focus: '👉 重点聚焦于【result in 之后产生的最终后果】！',
      strategy: '主语为诱因，宾语为结果。警惕与 result from（起因于）混淆倒置。'
    },
    'result from': {
      category: '归因动词短语 (Originating Cause)',
      focus: '👉 重点聚焦于【result from 之后追溯的根源诱因】！',
      strategy: '主语为现象结果，宾语才是根本原因。'
    },
    // 3. 事实反转与真相揭示 (Fact Shift)
    'in fact': {
      category: '事实反转标志词 (Fact Revelation)',
      focus: '👉 重点聚焦于【in fact 之后揭示的客观真相与新发现】！',
      strategy: '考研顶级命题眼！前文常叙述大众误区、传统成见或表面假象，in fact 之后直接给出最新科学实证或破除神话的真相，选项常以 in fact 后的内容作为唯一正解！'
    },
    'actually': {
      category: '事实反转标志词 (Reality Shift)',
      focus: '👉 重点聚焦于【actually 之后澄清的实际事实】！',
      strategy: '功能同 in fact，用于纠正先前叙述中的模糊认识或错误假说。'
    },
    'as a matter of fact': {
      category: '事实强化反转短语 (Fact Shift)',
      focus: '👉 重点聚焦于【短语之后更进一步的惊人事实】！',
      strategy: '揭露甚至比读者预期更深一层的客观事实，极具考点价值。'
    },
    'indeed': {
      category: '确认强调标志词 (Emphasis & Confirmation)',
      focus: '👉 重点聚焦于【indeed 所确认的核心论断】！',
      strategy: '加强语气，对前文观点的权威性与必然性予以强力确证。'
    },
    // 4. 举例论证 (Exemplification)
    'for example': {
      category: '例证引出标志词 (Exemplification)',
      focus: '👉 重点聚焦于【举例之前（或之后）的中心观点句】！切忌选例子本身！',
      strategy: '考研“例证题”铁律：“就事论事必错，返观论点方对”。for example 后的故事、人名、数字只是论据工具，考题询问“作者提及某人/某事是为了证明什么”，正解必然是 for example 紧邻前一句的论点！'
    },
    'for instance': {
      category: '例证引出标志词 (Exemplification)',
      focus: '👉 重点聚焦于【例子所支撑的上位论点句】！',
      strategy: '功能同 for example，凡是直接复述例子细节的选项90%为偷换论点的干扰项。'
    },
    // 5. 递进与多项并列 (Addition)
    'furthermore': {
      category: '强递进逻辑词 (Progression)',
      focus: '👉 重点聚焦于【递进延伸的更深层影响或第二论据】！',
      strategy: '方向与前句完全一致，论证层层加码。多项推断题常需要结合前句与 furthermore 句进行综合提炼。'
    },
    'moreover': {
      category: '强递进逻辑词 (Progression)',
      focus: '👉 重点聚焦于【补充说明的关键维度】！',
      strategy: '增强论证说服力，前后论点同向共振。'
    },
    'in addition': {
      category: '并列递进短语 (Addition)',
      focus: '👉 重点聚焦于【新增的并列考点信息】！',
      strategy: '常用于多项原因、多项举措或多重威胁的罗列，考查排除题或复合细节题。'
    },
    'besides': {
      category: '补充说明连词 (Addition)',
      focus: '👉 重点聚焦于【额外提出的论据】！',
      strategy: '方向与前述一致，作为辅助支撑材料。'
    },
    // 6. 总结收束 (Conclusion)
    'in conclusion': {
      category: '全文/段落总结收束词 (Conclusion)',
      focus: '👉 重点聚焦于【收官定调的宏观主旨与作者终极态度】！',
      strategy: '全文或末段的核心升华句，是主旨大意题（Title / Main Idea / Purpose）的最权威答案源泉！'
    },
    'to sum up': {
      category: '总结收束短语 (Summary)',
      focus: '👉 重点聚焦于【提炼出的核心主线】！',
      strategy: '概括前文纷繁复杂的讨论，直接给出最终结论。'
    },
    'in summary': {
      category: '总结收束短语 (Summary)',
      focus: '👉 重点聚焦于【浓缩后的核心论点】！',
      strategy: '段末或文末的主旨定位点。'
    },
    'in short': {
      category: '简括收束短语 (In Short)',
      focus: '👉 重点聚焦于【高度浓缩的一句话定论】！',
      strategy: '拨开繁复论据，用最简短有力的话语定性，是提炼段落主旨的利器。'
    },
    'all in all': {
      category: '全面总结短语 (All in All)',
      focus: '👉 重点聚焦于【全盘考量后的终极判定】！',
      strategy: '权衡利弊后作者做出的最终价值判断。'
    }
  };

  function init() {
    window.ReaderModule.init();
    if (window.StorageModule && window.StorageModule.updateVocabBadge) {
      window.StorageModule.updateVocabBadge();
    }
    // 1. Restore state from localStorage
    const saved = window.StorageModule.loadProgress();
    if (saved) {
      if (saved.year) AppState.year = Number(saved.year);
      if (saved.textId) AppState.textId = Number(saved.textId);
      if (saved.mode === 'practice' || saved.mode === 'review' || saved.mode === 'vocab') AppState.mode = saved.mode;
      if (saved.practiceSubmode === 'mock' || saved.practiceSubmode === 'step') AppState.practiceSubmode = saved.practiceSubmode;
      if (typeof saved.stepIndex === 'number') AppState.savedStepIndex = saved.stepIndex;
      if (saved.theme) AppState.theme = saved.theme;
      if (typeof saved.isFullMode === 'boolean') AppState.isFullMode = saved.isFullMode;
    }

    // 2. Apply theme
    applyTheme(AppState.theme);

    // 3. Setup UI selectors & event listeners
    setupYearDropdown();
    setupEventListeners();
    setupKeyboardShortcuts();
    setupSentenceAndVocabInteractions();
    setupDashboardAndExportModals();

    // 4. Load initial text
    loadCurrentText();
  }

  function applyTheme(themeName) {
    document.body.className = '';
    if (themeName === 'parchment') document.body.classList.add('theme-parchment');
    if (themeName === 'dark') document.body.classList.add('theme-dark');
    document.body.classList.toggle('mode-review', AppState.mode === 'review');
    document.body.classList.toggle('mode-practice', AppState.mode === 'practice');
    document.body.classList.toggle('mode-vocab', AppState.mode === 'vocab');

    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) themeSelect.value = themeName || 'light';
  }

  function setupYearDropdown() {
    const yearSelect = document.getElementById('yearSelect');
    const manifest = window.KAOYAN_MANIFEST || [];
    if (!yearSelect || manifest.length === 0) return;

    yearSelect.innerHTML = '';
    manifest.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.year;
      opt.textContent = `${item.year} 年`;
      if (item.year === AppState.year) opt.selected = true;
      yearSelect.appendChild(opt);
    });

    updateTextDropdown();
  }

  function updateTextDropdown() {
    const textSelect = document.getElementById('textSelect');
    const yItem = (window.KAOYAN_MANIFEST || []).find(m => m.year === AppState.year);
    if (!textSelect || !yItem) return;

    textSelect.innerHTML = '';
    yItem.texts.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `Text ${t.id} (${t.q_range}题)`;
      if (t.id === AppState.textId) opt.selected = true;
      textSelect.appendChild(opt);
    });
  }

  async function loadCurrentText() {
    const sequence = ++textLoadSequence;
    const year = AppState.year;
    const textId = AppState.textId;
    applyTheme(AppState.theme);
    AppState.textData = null;
    AppState.steps = [];
    AppState.stepIndex = 0;
    updateJumpDropdown();
    updateUIControls();
    const status = document.getElementById('dataLoadStatus');
    const layout = document.getElementById('mainLayout');
    const vocab = document.getElementById('vocabSection');
    layout.inert = true;
    vocab.inert = true;
    vocab.style.visibility = 'hidden';
    layout.setAttribute('aria-busy', 'true');
    document.getElementById('examPaper').textContent = '';
    document.getElementById('workspaceContent').textContent = '';
    status.hidden = false;
    status.textContent = `正在加载 ${year} 年阅读资料…`;
    try {
      // Keep switching between already loaded texts synchronous; only new years wait.
      const yData = window.DataLoader.peek(year) || await window.DataLoader.loadYear(year);
      if (sequence !== textLoadSequence) return;
      const text = yData.texts.find(t => t.text_id === textId);
      if (!text) throw new Error('未找到该篇阅读资料');
      AppState.textData = text;
      status.hidden = true;
      layout.inert = false;
      vocab.inert = false;
      vocab.style.visibility = '';
      layout.setAttribute('aria-busy', 'false');
    } catch (error) {
      if (sequence !== textLoadSequence) return;
      layout.setAttribute('aria-busy', 'false');
      status.textContent = `${year} 年资料加载失败，可重试或选择其他年份。`;
      const retry = document.createElement('button');
      retry.id = 'retryDataLoadBtn';
      retry.className = 'btn';
      retry.textContent = '重新加载';
      retry.onclick = () => loadCurrentText();
      status.appendChild(retry);
      return;
    }

    document.body.classList.toggle('mode-review', AppState.mode === 'review');
    document.body.classList.toggle('mode-practice', AppState.mode === 'practice');
    document.body.classList.toggle('mode-vocab', AppState.mode === 'vocab');

    // Update Mode button active states
    const practiceBtn = document.getElementById('practiceModeBtn');
    const reviewBtn = document.getElementById('reviewModeBtn');
    const vocabBtn = document.getElementById('vocabModeBtn');
    if (practiceBtn) practiceBtn.classList.toggle('active', AppState.mode === 'practice');
    if (reviewBtn) reviewBtn.classList.toggle('active', AppState.mode === 'review');
    if (vocabBtn) vocabBtn.classList.toggle('active', AppState.mode === 'vocab');

    // Update Submode toggle visibility
    const submodeContainer = document.getElementById('submodeContainer');
    if (submodeContainer) {
      submodeContainer.style.display = AppState.mode === 'practice' ? 'inline-flex' : 'none';
      const mockBtn = document.getElementById('submodeMockBtn');
      const stepBtn = document.getElementById('submodeStepBtn');
      if (mockBtn && stepBtn) {
        mockBtn.classList.toggle('active', AppState.practiceSubmode === 'mock');
        stepBtn.classList.toggle('active', AppState.practiceSubmode === 'step');
      }
    }

    if (AppState.mode === 'vocab') {
      if (window.VocabModule) {
        window.VocabModule.init('vocabSection');
      }
      updateUIControls();
      saveState();
      return;
    }

    // Render left panel authentic exam paper
    window.ReaderModule.renderExamPaper(AppState.textData, 'examPaper');

    // Handle Mock Mode vs Step Mode
    if (AppState.mode === 'practice' && AppState.practiceSubmode === 'mock') {
      window.QuizModule.renderMockExam(AppState.textData, 'workspaceContent');
      updateUIControls();
      saveState();
      return;
    }

    // Build steps dynamically from pure JSON via QuizModule
    if (AppState.mode === 'practice') {
      AppState.steps = window.QuizModule.buildPracticeSteps(AppState.textData);
    } else {
      AppState.steps = window.QuizModule.buildReviewSteps(AppState.textData);
    }

    if (AppState.savedStepIndex !== null && AppState.savedStepIndex >= 0 && AppState.savedStepIndex < AppState.steps.length) {
      AppState.stepIndex = AppState.savedStepIndex;
      AppState.savedStepIndex = null;
    } else {
      AppState.stepIndex = 0;
    }

    updateJumpDropdown();
    renderCurrentStep({ forceTop: true });
    updateUIControls();
    saveState();
  }

  function updateJumpDropdown() {
    const jumpSelect = document.getElementById('jumpSelect');
    if (!jumpSelect) return;

    jumpSelect.innerHTML = '<option value="">📑 章节跳转</option>';
    const seenSections = new Set();

    AppState.steps.forEach((st, idx) => {
      let secName = '';
      if (AppState.mode === 'practice') {
        secName = st.section || `步骤 ${idx + 1}`;
      } else {
        const secTitles = ['0. 方法论总览', '1. 重点词汇库', '2. 精读与长难句', '3. 题目命题复盘', '4. 语篇与新题型', '5. 写作语料库'];
        secName = secTitles[st.section] || `Section ${st.section}`;
      }

      if (!seenSections.has(secName)) {
        seenSections.add(secName);
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = secName;
        jumpSelect.appendChild(opt);
      }
    });
  }

  function smartScrollWorkspace(forceTop = false, prevScrollTop = 0) {
    const rightScroll = document.getElementById('rightScroll');
    const wsContent = document.getElementById('workspaceContent');

    if (window.innerWidth > 900) {
      if (!rightScroll) return;
      if (forceTop) {
        rightScroll.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // 方案 A：【完全就地保持（纯无感原地刷新，0 像素位移）】
      // 无论翻到哪一行或哪一处，换步时彻底不执行页面回滚，精确保持用户视线聚焦位置
      rightScroll.scrollTop = prevScrollTop;
      requestAnimationFrame(() => {
        if (rightScroll && !forceTop) {
          rightScroll.scrollTop = prevScrollTop;
        }
      });
    } else {
      // 移动端全屏流式滚动适配：就地保持滚动条
      if (!wsContent) return;
      if (forceTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      window.scrollTo({ top: prevScrollTop, behavior: 'instant' });
      requestAnimationFrame(() => {
        if (!forceTop) {
          window.scrollTo({ top: prevScrollTop, behavior: 'instant' });
        }
      });
    }
  }

  function applyVocabPreferences() {
    const viewPref = (window.StorageModule && window.StorageModule.getVocabViewPreference)
      ? window.StorageModule.getVocabViewPreference()
      : 'grid';
    const maskPref = (window.StorageModule && window.StorageModule.getVocabMaskPreference)
      ? window.StorageModule.getVocabMaskPreference()
      : false;

    document.querySelectorAll('.vocab-matrix-wrap').forEach(wrap => {
      // 1. View toggle buttons & views
      wrap.querySelectorAll('.vocab-view-toggle button').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-view') === viewPref);
      });
      const gridView = wrap.querySelector('.vocab-grid-view');
      const tableView = wrap.querySelector('.vocab-table-view');
      if (viewPref === 'table') {
        if (gridView) gridView.style.display = 'none';
        if (tableView) tableView.style.display = 'block';
      } else {
        if (gridView) gridView.style.display = 'block';
        if (tableView) tableView.style.display = 'none';
      }

      // 2. Masking state & toggle button
      wrap.classList.toggle('mask-active', maskPref);
      const maskBtn = wrap.querySelector('.vocab-mask-toggle');
      if (maskBtn) {
        const icon = maskBtn.querySelector('.mask-icon');
        const label = maskBtn.querySelector('.mask-label');
        if (icon) icon.textContent = maskPref ? '👁️' : '🙈';
        if (label) label.textContent = maskPref ? '退出自测模式' : '自测遮挡模式';
      }
    });
  }
  window.applyVocabPreferences = applyVocabPreferences;

  function renderCurrentStep(options = {}) {
    if (!AppState.textData) return;
    if (AppState.mode === 'practice' && AppState.practiceSubmode === 'mock') {
      window.QuizModule.renderMockExam(AppState.textData, 'workspaceContent');
      return;
    }

    // 在 DOM 树替换前精准捕获用户真实视线滚动高度（防止 innerHTML 赋值瞬间被浏览器内核强制重置为 0）
    const rightScroll = document.getElementById('rightScroll');
    const prevScrollTop = (window.innerWidth > 900 && rightScroll)
      ? rightScroll.scrollTop
      : (window.pageYOffset || document.documentElement.scrollTop || 0);

    if (AppState.isFullMode) {
      window.QuizModule.renderFull(AppState.steps, 'workspaceContent');
      applyVocabPreferences();
      if (options.forceTop) {
        smartScrollWorkspace(true, 0);
      }
      return;
    }

    const step = AppState.steps[AppState.stepIndex];
    if (!step) return;

    window.QuizModule.renderStep(step, AppState.stepIndex, AppState.steps.length, 'workspaceContent', AppState.textData);
    window.ReaderModule.applySettings();

    // Apply Section 1 Vocabulary preferences (persisting view type & mask state across steps)
    applyVocabPreferences();

    // 方案 A：【完全就地保持（纯无感原地刷新，0 像素位移）】
    smartScrollWorkspace(options.forceTop, prevScrollTop);

    // Auto mark completed if reached last step
    if (AppState.stepIndex >= AppState.steps.length - 2) {
      window.StorageModule.markTextCompleted(AppState.year, AppState.textId);
    }
  }

  function updateUIControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const floatPrevBtn = document.getElementById('floatPrevBtn');
    const floatNextBtn = document.getElementById('floatNextBtn');
    const progressText = document.getElementById('progressText');
    const floatProgressText = document.getElementById('floatProgressText');
    const toggleAllBtn = document.getElementById('toggleAllBtn');
    const floatingNavBar = document.getElementById('floatingNavBar');

    const isMock = AppState.mode === 'practice' && AppState.practiceSubmode === 'mock';
    const isVocab = AppState.mode === 'vocab';
    const unavailable = !AppState.textData;
    for (const id of ['resetBtn', 'toggleAllBtn', 'jumpSelect', 'btnExpCurrentAnki', 'btnExpNotesMd']) {
      const control = document.getElementById(id);
      if (control) control.disabled = unavailable;
    }

    if (floatingNavBar) {
      floatingNavBar.style.display = (isMock || isVocab) ? 'none' : 'flex';
    }

    const isFirst = unavailable || AppState.stepIndex <= 0;
    const isLast = unavailable || AppState.stepIndex >= AppState.steps.length - 1;
    const isFull = AppState.isFullMode;

    if (prevBtn) prevBtn.disabled = isMock || isVocab || isFull || isFirst;
    if (nextBtn) nextBtn.disabled = isMock || isVocab || isFull || isLast;
    if (floatPrevBtn) floatPrevBtn.disabled = isMock || isVocab || isFull || isFirst;
    if (floatNextBtn) floatNextBtn.disabled = isMock || isVocab || isFull || isLast;

    let progStr = '';
    if (isVocab) {
      progStr = '单词背诵';
    } else if (isMock) {
      progStr = '全卷模考';
    } else {
      progStr = `${AppState.stepIndex + 1} / ${AppState.steps.length}`;
    }
    if (progressText) progressText.textContent = progStr;
    if (floatProgressText) floatProgressText.textContent = progStr;
    if (unavailable) {
      if (progressText) progressText.textContent = '资料未就绪';
      if (floatProgressText) floatProgressText.textContent = '资料未就绪';
    }

    if (toggleAllBtn) {
      toggleAllBtn.style.display = isMock ? 'none' : 'inline-flex';
      toggleAllBtn.textContent = AppState.isFullMode ? '返回分步' : '显示全部';
      toggleAllBtn.classList.toggle('active', AppState.isFullMode);
    }

    // Dynamic Module Tracker
    const jumpSelect = document.getElementById('jumpSelect');
    if (jumpSelect && jumpSelect.options.length > 1) {
      let matchedVal = '';
      for (let i = 1; i < jumpSelect.options.length; i++) {
        const optVal = Number(jumpSelect.options[i].value);
        if (AppState.stepIndex >= optVal) {
          matchedVal = jumpSelect.options[i].value;
        } else {
          break;
        }
      }
      if (matchedVal !== '') {
        jumpSelect.value = matchedVal;
      }
    }

    saveState();
  }

  function saveState() {
    if (!AppState.textData) return;
    window.StorageModule.saveProgress({
      year: AppState.year,
      textId: AppState.textId,
      mode: AppState.mode,
      practiceSubmode: AppState.practiceSubmode,
      stepIndex: AppState.stepIndex,
      theme: AppState.theme,
      isFullMode: AppState.isFullMode
    });
  }

  // Setup Dashboard and Exporter Modals
  function setupDashboardAndExportModals() {
    const statsBtn = document.getElementById('statsBtn');
    const exportBtn = document.getElementById('exportBtn');
    const statsModal = document.getElementById('statsModal');
    const exportModal = document.getElementById('exportModal');
    const closeStatsBtn = document.getElementById('closeStatsBtn');
    const closeExportBtn = document.getElementById('closeExportBtn');

    if (statsBtn && statsModal) {
      statsBtn.onclick = () => {
        renderStatsModal();
        statsModal.classList.add('show');
      };
    }

    if (closeStatsBtn && statsModal) {
      closeStatsBtn.onclick = () => statsModal.classList.remove('show');
    }

    if (exportBtn && exportModal) {
      exportBtn.onclick = () => exportModal.classList.add('show');
    }

    if (closeExportBtn && exportModal) {
      closeExportBtn.onclick = () => exportModal.classList.remove('show');
    }

    // Export Triggers
    const btnExpCurrentAnki = document.getElementById('btnExpCurrentAnki');
    const btnExpAllAnki = document.getElementById('btnExpAllAnki');
    const btnExpNotesMd = document.getElementById('btnExpNotesMd');
    const btnExpMistakesMd = document.getElementById('btnExpMistakesMd');
    const vocabBookBtn = document.getElementById('vocabBookBtn');
    const vocabBookModal = document.getElementById('vocabBookModal');
    const closeVocabBookBtn = document.getElementById('closeVocabBookBtn');
    const btnStartVocabBookRecite = document.getElementById('btnStartVocabBookRecite');
    const btnClearVocabBook = document.getElementById('btnClearVocabBook');

    if (vocabBookBtn && vocabBookModal) {
      vocabBookBtn.onclick = () => {
        renderVocabBookModal();
        vocabBookModal.classList.add('show');
      };
    }

    if (closeVocabBookBtn && vocabBookModal) {
      closeVocabBookBtn.onclick = () => vocabBookModal.classList.remove('show');
    }

    if (btnStartVocabBookRecite) {
      btnStartVocabBookRecite.onclick = () => {
        if (vocabBookModal) vocabBookModal.classList.remove('show');
        AppState.mode = 'vocab';
        loadCurrentText();
        if (window.VocabModule && window.VocabModule.switchToBookmarked) {
          window.VocabModule.switchToBookmarked();
        }
      };
    }

    if (btnClearVocabBook) {
      btnClearVocabBook.onclick = () => {
        if (confirm('确认清空您的生词本吗？所有收藏的真题词汇将被移除且无法恢复。')) {
          window.StorageModule.clearVocabBook();
          renderVocabBookModal();
        }
      };
    }

    if (btnExpCurrentAnki) {
      btnExpCurrentAnki.onclick = () => {
        window.ExporterModule.exportCurrentTextAnki(AppState.textData);
        exportModal.classList.remove('show');
      };
    }

    if (btnExpAllAnki) {
      btnExpAllAnki.onclick = () => {
        window.ExporterModule.exportAllSavedVocabAnki();
        exportModal.classList.remove('show');
      };
    }

    if (btnExpNotesMd) {
      btnExpNotesMd.onclick = () => {
        window.ExporterModule.exportMarkdownNotes(AppState.textData);
        exportModal.classList.remove('show');
      };
    }

    if (btnExpMistakesMd) {
      btnExpMistakesMd.onclick = () => {
        window.ExporterModule.exportMistakesBook();
        exportModal.classList.remove('show');
      };
    }
  }

  function renderStatsModal() {
    const metrics = window.StorageModule.getDashboardMetrics();
    const statsContainer = document.getElementById('statsModalBody');
    if (!statsContainer) return;

    const hours = Math.floor(metrics.totalTimeSpentSec / 3600);
    const mins = Math.floor((metrics.totalTimeSpentSec % 3600) / 60);
    const timeStr = hours > 0 ? `${hours}小时${mins}分` : `${mins}分钟`;

    // Build Progress Heatmap (Dynamic for all available years)
    let heatmapHtml = '';
    const manifest = window.KAOYAN_MANIFEST || [];
    const years = manifest.length > 0 ? manifest.map(m => m.year) : Array.from({length: 17}, (_, i) => 2010 + i);
    const startYr = years.length > 0 ? years[0] : 2010;
    const endYr = years.length > 0 ? years[years.length - 1] : 2026;
    const totalTexts = metrics.totalTexts || (years.length * 4);

    years.forEach(yr => {
      let chipsHtml = '';
      for (let tId = 1; tId <= 4; tId++) {
        const key = `${yr}_${tId}`;
        const tStat = metrics.textsMap[key];
        let chipCls = 'heatmap-text-chip';
        let chipTitle = `${yr} Text ${tId} (未开始)`;

        if (tStat) {
          if (tStat.completed) {
            chipCls += ' completed';
            chipTitle = `${yr} Text ${tId} (已精读完成)`;
          } else if (typeof tStat.accuracy === 'number') {
            chipCls += ' tested';
            chipTitle = `${yr} Text ${tId} (模考完成: ${tStat.accuracy}%)`;
          }
        }

        chipsHtml += `<span class="${chipCls}" title="${chipTitle}" onclick="window.jumpToText(${yr}, ${tId})">T${tId}</span>`;
      }

      heatmapHtml += `
        <div class="heatmap-year-card">
          <div class="heatmap-year-title">${yr} 年</div>
          <div class="heatmap-texts-row">${chipsHtml}</div>
        </div>
      `;
    });

    statsContainer.innerHTML = `
      <div class="stats-metrics-grid">
        <div class="stat-box">
          <div class="stat-lbl">总精读进度</div>
          <div class="stat-val">${metrics.completedCount} / ${totalTexts} <span style="font-size:0.5em;color:var(--muted)">(${metrics.progressPercent}%)</span></div>
        </div>
        <div class="stat-box">
          <div class="stat-lbl">模考平均正确率</div>
          <div class="stat-val">${metrics.avgAccuracy}%</div>
        </div>
        <div class="stat-box">
          <div class="stat-lbl">专注学习时长</div>
          <div class="stat-val">${timeStr}</div>
        </div>
        <div class="stat-box">
          <div class="stat-lbl">生词本 / 待攻克错题</div>
          <div class="stat-val">${metrics.vocabCount} <span style="font-size:0.5em;color:var(--muted)">/ ${metrics.mistakesCount}题</span></div>
        </div>
      </div>

      <h4 style="margin-bottom:12px;font-size:1.05em">📅 ${startYr}-${endYr} 全景学习进度矩阵 (点击直达篇章)</h4>
      <div class="heatmap-grid">${heatmapHtml}</div>
    `;
  }

  window.jumpToText = function(year, textId) {
    AppState.year = year;
    AppState.textId = textId;
    AppState.savedStepIndex = 0;
    setupYearDropdown();
    loadCurrentText();
    const statsModal = document.getElementById('statsModal');
    if (statsModal) statsModal.classList.remove('show');
  };

  function renderVocabBookModal(filterSearch = '') {
    const body = document.getElementById('vocabBookModalBody');
    if (!body) return;

    const list = window.StorageModule.getVocabBook();
    const countEl = document.getElementById('vocabBookTotalCount');
    if (countEl) countEl.textContent = list.length;

    if (list.length === 0) {
      body.innerHTML = `
        <div style="text-align:center;padding:48px 16px;color:var(--muted)">
          <div style="font-size:3.2em;margin-bottom:12px">📚</div>
          <h3 style="font-size:1.15em;font-weight:700;color:var(--ink);margin-bottom:8px">您的生词本空空如也</h3>
          <p style="font-size:0.92em;line-height:1.6;max-width:440px;margin:0 auto">在精读真题文章时，遇到生词点击查看释义，点击释义卡片上的 <strong>「☆ 收藏生词」</strong>，即可将带有<strong>真题出处与完整原句</strong>的词汇收录到您的专属生词本中！</p>
        </div>
      `;
      return;
    }

    const sLower = filterSearch.toLowerCase().trim();
    const filtered = sLower ? list.filter(item =>
      item.word.toLowerCase().includes(sLower) ||
      (item.def && item.def.toLowerCase().includes(sLower)) ||
      (item.sentence && item.sentence.toLowerCase().includes(sLower))
    ) : list;

    // Sort by latest added first
    const sorted = [...filtered].sort((a, b) => (b.time || 0) - (a.time || 0));

    let html = `
      <div style="margin-bottom:14px;display:flex;gap:10px;align-items:center">
        <input type="text" id="vocabBookSearchInput" class="vocab-search-input" style="flex:1" placeholder="🔍 检索生词、考研释义或真题原句..." value="${filterSearch}">
      </div>
      <div class="vocab-book-list">
    `;

    if (sorted.length === 0) {
      html += `<div style="text-align:center;padding:24px;color:var(--muted)">未找到匹配 "${filterSearch}" 的生词</div>`;
    } else {
      sorted.forEach(item => {
        const prov = item.year ? `${item.year} 年 · Text ${item.textId}` : '考研真题';
        let sentHtml = item.sentence || '';
        if (sentHtml && item.word) {
          try {
            const re = new RegExp(`\\b(${item.word.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')})\\b`, 'gi');
            sentHtml = sentHtml.replace(re, '<span class="vocab-highlight">$1</span>');
          } catch(e) {}
        }

        html += `
          <div class="vocab-book-card" data-word="${item.word}">
            <div class="vocab-book-header">
              <span class="vocab-book-word">${item.word}</span>
              <div class="vocab-book-meta">
                <span style="font-size:0.8em;background:rgba(37,99,235,0.08);color:var(--primary);font-weight:700;padding:2px 8px;border-radius:4px">${prov}</span>
              </div>
            </div>
            <div class="vocab-book-def">${item.def || '考研语境核心词汇'}</div>
            ${sentHtml ? `<div class="vocab-book-sentence"><strong>真题原句：</strong>${sentHtml}</div>` : ''}
            <div class="vocab-book-actions">
              <button class="toolbar-btn btn-speak-word" data-word="${item.word}" style="padding:3px 10px;font-size:0.82em" title="发音朗读">🔊 朗读</button>
              ${item.year ? `<button class="toolbar-btn btn-jump-article" data-year="${item.year}" data-text="${item.textId}" style="padding:3px 10px;font-size:0.82em;color:var(--primary)" title="跳转到该真题文章">📖 跳转真题</button>` : ''}
              <button class="toolbar-btn btn-del-word" data-word="${item.word}" style="padding:3px 10px;font-size:0.82em;color:#ef4444" title="移出生词本">🗑️ 移除</button>
            </div>
          </div>
        `;
      });
    }

    html += `</div>`;
    body.innerHTML = html;

    const searchInput = document.getElementById('vocabBookSearchInput');
    if (searchInput) {
      searchInput.oninput = () => {
        renderVocabBookModal(searchInput.value);
        const newInp = document.getElementById('vocabBookSearchInput');
        if (newInp) {
          newInp.focus();
          newInp.selectionStart = newInp.selectionEnd = newInp.value.length;
        }
      };
    }

    body.querySelectorAll('.btn-speak-word').forEach(btn => {
      btn.onclick = () => {
        const w = btn.getAttribute('data-word');
        if (w && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(w);
          utter.lang = 'en-US';
          window.speechSynthesis.speak(utter);
        }
      };
    });

    body.querySelectorAll('.btn-del-word').forEach(btn => {
      btn.onclick = () => {
        const w = btn.getAttribute('data-word');
        if (w) {
          window.StorageModule.removeWordFromBook(w);
          renderVocabBookModal(filterSearch);
        }
      };
    });

    body.querySelectorAll('.btn-jump-article').forEach(btn => {
      btn.onclick = () => {
        const y = Number(btn.getAttribute('data-year'));
        const t = Number(btn.getAttribute('data-text'));
        if (y && t) {
          const modal = document.getElementById('vocabBookModal');
          if (modal) modal.classList.remove('show');
          AppState.year = y;
          AppState.textId = t;
          AppState.mode = 'review';
          AppState.savedStepIndex = 0;
          setupYearDropdown();
          loadCurrentText();
        }
      };
    });
  }

  function showToast(msg) {
    let toast = document.getElementById('copyToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'copyToast';
      toast.className = 'copy-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }
  window.showToast = showToast;

  function speakWord(w) {
    if (w && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(w);
      utter.lang = 'en-US';
      window.speechSynthesis.speak(utter);
    }
  }
  window.speakWord = speakWord;

  function highlightSentenceOnLeftPanel(sid) {
    if (sid === null || sid === undefined || sid === '') return;
    const sentEl = document.getElementById(`sent-${sid}`) || document.querySelector(`.exam-sent[data-sid="${sid}"]`);
    if (sentEl) {
      document.querySelectorAll('.exam-sent').forEach(el => el.classList.remove('locator-pulse'));
      sentEl.classList.add('locator-pulse');
      sentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (window.innerWidth <= 900) {
        showToast('📖 已在试卷原文中定位对应原句');
      }
    }
  }
  window.highlightSentenceOnLeftPanel = highlightSentenceOnLeftPanel;

  // Sentence and Vocab Interactions
  function setupSentenceAndVocabInteractions() {
    const examPaper = document.getElementById('examPaper');
    const syntaxOverlay = document.getElementById('syntaxOverlay');
    const syntaxModal = document.getElementById('syntaxModal');
    const closeSyntaxBtn = document.getElementById('closeSyntaxBtn');
    const vocabPopup = document.getElementById('vocabPopup');

    function closeSyntaxModal() {
      if (syntaxOverlay) syntaxOverlay.classList.remove('show');
      if (syntaxModal) syntaxModal.classList.remove('show');
      document.querySelectorAll('.exam-sent').forEach(el => el.classList.remove('active-sent'));
    }

    examPaper.addEventListener('click', e => {
      const connSpan = e.target.closest('.exam-connector');
      if (connSpan) {
        e.stopPropagation();
        const sentSpan = connSpan.closest('.exam-sent');
        const sentText = sentSpan ? sentSpan.innerText : '';
        const connWord = connSpan.getAttribute('data-connector') || connSpan.innerText;
        showVocabPopup(connWord, e.clientX, e.clientY, sentText);
        return;
      }

      const vocabSpan = e.target.closest('.exam-vocab');
      if (vocabSpan) {
        e.stopPropagation();
        const sentSpan = vocabSpan.closest('.exam-sent');
        const sentText = sentSpan ? sentSpan.innerText : '';
        showVocabPopup(vocabSpan.getAttribute('data-word'), e.clientX, e.clientY, sentText);
        return;
      }

      const sentSpan = e.target.closest('.exam-sent');
      if (sentSpan && AppState.textData) {
        e.stopPropagation();
        const sid = Number(sentSpan.getAttribute('data-sid'));
        const sentObj = AppState.textData.sentences.find(s => s.sid === sid);
        if (sentObj) {
          document.querySelectorAll('.exam-sent').forEach(el => el.classList.remove('active-sent'));
          sentSpan.classList.add('active-sent');
          showSyntaxModal(sentObj);
        }
      }
    });

    if (closeSyntaxBtn) {
      closeSyntaxBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeSyntaxModal();
      };
    }

    // Clicking directly on the syntax backdrop overlay closes it
    if (syntaxOverlay) {
      syntaxOverlay.onclick = (e) => {
        if (e.target === syntaxOverlay) {
          closeSyntaxModal();
        }
      };
    }

    examPaper.addEventListener('dblclick', () => {
      const selection = window.getSelection().toString().trim();
      if (selection && /^[a-zA-Z\s\-]+$/.test(selection) && selection.length < 30) {
        const range = window.getSelection().getRangeAt(0);
        const rect = range.getBoundingClientRect();
        showVocabPopup(selection, rect.left + rect.width / 2, rect.top, '');
      }
    });

    // Section 1: Interactive Vocabulary Matrix & Study Card Delegation
    const workspaceContent = document.getElementById('workspaceContent');
    if (workspaceContent) {
      workspaceContent.addEventListener('click', e => {
        // 1. TTS pronunciation
        const ttsBtn = e.target.closest('.vocab-tts-btn');
        if (ttsBtn) {
          e.preventDefault();
          e.stopPropagation();
          const word = ttsBtn.getAttribute('data-word');
          speakWord(word);
          return;
        }

        // 2. Star/Bookmark toggle
        const starBtn = e.target.closest('.vocab-star-btn');
        if (starBtn) {
          e.preventDefault();
          e.stopPropagation();
          const word = starBtn.getAttribute('data-word');
          const def = starBtn.getAttribute('data-def') || '';
          const sent = starBtn.getAttribute('data-sentence') || '';
          const year = starBtn.getAttribute('data-year') || (AppState.year ? String(AppState.year) : '');
          const textId = starBtn.getAttribute('data-textid') || (AppState.textId ? String(AppState.textId) : '');
          if (window.StorageModule && window.StorageModule.toggleBookmark) {
            const res = window.StorageModule.toggleBookmark(word, def, sent, year, textId);
            const allStars = document.querySelectorAll(`.vocab-star-btn[data-word="${CSS.escape(word)}"]`);
            allStars.forEach(btn => {
              if (res.added) {
                btn.classList.add('bookmarked');
                btn.textContent = '★';
                btn.title = '★ 已在生词本';
              } else {
                btn.classList.remove('bookmarked');
                btn.textContent = '☆';
                btn.title = '☆ 收藏至生词本';
              }
            });
            showToast(res.added ? `⭐ 已加入生词本: ${word}` : `已移出生词本: ${word}`);
          }
          return;
        }

        // 3. Self-test Masking Toggle
        const maskBtn = e.target.closest('.vocab-mask-toggle');
        if (maskBtn) {
          e.preventDefault();
          e.stopPropagation();
          const wrap = maskBtn.closest('.vocab-matrix-wrap');
          if (wrap) {
            wrap.classList.toggle('mask-active');
            const isMasked = wrap.classList.contains('mask-active');
            if (window.StorageModule && window.StorageModule.setVocabMaskPreference) {
              window.StorageModule.setVocabMaskPreference(isMasked);
            }
            // Synchronize all matrix wraps on page
            document.querySelectorAll('.vocab-matrix-wrap').forEach(w => {
              w.classList.toggle('mask-active', isMasked);
              const mBtn = w.querySelector('.vocab-mask-toggle');
              if (mBtn) {
                const icon = mBtn.querySelector('.mask-icon');
                const label = mBtn.querySelector('.mask-label');
                if (icon) icon.textContent = isMasked ? '👁️' : '🙈';
                if (label) label.textContent = isMasked ? '退出自测模式' : '自测遮挡模式';
              }
            });
            showToast(isMasked ? '🙈 已开启自测遮挡并记忆偏好' : '👁️ 已退出自测遮挡模式并记忆偏好');
          }
          return;
        }

        // 4. Single Definition Click to Reveal/Mask in Self-test Mode
        const defBox = e.target.closest('.vocab-card-def');
        if (defBox) {
          const wrap = defBox.closest('.vocab-matrix-wrap');
          if (wrap && wrap.classList.contains('mask-active')) {
            defBox.classList.toggle('revealed');
          }
          return;
        }

        // 5. View Toggle (Card Grid vs Compact Table)
        const viewBtn = e.target.closest('.vocab-view-toggle button');
        if (viewBtn) {
          e.preventDefault();
          e.stopPropagation();
          const view = viewBtn.getAttribute('data-view') || 'grid';
          if (window.StorageModule && window.StorageModule.setVocabViewPreference) {
            window.StorageModule.setVocabViewPreference(view);
          }
          // Synchronize all matrix wraps on page
          document.querySelectorAll('.vocab-matrix-wrap').forEach(w => {
            w.querySelectorAll('.vocab-view-toggle button').forEach(b => {
              b.classList.toggle('active', b.getAttribute('data-view') === view);
            });
            const gridView = w.querySelector('.vocab-grid-view');
            const tableView = w.querySelector('.vocab-table-view');
            if (view === 'table') {
              if (gridView) gridView.style.display = 'none';
              if (tableView) tableView.style.display = 'block';
            } else {
              if (gridView) gridView.style.display = 'block';
              if (tableView) tableView.style.display = 'none';
            }
          });
          showToast(view === 'table' ? '📋 已切换为矩阵表格并记忆偏好' : '📇 已切换为卡片视图并记忆偏好');
          return;
        }

        // 6. Category Filter Tabs
        const filterPill = e.target.closest('.vocab-filter-pill');
        if (filterPill) {
          e.preventDefault();
          e.stopPropagation();
          const filter = filterPill.getAttribute('data-filter');
          const wrap = filterPill.closest('.vocab-matrix-wrap');
          if (wrap) {
            wrap.querySelectorAll('.vocab-filter-pill').forEach(p => p.classList.remove('active'));
            filterPill.classList.add('active');
            const cards = wrap.querySelectorAll('.vocab-card');
            const rows = wrap.querySelectorAll('.vocab-table-row');
            cards.forEach(c => {
              const cat = c.getAttribute('data-cat');
              c.style.display = (filter === 'all' || cat === filter) ? 'flex' : 'none';
            });
            rows.forEach(r => {
              const cat = r.getAttribute('data-cat');
              r.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
            });
          }
          return;
        }

        // 7. Context Drawer Toggle & Left Panel Highlighting
        const ctxBtn = e.target.closest('.vocab-context-btn');
        if (ctxBtn) {
          e.preventDefault();
          e.stopPropagation();
          const drawer = ctxBtn.nextElementSibling;
          if (drawer) {
            const isHidden = drawer.style.display === 'none';
            drawer.style.display = isHidden ? 'block' : 'none';
          }
          const sid = ctxBtn.getAttribute('data-sid');
          if (sid !== null) highlightSentenceOnLeftPanel(sid);
          return;
        }

        const ctxJumpBtn = e.target.closest('.vocab-context-jump-btn');
        if (ctxJumpBtn) {
          e.preventDefault();
          e.stopPropagation();
          const sid = ctxJumpBtn.getAttribute('data-sid');
          highlightSentenceOnLeftPanel(sid);
          return;
        }
      });
    }

    // Global click listener to close popups and modals when clicking outside
    document.addEventListener('click', e => {
      // 1. Close Vocabulary Popup if clicking outside
      if (vocabPopup && !vocabPopup.contains(e.target) && !e.target.closest('.exam-vocab') && !e.target.closest('.exam-connector')) {
        vocabPopup.classList.remove('show');
      }

      // 2. Close Modal Dialogs (Stats, Export, VocabBook) if clicking backdrop
      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
      }

      // 3. Close Syntax Breakdown Modal if clicking outside
      if (syntaxOverlay && syntaxOverlay.classList.contains('show')) {
        if (syntaxModal && !syntaxModal.contains(e.target) && !e.target.closest('.exam-sent')) {
          closeSyntaxModal();
        }
      }
    });
  }

  function formatColoredChunks(slashedText) {
    if (window.renderColoredChunks) {
      return window.renderColoredChunks(slashedText);
    }
    if (!slashedText) return '';
    const chunks = slashedText.split(/\s*[/／]\s*/).filter(c => c && c.trim().length > 0);
    if (chunks.length === 0) return slashedText;
    return chunks.map((chunk, i) => {
      const colorIdx = i % 6;
      return `<span class="chunk-c${colorIdx}">${chunk.trim()}</span>`;
    }).join('<span class="chunk-slash"> / </span>');
  }

  function showSyntaxModal(sent) {
    const overlay = document.getElementById('syntaxOverlay');
    const modal = document.getElementById('syntaxModal');
    const content = document.getElementById('syntaxModalContent');
    if (!content || !sent) return;

    const breakdownTags = (sent.syntax && sent.syntax.breakdown && Array.isArray(sent.syntax.breakdown))
      ? sent.syntax.breakdown.map(b => {
          let tagClass = 'tag-modifier';
          if (b.type.includes('主干')) tagClass = 'tag-backbone';
          if (b.type.includes('定语')) tagClass = 'tag-attributive';
          if (b.type.includes('状语')) tagClass = 'tag-adverbial';
          if (b.type.includes('名词')) tagClass = 'tag-noun';
          if (b.type.includes('逻辑') || b.type.includes('考点')) tagClass = 'tag-logic';
          if (b.type.includes('非谓语') || b.type.includes('特殊') || b.type.includes('同位语') || b.type.includes('修饰')) tagClass = 'tag-special';
          return `<li style="margin-bottom:8px;font-family:var(--font-base)"><span class="syntax-tag ${tagClass}">[${b.type}]</span> <strong style="font-family:var(--font-base);color:var(--ink)">${b.content}</strong> — <span style="font-family:var(--font-base)">${b.explanation}</span></li>`;
        }).join('')
      : '';

    content.innerHTML = `
      <div style="font-size:1.15em;font-family:var(--font-base);line-height:1.7;color:var(--ink);margin-bottom:14px">
        <strong>原句：</strong>${sent.text || ''}
      </div>
      <div style="margin-bottom:14px;background:rgba(37,99,235,0.06);padding:12px 16px;border-radius:8px;border-left:4px solid var(--accent);font-family:var(--font-base)">
        <p style="font-weight:700;color:var(--accent);margin-bottom:6px;font-family:var(--font-base)">【意群断句与速译】</p>
        <p class="chunk-group" style="margin-bottom:6px">${formatColoredChunks(sent.slashed_text)}</p>
        <p class="chunk-group">${formatColoredChunks(sent.chunk_translation)}</p>
      </div>
      <div style="margin-bottom:14px;background:var(--card-bg);padding:14px 16px;border-radius:8px;border:1px solid var(--border);font-family:var(--font-base)">
        <p style="font-weight:700;color:var(--mode-color);margin-bottom:10px;font-family:var(--font-base)">【主干识别与句法拆解】</p>
        <ul style="padding-left:16px;line-height:1.8;font-family:var(--font-base)">${breakdownTags}</ul>
      </div>
      <div style="background:rgba(15,118,110,0.06);padding:12px 16px;border-radius:8px;border-left:4px solid #0f766e;font-family:var(--font-base)">
        <p style="font-weight:700;color:#0f766e;margin-bottom:6px;font-family:var(--font-base)">【满分参考译文与考点】</p>
        <p style="font-size:1.05em;color:#0f766e;font-weight:600;font-family:var(--font-base);line-height:1.7">${sent.translation || ''}</p>
      </div>
    `;

    if (overlay) overlay.classList.add('show');
    if (modal) modal.classList.add('show');
  }

  function showVocabPopup(word, clientX, clientY, sentenceContext) {
    const popup = document.getElementById('vocabPopup');
    if (!popup) return;

    const wClean = word.toLowerCase().trim();
    const dict = window.KAOYAN_VOCAB_DICT || {};

    let customDef = null;
    let customPos = '';
    if (AppState.textData && AppState.textData.paragraphs) {
      for (const p of AppState.textData.paragraphs) {
        if (p.vocabulary) {
          const match = p.vocabulary.find(v => v.word && v.word.toLowerCase().trim() === wClean);
          if (match && match.definition) {
            customDef = match.definition;
            customPos = match.pos || '';
            break;
          }
        }
      }
    }

    const info = dict[wClean] || dict[wClean.replace(/s$|ed$|ing$/, '')] || {
      pos: customPos || "n./v.",
      def: customDef || "考研语境核心词汇",
      full: "语境常考释义与核心搭配"
    };

    if (customDef) {
      info.def = customDef;
      if (customPos) info.pos = customPos;
    }

    // Check if this word/phrase is in our discourse logical connector signpost library
    const signpost = LOGIC_SIGNPOST_DICT[wClean] || LOGIC_SIGNPOST_DICT[wClean.replace(/s$|ed$|ing$/, '')];
    let signpostHtml = '';
    if (signpost) {
      signpostHtml = `
        <div class="logic-signpost-card">
          <div class="signpost-header">
            <span class="signpost-badge">🧭 考研语篇与解题风向标</span>
            <span class="signpost-category">${signpost.category}</span>
          </div>
          <div class="signpost-focus">${signpost.focus}</div>
          <div class="signpost-strategy">${signpost.strategy}</div>
        </div>
      `;
    }

    const isBookmarked = window.StorageModule.isBookmarked(wClean);

    popup.innerHTML = `
      <div class="vocab-header">
        <div style="display:flex;align-items:center;gap:6px">
          <span class="vocab-word">${word}</span>
          <button id="popupTtsBtn" class="vocab-icon-btn" title="🔊 朗读发音" style="font-size:0.95em;padding:2px 4px">🔊</button>
        </div>
        <span class="vocab-pos">${info.pos}</span>
      </div>
      ${signpostHtml}
      <div class="vocab-def">${info.def}</div>
      <div class="vocab-actions">
        <button id="bookmarkBtn" class="toolbar-btn ${isBookmarked ? 'active' : ''}">${isBookmarked ? '★ 已在生词本' : '☆ 收藏生词'}</button>
        <button id="closeVocabBtn" class="toolbar-btn" style="padding:2px 8px">✕</button>
      </div>
    `;

    const posX = Math.min(Math.max(16, clientX - 160), window.innerWidth - 340);
    const posY = Math.min(clientY + 15, window.innerHeight - 200);
    popup.style.left = `${posX}px`;
    popup.style.top = `${posY}px`;
    popup.classList.add('show');

    const popupTtsBtn = document.getElementById('popupTtsBtn');
    if (popupTtsBtn) popupTtsBtn.onclick = () => speakWord(word);

    document.getElementById('closeVocabBtn').onclick = () => popup.classList.remove('show');
    document.getElementById('bookmarkBtn').onclick = () => {
      const res = window.StorageModule.toggleBookmark(word, info.def, sentenceContext, AppState.year, AppState.textId);
      const bBtn = document.getElementById('bookmarkBtn');
      if (bBtn) {
        bBtn.textContent = res.added ? '★ 已在生词本' : '☆ 收藏生词';
        bBtn.classList.toggle('active', res.added);
      }
    };
  }

  // Global Handlers for Mock Exam Interactions
  window.handleMockOptionClick = function(year, textId, qid, optKey) {
    const saved = window.StorageModule.loadMockAnswers(year, textId) || { answers: {}, isSubmitted: false };
    if (saved.isSubmitted) return;

    saved.answers[qid] = optKey;
    window.StorageModule.saveMockAnswers(year, textId, saved.answers, false);
    window.QuizModule.renderMockExam(AppState.textData, 'workspaceContent');
  };

  window.handleMockSubmit = function(year, textId) {
    const saved = window.StorageModule.loadMockAnswers(year, textId) || { answers: {}, isSubmitted: false };
    const answers = saved.answers || {};

    if (Object.keys(answers).length < 5) {
      if (!confirm(`您还有 ${5 - Object.keys(answers).length} 道题未作答，确定现在提前交卷吗？`)) {
        return;
      }
    }

    let correctCount = 0;
    AppState.textData.questions.forEach(q => {
      const corrKey = (q.options.find(o => o.is_correct) || q.options[0]).key;
      const userChoice = answers[q.qid];
      if (userChoice === corrKey) {
        correctCount++;
        window.StorageModule.removeMistake(year, textId, q.qid);
      } else {
        const wrongOpt = q.options.find(o => o.key === userChoice);
        const correctOpt = q.options.find(o => o.is_correct);
        window.StorageModule.saveMistake(year, textId, q.qid, q.stem, wrongOpt ? wrongOpt.text : '未作答', correctOpt.text);
      }
    });

    const accuracy = correctCount * 20; // 0% ~ 100%
    window.StorageModule.markTextCompleted(year, textId, accuracy);
    window.StorageModule.saveMockAnswers(year, textId, answers, true);
    window.QuizModule.renderMockExam(AppState.textData, 'workspaceContent');
  };

  window.handleMockReset = function(year, textId) {
    if (confirm('确定要清空作答记录并重新模考吗？')) {
      window.StorageModule.saveMockAnswers(year, textId, {}, false);
      window.QuizModule.renderMockExam(AppState.textData, 'workspaceContent');
    }
  };

  window.handleErrorReasonChange = function(year, textId, qid, checkbox) {
    const currentReasons = window.StorageModule.loadErrorReasons(year, textId, qid);
    const val = checkbox.value;
    let newReasons = [...currentReasons];
    if (checkbox.checked) {
      if (!newReasons.includes(val)) newReasons.push(val);
    } else {
      newReasons = newReasons.filter(r => r !== val);
    }
    window.StorageModule.saveErrorReasons(year, textId, qid, newReasons);
  };

  function setupEventListeners() {
    // 1. Topbar Controls Collapse Toggle
    const toggleTopbarBtn = document.getElementById('toggleTopbarBtn');
    const mainTopbar = document.getElementById('mainTopbar');

    if (toggleTopbarBtn && mainTopbar) {
      toggleTopbarBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isCollapsed = mainTopbar.classList.toggle('controls-collapsed');
        toggleTopbarBtn.textContent = isCollapsed ? '▼ 展开功能栏' : '▲ 收起功能栏';
      };
    }

    // 1b. Workspace Layout Toolbar Collapse Toggle
    const toggleWsToolbarBtn = document.getElementById('toggleWsToolbarBtn');
    const wsToolbarTitle = document.getElementById('wsToolbarTitle');
    const wsToolbar = document.getElementById('workspaceToolbar');
    const wsToggleIcon = document.getElementById('wsToggleIcon');
    const wsToggleText = document.getElementById('wsToggleText');

    function setWorkspaceToolbarCollapsed(collapsed) {
      if (!wsToolbar) return;
      if (collapsed) {
        wsToolbar.classList.add('collapsed');
        if (wsToggleIcon) wsToggleIcon.textContent = '▼';
        if (wsToggleText) wsToggleText.textContent = '展开';
        if (toggleWsToolbarBtn) toggleWsToolbarBtn.title = '展开工作台排版栏';
      } else {
        wsToolbar.classList.remove('collapsed');
        if (wsToggleIcon) wsToggleIcon.textContent = '▲';
        if (wsToggleText) wsToggleText.textContent = '收起';
        if (toggleWsToolbarBtn) toggleWsToolbarBtn.title = '收起工作台排版栏';
      }
      try {
        localStorage.setItem('kaoyan_workspace_toolbar_collapsed', collapsed ? '1' : '0');
      } catch (e) {}
    }

    if (wsToolbar) {
      try {
        const isSavedCollapsed = localStorage.getItem('kaoyan_workspace_toolbar_collapsed') === '1';
        if (isSavedCollapsed) {
          setWorkspaceToolbarCollapsed(true);
        }
      } catch (e) {}

      if (toggleWsToolbarBtn) {
        toggleWsToolbarBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isCurrentlyCollapsed = wsToolbar.classList.contains('collapsed');
          setWorkspaceToolbarCollapsed(!isCurrentlyCollapsed);
        });
      }

      if (wsToolbarTitle) {
        wsToolbarTitle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isCurrentlyCollapsed = wsToolbar.classList.contains('collapsed');
          setWorkspaceToolbarCollapsed(!isCurrentlyCollapsed);
        });
      }

      // If user clicks on the collapsed toolbar pill itself, expand it
      wsToolbar.addEventListener('click', (e) => {
        if (wsToolbar.classList.contains('collapsed')) {
          setWorkspaceToolbarCollapsed(false);
        }
      });
    }

    // 2. Year and Text dropdowns
    document.getElementById('yearSelect').addEventListener('change', e => {
      AppState.year = Number(e.target.value);
      AppState.textId = 1;
      updateTextDropdown();
      AppState.savedStepIndex = 0;
      loadCurrentText();
    });

    document.getElementById('textSelect').addEventListener('change', e => {
      AppState.textId = Number(e.target.value);
      AppState.savedStepIndex = 0;
      loadCurrentText();
    });

    // 3. Mode Toggles
    const practiceBtn = document.getElementById('practiceModeBtn');
    const reviewBtn = document.getElementById('reviewModeBtn');
    const vocabBtn = document.getElementById('vocabModeBtn');

    practiceBtn.addEventListener('click', () => {
      if (AppState.mode === 'practice') return;
      AppState.mode = 'practice';
      AppState.savedStepIndex = 0;
      loadCurrentText();
    });

    reviewBtn.addEventListener('click', () => {
      if (AppState.mode === 'review') return;
      AppState.mode = 'review';
      AppState.savedStepIndex = 0;
      loadCurrentText();
    });

    if (vocabBtn) {
      vocabBtn.addEventListener('click', () => {
        if (AppState.mode === 'vocab') return;
        AppState.mode = 'vocab';
        loadCurrentText();
      });
    }

    // 4. Submode Toggle (Mock vs Step)
    const mockBtn = document.getElementById('submodeMockBtn');
    const stepBtn = document.getElementById('submodeStepBtn');

    if (mockBtn && stepBtn) {
      mockBtn.addEventListener('click', () => {
        if (AppState.practiceSubmode === 'mock') return;
        AppState.practiceSubmode = 'mock';
        mockBtn.classList.add('active');
        stepBtn.classList.remove('active');
        loadCurrentText();
      });

      stepBtn.addEventListener('click', () => {
        if (AppState.practiceSubmode === 'step') return;
        AppState.practiceSubmode = 'step';
        stepBtn.classList.add('active');
        mockBtn.classList.remove('active');
        loadCurrentText();
      });
    }

    function goPrev() {
      if (AppState.stepIndex > 0) {
        AppState.stepIndex--;
        renderCurrentStep();
        updateUIControls();
      }
    }

    function goNext() {
      if (AppState.stepIndex < AppState.steps.length - 1) {
        AppState.stepIndex++;
        renderCurrentStep();
        updateUIControls();
      }
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const floatPrevBtn = document.getElementById('floatPrevBtn');
    const floatNextBtn = document.getElementById('floatNextBtn');

    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (floatPrevBtn) floatPrevBtn.addEventListener('click', goPrev);
    if (floatNextBtn) floatNextBtn.addEventListener('click', goNext);

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        AppState.stepIndex = 0;
        renderCurrentStep({ forceTop: true });
        updateUIControls();
      });
    }

    document.getElementById('jumpSelect').addEventListener('change', e => {
      const idx = Number(e.target.value);
      if (!isNaN(idx) && idx >= 0 && idx < AppState.steps.length) {
        AppState.stepIndex = idx;
        renderCurrentStep({ forceTop: true });
        updateUIControls();
      }
    });

    document.getElementById('toggleAllBtn').addEventListener('click', () => {
      AppState.isFullMode = !AppState.isFullMode;
      renderCurrentStep({ forceTop: true });
      updateUIControls();
    });

    document.getElementById('themeSelect').addEventListener('change', e => {
      AppState.theme = e.target.value;
      applyTheme(AppState.theme);
      saveState();
    });

    const tabLeftBtn = document.getElementById('tabLeftBtn');
    const tabRightBtn = document.getElementById('tabRightBtn');
    const mainLayout = document.getElementById('mainLayout');

    if (tabLeftBtn && tabRightBtn && mainLayout) {
      tabLeftBtn.addEventListener('click', () => {
        mainLayout.className = 'layout show-left';
        tabLeftBtn.classList.add('active');
        tabRightBtn.classList.remove('active');
      });
      tabRightBtn.addEventListener('click', () => {
        mainLayout.className = 'layout show-right';
        tabRightBtn.classList.add('active');
        tabLeftBtn.classList.remove('active');
      });
    }
  }

  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (AppState.mode === 'vocab') return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        const floatNext = document.getElementById('floatNextBtn');
        if (floatNext && !floatNext.disabled) floatNext.click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const floatPrev = document.getElementById('floatPrevBtn');
        if (floatPrev && !floatPrev.disabled) floatPrev.click();
      } else if (e.key === 'Escape') {
        const overlay = document.getElementById('syntaxOverlay');
        const modal = document.getElementById('syntaxModal');
        if (overlay) overlay.classList.remove('show');
        const popup = document.getElementById('vocabPopup');
        const stats = document.getElementById('statsModal');
        const exp = document.getElementById('exportModal');
        if (modal) modal.classList.remove('show');
        if (popup) popup.classList.remove('show');
        if (stats) stats.classList.remove('show');
        if (exp) exp.classList.remove('show');
      } else if (e.key === 'f' || e.key === 'F') {
        document.getElementById('toggleAllBtn').click();
      } else if (e.key === 'm' || e.key === 'M') {
        if (AppState.mode === 'practice') {
          document.getElementById('reviewModeBtn').click();
        } else {
          document.getElementById('practiceModeBtn').click();
        }
      }
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
