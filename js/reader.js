/**
 * Reader Component: Exam Paper Markup & Highlighting
 */
(function() {
  window.ReaderModule = {
    renderExamPaper(textData, containerId) {
      const container = document.getElementById(containerId || 'examPaper');
      if (!container || !textData) return;

      let html = `
        <h2 style="font-size:1.35em;font-weight:800;margin-bottom:4px">${textData.year} 年全国硕士研究生招生考试英语（二）阅读理解</h2>
        <div style="color:var(--muted);font-size:0.95em;margin-bottom:18px">Text ${textData.text_id} (${textData.q_range} 题)</div>
        <div class="exam-article-section">
      `;

      textData.paragraphs.forEach((p, idx) => {
        html += `
          <div class="exam-para" id="exam-para-${p.pid}" data-pid="${p.pid}">
            <span class="para-badge">[Para ${p.pid + 1}]</span>
            <span class="para-text">${p.text}</span>
          </div>
        `;
      });

      html += `</div><hr style="margin:24px 0;border:none;border-top:1px dashed var(--border)"><div class="exam-questions-section"><h3 style="font-size:1.15em;font-weight:700;margin-bottom:12px">Questions (${textData.q_range})</h3>`;

      textData.questions.forEach(q => {
        html += `
          <div class="exam-question-card" id="exam-q-${q.qid}" data-qid="${q.qid}">
            <div class="q-stem">${q.qid}. ${q.stem}</div>
            <div class="q-options">
              ${q.options.map(opt => `
                <div class="q-opt" data-opt="${opt.key}">
                  <span class="opt-key">[${opt.key}]</span>
                  <span class="opt-text">${opt.text}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;
    },

    highlight(meta) {
      document.querySelectorAll('.exam-para').forEach(el => el.classList.remove('highlight-focus'));
      document.querySelectorAll('.exam-question-card').forEach(el => el.classList.remove('highlight-focus'));

      if (!meta) return;

      if (typeof meta.para === 'number') {
        const targetPara = document.getElementById(`exam-para-${meta.para}`);
        if (targetPara) {
          targetPara.classList.add('highlight-focus');
          targetPara.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (meta.qid) {
        const targetQ = document.getElementById(`exam-q-${meta.qid}`);
        if (targetQ) {
          targetQ.classList.add('highlight-focus');
          targetQ.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };
})();
