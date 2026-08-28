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
      
      let html = '<div class="all-mode-container">';
      let lastSec = -1;
      steps.forEach((step, idx) => {
        if (step.section !== lastSec) {
          lastSec = step.section;
          html += `<div style="margin:28px 0 16px;padding:10px 14px;background:#f5f3ff;border-left:4px solid #7c3aed;border-radius:4px;font-size:18px;font-weight:700;color:#6d28d9">${secTitles[step.section] || ''}</div>`;
        }
        html += `<article class="step-card">
          ${step.title ? `<h3 style="margin-top:0">${step.title}</h3>` : ''}
          ${step.html || ''}
        </article>`;
      });
      html += '</div>';
      container.innerHTML = html;
    }
  };
})();
