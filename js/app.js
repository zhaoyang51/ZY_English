/**
 * Kaoyan English II Main Application Orchestrator
 * Modular State Machine + Real-time Module Tracker + Persistence
 */
(function() {
  const AppState = {
    year: 2010,
    textId: 1,
    mode: 'practice', // 'practice' | 'review'
    stepIndex: 0,
    savedStepIndex: null,
    isFullMode: false,
    theme: 'light',
    textData: null,
    steps: []
  };

  function init() {
    // 1. Restore state from localStorage
    const saved = window.StorageModule.loadProgress();
    if (saved) {
      if (saved.year) AppState.year = Number(saved.year);
      if (saved.textId) AppState.textId = Number(saved.textId);
      if (saved.mode === 'practice' || saved.mode === 'review') AppState.mode = saved.mode;
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

    // 4. Load initial text
    loadCurrentText();
  }

  function applyTheme(themeName) {
    document.body.className = '';
    if (themeName === 'parchment') document.body.classList.add('theme-parchment');
    if (themeName === 'dark') document.body.classList.add('theme-dark');
    document.body.classList.toggle('mode-review', AppState.mode === 'review');
    document.body.classList.toggle('mode-practice', AppState.mode === 'practice');

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

  function loadCurrentText() {
    // Try synchronous cache from all_data.js first, fallback to DB loader
    if (window.KAOYAN_PURE_DATA && window.KAOYAN_PURE_DATA[AppState.year]) {
      const yData = window.KAOYAN_PURE_DATA[AppState.year];
      AppState.textData = yData.texts.find(t => t.text_id === AppState.textId);
    }

    if (!AppState.textData) {
      console.error('Data not found for:', AppState.year, AppState.textId);
      return;
    }

    // Sync body mode classes
    document.body.classList.toggle('mode-review', AppState.mode === 'review');
    document.body.classList.toggle('mode-practice', AppState.mode === 'practice');

    // Render left panel authentic exam paper
    window.ReaderModule.renderExamPaper(AppState.textData, 'examPaper');

    // Build steps dynamically from pure JSON via QuizModule!
    if (AppState.mode === 'practice') {
      AppState.steps = window.QuizModule.buildPracticeSteps(AppState.textData);
    } else {
      AppState.steps = window.QuizModule.buildReviewSteps(AppState.textData);
    }

    // Restore step index
    if (AppState.savedStepIndex !== null && AppState.savedStepIndex >= 0 && AppState.savedStepIndex < AppState.steps.length) {
      AppState.stepIndex = AppState.savedStepIndex;
      AppState.savedStepIndex = null;
    } else {
      AppState.stepIndex = 0;
    }

    updateJumpDropdown();
    renderCurrentStep();
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

  function renderCurrentStep() {
    if (AppState.isFullMode) {
      window.QuizModule.renderFull(AppState.steps, 'workspaceContent');
      return;
    }

    const step = AppState.steps[AppState.stepIndex];
    if (!step) return;

    window.QuizModule.renderStep(step, AppState.stepIndex, AppState.steps.length, 'workspaceContent', AppState.textData);

    // Auto scroll right workspace & mobile window to top
    const rightScroll = document.getElementById('rightScroll');
    if (rightScroll) rightScroll.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth <= 900) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const isFirst = AppState.stepIndex <= 0;
    const isLast = AppState.stepIndex >= AppState.steps.length - 1;
    const isFull = AppState.isFullMode;

    if (prevBtn) prevBtn.disabled = isFull || isFirst;
    if (nextBtn) nextBtn.disabled = isFull || isLast;
    if (floatPrevBtn) floatPrevBtn.disabled = isFull || isFirst;
    if (floatNextBtn) floatNextBtn.disabled = isFull || isLast;

    const progStr = `${AppState.stepIndex + 1} / ${AppState.steps.length}`;
    if (progressText) progressText.textContent = progStr;
    if (floatProgressText) floatProgressText.textContent = progStr;

    if (toggleAllBtn) {
      toggleAllBtn.textContent = AppState.isFullMode ? '返回分步' : '显示全部';
      toggleAllBtn.classList.toggle('active', AppState.isFullMode);
    }

    // Dynamic Module Tracker: keep jumpSelect matching current section
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
    window.StorageModule.saveProgress({
      year: AppState.year,
      textId: AppState.textId,
      mode: AppState.mode,
      stepIndex: AppState.stepIndex,
      theme: AppState.theme,
      isFullMode: AppState.isFullMode
    });
  }

  function setupEventListeners() {
    // Year Change
    document.getElementById('yearSelect').addEventListener('change', e => {
      AppState.year = Number(e.target.value);
      updateTextDropdown();
      AppState.textId = 1;
      AppState.savedStepIndex = 0;
      loadCurrentText();
    });

    // Text Change
    document.getElementById('textSelect').addEventListener('change', e => {
      AppState.textId = Number(e.target.value);
      AppState.savedStepIndex = 0;
      loadCurrentText();
    });

    // Mode Buttons
    const practiceBtn = document.getElementById('practiceModeBtn');
    const reviewBtn = document.getElementById('reviewModeBtn');

    practiceBtn.addEventListener('click', () => {
      if (AppState.mode === 'practice') return;
      AppState.mode = 'practice';
      AppState.savedStepIndex = 0;
      practiceBtn.classList.add('active');
      reviewBtn.classList.remove('active');
      loadCurrentText();
    });

    reviewBtn.addEventListener('click', () => {
      if (AppState.mode === 'review') return;
      AppState.mode = 'review';
      AppState.savedStepIndex = 0;
      reviewBtn.classList.add('active');
      practiceBtn.classList.remove('active');
      loadCurrentText();
    });

    // Step Nav
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
        renderCurrentStep();
        updateUIControls();
      });
    }

    // Jump Select
    document.getElementById('jumpSelect').addEventListener('change', e => {
      const idx = Number(e.target.value);
      if (!isNaN(idx) && idx >= 0 && idx < AppState.steps.length) {
        AppState.stepIndex = idx;
        renderCurrentStep();
        updateUIControls();
      }
    });

    // Toggle Full Mode
    document.getElementById('toggleAllBtn').addEventListener('click', () => {
      AppState.isFullMode = !AppState.isFullMode;
      renderCurrentStep();
      updateUIControls();
    });

    // Theme Switch
    document.getElementById('themeSelect').addEventListener('change', e => {
      AppState.theme = e.target.value;
      applyTheme(AppState.theme);
      saveState();
    });

    // Mobile Tabs
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

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        const floatNext = document.getElementById('floatNextBtn');
        if (floatNext && !floatNext.disabled) floatNext.click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const floatPrev = document.getElementById('floatPrevBtn');
        if (floatPrev && !floatPrev.disabled) floatPrev.click();
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
