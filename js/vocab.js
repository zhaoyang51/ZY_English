/**
 * Vocab Module: MoMo-Style Aesthetic Ebbinghaus Vocabulary Flashcards Engine
 * Implements the design matching user reference screenshots:
 * - Unrevealed State: Serif word, UK/US phonetic pill, covered frosted placeholder bars,
 *   guidance prompt, and 3 rating buttons: [认识 (green)], [模糊 (amber)], [忘记了 (red)]
 * - Revealed State: Syllabified word (nas·ty) + green check badge, phonetic pill,
 *   dotted-underlined Chinese definitions, Example Sentence Card, Collocations & Relations Card,
 *   and 2 action buttons: [继续 (green)], [记错了 (red)]
 * - Top Bar: Back (<), Progress count (9/10), Undo (↩), Star (☆), Mastered (熟), Spelling (abc), Settings (···)
 * - Frosted Settings Sheet: Dictionary Switcher, Year/Text Filter, Review Status, Sort Strategy, Search & Stats
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
    'n.': 'n.',
    'v.': 'v.',
    'vt.': 'vt.',
    'vi.': 'vi.',
    'adj.': 'adj.',
    'adv.': 'adv.',
    'prep.': 'prep.',
    'conj.': 'conj.',
    'pron.': 'pron.',
    'abbr.': 'abbr.',
    'n./v.': 'n./v.'
  };

  /**
   * English Syllable Division Helper (e.g. nasty -> nas·ty, market -> mar·ket)
   */
  function formatWordWithSyllables(word) {
    if (!word || word.length <= 3) return word;
    if (word.includes(' ') || word.includes('-') || word.includes('·')) return word;

    // 1. Common prefixes
    let prefix = '';
    let rest = word;
    const prefixes = ['inter', 'trans', 'super', 'anti', 'over', 'under', 'auto', 'semi', 'non', 'pre', 'dis', 'mis', 'sub', 'con', 'com', 'pro', 'per', 're', 'de', 'un', 'in', 'ex'];
    for (const p of prefixes) {
      if (rest.toLowerCase().startsWith(p) && rest.length > p.length + 2) {
        prefix = p + '·';
        rest = rest.slice(p.length);
        break;
      }
    }

    // 2. Common suffixes
    let suffix = '';
    const suffixes = ['tion', 'sion', 'ment', 'ness', 'able', 'ible', 'ful', 'less', 'ity', 'ive', 'ous', 'ing', 'ist', 'ism', 'ize', 'ise', 'ly'];
    for (const s of suffixes) {
      if (rest.toLowerCase().endsWith(s) && rest.length > s.length + 2) {
        suffix = '·' + s;
        rest = rest.slice(0, rest.length - s.length);
        break;
      }
    }

    // 3. Divide between double consonants or clusters
    let middle = rest.replace(/([aeiouy]+)([^aeiouy]{2,})([aeiouy]+)/gi, (m, v, c, v2) => {
      const splitIndex = Math.floor(c.length / 2);
      return v + c.slice(0, splitIndex) + '·' + c.slice(splitIndex) + v2;
    });

    // 4. Single consonant between vowels
    middle = middle.replace(/([aeiouy]+)([^aeiouy·])([aeiouy]+)/gi, '$1·$2$3');

    return (prefix + middle + suffix).replace(/·+/g, '·').replace(/^·|·$/g, '');
  }

  let appState = {
    rawVocabData: [],
    progress: {},
    currentList: [],
    currentIndex: 0,
    isFlipped: false,
    studyMode: 'en-zh',
    autoAudio: false,
    spellingMode: false,
    filterDrawerOpen: false,
    activeRelationTab: 'phrases', // 'phrases' | 'synonyms' | 'mindchain' | 'lookalikes'
    historyStack: [],
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
          if (typeof cfg.autoAudio === 'boolean') appState.autoAudio = cfg.autoAudio;
          if (typeof cfg.spellingMode === 'boolean') appState.spellingMode = cfg.spellingMode;
        }
      } catch (e) {}
    },

    saveSettings() {
      try {
        const cfg = {
          autoAudio: appState.autoAudio,
          spellingMode: appState.spellingMode
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(cfg));
      } catch (e) {}
    },

    syncWithAppState() {
      if (appState.filters.source !== 'all') return;
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
        <div class="vocab-momo-frame" id="vocabMomoFrame">
          
          <!-- MoMo Top Bar -->
          <header class="vocab-momo-topbar">
            <div class="momo-topbar-left">
              <button class="momo-icon-btn momo-back-btn" id="vocabMomoBtnBack" title="返回做题模式">‹</button>
              <span class="momo-progress-text" id="vocabMomoProgress">1/1</span>
            </div>

            <div class="momo-topbar-right">
              <button class="momo-icon-btn" id="vocabMomoBtnUndo" title="撤回评分 (快捷键 Z)">↩</button>
              <button class="momo-icon-btn momo-star-btn" id="vocabMomoBtnStar" title="收藏至生词本 (快捷键 S)">☆</button>
              <button class="momo-icon-btn momo-mastered-btn" id="vocabMomoBtnMastered" title="标为熟词（不再安排背诵）">熟</button>
              <button class="momo-icon-btn momo-spelling-btn" id="vocabMomoBtnSpelling" title="切换拼写测试模式"><span class="momo-abc-text">abc</span></button>
              <button class="momo-icon-btn momo-more-btn" id="vocabMomoBtnMore" title="切换词库与背诵设置">···</button>
            </div>
          </header>

          <!-- Central Interactive Stage Area -->
          <main class="vocab-momo-stage" id="vocabMomoStage">
            
            <!-- Word Header Block -->
            <div class="momo-header-block">
              <div class="momo-word-title-row">
                <h1 class="momo-word" id="vocabMomoWord">Loading...</h1>
                <span class="momo-checkmark" id="vocabMomoCheckmark" style="display:none">✓</span>
              </div>

              <!-- Spelling Mode Input Line -->
              <div class="momo-spelling-line" id="vocabMomoSpellingBox" style="display:none">
                <input type="text" class="momo-spelling-input" id="vocabMomoSpellingInput" placeholder="输入单词拼写并回车..." autocomplete="off" spellcheck="false">
              </div>

              <!-- Phonetic Badge (UK / US) -->
              <div class="momo-phonetic-pill" id="vocabMomoPhoneticPill" title="点击播放真实发音 (快捷键 A)">
                <span id="vocabMomoPhoneticText">英 🔊 /'nɑ:sti/</span>
              </div>

              <!-- Unrevealed Skeletons (Covered Definition Placeholder Bars) -->
              <div class="momo-skeleton-wrap" id="vocabMomoSkeletons" title="点击查看释义 (快捷键 空格)">
                <div class="momo-skeleton-bar bar-1"></div>
                <div class="momo-skeleton-bar bar-2"></div>
              </div>

              <!-- Revealed Definitions Row -->
              <div class="momo-definitions-box" id="vocabMomoDefinitions" style="display:none"></div>
            </div>

            <!-- Card 1: Authentic Context Sentence Card -->
            <section class="vocab-momo-card vocab-momo-card-sentence" id="vocabMomoCardSentence" style="display:none">
              <div class="momo-sentence-en" id="vocabMomoSentenceEn"></div>
              <div class="momo-sentence-zh" id="vocabMomoSentenceZh"></div>
              <button class="momo-btn-speak-sentence" id="vocabMomoBtnSpeakSentence" title="朗读真题例句">🔊</button>
            </section>

            <!-- Card 2: Collocations, Synonyms & MindChain Card -->
            <section class="vocab-momo-card vocab-momo-card-relations" id="vocabMomoCardRelations" style="display:none">
              <div class="momo-colloc-list" id="vocabMomoCollocList"></div>
              
              <div class="momo-relations-tabs-bar">
                <div class="momo-tabs-left" id="vocabMomoTabsList">
                  <button class="momo-tab-pill active" data-tab="phrases">词组搭配</button>
                  <button class="momo-tab-pill" data-tab="synonyms">近义</button>
                  <button class="momo-tab-pill" data-tab="mindchain">助记</button>
                  <button class="momo-tab-pill" data-tab="lookalikes">形近</button>
                </div>
                <div class="momo-tabs-right">
                  <button class="momo-tab-tool-btn" id="vocabMomoBtnNote" title="添加/编辑个人助记笔记">✎+</button>
                  <button class="momo-tab-tool-btn" id="vocabMomoBtnRelMore" title="查看更多考点关联">≡</button>
                </div>
              </div>
            </section>

          </main>

          <!-- Bottom Action Bar -->
          <footer class="vocab-momo-bottombar">
            
            <!-- Unrevealed Phase (Prompt & 3 Grade Buttons) -->
            <div id="vocabMomoUnrevealedWrap" style="width:100%">
              <div class="momo-hint-text">
                瞬间想起词义，选「认识」<br>
                思考后想起词义，选「模糊」
              </div>
              <div class="momo-buttons-row">
                <button class="momo-grade-btn" id="vocabMomoBtnGood" title="快捷键: 3 / → / 空格">
                  <span class="momo-btn-text">认识</span>
                  <span class="momo-btn-bar bar-green"></span>
                </button>
                <button class="momo-grade-btn" id="vocabMomoBtnHard" title="快捷键: 2 / ↓">
                  <span class="momo-btn-text">模糊</span>
                  <span class="momo-btn-bar bar-amber"></span>
                </button>
                <button class="momo-grade-btn" id="vocabMomoBtnForgot" title="快捷键: 1 / ←">
                  <span class="momo-btn-text">忘记了</span>
                  <span class="momo-btn-bar bar-red"></span>
                </button>
              </div>
            </div>

            <!-- Revealed Phase (2 Action Buttons: Continue & Wrong) -->
            <div id="vocabMomoRevealedWrap" style="width:100%;display:none">
              <div class="momo-buttons-row" style="justify-content:space-around">
                <button class="momo-action-btn" id="vocabMomoBtnContinue" title="快捷键: 3 / → / 空格">
                  <span class="momo-btn-text">继续</span>
                  <span class="momo-btn-bar bar-green"></span>
                </button>
                <button class="momo-action-btn" id="vocabMomoBtnWrong" title="快捷键: 1 / ←">
                  <span class="momo-btn-text">记错了</span>
                  <span class="momo-btn-bar bar-red"></span>
                </button>
              </div>
            </div>

          </footer>

        </div>

        <!-- Settings & Filters Drawer Modal Sheet (Triggered by ···) -->
        <div class="vocab-momo-sheet-overlay" id="vocabFilterModal">
          <div class="vocab-momo-sheet-card">
            <div class="momo-sheet-header">
              <div class="momo-sheet-title">⚙️ 词库与背诵设置</div>
              <button class="momo-sheet-close-btn" id="vocabFilterModalClose">✕</button>
            </div>

            <div class="vocab-search-wrap">
              <span class="vocab-search-icon">🔍</span>
              <input type="text" id="vocabSearchInput" class="vocab-search-input" placeholder="搜索考研重点词汇或释义...">
            </div>

            <div class="vocab-filter-grid">
              <div class="vocab-filter-item">
                <label class="vocab-filter-label">词库来源</label>
                <select id="vocabSourceSelect" class="vocab-select" style="font-weight:700;color:var(--momo-green)">
                  <option value="all">📚 全真题词库 (3,199词)</option>
                  <option value="yuque_sucheng">⚡ 单词大观·2-4天速成版 (2,868词)</option>
                  <option value="yuque_daxue">❄️ 单词大观·大雪深埋版 (876词根)</option>
                  <option value="bookmarked">⭐ 我的生词本 (已收藏词汇)</option>
                </select>
              </div>
              <div class="vocab-filter-item">
                <label class="vocab-filter-label" id="vocabFilterLabel1">定位年份</label>
                <select id="vocabYearSelect" class="vocab-select">
                  <option value="all">全量年份 (2010-2026)</option>
                </select>
              </div>
              <div class="vocab-filter-item">
                <label class="vocab-filter-label" id="vocabFilterLabel2">定位篇章</label>
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

            <!-- Stats Ribbon -->
            <div class="vocab-stats-ribbon" id="vocabStatsRibbon">
              <div class="vocab-stats-chips-group">
                <div class="vocab-stat-chip" data-filter="all">📚 范围: <span class="vocab-stat-num" id="vocabStatTotal">0</span></div>
                <div class="vocab-stat-chip" data-filter="due">🔥 待办: <span class="vocab-stat-num" id="vocabStatDue">0</span></div>
                <div class="vocab-stat-chip" data-filter="new">🌱 未学: <span class="vocab-stat-num" id="vocabStatNew">0</span></div>
                <div class="vocab-stat-chip" data-filter="all">📖 记忆: <span class="vocab-stat-num" id="vocabStatLearning">0</span></div>
                <div class="vocab-stat-chip" data-filter="mastered">🏆 掌握: <span class="vocab-stat-num" id="vocabStatMastered">0</span></div>
              </div>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;flex-wrap:wrap;gap:10px">
              <button class="vocab-action-pill-btn" id="vocabToggleAudioBtn">
                <span>🔊</span> 自动发音: <span>关</span>
              </button>
              <button id="vocabBtnResetFilter" class="vocab-action-pill-btn" style="color:#ef4444">🔄 重置当前词库进度</button>
            </div>
            <div style="margin-top:10px;font-size:12px;color:var(--momo-text-muted);text-align:center">
              当前检索到 <strong id="vocabCurrentListCount">0</strong> 个词汇
            </div>
          </div>
        </div>

        <!-- Toast Feedback -->
        <div class="vocab-toast" id="vocabToast"></div>

        <!-- Compatibility Elements for Tests & Legacy Bridge (Hidden) -->
        <div style="display:none !important">
          <span id="vocabSessionProgressText">1 / 1</span>
          <span id="vocabSessionPercent">0%</span>
          <div id="vocabProgressBar"></div>
          <div id="vocabCardScene" class="vocab-card-scene">
            <div id="vocabCardFlipper" class="vocab-card-flipper">
              <div id="vocabFaceFront" class="vocab-face vocab-face-front">
                <div id="vocabProvenanceFront"></div>
                <div id="vocabBadgeFront"></div>
                <div id="vocabPosBadgeFront"></div>
                <div id="vocabWordFront"></div>
                <div id="vocabClozeBoxFront"></div>
                <button id="vocabBtnAudioFront"></button>
                <button id="vocabBtnStarFront"></button>
                <button id="vocabBtnForgotFront"></button>
                <button id="vocabBtnHardFront"></button>
                <button id="vocabBtnGoodFront"></button>
                <span id="vocabTimeForgotFront"></span>
                <span id="vocabTimeHardFront"></span>
                <span id="vocabTimeGoodFront"></span>
                <button id="vocabBtnNextFront"></button>
              </div>
              <div id="vocabFaceBack" class="vocab-face vocab-face-back">
                <div class="vocab-card-back-content">
                  <div class="vocab-back-col vocab-back-col-left">
                    <div id="vocabWordBack"></div>
                    <div id="vocabPosBadgeBack"></div>
                    <div id="vocabDefBack"></div>
                    <div id="vocabMindChainBox"><div id="vocabMindChainHeader"></div><div id="vocabMindChainContent"></div></div>
                  </div>
                  <div class="vocab-back-col vocab-back-col-right">
                    <div id="vocabSentenceBox">
                      <div id="vocabSentenceHeader"></div>
                      <div id="vocabSentenceEn"></div>
                      <div id="vocabSentenceZh"></div>
                      <div id="vocabSentenceCustom"></div>
                    </div>
                    <div id="vocabRelationsContainer"></div>
                  </div>
                </div>
                <button id="vocabBtnAudioBack"></button>
                <button id="vocabBtnStarBack"></button>
                <button id="vocabBtnForgotBack"></button>
                <button id="vocabBtnHardBack"></button>
                <button id="vocabBtnGoodBack"></button>
                <span id="vocabTimeForgotBack"></span>
                <span id="vocabTimeHardBack"></span>
                <span id="vocabTimeGoodBack"></span>
                <button id="vocabBtnUndo"></button>
                <button id="vocabBtnFlipBack"></button>
                <button id="vocabBtnNext"></button>
              </div>
            </div>
          </div>
          <div id="vocabProgressContainer" class="vocab-progress-container"></div>
          <div id="vocabEmptyState" class="vocab-empty-state"><div id="vocabEmptyTitle"></div><div id="vocabEmptyDesc"></div><button id="vocabBtnEmptyReset"></button></div>
          <div class="vocab-top-bar" id="vocabTopBar">
            <button id="vocabToggleDrawerBtn"></button>
          </div>
          <div id="vocabFilterDrawer" class="vocab-filter-drawer"></div>
        </div>
      `;
    },

    cacheDomElements() {
      els = {
        frame: document.getElementById('vocabMomoFrame'),
        momoWord: document.getElementById('vocabMomoWord'),
        momoCheckmark: document.getElementById('vocabMomoCheckmark'),
        momoProgress: document.getElementById('vocabMomoProgress'),
        momoPhoneticPill: document.getElementById('vocabMomoPhoneticPill'),
        momoPhoneticText: document.getElementById('vocabMomoPhoneticText'),
        momoSkeletons: document.getElementById('vocabMomoSkeletons'),
        momoDefinitions: document.getElementById('vocabMomoDefinitions'),
        momoSpellingBox: document.getElementById('vocabMomoSpellingBox'),
        momoSpellingInput: document.getElementById('vocabMomoSpellingInput'),

        cardSentence: document.getElementById('vocabMomoCardSentence'),
        sentenceEn: document.getElementById('vocabMomoSentenceEn'),
        sentenceZh: document.getElementById('vocabMomoSentenceZh'),
        btnSpeakSentence: document.getElementById('vocabMomoBtnSpeakSentence'),

        cardRelations: document.getElementById('vocabMomoCardRelations'),
        collocList: document.getElementById('vocabMomoCollocList'),
        relationsTabs: document.getElementById('vocabMomoTabsList'),
        btnNote: document.getElementById('vocabMomoBtnNote'),

        unrevealedWrap: document.getElementById('vocabMomoUnrevealedWrap'),
        revealedWrap: document.getElementById('vocabMomoRevealedWrap'),

        btnBack: document.getElementById('vocabMomoBtnBack'),
        btnUndo: document.getElementById('vocabMomoBtnUndo'),
        btnStar: document.getElementById('vocabMomoBtnStar'),
        btnMastered: document.getElementById('vocabMomoBtnMastered'),
        btnSpelling: document.getElementById('vocabMomoBtnSpelling'),
        btnMore: document.getElementById('vocabMomoBtnMore'),

        btnGood: document.getElementById('vocabMomoBtnGood'),
        btnHard: document.getElementById('vocabMomoBtnHard'),
        btnForgot: document.getElementById('vocabMomoBtnForgot'),
        btnContinue: document.getElementById('vocabMomoBtnContinue'),
        btnWrong: document.getElementById('vocabMomoBtnWrong'),

        sheetModal: document.getElementById('vocabFilterModal'),
        sheetClose: document.getElementById('vocabFilterModalClose'),

        searchInput: document.getElementById('vocabSearchInput'),
        sourceSelect: document.getElementById('vocabSourceSelect'),
        yearSelect: document.getElementById('vocabYearSelect'),
        textSelect: document.getElementById('vocabTextSelect'),
        stateSelect: document.getElementById('vocabStateSelect'),
        sortSelect: document.getElementById('vocabSortSelect'),
        filterLabel1: document.getElementById('vocabFilterLabel1'),
        filterLabel2: document.getElementById('vocabFilterLabel2'),
        btnToggleAudio: document.getElementById('vocabToggleAudioBtn'),
        btnResetFilter: document.getElementById('vocabBtnResetFilter'),
        currentListCount: document.getElementById('vocabCurrentListCount'),

        statTotal: document.getElementById('vocabStatTotal'),
        statDue: document.getElementById('vocabStatDue'),
        statNew: document.getElementById('vocabStatNew'),
        statLearning: document.getElementById('vocabStatLearning'),
        statMastered: document.getElementById('vocabStatMastered'),
        statChips: document.querySelectorAll('.vocab-stat-chip'),

        toast: document.getElementById('vocabToast'),

        // Compatibility aliases
        sessionProgressText: document.getElementById('vocabSessionProgressText'),
        sessionPercent: document.getElementById('vocabSessionPercent'),
        progressBar: document.getElementById('vocabProgressBar'),
        cardScene: document.getElementById('vocabCardScene'),
        cardFlipper: document.getElementById('vocabCardFlipper'),
        faceFront: document.getElementById('vocabFaceFront'),
        faceBack: document.getElementById('vocabFaceBack'),
        btnAudioFront: document.getElementById('vocabBtnAudioFront'),
        btnAudioBack: document.getElementById('vocabBtnAudioBack'),
        btnStarFront: document.getElementById('vocabBtnStarFront'),
        btnStarBack: document.getElementById('vocabBtnStarBack'),
        btnForgotFront: document.getElementById('vocabBtnForgotFront'),
        btnHardFront: document.getElementById('vocabBtnHardFront'),
        btnGoodFront: document.getElementById('vocabBtnGoodFront'),
        btnForgotBack: document.getElementById('vocabBtnForgotBack'),
        btnHardBack: document.getElementById('vocabBtnHardBack'),
        btnGoodBack: document.getElementById('vocabBtnGoodBack'),
        timeForgotFront: document.getElementById('vocabTimeForgotFront'),
        timeHardFront: document.getElementById('vocabTimeHardFront'),
        timeGoodFront: document.getElementById('vocabTimeGoodFront'),
        timeForgotBack: document.getElementById('vocabTimeForgotBack'),
        timeHardBack: document.getElementById('vocabTimeHardBack'),
        timeGoodBack: document.getElementById('vocabTimeGoodBack'),
        btnLegacyUndo: document.getElementById('vocabBtnUndo'),
        btnLegacyFlipBack: document.getElementById('vocabBtnFlipBack'),
        btnLegacyNext: document.getElementById('vocabBtnNext'),
        btnEmptyReset: document.getElementById('vocabBtnEmptyReset'),
        wordFront: document.getElementById('vocabWordFront'),
        wordBack: document.getElementById('vocabWordBack'),
        posBadgeFront: document.getElementById('vocabPosBadgeFront'),
        posBadgeBack: document.getElementById('vocabPosBadgeBack'),
        defBack: document.getElementById('vocabDefBack'),
        relationsContainer: document.getElementById('vocabRelationsContainer'),
        sentenceBox: document.getElementById('vocabSentenceBox'),
        sentenceHeader: document.getElementById('vocabSentenceHeader'),
        sentenceCustom: document.getElementById('vocabSentenceCustom'),
        mindChainBox: document.getElementById('vocabMindChainBox'),
        mindChainContent: document.getElementById('vocabMindChainContent'),
        badgeFront: document.getElementById('vocabBadgeFront'),
        badgeBack: document.getElementById('vocabBadgeBack'),
        provenanceFront: document.getElementById('vocabProvenanceFront'),
        provenanceBack: document.getElementById('vocabProvenanceBack'),
        filterDrawer: document.getElementById('vocabFilterDrawer')
      };
    },

    bindEvents() {
      // 1. Top bar: Back Button
      if (els.btnBack) {
        els.btnBack.onclick = () => {
          if (window.AppState && window.AppState.setMode) {
            window.AppState.setMode('practice');
          } else {
            const btn = document.getElementById('practiceModeBtn');
            if (btn) btn.click();
          }
        };
      }

      // 2. Top bar: Undo
      if (els.btnUndo) els.btnUndo.onclick = () => this.undoLastGrade();
      if (els.btnLegacyUndo) els.btnLegacyUndo.onclick = () => this.undoLastGrade();

      // 3. Top bar: Star / Bookmark
      if (els.btnStar) els.btnStar.onclick = () => this.toggleBookmarkCurrentWord();
      if (els.btnStarFront) els.btnStarFront.onclick = () => this.toggleBookmarkCurrentWord();
      if (els.btnStarBack) els.btnStarBack.onclick = () => this.toggleBookmarkCurrentWord();

      // 4. Top bar: Mastered
      if (els.btnMastered) els.btnMastered.onclick = () => this.markMastered();

      // 5. Top bar: Spelling Mode
      if (els.btnSpelling) els.btnSpelling.onclick = () => this.toggleSpellingMode();

      // 6. Top bar: More Menu Sheet
      if (els.btnMore) els.btnMore.onclick = () => this.toggleSettingsSheet(true);
      if (els.sheetClose) els.sheetClose.onclick = () => this.toggleSettingsSheet(false);
      if (els.sheetModal) {
        els.sheetModal.onclick = (e) => {
          if (e.target === els.sheetModal) this.toggleSettingsSheet(false);
        };
      }

      // 7. Word & Skeletons Click: Flip to reveal
      if (els.momoSkeletons) els.momoSkeletons.onclick = () => this.flipCard(true);
      if (els.momoWord) els.momoWord.onclick = () => {
        if (!appState.isFlipped) this.flipCard(true);
        else this.playAudio();
      };
      if (els.faceFront) els.faceFront.onclick = () => this.flipCard(true);

      // 8. Audio Buttons
      if (els.momoPhoneticPill) els.momoPhoneticPill.onclick = () => this.playAudio();
      if (els.btnAudioFront) els.btnAudioFront.onclick = () => this.playAudio();
      if (els.btnAudioBack) els.btnAudioBack.onclick = () => this.playAudio();
      if (els.btnSpeakSentence) {
        els.btnSpeakSentence.onclick = (e) => {
          e.stopPropagation();
          this.speakCurrentSentence();
        };
      }

      // 9. Unrevealed Grade Buttons (认识 / 模糊 / 忘记了)
      if (els.btnGood) els.btnGood.onclick = () => this.gradeWord('good');
      if (els.btnHard) els.btnHard.onclick = () => this.gradeWord('hard');
      if (els.btnForgot) els.btnForgot.onclick = () => this.gradeWord('forgot');

      if (els.btnGoodFront) els.btnGoodFront.onclick = () => this.gradeWord('good');
      if (els.btnHardFront) els.btnHardFront.onclick = () => this.gradeWord('hard');
      if (els.btnForgotFront) els.btnForgotFront.onclick = () => this.gradeWord('forgot');

      // 10. Revealed Action Buttons (继续 / 记错了)
      if (els.btnContinue) els.btnContinue.onclick = () => this.goToNextCard();
      if (els.btnWrong) els.btnWrong.onclick = () => this.handleMarkWrong();

      if (els.btnGoodBack) els.btnGoodBack.onclick = () => this.goToNextCard();
      if (els.btnLegacyNext) els.btnLegacyNext.onclick = () => this.goToNextCard();
      if (els.btnForgotBack) els.btnForgotBack.onclick = () => this.handleMarkWrong();

      // 11. Relations Tab Switcher
      if (els.relationsTabs) {
        els.relationsTabs.onclick = (e) => {
          const pill = e.target.closest('.momo-tab-pill');
          if (!pill) return;
          const tab = pill.getAttribute('data-tab');
          if (tab) {
            appState.activeRelationTab = tab;
            this.updateRelationsTabDisplay();
          }
        };
      }

      // 12. Settings Sheet Dropdowns & Search
      const handleSourceChange = () => {
        const val = els.sourceSelect.value;
        appState.filters.source = val;
        this.populateDropdowns();
        if (els.yearSelect) els.yearSelect.value = 'all';
        appState.filters.year = 'all';
        if (els.textSelect) els.textSelect.value = 'all';
        appState.filters.text = 'all';
        this.applyFiltersAndRender();
        let toastName = '📚 全真题词库';
        if (val === 'yuque_sucheng') toastName = '⚡ 单词大观·2-4天速成版 (2,868词)';
        else if (val === 'yuque_daxue') toastName = '❄️ 单词大观·大雪深埋版 (876词根)';
        else if (val === 'bookmarked') toastName = '⭐ 我的生词本';
        this.showToast(`已切至：${toastName}`);
      };

      if (els.sourceSelect) {
        els.sourceSelect.onchange = handleSourceChange;
        els.sourceSelect.oninput = handleSourceChange;
      }

      if (els.yearSelect) {
        els.yearSelect.onchange = () => {
          appState.filters.year = els.yearSelect.value;
          this.updateTextDropdown();
          appState.filters.text = els.textSelect.value;
          this.applyFiltersAndRender();
        };
      }

      if (els.textSelect) {
        els.textSelect.onchange = () => {
          appState.filters.text = els.textSelect.value;
          this.applyFiltersAndRender();
        };
      }

      if (els.stateSelect) {
        els.stateSelect.onchange = () => {
          appState.filters.state = els.stateSelect.value;
          this.applyFiltersAndRender();
        };
      }

      if (els.sortSelect) {
        els.sortSelect.onchange = () => {
          appState.filters.sort = els.sortSelect.value;
          this.applyFiltersAndRender();
        };
      }

      let debounceTimer = null;
      if (els.searchInput) {
        els.searchInput.oninput = () => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            appState.filters.search = els.searchInput.value.trim();
            this.applyFiltersAndRender();
          }, 200);
        };
      }

      // Auto Audio Toggle
      if (els.btnToggleAudio) {
        els.btnToggleAudio.onclick = () => {
          appState.autoAudio = !appState.autoAudio;
          this.saveSettings();
          this.updateAudioButtonState();
          this.showToast(appState.autoAudio ? '🔊 自动发音已开启' : '🔈 自动发音已关闭');
        };
      }

      // Reset Filter Progress
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

      // Spelling Input Event
      if (els.momoSpellingInput) {
        els.momoSpellingInput.onkeydown = (e) => {
          if (e.key === 'Enter') {
            this.checkSpellingInput();
          }
        };
      }

      // Global Keyboard Shortcuts
      window.addEventListener('keydown', (e) => {
        if (!document.body.classList.contains('mode-vocab')) return;
        const tag = (e.target.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select') {
          if (e.target === els.momoSpellingInput) return;
          return;
        }

        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          if (!appState.isFlipped) this.flipCard(true);
          else this.goToNextCard();
        } else if (e.key === '1' || e.key === 'ArrowLeft') {
          e.preventDefault();
          if (!appState.isFlipped) this.gradeWord('forgot');
          else this.handleMarkWrong();
        } else if (e.key === '2' || e.key === 'ArrowDown') {
          e.preventDefault();
          if (!appState.isFlipped) this.gradeWord('hard');
        } else if (e.key === '3' || e.key === 'ArrowRight') {
          e.preventDefault();
          if (!appState.isFlipped) this.gradeWord('good');
          else this.goToNextCard();
        } else if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          this.playAudio();
        } else if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          this.toggleBookmarkCurrentWord();
        } else if (e.key === 'z' || e.key === 'Z') {
          e.preventDefault();
          this.undoLastGrade();
        }
      });
    },

    toggleSettingsSheet(open) {
      if (!els.sheetModal) return;
      els.sheetModal.classList.toggle('is-open', !!open);
      if (open) this.updateAudioButtonState();
    },

    updateAudioButtonState() {
      if (els.btnToggleAudio) {
        els.btnToggleAudio.classList.toggle('active', appState.autoAudio);
        els.btnToggleAudio.querySelector('span:last-child').textContent = appState.autoAudio ? '开' : '关';
      }
    },

    toggleSpellingMode() {
      appState.spellingMode = !appState.spellingMode;
      this.saveSettings();
      this.showToast(appState.spellingMode ? '📝 拼写默写模式已开启' : '📖 释义闪卡模式已恢复');
      this.renderCurrentCard();
    },

    checkSpellingInput() {
      if (!els.momoSpellingInput || appState.currentIndex >= appState.currentList.length) return;
      const target = (appState.currentList[appState.currentIndex].word || '').trim().toLowerCase();
      const input = els.momoSpellingInput.value.trim().toLowerCase();
      if (input === target) {
        this.showToast('🎉 拼写正确！');
        this.gradeWord('good');
      } else {
        this.showToast(`❌ 正确拼写为: ${target}`);
        this.gradeWord('forgot');
      }
    },

    populateDropdowns() {
      const source = appState.filters.source;

      if (source === 'yuque_sucheng') {
        if (els.filterLabel1) els.filterLabel1.textContent = '构词分类';
        if (els.filterLabel2) els.filterLabel2.textContent = '分册定位';
        if (els.yearSelect) {
          els.yearSelect.innerHTML = `
            <option value="all">全量分类 (2,868词)</option>
            <option value="词根构词型">词根构词型 (1,675词)</option>
            <option value="独立词型">独立词型 (839词)</option>
            <option value="直接背型">直接背型 (354词)</option>
          `;
          els.yearSelect.value = 'all';
        }
        if (els.textSelect) {
          els.textSelect.innerHTML = '<option value="all">全量分册</option>';
          els.textSelect.value = 'all';
        }
      } else if (source === 'yuque_daxue') {
        if (els.filterLabel1) els.filterLabel1.textContent = '考频分层';
        if (els.filterLabel2) els.filterLabel2.textContent = '细分单元';
        if (els.yearSelect) {
          els.yearSelect.innerHTML = `
            <option value="all">全量分层 (876词根)</option>
            <option value="考频1次">考频1次 (563词根)</option>
            <option value="考频2次">考频2次 (159词根)</option>
            <option value="考频3-4次">考频3-4次 (94词根)</option>
            <option value="考频5次以上">考频5次以上 (60词根)</option>
          `;
          els.yearSelect.value = 'all';
        }
        if (els.textSelect) {
          els.textSelect.innerHTML = '<option value="all">全量单元</option>';
          els.textSelect.value = 'all';
        }
      } else if (source === 'bookmarked') {
        if (els.filterLabel1) els.filterLabel1.textContent = '定位年份';
        if (els.filterLabel2) els.filterLabel2.textContent = '定位篇章';
        if (els.yearSelect) {
          els.yearSelect.innerHTML = '<option value="all">全部收藏年份</option>';
          els.yearSelect.value = 'all';
        }
        if (els.textSelect) {
          els.textSelect.innerHTML = '<option value="all">全部收藏篇章</option>';
          els.textSelect.value = 'all';
        }
      } else {
        // Standard All Exam Bank
        if (els.filterLabel1) els.filterLabel1.textContent = '定位年份';
        if (els.filterLabel2) els.filterLabel2.textContent = '定位篇章';
        if (els.yearSelect) {
          const years = Array.from(new Set(appState.rawVocabData.map(w => w.year))).sort((a,b) => b-a);
          els.yearSelect.innerHTML = '<option value="all">全量年份 (2010-2026)</option>' +
            years.map(y => `<option value="${y}">${y} 年真题</option>`).join('');
          els.yearSelect.value = 'all';
        }
        this.updateTextDropdown();
      }
    },

    updateTextDropdown() {
      const source = appState.filters.source;
      if (source === 'yuque_sucheng') {
        const cat = els.yearSelect.value;
        const list = window.YUQUE_SUCHENG_VOCAB || [];
        const subbooks = new Set();
        list.forEach(item => {
          if ((cat === 'all' || item.category === cat) && item.subbook) subbooks.add(item.subbook);
        });
        if (els.textSelect) {
          els.textSelect.innerHTML = '<option value="all">全量分册</option>' +
            Array.from(subbooks).sort().map(sb => `<option value="${sb}">${sb}</option>`).join('');
          els.textSelect.value = 'all';
        }
      } else if (source === 'yuque_daxue') {
        const tier = els.yearSelect.value;
        const list = window.YUQUE_DAXUE_VOCAB || [];
        const units = new Set();
        list.forEach(item => {
          if ((tier === 'all' || item.freqTier === tier) && item.subbook) units.add(item.subbook);
        });
        if (els.textSelect) {
          els.textSelect.innerHTML = '<option value="all">全量单元</option>' +
            Array.from(units).sort().map(u => `<option value="${u}">${u}</option>`).join('');
          els.textSelect.value = 'all';
        }
      } else if (source === 'all') {
        const y = els.yearSelect ? els.yearSelect.value : 'all';
        if (els.textSelect) {
          const texts = ['Text 1', 'Text 2', 'Text 3', 'Text 4'];
          els.textSelect.innerHTML = '<option value="all">全量篇章</option>' +
            texts.map(t => `<option value="${t}">${t}</option>`).join('');
          els.textSelect.value = 'all';
        }
      }
    },

    switchToBookmarked() {
      if (els.sourceSelect) {
        els.sourceSelect.value = 'bookmarked';
        els.sourceSelect.onchange();
      }
    },

    applyFiltersAndRender() {
      const { source, year, text, state, sort, search } = appState.filters;
      let list = [];

      if (source === 'yuque_sucheng') {
        list = (window.YUQUE_SUCHENG_VOCAB || []).map(item => ({
          word: item.word,
          meaning: item.meaning,
          year: item.category,
          text: item.subbook || '核心大观',
          freq: item.freq,
          mindChain: item.mindChain,
          examUses: item.examUses,
          sentence: item.sentence,
          source: item.source,
          svgUrl: item.svgUrl
        }));
        if (year !== 'all') list = list.filter(w => w.year === year);
        if (text !== 'all') list = list.filter(w => w.text === text);
      } else if (source === 'yuque_daxue') {
        list = (window.YUQUE_DAXUE_VOCAB || []).map(item => ({
          word: item.root,
          meaning: item.rootInfo || item.meaning,
          year: item.freqTier,
          text: item.subbook,
          mnemonic: item.mnemonic,
          coreWords: item.coreWords,
          additionalWords: item.additionalWords,
          allWords: item.allWords,
          svgUrl: item.svgUrl,
          isRoot: true
        }));
        if (year !== 'all') list = list.filter(w => w.year === year);
        if (text !== 'all') list = list.filter(w => w.text === text);
      } else if (source === 'bookmarked') {
        const bookmarked = window.StorageModule ? window.StorageModule.getVocabBook() : [];
        list = bookmarked.map(b => ({
          word: b.word,
          meaning: b.meaning,
          sentence: b.sentence,
          year: b.year,
          text: b.text
        }));
      } else {
        list = [...appState.rawVocabData];
        if (year !== 'all') list = list.filter(w => w.year === year);
        if (text !== 'all') list = list.filter(w => w.text === text);
      }

      // State Filter (due, new, mastered)
      const now = Date.now();
      if (state === 'due') {
        list = list.filter(w => {
          const rec = appState.progress[w.word];
          return rec && rec.status !== 'mastered' && rec.nextReviewTime <= now;
        });
      } else if (state === 'new') {
        list = list.filter(w => !appState.progress[w.word]);
      } else if (state === 'mastered') {
        list = list.filter(w => {
          const rec = appState.progress[w.word];
          return rec && rec.status === 'mastered';
        });
      }

      // Keyword Search
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(w => {
          return (w.word && w.word.toLowerCase().includes(q)) ||
                 (w.meaning && w.meaning.toLowerCase().includes(q)) ||
                 (w.mnemonic && w.mnemonic.toLowerCase().includes(q)) ||
                 (w.allWords && w.allWords.some(sub => sub.toLowerCase().includes(q)));
        });
      }

      // Sorting Strategy
      if (sort === 'urgency') {
        list.sort((a, b) => {
          const recA = appState.progress[a.word];
          const recB = appState.progress[b.word];
          const timeA = recA ? recA.nextReviewTime : 0;
          const timeB = recB ? recB.nextReviewTime : 0;
          return timeA - timeB;
        });
      } else if (sort === 'random') {
        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
        }
      }

      appState.currentList = list;
      appState.currentIndex = 0;
      appState.isFlipped = false;

      this.updateStats();
      this.renderCurrentCard();
    },

    updateStats() {
      const source = appState.filters.source;
      let totalScopeCount = 0;
      let fullItems = [];

      if (source === 'yuque_sucheng') fullItems = window.YUQUE_SUCHENG_VOCAB || [];
      else if (source === 'yuque_daxue') fullItems = window.YUQUE_DAXUE_VOCAB || [];
      else if (source === 'bookmarked') fullItems = window.StorageModule ? window.StorageModule.getVocabBook() : [];
      else fullItems = appState.rawVocabData;

      totalScopeCount = fullItems.length;
      const now = Date.now();
      let dueCount = 0, newCount = 0, learningCount = 0, masteredCount = 0;

      fullItems.forEach(item => {
        const w = item.word || item.root;
        const rec = appState.progress[w];
        if (!rec) newCount++;
        else if (rec.status === 'mastered') masteredCount++;
        else {
          learningCount++;
          if (rec.nextReviewTime <= now) dueCount++;
        }
      });

      if (els.statTotal) els.statTotal.textContent = String(appState.currentList.length);
      if (els.statDue) els.statDue.textContent = String(dueCount);
      if (els.statNew) els.statNew.textContent = String(newCount);
      if (els.statLearning) els.statLearning.textContent = String(learningCount);
      if (els.statMastered) els.statMastered.textContent = String(masteredCount);
      if (els.currentListCount) els.currentListCount.textContent = String(appState.currentList.length);
    },

    getWordPhonetic(word) {
      if (!word) return { uk: '', us: '' };
      const wLow = word.trim().toLowerCase();
      if (window.KAOYAN_VOCAB_PHONETICS && window.KAOYAN_VOCAB_PHONETICS[wLow]) {
        return window.KAOYAN_VOCAB_PHONETICS[wLow];
      }
      return { uk: '', us: '' };
    },

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
        matched = tObj.sentences.find(s => s.text.toLowerCase().includes(cleanWord.toLowerCase()));
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
      let pos = '';
      let cleanDef = meaning || '';

      const wLow = (word || '').toLowerCase().trim();
      const dObj = window.KAOYAN_VOCAB_DICT ? (window.KAOYAN_VOCAB_DICT[word] || window.KAOYAN_VOCAB_DICT[wLow]) : null;
      if (dObj) {
        if (dObj.pos) pos = dObj.pos;
        if (dObj.def) cleanDef = dObj.def;
      } else {
        const match = cleanDef.match(/^([a-zA-Z\.\/]+)\s+(.+)$/);
        if (match && POS_MAP[match[1]]) {
          pos = match[1];
          cleanDef = match[2];
        }
      }
      return { pos, cleanDef };
    },

    renderCurrentCard() {
      if (appState.currentList.length === 0) {
        if (els.momoWord) els.momoWord.textContent = '🎉 词库已学完';
        if (els.momoSkeletons) els.momoSkeletons.style.display = 'none';
        if (els.momoDefinitions) els.momoDefinitions.style.display = 'none';
        if (els.cardSentence) els.cardSentence.style.display = 'none';
        if (els.cardRelations) els.cardRelations.style.display = 'none';
        if (els.unrevealedWrap) els.unrevealedWrap.style.display = 'none';
        if (els.revealedWrap) els.revealedWrap.style.display = 'none';
        if (els.momoProgress) els.momoProgress.textContent = '0/0';
        return;
      }

      const total = appState.currentList.length;
      const idx = appState.currentIndex;
      const cur = appState.currentList[idx];
      const word = cur.word;

      // Update Topbar Progress (e.g. 9/10)
      const progStr = `${idx + 1}/${total}`;
      if (els.momoProgress) els.momoProgress.textContent = progStr;
      if (els.sessionProgressText) els.sessionProgressText.textContent = `${idx + 1} / ${total}`;

      // Star status
      const isStarred = window.StorageModule && window.StorageModule.isWordBookmarked ?
        window.StorageModule.isWordBookmarked(word) : false;
      if (els.btnStar) {
        els.btnStar.textContent = isStarred ? '★' : '☆';
        els.btnStar.classList.toggle('is-starred', isStarred);
      }
      if (els.btnStarFront) els.btnStarFront.textContent = isStarred ? '★' : '☆';
      if (els.btnStarBack) els.btnStarBack.textContent = isStarred ? '★' : '☆';

      // Phonetic Resolution
      const ph = this.getWordPhonetic(word);
      const ipa = ph.uk || ph.us || (cur.isRoot ? '' : `/'${word}/`);
      if (els.momoPhoneticText) {
        els.momoPhoneticText.textContent = ipa ? `英 🔊 ${ipa}` : `🔊 发音`;
      }

      // Word Title with Syllables
      const syllabified = formatWordWithSyllables(word);
      if (appState.spellingMode && !appState.isFlipped) {
        if (els.momoWord) els.momoWord.textContent = word.replace(/[a-zA-Z]/g, '_ ');
        if (els.momoSpellingBox) {
          els.momoSpellingBox.style.display = 'flex';
          if (els.momoSpellingInput) {
            els.momoSpellingInput.value = '';
            setTimeout(() => els.momoSpellingInput.focus(), 100);
          }
        }
      } else {
        if (els.momoSpellingBox) els.momoSpellingBox.style.display = 'none';
        if (els.momoWord) {
          els.momoWord.textContent = appState.isFlipped ? syllabified : word;
        }
      }

      // Green Checkmark icon when revealed
      if (els.momoCheckmark) {
        els.momoCheckmark.style.display = appState.isFlipped ? 'inline-flex' : 'none';
      }

      // Parse Part of Speech and Definitions
      const { pos, cleanDef } = this.extractPosAndMeaning(word, cur.meaning);

      // Render Definitions with dotted underline
      if (els.momoDefinitions) {
        let defRowsHtml = '';
        if (cur.isRoot) {
          defRowsHtml = `<div class="momo-def-row"><span class="momo-meaning-item">${cleanDef.replace(/\n/g, '<br>')}</span></div>`;
        } else {
          // Split definitions by commas, semicolons or spaces
          const defParts = cleanDef.replace(/^[a-zA-Z\.\/]+\s*/, '').split(/[；;，,]/).map(d => d.trim()).filter(Boolean);
          const posPrefix = pos ? `<span class="momo-pos">${pos}</span>` : '';
          defRowsHtml = `
            <div class="momo-def-row">
              ${posPrefix}
              ${defParts.map(part => `<span class="momo-meaning-item">${part}</span>`).join('')}
            </div>
          `;
        }
        els.momoDefinitions.innerHTML = defRowsHtml;
      }

      // Update Card 1: Context Sentence Card
      let sentenceObj = cur.sentence ? {
        text: cur.sentence,
        translation: cur.source || ''
      } : this.findExamSentence(word, cur.year, cur.text);

      if (!sentenceObj && window.KAOYAN_VOCAB_RELATIONS) {
        const relData = window.KAOYAN_VOCAB_RELATIONS[word.toLowerCase()];
        if (relData && relData.sentences && relData.sentences.length > 0) {
          sentenceObj = relData.sentences[0];
        }
      }

      if (sentenceObj && sentenceObj.text) {
        const cleanW = word.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`(\\b${cleanW}[a-z]*\\b)`, 'gi');
        const highlightedEn = sentenceObj.text.replace(re, '<strong>$1</strong>');
        if (els.sentenceEn) els.sentenceEn.innerHTML = highlightedEn;
        if (els.sentenceZh) els.sentenceZh.textContent = sentenceObj.translation || '（真题核心考点例句）';
        if (els.cardSentence) els.cardSentence.style.display = appState.isFlipped ? 'block' : 'none';
      } else {
        if (els.cardSentence) els.cardSentence.style.display = 'none';
      }

      // Update Card 2: Collocations, Synonyms & MindChain Card
      this.renderRelationsCard(word, cur);

      // Toggle UI State (Unrevealed vs Revealed)
      if (!appState.isFlipped) {
        if (els.momoSkeletons) els.momoSkeletons.style.display = 'flex';
        if (els.momoDefinitions) els.momoDefinitions.style.display = 'none';
        if (els.cardSentence) els.cardSentence.style.display = 'none';
        if (els.cardRelations) els.cardRelations.style.display = 'none';
        if (els.unrevealedWrap) els.unrevealedWrap.style.display = 'block';
        if (els.revealedWrap) els.revealedWrap.style.display = 'none';
      } else {
        if (els.momoSkeletons) els.momoSkeletons.style.display = 'none';
        if (els.momoDefinitions) els.momoDefinitions.style.display = 'flex';
        if (els.cardSentence && sentenceObj?.text) els.cardSentence.style.display = 'block';
        if (els.cardRelations) els.cardRelations.style.display = 'block';
        if (els.unrevealedWrap) els.unrevealedWrap.style.display = 'none';
        if (els.revealedWrap) els.revealedWrap.style.display = 'block';
      }

      // Auto Audio on card switch
      if (appState.autoAudio && !appState.isFlipped) {
        setTimeout(() => this.playAudio(), 100);
      }

      // Sync Compatibility Elements for Tests
      if (els.wordFront) els.wordFront.textContent = word;
      if (els.wordBack) els.wordBack.textContent = word;
      if (els.posBadgeFront) els.posBadgeFront.textContent = cur.freq ? `考频: ${cur.freq}次` : (pos || '重点核心词');
      if (els.defBack) els.defBack.innerHTML = `<span>核心释义: ${cleanDef}</span>`;
      if (els.provenanceFront) els.provenanceFront.textContent = `${cur.year} · ${cur.text}`;
      if (els.provenanceBack) els.provenanceBack.textContent = `${cur.year} · ${cur.text}`;
    },

    renderRelations(word) {
      if (appState.currentIndex < appState.currentList.length) {
        this.renderRelationsCard(word, appState.currentList[appState.currentIndex]);
      } else {
        this.renderRelationsCard(word, { word });
      }
    },

    renderRelationsCard(word, cur) {
      const wLow = (word || '').toLowerCase().trim();
      const getRel = (w) => {
        if (!window.KAOYAN_VOCAB_RELATIONS || !w) return null;
        const low = String(w).toLowerCase().trim();
        return window.KAOYAN_VOCAB_RELATIONS[low] ||
               window.KAOYAN_VOCAB_RELATIONS[String(w).trim()] ||
               window.KAOYAN_VOCAB_RELATIONS[low.replace(/s$/, '')] ||
               window.KAOYAN_VOCAB_RELATIONS[low.replace(/ed$/, '')] ||
               window.KAOYAN_VOCAB_RELATIONS[low.replace(/ing$/, '')] || null;
      };
      const relData = getRel(word);

      const phrases = (relData && relData.phrases) ? relData.phrases : [];
      const synonyms = (relData && relData.synonyms) ? relData.synonyms : [];
      const lookalikes = (relData && relData.lookalikes) ? relData.lookalikes : [];
      const mindChain = (cur && (cur.mindChain || cur.mnemonic)) || '';

      // Determine which tab to show by default
      if (phrases.length > 0) appState.activeRelationTab = 'phrases';
      else if (synonyms.length > 0) appState.activeRelationTab = 'synonyms';
      else if (mindChain) appState.activeRelationTab = 'mindchain';
      else if (lookalikes.length > 0) appState.activeRelationTab = 'lookalikes';
      else appState.activeRelationTab = 'phrases';

      // Store cached relations for tab clicks
      appState.currentRelationsData = { phrases, synonyms, lookalikes, mindChain, cur };
      this.updateRelationsTabDisplay();

      // Compatibility container update for tests
      if (els.relationsContainer) {
        let compHtml = '';
        if (phrases.length > 0) {
          compHtml += `<div class="vocab-rel-header phrases"><span>🔗 真题搭配词组</span>${phrases.map(p => `<span>${p.phrase}</span>`).join(' ')}</div>`;
        }
        if (lookalikes.length > 0) {
          compHtml += `<div class="vocab-rel-header lookalikes"><span>🔍 真题形近词辨析</span>${lookalikes.map(l => `<span class="pill-word">${l.word}</span>`).join(' ')}</div>`;
        }
        els.relationsContainer.innerHTML = compHtml;
      }
    },

    updateRelationsTabDisplay() {
      if (!els.collocList || !appState.currentRelationsData) return;
      const { phrases, synonyms, lookalikes, mindChain } = appState.currentRelationsData;
      const tab = appState.activeRelationTab;

      // Update tab button active states
      if (els.relationsTabs) {
        els.relationsTabs.querySelectorAll('.momo-tab-pill').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
        });
      }

      let html = '';
      if (tab === 'phrases') {
        if (phrases.length > 0) {
          html = phrases.map(p => `
            <div class="momo-colloc-row">
              <span class="momo-colloc-en">${p.phrase}</span>
              <span class="momo-colloc-zh">${p.def || ''}</span>
            </div>
          `).join('');
        } else {
          html = '<div style="color:var(--momo-text-muted);font-size:13.5px;padding:8px 0">暂无历年真题固定词组收录</div>';
        }
      } else if (tab === 'synonyms') {
        if (synonyms.length > 0) {
          html = synonyms.map(s => `
            <div class="momo-colloc-row">
              <span class="momo-colloc-en">${s.word || s}</span>
              <span class="momo-colloc-zh">${s.def || '同义替换'}</span>
            </div>
          `).join('');
        } else {
          html = '<div style="color:var(--momo-text-muted);font-size:13.5px;padding:8px 0">暂无同义置换词收录</div>';
        }
      } else if (tab === 'mindchain') {
        if (mindChain) {
          html = `<div style="font-size:14px;line-height:1.65;color:var(--momo-text-main);white-space:pre-wrap">${mindChain}</div>`;
        } else {
          html = '<div style="color:var(--momo-text-muted);font-size:13.5px;padding:8px 0">暂无思维链路推导，可点击右侧 ✎+ 自定义助记</div>';
        }
      } else if (tab === 'lookalikes') {
        if (lookalikes.length > 0) {
          html = lookalikes.map(l => `
            <div class="momo-colloc-row">
              <span class="momo-colloc-en">${l.word}</span>
              <span class="momo-colloc-zh">${l.def || ''}</span>
            </div>
          `).join('');
        } else {
          html = '<div style="color:var(--momo-text-muted);font-size:13.5px;padding:8px 0">暂无真题形近混淆词</div>';
        }
      }

      els.collocList.innerHTML = html;
    },

    flipCard(showBack) {
      appState.isFlipped = !!showBack;
      if (els.cardFlipper) els.cardFlipper.classList.toggle('is-flipped', appState.isFlipped);
      this.renderCurrentCard();
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

      // If unrevealed, reveal the detailed answer; if already revealed, advance
      if (!appState.isFlipped) {
        this.flipCard(true);
      } else {
        this.goToNextCard();
      }
    },

    handleMarkWrong() {
      if (appState.currentIndex >= appState.currentList.length) return;
      const word = appState.currentList[appState.currentIndex].word;
      const now = Date.now();
      let record = appState.progress[word] || {
        status: 'learning',
        level: 0,
        firstStudied: now,
        lastReviewed: now,
        nextReviewTime: now,
        reviewCount: 0
      };
      record.level = 0;
      record.nextReviewTime = now + EBB_INTERVALS[0];
      record.status = 'learning';
      appState.progress[word] = record;
      this.saveProgress();
      this.showToast('⚠️ 已标为「记错了」，稍后继续复习');
      this.goToNextCard();
    },

    markMastered() {
      if (appState.currentIndex >= appState.currentList.length) return;
      const word = appState.currentList[appState.currentIndex].word;
      const now = Date.now();
      let record = appState.progress[word] || {
        status: 'mastered',
        level: 9,
        firstStudied: now,
        lastReviewed: now,
        nextReviewTime: now,
        reviewCount: 0
      };
      record.status = 'mastered';
      record.level = 9;
      record.nextReviewTime = now + (365 * 24 * 60 * 60 * 1000);
      appState.progress[word] = record;
      this.saveProgress();
      this.showToast('🏆 已将本词标为「熟词」（永久掌握）');
      this.goToNextCard();
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
      appState.isFlipped = false;
      this.saveProgress();
      this.renderCurrentCard();
      this.showToast('↩ 已撤销上一次评分');
    },

    goToNextCard() {
      appState.currentIndex++;
      appState.isFlipped = false;
      this.renderCurrentCard();
    },

    toggleBookmarkCurrentWord() {
      if (appState.currentIndex >= appState.currentList.length) return;
      const cur = appState.currentList[appState.currentIndex];
      if (!window.StorageModule || !window.StorageModule.toggleBookmark) return;

      const sentence = cur.sentence || '';
      const res = window.StorageModule.toggleBookmark(cur.word, cur.meaning, sentence, cur.year, cur.text);
      const isStarred = res.added;

      if (els.btnStar) {
        els.btnStar.textContent = isStarred ? '★' : '☆';
        els.btnStar.classList.toggle('is-starred', isStarred);
      }
      if (els.btnStarFront) els.btnStarFront.textContent = isStarred ? '★' : '☆';
      if (els.btnStarBack) els.btnStarBack.textContent = isStarred ? '★' : '☆';

      this.showToast(isStarred ? '⭐ 已加入生词本' : '🗑️ 已移出生词本');
    },

    playAudio() {
      if (appState.currentIndex >= appState.currentList.length) return;
      const word = appState.currentList[appState.currentIndex].word;
      if (!word || !('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'en-US';
      utter.rate = 0.92;

      if (els.momoPhoneticPill) els.momoPhoneticPill.classList.add('is-playing');
      utter.onend = () => {
        if (els.momoPhoneticPill) els.momoPhoneticPill.classList.remove('is-playing');
      };
      utter.onerror = () => {
        if (els.momoPhoneticPill) els.momoPhoneticPill.classList.remove('is-playing');
      };
      window.speechSynthesis.speak(utter);
    },

    speakCurrentSentence() {
      if (!els.sentenceEn) return;
      const text = els.sentenceEn.textContent;
      if (!text || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 0.95;
      window.speechSynthesis.speak(utter);
    },

    showToast(msg) {
      if (!els.toast) return;
      clearTimeout(toastTimer);
      els.toast.textContent = msg;
      els.toast.classList.add('is-visible');
      toastTimer = setTimeout(() => {
        els.toast.classList.remove('is-visible');
      }, 1800);
    }
  };
})();
