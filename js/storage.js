/**
 * LocalStorage Progress, Settings, Word Bookmarks, Mock Scores & Error Causes
 */
(function() {
  const PROGRESS_KEY = 'KAOYAN_USER_PROGRESS_V4';
  const SETTINGS_KEY = 'KAOYAN_USER_SETTINGS_V1';
  const BOOKMARK_KEY = 'KAOYAN_USER_BOOKMARKS_V1';
  const MOCK_ANSWERS_KEY = 'KAOYAN_MOCK_ANSWERS_V1';
  const MISTAKES_KEY = 'KAOYAN_MISTAKES_BOOK_V1';
  const ERROR_REASONS_KEY = 'KAOYAN_ERROR_REASONS_V1';

  window.StorageModule = {
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
        if (s) return JSON.parse(s);
      } catch (e) {}
      return {
        fontSize: 17.5,
        lineHeight: 1.85,
        showTrans: false,
        highlightLogic: false
      };
    },

    // Mock Answers
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

    // Mistakes Book
    saveMistake(year, textId, qid, qStem, wrongOpt, correctOpt) {
      try {
        const saved = localStorage.getItem(MISTAKES_KEY);
        let list = saved ? JSON.parse(saved) : [];
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
        const saved = localStorage.getItem(MISTAKES_KEY);
        let list = saved ? JSON.parse(saved) : [];
        list = list.filter(m => !(m.qid === qid && m.year === year && m.textId === textId));
        localStorage.setItem(MISTAKES_KEY, JSON.stringify(list));
      } catch (e) {}
    },

    // Error Reasons Self-Check
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
    },

    // Word Bookmarks
    toggleBookmark(word, def) {
      try {
        const saved = localStorage.getItem(BOOKMARK_KEY);
        let list = saved ? JSON.parse(saved) : [];
        const existingIdx = list.findIndex(item => item.word.toLowerCase() === word.toLowerCase());
        let added = false;
        if (existingIdx >= 0) {
          list.splice(existingIdx, 1);
        } else {
          list.push({ word, def: def || '', time: Date.now() });
          added = true;
        }
        localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list));
        return { list, added };
      } catch (e) {
        return { list: [], added: false };
      }
    },

    isBookmarked(word) {
      try {
        const saved = localStorage.getItem(BOOKMARK_KEY);
        const list = saved ? JSON.parse(saved) : [];
        return list.some(item => item.word.toLowerCase() === word.toLowerCase());
      } catch (e) {
        return false;
      }
    }
  };
})();
