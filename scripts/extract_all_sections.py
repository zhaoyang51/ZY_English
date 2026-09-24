import os, re, json, zipfile
import xml.etree.ElementTree as ET

def read_docx_paragraphs(fp):
    with zipfile.ZipFile(fp) as z:
        xml_content = z.read('word/document.xml')
        root = ET.fromstring(xml_content)
        texts = []
        for p in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            t = ''.join(node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text)
            if t.strip():
                texts.append(t.strip())
        return texts

def extract_year_sections(year):
    fp = f'英二试题/考研英语二{year}年真题（整卷）.docx'
    if not os.path.exists(fp):
        return None
    lines = read_docx_paragraphs(fp)
    
    sec1_idx, sec2_idx, part_b_idx, sec3_idx, sec4_idx = None, None, None, None, None
    for i, line in enumerate(lines):
        clean = re.sub(r'\s+', ' ', line).strip()
        if re.search(r'Section\s+I\b', clean, re.I) and 'Use of English' in clean:
            sec1_idx = i
        elif re.search(r'Section\s+II\b', clean, re.I) and 'Reading' in clean:
            sec2_idx = i
        elif re.search(r'Part\s+B\b', clean, re.I) and (sec2_start := (sec2_idx is not None and sec3_idx is None)):
            part_b_idx = i
        elif re.search(r'Section\s+III\b', clean, re.I) and 'Translation' in clean:
            sec3_idx = i
        elif re.search(r'Section\s+IV\b', clean, re.I) and 'Writing' in clean:
            sec4_idx = i

    # ==========================
    # 1. Section I: Use of English
    # ==========================
    s1_lines = lines[sec1_idx:sec2_idx]
    s1_dir = ""
    s1_text_lines = []
    s1_q_lines = []
    in_dir = False
    in_text = False
    in_questions = False
    
    for l in s1_lines:
        clean = l.strip()
        if 'Directions:' in clean:
            in_dir = True
            continue
        if in_dir and not in_text:
            s1_dir += " " + clean
            if re.search(r'\(\s*10\s*points\s*\)', clean, re.I) or clean.endswith('.'):
                in_dir = False
                in_text = True
                continue
        if in_text:
            if re.match(r'^1\s*\.', clean):
                in_text = False
                in_questions = True
                s1_q_lines.append(clean)
            else:
                s1_text_lines.append(clean)
        elif in_questions:
            s1_q_lines.append(clean)

    # Parse 20 questions
    s1_questions = []
    current_q = None
    for l in s1_q_lines:
        m_q = re.match(r'^(\d+)\s*\.', l)
        if m_q:
            if current_q:
                s1_questions.append(current_q)
            current_q = {
                'qid': int(m_q.group(1)),
                'options': {}
            }
            continue
        m_opt = re.match(r'^\[\s*([A-D])\s*\]\s*(.*)', l)
        if m_opt and current_q:
            current_q['options'][m_opt.group(1)] = m_opt.group(2).strip()
    if current_q:
        s1_questions.append(current_q)

    # ==========================
    # 2. Section II Part B
    # ==========================
    pb_lines = lines[part_b_idx:sec3_idx]
    pb_dir = ""
    pb_text_lines = []
    pb_item_lines = []
    pb_opt_lines = []
    
    in_pb_dir = False
    in_pb_text = False
    in_pb_items = False
    
    for l in pb_lines:
        clean = l.strip()
        if 'Part B' in clean:
            continue
        if 'Directions:' in clean:
            in_pb_dir = True
            continue
        if in_pb_dir:
            pb_dir += " " + clean
            if re.search(r'\(\s*10\s*points\s*\)', clean, re.I):
                in_pb_dir = False
                in_pb_text = True
                continue
        if in_pb_text:
            if re.match(r'^41\s*\.', clean):
                in_pb_text = False
                in_pb_items = True
                pb_item_lines.append(clean)
            elif re.match(r'^\[\s*[A-G]\s*\]', clean):
                in_pb_text = False
                pb_opt_lines.append(clean)
            else:
                pb_text_lines.append(clean)
        elif in_pb_items:
            if re.match(r'^\[\s*[A-G]\s*\]', clean):
                in_pb_items = False
                pb_opt_lines.append(clean)
            else:
                pb_item_lines.append(clean)
        else:
            if re.match(r'^\[\s*[A-G]\s*\]', clean):
                pb_opt_lines.append(clean)
            elif pb_opt_lines and not re.match(r'^\[\s*[A-G]\s*\]', clean):
                # continuation of previous option
                pb_opt_lines[-1] += " " + clean

    # Parse items (41-45)
    pb_items = []
    for l in pb_item_lines:
        m = re.match(r'^(\d+)\s*\.\s*(.*)', l)
        if m:
            pb_items.append({
                'qid': int(m.group(1)),
                'title': m.group(2).strip()
            })

    # Parse options (A-G)
    pb_options = {}
    for l in pb_opt_lines:
        m = re.match(r'^\[\s*([A-G])\s*\]\s*(.*)', l)
        if m:
            pb_options[m.group(1)] = m.group(2).strip()

    # Determine subtype
    subtype = "multiple_matching"
    if "subheading" in pb_dir.lower() or "list a-g" in pb_dir.lower() or "choose the most suitable" in pb_dir.lower():
        subtype = "heading_matching"
    elif "true or false" in pb_dir.lower() or "true if" in pb_dir.lower():
        subtype = "true_false"

    # ==========================
    # 3. Section III: Translation
    # ==========================
    s3_lines = lines[sec3_idx:sec4_idx]
    s3_dir = ""
    s3_paras = []
    in_s3_dir = False
    in_s3_text = False
    
    for l in s3_lines:
        clean = l.strip()
        if 'Section III' in clean:
            continue
        if 'Directions:' in clean or re.match(r'^46\s*\.\s*Directions:', clean):
            in_s3_dir = True
            continue
        if in_s3_dir:
            s3_dir += " " + clean
            if re.search(r'\(\s*15\s*points\s*\)', clean, re.I):
                in_s3_dir = False
                in_s3_text = True
                continue
        if in_s3_text:
            s3_paras.append(clean)

    return {
        'year': year,
        'use_of_english': {
            'title': f'{year} 年考研英语（二）完形填空 Use of English',
            'q_range': '1-20',
            'directions': s1_dir.strip(),
            'paragraphs': [{'pid': i, 'text': p} for i, p in enumerate(s1_text_lines)],
            'questions': s1_questions
        },
        'part_b': {
            'title': f'{year} 年考研英语（二）新题型 Part B',
            'subtype': subtype,
            'q_range': '41-45',
            'directions': pb_dir.strip(),
            'paragraphs': [{'pid': i, 'text': p} for i, p in enumerate(pb_text_lines)],
            'items': pb_items,
            'options': pb_options
        },
        'translation': {
            'title': f'{year} 年考研英语（二）英译汉 Translation',
            'qid': 46,
            'points': 15,
            'directions': s3_dir.strip(),
            'paragraphs': [{'pid': i, 'text': p} for i, p in enumerate(s3_paras)],
            'source_text': '\n\n'.join(s3_paras)
        }
    }

if __name__ == '__main__':
    for yr in [2010, 2011, 2012, 2015, 2020, 2024, 2026]:
        res = extract_year_sections(yr)
        s1 = res['use_of_english']
        pb = res['part_b']
        tr = res['translation']
        print(f"[{yr}] S1: {len(s1['paragraphs'])} paras, {len(s1['questions'])} questions | PartB: subtype={pb['subtype']}, {len(pb['items'])} items, {len(pb['options'])} options | Trans: {len(tr['paragraphs'])} paras")
