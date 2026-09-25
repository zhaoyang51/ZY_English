/**
 * Translation Renderer: Section III Translation (英译汉)
 * Interactive Draft Canvas, Real-time Local Persistence, Scoring Rubrics & Sentence Compare
 */
(function() {
  window.TranslationRenderer = {
    render: function(transData, year, mode) {
      if (!transData) return;
      this.renderLeftPanel(transData, year);
      this.renderRightPanel(transData, year, mode);
    },

    renderLeftPanel: function(data, year) {
      const examPaper = document.getElementById('examPaper');
      if (!examPaper) return;

      const fs = window.ReaderModule?.settings?.fontSize || 17.5;
      const lh = window.ReaderModule?.settings?.lineHeight || 1.85;

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
            sentHtml += `<span class="exam-sent trans-sent" id="trans-sent-${s.sid}" data-sid="${s.sid}" title="点击查看长难句拆解、参考译文与采分点">${s.en || s.text || ''}</span> `;
          });
        } else {
          sentHtml = p.text || '';
        }

        parasHtml += `
          <div class="exam-para" id="exam-para-${pidx}">
            <span class="para-badge">[Para ${pidx + 1}]</span>
            <span class="para-text" style="font-size:${fs}px;line-height:${lh}">${sentHtml}</span>
          </div>
        `;
      });

      examPaper.innerHTML = `
        <div class="reader-toolbar">
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">题型:</span>
            <span class="badge" style="background:var(--accent);color:#fff;padding:2px 8px;border-radius:4px;font-size:0.82em">Section III 英译汉 (15分)</span>
          </div>
          <div class="toolbar-group" style="margin-left:auto">
            <button class="toolbar-btn" id="btnToggleTransHelp" title="点击查看翻译答题策略">💡 考研翻译核心三步法</button>
          </div>
        </div>

        <h2 style="font-size:1.35em;font-weight:800;margin-bottom:4px">${year} 年全国硕士研究生招生考试英语（二）</h2>
        <div style="color:var(--muted);font-size:0.95em;margin-bottom:14px">
          Section III Translation ｜ 第 46 题（满分 15 分）
        </div>

        <div class="matching-banner" style="margin-bottom:18px">
          <strong>Directions:</strong> Translate the following text into Chinese. Write your translation on the ANSWER SHEET. (15 points)
        </div>

        <div class="exam-article-section">
          ${parasHtml}
        </div>
      `;

      // Bind sentence click
      examPaper.querySelectorAll('.trans-sent').forEach(el => {
        el.addEventListener('click', () => {
          const sid = el.getAttribute('data-sid');
          this.highlightSentence(sid);
          const sObj = data.sentences && data.sentences.find(s => String(s.sid) === String(sid) || s.sid === Number(sid));
          if (sObj && typeof window.showSyntaxModal === 'function') {
            window.showSyntaxModal(sObj, data.sentences);
          }
        });
      });

      // Bind strategy tip
      const tipBtn = document.getElementById('btnToggleTransHelp');
      if (tipBtn) {
        tipBtn.addEventListener('click', () => {
          this.openStrategyModal();
        });
      }
    },

    renderRightPanel: function(data, year, mode) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;

      const storageKey = `kaoyan_trans_${year}`;
      const savedDraft = localStorage.getItem(storageKey) || '';
      const savedScore = localStorage.getItem(`${storageKey}_score`) || '';

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
            <div class="trans-sent-row" id="trans-ws-sent-${s.sid}">
              <div class="trans-sent-en"><strong>[第 ${s.sid} 句]</strong> ${s.en || s.text || ''}</div>
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
          <div class="cloze-card-header" style="border-bottom:1px solid var(--border);padding-bottom:10px">
            <span style="font-size:1.05em;font-weight:700">✍️ 英译汉实战工作台</span>
            <span class="badge" style="background:#0f766e;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8em">满分 15 分</span>
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
          <div id="transComparisonSection" style="display:${savedDraft || mode === 'review' ? 'block' : 'none'}">
            <div class="trans-reference-box">
              <h3 style="font-size:1.05em;font-weight:800;color:var(--accent);margin-top:0;margin-bottom:8px">
                📜 官方 / 权威标准参考译文
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

      document.querySelectorAll('.trans-sent-row').forEach(el => el.style.background = 'transparent');
      const targetRight = document.getElementById(`trans-ws-sent-${sid}`);
      if (targetRight) {
        targetRight.style.background = 'var(--accent-light, #eff6ff)';
        targetRight.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
