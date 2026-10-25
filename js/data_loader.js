/** Year-scoped script loading works on GitHub Pages and when index.html is opened locally. */
(function () {
  const cache = window.KAOYAN_PURE_DATA = window.KAOYAN_PURE_DATA || {};
  const pending = new Map();
  let scriptSelfSrc = (typeof document !== 'undefined' && document.currentScript && document.currentScript.src) ? document.currentScript.src : null;
  if (!scriptSelfSrc && typeof document !== 'undefined' && document.getElementsByTagName) {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const s = scripts[i];
      if (s && s.src && s.src.includes('data_loader.js')) {
        scriptSelfSrc = s.src;
        break;
      }
    }
  }

  let pageBase = 'http://localhost/';
  if (typeof window !== 'undefined' && window.location && window.location.href) {
    const cleanUrl = window.location.href.split('#')[0].split('?')[0];
    if (cleanUrl.endsWith('/')) {
      pageBase = cleanUrl;
    } else if (/\.[a-zA-Z0-9]+$/.test(cleanUrl)) {
      pageBase = cleanUrl.substring(0, cleanUrl.lastIndexOf('/') + 1);
    } else {
      pageBase = cleanUrl + '/';
    }
  }

  const base = scriptSelfSrc
    ? new URL('../data/years/', scriptSelfSrc)
    : new URL('data/years/', pageBase);
  const vocabBase = scriptSelfSrc
    ? new URL('../data/', scriptSelfSrc)
    : new URL('data/', pageBase);
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

  const vocabPending = new Map();
  function loadDataScript(filename, version, checkFn) {
    if (checkFn && checkFn()) return Promise.resolve(true);
    if (vocabPending.has(filename)) return vocabPending.get(filename);
    const task = new Promise((resolve, reject) => {
      if (typeof document === 'undefined' || !document.createElement) {
        if (checkFn && checkFn()) return resolve(true);
        return resolve(false);
      }
      const vQuery = version ? `?v=${encodeURIComponent(version)}` : '';
      const primaryUrl = new URL(`${filename}${vQuery}`, vocabBase).href;
      const cdnUrl = `https://cdn.jsdelivr.net/gh/zhaoyang51/ZY_English@main/data/${filename}${vQuery}`;
      const fastlyCdnUrl = `https://fastly.jsdelivr.net/gh/zhaoyang51/ZY_English@main/data/${filename}${vQuery}`;
      const candidateUrls = [primaryUrl, cdnUrl, fastlyCdnUrl];

      let attempt = 0;
      let activeScript = null;
      let timer = null;

      function tryNext() {
        if (timer) clearTimeout(timer);
        if (activeScript) {
          activeScript.onload = activeScript.onerror = null;
          if (activeScript.remove) activeScript.remove();
          activeScript = null;
        }

        if (checkFn && checkFn()) {
          resolve(true);
          return;
        }

        if (attempt >= candidateUrls.length) {
          reject(new Error(`网络加载失败: ${filename}`));
          return;
        }

        const currentUrl = candidateUrls[attempt++];
        const script = document.createElement('script');
        script.async = true;
        script.src = currentUrl;
        activeScript = script;

        script.onload = () => {
          if (timer) clearTimeout(timer);
          if (!checkFn || checkFn()) {
            if (activeScript && activeScript.remove) activeScript.remove();
            resolve(true);
          } else {
            tryNext();
          }
        };

        script.onerror = () => {
          tryNext();
        };

        timer = setTimeout(() => {
          tryNext();
        }, attempt === 1 ? 12000 : 25000);

        (document.head || document.body || document.documentElement).appendChild(script);
      }

      tryNext();
    });
    const tracked = task.finally(() => vocabPending.delete(filename));
    vocabPending.set(filename, tracked);
    return tracked;
  }

  function loadVocabRelations() {
    return loadDataScript('vocab_relations.js', '20261007_v1', () => !!window.KAOYAN_VOCAB_RELATIONS);
  }
  function loadVocabSucheng() {
    return loadDataScript('vocab_sucheng.js', '20261021_v1', () => !!window.YUQUE_SUCHENG_VOCAB);
  }
  function loadVocabDaxue() {
    return loadDataScript('vocab_daxue.js', '20261021_v1', () => !!window.YUQUE_DAXUE_VOCAB);
  }
  function loadVocabNanxiao() {
    return loadDataScript('vocab_nanxiao.js', '20261024_v1', () => !!window.NANXIAO_SUSHUA_VOCAB);
  }

  window.DataLoader = {
    loadYear,
    registerYear,
    peek: year => cache[Number(year)] || null,
    loadVocabRelations,
    loadVocabSucheng,
    loadVocabDaxue,
    loadVocabNanxiao
  };
})();
