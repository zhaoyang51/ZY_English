/**
 * Vocab Module: Modern Ebbinghaus Spaced Repetition Vocabulary Flashcards Engine
 * Features:
 * 1. 3D Physical Card Flip with GPU acceleration
 * 2. Authentic Exam Context Sentences with Gold Keyword Highlighting
 * 3. 3 Memorization Modes (EN->ZH, ZH->EN, Context Cloze)
 * 4. Compact Streamlined Header with Collapsible Filter Drawer
 * 5. One-click Bookmark to Vocabulary Notebook (StorageModule)
 * 6. Dynamic Session Progress Bar & High-Density Stats Ribbon
 * 7. Audio TTS with Soundwave Feedback & Auto-Pronounce
 * 8. Undo Rating (↩ 撤销) Support & Full Keyboard Shortcuts HUD
 */
(function() {
  const STORAGE_KEY = 'KAOYAN_VOCAB_PROGRESS_V2';
  const SETTINGS_KEY = 'KAOYAN_VOCAB_USER_SETTINGS_V1';

  // 艾宾浩斯 9 级复习周期 (毫秒)
  // [5分钟, 30分钟, 12小时, 1天, 2天, 4天, 7天, 15天, 30天]
  const EBB_INTERVALS = [
    5 * 60 * 1000,
    30 * 60 * 1000,
    12 * 60 * 60 * 1000,
    1 * 24 * 60 * 60 * 1000,
    2 * 24 * 60 * 60 * 1000,
    4 * 24 * 60 * 60 * 1000,
    7 * 24 * 60 * 60 * 1000,
    15 * 24 * 60 * 60 * 1000,
    30 * 24 * 60 * 60 * 1000
  ];

  const POS_MAP = {
    'n.': 'n. 名词',
    'v.': 'v. 动词',
    'vt.': 'vt. 及物动词',
    'vi.': 'vi. 不及物动词',
    'adj.': 'adj. 形容词',
    'adv.': 'adv. 副词',
    'prep.': 'prep. 介词',
    'conj.': 'conj. 连词',
    'pron.': 'pron. 代词',
    'abbr.': 'abbr. 缩写',
    'n./v.': 'n./v. 名动兼类'
  };

  let appState = {
    rawVocabData: [],
    progress: {},
    currentList: [],
    currentIndex: 0,
    isFlipped: false,
    studyMode: 'en-zh', // 'en-zh' | 'zh-en' | 'cloze'
    autoAudio: false,
    filterDrawerOpen: false,
    historyStack: [], // for Undo support
    filters: {
      source: 'all',
      year: 'all',
      text: 'all',
      state: 'all',
      sort: 'default',
      search: ''
    },
    isInitialized: false
  };

  let els = {};
  let toastTimer = null;

  window.VocabModule = {
    init(containerId) {
      const container = document.getElementById(containerId || 'vocabSection');
      if (!container) return;

      if (!appState.isInitialized) {
        this.loadSettings();
        this.renderHtmlStructure(container);
        this.cacheDomElements();
        this.loadRawData();
        this.loadProgress();
        this.populateDropdowns();
        this.bindEvents();
        appState.isInitialized = true;
      }

      this.syncWithAppState();
      this.applyFiltersAndRender();
    },

    loadSettings() {
      try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (saved) {
          const cfg = JSON.parse(saved);
          if (cfg.studyMode) appState.studyMode = cfg.studyMode;
          if (typeof cfg.autoAudio === 'boolean') appState.autoAudio = cfg.autoAudio;
        }
      } catch (e) {}
    },

    saveSettings() {
      try {
        const cfg = {
          studyMode: appState.studyMode,
          autoAudio: appState.autoAudio
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(cfg));
      } catch (e) {}
    },

    syncWithAppState() {
      if (window.AppState) {
        const y = String(window.AppState.year);
        const t = `Text ${window.AppState.textId}`;
        if (els.yearSelect && Array.from(els.yearSelect.options).some(o => o.value === y)) {
          els.yearSelect.value = y;
          appState.filters.year = y;
          this.updateTextDropdown();
          if (els.textSelect && Array.from(els.textSelect.options).some(o => o.value === t)) {
            els.textSelect.value = t;
            appState.filters.text = t;
          }
        }
      }
    },

    loadRawData() {
      const bank = window.KAOYAN_VOCAB_BANK || [];
      appState.rawVocabData = [];
      bank.forEach(([year, text, words]) => {
        words.forEach(([word, meaning]) => {
          appState.rawVocabData.push({
            year: String(year),
            text: String(text),
            word: String(word),
            meaning: String(meaning)
          });
        });
      });
    },

    loadProgress() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try { appState.progress = JSON.parse(saved); } catch (e) { appState.progress = {}; }
      } else {
        appState.progress = {};
      }
    },

    saveProgress() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.progress));
      } catch (e) {}
      this.updateStats();
    },

    renderHtmlStructure(container) {
      container.innerHTML = `
        <!-- Compact Top Navigation & Control Bar -->
        <div class="vocab-top-bar">
          <div class="vocab-search-wrap">
            <span class="vocab-search-icon">🔍</span>
            <input type="text" id="vocabSearchInput" class="vocab-search-input" placeholder="搜索考研重点词汇或释义...">
          </div>

          <!-- Study Mode Switcher -->
          <div class="vocab-mode-group" id="vocabModeGroup">
            <button class="vocab-mode-pill ${appState.studyMode === 'en-zh' ? 'active' : ''}" data-mode="en-zh" title="识别模式：看英文回忆中文释义">🔤 英➔中</button>
            <button class="vocab-mode-pill ${appState.studyMode === 'zh-en' ? 'active' : ''}" data-mode="zh-en" title="拼写模式：看中文回忆英文单词">🀄 中➔英</button>
            <button class="vocab-mode-pill ${appState.studyMode === 'cloze' ? 'active' : ''}" data-mode="cloze" title="完形模式：考研真题原句挖空推导">📝 语境挖空</button>
          </div>

          <!-- Actions: Auto Audio & Filter Drawer Toggle -->
          <div class="vocab-top-actions">
            <button class="vocab-action-pill-btn ${appState.autoAudio ? 'active' : ''}" id="vocabToggleAudioBtn" title="切换翻卡/切词时是否自动朗读">
              <span>🔊</span> 自动发音
            </button>
            <button class="vocab-action-pill-btn" id="vocabToggleDrawerBtn" title="展开/收起年份、篇章与策略筛选面板">
              <span>⚙️</span> 筛选器
            </button>
          </div>
        </div>

        <!-- Collapsible Filter Drawer -->
        <div class="vocab-filter-drawer" id="vocabFilterDrawer">
          <div class="vocab-filter-grid">
            <div class="vocab-filter-item">
              <label class="vocab-filter-label">词库来源</label>
              <select id="vocabSourceSelect" class="vocab-select" style="font-weight:700;color:var(--accent)">
                <option value="all">📚 全真题词库 (3,199词)</option>
                <option value="bookmarked">⭐ 我的生词本 (已收藏词汇)</option>
              </select>
            </div>
            <div class="vocab-filter-item">
              <label class="vocab-filter-label">定位年份</label>
              <select id="vocabYearSelect" class="vocab-select">
                <option value="all">全量年份 (2010-2026)</option>
              </select>
            </div>
            <div class="vocab-filter-item">
              <label class="vocab-filter-label">定位篇章</label>
              <select id="vocabTextSelect" class="vocab-select">
                <option value="all">全量篇章</option>
              </select>
            </div>
            <div class="vocab-filter-item">
              <label class="vocab-filter-label">复习状态</label>
              <select id="vocabStateSelect" class="vocab-select">
                <option value="all">全量词库</option>
                <option value="due">🔥 今日急需复习</option>
                <option value="new">🌱 尚未学习</option>
                <option value="mastered">🏆 永久掌握</option>
              </select>
            </div>
            <div class="vocab-filter-item">
              <label class="vocab-filter-label">背诵策略</label>
              <select id="vocabSortSelect" class="vocab-select">
                <option value="default">真题顺序</option>
                <option value="urgency">🚨 遗忘紧迫优先</option>
                <option value="random">🔀 随机打乱</option>
              </select>
            </div>
          </div>

          <div class="vocab-drawer-footer">
            <div>当前范围检索到 <strong id="vocabCurrentListCount" style="color:var(--accent);font-size:1.15em">0</strong> 个词汇</div>
            <button id="vocabBtnResetFilter" class="vocab-sub-btn" style="color:#e11d48">🔄 重置本篇进度</button>
          </div>
        </div>

        <!-- Stats Ribbon (High Density) -->
        <div class="vocab-stats-ribbon" id="vocabStatsRibbon">
          <div class="vocab-stat-chip stat-chip-total" data-filter="all" title="查看当前范围全部词汇">
            <span>📚 范围词汇</span>
            <span class="vocab-stat-num" id="vocabStatTotal">0</span>
          </div>
          <div class="vocab-stat-chip stat-chip-due" data-filter="due" title="点击仅复习今日到期词汇">
            <span>🔥 今日待办</span>
            <span class="vocab-stat-num" id="vocabStatDue">0</span>
          </div>
          <div class="vocab-stat-chip stat-chip-new" data-filter="new" title="点击查看尚未学习新词">
            <span>🌱 尚未学习</span>
            <span class="vocab-stat-num" id="vocabStatNew">0</span>
          </div>
          <div class="vocab-stat-chip stat-chip-learning" data-filter="all" title="处于艾宾浩斯记忆周期中">
            <span>📖 记忆中</span>
            <span class="vocab-stat-num" id="vocabStatLearning">0</span>
          </div>
          <div class="vocab-stat-chip stat-chip-mastered" data-filter="mastered" title="点击查看已永久掌握词汇">
            <span>🏆 永久掌握</span>
            <span class="vocab-stat-num" id="vocabStatMastered">0</span>
          </div>
        </div>

        <!-- Session Progress Bar -->
        <div class="vocab-progress-container" id="vocabProgressContainer">
          <div class="vocab-progress-header">
            <span>本次学习进度：<strong id="vocabSessionProgressText" style="color:var(--ink)">0 / 0</strong></span>
            <span id="vocabSessionPercent">0%</span>
          </div>
          <div class="vocab-progress-track">
            <div class="vocab-progress-bar" id="vocabProgressBar"></div>
          </div>
        </div>

        <!-- 3D Flip Card Scene -->
        <div class="vocab-card-scene" id="vocabCardScene">
          <div class="vocab-card-flipper" id="vocabCardFlipper">
            
            <!-- FRONT FACE -->
            <div class="vocab-face vocab-face-front" id="vocabFaceFront" title="点击翻转卡片 (快捷键: 空格)">
              <div class="vocab-card-topbar">
                <button class="vocab-audio-btn" id="vocabBtnAudioFront" title="播放朗读 (快捷键 A)">🔊</button>
                <div class="vocab-meta-chips">
                  <span class="vocab-chip-provenance" id="vocabProvenanceFront">2020 · Text 1</span>
                  <span class="vocab-chip-status" id="vocabBadgeFront">🌱 未学习</span>
                </div>
                <button class="vocab-star-btn" id="vocabBtnStarFront" aria-label="收藏单词" aria-pressed="false" title="收藏至生词本 (快捷键 S)">☆</button>
              </div>

              <div class="vocab-card-front-content">
                <div class="vocab-pos-badge" id="vocabPosBadgeFront">n. 名词</div>
                <h2 class="vocab-word-large" id="vocabWordFront">Loading...</h2>
                <div class="vocab-cloze-box" id="vocabClozeBoxFront" style="display:none"></div>
                <div class="vocab-flip-hint">
                  <span>👆 点击卡片翻转 或 按 <span class="vocab-keycap">Space</span> 查看真题语境与详释 ↷</span>
                </div>
              </div>

              <div class="vocab-assessment-area" style="cursor:default" onclick="event.stopPropagation()">
                <div class="vocab-grade-grid">
                  <button class="vocab-grade-btn grade-btn-forgot" id="vocabBtnForgotFront" title="快捷键: 1 / ←">
                    <span class="grade-title">忘光了 (←)</span>
                    <span class="grade-subtitle" id="vocabTimeForgotFront">+5分钟</span>
                  </button>
                  <button class="vocab-grade-btn grade-btn-hard" id="vocabBtnHardFront" title="快捷键: 2 / ↓">
                    <span class="grade-title">模糊 (↓)</span>
                    <span class="grade-subtitle" id="vocabTimeHardFront">+30分钟</span>
                  </button>
                  <button class="vocab-grade-btn grade-btn-good" id="vocabBtnGoodFront" title="快捷键: 3 / → / 空格">
                    <span class="grade-title">熟练 (→)</span>
                    <span class="grade-subtitle" id="vocabTimeGoodFront">+12小时</span>
                  </button>
                </div>
                <div class="vocab-sub-actions">
                  <button class="vocab-sub-btn" id="vocabBtnNextFront" title="跳过当前单词，不改变熟练度">下一个（不评分） ▶</button>
                </div>
              </div>
            </div>

            <!-- BACK FACE -->
            <div class="vocab-face vocab-face-back" id="vocabFaceBack">
              <div class="vocab-card-topbar">
                <button class="vocab-audio-btn" id="vocabBtnAudioBack" title="播放朗读 (快捷键 A)">🔊</button>
                <div class="vocab-meta-chips">
                  <span class="vocab-chip-provenance" id="vocabProvenanceBack">2020 · Text 1</span>
                  <span class="vocab-chip-status" id="vocabBadgeBack">🌱 未学习</span>
                </div>
                <button class="vocab-star-btn" id="vocabBtnStarBack" aria-label="收藏单词" aria-pressed="false" title="收藏至生词本 (快捷键 S)">☆</button>
              </div>

              <div class="vocab-card-back-content">
                <div class="vocab-back-word-title">
                  <span class="vocab-back-word" id="vocabWordBack">Word</span>
                  <span class="vocab-pos-badge" id="vocabPosBadgeBack">n. 名词</span>
                </div>

                <div class="vocab-definition-text" id="vocabDefBack"></div>

                <!-- Authentic Exam Context Sentence Box -->
                <div class="vocab-sentence-box" id="vocabSentenceBox">
                  <div class="vocab-sentence-header">
                    <span>📖 真题语境原句与考场释义</span>
                  </div>
                  <div class="vocab-sentence-en" id="vocabSentenceEn"></div>
                  <div class="vocab-sentence-zh" id="vocabSentenceZh"></div>
                </div>
              </div>

              <div class="vocab-assessment-area">
                <div class="vocab-grade-grid">
                  <button class="vocab-grade-btn grade-btn-forgot" id="vocabBtnForgotBack" title="快捷键: 1 / ←">
                    <span class="grade-title">忘光了 (←)</span>
                    <span class="grade-subtitle" id="vocabTimeForgotBack">+5分钟</span>
                  </button>
                  <button class="vocab-grade-btn grade-btn-hard" id="vocabBtnHardBack" title="快捷键: 2 / ↓">
                    <span class="grade-title">模糊印象 (↓)</span>
                    <span class="grade-subtitle" id="vocabTimeHardBack">+30分钟</span>
                  </button>
                  <button class="vocab-grade-btn grade-btn-good" id="vocabBtnGoodBack" title="快捷键: 3 / → / 空格">
                    <span class="grade-title">熟练掌握 (→)</span>
                    <span class="grade-subtitle" id="vocabTimeGoodBack">+12小时</span>
                  </button>
                </div>

                <div class="vocab-sub-actions">
                  <button class="vocab-sub-btn" id="vocabBtnUndo" title="撤销上次评分 (快捷键: Z)">↩ 撤销 (Z)</button>
                  <button class="vocab-sub-btn" id="vocabBtnFlipBack" title="翻回正面 (快捷键: 空格)">↻ 翻回正面</button>
                  <button class="vocab-sub-btn" id="vocabBtnNext" style="color:var(--accent);font-weight:800" title="继续下一个 (快捷键: →)">继续下一个 ▶</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Keyboard HUD -->
        <div class="vocab-kbd-hud">
          <span><span class="vocab-keycap">Space</span> 翻转</span>
          <span><span class="vocab-keycap">1 / ←</span> 忘光</span>
          <span><span class="vocab-keycap">2 / ↓</span> 模糊</span>
          <span><span class="vocab-keycap">3 / →</span> 熟练</span>
          <span><span class="vocab-keycap">A</span> 发音</span>
          <span><span class="vocab-keycap">S</span> 收藏</span>
          <span><span class="vocab-keycap">Z</span> 撤销</span>
          <span><span class="vocab-keycap">M</span> 换模式</span>
        </div>

        <!-- Empty State -->
        <div class="vocab-empty-state" id="vocabEmptyState">
          <div class="vocab-empty-icon">🎉</div>
          <div class="vocab-empty-title" id="vocabEmptyTitle">太棒了！当前范围词汇已全部复习完成！</div>
          <div class="vocab-empty-desc" id="vocabEmptyDesc">您可以选择其他年份篇章继续背诵，或重置筛选条件进入全量词库。</div>
          <button class="vocab-action-pill-btn active" id="vocabBtnEmptyReset" style="padding:8px 20px;font-size:0.92em">查看全量真题词库</button>
        </div>

        <!-- Toast Feedback -->
        <div class="vocab-toast" id="vocabToast"></div>
      `;
    },

    cacheDomElements() {
      els = {
        topBar: document.querySelector('.vocab-top-bar'),
        searchInput: document.getElementById('vocabSearchInput'),
        modeGroup: document.getElementById('vocabModeGroup'),
        modePills: document.querySelectorAll('.vocab-mode-pill'),
        btnToggleAudio: document.getElementById('vocabToggleAudioBtn'),
        btnToggleDrawer: document.getElementById('vocabToggleDrawerBtn'),

        filterDrawer: document.getElementById('vocabFilterDrawer'),
        sourceSelect: document.getElementById('vocabSourceSelect'),
        yearSelect: document.getElementById('vocabYearSelect'),
        textSelect: document.getElementById('vocabTextSelect'),
        stateSelect: document.getElementById('vocabStateSelect'),
        sortSelect: document.getElementById('vocabSortSelect'),
        currentListCount: document.getElementById('vocabCurrentListCount'),
        btnResetFilter: document.getElementById('vocabBtnResetFilter'),

        statsRibbon: document.getElementById('vocabStatsRibbon'),
        statChips: document.querySelectorAll('.vocab-stat-chip'),
        statTotal: document.getElementById('vocabStatTotal'),
        statDue: document.getElementById('vocabStatDue'),
        statNew: document.getElementById('vocabStatNew'),
        statLearning: document.getElementById('vocabStatLearning'),
        statMastered: document.getElementById('vocabStatMastered'),

        progressContainer: document.getElementById('vocabProgressContainer'),
        sessionProgressText: document.getElementById('vocabSessionProgressText'),
        sessionPercent: document.getElementById('vocabSessionPercent'),
        progressBar: document.getElementById('vocabProgressBar'),

        cardScene: document.getElementById('vocabCardScene'),
        cardFlipper: document.getElementById('vocabCardFlipper'),
        faceFront: document.getElementById('vocabFaceFront'),
        faceBack: document.getElementById('vocabFaceBack'),

        btnAudioFront: document.getElementById('vocabBtnAudioFront'),
        btnAudioBack: document.getElementById('vocabBtnAudioBack'),
        provenanceFront: document.getElementById('vocabProvenanceFront'),
        provenanceBack: document.getElementById('vocabProvenanceBack'),
        badgeFront: document.getElementById('vocabBadgeFront'),
        badgeBack: document.getElementById('vocabBadgeBack'),
        btnStarFront: document.getElementById('vocabBtnStarFront'),
        btnStarBack: document.getElementById('vocabBtnStarBack'),

        posBadgeFront: document.getElementById('vocabPosBadgeFront'),
        wordFront: document.getElementById('vocabWordFront'),
        clozeBoxFront: document.getElementById('vocabClozeBoxFront'),

        wordBack: document.getElementById('vocabWordBack'),
        posBadgeBack: document.getElementById('vocabPosBadgeBack'),
        defBack: document.getElementById('vocabDefBack'),
        sentenceBox: document.getElementById('vocabSentenceBox'),
        sentenceEn: document.getElementById('vocabSentenceEn'),
        sentenceZh: document.getElementById('vocabSentenceZh'),

        btnForgotFront: document.getElementById('vocabBtnForgotFront'),
        btnHardFront: document.getElementById('vocabBtnHardFront'),
        btnGoodFront: document.getElementById('vocabBtnGoodFront'),
        timeForgotFront: document.getElementById('vocabTimeForgotFront'),
        timeHardFront: document.getElementById('vocabTimeHardFront'),
        timeGoodFront: document.getElementById('vocabTimeGoodFront'),

        btnForgotBack: document.getElementById('vocabBtnForgotBack'),
        btnHardBack: document.getElementById('vocabBtnHardBack'),
        btnGoodBack: document.getElementById('vocabBtnGoodBack'),
        timeForgotBack: document.getElementById('vocabTimeForgotBack'),
        timeHardBack: document.getElementById('vocabTimeHardBack'),
        timeGoodBack: document.getElementById('vocabTimeGoodBack'),

        btnUndo: document.getElementById('vocabBtnUndo'),
        btnFlipBack: document.getElementById('vocabBtnFlipBack'),
        btnNext: document.getElementById('vocabBtnNext'),

        emptyState: document.getElementById('vocabEmptyState'),
        emptyTitle: document.getElementById('vocabEmptyTitle'),
        emptyDesc: document.getElementById('vocabEmptyDesc'),
        btnEmptyReset: document.getElementById('vocabBtnEmptyReset'),

        toast: document.getElementById('vocabToast')
      };
    },

    populateDropdowns() {
      const years = [...new Set(appState.rawVocabData.map(item => item.year))].sort();
      els.yearSelect.innerHTML = '<option value="all">全量年份 (2010-2026)</option>' +
        years.map(y => `<option value="${y}">${y} 年</option>`).join('');
      this.updateTextDropdown();
    },

    updateTextDropdown() {
      const selectedYear = els.yearSelect.value;
      let texts = [];
      if (selectedYear === 'all') {
        texts = [...new Set(appState.rawVocabData.map(item => item.text))].sort();
      } else {
        const filteredData = appState.rawVocabData.filter(item => item.year === selectedYear);
        texts = [...new Set(filteredData.map(item => item.text))].sort();
      }
      const prevText = els.textSelect.value;
      els.textSelect.innerHTML = '<option value="all">全量篇章</option>' +
        texts.map(t => `<option value="${t}">${t}</option>`).join('');
      if (texts.includes(prevText)) els.textSelect.value = prevText;
      else els.textSelect.value = 'all';
    },

    bindEvents() {
      // 1. Study Mode Switch
      els.modePills.forEach(pill => {
        pill.onclick = () => {
          const m = pill.getAttribute('data-mode');
          if (m && m !== appState.studyMode) {
            appState.studyMode = m;
            els.modePills.forEach(p => p.classList.toggle('active', p.getAttribute('data-mode') === m));
            this.saveSettings();
            this.showToast(`已切换至：${pill.textContent}`);
            this.renderCurrentCard();
          }
        };
      });

      // 2. Auto Audio Toggle
      els.btnToggleAudio.onclick = () => {
        appState.autoAudio = !appState.autoAudio;
        els.btnToggleAudio.classList.toggle('active', appState.autoAudio);
        this.saveSettings();
        this.showToast(appState.autoAudio ? '🔊 自动发音已开启' : '🔈 自动发音已关闭');
      };

      // 3. Filter Drawer Toggle
      els.btnToggleDrawer.onclick = () => {
        appState.filterDrawerOpen = !appState.filterDrawerOpen;
        els.filterDrawer.classList.toggle('is-open', appState.filterDrawerOpen);
        els.btnToggleDrawer.classList.toggle('active', appState.filterDrawerOpen);
      };

      // 4. Source / Year / Text / State / Sort Selects
      if (els.sourceSelect) {
        els.sourceSelect.onchange = () => {
          appState.filters.source = els.sourceSelect.value;
          this.applyFiltersAndRender();
        };
      }

      els.yearSelect.onchange = () => {
        appState.filters.year = els.yearSelect.value;
        this.updateTextDropdown();
        appState.filters.text = els.textSelect.value;
        this.applyFiltersAndRender();
      };

      els.textSelect.onchange = () => {
        appState.filters.text = els.textSelect.value;
        this.applyFiltersAndRender();
      };

      els.stateSelect.onchange = () => {
        appState.filters.state = els.stateSelect.value;
        this.applyFiltersAndRender();
      };

      els.sortSelect.onchange = () => {
        appState.filters.sort = els.sortSelect.value;
        this.applyFiltersAndRender();
      };

      // 5. Search with debounce
      let debounceTimer = null;
      els.searchInput.oninput = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          appState.filters.search = els.searchInput.value.trim();
          this.applyFiltersAndRender();
        }, 200);
      };

      // 6. Stats Ribbon Quick Filter
      els.statChips.forEach(chip => {
        chip.onclick = () => {
          const filterState = chip.getAttribute('data-filter');
          if (filterState) {
            els.stateSelect.value = filterState;
            appState.filters.state = filterState;
            this.applyFiltersAndRender();
            this.showToast(`已筛选：${chip.innerText.trim()}`);
          }
        };
      });

      // 7. Card 3D Flip
      els.faceFront.onclick = () => this.flipCard(true);
      els.btnFlipBack.onclick = () => this.flipCard(false);

      // 8. Audio Buttons
      [els.btnAudioFront, els.btnAudioBack].forEach(btn => {
        if (btn) {
          btn.onclick = (e) => {
            e.stopPropagation();
            this.playAudio();
          };
        }
      });

      // 9. Bookmark Star Buttons
      [els.btnStarFront, els.btnStarBack].forEach(btn => {
        if (btn) {
          btn.onclick = (e) => {
            e.stopPropagation();
            this.toggleBookmarkCurrentWord();
          };
        }
      });

      // 10. Rating Buttons (Front & Back)
      const bindGradeButtons = (btnForgot, btnHard, btnGood) => {
        btnForgot.onclick = (e) => { e.stopPropagation(); this.gradeWord('forgot'); };
        btnHard.onclick = (e) => { e.stopPropagation(); this.gradeWord('hard'); };
        btnGood.onclick = (e) => { e.stopPropagation(); this.gradeWord('good'); };
      };
      bindGradeButtons(els.btnForgotFront, els.btnHardFront, els.btnGoodFront);
      bindGradeButtons(els.btnForgotBack, els.btnHardBack, els.btnGoodBack);

      // 11. Sub-actions
      els.btnUndo.onclick = () => this.undoLastGrade();
      els.btnNext.onclick = () => this.goToNextCard();
      document.getElementById('vocabBtnNextFront').onclick = e => {
        e.stopPropagation();
        this.goToNextCard();
      };

      // 12. Reset Current Scope
      if (els.btnResetFilter) {
        els.btnResetFilter.onclick = () => {
          if (confirm('确认重置当前范围下所有单词的艾宾浩斯复习进度吗？')) {
            appState.currentList.forEach(w => {
              delete appState.progress[w.word];
            });
            this.saveProgress();
            this.applyFiltersAndRender();
            this.showToast('已重置当前范围进度 🔄');
          }
        };
      }

      // 13. Empty State Reset
      if (els.btnEmptyReset) {
        els.btnEmptyReset.onclick = () => {
          els.sourceSelect.value = 'all';
          appState.filters.source = 'all';
          els.yearSelect.value = 'all';
          appState.filters.year = 'all';
          this.updateTextDropdown();
          els.textSelect.value = 'all';
          appState.filters.text = 'all';
          els.stateSelect.value = 'all';
          appState.filters.state = 'all';
          els.searchInput.value = '';
          appState.filters.search = '';
          this.applyFiltersAndRender();
        };
      }

      // 14. Keyboard Shortcuts Flow
      window.addEventListener('keydown', (e) => {
        if (!document.body.classList.contains('mode-vocab')) return;
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        if (e.code === 'Space') {
          e.preventDefault();
          this.flipCard(!appState.isFlipped);
        } else if (e.code === 'ArrowLeft' || e.key === '1') {
          e.preventDefault();
          this.gradeWord('forgot');
        } else if (e.code === 'ArrowDown' || e.key === '2') {
          e.preventDefault();
          this.gradeWord('hard');
        } else if (e.code === 'ArrowRight' || e.key === '3') {
          e.preventDefault();
          this.gradeWord('good');
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (appState.isFlipped) this.goToNextCard();
          else this.flipCard(true);
        } else if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          this.playAudio();
        } else if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          this.toggleBookmarkCurrentWord();
        } else if (e.key === 'z' || e.key === 'Z') {
          e.preventDefault();
          this.undoLastGrade();
        } else if (e.key === 'm' || e.key === 'M') {
          e.preventDefault();
          this.cycleStudyMode();
        }
      });
    },

    cycleStudyMode() {
      const modes = ['en-zh', 'zh-en', 'cloze'];
      const nextIdx = (modes.indexOf(appState.studyMode) + 1) % modes.length;
      appState.studyMode = modes[nextIdx];
      els.modePills.forEach(p => p.classList.toggle('active', p.getAttribute('data-mode') === appState.studyMode));
      this.saveSettings();
      const currentPill = Array.from(els.modePills).find(p => p.getAttribute('data-mode') === appState.studyMode);
      this.showToast(`切换至：${currentPill ? currentPill.textContent : appState.studyMode}`);
      this.renderCurrentCard();
    },

    flipCard(toFlipped) {
      appState.isFlipped = !!toFlipped;
      if (els.cardFlipper) {
        els.cardFlipper.classList.toggle('is-flipped', appState.isFlipped);
      }
      if (appState.isFlipped && appState.autoAudio) {
        this.playAudio();
      }
    },

    applyFiltersAndRender() {
      const { source, year, text, state, sort, search } = appState.filters;
      const now = Date.now();

      let sourceList = appState.rawVocabData;
      if (source === 'bookmarked') {
        const bookmarks = (window.StorageModule && window.StorageModule.getVocabBook) ? window.StorageModule.getVocabBook() : [];
        sourceList = bookmarks.map(b => ({
          year: b.year ? String(b.year) : '收藏',
          text: b.textId ? (b.textId.startsWith('Text') ? b.textId : `Text ${b.textId}`) : '自选',
          word: String(b.word),
          meaning: String(b.def || '考研大纲核心词汇'),
          sentence: b.sentence || ''
        }));
      }

      let filtered = sourceList.filter(item => {
        const matchYear = year === 'all' || item.year === year;
        const matchText = text === 'all' || item.text === text;
        const searchLower = search.toLowerCase();
        const matchSearch = search === '' ||
          item.word.toLowerCase().includes(searchLower) ||
          item.meaning.includes(searchLower) ||
          (item.sentence && item.sentence.toLowerCase().includes(searchLower));
        return matchYear && matchText && matchSearch;
      });

      if (state !== 'all') {
        filtered = filtered.filter(item => {
          const record = appState.progress[item.word];
          if (state === 'new') return !record;
          if (state === 'mastered') return record && record.status === 'mastered';
          if (state === 'due') return record && record.status === 'learning' && record.nextReviewTime <= now;
          return true;
        });
      }

      if (sort === 'random') {
        for (let i = filtered.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
      } else if (sort === 'urgency') {
        filtered.sort((a, b) => {
          const recA = appState.progress[a.word];
          const recB = appState.progress[b.word];
          const scoreA = recA ? (recA.nextReviewTime || 9999999999999) : 999999999999;
          const scoreB = recB ? (recB.nextReviewTime || 9999999999999) : 999999999999;
          return scoreA - scoreB;
        });
      }

      appState.currentList = filtered;
      appState.currentIndex = 0;
      appState.historyStack = [];

      if (els.currentListCount) {
        els.currentListCount.textContent = filtered.length;
      }

      this.updateStats();
      this.renderCurrentCard();
    },

    /**
     * Find authentic exam sentence from KAOYAN_PURE_DATA
     */
    findExamSentence(word, year, textStr) {
      if (!window.KAOYAN_PURE_DATA) return null;
      const yData = window.KAOYAN_PURE_DATA[year];
      if (!yData || !yData.texts) return null;
      const tid = parseInt((textStr || '').replace(/\D/g, '')) || 1;
      const tObj = yData.texts.find(t => t.text_id === tid);
      if (!tObj || !tObj.sentences) return null;

      const cleanWord = word.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\\b${cleanWord}\\b`, 'i');
      let matched = tObj.sentences.find(s => re.test(s.text));

      if (!matched) {
        const wLow = word.toLowerCase().trim();
        matched = tObj.sentences.find(s => s.text.toLowerCase().includes(wLow));
      }

      if (matched) {
        return {
          text: matched.text,
          translation: matched.translation || '',
          provenance: `${year} · ${textStr}`
        };
      }
      return null;
    },

    extractPosAndMeaning(word, meaning) {
      let posText = '重点核心词';
      let cleanDef = meaning;

      // Check window.KAOYAN_VOCAB_DICT
      if (window.KAOYAN_VOCAB_DICT && window.KAOYAN_VOCAB_DICT[word]) {
        const dObj = window.KAOYAN_VOCAB_DICT[word];
        if (dObj.pos) {
          posText = POS_MAP[dObj.pos] || dObj.pos;
        }
        if (dObj.def) {
          cleanDef = dObj.def;
        }
      } else {
        // Parse from meaning string
        const match = cleanDef.match(/^([a-zA-Z\.\/]+)\s+(.+)$/);
        if (match && POS_MAP[match[1]]) {
          posText = POS_MAP[match[1]];
          cleanDef = match[2];
        }
      }

      return { posText, cleanDef };
    },

    renderCurrentCard() {
      const contextSequence = this.contextSequence = (this.contextSequence || 0) + 1;
      const total = appState.currentList.length;
      this.flipCard(false);

      if (total === 0 || appState.currentIndex >= total) {
        if (els.cardScene) els.cardScene.style.display = 'none';
        if (els.progressContainer) els.progressContainer.style.display = 'none';
        if (els.emptyState) {
          els.emptyState.style.display = 'flex';
          if (appState.filters.source === 'bookmarked') {
            els.emptyTitle.textContent = '您的生词本暂无词汇或已全部复习完成！';
            els.emptyDesc.textContent = '请在真题精读时点击生词弹出的「☆ 收藏生词」，即可随时开启专属艾宾浩斯攻坚背诵！';
          } else {
            els.emptyTitle.textContent = '🎉 太棒了！当前范围词汇已全部复习完成！';
            els.emptyDesc.textContent = '您可以选择其他年份篇章继续背诵，或点击下方重置筛选条件进入全量词库。';
          }
        }
        return;
      }

      if (els.cardScene) els.cardScene.style.display = 'block';
      if (els.progressContainer) els.progressContainer.style.display = 'block';
      if (els.emptyState) els.emptyState.style.display = 'none';

      const currentWordObj = appState.currentList[appState.currentIndex];
      const word = currentWordObj.word;
      const { posText, cleanDef } = this.extractPosAndMeaning(word, currentWordObj.meaning);

      // Session Progress
      const curNum = appState.currentIndex + 1;
      if (els.sessionProgressText) els.sessionProgressText.textContent = `${curNum} / ${total}`;
      const pct = Math.round((curNum / total) * 100);
      if (els.sessionPercent) els.sessionPercent.textContent = `${pct}%`;
      if (els.progressBar) els.progressBar.style.width = `${pct}%`;

      // Provenance
      const provText = `${currentWordObj.year} · ${currentWordObj.text}`;
      if (els.provenanceFront) els.provenanceFront.textContent = provText;
      if (els.provenanceBack) els.provenanceBack.textContent = provText;

      // Status Badge
      const record = appState.progress[word];
      this.renderBadge(record);
      this.updateButtonsTime(record);

      // Star Bookmark State
      const isStarred = window.StorageModule && window.StorageModule.isBookmarked && window.StorageModule.isBookmarked(word);
      [els.btnStarFront, els.btnStarBack].forEach(btn => {
        if (btn) {
          btn.classList.toggle('is-starred', !!isStarred);
          btn.textContent = isStarred ? '★' : '☆';
          btn.setAttribute('aria-pressed', String(!!isStarred));
          btn.setAttribute('aria-label', isStarred ? '取消收藏单词' : '收藏单词');
          btn.title = isStarred ? '已收藏在生词本 (点击取消)' : '收藏到生词本 (快捷键 S)';
        }
      });

      // Find Authentic Context Sentence
      let contextSentence = currentWordObj.sentence ? {
        text: currentWordObj.sentence,
        translation: '',
        provenance: provText
      } : this.findExamSentence(word, currentWordObj.year, currentWordObj.text);

      // Render Front by Mode
      els.posBadgeFront.textContent = posText;
      els.posBadgeBack.textContent = posText;

      if (appState.studyMode === 'zh-en') {
        // 中 ➔ 英 模式
        els.wordFront.textContent = cleanDef;
        els.wordFront.style.fontSize = '1.8em';
        els.clozeBoxFront.style.display = 'block';
        els.clozeBoxFront.innerHTML = `💡 回忆英文拼写：<span class="vocab-cloze-blank">${word.slice(0, 1)}... (${word.length} 字母)</span>`;
      } else if (appState.studyMode === 'cloze') {
        // 语境挖空 模式
        els.wordFront.textContent = `[ ______ ] (${posText})`;
        els.wordFront.style.fontSize = '2em';
        els.clozeBoxFront.style.display = 'block';
        if (contextSentence) {
          const cleanW = word.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const clozeHtml = contextSentence.text.replace(new RegExp(`\\b${cleanW}\\b`, 'gi'), `<span class="vocab-cloze-blank">[ ______ ]</span>`);
          els.clozeBoxFront.innerHTML = `<strong>真题语境空缺：</strong><br>${clozeHtml}`;
        } else {
          els.clozeBoxFront.innerHTML = `💡 释义线索：<strong>${cleanDef}</strong>`;
        }
      } else {
        // 标准 英 ➔ 中 模式
        els.wordFront.textContent = word;
        els.wordFront.style.fontSize = '2.8em';
        els.clozeBoxFront.style.display = 'none';
      }

      // Render Back
      els.wordBack.textContent = word;
      els.defBack.innerHTML = `<span style="color:var(--accent);font-weight:800;margin-right:6px">[${posText}]</span> ${cleanDef}`;

      // Update only context after an async load: do not flip the card or restart audio.
      const updateContext = sentence => {
        if (contextSequence !== this.contextSequence) return;
        const cleanW = word.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (appState.studyMode === 'cloze') {
          els.clozeBoxFront.innerHTML = sentence
            ? `<strong>真题语境空缺：</strong><br>${sentence.text.replace(new RegExp(`\\b${cleanW}\\b`, 'gi'), '<span class="vocab-cloze-blank">[ ______ ]</span>')}`
            : `💡 释义线索：<strong>${cleanDef}</strong>`;
        }
        els.sentenceBox.style.display = sentence?.text ? 'block' : 'none';
        if (sentence?.text) {
          els.sentenceEn.innerHTML = sentence.text.replace(new RegExp(`(${cleanW})`, 'gi'), '<mark class="vocab-kw">$1</mark>');
          els.sentenceZh.textContent = sentence.translation || '（点击精读模式查看长难句精准分层剖析）';
        }
      };
      updateContext(contextSentence);
      const contextYear = Number(currentWordObj.year);
      if (!contextSentence && window.DataLoader && !window.DataLoader.peek(contextYear) &&
          (window.KAOYAN_MANIFEST || []).some(item => item.year === contextYear)) {
        const loadContext = () => {
          if (contextSequence !== this.contextSequence) return;
          els.sentenceBox.style.display = 'block';
          els.sentenceEn.textContent = '正在加载原文例句…';
          els.sentenceZh.textContent = '';
          window.DataLoader.loadYear(contextYear).then(() => {
            updateContext(this.findExamSentence(word, contextYear, currentWordObj.text));
          }).catch(() => {
            if (contextSequence !== this.contextSequence) return;
            els.sentenceEn.textContent = '原文例句加载失败，词义仍可正常查看。';
            const retry = document.createElement('button');
            retry.className = 'btn';
            retry.textContent = '重试例句';
            retry.onclick = e => { e.stopPropagation(); loadContext(); };
            els.sentenceZh.replaceChildren(retry);
          });
        };
        loadContext();
      }

      // Auto Audio Trigger
      if (appState.autoAudio && appState.studyMode !== 'zh-en') {
        setTimeout(() => this.playAudio(), 100);
      }
    },

    renderBadge(record) {
      const update = (badgeEl) => {
        if (!badgeEl) return;
        if (!record) {
          badgeEl.className = 'vocab-chip-status badge-new';
          badgeEl.textContent = '🌱 未学习';
          return;
        }
        if (record.status === 'mastered') {
          badgeEl.className = 'vocab-chip-status badge-mastered';
          badgeEl.textContent = '🏆 永久掌握';
          return;
        }
        const now = Date.now();
        if (record.nextReviewTime <= now) {
          badgeEl.className = 'vocab-chip-status badge-due';
          badgeEl.textContent = `🔥 待复习 (第${record.level + 1}轮)`;
        } else {
          badgeEl.className = 'vocab-chip-status badge-learning';
          badgeEl.textContent = `📚 记忆中 (第${record.level + 1}轮)`;
        }
      };
      update(els.badgeFront);
      update(els.badgeBack);
    },

    updateButtonsTime(record) {
      const level = record ? (record.level || 0) : 0;
      const tForgot = '+5分钟';
      const tHardMs = EBB_INTERVALS[Math.max(0, level)] || (30 * 60 * 1000);
      const tHard = `+${this.formatTimeInterval(tHardMs)}`;
      const tGoodMs = EBB_INTERVALS[Math.min(EBB_INTERVALS.length - 1, level + 1)];
      const tGood = `+${this.formatTimeInterval(tGoodMs)}`;

      [els.timeForgotFront, els.timeForgotBack].forEach(el => { if (el) el.textContent = tForgot; });
      [els.timeHardFront, els.timeHardBack].forEach(el => { if (el) el.textContent = tHard; });
      [els.timeGoodFront, els.timeGoodBack].forEach(el => { if (el) el.textContent = tGood; });
    },

    formatTimeInterval(ms) {
      const minutes = Math.round(ms / 60000);
      if (minutes < 60) return `${minutes}分钟`;
      const hours = Math.round(minutes / 60);
      if (hours < 24) return `${hours}小时`;
      const days = Math.round(hours / 24);
      return `${days}天`;
    },

    gradeWord(grade) {
      if (appState.currentIndex >= appState.currentList.length) return;
      const currentWordObj = appState.currentList[appState.currentIndex];
      const word = currentWordObj.word;
      const now = Date.now();

      let previousRecord = appState.progress[word] ? JSON.parse(JSON.stringify(appState.progress[word])) : null;
      appState.historyStack.push({
        word,
        previousRecord,
        index: appState.currentIndex
      });

      let record = previousRecord || {
        status: 'learning',
        level: 0,
        firstStudied: now,
        lastReviewed: now,
        nextReviewTime: now,
        reviewCount: 0
      };

      record.reviewCount = (record.reviewCount || 0) + 1;
      record.lastReviewed = now;

      if (grade === 'forgot') {
        record.level = 0;
        record.nextReviewTime = now + EBB_INTERVALS[0];
        record.status = 'learning';
      } else if (grade === 'hard') {
        record.level = Math.max(0, record.level - 1);
        record.nextReviewTime = now + EBB_INTERVALS[record.level];
        record.status = 'learning';
      } else if (grade === 'good') {
        record.level = record.level + 1;
        if (record.level >= EBB_INTERVALS.length) {
          record.status = 'mastered';
          record.nextReviewTime = now + (365 * 24 * 60 * 60 * 1000);
        } else {
          record.nextReviewTime = now + EBB_INTERVALS[record.level];
          record.status = 'learning';
        }
      }

      appState.progress[word] = record;
      this.saveProgress();

      // If on front face, flip to reveal details; if already flipped, proceed to next
      if (!appState.isFlipped) {
        this.flipCard(true);
      } else {
        this.goToNextCard();
      }
    },

    undoLastGrade() {
      if (appState.historyStack.length === 0) {
        this.showToast('⚠️ 当前无操作可撤销');
        return;
      }
      const last = appState.historyStack.pop();
      if (last.previousRecord) {
        appState.progress[last.word] = last.previousRecord;
      } else {
        delete appState.progress[last.word];
      }
      appState.currentIndex = last.index;
      this.saveProgress();
      this.renderCurrentCard();
      this.showToast('↩ 已撤销上一次评分');
    },

    goToNextCard() {
      appState.currentIndex++;
      this.renderCurrentCard();
    },

    toggleBookmarkCurrentWord() {
      if (appState.currentIndex >= appState.currentList.length) return;
      const cur = appState.currentList[appState.currentIndex];
      if (!window.StorageModule || !window.StorageModule.toggleBookmark) return;

      const sentence = cur.sentence || '';
      const res = window.StorageModule.toggleBookmark(cur.word, cur.meaning, sentence, cur.year, cur.text);
      const isStarred = res.added;

      [els.btnStarFront, els.btnStarBack].forEach(btn => {
        if (btn) {
          btn.classList.toggle('is-starred', isStarred);
          btn.textContent = isStarred ? '★' : '☆';
          btn.setAttribute('aria-pressed', String(!!isStarred));
          btn.setAttribute('aria-label', isStarred ? '取消收藏单词' : '收藏单词');
        }
      });

      this.showToast(isStarred ? `⭐ 已收藏「${cur.word}」至生词本` : `已从生词本移除「${cur.word}」`);
    },

    playAudio() {
      if (appState.currentIndex >= appState.currentList.length) return;
      const word = appState.currentList[appState.currentIndex].word;
      if (!('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'en-US';
      utter.rate = 0.92;

      [els.btnAudioFront, els.btnAudioBack].forEach(b => { if (b) b.classList.add('playing'); });
      utter.onend = () => {
        [els.btnAudioFront, els.btnAudioBack].forEach(b => { if (b) b.classList.remove('playing'); });
      };
      utter.onerror = () => {
        [els.btnAudioFront, els.btnAudioBack].forEach(b => { if (b) b.classList.remove('playing'); });
      };

      window.speechSynthesis.speak(utter);
    },

    updateStats() {
      const now = Date.now();
      const total = appState.rawVocabData.length;
      let mastered = 0;
      let due = 0;
      let learning = 0;

      for (let word in appState.progress) {
        const rec = appState.progress[word];
        if (rec.status === 'mastered') mastered++;
        else if (rec.status === 'learning') {
          learning++;
          if (rec.nextReviewTime <= now) due++;
        }
      }

      const freshNew = Math.max(0, total - (mastered + learning));

      if (els.statTotal) els.statTotal.textContent = appState.currentList.length;
      if (els.statDue) els.statDue.textContent = due;
      if (els.statNew) els.statNew.textContent = freshNew;
      if (els.statLearning) els.statLearning.textContent = learning;
      if (els.statMastered) els.statMastered.textContent = mastered;
    },

    showToast(msg) {
      if (!els.toast) return;
      els.toast.textContent = msg;
      els.toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        if (els.toast) els.toast.classList.remove('show');
      }, 2000);
    },

    switchToBookmarked() {
      if (els.sourceSelect) {
        els.sourceSelect.value = 'bookmarked';
        appState.filters.source = 'bookmarked';
        this.applyFiltersAndRender();
      }
    }
  };
})();
