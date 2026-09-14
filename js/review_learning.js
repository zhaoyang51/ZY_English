/** Five-part review: recall, evidence, feedback and personal output. */
(function () {
  const M = window.ReviewModel;
  const e = M.escape;
  const titles = ['学习路线', '语境词汇', '精读与翻译', '证据与错因', '语篇与迁移', '写作与运用'];
  let activeText = null;

  function fold(title, html) {
    return `<details class="review-reveal"><summary>${title}</summary><div class="review-reveal-body">${html}</div></details>`;
  }
  function note(key, label, placeholder, rows = 3) {
    return `<label class="review-note"><span>${e(label)}</span><textarea data-review-note="${e(key)}" rows="${rows}" placeholder="${e(placeholder)}"></textarea></label>`;
  }
  function checkpoint(section, label) {
    return `<label class="review-check"><input type="checkbox" data-review-check="${section}"><span>${e(label)}</span></label>`;
  }
  function task(label, body) {
    return `<aside class="review-task"><strong>${label}</strong><p>${body}</p></aside>`;
  }
  function pairsHtml(q) {
    const pairs = M.pairs(q);
    if (!pairs.length) return '';
    return `<div class="table-wrap"><table class="review-table"><thead><tr><th>原文表达</th><th>选项表达</th><th>核对关系</th></tr></thead><tbody>${pairs.map(p => `<tr><td>${e(p.source)}</td><td>${e(p.target)}</td><td>${e(p.logic)}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function optionHtml(q, opt) {
    const a = M.analysis(q, opt);
    return `<article class="review-option"><h4>${e(opt.key)}. ${e(opt.text)}</h4>
      <p>${e(opt.text_cn || '')}</p><p class="review-verdict">${opt.is_correct ? '✓ 正确选项' : `排除 · ${e(opt.trap_type || '与原文比对')}`}</p>
      ${a.position ? `<p><b>位置：</b>${e(a.position)}</p>` : ''}
      <blockquote>${e(a.source)}</blockquote>
      <p><b>证据比对：</b>${e(a.comparison || '本选项暂无独立解析，请对照定位句核对主体、范围和逻辑。')}</p>
      ${a.perspective ? fold('论证作用：为什么在这里写这句话', `<p>${e(a.perspective)}</p>`) : ''}
      ${a.theme ? fold('结合全文再次核对', `<p>${e(a.theme)}</p>`) : ''}
      </article>`;
  }

  function sentenceHtml(s, index) {
    const breakdown = (s.syntax?.breakdown || []).map(b => `<li><strong>${e(b.type)}：</strong><span lang="en">${e(b.content)}</span><p>${e(b.explanation)}</p></li>`).join('');
    return `<p class="review-source" lang="en">${e(s.text)}</p>
      ${task('先独立拆句', '找出限定动词及其主语，用括号括起修饰语；先译主干，再补条件、否定和逻辑关系。')}
      ${note(`s:${s.sid}:translation`, '我的主干与译文', '主语 / 谓语 / 宾语或表语：\n我的译文：')}
      ${fold('核对意群与句法', `<h4>参考意群</h4><p class="chunk-group">${window.renderColoredChunks(e(s.slashed_text || s.text))}</p><p class="review-muted">斜线是一种阅读辅助划分；英文和中文意群数量可能不同，不按颜色机械配对。</p><ul class="review-syntax">${breakdown || '<li>本句暂无独立句法说明。</li>'}</ul>`)}
      ${fold('核对参考译文', `<p>${e(s.translation)}</p>${s.chunk_translation ? fold('展开意群速译参考', `<p>${e(s.chunk_translation)}</p>`) : ''}<p class="review-muted">自查：主语是否错认？否定、比较、情态和数量是否漏译？参考译文用于核对信息，不要求逐字相同。</p>`)}
      <p class="review-muted">句 ${index + 1} · 回到左侧原段落，确认 this / that / they 等指代对象。</p>`;
  }

  function discourseHtml(t) {
    const ml = t.macro_logic || {};
    const functions = ml.paragraph_functions || [];
    const reference = `<p><b>体裁：</b>${e(ml.genre || '待补充')}</p><p><b>推进关系：</b>${e(ml.discourse_model || '待补充')}</p><p><b>参考主旨：</b>${e(ml.main_theme || '待补充')}</p>`;
    const paragraphs = t.paragraphs.map(p => {
      const pf = functions.find(f => f.pid === p.pid);
      return `<article class="review-paragraph"><h3>第 ${p.pid + 1} 段</h3>
        ${note(`p:${p.pid}:role`, '用一句话概括段意，并说明与上一段的关系', '本段讨论……，作用是提出问题 / 给出证据 / 反驳 / 补充 / 提出对策……')}
        ${fold('核对本段原文与参考段意', `<p lang="en">${e(p.text)}</p>${pf ? `<p><b>${e(pf.role)}</b> ${e(pf.core_point)}</p><p>${e(pf.cohesive_devices || '')}</p>` : '<p>本段暂无独立段意解析。</p>'}`)}</article>`;
    }).join('');
    const pb = ml.part_b_training;
    const training = pb?.target_paragraphs?.length && pb?.options?.length ? `<section class="review-part-b">
      <h3>小标题匹配 · 基于本文的配套练习</h3><p>为指定段落选择覆盖其中心意思的标题。这是能力迁移练习，不是试卷原有的新题型题目。</p>
      <div class="review-heading-pool">${pb.options.map(o => `<p><b>[${e(o.key)}]</b> ${e(o.heading)}</p>`).join('')}</div>
      ${pb.target_paragraphs.map(p => `<label class="review-match">第 ${p.pid + 1} 段<select aria-label="第 ${p.pid + 1} 段小标题" data-review-heading="${p.pid}"><option value="">请选择标题</option>${pb.options.map(o => `<option value="${e(o.key)}">${e(o.key)}. ${e(o.heading)}</option>`).join('')}</select></label>`).join('')}
      <button class="btn review-action" data-review-action="check-headings">提交并核对</button><div data-heading-result role="status" aria-live="polite"></div>
      ${fold('小标题判断方法', '<p>先锁定段落主题，再区分中心论点与支撑例子；候选标题要覆盖全段。用段内关键词、转折和指代交叉核对，不只看重复单词。</p>')}
      </section>` : '<p class="review-muted">本篇暂无配套小标题题目，可用上面的段意记录完成概括训练。</p>';
    return task('先重建文章，再看参考', '用“讨论对象 + 作者判断”写一句主旨，再检查每段如何推进它。引述者的话不自动等于作者立场。')
      + note('discourse:theme', '我的全文主旨与证据', '本文讨论……；作者认为……；依据是第……段的……')
      + fold('展开参考主旨', reference) + paragraphs + training
      + checkpoint(4, '我能概括全文和各段作用，并解释小标题的取舍。');
  }

  function writingAdvice(category) {
    if (/图表|趋势/.test(category)) return '仅在图表确有相应变化时使用。区分下降了（by）与下降到（to）；无数据时不要自行添加比例或时间段。';
    if (/归因|原因/.test(category)) return '确认能说明原因；仅有相关关系时用 may / could 等限定，避免把推测写成确定因果。';
    if (/举措|建议|升华/.test(category)) return '写清谁采取什么行动、解决什么问题；建议应与前文原因对应，避免空泛口号。';
    if (/转折|衔接/.test(category)) return '先确认前后句的逻辑方向，再选择连接词；加入 however 本身不会使两句构成转折。';
    return '检查搭配、主谓一致、时态与情态强度；替换模板槽位后，重新读一遍整句是否合乎语法。';
  }

  function writingHtml(t) {
    const corpus = t.writing_corpus || [];
    const cards = corpus.map((w, i) => {
      const source = (t.sentences || []).find(s => M.contains(s.text, w.expression));
      return `<article class="review-writing-card"><p class="review-kicker">${e(w.category || '表达积累')} · ${source ? '原文表达' : '拓展表达（改写）'}</p>
        <h3 lang="en">${e(w.expression)}</h3><p>${e(w.translation)}</p>
        ${source ? fold('查看原文出处', `<p lang="en">${e(source.text)}</p><p>第 ${source.pid + 1} 段</p>`) : '<p class="review-muted">这条表达用于写作迁移；下方例句是教学改写，不作原文引用。</p>'}
        <p class="review-usage"><b>使用边界：</b>${e(w.usage_note || writingAdvice(w.category || ''))}</p>
        <div class="review-template"><p>${e(w.template_slot || w.application_sentence || '')}</p><button class="toolbar-btn" data-review-action="copy" data-copy="${e(w.template_slot || w.application_sentence || '')}">复制句式</button></div>
        ${note(`w:${i}:draft`, '换一个话题，写出我的句子', '先不看例句，用校园学习、公共服务、科技或个人经历写一句英文。')}
        ${fold('展开改写示例与中文', `<p lang="en">${e(w.application_sentence || '')}</p><p>${e(w.sentence_cn || '')}</p><p class="review-muted">对照你的句子检查搭配与逻辑，不必为了复杂而增加从句。</p>`)}
        </article>`;
    }).join('');
    return task('本次只选 2—3 条，重点是会用', '优先选含义明确、适合当前话题的表达。先理解搭配，再独立仿写，最后把一句话扩成“观点 → 理由 → 例子”的短段。')
      + (cards || '<p>本篇暂无拓展语料。可从左侧原文选一句结构清楚的句子，保留句法后更换主题。</p>')
      + note('writing:paragraph', '我的迁移短段', '围绕一个话题写 3—4 句：观点、理由、例子或结果。', 5)
      + task('交付前自查', '表达意思是否准确？主谓与时态是否一致？例子是否支持观点？数字与事实有没有凭空编造？')
      + checkpoint(5, '我能在新话题中使用本篇表达，并检查自己的句子。')
      + '<div class="review-finish"><button class="btn review-action" data-review-action="complete">检查五部分自检进度</button><p data-review-status role="status" aria-live="polite"></p></div>';
  }

  function buildSteps(t, vocabularySteps) {
    activeText = t;
    const steps = [];
    const add = (section, title, html, meta = {}) => steps.push({ section, title, html, meta: { section, ...meta } });
    add(0, '一篇文章，留下五种学习成果', `<div class="review-route">${[1, 2, 3, 4, 5].map((s, i) => `<p><b>${s}. ${titles[s]}</b> — ${['解释语境词义并回忆搭配', '独立拆主干、翻译句子', '用原文解释选项并归因', '重建主旨、段意和段际关系', '迁移表达，写出自己的句子'][i]}</p>`).join('')}</div><p>先完成尝试，再展开参考。输入内容保存在当前浏览器，切换篇章或刷新后可以继续；导出笔记可带走自己的复盘记录。</p><p class="review-muted">参考解析帮助核对思路，最终判断仍要回到本文证据。</p>`);

    vocabularySteps.forEach(st => {
      const p = t.paragraphs.find(p => p.pid === st.meta.para);
      const candidates = M.vocabulary(t, p).filter(v => v.context).slice(0, 3);
      add(1, st.title, task('词汇的目标是看懂本句', '遮住释义，先根据主干和上下文猜词义；核对词性及固定搭配后，再收藏仍不熟悉的词。题项表达与原文词汇分别辨认。') + st.html
        + note(`p:${p.pid}:vocab`, '本段语境回忆', `选 3 个表达，写出语境义和搭配${candidates.length ? '，例如：' + candidates.map(v => v.word).join(' / ') : '。'}`), { para: p.pid });
    });
    add(1, '词汇自检', checkpoint(1, '遮住释义后，我能解释本篇重点词在原句中的意思，并复述搭配。'));

    t.paragraphs.forEach(p => {
      add(2, `第 ${p.pid + 1} 段 · 先读后译`, `<p class="review-source" lang="en">${e(p.text)}</p>`
        + note(`p:${p.pid}:summary`, '一句话概括本段', '本段的讨论对象、核心动作或观点是什么？')
        + fold('核对段落参考译文', `<p>${e(p.translation)}</p>`), { para: p.pid });
      t.sentences.filter(s => s.pid === p.pid).forEach((s, i) => add(2, `第 ${p.pid + 1} 段 · 句 ${i + 1}`, sentenceHtml(s, i), { para: p.pid, sid: s.sid }));
    });
    add(2, '精读自检', checkpoint(2, '我能找出主干，并在译文中保留否定、比较、数量与逻辑关系。'));

    t.questions.forEach(q => {
      const correct = q.options.find(o => o.is_correct);
      add(3, `第 ${q.qid} 题 · 用证据完成复盘`, `<h3>${e(q.stem)}</h3><p>${e(q.stem_cn === q.stem ? '' : q.stem_cn)}</p>`
        + task(`${e(q.type)} · 本题检查路径`, e(M.strategy(q.type || '')))
        + `<fieldset class="review-choice"><legend>先重新选择，再写出依据</legend>${q.options.map(o => `<label><input type="radio" name="review-q-${q.qid}" data-review-choice="${q.qid}" value="${e(o.key)}"><span><b>${e(o.key)}.</b> ${e(o.text)}</span></label>`).join('')}</fieldset>`
        + note(`q:${q.qid}:evidence`, '我的定位与取舍理由', '定位到第……段：“……”；正确项如何改写？最容易误选哪项，它改变了什么？')
        + fold('展开答案与证据链', `<p class="review-verdict">答案：${e(correct?.key || '待核对')}</p><h4>定位原文 · 第 ${q.locate_pid + 1} 段</h4><blockquote>${e(q.locate_sentence)}</blockquote><p>${e(q.locate_sentence_cn || '')}</p>${pairsHtml(q)}${q.options.map(o => optionHtml(q, o)).join('')}<p><b>本题小结：</b>${e(q.summary || '')}</p>`)
        + note(`q:${q.qid}:error`, '错因与下次行动（做对也可记录犹豫点）', '词义 / 句法 / 定位 / 范围 / 因果 / 作者态度：具体错在哪里？下次怎样验证？'), { qid: String(q.qid), para: q.locate_pid });
    });
    add(3, '题目复盘自检', checkpoint(3, '我能给出正确项的原文依据，并说明每个干扰项的具体偏差。'));
    add(4, '把文章连成一条逻辑线', discourseHtml(t));
    add(5, '从看懂表达，到自己写出来', writingHtml(t));
    return steps;
  }

  function getDraft() {
    return window.StorageModule.loadReviewDraft(activeText.year, activeText.text_id);
  }
  function save(field, key, value) {
    const result = window.StorageModule.saveReviewDraftField(activeText.year, activeText.text_id, field, key, value);
    if (!result) window.showToast?.('笔记未能保存，请导出备份并检查浏览器存储空间。');
  }
  function headingResults(box) {
    const pb = activeText.macro_logic?.part_b_training;
    const result = box.querySelector('[data-heading-result]');
    if (!pb || !result) return;
    const draft = getDraft();
    if (pb.target_paragraphs.some(p => !draft.headings[p.pid])) {
      result.textContent = '请先为每个指定段落选择标题，再核对答案。';
      return;
    }
    let count = 0;
    const rows = pb.target_paragraphs.map(p => {
      const selected = draft.headings[p.pid];
      const correct = pb.options.find(o => o.key === p.correct_key);
      const right = selected === p.correct_key;
      if (right) count++;
      return `<li><b>第 ${p.pid + 1} 段：${e(selected)} ${right ? '✓' : '✗'} → ${e(p.correct_key)}</b><p>${e(correct?.heading || '')}</p><p>${e(correct?.trap_analysis || '')}</p></li>`;
    }).join('');
    const distractors = pb.options.filter(o => o.is_distractor).map(o => `<li><b>${e(o.key)}. ${e(o.heading)}</b><p>${e(o.trap_analysis || '')}</p></li>`).join('');
    result.innerHTML = `<p class="review-verdict">答对 ${count} / ${pb.target_paragraphs.length}</p><ul>${rows}</ul>${distractors ? `<h4>干扰标题为什么不合适</h4><ul>${distractors}</ul>` : ''}`;
  }
  function mount(container) {
    if (!activeText) return;
    const draft = getDraft();
    container.querySelectorAll('[data-review-note]').forEach(el => { el.value = draft.notes[el.dataset.reviewNote] || ''; });
    container.querySelectorAll('[data-review-check]').forEach(el => { el.checked = !!draft.checks[el.dataset.reviewCheck]; });
    container.querySelectorAll('[data-review-choice]').forEach(el => { el.checked = draft.choices[el.dataset.reviewChoice] === el.value; });
    container.querySelectorAll('[data-review-heading]').forEach(el => { el.value = draft.headings[el.dataset.reviewHeading] || ''; });
    if (container.dataset.reviewBound) return;
    container.dataset.reviewBound = 'true';
    container.addEventListener('input', ev => {
      const el = ev.target;
      if (el.matches('[data-review-note]')) save('notes', el.dataset.reviewNote, el.value);
    });
    container.addEventListener('change', ev => {
      const el = ev.target;
      if (el.matches('[data-review-check]')) save('checks', el.dataset.reviewCheck, el.checked);
      if (el.matches('[data-review-choice]')) save('choices', el.dataset.reviewChoice, el.value);
      if (el.matches('[data-review-heading]')) {
        save('headings', el.dataset.reviewHeading, el.value);
        el.closest('.review-part-b').querySelector('[data-heading-result]').textContent = '';
      }
    });
    container.addEventListener('click', ev => {
      const btn = ev.target.closest('[data-review-action]');
      if (!btn) return;
      if (btn.dataset.reviewAction === 'copy') window.QuizModule.copyTemplateSlot(btn, btn.dataset.copy);
      if (btn.dataset.reviewAction === 'check-headings') headingResults(btn.closest('.review-part-b'));
      if (btn.dataset.reviewAction === 'complete') {
        const current = getDraft();
        const pending = [1, 2, 3, 4, 5].filter(s => !current.checks[s]);
        const result = btn.closest('.review-finish').querySelector('[data-review-status]');
        result.textContent = pending.length ? `已自检 ${5 - pending.length} / 5；待完成：${pending.map(s => `${s}. ${titles[s]}`).join('、')}。可使用“章节跳转”返回。` : '五部分自检已完成。建议隔一段时间再遮住答案回忆，并导出个人复盘笔记。';
        if (!pending.length) window.StorageModule.markTextCompleted(activeText.year, activeText.text_id);
      }
    });
  }

  function markdown(t) {
    const draft = window.StorageModule.loadReviewDraft(t.year, t.text_id);
    const lines = [`# ${t.year} 年 Text ${t.text_id} 复盘笔记`, '', '> 基于项目内篇章资料；配套迁移练习及改写示例不作试卷原题或原文引用。', ''];
    const personal = key => { if (draft.notes[key]) lines.push('**我的记录**', '', draft.notes[key], ''); };
    const status = s => lines.push(`自检：${draft.checks[s] ? '已勾选' : '未勾选'}`, '');
    lines.push('## 1. 语境词汇', '');
    for (const p of t.paragraphs) {
      lines.push(`### 第 ${p.pid + 1} 段`, '');
      for (const v of M.vocabulary(t, p)) {
        lines.push(`- **${v.word}** ${v.pos || ''} ${v.definition || ''}`);
        if (v.context) lines.push(`  - ${v.context.label}：${v.context.text}`);
      }
      lines.push(''); personal(`p:${p.pid}:vocab`);
    }
    status(1);
    lines.push('## 2. 精读与翻译', '');
    for (const p of t.paragraphs) {
      lines.push(`### 第 ${p.pid + 1} 段`, '', p.text, ''); personal(`p:${p.pid}:summary`);
      lines.push(`参考段落译文：${p.translation || ''}`, '');
      for (const s of t.sentences.filter(s => s.pid === p.pid)) {
        lines.push(s.text, ''); personal(`s:${s.sid}:translation`);
        lines.push(`参考意群：${s.slashed_text || ''}`, '', `参考译文：${s.translation || ''}`, '');
        for (const b of s.syntax?.breakdown || []) lines.push(`- **${b.type}** ${b.content} — ${b.explanation}`);
        lines.push('');
      }
    }
    status(2);
    lines.push('## 3. 证据与错因', '');
    for (const q of t.questions) {
      lines.push(`### 第 ${q.qid} 题`, '', q.stem, '', `我的复选：${draft.choices[q.qid] || '未选择'}`, '');
      personal(`q:${q.qid}:evidence`);
      lines.push(`定位句：${q.locate_sentence || ''}`, '');
      for (const p of M.pairs(q)) lines.push(`- ${p.source} → ${p.target}；${p.logic}`);
      for (const o of q.options) {
        const a = M.analysis(q, o);
        lines.push('', `**${o.key}. ${o.text}**（${o.is_correct ? '正确' : o.trap_type || '干扰'}）`, '', a.comparison || '暂无独立解析。');
        if (a.perspective) lines.push('', a.perspective);
        if (a.theme) lines.push('', a.theme);
      }
      lines.push('', q.summary || '', ''); personal(`q:${q.qid}:error`);
    }
    status(3);
    lines.push('## 4. 语篇与迁移', ''); personal('discourse:theme');
    const ml = t.macro_logic || {};
    lines.push(ml.main_theme || '', '', ml.discourse_model || '', '');
    for (const p of t.paragraphs) {
      lines.push(`### 第 ${p.pid + 1} 段`, ''); personal(`p:${p.pid}:role`);
      const f = (ml.paragraph_functions || []).find(f => f.pid === p.pid);
      if (f) lines.push(`${f.role}：${f.core_point}`, '', f.cohesive_devices || '', '');
    }
    const pb = ml.part_b_training;
    if (pb) {
      lines.push('### 小标题配套练习', '');
      for (const p of pb.target_paragraphs || []) {
        const o = (pb.options || []).find(o => o.key === p.correct_key);
        lines.push(`- 第 ${p.pid + 1} 段：我的选择 ${draft.headings[p.pid] || '未选择'}；答案 ${p.correct_key}. ${o?.heading || ''}；${o?.trap_analysis || ''}`);
      }
      lines.push('');
    }
    status(4);
    lines.push('## 5. 写作与运用', '');
    (t.writing_corpus || []).forEach((w, i) => {
      lines.push(`### ${w.expression || '表达'}`, '', w.translation || '', '', `使用边界：${w.usage_note || writingAdvice(w.category || '')}`, '', `句式：${w.template_slot || ''}`, '', `改写示例：${w.application_sentence || ''}`, '', w.sentence_cn || '', '');
      personal(`w:${i}:draft`);
    });
    personal('writing:paragraph'); status(5);
    return lines.join('\n');
  }

  window.ReviewLearningModule = { buildSteps, mount, markdown, optionHtml };
})();
