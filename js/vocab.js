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
  const LAST_POSITION_KEY = 'KAOYAN_VOCAB_LAST_POSITION_V2';

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
    lastPosition: null,
    targetResumeWord: null,

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
      if (!appState.currentView || appState.currentView === 'home') {
        this.showHomeView();
      }

      if (typeof window !== 'undefined' && window.DataLoader && window.DataLoader.loadVocabRelations && !window.KAOYAN_VOCAB_RELATIONS) {
        window.DataLoader.loadVocabRelations().then(() => {
          if (appState.currentView === 'study' && appState.currentList && appState.currentList[appState.currentIndex]) {
            this.renderMomoCard(appState.currentList[appState.currentIndex]);
          }
        }).catch(() => {});
      }
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

      try {
        const posSaved = localStorage.getItem(LAST_POSITION_KEY);
        if (posSaved) {
          this.lastPosition = JSON.parse(posSaved);
          if (this.lastPosition) {
            if (this.lastPosition.source) appState.filters.source = this.lastPosition.source;
            if (this.lastPosition.year) appState.filters.year = this.lastPosition.year;
            if (this.lastPosition.text) appState.filters.text = this.lastPosition.text;
            if (this.lastPosition.state) appState.filters.state = this.lastPosition.state;
            if (this.lastPosition.sort) appState.filters.sort = this.lastPosition.sort;
          }
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

    saveLastPosition() {
      if (!appState.currentList || appState.currentList.length === 0) return;
      const idx = appState.currentIndex;
      const cur = appState.currentList[idx];
      if (!cur) return;
      const word = String(cur.word || cur.root || '').trim();
      const src = appState.filters.source || 'all';

      if (!this.lastPosition) {
        this.lastPosition = {
          source: src,
          year: appState.filters.year,
          text: appState.filters.text,
          state: appState.filters.state,
          sort: appState.filters.sort,
          lastWord: word,
          lastIndex: idx,
          sourcePositions: {}
        };
      }

      this.lastPosition.source = src;
      this.lastPosition.year = appState.filters.year;
      this.lastPosition.text = appState.filters.text;
      this.lastPosition.state = appState.filters.state;
      this.lastPosition.sort = appState.filters.sort;
      this.lastPosition.lastWord = word;
      this.lastPosition.lastIndex = idx;

      if (!this.lastPosition.sourcePositions) {
        this.lastPosition.sourcePositions = {};
      }
      this.lastPosition.sourcePositions[src] = {
        word: word,
        index: idx,
        year: appState.filters.year,
        text: appState.filters.text
      };

      try {
        localStorage.setItem(LAST_POSITION_KEY, JSON.stringify(this.lastPosition));
      } catch (e) {}
    },

    syncWithAppState() {
      if (this.lastPosition && this.lastPosition.source) return;
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
      this.freqMap = {};
      bank.forEach(([year, text, words]) => {
        words.forEach(([word, meaning]) => {
          appState.rawVocabData.push({
            year: String(year),
            text: String(text),
            word: String(word),
            meaning: String(meaning)
          });
          const low = String(word || '').toLowerCase().trim();
          this.freqMap[low] = (this.freqMap[low] || 0) + 1;
        });
      });
    },

    getWordFrequency(word, cur) {
      if (cur) {
        if (cur.freq) return { text: `考频 ${cur.freq}次`, num: Number(cur.freq) };
        if (cur.freqTier) return { text: cur.freqTier, num: parseInt(String(cur.freqTier).replace(/\D/g, '')) || 1 };
      }
      const wLow = String(word || '').toLowerCase().trim();
      if (window.YUQUE_SUCHENG_VOCAB) {
        const found = window.YUQUE_SUCHENG_VOCAB.find(x => x.word && x.word.toLowerCase() === wLow);
        if (found && found.freq) return { text: `考频 ${found.freq}次`, num: Number(found.freq) };
      }
      if (window.KAOYAN_VOCAB_RELATIONS && window.KAOYAN_VOCAB_RELATIONS[wLow]) {
        const rel = window.KAOYAN_VOCAB_RELATIONS[wLow];
        if (rel.sentences && rel.sentences.length > 0) {
          const sentCount = rel.sentences.length;
          const bankCount = (this.freqMap && this.freqMap[wLow]) || 1;
          const maxCount = Math.max(sentCount, bankCount);
          return { text: `考频 ${maxCount}次`, num: maxCount };
        }
      }
      const count = (this.freqMap && this.freqMap[wLow]) || 1;
      return { text: `考频 ${count}次`, num: count };
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
        <!-- MoMo Vocab Home Page (Matching User Figure 1: Pastoral Tree & Learn/Review Cards) -->
        <div class="vocab-home-frame" id="vocabHomeFrame">
          <div class="vocab-home-topbar">
            <div class="vocab-home-dict-pill" id="vocabHomeDictPill" title="点击切换词书">
              <span class="dict-icon">📖</span>
              <span class="dict-name" id="vocabHomeDictName">历年真题核心词库</span>
              <span class="dict-caret">▼</span>
            </div>
            <button class="vocab-home-btn-settings" id="vocabHomeBtnSettings" title="词书设置与生词管理">···</button>
          </div>

          <div class="vocab-home-center-stage" id="vocabHomeCenterStage">
            <div class="vocab-home-word-card" id="vocabHomeWordCard" title="点击发音">
              <h1 class="vocab-home-word" id="vocabHomeWord">Pastoral</h1>
              <div class="vocab-home-phonetic" id="vocabHomePhonetic" title="朗读发音">
                <span class="phonetic-audio-btn">🔊</span>
                <span class="phonetic-text" id="vocabHomePhoneticText">/ˈpɑːstərəl/</span>
              </div>
              <div class="vocab-home-meaning" id="vocabHomeMeaning">adj. 田园的；乡村生活的；牧人的</div>
              <button class="vocab-home-btn-refresh" id="vocabHomeBtnRefresh" title="随机换一个单词">↻ 随机换词</button>
            </div>
          </div>

          <div class="vocab-home-actions-row">
            <div class="vocab-home-card vocab-home-card-learn" id="vocabHomeCardLearn" title="点击开始新学">
              <div class="card-meta">
                <span class="card-title">Learn</span>
                <span class="card-badge">新学</span>
              </div>
              <div class="card-count" id="vocabHomeCountLearn">284</div>
              <div class="card-sub">待学习单词</div>
            </div>

            <div class="vocab-home-card vocab-home-card-review" id="vocabHomeCardReview" title="点击开始复习">
              <div class="card-meta">
                <span class="card-title">Review</span>
                <span class="card-badge">复习</span>
              </div>
              <div class="card-count" id="vocabHomeCountReview">455</div>
              <div class="card-sub">待巩固复习</div>
            </div>
          </div>

          <div class="vocab-home-bottom-nav">
            <button class="vocab-nav-item" id="vocabHomeNavDict" title="切换词库">
              <span class="nav-icon">📚</span>
              <span class="nav-label">词书</span>
            </button>
            <button class="vocab-nav-item active" id="vocabHomeNavDeck" title="今日背诵主页">
              <span class="nav-icon">🗂️</span>
              <span class="nav-label">卡片</span>
            </button>
            <button class="vocab-nav-item" id="vocabHomeNavStats" title="复习进度与统计">
              <span class="nav-icon">📈</span>
              <span class="nav-label">统计</span>
            </button>
          </div>
        </div>

        <div class="vocab-momo-frame" id="vocabMomoFrame" style="display:none">
          
          <!-- MoMo Top Bar -->
          <header class="vocab-momo-topbar">
            <div class="momo-topbar-left">
              <button class="momo-icon-btn momo-back-btn" id="vocabMomoBtnBack" title="返回主页">‹</button>
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
                <span class="momo-freq-badge" id="vocabMomoFreqBadge" style="display:none">考频 1次</span>
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

            <!-- Card 2: Collocations, Synonyms & MindChain Card (Tabs at Top, Content Below) -->
            <section class="vocab-momo-card vocab-momo-card-relations" id="vocabMomoCardRelations" style="display:none">
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

              <div class="momo-colloc-list" id="vocabMomoCollocList"></div>

              <!-- Personal Note Editor Box (Toggled by ✎+) -->
              <div class="momo-note-editor-box" id="vocabMomoNoteEditorBox" style="display:none">
                <textarea class="momo-note-textarea" id="vocabMomoNoteInput" placeholder="记录你对这个词的独特联想、易混点或助记口诀..." rows="3"></textarea>
                <div class="momo-note-actions">
                  <button class="momo-note-btn-cancel" id="vocabMomoNoteBtnCancel">取消</button>
                  <button class="momo-note-btn-save" id="vocabMomoNoteBtnSave">保存笔记</button>
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
                  <option value="frequency">🔥 考频降序 (高频优先)</option>
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

        <!-- Exam Citations Modal Sheet (Triggered by ≡) -->
        <div class="vocab-momo-sheet-overlay" id="vocabCitationsModal" style="display:none">
          <div class="momo-citations-sheet" id="vocabCitationsSheet">
            <div class="momo-sheet-header">
              <div class="momo-sheet-title">
                <span id="vocabCitationsTitle">考点关联 · 历年真题出处</span>
                <span style="font-size:12px;font-weight:normal;color:var(--momo-text-muted);margin-left:8px" id="vocabCitationsCount">共 3 处收录</span>
              </div>
              <button class="momo-sheet-close-btn" id="vocabCitationsBtnClose">✕</button>
            </div>
            <div class="momo-citations-body" id="vocabCitationsBody"></div>
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
        // Home Frame elements
        homeFrame: document.getElementById('vocabHomeFrame'),
        homeDictPill: document.getElementById('vocabHomeDictPill'),
        homeDictName: document.getElementById('vocabHomeDictName'),
        homeBtnSettings: document.getElementById('vocabHomeBtnSettings'),
        homeWordCard: document.getElementById('vocabHomeWordCard'),
        homeWordTag: document.getElementById('vocabHomeWordTag'),
        homeWord: document.getElementById('vocabHomeWord'),
        homePhonetic: document.getElementById('vocabHomePhonetic'),
        homePhoneticText: document.getElementById('vocabHomePhoneticText'),
        homeMeaning: document.getElementById('vocabHomeMeaning'),
        homeBtnRefresh: document.getElementById('vocabHomeBtnRefresh'),
        homeCardLearn: document.getElementById('vocabHomeCardLearn'),
        homeCountLearn: document.getElementById('vocabHomeCountLearn'),
        homeCardReview: document.getElementById('vocabHomeCardReview'),
        homeCountReview: document.getElementById('vocabHomeCountReview'),
        homeNavDict: document.getElementById('vocabHomeNavDict'),
        homeNavDeck: document.getElementById('vocabHomeNavDeck'),
        homeNavStats: document.getElementById('vocabHomeNavStats'),

        frame: document.getElementById('vocabMomoFrame'),
        momoWord: document.getElementById('vocabMomoWord'),
        momoCheckmark: document.getElementById('vocabMomoCheckmark'),
        momoFreqBadge: document.getElementById('vocabMomoFreqBadge'),
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
        btnRelMore: document.getElementById('vocabMomoBtnRelMore'),

        noteEditorBox: document.getElementById('vocabMomoNoteEditorBox'),
        noteInput: document.getElementById('vocabMomoNoteInput'),
        noteBtnSave: document.getElementById('vocabMomoNoteBtnSave'),
        noteBtnCancel: document.getElementById('vocabMomoNoteBtnCancel'),

        citationsModal: document.getElementById('vocabCitationsModal'),
        citationsSheet: document.getElementById('vocabCitationsSheet'),
        citationsTitle: document.getElementById('vocabCitationsTitle'),
        citationsCount: document.getElementById('vocabCitationsCount'),
        citationsBody: document.getElementById('vocabCitationsBody'),
        citationsBtnClose: document.getElementById('vocabCitationsBtnClose'),

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
      // 1. Top bar: Back Button (Returns to Home Page)
      if (els.btnBack) {
        els.btnBack.onclick = () => {
          this.showHomeView();
        };
      }

      // Home Page Events
      if (els.homeBtnRefresh) {
        els.homeBtnRefresh.onclick = (e) => {
          e.stopPropagation();
          this.pickRandomHomeWord();
        };
      }
      if (els.homePhonetic) {
        els.homePhonetic.onclick = (e) => {
          e.stopPropagation();
          this.speakWord(this.currentHomeWord || 'Pastoral');
        };
      }
      if (els.homeWordCard) {
        els.homeWordCard.onclick = () => {
          this.speakWord(this.currentHomeWord || 'Pastoral');
        };
      }

      if (els.homeCardLearn) {
        els.homeCardLearn.onclick = () => {
          this.showStudyView('new');
        };
      }
      if (els.homeCardReview) {
        els.homeCardReview.onclick = () => {
          this.showStudyView('review');
        };
      }

      if (els.homeDictPill) {
        els.homeDictPill.onclick = () => this.toggleSettingsSheet(true);
      }
      if (els.homeBtnSettings) {
        els.homeBtnSettings.onclick = () => this.toggleSettingsSheet(true);
      }
      if (els.homeNavDict) {
        els.homeNavDict.onclick = () => this.toggleSettingsSheet(true);
      }
      if (els.homeNavDeck) {
        els.homeNavDeck.onclick = () => this.showHomeView();
      }
      if (els.homeNavStats) {
        els.homeNavStats.onclick = () => this.toggleSettingsSheet(true);
      }

      // Personal Note Events
      if (els.btnNote) {
        els.btnNote.onclick = () => this.toggleNoteEditor();
      }
      if (els.noteBtnSave) {
        els.noteBtnSave.onclick = () => this.saveCurrentNote();
      }
      if (els.noteBtnCancel) {
        els.noteBtnCancel.onclick = () => {
          if (els.noteEditorBox) els.noteEditorBox.style.display = 'none';
        };
      }

      // Citations Modal Events
      if (els.btnRelMore) {
        els.btnRelMore.onclick = () => this.showCitationsModal();
      }
      if (els.citationsBtnClose) {
        els.citationsBtnClose.onclick = () => this.hideCitationsModal();
      }
      if (els.citationsModal) {
        els.citationsModal.onclick = (e) => {
          if (e.target === els.citationsModal) this.hideCitationsModal();
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

        const savedSrcPos = this.lastPosition?.sourcePositions?.[val];
        if (savedSrcPos) {
          appState.filters.year = savedSrcPos.year || 'all';
          appState.filters.text = savedSrcPos.text || 'all';
          this.targetResumeWord = savedSrcPos.word;
        } else {
          appState.filters.year = 'all';
          appState.filters.text = 'all';
          this.targetResumeWord = null;
        }

        this.populateDropdowns();
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
          this.targetResumeWord = null;
          appState.currentIndex = 0;
          if (this.lastPosition) {
            this.lastPosition.lastWord = null;
            this.lastPosition.lastIndex = 0;
            if (this.lastPosition.sourcePositions && this.lastPosition.sourcePositions[appState.filters.source]) {
              this.lastPosition.sourcePositions[appState.filters.source].word = null;
              this.lastPosition.sourcePositions[appState.filters.source].index = 0;
            }
          }
          this.applyFiltersAndRender();
          let sName = '真题顺序';
          if (appState.filters.sort === 'frequency') sName = '🔥 考频降序 (高频优先)';
          else if (appState.filters.sort === 'urgency') sName = '🚨 遗忘紧迫优先';
          else if (appState.filters.sort === 'random') sName = '🔀 随机打乱';
          this.showToast(`已切换背诵策略：${sName}`);
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

      if (els.sourceSelect) {
        els.sourceSelect.value = source;
      }

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
        }
      } else if (source === 'bookmarked') {
        if (els.filterLabel1) els.filterLabel1.textContent = '定位年份';
        if (els.filterLabel2) els.filterLabel2.textContent = '定位篇章';
        if (els.yearSelect) {
          els.yearSelect.innerHTML = '<option value="all">全部收藏年份</option>';
        }
      } else {
        // Standard All Exam Bank
        if (els.filterLabel1) els.filterLabel1.textContent = '定位年份';
        if (els.filterLabel2) els.filterLabel2.textContent = '定位篇章';
        if (els.yearSelect) {
          const years = Array.from(new Set(appState.rawVocabData.map(w => w.year))).sort((a,b) => b-a);
          els.yearSelect.innerHTML = '<option value="all">全量年份 (2010-2026)</option>' +
            years.map(y => `<option value="${y}">${y} 年真题</option>`).join('');
        }
      }

      // Restore yearSelect value
      const targetYear = appState.filters.year || 'all';
      if (els.yearSelect) {
        if (Array.from(els.yearSelect.options).some(o => o.value === targetYear)) {
          els.yearSelect.value = targetYear;
        } else {
          els.yearSelect.value = 'all';
          appState.filters.year = 'all';
        }
      }

      this.updateTextDropdown();

      // Restore textSelect value
      const targetText = appState.filters.text || 'all';
      if (els.textSelect) {
        if (Array.from(els.textSelect.options).some(o => o.value === targetText)) {
          els.textSelect.value = targetText;
        } else {
          els.textSelect.value = 'all';
          appState.filters.text = 'all';
        }
      }

      if (els.stateSelect && appState.filters.state) {
        els.stateSelect.value = appState.filters.state;
      }
      if (els.sortSelect && appState.filters.sort) {
        els.sortSelect.value = appState.filters.sort;
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
      this.showStudyView();
    },

    ensureDatasetLoading(source) {
      if (this._datasetLoading === source) return;
      this._datasetLoading = source;
      const isSucheng = source === 'yuque_sucheng';
      const name = isSucheng ? '⚡ 2-4天速成词库 (2,868词)' : '❄️ 大雪深埋词根 (876词根)';
      this.showToast(`正在加载 ${name}...`);

      const p = isSucheng
        ? window.DataLoader.loadVocabSucheng()
        : window.DataLoader.loadVocabDaxue();

      p.then(() => {
        this._datasetLoading = null;
        this.populateDropdowns();
        this.applyFiltersAndRender();
        this.updateHomeView();
        this.showToast(`已加载：${name}`);
      }).catch(err => {
        this._datasetLoading = null;
        this.showToast(`词库加载失败，请检查网络后刷新重试`);
        console.error(err);
      });
    },

    applyFiltersAndRender() {
      const { source, year, text, state, sort, search } = appState.filters;
      let list = [];

      if (source === 'yuque_sucheng') {
        if (!window.YUQUE_SUCHENG_VOCAB && typeof window !== 'undefined' && window.DataLoader && window.DataLoader.loadVocabSucheng) {
          this.ensureDatasetLoading('yuque_sucheng');
          return;
        }
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
        if (!window.YUQUE_DAXUE_VOCAB && typeof window !== 'undefined' && window.DataLoader && window.DataLoader.loadVocabDaxue) {
          this.ensureDatasetLoading('yuque_daxue');
          return;
        }
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
          const recA = appState.progress[a.word || a.root];
          const recB = appState.progress[b.word || b.root];
          const timeA = recA ? recA.nextReviewTime : 0;
          const timeB = recB ? recB.nextReviewTime : 0;
          return timeA - timeB;
        });
      } else if (sort === 'frequency') {
        list.sort((a, b) => {
          const freqA = this.getWordFrequency(a.word || a.root, a).num || 1;
          const freqB = this.getWordFrequency(b.word || b.root, b).num || 1;
          if (freqB !== freqA) {
            return freqB - freqA; // 降序：高频优先
          }
          const wordA = String(a.word || a.root || '').toLowerCase();
          const wordB = String(b.word || b.root || '').toLowerCase();
          return wordA.localeCompare(wordB);
        });
      } else if (sort === 'random') {
        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
        }
      }

      // Resolve resume position
      let targetIndex = 0;
      const targetWord = (this.targetResumeWord !== undefined && this.targetResumeWord !== null) ?
        this.targetResumeWord :
        (this.lastPosition && this.lastPosition.source === source ? this.lastPosition.lastWord :
         (this.lastPosition?.sourcePositions?.[source]?.word || null));
      this.targetResumeWord = undefined;

      const norm = s => String(s || '').trim().toLowerCase();

      if (search) {
        if (targetWord) {
          const foundIdx = list.findIndex(w => norm(w.word || w.root) === norm(targetWord));
          if (foundIdx !== -1) targetIndex = foundIdx;
          else targetIndex = 0;
        }
      } else if (targetWord) {
        const foundIdx = list.findIndex(w => norm(w.word || w.root) === norm(targetWord));
        if (foundIdx !== -1) {
          targetIndex = foundIdx;
        } else {
          const savedIdx = (this.lastPosition && this.lastPosition.source === source) ?
            this.lastPosition.lastIndex :
            (this.lastPosition?.sourcePositions?.[source]?.index ?? 0);
          if (savedIdx >= 0 && savedIdx < list.length) {
            targetIndex = savedIdx;
          }
        }
      }

      if (list.length > 0) {
        targetIndex = Math.min(Math.max(0, targetIndex), list.length - 1);
      } else {
        targetIndex = 0;
      }

      appState.currentList = list;
      appState.currentIndex = targetIndex;
      appState.isFlipped = false;

      this.updateStats();
      this.updateHomeView();
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
      let idx = appState.currentIndex;
      if (idx >= total) {
        idx = Math.max(0, total - 1);
        appState.currentIndex = idx;
      }
      const cur = appState.currentList[idx];
      if (!cur) return;
      const word = cur.word || cur.root || '';

      this.saveLastPosition();

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

      // Phonetic Resolution & Cleaning
      const ph = this.getWordPhonetic(word);
      let ipa = ph.uk || ph.us || (cur.isRoot ? '' : `/'${word}/`);
      if (ipa) {
        ipa = ipa.replace(/\"/g, "'").replace(/\/+/g, '/').replace(/^\/+|\/+$/g, '');
        ipa = `/'${ipa.replace(/^'+|'+$/g, '')}/`;
      }
      if (els.momoPhoneticText) {
        els.momoPhoneticText.textContent = ipa ? `英 🔊 ${ipa}` : `🔊 发音`;
      }

      // Exam Frequency Badge on the right of the word
      const freqInfo = this.getWordFrequency(word, cur);
      if (els.momoFreqBadge) {
        els.momoFreqBadge.textContent = freqInfo.text;
        els.momoFreqBadge.classList.toggle('high-freq', freqInfo.num >= 3);
        els.momoFreqBadge.style.display = 'inline-flex';
      }

      // Word Title (Do not split syllables per user request)
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
          els.momoWord.textContent = word;
        }
      }

      // Personal Note indicator update
      const userNotes = this.loadUserNotes();
      const hasNote = Boolean(userNotes[word.toLowerCase()]);
      if (els.btnNote) els.btnNote.classList.toggle('has-note', hasNote);
      if (els.noteEditorBox) els.noteEditorBox.style.display = 'none';

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
      const { phrases, synonyms, lookalikes, mindChain, cur } = appState.currentRelationsData;
      const tab = appState.activeRelationTab;
      const word = (cur && (cur.word || cur.root)) || '';
      const userNotes = this.loadUserNotes();
      const userNote = userNotes[word.toLowerCase()] || '';

      if (els.btnNote) {
        els.btnNote.classList.toggle('has-note', Boolean(userNote));
      }

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
        let notePart = '';
        if (userNote) {
          notePart = `
            <div class="momo-user-note-card">
              <div class="momo-user-note-title">
                <span>📝 我的专属笔记</span>
                <button class="momo-note-mini-btn" id="vocabMomoBtnEditNote">编辑</button>
              </div>
              <div class="momo-user-note-text">${this.escapeHtml(userNote)}</div>
            </div>
          `;
        }
        if (mindChain) {
          html = `${notePart}<div class="momo-mindchain-text">${mindChain}</div>`;
        } else if (userNote) {
          html = notePart;
        } else {
          html = '<div style="color:var(--momo-text-muted);font-size:13.5px;padding:8px 0">暂无思维链路推导，可点击右上角 ✎+ 添加专属笔记</div>';
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

      const editBtn = els.collocList.querySelector('#vocabMomoBtnEditNote');
      if (editBtn) {
        editBtn.onclick = () => this.toggleNoteEditor();
      }
    },

    flipCard(showBack) {
      if (appState.currentView !== 'study' && els.frame && els.frame.style.display === 'none') {
        this.showStudyView();
      }
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
      if (appState.currentView !== 'study' && els.frame && els.frame.style.display === 'none') {
        this.showStudyView();
      }
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

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },

    loadUserNotes() {
      try {
        const raw = localStorage.getItem('KAOYAN_VOCAB_USER_NOTES_V1');
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    },

    saveUserNotes(notes) {
      try {
        localStorage.setItem('KAOYAN_VOCAB_USER_NOTES_V1', JSON.stringify(notes || {}));
      } catch (e) {}
    },

    toggleNoteEditor() {
      if (!els.noteEditorBox) return;
      const isVisible = els.noteEditorBox.style.display !== 'none';
      if (isVisible) {
        els.noteEditorBox.style.display = 'none';
      } else {
        const cur = appState.currentList[appState.currentIndex];
        const word = (cur && (cur.word || cur.root)) || '';
        const notes = this.loadUserNotes();
        if (els.noteInput) {
          els.noteInput.value = notes[word.toLowerCase()] || '';
        }
        els.noteEditorBox.style.display = 'flex';
        if (els.noteInput) {
          setTimeout(() => els.noteInput.focus(), 80);
        }
      }
    },

    saveCurrentNote() {
      if (!els.noteInput) return;
      const cur = appState.currentList[appState.currentIndex];
      const word = (cur && (cur.word || cur.root)) || '';
      if (!word) return;

      const txt = els.noteInput.value.trim();
      const notes = this.loadUserNotes();
      if (txt) {
        notes[word.toLowerCase()] = txt;
      } else {
        delete notes[word.toLowerCase()];
      }
      this.saveUserNotes(notes);
      this.showToast(txt ? '📝 个人笔记已保存' : '已清除个人笔记');
      if (els.noteEditorBox) els.noteEditorBox.style.display = 'none';
      this.updateRelationsTabDisplay();
    },

    showCitationsModal() {
      if (!appState.currentList || appState.currentList.length === 0) return;
      const cur = appState.currentList[appState.currentIndex];
      if (!cur) return;
      const word = String(cur.word || cur.root || '').trim();
      const low = word.toLowerCase();

      if (els.citationsTitle) els.citationsTitle.textContent = `考点关联 · ${word}`;

      const rel = (window.KAOYAN_VOCAB_RELATIONS && window.KAOYAN_VOCAB_RELATIONS[low]) || {};
      const sentences = rel.sentences || [];
      const occurrences = (appState.rawVocabData || []).filter(item => {
        return (item.word || '').toLowerCase() === low;
      });
      const phrases = rel.phrases || [];

      let totalCount = Math.max(sentences.length, occurrences.length);
      if (els.citationsCount) {
        els.citationsCount.textContent = `历年真题收录 ${totalCount} 处`;
      }

      let html = '';

      if (sentences.length > 0) {
        html += `<div style="font-size:13px;font-weight:700;color:var(--momo-text-muted);margin:4px 0 8px 0">📖 真题考查原句与语境</div>`;
        const cleanWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`(\\b${cleanWord}\\b|\\b${cleanWord}s\\b|\\b${cleanWord}ed\\b|\\b${cleanWord}ing\\b)`, 'gi');

        sentences.forEach(s => {
          const highlightedEn = (s.text || '').replace(re, '<span class="vocab-exam-hl">$1</span>');
          html += `
            <div class="vocab-citation-card">
              <div class="vocab-citation-prov">🏛️ ${s.prov || (s.year + ' 年 · Text ' + s.textId)}</div>
              <div class="vocab-citation-en">${highlightedEn}</div>
              <div class="vocab-citation-zh">${s.translation || ''}</div>
            </div>
          `;
        });
      }

      if (occurrences.length > 0) {
        const otherOccs = occurrences.filter(occ => !sentences.some(s => String(s.year) === String(occ.year) && String(s.textId) === String(occ.text.replace(/\D/g, ''))));
        if (otherOccs.length > 0) {
          html += `<div style="font-size:13px;font-weight:700;color:var(--momo-text-muted);margin:12px 0 8px 0">📌 历年真题试卷考点分布</div>`;
          html += `<div style="display:flex;flex-wrap:wrap;gap:8px">`;
          otherOccs.forEach(occ => {
            html += `
              <div style="background:rgba(0,0,0,0.04);border-radius:8px;padding:6px 10px;font-size:12.5px;color:var(--momo-text-main)">
                <strong style="color:#0284c7">${occ.year} 年 ${occ.text}</strong>: ${occ.meaning}
              </div>
            `;
          });
          html += `</div>`;
        }
      }

      if (phrases.length > 0) {
        html += `<div style="font-size:13px;font-weight:700;color:var(--momo-text-muted);margin:12px 0 8px 0">🔗 真题高频核心搭配</div>`;
        html += `<div style="display:flex;flex-direction:column;gap:6px">`;
        phrases.forEach(p => {
          html += `
            <div style="display:flex;justify-content:space-between;padding:6px 10px;background:rgba(0,0,0,0.03);border-radius:8px;font-size:13px">
              <span style="font-family:Georgia,serif;font-weight:700;color:#0d9488">${p.phrase}</span>
              <span style="color:var(--momo-text-muted)">${p.def || ''} ${p.prov ? `(${p.prov})` : ''}</span>
            </div>
          `;
        });
        html += `</div>`;
      }

      if (!html) {
        html = '<div style="text-align:center;color:var(--momo-text-muted);padding:30px 0">暂无更多真题关联语料</div>';
      }

      if (els.citationsBody) els.citationsBody.innerHTML = html;
      if (els.citationsModal) els.citationsModal.style.display = 'flex';
    },

    hideCitationsModal() {
      if (els.citationsModal) els.citationsModal.style.display = 'none';
    },

    showHomeView() {
      appState.currentView = 'home';
      if (els.homeFrame) els.homeFrame.style.display = 'flex';
      if (els.frame) els.frame.style.display = 'none';
      this.updateHomeView();
    },

    showStudyView(mode) {
      appState.currentView = 'study';
      if (els.homeFrame) els.homeFrame.style.display = 'none';
      if (els.frame) els.frame.style.display = 'flex';

      if (mode === 'new') {
        const idx = appState.currentList.findIndex(item => {
          const w = item.word || item.root;
          return !appState.progress[w];
        });
        if (idx >= 0) appState.currentIndex = idx;
      } else if (mode === 'review') {
        const now = Date.now();
        const idx = appState.currentList.findIndex(item => {
          const w = item.word || item.root;
          const rec = appState.progress[w];
          return rec && rec.status !== 'mastered' && rec.nextReviewTime <= now;
        });
        if (idx >= 0) appState.currentIndex = idx;
      }

      this.renderCurrentCard();
    },

    updateHomeView() {
      const src = appState.filters.source;
      let dictTitle = '📚 历年真题核心词库';
      if (src === 'yuque_sucheng') dictTitle = '⚡ 2-4天速成词库';
      else if (src === 'yuque_daxue') dictTitle = '❄️ 大雪深埋词根';
      else if (src === 'bookmarked') dictTitle = '⭐ 我的生词本';
      if (els.homeDictName) els.homeDictName.textContent = dictTitle;

      this.pickRandomHomeWord();

      let fullItems = [];
      if (src === 'yuque_sucheng') {
        if (!window.YUQUE_SUCHENG_VOCAB && typeof window !== 'undefined' && window.DataLoader && window.DataLoader.loadVocabSucheng) {
          this.ensureDatasetLoading('yuque_sucheng');
        }
        fullItems = window.YUQUE_SUCHENG_VOCAB || [];
      } else if (src === 'yuque_daxue') {
        if (!window.YUQUE_DAXUE_VOCAB && typeof window !== 'undefined' && window.DataLoader && window.DataLoader.loadVocabDaxue) {
          this.ensureDatasetLoading('yuque_daxue');
        }
        fullItems = window.YUQUE_DAXUE_VOCAB || [];
      } else if (src === 'bookmarked') fullItems = window.StorageModule ? window.StorageModule.getVocabBook() : [];
      else fullItems = appState.rawVocabData;

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

      const learnDisplay = newCount > 0 ? newCount : (fullItems.length - masteredCount);
      const reviewDisplay = dueCount > 0 ? dueCount : (learningCount > 0 ? learningCount : Math.min(fullItems.length, 20));

      if (els.homeCountLearn) els.homeCountLearn.textContent = String(learnDisplay);
      if (els.homeCountReview) els.homeCountReview.textContent = String(reviewDisplay);
    },

    pickRandomHomeWord() {
      const bookmarked = (window.StorageModule && window.StorageModule.getVocabBook()) || [];
      let targetWord = null;
      let isFromBookmarks = false;

      if (bookmarked.length > 0) {
        const randIdx = Math.floor(Math.random() * bookmarked.length);
        targetWord = bookmarked[randIdx];
        isFromBookmarks = true;
      } else if (appState.rawVocabData && appState.rawVocabData.length > 0) {
        const randIdx = Math.floor(Math.random() * appState.rawVocabData.length);
        targetWord = appState.rawVocabData[randIdx];
      }

      if (!targetWord) {
        targetWord = { word: 'Pastoral', meaning: 'adj. 田园的；乡村生活的；牧人的' };
      }

      const w = String(targetWord.word || targetWord.root || 'Pastoral');
      let meaning = targetWord.meaning || targetWord.def || '';
      if (!meaning && window.KAOYAN_VOCAB_DICT && window.KAOYAN_VOCAB_DICT[w.toLowerCase()]) {
        meaning = `${window.KAOYAN_VOCAB_DICT[w.toLowerCase()].pos || ''} ${window.KAOYAN_VOCAB_DICT[w.toLowerCase()].def || ''}`;
      }

      if (els.homeWord) els.homeWord.textContent = w;
      if (els.homeMeaning) els.homeMeaning.textContent = meaning || '暂无释义';
      if (els.homeWordTag) {
        els.homeWordTag.textContent = '';
        els.homeWordTag.style.display = 'none';
      }

      const phon = this.getWordPhonetic(w);
      const phonStr = phon.us || phon.uk || (window.KAOYAN_VOCAB_DICT && window.KAOYAN_VOCAB_DICT[w.toLowerCase()]?.phonetic) || '';
      if (els.homePhoneticText) {
        els.homePhoneticText.textContent = phonStr ? (phonStr.startsWith('/') ? phonStr : `/${phonStr}/`) : '/ˈpɑːstərəl/';
      }

      this.currentHomeWord = w;
    },

    speakWord(word) {
      if (!word || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'en-US';
      utter.rate = 0.92;
      window.speechSynthesis.speak(utter);
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
