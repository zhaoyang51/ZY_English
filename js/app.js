/**
 * Kaoyan English II (2010-2026) Main Application Controller
 * Mobile & Tablet Responsive + Floating Navigation Controls
 */
(function() {
  const State = {
    year: 2010,
    textId: 1,
    mode: 'practice', // 'practice' | 'review'
    stepIndex: 0,
    isFullMode: false,
    theme: 'light',
    fontSize: 18,
    textData: null,
    steps: []
  };
  
  function init() {
    const manifest = window.KAOYAN_MANIFEST || [];
    if (manifest.length > 0) {
      if (!manifest.some(item => item.year === State.year)) {
        State.year = manifest[0].year;
      }
      const yItem = manifest.find(item => item.year === State.year);
      if (yItem && yItem.texts && yItem.texts.length > 0) {
        if (!yItem.texts.some(t => t.id === State.textId)) {
          State.textId = yItem.texts[0].id;
        }
      }
    }
    setupSelectors();
    setupEventListeners();
    setupKeyboardShortcuts();
    loadCurrentText();
  }
  
  function setupSelectors() {
    const yearSelect = document.getElementById('yearSelect');
    const manifest = window.KAOYAN_MANIFEST || [];
    
    yearSelect.innerHTML = '';
    manifest.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.year;
      opt.textContent = `${item.year} 年`;
      if (item.year === State.year) opt.selected = true;
      yearSelect.appendChild(opt);
    });
    
    updateTextDropdown();
  }
  
  function updateTextDropdown() {
    const textSelect = document.getElementById('textSelect');
    const yItem = (window.KAOYAN_MANIFEST || []).find(m => m.year === State.year);
    if (!yItem) return;
    
    textSelect.innerHTML = '';
    yItem.texts.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `Text ${t.id} (${t.q_range}题)`;
      if (t.id === State.textId) opt.selected = true;
      textSelect.appendChild(opt);
    });
  }
  
  function loadCurrentText() {
    State.textData = window.KAOYAN_DB.getTextData(State.year, State.textId);
    if (!State.textData) {
      console.error('Data missing for:', State.year, State.textId);
      return;
    }
    
    // Sync mode class on body for theme styling
    document.body.classList.toggle('mode-review', State.mode === 'review');
    document.body.classList.toggle('mode-practice', State.mode === 'practice');
    
    renderLeftExamPaper();
    
    // Set steps according to mode
    if (State.mode === 'practice') {
      State.steps = State.textData.practice.steps;
    } else {
      State.steps = State.textData.review.steps;
    }
    
    State.stepIndex = 0;
    updateJumpDropdown();
    renderCurrentStep();
    updateUIControls();
  }
  
  function renderLeftExamPaper() {
    const paper = document.getElementById('examPaper');
    const data = State.textData;
    if (!paper || !data) return;
    
    let html = `
      <h2 class="paper-title">${State.year} 年全国硕士研究生招生考试英语（二）阅读理解</h2>
      <div class="paper-subtitle">Text ${State.textId} (${data.qRange}题)</div>
      <div class="exam-article-section">
    `;
    
    data.paragraphs.forEach((p, idx) => {
      html += `
        <div class="exam-para" id="exam-para-${idx}" data-pid="${idx}">
          <span class="para-badge">[Para ${idx + 1}]</span>
          <span class="para-text">${p}</span>
        </div>
      `;
    });
    
    html += `</div><hr class="exam-divider"><div class="exam-questions-section"><h3>Questions (${data.qRange})</h3>`;
    
    data.questions.forEach(q => {
      html += `
        <div class="exam-question-card" id="exam-q-${q.qid}" data-qid="${q.qid}">
          <div class="q-stem">${q.qid}. ${q.stem}</div>
          <div class="q-options">
            ${q.options.map(opt => `
              <div class="q-opt" data-opt="${opt.key}">
                <span class="opt-key">[${opt.key}]</span>
                <span class="opt-text">${opt.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    
    html += `</div>`;
    paper.innerHTML = html;
  }
  
  function updateJumpDropdown() {
    const jumpSelect = document.getElementById('jumpSelect');
    if (!jumpSelect) return;
    
    jumpSelect.innerHTML = '<option value="">📑 章节跳转</option>';
    
    const seenSections = new Set();
    State.steps.forEach((st, idx) => {
      let secName = '';
      if (State.mode === 'practice') {
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
    if (State.isFullMode) {
      if (State.mode === 'practice') {
        window.PracticeRenderer.renderFull(State.steps);
      } else {
        window.ReviewRenderer.renderFull(State.steps);
      }
      return;
    }
    
    const step = State.steps[State.stepIndex];
    if (!step) return;
    
    if (State.mode === 'practice') {
      window.PracticeRenderer.renderStep(step, State.stepIndex, State.steps.length, State.textData);
    } else {
      window.ReviewRenderer.renderStep(step, State.stepIndex, State.steps.length, State.textData);
    }
    
    // Auto scroll right workspace to top
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
    
    const isFirst = State.stepIndex <= 0;
    const isLast = State.stepIndex >= State.steps.length - 1;
    const isFull = State.isFullMode;
    
    if (prevBtn) prevBtn.disabled = isFull || isFirst;
    if (nextBtn) nextBtn.disabled = isFull || isLast;
    if (floatPrevBtn) floatPrevBtn.disabled = isFull || isFirst;
    if (floatNextBtn) floatNextBtn.disabled = isFull || isLast;
    
    const progStr = `${State.stepIndex + 1} / ${State.steps.length}`;
    if (progressText) progressText.textContent = progStr;
    if (floatProgressText) floatProgressText.textContent = progStr;
    
    if (toggleAllBtn) {
      toggleAllBtn.textContent = State.isFullMode ? '返回分步' : '显示全部';
      toggleAllBtn.classList.toggle('active', State.isFullMode);
    }
  }
  
  function setupEventListeners() {
    // Year Change
    document.getElementById('yearSelect').addEventListener('change', e => {
      State.year = Number(e.target.value);
      updateTextDropdown();
      State.textId = 1;
      loadCurrentText();
    });
    
    // Text Change
    document.getElementById('textSelect').addEventListener('change', e => {
      State.textId = Number(e.target.value);
      loadCurrentText();
    });
    
    // Mode Switch Buttons
    document.getElementById('practiceModeBtn').addEventListener('click', () => {
      if (State.mode === 'practice') return;
      State.mode = 'practice';
      document.getElementById('practiceModeBtn').classList.add('active');
      document.getElementById('reviewModeBtn').classList.remove('active');
      loadCurrentText();
    });
    
    document.getElementById('reviewModeBtn').addEventListener('click', () => {
      if (State.mode === 'review') return;
      State.mode = 'review';
      document.getElementById('reviewModeBtn').classList.add('active');
      document.getElementById('practiceModeBtn').classList.remove('active');
      loadCurrentText();
    });
    
    // Step Navigation Function
    function goPrev() {
      if (State.stepIndex > 0) {
        State.stepIndex--;
        renderCurrentStep();
        updateUIControls();
      }
    }
    
    function goNext() {
      if (State.stepIndex < State.steps.length - 1) {
        State.stepIndex++;
        renderCurrentStep();
        updateUIControls();
      }
    }
    
    // Desktop & Floating Prev/Next Buttons
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
        State.stepIndex = 0;
        renderCurrentStep();
        updateUIControls();
      });
    }
    
    // Jump Select
    document.getElementById('jumpSelect').addEventListener('change', e => {
      const idx = Number(e.target.value);
      if (!isNaN(idx) && idx >= 0 && idx < State.steps.length) {
        State.stepIndex = idx;
        renderCurrentStep();
        updateUIControls();
      }
    });
    
    // Toggle Full Mode
    document.getElementById('toggleAllBtn').addEventListener('click', () => {
      State.isFullMode = !State.isFullMode;
      renderCurrentStep();
      updateUIControls();
    });
    
    // Theme Switch
    document.getElementById('themeSelect').addEventListener('change', e => {
      document.body.className = '';
      if (e.target.value === 'parchment') document.body.classList.add('theme-parchment');
      if (e.target.value === 'dark') document.body.classList.add('theme-dark');
      document.body.classList.toggle('mode-review', State.mode === 'review');
      document.body.classList.toggle('mode-practice', State.mode === 'practice');
    });
    
    // Mobile Tabs (Article vs Workspace)
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
        if (State.mode === 'practice') {
          document.getElementById('reviewModeBtn').click();
        } else {
          document.getElementById('practiceModeBtn').click();
        }
      }
    });
  }
  
  window.addEventListener('DOMContentLoaded', init);
})();
