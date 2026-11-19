/**
 * Translation Renderer: Section III Translation (英译汉)
 * Interactive Draft Canvas, Real-time Local Persistence, Scoring Rubrics & Sentence Compare
 */
(function() {
  const SIMPLE_WORDS = (window.TextTokenizer && window.TextTokenizer.SIMPLE_WORDS) || new Set([
    'an', 'the', 'this', 'that', 'these', 'those',
    'i', 'me', 'my', 'mine', 'myself',
    'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself',
    'she', 'her', 'hers', 'herself',
    'it', 'its', 'itself',
    'we', 'us', 'our', 'ours', 'ourselves',
    'they', 'them', 'their', 'theirs', 'themselves',
    'who', 'whom', 'whose', 'which', 'what', 'whatever', 'whoever',
    'and', 'or', 'but', 'nor', 'so', 'yet', 'for',
    'if', 'as', 'than', 'because', 'while', 'though', 'although', 'since', 'unless',
    'in', 'on', 'at', 'to', 'of', 'by', 'with', 'from', 'into', 'onto', 'upon',
    'about', 'over', 'under', 'up', 'down', 'out', 'off', 'through', 'between', 'among',
    'after', 'before', 'against', 'during', 'without',
    'be', 'am', 'is', 'are', 'was', 'were', 'been', 'being',
    'have', 'has', 'had', 'having',
    'do', 'does', 'did', 'done', 'doing',
    'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must',
    'not', 'no', 'yes', 'all', 'any', 'some', 'each', 'every', 'both', 'such',
    'too', 'very', 'also', 'just', 'only', 'here', 'there', 'now', 'then',
    'how', 'why', 'when', 'where', 'again', 'ever', 'never',
    "it's", "that's", "there's", "what's", "who's", "here's", "let's", "how's", "where's",
    "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't", "shouldn't", "mustn't",
    "isn't", "aren't", "wasn't", "weren't", "haven't", "hasn't", "hadn't",
    "i'm", "you're", "he's", "she's", "we're", "they're",
    "i've", "you've", "we've", "they've",
    "i'll", "you'll", "he'll", "she'll", "we'll", "they'll",
    "i'd", "you'd", "he'd", "she'd", "we'd", "they'd"
  ]);

  function isSimpleWord(w) {
    if (!w || w.length <= 1) return true;
    const lower = w.toLowerCase().replace(/[\u2018\u2019']/g, "'");
    return SIMPLE_WORDS.has(lower);
  }

  window.TextTokenizer = window.TextTokenizer || {
    SIMPLE_WORDS,
    isSimpleWord,
    tokenizeWords: function(text) {
      if (!text) return '';
      const parts = String(text).split(/(<[^>]+>)/g);
      for (let i = 0; i < parts.length; i += 2) {
        if (parts[i]) {
          parts[i] = parts[i].replace(/\b([a-zA-Z]+(?:['’][a-zA-Z]+)?)\b/g, (match) => {
            if (isSimpleWord(match)) return match;
            return `<span class="exam-word-token" data-word="${match}" title="点击查词: ${match}">${match}</span>`;
          });
        }
      }
      return parts.join('');
    }
  };

  window.TranslationRenderer = {
    tokenizeWords: function(text) {
      return window.TextTokenizer.tokenizeWords(text);
    },

    render: function(transData, year, mode) {
      if (!transData) return;
      this.currentData = transData;
      this.currentYear = year;
      this.currentMode = 'review';

      const mainLayout = document.getElementById('mainLayout');
      if (mainLayout) {
        mainLayout.classList.add('trans-single-col-review');
      }
      document.body.classList.add('has-trans-review');
      this.renderSingleColReview(transData, year);
    },

    getReviewPrefs: function() {
      try {
        const raw = localStorage.getItem('kaoyan_trans_review_prefs');
        const parsed = raw ? JSON.parse(raw) : {};
        return {
          showSlashes: parsed.showSlashes !== false,
          showLiteral: parsed.showLiteral !== false,
          showRefined: parsed.showRefined !== false,
          showPoints: parsed.showPoints !== false,
          fontSize: Number(parsed.fontSize) || 17
        };
      } catch (e) {
        return { showSlashes: true, showLiteral: true, showRefined: true, showPoints: true, fontSize: 17 };
      }
    },

    saveReviewPrefs: function(prefs) {
      try {
        localStorage.setItem('kaoyan_trans_review_prefs', JSON.stringify(prefs));
      } catch (e) {}
    },

    formatSlashedText: function(slashedText) {
      if (!slashedText) return '';
      const chunks = String(slashedText).split(/\s*\/\s*/);
      return chunks
        .map(chunk => this.tokenizeWords(chunk))
        .join(' <span class="trans-slash-sep" title="意群断句">/</span> ');
    },

    renderAlignedChunksHtml: function(slashedText, chunkTrans) {
      const enChunks = String(slashedText || '').split(/\s*\/\s*/).filter(Boolean);
      const cnChunks = String(chunkTrans || '').split(/\s*\/\s*/).filter(Boolean);
      const len = Math.max(enChunks.length, cnChunks.length);
      if (len === 0) return '';

      let colsHtml = '';
      for (let i = 0; i < len; i++) {
        const enPart = enChunks[i] || '';
        const cnPart = cnChunks[i] || '';
        const hasNext = i < len - 1;
        const slashEn = hasNext ? '<span class="trans-slash-sep" aria-hidden="true">/</span>' : '';
        const slashCn = hasNext ? '<span class="trans-slash-sep is-cn" aria-hidden="true">/</span>' : '';
        const tagHtml = (i === 0 && cnPart) ? '<span class="trans-badge-tag tag-chunk">意群</span>' : '';

        colsHtml += `
          <div class="trans-chunk-col" data-chunk-idx="${i}">
            <div class="trans-chunk-en">
              <span class="trans-chunk-en-text">${this.tokenizeWords(enPart)}</span>${slashEn}
            </div>
            <div class="trans-chunk-cn">
              ${tagHtml}<span class="trans-chunk-cn-text">${cnPart}</span>${slashCn}
            </div>
          </div>
        `;
      }
      return `<div class="trans-aligned-flow">${colsHtml}</div>`;
    },

    renderSingleColReview: function(data, year) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;

      const prefs = this.getReviewPrefs();
      const sentences = Array.isArray(data.sentences) ? data.sentences : [];

      const formatParas = (text) => {
        if (!text) return '';
        return String(text)
          .split(/\n{2,}/)
          .map(p => p.trim())
          .filter(Boolean)
          .map(p => `<p>${p}</p>`)
          .join('');
      };

      const sentsHtml = sentences.map((s) => {
        const rawEn = s.en || s.text || '';
        const hasAlignedChunks = prefs.showSlashes && s.slashed_text && s.chunk_translation;

        let sentenceAndChunksHtml = '';
        if (hasAlignedChunks) {
          sentenceAndChunksHtml = this.renderAlignedChunksHtml(s.slashed_text, s.chunk_translation);
        } else {
          const enDisplayHtml = (prefs.showSlashes && s.slashed_text)
            ? this.formatSlashedText(s.slashed_text)
            : this.tokenizeWords(rawEn);
          sentenceAndChunksHtml = `<div class="trans-review-en-line">${enDisplayHtml}</div>`;
        }

        const literalCn = s.literal_cn || '';
        const refinedCn = s.refined_cn || s.cn || s.translation || '';

        let transHtml = '';
        if (prefs.showLiteral && literalCn) {
          transHtml += `
            <div class="trans-line-row is-literal">
              <span class="trans-badge-tag tag-literal">直译</span>
              <div class="trans-line-text">${literalCn}</div>
            </div>
          `;
        }
        if (prefs.showRefined && refinedCn) {
          transHtml += `
            <div class="trans-line-row is-refined">
              <span class="trans-badge-tag tag-refined">${literalCn ? '精译' : '译文'}</span>
              <div class="trans-line-text">${refinedCn}</div>
            </div>
          `;
        }

        let syntaxItemsHtml = '';
        if (Array.isArray(s.syntax_points) && s.syntax_points.length > 0) {
          syntaxItemsHtml = s.syntax_points.map(pt => `
            <div class="trans-point-line">
              <span class="trans-point-label">${pt.label || '句式剖析'}：</span>
              <span class="trans-point-val">${pt.text || ''}</span>
            </div>
          `).join('');
        } else {
          if (s.grammar_breakdown) {
            syntaxItemsHtml += `
              <div class="trans-point-line">
                <span class="trans-point-label">语法剖析：</span>
                <span class="trans-point-val">${s.grammar_breakdown}</span>
              </div>
            `;
          }
          if (s.reassembly_notes) {
            syntaxItemsHtml += `
              <div class="trans-point-line">
                <span class="trans-point-label">重组技巧：</span>
                <span class="trans-point-val">${s.reassembly_notes}</span>
              </div>
            `;
          }
        }

        let vocabItemsHtml = '';
        if (Array.isArray(s.vocab_points) && s.vocab_points.length > 0) {
          vocabItemsHtml = s.vocab_points.map(vp => `
            <div class="trans-point-line">
              <span class="trans-vocab-term">${vp.term || ''}</span>
              <span class="trans-point-val">${vp.note || ''}</span>
            </div>
          `).join('');
        } else if (Array.isArray(s.scoring_points) && s.scoring_points.length > 0) {
          vocabItemsHtml = s.scoring_points.map(sp => `
            <div class="trans-point-line">
              <span class="trans-vocab-term">${sp.phrase || ''} (${sp.score || 0.5}分)</span>
              <span class="trans-point-val">${sp.guide || ''}</span>
            </div>
          `).join('');
        }

        const pointsBlockHtml = (prefs.showPoints && (syntaxItemsHtml || vocabItemsHtml)) ? `
          <div class="trans-review-points">
            ${syntaxItemsHtml ? `
              <div class="trans-points-group">
                <div class="trans-points-title">语法结构与句式剖析</div>
                <div class="trans-points-body">${syntaxItemsHtml}</div>
              </div>
            ` : ''}
            ${vocabItemsHtml ? `
              <div class="trans-points-group">
                <div class="trans-points-title">重点词汇与词组盘点</div>
                <div class="trans-points-body">${vocabItemsHtml}</div>
              </div>
            ` : ''}
          </div>
        ` : '';

        const paraNum = (s.pid !== undefined) ? (Number(s.pid) + 1) : 1;

        return `
          <section class="trans-paper-section" id="trans-ws-sent-${s.sid}" data-sid="${s.sid}">
            <div class="trans-section-head">
              <div class="trans-section-title-wrap">
                <span class="trans-sent-num">第 ${s.sid} 句</span>
                <span class="trans-para-pill">第 ${paraNum} 段</span>
              </div>
            </div>

            ${sentenceAndChunksHtml}

            ${transHtml ? `<div class="trans-review-trans-block">${transHtml}</div>` : ''}

            ${pointsBlockHtml}
          </section>
        `;
      }).join('');

      const fullLiteral = data.full_literal_translation || '';
      const fullRefined = data.full_refined_translation || data.reference_translation || '';

      const showFullLiteral = Boolean(prefs.showLiteral && fullLiteral);
      const showFullRefined = Boolean(prefs.showRefined && fullRefined);
      const fullTextCardHtml = (showFullLiteral || showFullRefined) ? `
        <div class="trans-paper-sheet trans-fulltext-sheet">
          <div class="trans-paper-toolbar">
            <div class="trans-paper-toolbar-left">
              <span class="trans-paper-heading">全文参考译文对照</span>
            </div>
            <div class="trans-paper-toolbar-right">
              ${fullRefined ? '<button type="button" class="trans-mini-btn" id="btnCopyFullTrans">复制全文精译</button>' : ''}
            </div>
          </div>
          <div class="trans-fulltext-body">
            ${showFullLiteral ? `
              <div class="trans-fulltext-block">
                <div class="trans-fulltext-label"><span class="trans-badge-tag tag-literal">全文直译</span></div>
                <div class="trans-fulltext-paras">${formatParas(fullLiteral)}</div>
              </div>
            ` : ''}
            ${showFullRefined ? `
              <div class="trans-fulltext-block">
                <div class="trans-fulltext-label"><span class="trans-badge-tag tag-refined">${fullLiteral ? '全文精译' : '参考译文'}</span></div>
                <div class="trans-fulltext-paras">${formatParas(fullRefined)}</div>
              </div>
            ` : ''}
          </div>
        </div>
      ` : '';

      container.innerHTML = `
        <div class="trans-review-canvas" style="--trans-fs:${prefs.fontSize}px">
          <div class="trans-paper-sheet" id="transMainPaperSheet">
            <div class="trans-paper-toolbar">
              <div class="trans-paper-toolbar-left">
                <button type="button" class="trans-paper-icon-btn" id="btnTransFullscreen" title="全屏/退出全屏阅读">⤢</button>
                <span class="trans-paper-subtitle">${year} 年英译汉深度复盘（共 ${sentences.length} 句 · 点击单词查词）</span>
              </div>
              <div class="trans-paper-toolbar-right">
                <div class="trans-font-control">
                  <button type="button" class="trans-font-btn" id="btnTransFontDec" title="缩小字号">A-</button>
                  <span class="trans-font-val" id="transFontVal">${prefs.fontSize}px</span>
                  <button type="button" class="trans-font-btn" id="btnTransFontInc" title="放大字号">A+</button>
                </div>

                <label class="trans-switch-label" title="显示或隐藏意群断句与对齐翻译">
                  <span>意群对齐</span>
                  <span class="trans-switch-track ${prefs.showSlashes ? 'is-on' : ''}" id="switchTransSlashes">
                    <span class="trans-switch-thumb"></span>
                  </span>
                </label>

                <label class="trans-switch-label" title="显示或隐藏直译对比">
                  <span>直译对照</span>
                  <span class="trans-switch-track ${prefs.showLiteral ? 'is-on' : ''}" id="switchTransLiteral">
                    <span class="trans-switch-thumb"></span>
                  </span>
                </label>

                <label class="trans-switch-label" title="显示或隐藏精译对比">
                  <span>精译对照</span>
                  <span class="trans-switch-track ${prefs.showRefined ? 'is-on' : ''}" id="switchTransRefined">
                    <span class="trans-switch-thumb"></span>
                  </span>
                </label>

                <label class="trans-switch-label" title="显示或隐藏语法与词汇要点">
                  <span>语法词汇要点</span>
                  <span class="trans-switch-track ${prefs.showPoints ? 'is-on' : ''}" id="switchTransPoints">
                    <span class="trans-switch-thumb"></span>
                  </span>
                </label>
              </div>
            </div>

            <div class="trans-paper-body">
              ${sentsHtml || '<div style="padding:32px;text-align:center;color:var(--muted)">暂无逐句解析数据</div>'}
            </div>
          </div>

          ${fullTextCardHtml}
        </div>
      `;

      const bindToggle = (id, key) => {
        const track = container.querySelector(`#${id}`);
        const label = track ? track.closest('.trans-switch-label') : null;
        if (!label) return;
        label.addEventListener('click', () => {
          const rightScroll = document.getElementById('rightScroll');
          const prevScrollTop = rightScroll ? rightScroll.scrollTop : 0;
          const next = this.getReviewPrefs();
          next[key] = !next[key];
          this.saveReviewPrefs(next);
          this.renderSingleColReview(data, year);
          const nextScroll = document.getElementById('rightScroll');
          if (nextScroll) nextScroll.scrollTop = prevScrollTop;
        });
      };
      bindToggle('switchTransSlashes', 'showSlashes');
      bindToggle('switchTransLiteral', 'showLiteral');
      bindToggle('switchTransRefined', 'showRefined');
      bindToggle('switchTransPoints', 'showPoints');

      const canvasEl = container.querySelector('.trans-review-canvas');
      const fontValEl = container.querySelector('#transFontVal');
      const updateFont = (delta) => {
        const next = this.getReviewPrefs();
        next.fontSize = Math.max(14, Math.min(24, next.fontSize + delta));
        this.saveReviewPrefs(next);
        if (canvasEl) canvasEl.style.setProperty('--trans-fs', `${next.fontSize}px`);
        if (fontValEl) fontValEl.textContent = `${next.fontSize}px`;
      };
      container.querySelector('#btnTransFontDec')?.addEventListener('click', () => updateFont(-1));
      container.querySelector('#btnTransFontInc')?.addEventListener('click', () => updateFont(1));

      const sheetEl = container.querySelector('#transMainPaperSheet');
      container.querySelector('#btnTransFullscreen')?.addEventListener('click', () => {
        if (sheetEl) sheetEl.classList.toggle('is-fullscreen');
      });

      container.querySelector('#btnCopyFullTrans')?.addEventListener('click', () => {
        if (!fullRefined) return;
        navigator.clipboard?.writeText(fullRefined).then(() => {
          if (typeof window.showToast === 'function') window.showToast('已复制全文参考精译');
        }).catch(() => {});
      });
    },

    renderLeftPanel: function(data, year) {
      const examPaper = document.getElementById('examPaper');
      if (!examPaper) return;

      const leftScroll = document.getElementById('leftScroll');
      const prevScrollTop = leftScroll ? leftScroll.scrollTop : 0;

      const fs = window.ReaderModule?.settings?.fontSize || 17.5;
      const lh = window.ReaderModule?.settings?.lineHeight || 1.85;
      const showTrans = this.getShowTrans();

      let parasHtml = '';
      const paragraphs = data.paragraphs || [{ pid: 0, text: data.source_text || '' }];

      paragraphs.forEach((p, pidx) => {
        let sentHtml = '';
        if (data.sentences && data.sentences.length > 0) {
          const pSents = data.sentences.filter(s => {
            if (s.pid !== undefined) return s.pid === pidx || (p.pid !== undefined && s.pid === p.pid);
            return p.text && s.en && p.text.includes(s.en.trim().slice(0, 25));
          });
          const list = pSents.length > 0 ? pSents : (paragraphs.length === 1 ? data.sentences : []);
          list.forEach(s => {
            const cn = s.cn || s.translation || '';
            const transHtml = (showTrans && cn) ? `<span class="sent-trans-inline">${cn}</span>` : '';
            sentHtml += `<span class="exam-sent trans-sent" id="trans-sent-${s.sid}" data-sid="${s.sid}" title="点击查看长难句拆解、参考译文与采分点">${this.tokenizeWords(s.en || s.text || '')}</span> ${transHtml} `;
          });
        } else {
          sentHtml = this.tokenizeWords(p.text || '');
          if (showTrans && p.translation) {
            sentHtml += `<div class="sent-trans-inline">${p.translation}</div>`;
          }
        }

        parasHtml += `
          <div class="exam-para" id="exam-para-${pidx}">
            <span class="para-text">${sentHtml}</span>
          </div>
        `;
      });

      examPaper.innerHTML = `
        <div class="reader-toolbar">
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">题型:</span>
            <span class="badge" style="background:var(--accent);color:#fff;padding:2px 8px;border-radius:4px;font-size:0.82em">Section III 英译汉 (15分)</span>
          </div>
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">字号:</span>
            <button class="toolbar-btn" id="btnFontDec" title="缩小文章字号 (每次 5%)">A-</button>
            <span class="font-size-badge" id="readerFontBadge">${fs}px</span>
            <button class="toolbar-btn" id="btnFontInc" title="放大文章字号 (每次 5%)">A+</button>
          </div>
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">行距:</span>
            <button class="toolbar-btn ${lh === 1.6 ? 'active' : ''}" data-lh="1.6" id="btnLhTight">紧凑</button>
            <button class="toolbar-btn ${lh === 1.85 ? 'active' : ''}" data-lh="1.85" id="btnLhNormal">舒适</button>
            <button class="toolbar-btn ${lh === 2.2 ? 'active' : ''}" data-lh="2.2" id="btnLhLoose">宽松</button>
          </div>
          <div class="toolbar-group" style="margin-left:auto;display:flex;align-items:center;gap:8px">
            <button class="toolbar-btn ${showTrans ? 'active' : ''}" id="btnToggleTrans" title="切换全文逐句中文对照">🌐 中文对照</button>
            <button class="toolbar-btn" id="btnToggleTransHelp" title="点击查看翻译答题策略">💡 考研翻译核心三步法</button>
          </div>
        </div>

        <div class="authentic-exam-sheet" style="font-size:${fs}px;line-height:${lh}">
          <div class="authentic-exam-header">
            <div class="exam-header-section-title">Section III  Translation</div>
          </div>

          <div class="authentic-directions-box">
            <div class="authentic-question-num">46.</div>
            <div class="authentic-directions-content">
              <div class="directions-en-text">
                <strong>Directions:</strong> Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)
              </div>
            </div>
          </div>

          <div class="exam-article-section authentic-trans-article">
            ${parasHtml}
          </div>
        </div>
      `;

      // Bind sentence click
      examPaper.querySelectorAll('.trans-sent').forEach(el => {
        el.addEventListener('click', (e) => {
          if (e.target.closest('.exam-word-token')) return;
          const sid = el.getAttribute('data-sid');
          this.highlightSentence(sid);
          const sObj = data.sentences && data.sentences.find(s => String(s.sid) === String(sid) || s.sid === Number(sid));
          if (sObj && typeof window.showSyntaxModal === 'function') {
            window.showSyntaxModal(sObj, data.sentences);
          }
        });
      });

      // Bind toggle translation button in left panel toolbar
      const toggleBtn = examPaper.querySelector('#btnToggleTrans');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          this.setShowTrans(!this.getShowTrans());
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, this.currentMode);
        });
      }

      // Bind strategy tip
      const tipBtn = document.getElementById('btnToggleTransHelp');
      if (tipBtn) {
        tipBtn.addEventListener('click', () => {
          this.openStrategyModal();
        });
      }

      if (leftScroll && prevScrollTop) {
        leftScroll.scrollTop = prevScrollTop;
      }

      // Font size adjustment (A- / A+)
      const decBtn = examPaper.querySelector('#btnFontDec');
      const incBtn = examPaper.querySelector('#btnFontInc');
      const badge = examPaper.querySelector('#readerFontBadge');
      const sheet = examPaper.querySelector('.authentic-exam-sheet');

      if (decBtn) {
        decBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.ReaderModule) {
            if (window.ReaderModule.settings.fontSize > 12) {
              const step = Math.max(0.5, Number((window.ReaderModule.settings.fontSize * 0.05).toFixed(1)));
              window.ReaderModule.settings.fontSize = Math.max(12, Number((window.ReaderModule.settings.fontSize - step).toFixed(1)));
              window.ReaderModule.applySettings();
              if (sheet) sheet.style.fontSize = `${window.ReaderModule.settings.fontSize}px`;
              if (badge) badge.textContent = `${window.ReaderModule.settings.fontSize}px`;
            }
          } else {
            let current = parseFloat(sheet?.style.fontSize || badge?.textContent) || 17.5;
            if (current > 12) {
              const step = Math.max(0.5, Number((current * 0.05).toFixed(1)));
              current = Math.max(12, Number((current - step).toFixed(1)));
              if (badge) badge.textContent = `${current}px`;
              if (sheet) sheet.style.fontSize = `${current}px`;
              examPaper.style.fontSize = `${current}px`;
            }
          }
        });
      }

      if (incBtn) {
        incBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.ReaderModule) {
            if (window.ReaderModule.settings.fontSize < 32) {
              const step = Math.max(0.5, Number((window.ReaderModule.settings.fontSize * 0.05).toFixed(1)));
              window.ReaderModule.settings.fontSize = Math.min(32, Number((window.ReaderModule.settings.fontSize + step).toFixed(1)));
              window.ReaderModule.applySettings();
              if (sheet) sheet.style.fontSize = `${window.ReaderModule.settings.fontSize}px`;
              if (badge) badge.textContent = `${window.ReaderModule.settings.fontSize}px`;
            }
          } else {
            let current = parseFloat(sheet?.style.fontSize || badge?.textContent) || 17.5;
            if (current < 32) {
              const step = Math.max(0.5, Number((current * 0.05).toFixed(1)));
              current = Math.min(32, Number((current + step).toFixed(1)));
              if (badge) badge.textContent = `${current}px`;
              if (sheet) sheet.style.fontSize = `${current}px`;
              examPaper.style.fontSize = `${current}px`;
            }
          }
        });
      }

      // Left panel article line height adjustment
      examPaper.querySelectorAll('[data-lh]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const lhVal = Number(btn.getAttribute('data-lh'));
          if (window.ReaderModule) {
            window.ReaderModule.settings.lineHeight = lhVal;
            window.ReaderModule.applySettings();
            if (sheet) sheet.style.lineHeight = `${lhVal}`;
          } else {
            if (sheet) sheet.style.lineHeight = `${lhVal}`;
            examPaper.style.lineHeight = `${lhVal}`;
            examPaper.querySelectorAll('[data-lh]').forEach(b => b.classList.toggle('active', b === btn));
          }
        });
      });

      if (window.ReaderModule?.updateToolbarActiveStates) {
        window.ReaderModule.updateToolbarActiveStates();
      }
    },

    renderRightPanel: function(data, year, mode) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;

      const storageKey = `kaoyan_trans_${year}`;
      const savedDraft = localStorage.getItem(storageKey) || '';
      const savedScore = localStorage.getItem(`${storageKey}_score`) || '';
      const showTrans = this.getShowTrans();

      let sentsComparisonHtml = '';
      if (data.sentences && data.sentences.length > 0) {
        data.sentences.forEach(s => {
          let rubricsHtml = '';
          if (s.scoring_points && s.scoring_points.length > 0) {
            rubricsHtml = `<div class="trans-rubric-card">
              <strong style="color:var(--warning)">🎯 采分点拆解：</strong>
              <ul style="margin:4px 0 0 16px;padding:0">
                ${s.scoring_points.map(sp => `<li><code>${sp.phrase || ''}</code> (${sp.score || 0.5}分): ${sp.guide || ''}</li>`).join('')}
              </ul>
            </div>`;
          }

          sentsComparisonHtml += `
            <div class="trans-sent-row" id="trans-ws-sent-${s.sid}" data-sid="${s.sid}">
              <div class="trans-sent-en"><strong>[第 ${s.sid} 句]</strong> ${this.tokenizeWords(s.en || s.text || '')}</div>
              <div class="trans-sent-cn">👉 <strong>参考译文：</strong>${s.cn || s.translation || ''}</div>
              ${rubricsHtml}
              ${s.grammar_breakdown ? `<div style="font-size:0.85em;color:var(--muted);margin-top:4px">🔍 <strong>语法剖析：</strong>${s.grammar_breakdown}</div>` : ''}
              <div style="display:flex;justify-content:flex-end;margin-top:6px">
                <button class="toolbar-btn btn-trans-syntax" data-sid="${s.sid}" style="padding:2px 10px;font-size:0.82em;cursor:pointer">🔍 弹窗详析（采分点与考点）</button>
              </div>
            </div>
          `;
        });
      }

      container.innerHTML = `
        <div class="trans-workspace">
          <div class="cloze-card-header" style="border-bottom:1px solid var(--border);padding-bottom:10px;display:flex;justify-content:space-between;align-items:center">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:1.05em;font-weight:700">✍️ 英译汉实战工作台</span>
              <span class="badge" style="background:#0f766e;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8em">满分 15 分</span>
            </div>
            <button class="toolbar-btn ${showTrans ? 'active' : ''}" id="btnToggleTransRight" style="font-size:0.82em;padding:3px 10px" title="切换全文逐句中文对照与参考译文">🌐 中文对照</button>
          </div>

          <!-- Typing Canvas Card -->
          <div class="trans-canvas-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-weight:700;font-size:0.92em;color:var(--ink)">📝 我的译文草稿箱（支持自动保存）：</span>
              <span id="transWordCount" style="font-size:0.82em;color:var(--muted)">当前字数：${savedDraft.length} 字</span>
            </div>
            <textarea id="transTextarea" class="trans-textarea" placeholder="在此输入你的中文翻译草稿...翻译完成后点击下方【提交并对照参考译文】进行采分点评估。">${savedDraft}</textarea>
            
            <div class="trans-meta-bar">
              <span id="transSaveStatus" style="color:var(--success);font-size:0.85em">● 草稿已保存在本地</span>
              <div style="display:flex;gap:8px">
                <button id="btnTransClear" class="btn" style="padding:4px 10px;font-size:0.85em">清空草稿</button>
                <button id="btnTransSubmit" class="btn" style="padding:4px 14px;font-size:0.85em;background:var(--accent);color:#fff;border-color:var(--accent-dark)">✨ 提交并对照参考译文</button>
              </div>
            </div>
          </div>

          <!-- Reference & Rubric Box -->
          <div id="transComparisonSection" style="display:${showTrans || savedDraft || mode === 'review' ? 'block' : 'none'}">
            <div class="trans-reference-box">
              <h3 style="font-size:1.05em;font-weight:800;color:var(--accent);margin-top:0;margin-bottom:8px">
                📜 权威标准参考译文
              </h3>
              <p style="font-size:1.02em;line-height:1.8;color:var(--ink);margin:0 0 12px 0;background:var(--surface);padding:12px;border-radius:6px;border:1px solid var(--border)">
                ${data.reference_translation || '（暂无参考译文）'}
              </p>

              <!-- Self-Assessment Rating -->
              <div style="background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:12px;margin-bottom:16px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <strong style="font-size:0.92em">🎯 译文自评打分 (满分 15 分)：</strong>
                  <span id="transScoreDisplay" style="font-weight:800;color:var(--danger);font-size:1.1em">${savedScore ? savedScore + ' 分' : '未打分'}</span>
                </div>
                <input type="range" id="transScoreRange" min="0" max="15" step="0.5" value="${savedScore || 11}" style="width:100%">
                <div style="display:flex;justify-content:space-between;font-size:0.75em;color:var(--muted);margin-top:2px">
                  <span>0分 (未作答)</span>
                  <span>5分 (字面直译生硬)</span>
                  <span>10分 (通顺达意采分完整)</span>
                  <span>15分 (信达雅满分)</span>
                </div>
              </div>

              <!-- Sentence by sentence comparison & scoring rubrics -->
              <h4 style="font-size:0.95em;font-weight:700;margin:14px 0 8px 0;color:var(--ink)">
                🔍 逐句对照、采分点与语法精析
              </h4>
              <div class="trans-sentences-list">
                ${sentsComparisonHtml}
              </div>
            </div>
          </div>
        </div>
      `;

      // Bind events
      const textarea = document.getElementById('transTextarea');
      const countEl = document.getElementById('transWordCount');
      const statusEl = document.getElementById('transSaveStatus');
      const submitBtn = document.getElementById('btnTransSubmit');
      const clearBtn = document.getElementById('btnTransClear');
      const compSection = document.getElementById('transComparisonSection');
      const scoreRange = document.getElementById('transScoreRange');
      const scoreDisplay = document.getElementById('transScoreDisplay');

      if (textarea) {
        textarea.addEventListener('input', () => {
          const val = textarea.value;
          countEl.textContent = `当前字数：${val.length} 字`;
          localStorage.setItem(storageKey, val);
          statusEl.textContent = '● 已实时自动保存';
        });
      }

      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (confirm('确定要清空当前的翻译草稿吗？')) {
            textarea.value = '';
            countEl.textContent = '当前字数：0 字';
            localStorage.removeItem(storageKey);
            statusEl.textContent = '● 草稿已清空';
          }
        });
      }

      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          compSection.style.display = 'block';
          compSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }

      if (scoreRange && scoreDisplay) {
        scoreRange.addEventListener('input', () => {
          const val = scoreRange.value;
          scoreDisplay.textContent = `${val} 分`;
          localStorage.setItem(`${storageKey}_score`, val);
        });
      }

      const toggleRightBtn = container.querySelector('#btnToggleTransRight');
      if (toggleRightBtn) {
        toggleRightBtn.addEventListener('click', () => {
          this.setShowTrans(!this.getShowTrans());
          this.renderLeftPanel(data, year);
          this.renderRightPanel(data, year, mode);
        });
      }

      container.querySelectorAll('.btn-trans-syntax').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const sid = btn.getAttribute('data-sid');
          const sObj = data.sentences && data.sentences.find(s => String(s.sid) === String(sid) || s.sid === Number(sid));
          if (sObj && typeof window.showSyntaxModal === 'function') {
            window.showSyntaxModal(sObj, data.sentences);
          }
        });
      });
    },

    highlightSentence: function(sid) {
      document.querySelectorAll('.trans-sent').forEach(el => el.classList.remove('highlight-focus', 'active-sent'));
      const targetLeft = document.getElementById(`trans-sent-${sid}`);
      if (targetLeft) {
        targetLeft.classList.add('highlight-focus', 'active-sent');
        targetLeft.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const compSection = document.getElementById('transComparisonSection');
      if (compSection) compSection.style.display = 'block';

      document.querySelectorAll('.trans-sent-row, .trans-paper-section').forEach(el => el.style.background = '');
      const targetRight = document.getElementById(`trans-ws-sent-${sid}`);
      if (targetRight) {
        targetRight.style.background = 'var(--tr-chunk-hover, #eff6ff)';
        targetRight.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },

    openStrategyModal: function() {
      const modal = document.getElementById('transStrategyModal');
      if (!modal) return;
      modal.classList.add('show');

      const closeBtn = document.getElementById('closeTransStrategyBtn');
      const confirmBtn = document.getElementById('btnTransStrategyConfirm');

      const closeHandler = () => {
        modal.classList.remove('show');
      };

      if (closeBtn) closeBtn.onclick = closeHandler;
      if (confirmBtn) confirmBtn.onclick = closeHandler;
      modal.onclick = (e) => {
        if (e.target === modal) closeHandler();
      };
    },

    closeStrategyModal: function() {
      const modal = document.getElementById('transStrategyModal');
      if (modal) modal.classList.remove('show');
    }
  };
})();
