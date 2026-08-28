/**
 * LocalStorage Progress & Preferences Persistence
 */
(function() {
  const PROGRESS_KEY = 'KAOYAN_USER_PROGRESS_V3';
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
      } catch (e) {
        console.warn('LocalStorage load failed:', e);
      }
      return null;
    },

    toggleBookmark(word) {
      try {
        const saved = localStorage.getItem(BOOKMARK_KEY);
        let list = saved ? JSON.parse(saved) : [];
        if (list.includes(word)) {
          list = list.filter(w => w !== word);
        } else {
          list.push(word);
        }
        localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list));
        return list;
      } catch (e) {
        return [];
      }
    }
  };
})();
