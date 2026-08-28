/**
 * Kaoyan English II Main Application Orchestrator
 * Full In-depth Reading & Syntax Breakdown Interactive Engine
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
    setupSentenceAndVocabInteractions();

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
    if (window.KAOYAN_PURE_DATA && window.KAOYAN_PURE_DATA[AppState.year]) {
      const yData = window.KAOYAN_PURE_DATA[AppState.year];
      AppState.textData = yData.texts.find(t => t.text_id === AppState.textId);
    }

    if (!AppState.textData) {
      console.error('Data not found for:', AppState.year, AppState.textId);
      return;
    }

    document.body.classList.toggle('mode-review', AppState.mode === 'review');
    document.body.classList.toggle('mode-practice', AppState.mode === 'practice');

    // Render left panel authentic exam paper with interactive sentences
    window.ReaderModule.renderExamPaper(AppState.textData, 'examPaper');

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
    window.StorageModule.saveProgress({
      year: AppState.year,
      textId: AppState.textId,
      mode: AppState.mode,
      stepIndex: AppState.stepIndex,
      theme: AppState.theme,
      isFullMode: AppState.isFullMode
    });
  }

  // 4. In-depth Sentence Syntax Modal & Vocabulary Popups
  function setupSentenceAndVocabInteractions() {
    const examPaper = document.getElementById('examPaper');
    const syntaxModal = document.getElementById('syntaxModal');
    const syntaxModalContent = document.getElementById('syntaxModalContent');
    const closeSyntaxBtn = document.getElementById('closeSyntaxBtn');
    const vocabPopup = document.getElementById('vocabPopup');

    // Sentence Click Handler
    examPaper.addEventListener('click', e => {
      const vocabSpan = e.target.closest('.exam-vocab');
      if (vocabSpan) {
        e.stopPropagation();
        showVocabPopup(vocabSpan.getAttribute('data-word'), e.clientX, e.clientY);
        return;
      }

      const sentSpan = e.target.closest('.exam-sent');
      if (sentSpan && AppState.textData) {
        const sid = Number(sentSpan.getAttribute('data-sid'));
        const sentObj = AppState.textData.sentences.find(s => s.sid === sid);
        if (sentObj) {
          document.querySelectorAll('.exam-sent').forEach(el => el.classList.remove('active-sent'));
          sentSpan.classList.add('active-sent');
          showSyntaxModal(sentObj);
        }
      }
    });

    // Close Modal Button
    if (closeSyntaxBtn && syntaxModal) {
      closeSyntaxBtn.onclick = () => {
        syntaxModal.classList.remove('show');
        document.querySelectorAll('.exam-sent').forEach(el => el.classList.remove('active-sent'));
      };
    }

    // Double-click or text selection for dictionary look-up
    examPaper.addEventListener('dblclick', () => {
      const selection = window.getSelection().toString().trim();
      if (selection && /^[a-zA-Z\s\-]+$/.test(selection) && selection.length < 30) {
        const range = window.getSelection().getRangeAt(0);
        const rect = range.getBoundingClientRect();
        showVocabPopup(selection, rect.left + rect.width / 2, rect.top);
      }
    });

    // Close popups when clicking outside
    document.addEventListener('click', e => {
      if (vocabPopup && !vocabPopup.contains(e.target) && !e.target.closest('.exam-vocab')) {
        vocabPopup.classList.remove('show');
      }
    });
  }

  function showSyntaxModal(sent) {
    const modal = document.getElementById('syntaxModal');
    const content = document.getElementById('syntaxModalContent');
    if (!modal || !content) return;

    const breakdownTags = sent.syntax.breakdown.map(b => {
      let tagClass = 'tag-modifier';
      if (b.type.includes('主干')) tagClass = 'tag-backbone';
      if (b.type.includes('定语')) tagClass = 'tag-attributive';
      if (b.type.includes('状语')) tagClass = 'tag-adverbial';
      if (b.type.includes('名词')) tagClass = 'tag-noun';
      return `<li style="margin-bottom:8px"><span class="syntax-tag ${tagClass}">[${b.type}]</span> <code>${b.content}</code> — ${b.explanation}</li>`;
    }).join('');

    content.innerHTML = `
      <div style="font-size:1.15em;font-family:var(--font-serif);line-height:1.7;color:var(--ink);margin-bottom:12px">
        <strong>原句：</strong>${sent.text}
      </div>
      <div style="margin-bottom:12px;background:rgba(37,99,235,0.06);padding:10px 14px;border-radius:6px;border-left:4px solid var(--accent)">
        <p style="font-weight:700;color:var(--accent);margin-bottom:4px">【意群断句与速译】</p>
        <p style="font-family:var(--font-mono);font-size:0.95em;margin-bottom:4px">${sent.slashed_text}</p>
        <p style="color:#2563eb;font-weight:500">${sent.chunk_translation}</p>
      </div>
      <div style="margin-bottom:12px;background:var(--card-bg);padding:12px 14px;border-radius:6px;border:1px solid var(--border)">
        <p style="font-weight:700;color:var(--mode-color);margin-bottom:8px">【主干识别与句法拆解】</p>
        <ul style="padding-left:14px;line-height:1.7">${breakdownTags}</ul>
      </div>
      <div style="background:rgba(15,118,110,0.06);padding:10px 14px;border-radius:6px;border-left:4px solid #0f766e">
        <p style="font-weight:700;color:#0f766e;margin-bottom:4px">【满分参考译文与考点】</p>
        <p style="font-size:1.02em;color:#0f766e;font-weight:600">${sent.translation}</p>
      </div>
    `;

    modal.classList.add('show');
  }

  function showVocabPopup(word, clientX, clientY) {
    const popup = document.getElementById('vocabPopup');
    if (!popup) return;

    const wClean = word.toLowerCase().trim();
    const dict = window.KAOYAN_VOCAB_DICT || {};
    const info = dict[wClean] || dict[wClean.replace(/s$|ed$|ing$/, '')] || {
      pos: "n./v.",
      def: "考研语境核心词汇",
      full: "语境常考释义与核心搭配"
    };

    const isBookmarked = window.StorageModule.isBookmarked(wClean);

    popup.innerHTML = `
      <div class="vocab-header">
        <span class="vocab-word">${word}</span>
        <span class="vocab-pos">${info.pos}</span>
      </div>
      <div class="vocab-def">${info.def}</div>
      <div class="vocab-tip">💡 考研考点提示：注意本词在阅读定位句中的同义替换与语境感情色彩。</div>
      <div class="vocab-actions">
        <button id="bookmarkBtn" class="toolbar-btn ${isBookmarked ? 'active' : ''}">${isBookmarked ? '★ 已在生词本' : '☆ 收藏生词'}</button>
        <button id="closeVocabBtn" class="toolbar-btn" style="padding:2px 8px">✕</button>
      </div>
    `;

    // Position Popup
    const posX = Math.min(Math.max(16, clientX - 160), window.innerWidth - 340);
    const posY = Math.min(clientY + 15, window.innerHeight - 200);
    popup.style.left = `${posX}px`;
    popup.style.top = `${posY}px`;
    popup.classList.add('show');

    document.getElementById('closeVocabBtn').onclick = () => popup.classList.remove('show');
    document.getElementById('bookmarkBtn').onclick = () => {
      const res = window.StorageModule.toggleBookmark(word, info.def);
      const bBtn = document.getElementById('bookmarkBtn');
      if (bBtn) {
        bBtn.textContent = res.added ? '★ 已在生词本' : '☆ 收藏生词';
        bBtn.classList.toggle('active', res.added);
      }
    };
  }

  function setupEventListeners() {
    document.getElementById('yearSelect').addEventListener('change', e => {
      AppState.year = Number(e.target.value);
      updateTextDropdown();
      AppState.textId = 1;
      AppState.savedStepIndex = 0;
      loadCurrentText();
    });

    document.getElementById('textSelect').addEventListener('change', e => {
      AppState.textId = Number(e.target.value);
      AppState.savedStepIndex = 0;
      loadCurrentText();
    });

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

    document.getElementById('jumpSelect').addEventListener('change', e => {
      const idx = Number(e.target.value);
      if (!isNaN(idx) && idx >= 0 && idx < AppState.steps.length) {
        AppState.stepIndex = idx;
        renderCurrentStep();
        updateUIControls();
      }
    });

    document.getElementById('toggleAllBtn').addEventListener('click', () => {
      AppState.isFullMode = !AppState.isFullMode;
      renderCurrentStep();
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

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        const floatNext = document.getElementById('floatNextBtn');
        if (floatNext && !floatNext.disabled) floatNext.click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const floatPrev = document.getElementById('floatPrevBtn');
        if (floatPrev && !floatPrev.disabled) floatPrev.click();
      } else if (e.key === 'Escape') {
        const modal = document.getElementById('syntaxModal');
        const popup = document.getElementById('vocabPopup');
        if (modal) modal.classList.remove('show');
        if (popup) popup.classList.remove('show');
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
