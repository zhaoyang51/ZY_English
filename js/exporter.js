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

      let md = [];
      md.push(`# ${textData.year} 年考研英语（二）Text ${textData.text_id} 全真精读复盘笔记\n`);
      md.push(`> **试卷篇章**：${textData.year} 年全国硕士研究生招生考试 英语（二）阅读理解 Text ${textData.text_id} (${textData.q_range} 题)`);
      md.push(`> **导出时间**：${new Date().toLocaleString()}\n`);
      md.push(`---\n`);

      // Section 1: Article Text & Translation
      md.push(`## 一、考场真题原文与段落精注\n`);
      textData.paragraphs.forEach((p, pid) => {
        md.push(`### [Para ${pid + 1}]`);
        md.push(`${p.text}\n`);
        md.push(`**【意群断句】**：\`${p.slashed_text}\`\n`);
        md.push(`**【意群速译】**：${p.chunk_translation}\n`);
        md.push(`**【标准汉译】**：${p.translation}\n`);
      });
      md.push(`---\n`);

      // Section 2: Core Vocabulary Matrix
      md.push(`## 二、核心考点词汇矩阵\n`);
      md.push(`| 表达 | 词性与意思 | 表达 | 词性与意思 | 表达 | 词性与意思 |`);
      md.push(`| :--- | :--- | :--- | :--- | :--- | :--- |`);
      textData.paragraphs.forEach(p => {
        for (let i = 0; i < p.vocabulary.length; i += 3) {
          const chunk = p.vocabulary.slice(i, i + 3);
          let row = '';
          chunk.forEach(v => {
            row += `| **${v.word}** | ${v.definition} `;
          });
          while (chunk.length < 3) {
            row += `| | `;
            chunk.push(null);
          }
          row += `|`;
          md.push(row);
        }
      });
      md.push(`\n---\n`);

      // Section 3: Long & Complex Sentence Breakdown
      md.push(`## 三、逐句长难句剖析与句法拆解\n`);
      textData.sentences.forEach((s, s_idx) => {
        md.push(`### 句 ${s_idx + 1} (第 ${s.pid + 1} 段)`);
        md.push(`- **原句**：${s.text}`);
        md.push(`- **意群断句**：\`${s.slashed_text}\``);
        md.push(`- **意群速译**：${s.chunk_translation}`);
        md.push(`- **主干识别与句法拆解**：`);
        s.syntax.breakdown.forEach(b => {
          md.push(`  * **[${b.type}]** \`${b.content}\` — ${b.explanation}`);
        });
        md.push(`- **满分参考汉译**：${s.translation}\n`);
      });
      md.push(`---\n`);

      // Section 4: Questions & Test-Maker Intent Analysis
      md.push(`## 四、题目命题人逻辑链条与避坑剖析\n`);
      textData.questions.forEach(q => {
        const corrKey = (q.options.find(o => o.is_correct) || q.options[0]).key;
        md.push(`### 第 ${q.qid} 题（${q.type}）`);
        md.push(`- **题干**：${q.stem}`);
        md.push(`- **题干汉译**：${q.stem_cn}`);
        md.push(`- **核心定位句 (第 ${q.locate_pid + 1} 段)**：> ${q.locate_sentence}`);
        md.push(`- **标准正解**：**[${corrKey}]**\n`);

        md.push(`#### 选项深度推演表：`);
        md.push(`| 选项 | 内容 | 判定性质 | 考研经典干扰类型 | 命题人逻辑与避坑解析 |`);
        md.push(`| :---: | :--- | :---: | :---: | :--- |`);
        q.options.forEach(opt => {
          const nature = opt.is_correct ? '★ 正确答案' : '干扰项';
          const trap = opt.is_correct ? '精准同义替换' : (opt.trap_type || '干扰项');
          const summary = opt.analysis.locator_comparison.replace(/\n/g, ' ');
          md.push(`| **${opt.key}** | ${opt.text} | ${nature} | ${trap} | ${summary} |`);
        });

        md.push(`\n**💡 决断小结**：${q.summary}\n`);
      });
      md.push(`---\n`);

      // Section 4: Discourse & Part B
      md.push(`## 四、语篇逻辑与新题型迁移训练\n`);
      if (textData.macro_logic) {
        const ml = textData.macro_logic;
        if (ml.genre) md.push(`- **语篇体裁**：${ml.genre}`);
        if (ml.discourse_model) md.push(`- **论述模型**：${ml.discourse_model}`);
        if (ml.main_theme) md.push(`- **宏观主旨与作者立场**：${ml.main_theme}\n`);

        if (ml.paragraph_functions && ml.paragraph_functions.length > 0) {
          md.push(`### 语篇推进脉络与段际粘合：`);
          ml.paragraph_functions.forEach((pf, idx) => {
            const pNum = pf.pid !== undefined ? pf.pid + 1 : idx + 1;
            md.push(`- **第 ${pNum} 段 (${pf.role})**：${pf.core_point}`);
            if (pf.cohesive_devices) md.push(`  - *段际衔接*：${pf.cohesive_devices}`);
          });
          md.push('');
        } else if (ml.logic_chain) {
          md.push(`### 逻辑推进脉络：`);
          ml.logic_chain.forEach(item => md.push(`- ${item}`));
          md.push('');
        }

        if (ml.part_b_training) {
          const pb = ml.part_b_training;
          md.push(`### 英语二新题型（小标题对应）迁移演练：`);
          md.push(`> **训练说明**：${pb.instruction || ''}\n`);
          md.push(`| 段落 | 正确小标题 | 命题人设陷解析 |`);
          md.push(`| :---: | :--- | :--- |`);
          (pb.target_paragraphs || []).forEach(tp => {
            const pNum = tp.pid !== undefined ? tp.pid + 1 : tp.label;
            const opt = (pb.options || []).find(o => o.key === tp.correct_key) || {};
            md.push(`| **Paragraph ${pNum}** | **[${tp.correct_key}]** ${opt.heading || ''} | ${opt.trap_analysis || ''} |`);
          });
          md.push('');
          if (pb.skills_breakdown) {
            md.push(`**💡 新题型解题心法**：${pb.skills_breakdown}\n`);
          }
        }
      }
      md.push(`---\n`);

      // Section 5: Writing Corpus
      md.push(`## 五、考研写作高分黄金语料库\n`);
      md.push(`| 表达分类 | 核心表达 | 语法/句法性质 | 中文释义 | 考研高分应用例句 | 即插即用模板槽位 |`);
      md.push(`| :--- | :--- | :---: | :--- | :--- | :--- |`);
      (textData.writing_corpus || []).forEach(w => {
        const cat = w.category || '';
        const expr = w.expression ? `\`${w.expression}\`` : '';
        const synType = w.syntactic_type || '核心词汇';
        const trans = w.translation || '';
        const sent = w.application_sentence || '';
        const slot = w.template_slot ? `\`${w.template_slot}\`` : `\`${sent}\``;
        md.push(`| **${cat}** | ${expr} | ${synType} | ${trans} | ${sent} | ${slot} |`);
      });
      md.push('');

      const content = md.join('\n');
      const filename = `${textData.year}_Text${textData.text_id}_真题精读复盘笔记.md`;
      downloadFile(content, filename, 'text/markdown;charset=utf-8');
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
