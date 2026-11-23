/**
 * English I Authentic Exam Paper Renderer & Temporary Annotator
 * Supports:
 * - Authentic exam paper dual-panel split (Left: Passage, Right: Questions)
 * - Reading Part A (Text 1-4) & Part B Heading Matching (41-45)
 * - Temporary text marking: multi-color highlighters, wavy underline, solid underline,
 *   strikethrough, single-mark edit/eraser, and one-click clear all marks.
 */
(function () {
  const ANNOTATOR_STORAGE_KEY = 'KAOYAN_EN1_MARKS_V1';
  const ANSWERS_STORAGE_PREFIX = 'KAOYAN_EN1_ANS_V1_';
  const SUBMITTED_STORAGE_PREFIX = 'KAOYAN_EN1_SUB_V1_';

  const COLORS = [
    { key: 'yellow', label: '鹅黄', hex: '#fde047' },
    { key: 'green',  label: '薄荷绿', hex: '#86efac' },
    { key: 'blue',   label: '晴空蓝', hex: '#93c5fd' },
    { key: 'pink',   label: '樱花粉', hex: '#f9a8d4' },
    { key: 'red',    label: '朱砂红', hex: '#f87171' }
  ];

  const state = {
    year: null,
    textId: null,
    mode: 'practice',
    data: null,
    tool: 'popover', // 'popover' | 'highlight' | 'wavy' | 'underline' | 'strike' | 'eraser'
    color: 'yellow',
    wavyColor: 'red',
    revealAnswers: false,
    activePartBQid: 41,
    marks: [], // [{ id, side: 'left'|'right', start, end, style, color }]
    pendingRange: null,
    editingMarkId: null
  };

  function paperKey(year, textId) {
    return `${year}_${textId}`;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatRichParagraph(rawText) {
    // Allow only explicit <u>...</u> tags from canonical exam data (e.g. 2017 Text 4)
    const placeholderOpen = '@@EN1_U_OPEN@@';
    const placeholderClose = '@@EN1_U_CLOSE@@';
    const safe = String(rawText || '')
      .replace(/<u>/gi, placeholderOpen)
      .replace(/<\/u>/gi, placeholderClose);
    return escapeHtml(safe)
      .replace(new RegExp(placeholderOpen, 'g'), '<u class="en1-exam-underlined">')
      .replace(new RegExp(placeholderClose, 'g'), '</u>');
  }

  function formatStemWithBlank(stem) {
    const escaped = escapeHtml(stem || '');
    if (/_{2,}/.test(escaped)) {
      return escaped.replace(/_{2,}/g, '<span class="en1-q-blank-line" aria-hidden="true"></span>');
    }
    return escaped;
  }

  function loadUserAnswers(year, textId) {
    try {
      const raw = localStorage.getItem(`${ANSWERS_STORAGE_PREFIX}${paperKey(year, textId)}`);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveUserAnswers(year, textId, ansObj) {
    try {
      localStorage.setItem(`${ANSWERS_STORAGE_PREFIX}${paperKey(year, textId)}`, JSON.stringify(ansObj || {}));
    } catch (e) {}
  }

  function isSubmitted(year, textId) {
    try {
      return localStorage.getItem(`${SUBMITTED_STORAGE_PREFIX}${paperKey(year, textId)}`) === 'true';
    } catch (e) {
      return false;
    }
  }

  function setSubmitted(year, textId, val) {
    try {
      if (val) localStorage.setItem(`${SUBMITTED_STORAGE_PREFIX}${paperKey(year, textId)}`, 'true');
      else localStorage.removeItem(`${SUBMITTED_STORAGE_PREFIX}${paperKey(year, textId)}`);
    } catch (e) {}
  }

  function loadMarks(year, textId) {
    try {
      const all = JSON.parse(sessionStorage.getItem(ANNOTATOR_STORAGE_KEY) || '{}');
      const list = all[paperKey(year, textId)];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function saveMarks(year, textId, marks) {
    try {
      const all = JSON.parse(sessionStorage.getItem(ANNOTATOR_STORAGE_KEY) || '{}');
      if (marks && marks.length > 0) {
        all[paperKey(year, textId)] = marks;
      } else {
        delete all[paperKey(year, textId)];
      }
      sessionStorage.setItem(ANNOTATOR_STORAGE_KEY, JSON.stringify(all));
    } catch (e) {}
  }

  // --- DOM Text-Node Offset Mapper & Safe Mark Wrapper ---

  function getMarkableRoot(side) {
    return document.getElementById(side === 'left' ? 'en1ArticleBody' : 'en1QuestionsBody');
  }

  function collectMarkableTextNodes(root) {
    const nodes = [];
    if (!root) return nodes;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || node.nodeValue.length === 0) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (p && p.closest('.en1-no-mark')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let offset = 0;
    let cur;
    while ((cur = walker.nextNode())) {
      const len = cur.nodeValue.length;
      nodes.push({ node: cur, start: offset, end: offset + len });
      offset += len;
    }
    return nodes;
  }

  function unwrapMarksInRoot(root) {
    if (!root) return;
    let guard = 0;
    while (guard++ < 50) {
      const marks = root.querySelectorAll('mark.en1-mark');
      if (!marks.length) break;
      marks.forEach(m => {
        const parent = m.parentNode;
        if (!parent) return;
        while (m.firstChild) {
          parent.insertBefore(m.firstChild, m);
        }
        parent.removeChild(m);
      });
      root.normalize();
    }
  }

  function applyMarkDescriptor(root, desc) {
    const nodes = collectMarkableTextNodes(root);
    for (let i = 0; i < nodes.length; i++) {
      const info = nodes[i];
      if (info.end <= desc.start || info.start >= desc.end) continue;
      const localStart = Math.max(0, desc.start - info.start);
      const localEnd = Math.min(info.node.nodeValue.length, desc.end - info.start);
      if (localStart >= localEnd) continue;

      let targetNode = info.node;
      if (localEnd < targetNode.nodeValue.length) {
        targetNode.splitText(localEnd);
      }
      if (localStart > 0) {
        targetNode = targetNode.splitText(localStart);
      }
      const markEl = document.createElement('mark');
      markEl.className = `en1-mark en1-mark-${desc.style} en1-color-${desc.color}`;
      markEl.setAttribute('data-mark-id', desc.id);
      markEl.title = '点击修改或删除此标记';
      targetNode.parentNode.insertBefore(markEl, targetNode);
      markEl.appendChild(targetNode);
    }
  }

  function reapplyMarksForSide(side) {
    const root = getMarkableRoot(side);
    if (!root) return;
    unwrapMarksInRoot(root);
    const sideMarks = state.marks.filter(m => m.side === side);
    sideMarks.forEach(m => applyMarkDescriptor(root, m));
    updateClearButtonBadge();
  }

  function reapplyAllMarks() {
    reapplyMarksForSide('left');
    reapplyMarksForSide('right');
  }

  function getRangeOffsetsInRoot(range, root) {
    const nodes = collectMarkableTextNodes(root);
    let startOff = null;
    let endOff = null;

    // Resolve container/offset if range boundary sits on an Element node
    function resolveBoundary(container, offset, isStart) {
      if (container.nodeType === Node.TEXT_NODE) {
        const hit = nodes.find(n => n.node === container);
        return hit ? hit.start + offset : null;
      }
      // Element node: find first/last text node inside range slice
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i].node;
        const cmp = range.comparePoint(n, 0);
        if (isStart && cmp >= 0) return nodes[i].start;
      }
      return null;
    }

    // Simpler and exact: intersect each markable text node with range
    for (let i = 0; i < nodes.length; i++) {
      const info = nodes[i];
      const nRange = document.createRange();
      nRange.selectNodeContents(info.node);
      // Check if info.node intersects range
      if (range.compareBoundaryPoints(Range.END_TO_START, nRange) >= 0) continue;
      if (range.compareBoundaryPoints(Range.START_TO_END, nRange) <= 0) continue;

      const s = (info.node === range.startContainer) ? range.startOffset : 0;
      const e = (info.node === range.endContainer) ? range.endOffset : info.node.nodeValue.length;
      const segStart = info.start + s;
      const segEnd = info.start + e;
      if (segStart < segEnd) {
        if (startOff === null || segStart < startOff) startOff = segStart;
        if (endOff === null || segEnd > endOff) endOff = segEnd;
      }
    }

    if (startOff === null || endOff === null || startOff >= endOff) return null;
    return { start: startOff, end: endOff };
  }

  function addMarkFromRange(range, style, color) {
    if (!range || range.collapsed) return false;
    const leftRoot = getMarkableRoot('left');
    const rightRoot = getMarkableRoot('right');
    let side = null;
    let root = null;
    const startNode = range.startContainer;
    if (leftRoot && leftRoot.contains(startNode)) {
      side = 'left';
      root = leftRoot;
    } else if (rightRoot && rightRoot.contains(startNode)) {
      side = 'right';
      root = rightRoot;
    }
    if (!root) return false;

    const offsets = getRangeOffsetsInRoot(range, root);
    if (!offsets) return false;

    const id = `m_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    state.marks.push({
      id,
      side,
      start: offsets.start,
      end: offsets.end,
      style: style || 'highlight',
      color: color || 'yellow'
    });
    saveMarks(state.year, state.textId, state.marks);
    reapplyMarksForSide(side);
    return true;
  }

  function removeMarksInRange(range) {
    const leftRoot = getMarkableRoot('left');
    const rightRoot = getMarkableRoot('right');
    let side = null;
    let root = null;
    if (leftRoot && leftRoot.contains(range.startContainer)) {
      side = 'left';
      root = leftRoot;
    } else if (rightRoot && rightRoot.contains(range.startContainer)) {
      side = 'right';
      root = rightRoot;
    }
    if (!root) return false;
    const offsets = getRangeOffsetsInRoot(range, root);
    if (!offsets) return false;
    const before = state.marks.length;
    state.marks = state.marks.filter(m => !(m.side === side && m.end > offsets.start && m.start < offsets.end));
    if (state.marks.length !== before) {
      saveMarks(state.year, state.textId, state.marks);
      reapplyMarksForSide(side);
      return true;
    }
    return false;
  }

  function removeMarkById(markId) {
    const target = state.marks.find(m => m.id === markId);
    if (!target) return;
    state.marks = state.marks.filter(m => m.id !== markId);
    saveMarks(state.year, state.textId, state.marks);
    reapplyMarksForSide(target.side);
  }

  function updateMarkById(markId, patch) {
    const target = state.marks.find(m => m.id === markId);
    if (!target) return;
    Object.assign(target, patch);
    saveMarks(state.year, state.textId, state.marks);
    reapplyMarksForSide(target.side);
  }

  function clearAllMarks() {
    state.marks = [];
    saveMarks(state.year, state.textId, []);
    unwrapMarksInRoot(getMarkableRoot('left'));
    unwrapMarksInRoot(getMarkableRoot('right'));
    hidePopover();
    updateClearButtonBadge();
    if (window.showToast) window.showToast('🧹 已一键清除本篇所有标记痕迹');
  }

  function updateClearButtonBadge() {
    const count = state.marks.length;
    document.querySelectorAll('.en1-clear-btn').forEach(btn => {
      btn.disabled = count === 0;
      const badge = btn.querySelector('.en1-clear-count');
      if (badge) badge.textContent = count > 0 ? ` (${count})` : '';
    });
  }

  // --- Floating Selection / Mark-Edit Popover ---

  function ensurePopover() {
    let pop = document.getElementById('en1MarkPopover');
    if (!pop) {
      pop = document.createElement('div');
      pop.id = 'en1MarkPopover';
      pop.className = 'en1-mark-popover';
      document.body.appendChild(pop);
    }
    return pop;
  }

  function hidePopover() {
    const pop = document.getElementById('en1MarkPopover');
    if (pop) pop.classList.remove('show');
    state.pendingRange = null;
    state.editingMarkId = null;
  }

  function positionPopover(pop, rect) {
    pop.classList.add('show');
    const popW = pop.offsetWidth || 320;
    const popH = pop.offsetHeight || 38;
    let left = rect.left + rect.width / 2 - popW / 2;
    left = Math.max(10, Math.min(window.innerWidth - popW - 10, left));
    let top = rect.top - popH - 10;
    if (top < 10) {
      top = rect.bottom + 10;
    }
    pop.style.left = `${Math.round(left)}px`;
    pop.style.top = `${Math.round(top)}px`;
  }

  function showSelectionPopover(range, selectedText) {
    const pop = ensurePopover();
    state.pendingRange = range.cloneRange();
    state.editingMarkId = null;

    const cleanSel = (selectedText || '').trim();
    const canLookup = cleanSel.length >= 2 && cleanSel.length <= 32 && /^[a-zA-Z][a-zA-Z\s\-’']*$/.test(cleanSel);

    pop.innerHTML = `
      ${COLORS.slice(0, 4).map(c => `
        <button type="button" class="en1-pop-swatch" data-act="mark" data-style="highlight" data-color="${c.key}" style="background:${c.hex}" title="荧光笔 · ${c.label}"></button>
      `).join('')}
      <span class="en1-pop-sep"></span>
      <button type="button" class="en1-pop-btn" data-act="mark" data-style="wavy" data-color="red" title="红色波浪线"><span style="text-decoration:underline wavy #f87171;text-underline-offset:3px">〰️红</span></button>
      <button type="button" class="en1-pop-btn" data-act="mark" data-style="wavy" data-color="blue" title="蓝色波浪线"><span style="text-decoration:underline wavy #60a5fa;text-underline-offset:3px">〰️蓝</span></button>
      <button type="button" class="en1-pop-btn" data-act="mark" data-style="underline" data-color="red" title="下划线"><span style="text-decoration:underline">U</span></button>
      <button type="button" class="en1-pop-btn" data-act="mark" data-style="strike" data-color="red" title="删除线"><span style="text-decoration:line-through">S</span></button>
      ${canLookup ? `<span class="en1-pop-sep"></span><button type="button" class="en1-pop-btn" data-act="lookup" title="查询词义">🔍 查词</button>` : ''}
      <span class="en1-pop-sep"></span>
      <button type="button" class="en1-pop-btn" data-act="erase-range" title="清除选中范围内标记">消标</button>
    `;

    positionPopover(pop, range.getBoundingClientRect());
    bindPopoverEvents(pop, cleanSel);
  }

  function showEditMarkPopover(markEl) {
    const markId = markEl.getAttribute('data-mark-id');
    const desc = state.marks.find(m => m.id === markId);
    if (!desc) return;
    const pop = ensurePopover();
    state.editingMarkId = markId;
    state.pendingRange = null;

    pop.innerHTML = `
      <span style="opacity:0.75;font-size:11px;margin-right:2px">换色:</span>
      ${COLORS.map(c => `
        <button type="button" class="en1-pop-swatch" data-act="edit-color" data-color="${c.key}" style="background:${c.hex}" title="切换为${c.label}"></button>
      `).join('')}
      <span class="en1-pop-sep"></span>
      <button type="button" class="en1-pop-btn" data-act="edit-style" data-style="highlight" title="转为荧光笔">荧光</button>
      <button type="button" class="en1-pop-btn" data-act="edit-style" data-style="wavy" title="转为波浪线">波浪</button>
      <button type="button" class="en1-pop-btn" data-act="edit-style" data-style="underline" title="转为下划线">下划</button>
      <button type="button" class="en1-pop-btn" data-act="edit-style" data-style="strike" title="转为删除线">删除线</button>
      <span class="en1-pop-sep"></span>
      <button type="button" class="en1-pop-btn" data-act="delete-mark" style="color:#fca5a5" title="删除这条标记">🗑️</button>
    `;

    positionPopover(pop, markEl.getBoundingClientRect());
    bindPopoverEvents(pop, '');
  }

  function bindPopoverEvents(pop, selectedText) {
    pop.querySelectorAll('button').forEach(btn => {
      btn.onmousedown = e => {
        e.preventDefault();
        e.stopPropagation();
      };
      btn.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        const act = btn.getAttribute('data-act');
        if (act === 'mark' && state.pendingRange) {
          addMarkFromRange(state.pendingRange, btn.getAttribute('data-style'), btn.getAttribute('data-color'));
          window.getSelection()?.removeAllRanges();
          hidePopover();
        } else if (act === 'erase-range' && state.pendingRange) {
          removeMarksInRange(state.pendingRange);
          window.getSelection()?.removeAllRanges();
          hidePopover();
        } else if (act === 'lookup' && selectedText) {
          const rect = state.pendingRange ? state.pendingRange.getBoundingClientRect() : { left: e.clientX, width: 0, top: e.clientY };
          hidePopover();
          if (window.showVocabPopup) {
            window.showVocabPopup(selectedText, rect.left + rect.width / 2, rect.top, '');
          }
        } else if (act === 'edit-color' && state.editingMarkId) {
          updateMarkById(state.editingMarkId, { color: btn.getAttribute('data-color') });
          hidePopover();
        } else if (act === 'edit-style' && state.editingMarkId) {
          updateMarkById(state.editingMarkId, { style: btn.getAttribute('data-style') });
          hidePopover();
        } else if (act === 'delete-mark' && state.editingMarkId) {
          removeMarkById(state.editingMarkId);
          hidePopover();
        }
      };
    });
  }

  // --- Toolbar HTML & Sync ---

  function buildToolbarHtml() {
    const fs = window.ReaderModule?.settings?.fontSize || 17.5;
    const lh = window.ReaderModule?.settings?.lineHeight || 1.85;
    const markCount = state.marks.length;
    const tools = [
      { id: 'popover',   label: '🖱️ 划词弹窗', title: '划词后弹出颜色与线型选择' },
      { id: 'highlight', label: '🖍️ 荧光笔',   title: '连续涂抹荧光高亮' },
      { id: 'wavy',      label: '〰️ 波浪线',   title: '连续划出波浪线' },
      { id: 'underline', label: '＿ 下划线',   title: '连续划出下划线' },
      { id: 'strike',    label: '✂️ 删除线',   title: '连续划出删除线（排除选项）' },
      { id: 'eraser',    label: '🧽 橡皮擦',   title: '点击单条标记即可删除' }
    ];

    return `
      <div class="en1-toolbar" id="en1AnnotatorToolbar">
        <div class="en1-toolbar-group">
          ${tools.map(t => `
            <button type="button" class="en1-tool-btn ${state.tool === t.id ? 'active' : ''}" data-en1-tool="${t.id}" title="${t.title}">${t.label}</button>
          `).join('')}
        </div>
        <div class="en1-toolbar-sep"></div>
        <div class="en1-toolbar-group" title="选择画笔颜色">
          ${COLORS.map(c => `
            <button type="button" class="en1-color-dot ${state.color === c.key ? 'active' : ''}" data-en1-color="${c.key}" title="${c.label}"></button>
          `).join('')}
        </div>
        <div class="en1-toolbar-sep"></div>
        <div class="en1-toolbar-group">
          <button type="button" class="en1-tool-btn en1-clear-btn" id="en1ClearMarksBtn" ${markCount === 0 ? 'disabled' : ''} title="一键清除本篇所有荧光笔、波浪线等标记痕迹">
            🧹 一键清除痕迹<span class="en1-clear-count">${markCount > 0 ? ` (${markCount})` : ''}</span>
          </button>
        </div>
        <div class="en1-toolbar-group" style="margin-left:auto">
          <button type="button" class="en1-tool-btn" id="en1FontDec" title="缩小字号">A-</button>
          <span class="font-size-badge" id="readerFontBadge">${fs}px</span>
          <button type="button" class="en1-tool-btn" id="en1FontInc" title="放大字号">A+</button>
          <button type="button" class="en1-tool-btn ${lh === 1.6 ? 'active' : ''}" data-en1-lh="1.6">紧</button>
          <button type="button" class="en1-tool-btn ${lh === 1.85 ? 'active' : ''}" data-en1-lh="1.85">适</button>
          <button type="button" class="en1-tool-btn ${lh === 2.2 ? 'active' : ''}" data-en1-lh="2.2">宽</button>
        </div>
      </div>
    `;
  }

  function syncToolbarState() {
    const bar = document.getElementById('en1AnnotatorToolbar');
    if (!bar) return;
    bar.querySelectorAll('[data-en1-tool]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-en1-tool') === state.tool);
    });
    bar.querySelectorAll('[data-en1-color]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-en1-color') === state.color);
    });
    updateClearButtonBadge();
  }

  // --- Left & Right Rendering ---

  function countWords(paragraphs) {
    let total = 0;
    (paragraphs || []).forEach(p => {
      if (p.is_blank) return;
      const clean = String(p.text || '').replace(/<[^>]+>/g, '');
      const m = clean.match(/\b[a-zA-Z0-9''-]+\b/g);
      if (m) total += m.length;
    });
    return total;
  }

  function renderReadingLeft(textObj, year) {
    const examPaper = document.getElementById('examPaper');
    if (!examPaper) return;
    const fs = window.ReaderModule?.settings?.fontSize || 17.5;
    const lh = window.ReaderModule?.settings?.lineHeight || 1.85;
    const wordCount = countWords(textObj.paragraphs);

    const parasHtml = (textObj.paragraphs || []).map(p => `
      <p class="en1-para" data-pid="${p.pid}">${formatRichParagraph(p.text)}</p>
    `).join('');

    examPaper.innerHTML = `
      ${buildToolbarHtml()}
      <div class="en1-sheet" style="font-size:${fs}px;line-height:${lh}">
        <div class="en1-paper-header">
          <div class="en1-paper-kicker">${year} 年全国硕士研究生招生考试 · 英语（一）</div>
          <div class="en1-paper-section">Section II &nbsp; Reading Comprehension</div>
          <div class="en1-paper-sub">Part A · Text ${textObj.text_id}</div>
        </div>
        <div class="en1-directions">
          <strong>Directions:</strong> Read the following text. Answer the questions below the text by choosing A, B, C or D. Mark your answers on the ANSWER SHEET.
        </div>
        <div class="en1-article-body" id="en1ArticleBody">
          ${parasHtml}
        </div>
        <div class="en1-paper-footer">
          <span>Questions ${textObj.q_range}</span>
          <span>约 ${wordCount} 词 · 支持划词荧光笔 / 波浪线标记</span>
        </div>
      </div>
    `;
  }

  function renderReadingRight(textObj, year, mode) {
    const container = document.getElementById('workspaceContent');
    if (!container) return;

    const userAns = loadUserAnswers(year, textObj.text_id);
    const submitted = isSubmitted(year, textObj.text_id);
    const showAns = submitted || mode === 'review' || state.revealAnswers;
    const answeredCount = Object.keys(userAns).length;

    let correctCount = 0;
    if (submitted) {
      textObj.questions.forEach(q => {
        if (userAns[q.qid] === q.answer) correctCount++;
      });
    }

    const qHtml = textObj.questions.map(q => {
      const pick = userAns[q.qid] || '';
      const isRight = pick === q.answer;
      let feedbackHtml = '';
      if (submitted) {
        feedbackHtml = isRight
          ? `<div class="en1-q-feedback correct en1-no-mark">✔ 回答正确（答案：${q.answer}）</div>`
          : `<div class="en1-q-feedback wrong en1-no-mark">✖ 你的选择：${pick || '未作答'} ｜ 正确答案：${q.answer}</div>`;
      } else if (showAns) {
        feedbackHtml = `<div class="en1-q-feedback reveal en1-no-mark">★ 参考答案：${q.answer}</div>`;
      }

      return `
        <div class="en1-question-block" data-qid="${q.qid}">
          <div class="en1-q-stem-row">
            <span class="en1-q-badge en1-no-mark">${q.qid}</span>
            <div class="en1-q-stem-text">${formatStemWithBlank(q.stem)}</div>
          </div>
          <div class="en1-options-list">
            ${q.options.map(opt => {
              let cls = '';
              if (showAns) {
                if (opt.key === q.answer) cls = 'correct';
                else if (submitted && pick === opt.key) cls = 'wrong';
              } else if (pick === opt.key) {
                cls = 'selected';
              }
              return `
                <div class="en1-opt-row ${cls}" data-qid="${q.qid}" data-opt="${opt.key}">
                  <span class="en1-opt-letter en1-no-mark">${opt.key}.</span>
                  <span class="en1-opt-text">${escapeHtml(opt.text)}</span>
                </div>
              `;
            }).join('')}
          </div>
          ${feedbackHtml}
        </div>
      `;
    }).join('');

    const scoreBannerHtml = submitted ? `
      <div class="en1-score-banner">
        <div>
          <strong>📊 核对结果：</strong>
          <span style="font-size:1.18em;font-weight:800;color:${correctCount >= 3 ? '#16a34a' : '#dc2626'}">${correctCount * 2} / 10 分</span>
          <span style="font-size:0.9em;color:var(--muted);margin-left:8px">（对 ${correctCount} 题 · 错 ${5 - correctCount} 题）</span>
        </div>
        <button type="button" class="btn" id="en1ResetAnsBtn" style="font-size:0.85em">重新作答</button>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="en1-sheet">
        <div class="en1-right-header">
          <div>
            <span class="en1-right-title">Questions ${textObj.q_range}</span>
            <span style="font-size:12px;color:var(--muted);margin-left:6px">(10 points)</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
            <span class="en1-progress-pill" id="en1ProgressBadge">已作答 ${answeredCount} / 5</span>
            <button type="button" class="en1-tool-btn en1-clear-btn" id="en1ClearMarksRightBtn" ${state.marks.length === 0 ? 'disabled' : ''}>
              🧹 清除痕迹<span class="en1-clear-count">${state.marks.length > 0 ? ` (${state.marks.length})` : ''}</span>
            </button>
          </div>
        </div>
        <div id="en1QuestionsBody">
          ${qHtml}
        </div>
        ${scoreBannerHtml}
        <div class="en1-action-footer">
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="btn" id="en1ResetAnsBtnFooter" style="font-size:0.86em">清空重做</button>
            <button type="button" class="btn" id="en1RevealBtn" style="font-size:0.86em">
              ${state.revealAnswers ? '🙈 隐藏答案' : '👁️ 查看答案'}
            </button>
          </div>
          <button type="button" class="btn" id="en1SubmitBtn" style="font-size:0.88em;background:var(--accent);color:#fff;border-color:var(--accent-dark);font-weight:700">
            ${submitted ? '重新作答' : '提交核对 (10分)'}
          </button>
        </div>
      </div>
    `;

    bindReadingRightEvents(textObj, year);
  }

  function bindReadingRightEvents(textObj, year) {
    const body = document.getElementById('en1QuestionsBody');
    if (body) {
      body.addEventListener('click', e => {
        const sel = window.getSelection();
        if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) return;
        if (e.target.closest('mark.en1-mark')) return;

        const row = e.target.closest('.en1-opt-row');
        if (!row) return;
        if (isSubmitted(year, textObj.text_id)) return;

        const qid = Number(row.getAttribute('data-qid'));
        const opt = row.getAttribute('data-opt');
        const userAns = loadUserAnswers(year, textObj.text_id);
        if (userAns[qid] === opt) {
          delete userAns[qid];
        } else {
          userAns[qid] = opt;
        }
        saveUserAnswers(year, textObj.text_id, userAns);

        // Toggle classes in-place so temporary marks in #en1QuestionsBody remain untouched
        const qBlock = row.closest('.en1-question-block');
        if (qBlock) {
          qBlock.querySelectorAll('.en1-opt-row').forEach(r => {
            r.classList.toggle('selected', userAns[qid] === r.getAttribute('data-opt'));
          });
        }
        const badge = document.getElementById('en1ProgressBadge');
        if (badge) badge.textContent = `已作答 ${Object.keys(userAns).length} / 5`;
      });
    }

    const clearRight = document.getElementById('en1ClearMarksRightBtn');
    if (clearRight) clearRight.onclick = () => clearAllMarks();

    const doReset = () => {
      saveUserAnswers(year, textObj.text_id, {});
      setSubmitted(year, textObj.text_id, false);
      renderReadingRight(textObj, year, state.mode);
      reapplyMarksForSide('right');
    };

    const resetBtn1 = document.getElementById('en1ResetAnsBtn');
    const resetBtn2 = document.getElementById('en1ResetAnsBtnFooter');
    if (resetBtn1) resetBtn1.onclick = doReset;
    if (resetBtn2) resetBtn2.onclick = doReset;

    const revealBtn = document.getElementById('en1RevealBtn');
    if (revealBtn) {
      revealBtn.onclick = () => {
        state.revealAnswers = !state.revealAnswers;
        renderReadingRight(textObj, year, state.mode);
        reapplyMarksForSide('right');
      };
    }

    const submitBtn = document.getElementById('en1SubmitBtn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (isSubmitted(year, textObj.text_id)) {
          doReset();
          return;
        }
        setSubmitted(year, textObj.text_id, true);
        renderReadingRight(textObj, year, state.mode);
        reapplyMarksForSide('right');
      };
    }
  }

  // --- Part B (Heading Matching) Left & Right ---

  function renderPartBLeft(pb, year) {
    const examPaper = document.getElementById('examPaper');
    if (!examPaper) return;
    const fs = window.ReaderModule?.settings?.fontSize || 17.5;
    const lh = window.ReaderModule?.settings?.lineHeight || 1.85;
    const userAns = loadUserAnswers(year, 'part_b');
    const submitted = isSubmitted(year, 'part_b');
    const showAns = submitted || state.mode === 'review' || state.revealAnswers;
    const answers = pb.answers || {};
    const wordCount = countWords(pb.paragraphs);

    const bodyHtml = (pb.paragraphs || []).map(p => {
      if (p.is_title) {
        return `<div class="en1-article-title">${escapeHtml(p.text)}</div>`;
      }
      if (p.is_blank) {
        const qid = p.qid;
        const pick = userAns[qid] || '';
        const corr = answers[qid] || '';
        const displayKey = showAns ? corr : pick;
        const displayText = displayKey && pb.options ? `[${displayKey}] ${pb.options[displayKey] || ''}` : '';
        let cls = state.activePartBQid === qid ? 'active ' : '';
        if (submitted) {
          cls += pick === corr ? 'filled correct' : 'filled wrong';
        } else if (displayKey) {
          cls += 'filled';
        }
        return `
          <div class="en1-partb-slot en1-no-mark ${cls}" data-partb-slot="${qid}" id="en1-slot-${qid}" title="点击选中第 ${qid} 题并在右侧匹配小标题">
            <span class="en1-q-badge">${qid}</span>
            <span class="en1-partb-slot-line">${escapeHtml(displayText)}</span>
          </div>
        `;
      }
      return `<p class="en1-para" data-pid="${p.pid}">${escapeHtml(p.text)}</p>`;
    }).join('');

    examPaper.innerHTML = `
      ${buildToolbarHtml()}
      <div class="en1-sheet" style="font-size:${fs}px;line-height:${lh}">
        <div class="en1-paper-header">
          <div class="en1-paper-kicker">${year} 年全国硕士研究生招生考试 · 英语（一）</div>
          <div class="en1-paper-section">Section II &nbsp; Reading Comprehension</div>
          <div class="en1-paper-sub">Part B · 新题型</div>
        </div>
        <div class="en1-directions">
          <strong>Directions:</strong> ${escapeHtml(pb.directions)}
        </div>
        <div class="en1-article-body" id="en1ArticleBody">
          ${bodyHtml}
        </div>
        <div class="en1-paper-footer">
          <span>Questions 41–45</span>
          <span>约 ${wordCount} 词 · 点击题号横线可联动右侧选框</span>
        </div>
      </div>
    `;

    examPaper.querySelectorAll('[data-partb-slot]').forEach(el => {
      el.addEventListener('click', () => {
        state.activePartBQid = Number(el.getAttribute('data-partb-slot'));
        renderPartBLeft(pb, year);
        renderPartBRight(pb, year, state.mode);
        reapplyAllMarks();
        const card = document.getElementById(`en1-pb-q-${state.activePartBQid}`);
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  function renderPartBRight(pb, year, mode) {
    const container = document.getElementById('workspaceContent');
    if (!container) return;

    const userAns = loadUserAnswers(year, 'part_b');
    const submitted = isSubmitted(year, 'part_b');
    const showAns = submitted || mode === 'review' || state.revealAnswers;
    const answers = pb.answers || {};
    const optKeys = Object.keys(pb.options || {}).sort();
    const answeredCount = Object.keys(userAns).length;

    let correctCount = 0;
    if (submitted) {
      Object.keys(answers).forEach(q => {
        if (userAns[q] === answers[q]) correctCount++;
      });
    }

    const optsHtml = optKeys.map(k => {
      const assignedQid = Object.keys(userAns).find(q => userAns[q] === k);
      const isActiveAssigned = assignedQid && Number(assignedQid) === state.activePartBQid;
      return `
        <div class="en1-partb-opt-row ${assignedQid ? 'used' : ''} ${isActiveAssigned ? 'selected-active' : ''}" data-pb-opt="${k}" title="点击将 [${k}] 填入第 ${state.activePartBQid} 题">
          <span class="en1-opt-letter en1-no-mark">[${k}]</span>
          <span class="en1-opt-text">${escapeHtml(pb.options[k])}</span>
          ${assignedQid ? `<span class="en1-no-mark" style="font-size:11px;font-weight:700;color:var(--accent);flex-shrink:0">第${assignedQid}题</span>` : ''}
        </div>
      `;
    }).join('');

    const qRowsHtml = (pb.items || []).map(item => {
      const qid = item.qid;
      const pick = userAns[qid] || '';
      const corr = answers[qid] || '';
      const isActive = state.activePartBQid === qid;

      let statusHtml = '';
      if (submitted) {
        statusHtml = pick === corr
          ? `<span class="en1-q-feedback correct" style="margin:0">✔ 正确 [${corr}]</span>`
          : `<span class="en1-q-feedback wrong" style="margin:0">✖ 错选[${pick || '空'}] · 正解[${corr}]</span>`;
      } else if (showAns) {
        statusHtml = `<span class="en1-q-feedback reveal" style="margin:0">★ 正解 [${corr}]</span>`;
      }

      return `
        <div class="en1-partb-q-row ${isActive ? 'active' : ''}" id="en1-pb-q-${qid}" data-pb-qid="${qid}">
          <div class="en1-partb-q-top">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="en1-q-badge en1-no-mark">${qid}</span>
              ${statusHtml}
            </div>
            <div class="en1-partb-pills en1-no-mark">
              ${optKeys.map(k => {
                let bCls = '';
                if (showAns && k === corr) bCls = 'correct';
                else if (submitted && pick === k && k !== corr) bCls = 'wrong';
                else if (pick === k) bCls = 'selected';
                return `<button type="button" class="en1-partb-letter-btn ${bCls}" data-pb-pick-qid="${qid}" data-pb-pick-key="${k}">${k}</button>`;
              }).join('')}
            </div>
          </div>
          <div style="font-size:0.9em;color:var(--muted);line-height:1.45">${escapeHtml(item.title || '')}</div>
        </div>
      `;
    }).join('');

    const scoreBannerHtml = submitted ? `
      <div class="en1-score-banner">
        <div>
          <strong>📊 核对结果：</strong>
          <span style="font-size:1.18em;font-weight:800;color:${correctCount >= 3 ? '#16a34a' : '#dc2626'}">${correctCount * 2} / 10 分</span>
          <span style="font-size:0.9em;color:var(--muted);margin-left:8px">（对 ${correctCount} 题 · 错 ${5 - correctCount} 题）</span>
        </div>
        <button type="button" class="btn" id="en1ResetAnsBtn" style="font-size:0.85em">重新作答</button>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="en1-sheet">
        <div class="en1-right-header">
          <div>
            <span class="en1-right-title">Part B · Questions 41–45</span>
            <span style="font-size:12px;color:var(--muted);margin-left:6px">(10 points)</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
            <span class="en1-progress-pill" id="en1ProgressBadge">已作答 ${answeredCount} / 5</span>
            <button type="button" class="en1-tool-btn en1-clear-btn" id="en1ClearMarksRightBtn" ${state.marks.length === 0 ? 'disabled' : ''}>
              🧹 清除痕迹<span class="en1-clear-count">${state.marks.length > 0 ? ` (${state.marks.length})` : ''}</span>
            </button>
          </div>
        </div>
        <div id="en1QuestionsBody">
          <div class="en1-partb-options-box">
            <div class="en1-no-mark" style="font-size:12px;font-weight:700;color:var(--muted);margin-bottom:6px">
              小标题备选项 (A–G) · 点击可直接填入当前第 ${state.activePartBQid} 题：
            </div>
            ${optsHtml}
          </div>
          <div>
            ${qRowsHtml}
          </div>
        </div>
        ${scoreBannerHtml}
        <div class="en1-action-footer">
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="btn" id="en1ResetAnsBtnFooter" style="font-size:0.86em">清空重做</button>
            <button type="button" class="btn" id="en1RevealBtn" style="font-size:0.86em">
              ${state.revealAnswers ? '🙈 隐藏答案' : '👁️ 查看答案'}
            </button>
          </div>
          <button type="button" class="btn" id="en1SubmitBtn" style="font-size:0.88em;background:var(--accent);color:#fff;border-color:var(--accent-dark);font-weight:700">
            ${submitted ? '重新作答' : '提交核对 (10分)'}
          </button>
        </div>
      </div>
    `;

    bindPartBRightEvents(pb, year);
  }

  function bindPartBRightEvents(pb, year) {
    const body = document.getElementById('en1QuestionsBody');
    if (body) {
      body.addEventListener('click', e => {
        const sel = window.getSelection();
        if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) return;
        if (e.target.closest('mark.en1-mark')) return;

        const pickBtn = e.target.closest('[data-pb-pick-qid]');
        if (pickBtn) {
          if (isSubmitted(year, 'part_b')) return;
          const qid = Number(pickBtn.getAttribute('data-pb-pick-qid'));
          const key = pickBtn.getAttribute('data-pb-pick-key');
          state.activePartBQid = qid;
          const userAns = loadUserAnswers(year, 'part_b');
          if (userAns[qid] === key) {
            delete userAns[qid];
          } else {
            userAns[qid] = key;
          }
          saveUserAnswers(year, 'part_b', userAns);
          renderPartBLeft(pb, year);
          renderPartBRight(pb, year, state.mode);
          reapplyAllMarks();
          return;
        }

        const optRow = e.target.closest('[data-pb-opt]');
        if (optRow) {
          if (isSubmitted(year, 'part_b')) return;
          const key = optRow.getAttribute('data-pb-opt');
          const userAns = loadUserAnswers(year, 'part_b');
          userAns[state.activePartBQid] = key;
          saveUserAnswers(year, 'part_b', userAns);
          const nextQ = [41, 42, 43, 44, 45].find(q => !userAns[q]);
          if (nextQ) state.activePartBQid = nextQ;
          renderPartBLeft(pb, year);
          renderPartBRight(pb, year, state.mode);
          reapplyAllMarks();
          return;
        }

        const qRow = e.target.closest('[data-pb-qid]');
        if (qRow) {
          const qid = Number(qRow.getAttribute('data-pb-qid'));
          if (state.activePartBQid !== qid) {
            state.activePartBQid = qid;
            renderPartBLeft(pb, year);
            renderPartBRight(pb, year, state.mode);
            reapplyAllMarks();
            const slot = document.getElementById(`en1-slot-${qid}`);
            if (slot) slot.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    }

    const clearRight = document.getElementById('en1ClearMarksRightBtn');
    if (clearRight) clearRight.onclick = () => clearAllMarks();

    const doReset = () => {
      saveUserAnswers(year, 'part_b', {});
      setSubmitted(year, 'part_b', false);
      renderPartBLeft(pb, year);
      renderPartBRight(pb, year, state.mode);
      reapplyAllMarks();
    };

    const resetBtn1 = document.getElementById('en1ResetAnsBtn');
    const resetBtn2 = document.getElementById('en1ResetAnsBtnFooter');
    if (resetBtn1) resetBtn1.onclick = doReset;
    if (resetBtn2) resetBtn2.onclick = doReset;

    const revealBtn = document.getElementById('en1RevealBtn');
    if (revealBtn) {
      revealBtn.onclick = () => {
        state.revealAnswers = !state.revealAnswers;
        renderPartBLeft(pb, year);
        renderPartBRight(pb, year, state.mode);
        reapplyAllMarks();
      };
    }

    const submitBtn = document.getElementById('en1SubmitBtn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (isSubmitted(year, 'part_b')) {
          doReset();
          return;
        }
        setSubmitted(year, 'part_b', true);
        renderPartBLeft(pb, year);
        renderPartBRight(pb, year, state.mode);
        reapplyAllMarks();
      };
    }
  }

  // --- Toolbar & Annotator Global Listeners ---

  function bindToolbarEvents() {
    const bar = document.getElementById('en1AnnotatorToolbar');
    if (!bar) return;

    bar.querySelectorAll('[data-en1-tool]').forEach(btn => {
      btn.onclick = () => {
        const chosen = btn.getAttribute('data-en1-tool');
        state.tool = (state.tool === chosen && chosen !== 'popover') ? 'popover' : chosen;
        syncToolbarState();
        hidePopover();
      };
    });

    bar.querySelectorAll('[data-en1-color]').forEach(btn => {
      btn.onclick = () => {
        state.color = btn.getAttribute('data-en1-color');
        if (state.tool === 'popover' || state.tool === 'eraser') {
          state.tool = 'highlight';
        }
        syncToolbarState();
      };
    });

    const clearBtn = document.getElementById('en1ClearMarksBtn');
    if (clearBtn) clearBtn.onclick = () => clearAllMarks();

    const fontDec = document.getElementById('en1FontDec');
    const fontInc = document.getElementById('en1FontInc');
    if (fontDec) {
      fontDec.onclick = () => {
        if (!window.ReaderModule) return;
        const cur = window.ReaderModule.settings.fontSize;
        if (cur > 12) {
          const step = Math.max(0.5, Number((cur * 0.05).toFixed(1)));
          window.ReaderModule.settings.fontSize = Math.max(12, Number((cur - step).toFixed(1)));
          window.ReaderModule.applySettings();
          const sheet = document.querySelector('#examPaper .en1-sheet');
          if (sheet) sheet.style.fontSize = `${window.ReaderModule.settings.fontSize}px`;
        }
      };
    }
    if (fontInc) {
      fontInc.onclick = () => {
        if (!window.ReaderModule) return;
        const cur = window.ReaderModule.settings.fontSize;
        if (cur < 32) {
          const step = Math.max(0.5, Number((cur * 0.05).toFixed(1)));
          window.ReaderModule.settings.fontSize = Math.min(32, Number((cur + step).toFixed(1)));
          window.ReaderModule.applySettings();
          const sheet = document.querySelector('#examPaper .en1-sheet');
          if (sheet) sheet.style.fontSize = `${window.ReaderModule.settings.fontSize}px`;
        }
      };
    }
    bar.querySelectorAll('[data-en1-lh]').forEach(btn => {
      btn.onclick = () => {
        if (!window.ReaderModule) return;
        const val = Number(btn.getAttribute('data-en1-lh'));
        window.ReaderModule.settings.lineHeight = val;
        window.ReaderModule.applySettings();
        const sheet = document.querySelector('#examPaper .en1-sheet');
        if (sheet) sheet.style.lineHeight = `${val}`;
        bar.querySelectorAll('[data-en1-lh]').forEach(b => b.classList.toggle('active', Number(b.getAttribute('data-en1-lh')) === val));
      };
    });
  }

  let globalAnnotatorInitialized = false;
  function ensureGlobalAnnotatorListeners() {
    if (globalAnnotatorInitialized) return;
    globalAnnotatorInitialized = true;

    document.addEventListener('mouseup', e => {
      if (!window.AppState || window.AppState.examType !== 'en1') return;
      if (e.target.closest('#en1MarkPopover') || e.target.closest('#en1AnnotatorToolbar')) return;

      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !sel.rangeCount) {
          return;
        }
        const txt = sel.toString();
        if (!txt || !txt.trim()) return;
        const range = sel.getRangeAt(0);
        const leftRoot = getMarkableRoot('left');
        const rightRoot = getMarkableRoot('right');
        const inLeft = leftRoot && leftRoot.contains(range.startContainer);
        const inRight = rightRoot && rightRoot.contains(range.startContainer);
        if (!inLeft && !inRight) return;

        if (state.tool === 'eraser') {
          removeMarksInRange(range);
          sel.removeAllRanges();
          hidePopover();
          return;
        }
        if (['highlight', 'wavy', 'underline', 'strike'].includes(state.tool)) {
          addMarkFromRange(range, state.tool, state.color);
          sel.removeAllRanges();
          hidePopover();
          return;
        }
        // Default: show floating selection popover
        showSelectionPopover(range, txt);
      }, 10);
    });

    document.addEventListener('mousedown', e => {
      if (!e.target.closest('#en1MarkPopover') && !e.target.closest('mark.en1-mark')) {
        hidePopover();
      }
    });

    document.addEventListener('click', e => {
      if (!window.AppState || window.AppState.examType !== 'en1') return;
      const markEl = e.target.closest('mark.en1-mark');
      if (!markEl) return;
      const leftRoot = getMarkableRoot('left');
      const rightRoot = getMarkableRoot('right');
      if (!(leftRoot && leftRoot.contains(markEl)) && !(rightRoot && rightRoot.contains(markEl))) return;

      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) return;

      e.stopPropagation();
      if (state.tool === 'eraser') {
        removeMarkById(markEl.getAttribute('data-mark-id'));
        hidePopover();
      } else {
        showEditMarkPopover(markEl);
      }
    });

    document.addEventListener('scroll', () => {
      if (document.getElementById('en1MarkPopover')?.classList.contains('show')) {
        hidePopover();
      }
    }, true);
  }

  window.En1PaperRenderer = {
    render(dataObj, year, textId, mode) {
      ensureGlobalAnnotatorListeners();
      hidePopover();

      state.year = Number(year);
      state.textId = textId;
      state.mode = mode || 'practice';
      state.data = dataObj;
      state.marks = loadMarks(state.year, state.textId);
      state.revealAnswers = false;

      if (textId === 'part_b') {
        state.activePartBQid = 41;
        renderPartBLeft(dataObj, state.year);
        renderPartBRight(dataObj, state.year, state.mode);
      } else {
        renderReadingLeft(dataObj, state.year);
        renderReadingRight(dataObj, state.year, state.mode);
      }

      bindToolbarEvents();
      reapplyAllMarks();

      const leftScroll = document.getElementById('leftScroll');
      const rightScroll = document.getElementById('rightScroll');
      if (leftScroll) leftScroll.scrollTop = 0;
      if (rightScroll) rightScroll.scrollTop = 0;
    },
    clearAllMarks
  };
})();
