/**
 * Pure JSON Database Loader & Cache
 */
(function() {
  const cache = {};

  window.KAOYAN_DB = {
    async loadYear(year) {
      if (cache[year]) return cache[year];
      try {
        const res = await fetch(`data/${year}.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        cache[year] = data;
        return data;
      } catch (err) {
        console.error(`Failed to load data/${year}.json:`, err);
        return null;
      }
    },

    getTextDataSync(year, textId) {
      const yData = cache[year];
      if (!yData) return null;
      return yData.texts.find(t => t.text_id === textId) || null;
    }
  };
})();
