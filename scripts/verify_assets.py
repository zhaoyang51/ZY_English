# -*- coding: utf-8 -*-
import os, re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Check css links
css_links = re.findall(r'<link[^>]+href=["\']([^?"\']*)', html)
all_ok = True
for c in css_links:
    if not c.startswith('http') and not c.startswith('//'):
        exists = os.path.exists(c)
        if not exists:
            all_ok = False
        print(f'CSS: {c} -> {exists}')

# Check script tags
js_links = re.findall(r'<script[^>]+src=["\']([^?"\']*)', html)
for j in js_links:
    if not j.startswith('http') and not j.startswith('//'):
        exists = os.path.exists(j)
        if not exists:
            all_ok = False
        print(f'JS: {j} -> {exists}')

# Check PDF materials
pdf_files = [
    '20-25年套用思路.pdf',
    '主题词和各年换词表及思路.pdf',
    '作文起步流程.pdf',
    '大作文增值资料.pdf',
    '小作文三段式模版总结.pdf'
]
for p in pdf_files:
    path = os.path.join('docs', 'writing_materials', p)
    exists = os.path.exists(path)
    if not exists:
        all_ok = False
    print(f'PDF: {path} -> {exists} ({os.path.getsize(path)} bytes)')

print(f'\nOverall asset check passed: {all_ok}')
