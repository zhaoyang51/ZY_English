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

  // Unified Cross-Device Sync & Import/Export Modal UI (Shared across Vocab Book, Exporter & MoMo Settings)
  window.VocabSyncUI = {
    state: {
      kind: 'vocabBook', // 'vocabBook' | 'progress'
      action: 'export'   // 'export' | 'import'
    },

    ensureModal() {
      let overlay = document.getElementById('vocabSyncModal');
      if (overlay) return overlay;

      overlay = document.createElement('div');
      overlay.id = 'vocabSyncModal';
      overlay.className = 'modal-overlay';
      overlay.style.zIndex = '340';
      overlay.innerHTML = `
        <div class="modal-dialog" style="width:560px;max-width:95vw;max-height:90vh;display:flex;flex-direction:column">
          <div class="modal-header" style="padding:14px 20px">
            <span id="vocabSyncTitle" style="font-weight:800;font-size:1.08em;color:var(--mode-color,#047857)">☁️ 导入导出中心</span>
            <button type="button" class="toolbar-btn" id="vocabSyncCloseBtn" style="padding:4px 10px">✕ 关闭</button>
          </div>
          <div class="modal-body" style="padding:16px 20px;overflow-y:auto;display:flex;flex-direction:column;gap:12px">
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:space-between">
              <div class="btn-group" style="display:inline-flex;gap:6px">
                <button type="button" class="btn" id="vocabSyncKindBook" style="padding:6px 12px;font-size:13px">📒 生词本</button>
                <button type="button" class="btn" id="vocabSyncKindProgress" style="padding:6px 12px;font-size:13px">📊 背诵进度</button>
              </div>
              <div class="btn-group" style="display:inline-flex;gap:6px">
                <button type="button" class="btn" id="vocabSyncTabExport" style="padding:6px 12px;font-size:13px">📤 导出备份</button>
                <button type="button" class="btn" id="vocabSyncTabImport" style="padding:6px 12px;font-size:13px">📥 导入恢复</button>
              </div>
            </div>

            <div id="vocabSyncSummary" style="padding:10px 12px;border-radius:10px;background:var(--card-bg,rgba(0,0,0,0.03));border:1px solid var(--border,rgba(0,0,0,0.1));font-size:13px;line-height:1.5"></div>

            <!-- Export Panel -->
            <div id="vocabSyncExportPanel" style="display:flex;flex-direction:column;gap:10px">
              <div id="vocabSyncExportOpts" style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;font-size:13px"></div>
              <textarea id="vocabSyncExportText" readonly rows="6" style="width:100%;box-sizing:border-box;padding:10px;border-radius:8px;border:1px solid var(--border,rgba(0,0,0,0.15));font-family:monospace;font-size:12px;resize:vertical;background:var(--bg,#f8fafc);color:var(--ink,#1e293b)"></textarea>
              <div style="display:flex;gap:10px;flex-wrap:wrap">
                <button type="button" class="btn" id="vocabSyncBtnDownload" style="flex:1;min-width:140px;background:var(--primary,#047857);color:#fff;font-weight:700;padding:9px 14px">💾 下载备份文件</button>
                <button type="button" class="btn" id="vocabSyncBtnCopy" style="flex:1;min-width:140px;border:1px solid var(--border,rgba(0,0,0,0.18));font-weight:700;padding:9px 14px">📋 复制同步文本</button>
              </div>
            </div>

            <!-- Import Panel -->
            <div id="vocabSyncImportPanel" style="display:none;flex-direction:column;gap:10px">
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                <input type="file" id="vocabSyncFileInput" accept=".json,.txt,.csv,.tsv" style="display:none">
                <button type="button" class="btn" id="vocabSyncBtnPickFile" style="border:1px dashed var(--primary,#047857);color:var(--primary,#047857);font-weight:700;padding:8px 14px">📂 选择本地备份文件 (.json / .txt / .csv)</button>
                <span id="vocabSyncFileName" style="font-size:12px;color:var(--muted,#64748b)">未选择文件（也可直接在下方粘贴）</span>
              </div>
              <textarea id="vocabSyncImportText" rows="6" placeholder="粘贴导出的 JSON 数据，或每行一个单词（如 abandon 或 abandon&#9;v. 放弃）..." style="width:100%;box-sizing:border-box;padding:10px;border-radius:8px;border:1px solid var(--border,rgba(0,0,0,0.15));font-family:monospace;font-size:12px;resize:vertical;background:var(--bg,#fff);color:var(--ink,#1e293b)"></textarea>
              <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;font-size:13px">
                <label style="display:inline-flex;align-items:center;gap:5px;cursor:pointer">
                  <input type="radio" name="vocabSyncMode" value="merge" checked>
                  <span>🔀 智能合并（保留本地并融合最新）</span>
                </label>
                <label style="display:inline-flex;align-items:center;gap:5px;cursor:pointer">
                  <input type="radio" name="vocabSyncMode" value="replace">
                  <span>♻️ 完全覆盖（替换当前设备数据）</span>
                </label>
              </div>
              <div id="vocabSyncImportExtraOpts" style="font-size:13px"></div>
              <button type="button" class="btn" id="vocabSyncBtnConfirmImport" style="background:var(--primary,#047857);color:#fff;font-weight:700;padding:10px 16px">✅ 确认导入并立即同步</button>
            </div>

            <div id="vocabSyncFeedback" style="display:none;padding:9px 12px;border-radius:8px;font-size:13px;font-weight:600"></div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      this.bindEvents(overlay);
      return overlay;
    },

    bindEvents(overlay) {
      const closeBtn = overlay.querySelector('#vocabSyncCloseBtn');
      if (closeBtn) closeBtn.onclick = () => this.close();
      overlay.addEventListener('click', e => {
        if (e.target === overlay) this.close();
      });

      overlay.querySelector('#vocabSyncKindBook').onclick = () => {
        this.state.kind = 'vocabBook';
        this.refreshUI();
      };
      overlay.querySelector('#vocabSyncKindProgress').onclick = () => {
        this.state.kind = 'progress';
        this.refreshUI();
      };
      overlay.querySelector('#vocabSyncTabExport').onclick = () => {
        this.state.action = 'export';
        this.refreshUI();
      };
      overlay.querySelector('#vocabSyncTabImport').onclick = () => {
        this.state.action = 'import';
        this.refreshUI();
      };

      const fileBtn = overlay.querySelector('#vocabSyncBtnPickFile');
      const fileInput = overlay.querySelector('#vocabSyncFileInput');
      const fileNameSpan = overlay.querySelector('#vocabSyncFileName');
      const importTextarea = overlay.querySelector('#vocabSyncImportText');

      if (fileBtn && fileInput) {
        fileBtn.onclick = () => fileInput.click();
        fileInput.onchange = () => {
          const file = fileInput.files && fileInput.files[0];
          if (!file) return;
          if (fileNameSpan) fileNameSpan.textContent = `已读取：${file.name}`;
          const reader = new FileReader();
          reader.onload = ev => {
            if (importTextarea) importTextarea.value = String((ev.target && ev.target.result) || '');
            this.showFeedback(`已载入文件「${file.name}」，请确认同步模式后点击「确认导入并立即同步」。`, 'info');
          };
          reader.readAsText(file, 'utf-8');
        };
      }

      const btnDownload = overlay.querySelector('#vocabSyncBtnDownload');
      if (btnDownload) {
        btnDownload.onclick = () => {
          if (this.state.kind === 'vocabBook') {
            const fmtEl = overlay.querySelector('input[name="vocabSyncExportFmt"]:checked');
            const fmt = fmtEl ? fmtEl.value : 'json';
            window.ExporterModule.exportVocabBookFile(fmt);
            this.showFeedback('✅ 生词本备份文件已开始下载！', 'success');
          } else {
            const incBook = overlay.querySelector('#vocabSyncChkIncludeBook');
            window.ExporterModule.exportStudyProgressFile({ includeVocabBook: incBook ? incBook.checked : true });
            this.showFeedback('✅ 单词背诵进度备份文件已开始下载！', 'success');
          }
        };
      }

      const btnCopy = overlay.querySelector('#vocabSyncBtnCopy');
      if (btnCopy) {
        btnCopy.onclick = () => {
          const exportArea = overlay.querySelector('#vocabSyncExportText');
          const text = exportArea ? exportArea.value : '';
          if (!text) return;
          const copyDone = () => this.showFeedback('✅ 已复制到剪贴板！可直接粘贴发送到另一台设备。', 'success');
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(copyDone).catch(() => {
              exportArea.select();
              try { document.execCommand('copy'); copyDone(); } catch (e) { this.showFeedback('请长按上方文本框全选复制。', 'info'); }
            });
          } else {
            exportArea.select();
            try { document.execCommand('copy'); copyDone(); } catch (e) { this.showFeedback('请长按上方文本框全选复制。', 'info'); }
          }
        };
      }

      const btnConfirmImport = overlay.querySelector('#vocabSyncBtnConfirmImport');
      if (btnConfirmImport) {
        btnConfirmImport.onclick = () => this.executeImport();
      }
    },

    open(kind = 'vocabBook', action = 'export') {
      this.state.kind = kind === 'progress' ? 'progress' : 'vocabBook';
      this.state.action = action === 'import' ? 'import' : 'export';
      const overlay = this.ensureModal();
      const fb = overlay.querySelector('#vocabSyncFeedback');
      if (fb) fb.style.display = 'none';
      const fileInput = overlay.querySelector('#vocabSyncFileInput');
      if (fileInput) fileInput.value = '';
      const fileNameSpan = overlay.querySelector('#vocabSyncFileName');
      if (fileNameSpan) fileNameSpan.textContent = '未选择文件（也可直接在下方粘贴）';
      this.refreshUI();
      overlay.classList.add('show');
    },

    close() {
      const overlay = document.getElementById('vocabSyncModal');
      if (overlay) overlay.classList.remove('show');
    },

    showFeedback(msg, tone = 'info') {
      const overlay = document.getElementById('vocabSyncModal');
      if (!overlay) return;
      const fb = overlay.querySelector('#vocabSyncFeedback');
      if (!fb) return;
      fb.style.display = 'block';
      fb.textContent = msg;
      if (tone === 'success') {
        fb.style.background = 'rgba(16,185,129,0.12)';
        fb.style.color = '#047857';
        fb.style.border = '1px solid rgba(16,185,129,0.3)';
      } else if (tone === 'error') {
        fb.style.background = 'rgba(239,68,68,0.1)';
        fb.style.color = '#b91c1c';
        fb.style.border = '1px solid rgba(239,68,68,0.3)';
      } else {
        fb.style.background = 'rgba(59,130,246,0.1)';
        fb.style.color = '#1d4ed8';
        fb.style.border = '1px solid rgba(59,130,246,0.25)';
      }
    },

    refreshUI() {
      const overlay = this.ensureModal();
      const isBook = this.state.kind === 'vocabBook';
      const isExport = this.state.action === 'export';

      overlay.querySelector('#vocabSyncKindBook').classList.toggle('active', isBook);
      overlay.querySelector('#vocabSyncKindProgress').classList.toggle('active', !isBook);
      overlay.querySelector('#vocabSyncTabExport').classList.toggle('active', isExport);
      overlay.querySelector('#vocabSyncTabImport').classList.toggle('active', !isExport);

      overlay.querySelector('#vocabSyncTitle').textContent = isBook
        ? (isExport ? '📒 导出生词本' : '📒 导入生词本')
        : (isExport ? '📊 导出单词背诵进度' : '📊 导入单词背诵进度');

      const summaryEl = overlay.querySelector('#vocabSyncSummary');
      const exportPanel = overlay.querySelector('#vocabSyncExportPanel');
      const importPanel = overlay.querySelector('#vocabSyncImportPanel');
      const exportOpts = overlay.querySelector('#vocabSyncExportOpts');
      const importExtra = overlay.querySelector('#vocabSyncImportExtraOpts');
      const importArea = overlay.querySelector('#vocabSyncImportText');

      exportPanel.style.display = isExport ? 'flex' : 'none';
      importPanel.style.display = isExport ? 'none' : 'flex';

      if (isBook) {
        const list = window.StorageModule ? window.StorageModule.getVocabBook() : [];
        summaryEl.innerHTML = isExport
          ? `当前生词本共有 <strong>${list.length}</strong> 个收藏生词（支持完整 JSON 备份或 TXT 词表导出）。`
          : `支持导入 <strong>JSON 备份</strong>、<strong>Anki/TSV</strong>、<strong>CSV</strong> 或<strong>纯单词列表</strong>（每行一个词，系统将自动补全音标、释义与真题原句）。`;

        if (isExport) {
          exportOpts.innerHTML = `
            <label style="display:inline-flex;align-items:center;gap:5px;cursor:pointer">
              <input type="radio" name="vocabSyncExportFmt" value="json" checked>
              <span>JSON 完整备份 (推荐 · 含释义/原句/笔记)</span>
            </label>
            <label style="display:inline-flex;align-items:center;gap:5px;cursor:pointer">
              <input type="radio" name="vocabSyncExportFmt" value="txt">
              <span>TXT 制表符词表</span>
            </label>
          `;
          const updateExportText = () => {
            const fmtEl = overlay.querySelector('input[name="vocabSyncExportFmt"]:checked');
            const fmt = fmtEl ? fmtEl.value : 'json';
            const area = overlay.querySelector('#vocabSyncExportText');
            if (!window.StorageModule || !window.StorageModule.exportVocabBookData) return;
            if (fmt === 'txt') {
              area.value = window.StorageModule.exportVocabBookData({ format: 'txt' }).content;
            } else {
              area.value = JSON.stringify(window.StorageModule.exportVocabBookData({ format: 'json' }), null, 2);
            }
          };
          overlay.querySelectorAll('input[name="vocabSyncExportFmt"]').forEach(r => { r.onchange = updateExportText; });
          updateExportText();
        } else {
          importExtra.innerHTML = '';
          if (importArea) {
            importArea.placeholder = '在此粘贴导出的 JSON 内容，或直接粘贴单词列表（如：\nresilient\nsubstantial  adj. 大量的；实质的）...';
          }
        }
      } else {
        const progData = (window.VocabModule && window.VocabModule.exportStudyProgress)
          ? window.VocabModule.exportStudyProgress({ includeVocabBook: true })
          : { summary: { totalTrackedWords: 0, masteredCount: 0, learningCount: 0, vocabBookCount: 0 } };
        const sm = progData.summary || {};
        summaryEl.innerHTML = isExport
          ? `当前共记录 <strong>${sm.totalTrackedWords || 0}</strong> 个背诵单词（🏆 已掌握 <strong>${sm.masteredCount || 0}</strong> · 📖 记忆中 <strong>${sm.learningCount || 0}</strong> · 📒 生词本 <strong>${sm.vocabBookCount || 0}</strong>）。`
          : `选择或粘贴另一台设备导出的 <strong>背诵进度 JSON 备份</strong>，一键恢复记忆曲线、当前词书进度、个人笔记与生词本。`;

        if (isExport) {
          exportOpts.innerHTML = `
            <label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer">
              <input type="checkbox" id="vocabSyncChkIncludeBook" checked>
              <span>同时打包生词本收藏 (${sm.vocabBookCount || 0}词) 与个人助记笔记 (${sm.notesCount || 0}条)</span>
            </label>
          `;
          const updateProgText = () => {
            const chk = overlay.querySelector('#vocabSyncChkIncludeBook');
            const area = overlay.querySelector('#vocabSyncExportText');
            if (!window.VocabModule || !window.VocabModule.exportStudyProgress) return;
            const d = window.VocabModule.exportStudyProgress({ includeVocabBook: chk ? chk.checked : true });
            area.value = JSON.stringify(d, null, 2);
          };
          const chk = overlay.querySelector('#vocabSyncChkIncludeBook');
          if (chk) chk.onchange = updateProgText;
          updateProgText();
        } else {
          importExtra.innerHTML = `
            <label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer">
              <input type="checkbox" id="vocabSyncChkImportBook" checked>
              <span>若备份中包含生词本收藏，同步导入生词本</span>
            </label>
          `;
          if (importArea) {
            importArea.placeholder = '在此粘贴另一台设备导出的背诵进度 JSON 文本...';
          }
        }
      }
    },

    executeImport() {
      const overlay = document.getElementById('vocabSyncModal');
      if (!overlay) return;
      const rawText = (overlay.querySelector('#vocabSyncImportText')?.value || '').trim();
      if (!rawText) {
        this.showFeedback('请先选择备份文件，或粘贴要导入的内容。', 'error');
        return;
      }
      const modeEl = overlay.querySelector('input[name="vocabSyncMode"]:checked');
      const mode = modeEl ? modeEl.value : 'merge';

      if (mode === 'replace' && !confirm('确定使用「完全覆盖」模式吗？当前设备对应的本地记录将被替换为导入内容。')) {
        return;
      }

      if (this.state.kind === 'vocabBook') {
        const res = window.StorageModule.importVocabBookData(rawText, { mode });
        if (!res.ok) {
          this.showFeedback(res.message || '导入失败', 'error');
          return;
        }
        if (typeof window.renderVocabBookModal === 'function') {
          window.renderVocabBookModal();
        }
        if (window.VocabModule && typeof window.VocabModule.applyFiltersAndRender === 'function') {
          window.VocabModule.applyFiltersAndRender();
          window.VocabModule.updateHomeView();
        }
        this.refreshUI();
        this.showFeedback(`✅ 生词本导入成功！新增 ${res.added} 词，补充更新 ${res.updated} 词，当前共 ${res.total} 词。`, 'success');
        if (window.VocabModule && typeof window.VocabModule.showToast === 'function') {
          window.VocabModule.showToast(`✅ 生词本已导入（共 ${res.total} 词）`);
        }
      } else {
        const incBookEl = overlay.querySelector('#vocabSyncChkImportBook');
        const includeVocabBook = incBookEl ? incBookEl.checked : true;
        if (!window.VocabModule || !window.VocabModule.importStudyProgress) {
          this.showFeedback('背诵模块尚未加载完成，请稍后重试。', 'error');
          return;
        }
        const res = window.VocabModule.importStudyProgress(rawText, { mode, includeVocabBook });
        if (!res.ok) {
          this.showFeedback(res.message || '导入失败', 'error');
          return;
        }
        if (typeof window.renderVocabBookModal === 'function') {
          window.renderVocabBookModal();
        }
        this.refreshUI();
        this.showFeedback(`✅ 背诵进度同步成功！共追踪 ${res.totalTracked} 词（新增 ${res.addedWords} 词、更新 ${res.updatedWords} 词，掌握 ${res.masteredCount} 词）。`, 'success');
        if (window.VocabModule && typeof window.VocabModule.showToast === 'function') {
          window.VocabModule.showToast(`✅ 背诵进度已同步（${res.totalTracked} 词）`);
        }
      }
    }
  };

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
        const safeWord = String(item.word || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const exampleField = safeWord ? (item.sentence || '').replace(new RegExp(`(${safeWord})`, 'gi'), '<font color="#2563eb"><b>$1</b></font>').replace(/[\t\r\n]/g, ' ') : (item.sentence || '').replace(/[\t\r\n]/g, ' ');
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
          `**答案：${q.options.find(o => o.is_correct)?.key || '待补充'}**`, '',
          q.summary ? `> **命题深层逻辑与选项剖析**：${q.summary}` : '',
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

    exportVocabBookFile(format = 'json') {
      if (!window.StorageModule || !window.StorageModule.exportVocabBookData) return;
      const dateStr = new Date().toISOString().slice(0, 10);
      if (format === 'txt') {
        const res = window.StorageModule.exportVocabBookData({ format: 'txt' });
        downloadFile(res.content, `考研英语二_生词本_${res.count}词_${dateStr}.txt`, 'text/plain;charset=utf-8');
        return res;
      }
      const data = window.StorageModule.exportVocabBookData({ format: 'json' });
      const content = JSON.stringify(data, null, 2);
      downloadFile(content, `考研英语二_生词本备份_${data.count}词_${dateStr}.json`, 'application/json;charset=utf-8');
      return { data, content };
    },

    exportStudyProgressFile(options = {}) {
      if (!window.VocabModule || !window.VocabModule.exportStudyProgress) return;
      const data = window.VocabModule.exportStudyProgress(options);
      const dateStr = new Date().toISOString().slice(0, 10);
      const content = JSON.stringify(data, null, 2);
      const total = (data.summary && data.summary.totalTrackedWords) || 0;
      downloadFile(content, `考研英语二_背诵进度备份_${total}词_${dateStr}.json`, 'application/json;charset=utf-8');
      return { data, content };
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
