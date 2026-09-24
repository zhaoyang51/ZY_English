/**
 * Matching Renderer: Section II Part B (新题型：多项信息匹配 / 小标题对应 / 正误判断)
 * Interactive Two-Column Pairing, Conflict Prevention, Auto-Scoring & Distractor Analysis
 */
(function() {
  let activeItemQid = 41;
  let userSelections = {}; // { 41: 'E', 42: 'D', ... }

  window.MatchingRenderer = {
    render: function(partBData, year, mode) {
      if (!partBData) return;
      this.initUserState(partBData, year);
      this.renderLeftPanel(partBData, year);
      this.renderRightPanel(partBData, year, mode);
    },

    initUserState: function(data, year) {
      const saved = localStorage.getItem(`kaoyan_partb_${year}`);
      if (saved) {
        try { userSelections = JSON.parse(saved); } catch(e) { userSelections = {}; }
      } else {
        userSelections = {};
      }
      activeItemQid = (data.items && data.items[0]) ? data.items[0].qid : 41;
    },

    renderLeftPanel: function(data, year) {
      const examPaper = document.getElementById('examPaper');
      if (!examPaper) return;

      const fs = window.ReaderModule?.settings?.fontSize || 17.5;
      const lh = window.ReaderModule?.settings?.lineHeight || 1.85;

      let parasHtml = '';
      (data.paragraphs || []).forEach((p, idx) => {
        parasHtml += `
          <div class="exam-para" id="partb-para-${p.pid !== undefined ? p.pid : idx}" data-pid="${idx}">
            <span class="para-badge">[Para ${idx + 1}]</span>
            <span class="para-text" style="font-size:${fs}px;line-height:${lh}">${p.text || p}</span>
          </div>
        `;
      });

      examPaper.innerHTML = `
        <div class="reader-toolbar">
          <div class="toolbar-group">
            <span style="font-size:0.82em;font-weight:700;color:var(--muted)">题型:</span>
            <span class="badge" style="background:#7c3aed;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.82em">Section II Part B 新题型 (10分)</span>
          </div>
          <div class="toolbar-group" style="margin-left:auto">
            <span style="font-size:0.82em;color:var(--muted)">模式: ${data.subtype === 'heading_matching' ? '段落小标题匹配' : (data.subtype === 'true_false' ? '正误判断' : '多项信息匹配 (7选5)')}</span>
          </div>
        </div>

        <h2 style="font-size:1.35em;font-weight:800;margin-bottom:4px">${year} 年全国硕士研究生招生考试英语（二）</h2>
        <div style="color:var(--muted);font-size:0.95em;margin-bottom:14px">
          Section II Reading Comprehension Part B ｜ 41-45 题（满分 10 分）
        </div>

        <div class="matching-banner" style="margin-bottom:18px">
          <strong>Directions:</strong> ${data.directions || 'Read the following text and match each of the numbered items in the left column to its corresponding information in the right column. There are two extra choices in the right column. (10 points)'}
        </div>

        <div class="exam-article-section">
          ${parasHtml}
        </div>
      `;
    },

    renderRightPanel: function(data, year, mode) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;

      const isSubmitted = localStorage.getItem(`kaoyan_partb_submitted_${year}`) === 'true' || mode === 'review';
      const answers = data.answers || {};

      // 1. Items List (41-45)
      let itemsHtml = '';
      (data.items || []).forEach(item => {
        const qid = item.qid;
        const currentChoice = userSelections[qid] || '';
        const isCorrect = answers[qid] ? (currentChoice === answers[qid]) : null;
        const isCurrentActive = activeItemQid === qid;

        let badgeHtml = '';
        if (isSubmitted) {
          badgeHtml = `<span class="matching-badge-assigned ${isCorrect ? 'correct' : 'wrong'}">
            ${isCorrect ? '✔ 正确' : '✖ 错误'} (你的选择: ${currentChoice || '未选'} / 正确: ${answers[qid]})
          </span>`;
        } else if (currentChoice) {
          badgeHtml = `<span class="matching-badge-assigned">已配对 [ ${currentChoice} ]</span>`;
        } else {
          badgeHtml = `<span style="font-size:0.82em;color:var(--muted);border:1px dashed var(--border);padding:2px 6px;border-radius:4px">待配对</span>`;
        }

        itemsHtml += `
          <div class="matching-item-card ${isCurrentActive ? 'active' : ''}" id="matching-item-${qid}" data-qid="${qid}">
            <div class="matching-item-header">
              <div class="matching-item-title">
                <span style="color:var(--accent);font-weight:800;margin-right:6px">${qid}.</span>
                ${item.title || item.stem || ''}
              </div>
              ${badgeHtml}
            </div>

            <!-- Quick dropdown selector -->
            <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
              <span style="font-size:0.82em;color:var(--muted)">匹配选项:</span>
              <select class="select-control partb-item-select" data-qid="${qid}" style="font-size:0.85em;padding:3px 8px;flex:1">
                <option value="">-- 点击选择 A-G --</option>
                ${Object.keys(data.options || {}).sort().map(key => `
                  <option value="${key}" ${currentChoice === key ? 'selected' : ''}>[${key}] ${(data.options[key] || '').substring(0, 45)}...</option>
                `).join('')}
              </select>
            </div>
          </div>
        `;
      });

      // 2. Options List (A-G)
      let optionsHtml = '';
      Object.keys(data.options || {}).sort().forEach(key => {
        const optText = data.options[key];
        const assignedQid = Object.keys(userSelections).find(q => userSelections[q] === key);
        const isAssigned = !!assignedQid;
        const isAssignedToActive = isAssigned && (Number(assignedQid) === Number(activeItemQid));

        optionsHtml += `
          <div class="matching-opt-choice ${isAssigned ? 'used' : ''} ${isAssignedToActive ? 'selected' : ''}" data-opt="${key}">
            <span class="matching-opt-tag">${key}</span>
            <div style="flex:1">
              <div style="color:var(--ink)">${optText}</div>
              ${isAssigned ? `<div style="font-size:0.78em;color:var(--accent);margin-top:4px">📌 当前已分配给第 <strong>${assignedQid}</strong> 题</div>` : ''}
            </div>
          </div>
        `;
      });

      // 3. Score & Distractors (Review mode or submitted)
      let reviewSectionHtml = '';
      if (isSubmitted) {
        let score = 0;
        Object.keys(answers).forEach(q => {
          if (userSelections[q] === answers[q]) score += 2;
        });

        // Distractors breakdown
        let distractorCards = '';
        if (data.distractors && data.distractors.length > 0) {
          distractorCards = `
            <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:12px;margin-top:14px">
              <strong style="color:var(--danger);font-size:0.92em">⚠️ 2 个多余干扰项深度解密 (Distractors Analysis)：</strong>
              <div style="margin-top:8px;font-size:0.88em;line-height:1.6">
                ${data.distractors.map(dKey => `
                  <div style="margin-bottom:8px">
                    <span class="badge" style="background:var(--danger);color:#fff">[${dKey}] 干扰项</span>:
                    ${data.distractor_analysis?.[dKey] || `原文并未直接佐证该表述，为命题人设计的干扰项。`}
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }

        reviewSectionHtml = `
          <div style="background:var(--surface);border:2px solid var(--accent);border-radius:10px;padding:14px;margin-top:16px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <strong style="font-size:1.05em">📊 本次答题得分报告：</strong>
              <span style="font-size:1.3em;font-weight:800;color:${score >= 6 ? 'var(--success)' : 'var(--danger)'}">${score} / 10 分</span>
            </div>
            ${distractorCards}
          </div>
        `;
      }

      container.innerHTML = `
        <div class="matching-container">
          <div class="cloze-card-header" style="border-bottom:1px solid var(--border);padding-bottom:10px">
            <span style="font-size:1.05em;font-weight:700">🧩 新题型匹配工作台 (41-45 题)</span>
            <span class="badge" style="background:#7c3aed;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8em">每题 2 分 · 满分 10 分</span>
          </div>

          <div style="font-size:0.88em;color:var(--muted);line-height:1.5">
            💡 <strong>解题指引：</strong>点击左侧待配对题卡，再点击右侧选项即可快速配对；或直接在下拉框选择。
          </div>

          <!-- Left column: 41-45 items -->
          <div class="matching-columns">
            ${itemsHtml}
          </div>

          <!-- Right column: Options A-G -->
          <div style="margin-top:12px">
            <div style="font-weight:700;font-size:0.92em;margin-bottom:8px;color:var(--ink)">
              📋 待选信息栏 (Options A-G · 含 2 个多余干扰项)：
            </div>
            <div class="matching-options-list">
              ${optionsHtml}
            </div>
          </div>

          <!-- Bottom Action Controls -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
            <button id="btnResetPartB" class="btn" style="font-size:0.85em">重置选择</button>
            <button id="btnSubmitPartB" class="btn" style="font-size:0.85em;background:var(--accent);color:#fff;border-color:var(--accent-dark);font-weight:700">
              ${isSubmitted ? '重新作答' : '提交交卷并核对 (10分)'}
            </button>
          </div>

          ${reviewSectionHtml}
        </div>
      `;

      // Bind events
      this.bindEvents(data, year);
    },

    bindEvents: function(data, year) {
      // 1. Item card click to set active item
      document.querySelectorAll('.matching-item-card').forEach(el => {
        el.addEventListener('click', (e) => {
          if (e.target.tagName.toLowerCase() === 'select') return;
          const qid = Number(el.getAttribute('data-qid'));
          activeItemQid = qid;
          this.renderRightPanel(data, year);
          // Highlight relevant paragraph in left panel if known
          const item = (data.items || []).find(it => it.qid === qid);
          if (item && item.locate_para !== undefined) {
            const pEl = document.getElementById(`partb-para-${item.locate_para}`);
            if (pEl) {
              document.querySelectorAll('.exam-para').forEach(p => p.classList.remove('highlight-focus'));
              pEl.classList.add('highlight-focus');
              pEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        });
      });

      // 2. Select dropdown change
      document.querySelectorAll('.partb-item-select').forEach(sel => {
        sel.addEventListener('change', () => {
          const qid = Number(sel.getAttribute('data-qid'));
          const opt = sel.value;
          if (opt) {
            // Check if opt is already used elsewhere
            Object.keys(userSelections).forEach(k => {
              if (userSelections[k] === opt && Number(k) !== qid) delete userSelections[k];
            });
            userSelections[qid] = opt;
          } else {
            delete userSelections[qid];
          }
          localStorage.setItem(`kaoyan_partb_${year}`, JSON.stringify(userSelections));
          this.renderRightPanel(data, year);
        });
      });

      // 3. Option choice card click
      document.querySelectorAll('.matching-opt-choice').forEach(card => {
        card.addEventListener('click', () => {
          const opt = card.getAttribute('data-opt');
          // If option already assigned to this item, remove it
          if (userSelections[activeItemQid] === opt) {
            delete userSelections[activeItemQid];
          } else {
            // Clear if used elsewhere
            Object.keys(userSelections).forEach(k => {
              if (userSelections[k] === opt) delete userSelections[k];
            });
            userSelections[activeItemQid] = opt;
          }
          localStorage.setItem(`kaoyan_partb_${year}`, JSON.stringify(userSelections));
          this.renderRightPanel(data, year);
        });
      });

      // 4. Submit & Reset
      const submitBtn = document.getElementById('btnSubmitPartB');
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          const isSubmitted = localStorage.getItem(`kaoyan_partb_submitted_${year}`) === 'true';
          if (isSubmitted) {
            localStorage.removeItem(`kaoyan_partb_submitted_${year}`);
          } else {
            localStorage.setItem(`kaoyan_partb_submitted_${year}`, 'true');
          }
          this.renderRightPanel(data, year);
        });
      }

      const resetBtn = document.getElementById('btnResetPartB');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm('确定要清空新题型已作答的选项吗？')) {
            userSelections = {};
            localStorage.removeItem(`kaoyan_partb_${year}`);
            localStorage.removeItem(`kaoyan_partb_submitted_${year}`);
            this.renderRightPanel(data, year);
          }
        });
      }
    }
  };
})();
