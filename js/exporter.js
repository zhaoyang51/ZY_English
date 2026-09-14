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
          const matchingSent = window.ReviewContent.context(textData, v.word, p.pid);
          const exampleSent = matchingSent ? `${matchingSent.label}：${matchingSent.text}` : '本篇暂无完整匹配的原句或题项。';
          const wordField = `<b>${v.word}</b>`;
          const defField = v.definition.replace(/\t/g, ' ');
          const safeWord = v.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const exampleField = exampleSent.replace(new RegExp(`(${safeWord})`, 'gi'), '<font color="#2563eb"><b>$1</b></font>').replace(/[\t\r\n]/g, ' ');
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
    buildMarkdownNotes(textData) {
      if (!textData) return '';
      const C = window.ReviewContent;
      const md = [`# ${textData.year} 年 Text ${textData.text_id} 精读复盘讲义`, '', '> 小标题为配套迁移讲解；写作例句为教学改写，不作原文事实引用。', ''];
      md.push('## 一、语境词汇与搭配', '');
      textData.paragraphs.forEach(p => {
        md.push(`### 第 ${p.pid + 1} 段`, '');
        C.vocabulary(textData, p).forEach(v => {
          md.push(`- **${v.word}** ${v.pos || ''} — ${v.definition || ''}`);
          if (v.usage_note) md.push(`  - 搭配与辨析：${v.usage_note}`);
          if (v.context) md.push(`  - ${v.context.label}：${v.context.text}`);
        });
        md.push('');
      });
      md.push('## 二、精读与长难句', '');
      textData.paragraphs.forEach(p => {
        md.push(`### 第 ${p.pid + 1} 段`, '', p.text, '', `参考译文：${p.translation || ''}`, '');
        textData.sentences.filter(s => s.pid === p.pid).forEach((s, i) => {
          md.push(`#### 句 ${i + 1}`, '', s.text, '', `参考意群：${s.slashed_text || ''}`, '', `意群速译：${s.chunk_translation || ''}`, '');
          (s.syntax?.breakdown || []).forEach(b => md.push(`- **${b.type}** ${b.content} — ${b.explanation}`));
          md.push('', `参考译文：${s.translation || ''}`, '');
        });
      });
      md.push('## 三、题目证据与选项解析', '');
      textData.questions.forEach(q => {
        md.push(`### 第 ${q.qid} 题 · ${q.type}`, '', q.stem, '', q.stem_cn || '', '',
          `**答案：${q.options.find(o => o.is_correct)?.key || '待补充'}**`, '', C.typeExplanation(q.type || ''),
          '', `定位原文：${q.locate_sentence || ''}`, '', q.locate_sentence_cn || '', '');
        C.pairs(q).forEach(p => md.push(`- 原文 ${p.text_term} → 选项 ${p.opt_term}；${p.logic}`));
        q.options.forEach(o => {
          const a = C.analysis(q, o);
          md.push('', `#### ${o.key}. ${o.text}`, '', o.text_cn || '', '', `判断：${a.option_nature}`, '');
          if (a.position) md.push(`依据位置：${a.position}`, '');
          if (a.source_sentence) md.push(`依据原句：${a.source_sentence}`, '');
          md.push(a.locator_comparison || '暂无独立比对解析。', '');
          if (a.writing_perspective) md.push(`论证作用：${a.writing_perspective}`, '');
          if (a.theme_validation) md.push(`主旨交叉验证：${a.theme_validation}`, '');
          md.push(a.verdict, '');
        });
        md.push(`本题小结：${q.summary || ''}`, '');
      });
      const ml = textData.macro_logic || {};
      md.push('## 四、语篇逻辑与小标题对应', '', `体裁：${ml.genre || ''}`, '', `推进关系：${ml.discourse_model || ''}`, '', ml.main_theme || '', '');
      (ml.paragraph_functions || []).forEach(p => {
        md.push(`### 第 ${p.pid + 1} 段 · ${p.role}`, '', p.core_point || '', '', p.cohesive_devices || '', '');
        if (p.evidence) md.push(`原文依据：${p.evidence}`, '');
      });
      const pb = ml.part_b_training;
      if (pb) {
        md.push('### 小标题对应解析（配套讲解）', '');
        (pb.target_paragraphs || []).forEach(p => {
          const o = (pb.options || []).find(o => o.key === p.correct_key);
          if (o) md.push(`- 第 ${p.pid + 1} 段 → [${o.key}] ${o.heading}：${o.trap_analysis || ''}`);
        });
        md.push('', '易混标题：', '');
        (pb.options || []).filter(o => o.is_distractor).forEach(o => md.push(`- [${o.key}] ${o.heading}：${o.trap_analysis || ''}`));
      }
      md.push('', '## 五、写作表达与用法', '');
      (textData.writing_corpus || []).forEach(w => {
        md.push(`### ${w.expression}`, '', `${w.category || ''} · ${w.translation || ''}`, '');
        const source = C.writingSource(textData, w);
        md.push(source ? `原文依据：${source}` : '拓展表达（教学改写，非原文直接引用）', '',
          `搭配与使用范围：${C.writingUsage(w)}`, '', `句式：${w.template_slot || w.application_sentence || ''}`, '',
          `迁移例句：${w.application_sentence || ''}`, '', w.sentence_cn || '', '');
      });
      return md.join('\n');
    },

    exportMarkdownNotes(textData) {
      if (!textData) return;
      downloadFile(this.buildMarkdownNotes(textData), `${textData.year}_Text${textData.text_id}_精读复盘讲义.md`, 'text/markdown;charset=utf-8');
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
