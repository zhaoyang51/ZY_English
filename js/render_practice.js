/**
 * Practice Mode Rendering Engine
 */
(function() {
  window.PracticeRenderer = {
    renderStep: function(step, stepIndex, totalSteps, textData) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;
      
      let html = `<div class="step-badge" style="font-size:12px;font-weight:700;color:#0f766e;text-transform:uppercase;margin-bottom:8px">● ${step.section || '做题模式'} (步骤 ${stepIndex + 1} / ${totalSteps})</div>`;
      html += step.html || `<p>${step.raw || ''}</p>`;
      
      container.innerHTML = html;
      
      // Left Panel Synchronization
      this.syncLeftPanel(step, textData);
    },
    
    syncLeftPanel: function(step, textData) {
      // Clear previous active states
      document.querySelectorAll('.exam-para').forEach(el => el.classList.remove('highlight-focus'));
      document.querySelectorAll('.exam-question-card').forEach(el => el.classList.remove('highlight-focus'));
      document.querySelectorAll('.q-opt').forEach(el => el.classList.remove('active-opt'));
      
      const meta = step.meta || {};
      const leftScroll = document.getElementById('leftScroll');
      if (!leftScroll) return;
      
      if (meta.coarse && typeof meta.pid === 'number') {
        const targetPara = document.getElementById(`exam-para-${meta.pid}`);
        if (targetPara) {
          targetPara.classList.add('highlight-focus');
          targetPara.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (meta.qid) {
        const targetQ = document.getElementById(`exam-q-${meta.qid}`);
        if (targetQ) {
          targetQ.classList.add('highlight-focus');
          if (meta.option) {
            const optEl = targetQ.querySelector(`.q-opt[data-opt="${meta.option}"]`);
            if (optEl) optEl.classList.add('active-opt');
          }
          targetQ.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    },
    
    renderFull: function(steps) {
      const container = document.getElementById('workspaceContent');
      if (!container) return;
      
      let html = '<div class="all-mode-container">';
      steps.forEach((step, idx) => {
        html += `<article class="step-card">
          <div style="font-size:12px;font-weight:700;color:#0f766e;margin-bottom:6px">【步骤 ${idx + 1}】${step.section || ''}</div>
          ${step.html || `<p>${step.raw || ''}</p>`}
        </article>`;
      });
      html += '</div>';
      container.innerHTML = html;
    }
  };
})();
