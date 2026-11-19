# -*- coding: utf-8 -*-
"""
Merge 2017-2026 translation data into data/{year}.json, data/years/{year}.js,
and update data/manifest.json + data/manifest.js version hashes.
"""
import hashlib
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from data_trans_2017_2026_part1 import TRANSLATION_DATA_PART1
from data_trans_2017_2026_part2 import TRANSLATION_DATA_PART2
from data_trans_2017_2026_part3 import TRANSLATION_DATA_PART3

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALL_TRANS = {}
ALL_TRANS.update(TRANSLATION_DATA_PART1)
ALL_TRANS.update(TRANSLATION_DATA_PART2)
ALL_TRANS.update(TRANSLATION_DATA_PART3)

updated_versions = {}

for year in sorted(ALL_TRANS.keys()):
    json_path = os.path.join(ROOT, "data", f"{year}.json")
    js_path = os.path.join(ROOT, "data", "years", f"{year}.js")

    with open(json_path, "r", encoding="utf-8") as f:
        year_data = json.load(f)

    year_data["translation"] = ALL_TRANS[year]

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(year_data, f, ensure_ascii=False, indent=2)

    compact_json = json.dumps(year_data, ensure_ascii=False, separators=(",", ":"))
    js_content = f"window.DataLoader.registerYear({year}, {compact_json});\n"
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_content)

    version_hash = hashlib.md5(js_content.encode("utf-8")).hexdigest()[:12]
    updated_versions[year] = version_hash
    sent_count = len(ALL_TRANS[year]["sentences"])
    print(f"[{year}] Updated {json_path} & {js_path} | sentences={sent_count} | version={version_hash}")

# Update manifest.json and manifest.js
manifest_json_path = os.path.join(ROOT, "data", "manifest.json")
manifest_js_path = os.path.join(ROOT, "data", "manifest.js")

if os.path.exists(manifest_json_path):
    with open(manifest_json_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)
else:
    with open(manifest_js_path, "r", encoding="utf-8") as f:
        raw = f.read().strip()
        prefix = "window.KAOYAN_MANIFEST ="
        if raw.startswith(prefix):
            raw = raw[len(prefix):].strip().rstrip(";")
        manifest = json.loads(raw)

for entry in manifest:
    y = entry.get("year")
    if y in updated_versions:
        entry["version"] = updated_versions[y]

with open(manifest_json_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

with open(manifest_js_path, "w", encoding="utf-8") as f:
    f.write("window.KAOYAN_MANIFEST = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n")

print("Updated manifest.json and manifest.js successfully.")
