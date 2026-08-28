/**
 * Kaoyan English II (2010-2026) Central Database Hub
 */
(function() {
  window.KAOYAN_DB = {
    manifest: window.KAOYAN_MANIFEST || [],
    
    getTextData: function(year, textId) {
      const yearKey = `KAOYAN_DATA_${year}`;
      const yearData = window[yearKey];
      if (!yearData) {
        console.warn(`Data for year ${year} is not loaded yet.`);
        return null;
      }
      return yearData[`text${textId}`] || null;
    },
    
    getAvailableYears: function() {
      return this.manifest.map(item => item.year);
    },
    
    getTextInfo: function(year, textId) {
      const yItem = this.manifest.find(item => item.year === Number(year));
      if (!yItem) return null;
      return yItem.texts.find(t => t.id === Number(textId)) || null;
    }
  };
})();
