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
          examType: state.examType || 'en2',
          year: state.year,
          textId: state.textId,
          mode: state.mode,
          lastReadingMode: state.lastReadingMode || 'practice',
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
      const manifest = window.KAOYAN_MANIFEST || [];
      const totalTexts = manifest.length > 0 ? manifest.reduce((acc, m) => acc + (m.texts ? m.texts.length : 4), 0) : 68;
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
    addWordToBook(word, def, sentence, year, textId, sid, pid) {
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
          sid: (sid !== undefined && sid !== null && sid !== '') ? Number(sid) : null,
          pid: (pid !== undefined && pid !== null && pid !== '') ? Number(pid) : null,
          time: Date.now()
        };
        if (existingIdx >= 0) {
          list[existingIdx] = Object.assign(list[existingIdx], item);
        } else {
          list.push(item);
        }
        localStorage.setItem(VOCAB_BOOK_KEY, JSON.stringify(list));
        this.updateVocabBadge();
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
        this.updateVocabBadge();
        return list;
      } catch (e) {
        return [];
      }
    },

    clearVocabBook() {
      try {
        localStorage.removeItem(VOCAB_BOOK_KEY);
        this.updateVocabBadge();
        return [];
      } catch (e) {
        return [];
      }
    },

    toggleBookmark(word, def, sentence, year, textId, sid, pid) {
      const isB = this.isBookmarked(word);
      if (isB) {
        this.removeWordFromBook(word);
        return { added: false };
      } else {
        return this.addWordToBook(word, def, sentence, year, textId, sid, pid);
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

    updateVocabBadge() {
      const list = this.getVocabBook();
      const count = list.length;
      const badge = document.getElementById('vocabBookBadge');
      if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
      }
      const countEl = document.getElementById('vocabBookTotalCount');
      if (countEl) {
        countEl.textContent = count;
      }
      window.dispatchEvent(new CustomEvent('vocabBookUpdated', { detail: { count, list } }));
    },

    exportVocabBookData(options = {}) {
      const list = this.getVocabBook();
      const format = options.format || 'json';
      let notes = {};
      try {
        const rawNotes = localStorage.getItem('KAOYAN_VOCAB_USER_NOTES_V1');
        if (rawNotes) {
          const allNotes = JSON.parse(rawNotes) || {};
          list.forEach(item => {
            const key = String(item.word || '').toLowerCase().trim();
            if (key && allNotes[key]) notes[key] = allNotes[key];
          });
        }
      } catch (e) {}

      if (format === 'txt') {
        const lines = list.map(item => {
          const defClean = String(item.def || '').replace(/[\t\r\n]+/g, ' ').trim();
          const sentClean = String(item.sentence || '').replace(/[\t\r\n]+/g, ' ').trim();
          return [item.word, defClean, sentClean].filter((v, idx) => idx === 0 || v).join('\t');
        });
        return {
          type: 'kaoyan_vocab_book',
          format: 'txt',
          count: list.length,
          content: lines.join('\n')
        };
      }

      return {
        type: 'kaoyan_vocab_book',
        version: 1,
        exportedAt: new Date().toISOString(),
        count: list.length,
        words: list,
        notes
      };
    },

    parseVocabBookImport(rawInput) {
      const stripHtml = s => String(s || '').replace(/<[^>]+>/g, '').trim();
      const normalizeItem = entry => {
        if (!entry) return null;
        if (typeof entry === 'string') {
          const w = stripHtml(entry);
          return w ? { word: w, def: '', sentence: '', year: '', textId: '', sid: null, pid: null, time: Date.now() } : null;
        }
        if (typeof entry === 'object') {
          const w = stripHtml(entry.word || entry.headword || '');
          if (!w) return null;
          return {
            word: w,
            def: stripHtml(entry.def || entry.meaning || entry.definition || ''),
            sentence: stripHtml(entry.sentence || entry.example || ''),
            year: entry.year ? String(entry.year) : '',
            textId: entry.textId ? String(entry.textId) : '',
            sid: (entry.sid !== undefined && entry.sid !== null && entry.sid !== '') ? Number(entry.sid) : null,
            pid: (entry.pid !== undefined && entry.pid !== null && entry.pid !== '') ? Number(entry.pid) : null,
            time: Number(entry.time) || Date.now()
          };
        }
        return null;
      };

      let items = [];
      let notes = null;

      if (Array.isArray(rawInput)) {
        items = rawInput.map(normalizeItem).filter(Boolean);
        return { items, notes };
      }

      if (rawInput && typeof rawInput === 'object') {
        const arr = Array.isArray(rawInput.words)
          ? rawInput.words
          : (Array.isArray(rawInput.vocabBook) ? rawInput.vocabBook : []);
        items = arr.map(normalizeItem).filter(Boolean);
        if (rawInput.notes && typeof rawInput.notes === 'object') notes = rawInput.notes;
        else if (rawInput.userNotes && typeof rawInput.userNotes === 'object') notes = rawInput.userNotes;
        return { items, notes };
      }

      const text = String(rawInput || '').trim();
      if (!text) return { items: [], notes: null };

      if (text.startsWith('{') || text.startsWith('[')) {
        try {
          const parsed = JSON.parse(text);
          return this.parseVocabBookImport(parsed);
        } catch (e) {}
      }

      const lines = text.split(/\r?\n/);
      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;

        let word = '';
        let def = '';
        let sentence = '';

        if (line.includes('\t')) {
          const cols = line.split('\t').map(stripHtml);
          word = cols[0] || '';
          def = cols[1] || '';
          sentence = cols[2] || '';
        } else if (/^[a-zA-Z][a-zA-Z\s'-]{0,48}\s*,\s*.+$/.test(line)) {
          const parts = line.split(',').map(p => stripHtml(p.replace(/^"|"$/g, '')));
          word = parts[0] || '';
          def = parts[1] || '';
          sentence = parts[2] || '';
        } else {
          const match = line.match(/^([a-zA-Z][a-zA-Z'-]*(?:\s+[a-zA-Z'-]+){0,2})(?:\s*(?:[-–—:|]|(?:\s{2,}))\s*(.+))?$/);
          if (match) {
            word = match[1].trim();
            def = (match[2] || '').trim();
          } else {
            const cjkMatch = line.match(/^([a-zA-Z][a-zA-Z'-]*)\s+((?:[a-z]+\.|[\u4e00-\u9fa5]).+)$/);
            if (cjkMatch) {
              word = cjkMatch[1].trim();
              def = cjkMatch[2].trim();
            }
          }
        }

        const norm = normalizeItem({ word, def, sentence });
        if (norm) items.push(norm);
      }

      return { items, notes };
    },

    importVocabBookData(rawInput, options = {}) {
      const mode = options.mode === 'replace' ? 'replace' : 'merge';
      const enrichFn = typeof options.enrichFn === 'function'
        ? options.enrichFn
        : (typeof window !== 'undefined' && window.VocabModule && typeof window.VocabModule.lookupWordDetails === 'function'
          ? w => window.VocabModule.lookupWordDetails(w)
          : null);

      const { items, notes } = this.parseVocabBookImport(rawInput);
      if (!items || items.length === 0) {
        return { ok: false, added: 0, updated: 0, skipped: 0, total: this.getVocabBook().length, message: '未识别到有效的生词数据，请检查文件格式或文本内容。' };
      }

      try {
        const existing = mode === 'replace' ? [] : this.getVocabBook();
        const indexByLower = new Map();
        existing.forEach((item, idx) => {
          if (item && item.word) indexByLower.set(item.word.toLowerCase().trim(), idx);
        });

        let added = 0;
        let updated = 0;
        let skipped = 0;

        items.forEach(entry => {
          const wLow = entry.word.toLowerCase().trim();
          if (!wLow) return;

          if ((!entry.def || !entry.sentence) && enrichFn) {
            const enriched = enrichFn(entry.word);
            if (enriched) {
              if (!entry.def && enriched.def) entry.def = enriched.def;
              if (!entry.sentence && enriched.sentence) entry.sentence = enriched.sentence;
              if (!entry.year && enriched.year) entry.year = String(enriched.year);
              if (!entry.textId && enriched.textId) entry.textId = String(enriched.textId);
            }
          }

          if (indexByLower.has(wLow)) {
            const idx = indexByLower.get(wLow);
            const cur = existing[idx];
            let changed = false;
            if (!cur.def && entry.def) { cur.def = entry.def; changed = true; }
            if (!cur.sentence && entry.sentence) { cur.sentence = entry.sentence; changed = true; }
            if (!cur.year && entry.year) { cur.year = entry.year; changed = true; }
            if (!cur.textId && entry.textId) { cur.textId = entry.textId; changed = true; }
            if (changed) updated++;
            else skipped++;
          } else {
            indexByLower.set(wLow, existing.length);
            existing.push(entry);
            added++;
          }
        });

        localStorage.setItem(VOCAB_BOOK_KEY, JSON.stringify(existing));

        if (notes && typeof notes === 'object') {
          let mergedNotes = {};
          if (mode !== 'replace') {
            try {
              const rawOld = localStorage.getItem('KAOYAN_VOCAB_USER_NOTES_V1');
              if (rawOld) mergedNotes = JSON.parse(rawOld) || {};
            } catch (e) {}
          }
          Object.keys(notes).forEach(k => {
            const val = String(notes[k] || '').trim();
            if (val) mergedNotes[k.toLowerCase().trim()] = val;
          });
          localStorage.setItem('KAOYAN_VOCAB_USER_NOTES_V1', JSON.stringify(mergedNotes));
        }

        this.updateVocabBadge();
        return { ok: true, added, updated, skipped, total: existing.length };
      } catch (e) {
        return { ok: false, added: 0, updated: 0, skipped: 0, total: this.getVocabBook().length, message: '保存生词本数据失败，可能是本地存储空间不足。' };
      }
    },

    // --- Vocabulary Review Preferences (View Type & Self-Test Masking) ---
    getVocabViewPreference() {
      try {
        return localStorage.getItem('KAOYAN_VOCAB_VIEW_PREF') || 'grid';
      } catch(e) {
        return 'grid';
      }
    },

    setVocabViewPreference(view) {
      try {
        localStorage.setItem('KAOYAN_VOCAB_VIEW_PREF', view);
      } catch(e) {}
    },

    getVocabMaskPreference() {
      try {
        return localStorage.getItem('KAOYAN_VOCAB_MASK_PREF') === 'true';
      } catch(e) {
        return false;
      }
    },

    setVocabMaskPreference(isMasked) {
      try {
        localStorage.setItem('KAOYAN_VOCAB_MASK_PREF', isMasked ? 'true' : 'false');
      } catch(e) {}
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
