/**
 * LocalStorage Progress, Settings & Word Bookmarks
 */
(function() {
  const PROGRESS_KEY = 'KAOYAN_USER_PROGRESS_V3';
  const SETTINGS_KEY = 'KAOYAN_USER_SETTINGS_V1';
  const BOOKMARK_KEY = 'KAOYAN_USER_BOOKMARKS_V1';

  window.StorageModule = {
    saveProgress(state) {
      try {
        const payload = {
          year: state.year,
          textId: state.textId,
          mode: state.mode,
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
