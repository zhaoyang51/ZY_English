/**
 * Exporter Component: Anki Card TSV & Markdown Notes Generator
 */
(function() {
  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  window.ExporterModule = {
    // 1. Export Anki Tab-Separated Values (.txt / .tsv)
    exportCurrentTextAnki(textData) {
      if (!textData) return;
      let lines = [];
      // Header for reference
      lines.push('#separator:tab');
      lines.push('#html:true');
      lines.push('#tags column:4');

      // Export all paragraph vocabulary with authentic sentence examples
      textData.paragraphs.forEach((p, pid) => {
        p.vocabulary.forEach(v => {
          // Find matching sentence for context
          const matchingSent = textData.sentences.find(s => s.pid === pid && s.text.toLowerCase().includes(v.word.toLowerCase())) || textData.sentences.find(s => s.pid === pid);
          const exampleSent = matchingSent ? matchingSent.text : p.text.substring(0, 120);
          const wordField = `<b>${v.word}</b>`;
          const defField = v.definition.replace(/\t/g, ' ');
          const exampleField = exampleSent.replace(new RegExp(`(${v.word})`, 'gi'), '<font color="#2563eb"><b>$1</b></font>').replace(/\t/g, ' ');
          const tagField = `${textData.year}年 英语二 Text${textData.text_id}`;

          lines.push(`${wordField}\t${defField}\t${exampleField}\t${tagField}`);
        });
      });

      const content = lines.join('\n');
      const filename = `${textData.year}_Text${textData.text_id}_Anki生词卡片.txt`;
      downloadFile(content, filename, 'text/plain;charset=utf-8');
    },

    exportAllSavedVocabAnki() {
      const list = window.StorageModule.getVocabBook();
      if (list.length === 0) {
        alert('当前本地生词本为空，请先在阅读中收藏生词！');
        return;
      }

      let lines = [];
      lines.push('#separator:tab');
      lines.push('#html:true');
      lines.push('#tags column:4');

      list.forEach(item => {
        const wordField = `<b>${item.word}</b>`;
        const defField = (item.def || '').replace(/\t/g, ' ');
        const exampleField = (item.sentence || '').replace(new RegExp(`(${item.word})`, 'gi'), '<font color="#2563eb"><b>$1</b></font>').replace(/\t/g, ' ');
        const tagField = item.year ? `${item.year}年 英语二 Text${item.textId} 生词本` : '考研生词本';
        lines.push(`${wordField}\t${defField}\t${exampleField}\t${tagField}`);
      });

      const content = lines.join('\n');
      const filename = `考研英语二_全量生词本_${list.length}词_Anki卡片.txt`;
      downloadFile(content, filename, 'text/plain;charset=utf-8');
    },

    // 2. Export In-depth Markdown Notes (.md)
    exportMarkdownNotes(textData) {
      if (!textData) return;
      const content = window.ReviewLearningModule.markdown(textData);
      downloadFile(content, `${textData.year}_Text${textData.text_id}_精读与个人复盘笔记.md`, 'text/markdown;charset=utf-8');
    },

    // 3. Export Mistakes Review Book (.md)
    exportMistakesBook() {
      const mistakes = window.StorageModule.getMistakes();
      if (mistakes.length === 0) {
        alert('当前错题本为空，太棒了！');
        return;
      }

      let md = [];
      md.push(`# 考研英语二个人错题本与弱项归因分析报告\n`);
      md.push(`> **累计错题**：${mistakes.length} 题 ｜ **生成时间**：${new Date().toLocaleString()}\n`);
      md.push(`---\n`);

      mistakes.forEach((m, idx) => {
        const savedReasons = window.StorageModule.loadErrorReasons(m.year, m.textId, m.qid);
        const reasonsStr = savedReasons.length > 0 ? savedReasons.join(', ') : '未做错因自查';
        md.push(`### ${idx + 1}. [${m.year} 年 Text ${m.textId}] 第 ${m.qid} 题`);
        md.push(`- **题干**：${m.qStem}`);
        md.push(`- **我的错误选择**：<font color="red">❌ ${m.wrongOpt}</font>`);
        md.push(`- **标准正确选项**：<font color="green">✔ ${m.correctOpt}</font>`);
        md.push(`- **错因归因**：\`${reasonsStr}\``);
        md.push(`- **记录时间**：${new Date(m.time).toLocaleString()}\n`);
      });

      const content = md.join('\n');
      const filename = `考研英语二_错题复盘本_${mistakes.length}题.md`;
      downloadFile(content, filename, 'text/markdown;charset=utf-8');
    }
  };
})();
