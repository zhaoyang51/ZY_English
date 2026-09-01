/**
 * Vocab Module: Ebbinghaus Spaced Repetition Vocabulary Flashcards Engine
 * 3,199 Reading Exam Vocabulary Words
 */
(function() {
  const STORAGE_KEY = 'KAOYAN_VOCAB_PROGRESS_V2';

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

  let appState = {
    rawVocabData: [],
    progress: {},
    backupRecord: null,
    currentList: [],
    currentIndex: 0,
    isRevealed: false,
    filters: { year: 'all', text: 'all', state: 'all', sort: 'default', search: '' },
    isInitialized: false
  };

  let els = {};

  window.VocabModule = {
    init(containerId) {
      const container = document.getElementById(containerId || 'vocabSection');
      if (!container) return;

      if (!appState.isInitialized) {
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
        <div class="vocab-filter-card">
          <div class="vocab-search-wrap">
            <span class="vocab-search-icon">🔍</span>
            <input type="text" id="vocabSearchInput" class="vocab-search-input" placeholder="快速检索：键入英文单词或中文释义...">
          </div>

          <div class="vocab-filter-grid">
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

          <div class="vocab-filter-footer">
            <div class="vocab-count-badge">
              当前范围检索到 <span id="vocabCurrentListCount" class="vocab-count-highlight">0</span> 个词汇
            </div>
            <div style="display:flex;gap:8px">
              <button id="vocabBtnResetFilter" class="toolbar-btn" style="font-size:0.82em;padding:4px 10px">🔄 重置本篇进度</button>
            </div>
          </div>
        </div>

        <div class="vocab-stats-grid">
          <div class="vocab-stat-box">
            <div class="vocab-stat-title">范围词汇</div>
            <div class="vocab-stat-num" id="vocabStatTotal">0</div>
          </div>
          <div class="vocab-stat-box stat-due">
            <div class="vocab-stat-title">今日待办</div>
            <div class="vocab-stat-num" id="vocabStatDue">0</div>
          </div>
          <div class="vocab-stat-box stat-new">
            <div class="vocab-stat-title">尚未学习</div>
            <div class="vocab-stat-num" id="vocabStatNew">0</div>
          </div>
          <div class="vocab-stat-box stat-mastered">
            <div class="vocab-stat-title">永久掌握</div>
            <div class="vocab-stat-num" id="vocabStatMastered">0</div>
          </div>
        </div>

        <div class="vocab-card-container" id="vocabCardContainer">
          <div class="vocab-card" id="vocabCard">
            <div class="vocab-card-topbar">
              <button class="vocab-audio-btn" id="vocabBtnAudio" title="播放朗读 (快捷键 A)">🔊</button>
              <span class="vocab-tag-provenance" id="vocabTagProvenance">2020 · Text 1</span>
            </div>

            <div class="vocab-card-progress">
              <span class="vocab-badge-status" id="vocabCardBadge">未学习</span>
              <span class="vocab-index-indicator"><span id="vocabCurrentIndex">0</span> / <span id="vocabTotalIndex">0</span></span>
            </div>

            <div class="vocab-word-display" id="vocabWordDisplay" title="点击翻看释义 (或按空格)">
              <h2 class="vocab-word-text" id="vocabCardWord">Loading...</h2>
            </div>

            <div class="vocab-assessment-area" id="vocabAssessmentArea">
              <div class="vocab-assessment-tip">回想释义后自评熟练度 (快捷键: ← 忘光了 ｜ ↓ 模糊 ｜ → 熟练)</div>
              <div class="vocab-grade-grid">
                <button class="vocab-grade-btn grade-btn-forgot" id="vocabBtnForgot" title="快捷键: ← (左方向键)">
                  <span class="grade-title">忘光了 (←)</span>
                  <span class="grade-subtitle" id="vocabTimeForgot">+5分钟</span>
                </button>
                <button class="vocab-grade-btn grade-btn-hard" id="vocabBtnHard" title="快捷键: ↓ (下方向键)">
                  <span class="grade-title">模糊印象 (↓)</span>
                  <span class="grade-subtitle" id="vocabTimeHard">+30分钟</span>
                </button>
                <button class="vocab-grade-btn grade-btn-good" id="vocabBtnGood" title="快捷键: → (右方向键)">
                  <span class="grade-title">熟练掌握 (→)</span>
                  <span class="grade-subtitle" id="vocabTimeGood">+12小时</span>
                </button>
              </div>
            </div>

            <div class="vocab-meaning-area" id="vocabMeaningArea">
              <div class="vocab-meaning-text" id="vocabCardMeaning"></div>
              <div class="vocab-action-row">
                <button class="vocab-btn-wrong" id="vocabBtnWrong" title="快捷键: ← (左方向键)">❌ 记错了 (←)</button>
                <button class="vocab-btn-next" id="vocabBtnNext" title="快捷键: → (右方向键)">继续下一个 (→)</button>
              </div>
            </div>
          </div>

          <div class="vocab-kbd-hint">
            快捷键：<span class="vocab-kbd">Space</span> 翻开释义 ｜ <span class="vocab-kbd">← / ↓ / →</span> 自评熟练度 ｜ <span class="vocab-kbd">→</span> 下一个 ｜ <span class="vocab-kbd">A</span> 发音
          </div>
        </div>

        <div class="vocab-empty-state" id="vocabEmptyState">
          <div class="vocab-empty-icon">🎉</div>
          <div class="vocab-empty-title">太棒了！当前范围词汇已全部复习完成！</div>
          <div class="vocab-empty-desc">您可以选择其他篇章继续背诵，或点击下方重置筛选条件。</div>
          <button class="toolbar-btn" id="vocabBtnEmptyReset" style="padding:8px 18px">查看全量词库</button>
        </div>
      `;
    },

    cacheDomElements() {
      els = {
        searchInput: document.getElementById('vocabSearchInput'),
        yearSelect: document.getElementById('vocabYearSelect'),
        textSelect: document.getElementById('vocabTextSelect'),
        stateSelect: document.getElementById('vocabStateSelect'),
        sortSelect: document.getElementById('vocabSortSelect'),
        currentListCount: document.getElementById('vocabCurrentListCount'),
        btnResetFilter: document.getElementById('vocabBtnResetFilter'),

        statTotal: document.getElementById('vocabStatTotal'),
        statDue: document.getElementById('vocabStatDue'),
        statNew: document.getElementById('vocabStatNew'),
        statMastered: document.getElementById('vocabStatMastered'),

        cardContainer: document.getElementById('vocabCardContainer'),
        card: document.getElementById('vocabCard'),
        btnAudio: document.getElementById('vocabBtnAudio'),
        tagProvenance: document.getElementById('vocabTagProvenance'),
        cardBadge: document.getElementById('vocabCardBadge'),
        currentIndex: document.getElementById('vocabCurrentIndex'),
        totalIndex: document.getElementById('vocabTotalIndex'),
        wordDisplay: document.getElementById('vocabWordDisplay'),
        cardWord: document.getElementById('vocabCardWord'),

        assessmentArea: document.getElementById('vocabAssessmentArea'),
        btnForgot: document.getElementById('vocabBtnForgot'),
        btnHard: document.getElementById('vocabBtnHard'),
        btnGood: document.getElementById('vocabBtnGood'),
        timeForgot: document.getElementById('vocabTimeForgot'),
        timeHard: document.getElementById('vocabTimeHard'),
        timeGood: document.getElementById('vocabTimeGood'),

        meaningArea: document.getElementById('vocabMeaningArea'),
        cardMeaning: document.getElementById('vocabCardMeaning'),
        btnWrong: document.getElementById('vocabBtnWrong'),
        btnNext: document.getElementById('vocabBtnNext'),

        emptyState: document.getElementById('vocabEmptyState'),
        btnEmptyReset: document.getElementById('vocabBtnEmptyReset')
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

      let debounceTimer = null;
      els.searchInput.oninput = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          appState.filters.search = els.searchInput.value.trim();
          this.applyFiltersAndRender();
        }, 200);
      };

      els.btnAudio.onclick = (e) => {
        e.stopPropagation();
        this.playAudio();
      };

      els.wordDisplay.onclick = () => {
        this.revealMeaning();
      };

      els.btnForgot.onclick = () => this.gradeWord('forgot');
      els.btnHard.onclick = () => this.gradeWord('hard');
      els.btnGood.onclick = () => this.gradeWord('good');

      els.btnWrong.onclick = () => this.markWrongAndNext();
      els.btnNext.onclick = () => this.goToNextCard();

      if (els.btnResetFilter) {
        els.btnResetFilter.onclick = () => {
          if (confirm('确认重置当前范围下单词的背诵进度吗？')) {
            appState.currentList.forEach(w => {
              delete appState.progress[w.word];
            });
            this.saveProgress();
            this.applyFiltersAndRender();
          }
        };
      }

      if (els.btnEmptyReset) {
        els.btnEmptyReset.onclick = () => {
          els.yearSelect.value = 'all';
          appState.filters.year = 'all';
          this.updateTextDropdown();
          els.textSelect.value = 'all';
          appState.filters.text = 'all';
          els.stateSelect.value = 'all';
          appState.filters.state = 'all';
          this.applyFiltersAndRender();
        };
      }

      // Keyboard shortcuts
      window.addEventListener('keydown', (e) => {
        if (!document.body.classList.contains('mode-vocab')) return;
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        if (e.code === 'Space') {
          e.preventDefault();
          this.revealMeaning();
        } else if (e.code === 'ArrowLeft' || e.key === '1') {
          e.preventDefault();
          if (appState.isRevealed) {
            this.markWrongAndNext();
          } else {
            this.gradeWord('forgot');
          }
        } else if (e.code === 'ArrowDown' || e.key === '2') {
          e.preventDefault();
          if (!appState.isRevealed) {
            this.gradeWord('hard');
          }
        } else if (e.code === 'ArrowRight' || e.key === '3' || e.key === 'Enter') {
          e.preventDefault();
          if (appState.isRevealed) {
            this.goToNextCard();
          } else {
            this.gradeWord('good');
          }
        } else if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          this.playAudio();
        }
      });
    },

    applyFiltersAndRender() {
      const { year, text, state, sort, search } = appState.filters;
      const now = Date.now();

      let filtered = appState.rawVocabData.filter(item => {
        const matchYear = year === 'all' || item.year === year;
        const matchText = text === 'all' || item.text === text;
        const searchLower = search.toLowerCase();
        const matchSearch = search === '' ||
          item.word.toLowerCase().includes(searchLower) ||
          item.meaning.includes(searchLower);
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
      appState.isRevealed = false;

      if (els.currentListCount) {
        els.currentListCount.textContent = filtered.length;
      }

      this.updateStats();
      this.renderCurrentCard();
    },

    renderCurrentCard() {
      const total = appState.currentList.length;
      appState.isRevealed = false;

      if (total === 0 || appState.currentIndex >= total) {
        if (els.cardContainer) els.cardContainer.style.display = 'none';
        if (els.emptyState) els.emptyState.style.display = 'flex';
        return;
      }

      if (els.cardContainer) els.cardContainer.style.display = 'block';
      if (els.emptyState) els.emptyState.style.display = 'none';

      const currentWordObj = appState.currentList[appState.currentIndex];

      els.assessmentArea.style.display = 'block';
      els.meaningArea.style.display = 'none';

      els.cardWord.textContent = currentWordObj.word;
      els.cardMeaning.textContent = currentWordObj.meaning;
      els.tagProvenance.textContent = `${currentWordObj.year} · ${currentWordObj.text}`;

      els.currentIndex.textContent = appState.currentIndex + 1;
      els.totalIndex.textContent = total;

      const record = appState.progress[currentWordObj.word];
      this.renderBadge(record);
      this.updateButtonsTime(record);
    },

    renderBadge(record) {
      if (!els.cardBadge) return;
      if (!record) {
        els.cardBadge.className = 'vocab-badge-status badge-new';
        els.cardBadge.textContent = '🌱 未学习';
        return;
      }
      if (record.status === 'mastered') {
        els.cardBadge.className = 'vocab-badge-status badge-mastered';
        els.cardBadge.textContent = '🏆 永久掌握';
        return;
      }
      const now = Date.now();
      if (record.nextReviewTime <= now) {
        els.cardBadge.className = 'vocab-badge-status badge-due';
        els.cardBadge.textContent = `🔥 待复习 (第 ${record.level + 1} 轮)`;
      } else {
        els.cardBadge.className = 'vocab-badge-status badge-learning';
        els.cardBadge.textContent = `📚 记忆中 (第 ${record.level + 1} 轮)`;
      }
    },

    updateButtonsTime(record) {
      const level = record ? (record.level || 0) : 0;
      if (els.timeForgot) els.timeForgot.textContent = '+5分钟';
      if (els.timeHard) {
        const nextMs = EBB_INTERVALS[Math.max(0, level)] || (30 * 60 * 1000);
        els.timeHard.textContent = `+${this.formatTimeInterval(nextMs)}`;
      }
      if (els.timeGood) {
        const nextMs = EBB_INTERVALS[Math.min(EBB_INTERVALS.length - 1, level + 1)];
        els.timeGood.textContent = `+${this.formatTimeInterval(nextMs)}`;
      }
    },

    formatTimeInterval(ms) {
      const minutes = Math.round(ms / 60000);
      if (minutes < 60) return `${minutes}分钟`;
      const hours = Math.round(minutes / 60);
      if (hours < 24) return `${hours}小时`;
      const days = Math.round(hours / 24);
      return `${days}天`;
    },

    revealMeaning() {
      appState.isRevealed = true;
      els.assessmentArea.style.display = 'none';
      els.meaningArea.style.display = 'block';
    },

    gradeWord(grade) {
      if (appState.currentIndex >= appState.currentList.length) return;
      const currentWordObj = appState.currentList[appState.currentIndex];
      const word = currentWordObj.word;
      const now = Date.now();

      let record = appState.progress[word];
      appState.backupRecord = record ? JSON.parse(JSON.stringify(record)) : null;

      if (!record) {
        record = {
          status: 'learning',
          level: 0,
          firstStudied: now,
          lastReviewed: now,
          nextReviewTime: now,
          reviewCount: 0
        };
      }

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

      // 展开释义
      this.revealMeaning();
      this.playAudio();
    },

    markWrongAndNext() {
      if (appState.currentIndex < appState.currentList.length) {
        const word = appState.currentList[appState.currentIndex].word;
        const now = Date.now();
        appState.progress[word] = {
          status: 'learning',
          level: 0,
          firstStudied: now,
          lastReviewed: now,
          nextReviewTime: now + EBB_INTERVALS[0],
          reviewCount: (appState.progress[word] ? appState.progress[word].reviewCount : 0) + 1
        };
        this.saveProgress();
      }
      this.goToNextCard();
    },

    goToNextCard() {
      appState.currentIndex++;
      this.renderCurrentCard();
    },

    playAudio() {
      if (appState.currentIndex >= appState.currentList.length) return;
      const word = appState.currentList[appState.currentIndex].word;
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'en-US';
      utter.rate = 0.92;
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
      if (els.statMastered) els.statMastered.textContent = mastered;
    }
  };
})();
