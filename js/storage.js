/**
 * LocalStorage Full Management & Analytics
 * Manages:
 * 1. User reading progress & settings
 * 2. Per-text study time and completion stats
 * 3. Structured Vocabulary Book (with sentence context)
 * 4. Mistakes Book (with error reasons)
 * 5. Mock Exam Answers & Scores
 */
(function() {
  const PROGRESS_KEY = 'KAOYAN_USER_PROGRESS_V4';
  const SETTINGS_KEY = 'KAOYAN_USER_SETTINGS_V1';
  const STATS_KEY = 'KAOYAN_STUDY_STATS_V2';
  const VOCAB_BOOK_KEY = 'KAOYAN_VOCAB_BOOK_V2';
  const MISTAKES_KEY = 'KAOYAN_MISTAKES_BOOK_V1';
  const ERROR_REASONS_KEY = 'KAOYAN_ERROR_REASONS_V1';
  const MOCK_ANSWERS_KEY = 'KAOYAN_MOCK_ANSWERS_V1';

  window.StorageModule = {
    // --- Progress & Settings ---
    saveProgress(state) {
      try {
        const payload = {
          year: state.year,
          textId: state.textId,
          mode: state.mode,
          practiceSubmode: state.practiceSubmode || 'step',
          stepIndex: state.stepIndex,
          theme: state.theme,
          isFullMode: state.isFullMode
        };
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(payload));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
    },

    loadProgress() {
      try {
        const saved = localStorage.getItem(PROGRESS_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {}
      return null;
    },

    saveSettings(settings) {
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      } catch (e) {}
    },

        loadSettings() {
      try {
        const s = localStorage.getItem(SETTINGS_KEY);
        if (s) {
          const obj = JSON.parse(s);
          if (obj && typeof obj === 'object') {
            obj.fontSize = Number(obj.fontSize) || 17.5;
            obj.lineHeight = Number(obj.lineHeight) || 1.85;
            obj.workspaceFontSize = Number(obj.workspaceFontSize) || 16;
            obj.workspaceLineHeight = Number(obj.workspaceLineHeight) || 1.75;
            return obj;
          }
        }
      } catch (e) {}
      return {
        fontSize: 17.5,
        lineHeight: 1.85,
        workspaceFontSize: 16,
        workspaceLineHeight: 1.75,
        showTrans: false,
        highlightLogic: false
      };
    },

    // --- Study Time & Text Stats ---
    recordTimeSpent(year, textId, seconds) {
      try {
        const stats = this.getAllStats();
        const key = `${year}_${textId}`;
        if (!stats.texts[key]) {
          stats.texts[key] = { completed: false, accuracy: null, timeSpentSec: 0, lastVisited: Date.now() };
        }
        stats.texts[key].timeSpentSec = (stats.texts[key].timeSpentSec || 0) + seconds;
        stats.texts[key].lastVisited = Date.now();
        stats.totalTimeSpentSec = (stats.totalTimeSpentSec || 0) + seconds;
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
      } catch (e) {}
    },

    markTextCompleted(year, textId, accuracy) {
      try {
        const stats = this.getAllStats();
        const key = `${year}_${textId}`;
        if (!stats.texts[key]) {
          stats.texts[key] = { completed: true, accuracy: accuracy, timeSpentSec: 0, lastVisited: Date.now() };
        } else {
          stats.texts[key].completed = true;
          if (typeof accuracy === 'number') stats.texts[key].accuracy = accuracy;
          stats.texts[key].lastVisited = Date.now();
        }
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
      } catch (e) {}
    },

    getAllStats() {
      try {
        const s = localStorage.getItem(STATS_KEY);
        if (s) return JSON.parse(s);
      } catch (e) {}
      return { totalTimeSpentSec: 0, texts: {} };
    },

    getDashboardMetrics() {
      const stats = this.getAllStats();
      const totalTexts = 56;
      let completedCount = 0;
      let totalAcc = 0;
      let accCount = 0;

      Object.values(stats.texts || {}).forEach(t => {
        if (t.completed) completedCount++;
        if (typeof t.accuracy === 'number') {
          totalAcc += t.accuracy;
          accCount++;
        }
      });

      const avgAcc = accCount > 0 ? Math.round(totalAcc / accCount) : 0;
      const vocabCount = this.getVocabBook().length;
      const mistakesCount = this.getMistakes().length;

      return {
        totalTexts,
        completedCount,
        progressPercent: Math.round((completedCount / totalTexts) * 100),
        avgAccuracy: avgAcc,
        totalTimeSpentSec: stats.totalTimeSpentSec || 0,
        vocabCount,
        mistakesCount,
        textsMap: stats.texts || {}
      };
    },

    // --- Vocabulary Book ---
    addWordToBook(word, def, sentence, year, textId) {
      try {
        const list = this.getVocabBook();
        const wLow = word.toLowerCase().trim();
        const existingIdx = list.findIndex(item => item.word.toLowerCase() === wLow);
        const item = {
          word: word.trim(),
          def: def || '',
          sentence: sentence || '',
          year: year || '',
          textId: textId || '',
          time: Date.now()
        };
        if (existingIdx >= 0) {
          list[existingIdx] = item;
        } else {
          list.push(item);
        }
        localStorage.setItem(VOCAB_BOOK_KEY, JSON.stringify(list));
        return { list, added: true };
      } catch (e) {
        return { list: [], added: false };
      }
    },

    removeWordFromBook(word) {
      try {
        let list = this.getVocabBook();
        list = list.filter(item => item.word.toLowerCase() !== word.toLowerCase().trim());
        localStorage.setItem(VOCAB_BOOK_KEY, JSON.stringify(list));
        return list;
      } catch (e) {
        return [];
      }
    },

    toggleBookmark(word, def, sentence, year, textId) {
      const isB = this.isBookmarked(word);
      if (isB) {
        this.removeWordFromBook(word);
        return { added: false };
      } else {
        return this.addWordToBook(word, def, sentence, year, textId);
      }
    },

    getVocabBook() {
      try {
        const s = localStorage.getItem(VOCAB_BOOK_KEY);
        if (s) return JSON.parse(s);
      } catch (e) {}
      return [];
    },

    isBookmarked(word) {
      const list = this.getVocabBook();
      return list.some(item => item.word.toLowerCase() === word.toLowerCase().trim());
    },

    // --- Mock Answers ---
    saveMockAnswers(year, textId, answers, isSubmitted) {
      try {
        const key = `${year}_${textId}`;
        const saved = localStorage.getItem(MOCK_ANSWERS_KEY);
        const map = saved ? JSON.parse(saved) : {};
        map[key] = { answers, isSubmitted, time: Date.now() };
        localStorage.setItem(MOCK_ANSWERS_KEY, JSON.stringify(map));
      } catch (e) {}
    },

    loadMockAnswers(year, textId) {
      try {
        const key = `${year}_${textId}`;
        const saved = localStorage.getItem(MOCK_ANSWERS_KEY);
        const map = saved ? JSON.parse(saved) : {};
        return map[key] || null;
      } catch (e) {
        return null;
      }
    },

    // --- Mistakes Book ---
    saveMistake(year, textId, qid, qStem, wrongOpt, correctOpt) {
      try {
        const list = this.getMistakes();
        const existingIdx = list.findIndex(m => m.qid === qid && m.year === year && m.textId === textId);
        const item = { year, textId, qid, qStem, wrongOpt, correctOpt, time: Date.now() };
        if (existingIdx >= 0) {
          list[existingIdx] = item;
        } else {
          list.push(item);
        }
        localStorage.setItem(MISTAKES_KEY, JSON.stringify(list));
      } catch (e) {}
    },

    removeMistake(year, textId, qid) {
      try {
        let list = this.getMistakes();
        list = list.filter(m => !(m.qid === qid && m.year === year && m.textId === textId));
        localStorage.setItem(MISTAKES_KEY, JSON.stringify(list));
      } catch (e) {}
    },

    getMistakes() {
      try {
        const s = localStorage.getItem(MISTAKES_KEY);
        if (s) return JSON.parse(s);
      } catch (e) {}
      return [];
    },

    // --- Error Reasons ---
    saveErrorReasons(year, textId, qid, reasonsList) {
      try {
        const key = `${year}_${textId}_${qid}`;
        const saved = localStorage.getItem(ERROR_REASONS_KEY);
        const map = saved ? JSON.parse(saved) : {};
        map[key] = reasonsList;
        localStorage.setItem(ERROR_REASONS_KEY, JSON.stringify(map));
      } catch (e) {}
    },

    loadErrorReasons(year, textId, qid) {
      try {
        const key = `${year}_${textId}_${qid}`;
        const saved = localStorage.getItem(ERROR_REASONS_KEY);
        const map = saved ? JSON.parse(saved) : {};
        return map[key] || [];
      } catch (e) {
        return [];
      }
    }
  };
})();
