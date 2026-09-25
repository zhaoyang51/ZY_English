/**
 * Review Mode (一石五鸟) Rendering Engine
 */
(function() {
  window.ReviewRenderer = {
    renderStep: function(step, stepIndex, totalSteps, textData) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;
      
      const secTitles = {
        0: '省流：一石五鸟复盘法总览',
        1: '第一鸟 · 重点单词与词汇量提升',
        2: '第二鸟 · 精读文章与长难句翻译能力提升',
        3: '第三鸟 · 题目命题思维与解题能力提升',
        4: '第四鸟 · 语篇逻辑与新题型能力迁移',
        5: '第五鸟 · 大作文主题表达与写作能力积累'
      };
      
      const secName = secTitles[step.section] || `Section ${step.section}`;
      let html = `<div style="font-size:12px;font-weight:700;color:#7c3aed;text-transform:uppercase;margin-bottom:6px">★ ${secName} (步骤 ${stepIndex + 1} / ${totalSteps})</div>`;

      // If in Section 3, render question quick jump pills
      const questions = (textData && textData.questions) || (window.AppState && window.AppState.textData && window.AppState.textData.questions) || [];
      if (step.section === 3 && questions.length > 0) {
        const currentQid = step.meta && step.meta.qid ? String(step.meta.qid) : '';
        const pills = questions.map(q => {
          const isActive = String(q.qid) === currentQid ? ' active' : '';
          return `<button type="button" class="btn-review-q-jump${isActive}" data-qid="${q.qid}" title="直达第 ${q.qid} 题命题复盘">第 ${q.qid} 题</button>`;
        }).join('');
        html += `
          <nav class="review-q-nav" aria-label="题目命题复盘题号直达导航">
            <span class="review-q-nav-label">🎯 题号直达:</span>
            <div class="review-q-pills">${pills}</div>
          </nav>
        `;
      }

      if (step.title) {
        html += `<h2 style="margin-top:0">${step.title}</h2>`;
      }
      html += step.html || '';
      
      container.innerHTML = html;
      
      // Left Panel Synchronization
      this.syncLeftPanel(step, textData);
    },
    
    syncLeftPanel: function(step, textData) {
      document.querySelectorAll('.exam-para').forEach(el => el.classList.remove('highlight-focus'));
      document.querySelectorAll('.exam-question-card').forEach(el => el.classList.remove('highlight-focus'));
      
      const meta = step.meta || {};
      if (typeof meta.para === 'number') {
        const targetPara = document.getElementById(`exam-para-${meta.para}`);
        if (targetPara) {
          targetPara.classList.add('highlight-focus');
          targetPara.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (meta.qid || meta.question) {
        const qNum = meta.qid || meta.question;
        const targetQ = document.getElementById(`exam-q-${qNum}`);
        if (targetQ) {
          targetQ.classList.add('highlight-focus');
          targetQ.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    },
    
    renderFull: function(steps) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;
      
      const secTitles = {
        0: '0. 一石五鸟复盘法方法论',
        1: '一、第一鸟 · 重点单词与词汇量提升',
        2: '二、第二鸟 · 精读文章与长难句翻译',
        3: '三、第三鸟 · 题目命题思维深度复盘',
        4: '四、第四鸟 · 语篇逻辑与新题型迁移',
        5: '五、第五鸟 · 考研大作文高分写作语料库'
      };
      
      const questions = (window.AppState && window.AppState.textData && window.AppState.textData.questions) || [];
      let sec3NavRendered = false;

      let html = '<div class="all-mode-container">';
      let lastSec = -1;
      steps.forEach((step, idx) => {
        if (step.section !== lastSec) {
          lastSec = step.section;
          html += `<div style="margin:28px 0 16px;padding:10px 14px;background:#f5f3ff;border-left:4px solid #7c3aed;border-radius:4px;font-size:18px;font-weight:700;color:#6d28d9">${secTitles[step.section] || ''}</div>`;
        }

        if (step.section === 3 && !sec3NavRendered && questions.length > 0) {
          sec3NavRendered = true;
          const pills = questions.map(q => `<button type="button" class="btn-review-q-jump" data-qid="${q.qid}" title="滚动直达第 ${q.qid} 题命题复盘">第 ${q.qid} 题</button>`).join('');
          html += `
            <nav class="review-q-nav sticky-q-nav" aria-label="题目命题复盘题号直达导航">
              <span class="review-q-nav-label">🎯 题号直达:</span>
              <div class="review-q-pills">${pills}</div>
            </nav>
          `;
        }

        const isSec3QCard = step.section === 3 && step.meta && step.meta.qid && step.meta.form === 'overview';
        const cardIdAttr = isSec3QCard ? ` id="review-q-card-${step.meta.qid}"` : '';
        const dataQidAttr = (step.section === 3 && step.meta && step.meta.qid) ? ` data-review-qid="${step.meta.qid}"` : '';

        html += `<article class="step-card"${cardIdAttr}${dataQidAttr}>
          ${step.title ? `<h3 style="margin-top:0">${step.title}</h3>` : ''}
          ${step.html || ''}
        </article>`;
      });
      html += '</div>';
      container.innerHTML = html;
    }
  };
})();
