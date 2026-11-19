# -*- coding: utf-8 -*-
"""
Merge 2017-2026 translation data + aligned chunk translations into
data/{year}.json, data/years/{year}.js, and update manifest.json + manifest.js.
"""
import hashlib
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from data_trans_2017_2026_part1 import TRANSLATION_DATA_PART1
from data_trans_2017_2026_part2 import TRANSLATION_DATA_PART2
from data_trans_2017_2026_part3 import TRANSLATION_DATA_PART3
from data_trans_chunks_2017_2026 import CHUNK_TRANSLATIONS

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALL_TRANS = {}
ALL_TRANS.update(TRANSLATION_DATA_PART1)
ALL_TRANS.update(TRANSLATION_DATA_PART2)
ALL_TRANS.update(TRANSLATION_DATA_PART3)

updated_versions = {}

for year in sorted(ALL_TRANS.keys()):
    trans_obj = ALL_TRANS[year]
    for s in trans_obj["sentences"]:
        sid = s["sid"]
        key = (year, sid)
        assert key in CHUNK_TRANSLATIONS, f"Missing chunk_translation for {key}"
        ct = CHUNK_TRANSLATIONS[key]
        en_chunks = [c.strip() for c in s["slashed_text"].split(" / ")]
        cn_chunks = [c.strip() for c in ct.split(" / ")]
        assert len(en_chunks) == len(cn_chunks), (
            f"Chunk count mismatch at {key}: en={len(en_chunks)} vs cn={len(cn_chunks)}\n"
            f"EN: {en_chunks}\nCN: {cn_chunks}"
        )
        s["chunk_translation"] = ct

    json_path = os.path.join(ROOT, "data", f"{year}.json")
    js_path = os.path.join(ROOT, "data", "years", f"{year}.js")

    with open(json_path, "r", encoding="utf-8") as f:
        year_data = json.load(f)

    year_data["translation"] = trans_obj

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(year_data, f, ensure_ascii=False, indent=2)

    compact_json = json.dumps(year_data, ensure_ascii=False, separators=(",", ":"))
    js_content = f"window.DataLoader.registerYear({year}, {compact_json});\n"
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_content)

    version_hash = hashlib.md5(js_content.encode("utf-8")).hexdigest()[:12]
    updated_versions[year] = version_hash
    sent_count = len(trans_obj["sentences"])
    print(f"[{year}] Updated JSON & JS | sentences={sent_count} | version={version_hash}")

manifest_json_path = os.path.join(ROOT, "data", "manifest.json")
manifest_js_path = os.path.join(ROOT, "data", "manifest.js")

with open(manifest_json_path, "r", encoding="utf-8") as f:
    manifest = json.load(f)

for entry in manifest:
    y = entry.get("year")
    if y in updated_versions:
        entry["version"] = updated_versions[y]

with open(manifest_json_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

with open(manifest_js_path, "w", encoding="utf-8") as f:
    f.write("window.KAOYAN_MANIFEST = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n")

print("All 82 sentences validated and manifest updated successfully.")
