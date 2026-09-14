/** Read-only content helpers shared by review, practice and exports. */
(function () {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
  const normalize = value => String(value || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
  function contains(text, term) {
    const needle = normalize(term);
    if (!needle) return false;
    return new RegExp(`(^|[^a-z])${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[^a-z])`, 'i').test(normalize(text));
  }
  function context(text, word, pid) {
    const sentences = text.sentences || [];
    const sent = sentences.find(s => s.pid === pid && contains(s.text, word)) || sentences.find(s => contains(s.text, word));
    if (sent) return { text: sent.text, translation: sent.translation || '', sid: sent.sid, label: `原文第 ${sent.pid + 1} 段` };
    for (const q of text.questions || []) for (const o of q.options || []) {
      if (contains(o.text, word)) return { text: o.text, translation: o.text_cn || '', label: `第 ${q.qid} 题 · 选项 ${o.key}` };
    }
    return null;
  }
  function vocabulary(t, p) {
    const seen = new Set();
    return (p.vocabulary || []).filter(v => {
      const key = normalize(v.word);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(v => ({ ...v, context: context(t, v.word, p.pid) }));
  }
  function analysis(q, o) {
    const a = o.analysis || {};
    return {
      practice_status: a.practice_status || '',
      option_nature: a.option_nature || (o.is_correct ? '正确选项' : o.trap_type || '干扰项'),
      source_sentence: a.source_sentence || q.locate_sentence || '',
      source_translation: a.source_translation || q.locate_sentence_cn || '',
      position: a.position || '',
      locator_comparison: a.locator_comparison || a.logic_check || '',
      writing_perspective: a.writing_perspective || '',
      theme_validation: a.theme_validation || '',
      verdict: a.verdict || (o.is_correct ? `结论：${o.key} 项与上述证据对应。` : `结论：排除 ${o.key} 项，具体偏差见上方证据比对。`)
    };
  }
  function pairs(q) {
    return (q.synonym_pairs || []).map(p => ({ opt_term: p.opt_term || p.target || '', text_term: p.text_term || p.source || '', logic: p.logic || '同义改写：表述变化，原文中的主体与判断关系保持对应。' })).filter(p => p.opt_term && p.text_term);
  }
  function typeExplanation(type) {
    if (/主旨|标题|大意/.test(type)) return '主旨题概括全文反复讨论的对象和核心判断。局部事实即使正确，也不一定能概括整篇文章。';
    if (/态度/.test(type)) return '态度题区分作者与引述者的声音，评价词、转折和结尾共同限定态度。文章讨论负面现象，不代表作者对所有相关事物都持否定态度。';
    if (/推断|推理/.test(type)) return '推断必须由文中事实支持。原文说“可能”不等于“一定”，说明相关关系也不等于证明因果。';
    if (/例证/.test(type)) return '例证题的答案指向例子服务的观点。人物、事件或数字是论据，例子本身的事实不能代替其论证作用。';
    if (/词义|语义/.test(type)) return '语境义由当前搭配与上下文关系限定。词典中最常见的词义，不一定适合这个句子。';
    return '细节题以原文对应信息为依据。同义改写可以更换词汇或句式，但不能改变主体、时间、范围、程度和逻辑关系。';
  }
  function writingUsage(w) {
    if (w.usage_note) return w.usage_note;
    const expression = (w.expression || '') + ' ' + (w.template_slot || '');
    if (/\bnot only\b/i.test(expression)) return 'not only ... but also ... 两侧结构应平行。not only 前置且修饰分句时，第一分句通常需要部分倒装；普通位置不必倒装。';
    if (/\bnot\b.*\bbut\b/i.test(expression)) return 'not ... but ... 对照两个并列成分，前后保持语法平行；它否定前项、肯定后项，不能颠倒立场。';
    if (/without\s+\w+ing/i.test(expression)) return 'without 是介词，后接名词或动名词。该结构表示在不造成某种影响的前提下完成主句动作。';
    if (/\bshould\b.*\bwould\b/i.test(expression)) return '句首 Should + 主语 + 动词原形是省略 if 的条件句；主句的 would 表示假设后果，不是已经发生的事实。';
    if (/图表|趋势/.test(w.category || '')) return '图表表达要区分变化幅度（by）与终点值（to）。示例中的时间、比例和变化趋势仅用于演示句法，须与实际图表信息对应。';
    if (/归因|原因/.test(w.category || '')) return '这类表达解释原因或影响。确定因果需要证据；仅表示可能影响时，may / could 等情态词可以保留推测强度。';
    if (/举措|建议|升华/.test(w.category || '')) return '建议句需包含明确的行动主体与可执行动作。should 表示建议或义务，不等同于该行动已经发生。';
    return '例句展示该表达的搭配和句式。替换主语、时态或宾语时，相应的动词形式和代词也需调整；复杂程度本身不代表表达更准确。';
  }
  function writingSource(t, w) {
    if (w.source_excerpt && (t.paragraphs || []).some(p => contains(p.text, w.source_excerpt))) {
      return (t.sentences || []).find(s => contains(s.text, w.source_excerpt))?.text || w.source_excerpt;
    }
    return (t.sentences || []).find(s => contains(s.text, w.expression))?.text || '';
  }
  window.ReviewContent = { escape, normalize, contains, context, vocabulary, analysis, pairs, typeExplanation, writingUsage, writingSource };
})();
