/** Year-scoped script loading works on GitHub Pages and when index.html is opened locally. */
(function () {
  const cache = window.KAOYAN_PURE_DATA = window.KAOYAN_PURE_DATA || {};
  const pending = new Map();
  const base = new URL('../data/years/', document.currentScript.src);
  function entry(year) {
    return (window.KAOYAN_MANIFEST || []).find(item => item.year === Number(year));
  }
  function registerYear(year, data) {
    const item = entry(year);
    if (!item || Number(data?.year) !== item.year || !Array.isArray(data.texts) ||
        data.texts.length !== item.texts.length ||
        !item.texts.every(t => data.texts.some(d => d.text_id === t.id && Array.isArray(d.paragraphs) && Array.isArray(d.questions)))) {
      throw new Error('年度数据格式不完整');
    }
    cache[item.year] = data;
  }
  function loadYear(year) {
    const item = entry(year);
    if (!item) return Promise.reject(new Error('未收录该年份'));
    year = item.year;
    if (cache[year]) return Promise.resolve(cache[year]);
    if (pending.has(year)) return pending.get(year);
    const task = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = new URL(`${year}.js?v=${encodeURIComponent(item.version)}`, base).href;
      let settled = false;
      const finish = error => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        script.onload = script.onerror = null;
        script.remove();
        if (error) reject(error);
        else resolve(cache[year]);
      };
      const timer = setTimeout(() => finish(new Error('加载超时，请检查网络后重试')), 20000);
      script.onload = () => finish(cache[year] ? null : new Error('年度数据未正确加载'));
      script.onerror = () => finish(new Error('加载失败，请检查网络后重试'));
      document.head.appendChild(script);
    });
    const tracked = task.finally(() => pending.delete(year));
    pending.set(year, tracked);
    return tracked;
  }
  window.DataLoader = { loadYear, registerYear, peek: year => cache[Number(year)] || null };
})();
