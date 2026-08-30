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

  // Study Time Tracker (Heartbeat every 5 seconds)
  setInterval(() => {
    if (AppState.textData && !document.hidden) {
      window.StorageModule.recordTimeSpent(AppState.year, AppState.textId, 5);
    }
  }, 5000);

  function init() {
    window.ReaderModule.init();
    // 1. Restore state from localStorage
    const saved = window.StorageModule.loadProgress();
    if (saved) {
      if (saved.year) AppState.year = Number(saved.year);
      if (saved.textId) AppState.textId = Number(saved.textId);
      if (saved.mode === 'practice' || saved.mode === 'review') AppState.mode = saved.mode;
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
    if (AppState.mode === 'practice' && AppState.practiceSubmode === 'mock') {
      window.QuizModule.renderMockExam(AppState.textData, 'workspaceContent');
      return;
    }

    if (AppState.isFullMode) {
      window.QuizModule.renderFull(AppState.steps, 'workspaceContent');
      return;
    }

    const step = AppState.steps[AppState.stepIndex];
    if (!step) return;

    window.QuizModule.renderStep(step, AppState.stepIndex, AppState.steps.length, 'workspaceContent', AppState.textData);
    window.ReaderModule.applySettings();

    const rightScroll = document.getElementById('rightScroll');
    if (rightScroll && window.innerWidth > 900) {
      rightScroll.scrollTo({ top: 0, behavior: 'smooth' });
    }

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

    if (floatingNavBar) {
      floatingNavBar.style.display = isMock ? 'none' : 'flex';
    }

    const isFirst = AppState.stepIndex <= 0;
    const isLast = AppState.stepIndex >= AppState.steps.length - 1;
    const isFull = AppState.isFullMode;

    if (prevBtn) prevBtn.disabled = isMock || isFull || isFirst;
    if (nextBtn) nextBtn.disabled = isMock || isFull || isLast;
    if (floatPrevBtn) floatPrevBtn.disabled = isMock || isFull || isFirst;
    if (floatNextBtn) floatNextBtn.disabled = isMock || isFull || isLast;

    const progStr = isMock ? '全卷模考' : `${AppState.stepIndex + 1} / ${AppState.steps.length}`;
    if (progressText) progressText.textContent = progStr;
    if (floatProgressText) floatProgressText.textContent = progStr;

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

    // Build 14-Year Progress Heatmap
    let heatmapHtml = '';
    for (let yr = 2010; yr <= 2023; yr++) {
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
    }

    statsContainer.innerHTML = `
      <div class="stats-metrics-grid">
        <div class="stat-box">
          <div class="stat-lbl">总精读进度</div>
          <div class="stat-val">${metrics.completedCount} / 56 <span style="font-size:0.5em;color:var(--muted)">(${metrics.progressPercent}%)</span></div>
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

      <h4 style="margin-bottom:12px;font-size:1.05em">📅 2010-2023 全景学习进度矩阵 (点击直达篇章)</h4>
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

  // Sentence and Vocab Interactions
  function setupSentenceAndVocabInteractions() {
    const examPaper = document.getElementById('examPaper');
    const syntaxModal = document.getElementById('syntaxModal');
    const syntaxModalContent = document.getElementById('syntaxModalContent');
    const closeSyntaxBtn = document.getElementById('closeSyntaxBtn');
    const vocabPopup = document.getElementById('vocabPopup');

    examPaper.addEventListener('click', e => {
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
        const sid = Number(sentSpan.getAttribute('data-sid'));
        const sentObj = AppState.textData.sentences.find(s => s.sid === sid);
        if (sentObj) {
          document.querySelectorAll('.exam-sent').forEach(el => el.classList.remove('active-sent'));
          sentSpan.classList.add('active-sent');
          showSyntaxModal(sentObj);
        }
      }
    });

    if (closeSyntaxBtn && syntaxModal) {
      closeSyntaxBtn.onclick = () => {
        syntaxModal.classList.remove('show');
        document.querySelectorAll('.exam-sent').forEach(el => el.classList.remove('active-sent'));
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

    document.addEventListener('click', e => {
      if (vocabPopup && !vocabPopup.contains(e.target) && !e.target.closest('.exam-vocab')) {
        vocabPopup.classList.remove('show');
      }
      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
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

  function showVocabPopup(word, clientX, clientY, sentenceContext) {
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
      <div class="vocab-tip">💡 考研考点提示：注意本词在阅读定位句中的同义替换与感情色彩。</div>
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

    // 2. Year and Text dropdowns
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

    // 3. Mode Toggles
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
