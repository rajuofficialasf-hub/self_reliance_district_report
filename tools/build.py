#!/usr/bin/env python3
"""src/ থেকে একটি স্বয়ংসম্পূর্ণ index.html বানায় (ফন্ট, SheetJS ও টেমপ্লেটসহ)।

ব্যবহার:  python3 tools/build.py
শর্ত:     শুধু Python 3। template/SRP-26_Data_Template.xlsx না থাকলে আগে
          python3 tools/make_template.py চালান (এর জন্য openpyxl লাগে)।
"""
import base64
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
TEMPLATE = ROOT / "template" / "SRP-26_Data_Template.xlsx"
OUT = ROOT / "index.html"
FONT_FACES = [
    ("bengali", "U+0980-09FF,U+200C-200D,U+25CC,U+0964-0965"),
    ("latin", "U+0000-00FF,U+2013-2014,U+2018-201D,U+2022,U+2026,U+2212"),
]
WEIGHTS = (400, 500, 600)
FAVICON = (
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E"
    "%3Crect width='32' height='32' rx='4' fill='%231b5f9e'/%3E"
    "%3Crect x='7' y='16' width='5' height='9' fill='%23fff'/%3E"
    "%3Crect x='14' y='9' width='5' height='16' fill='%23fff'/%3E"
    "%3Crect x='21' y='13' width='5' height='12' fill='%23fff'/%3E%3C/svg%3E"
)


def b64(path: pathlib.Path) -> str:
    return base64.b64encode(path.read_bytes()).decode()


def main() -> int:
    if not TEMPLATE.exists():
        print("template/SRP-26_Data_Template.xlsx নেই। আগে tools/make_template.py চালান।", file=sys.stderr)
        return 1
    faces = []
    for subset, unicode_range in FONT_FACES:
        for weight in WEIGHTS:
            font = SRC / "fonts" / f"hind-siliguri-{subset}-{weight}-normal.woff2"
            faces.append(
                "@font-face{font-family:'Hind Siliguri';font-weight:%d;font-display:swap;"
                "src:url(data:font/woff2;base64,%s) format('woff2');unicode-range:%s}"
                % (weight, b64(font), unicode_range)
            )
    css = (SRC / "style.css").read_text(encoding="utf-8")
    page = (SRC / "page.html").read_text(encoding="utf-8")
    app = (SRC / "app.js").read_text(encoding="utf-8")
    sheetjs = (SRC / "vendor" / "xlsx.mini.min.js").read_text(encoding="utf-8")
    for name, text in (("app.js", app), ("xlsx.mini.min.js", sheetjs)):
        if "</script" in text.lower():
            print(name + " এর ভেতরে </script আছে, বিল্ড থামানো হলো।", file=sys.stderr)
            return 1
    tpl_js = "var TPL_B64 = '%s';\n" % b64(TEMPLATE)
    html = f"""<!doctype html>
<html lang="bn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex">
<meta name="description" content="SRP-২৬ প্রকল্পের জেলাভিত্তিক উপকারভোগী রিপোর্ট জেনারেটর। ডাটা ফাইল ব্রাউজারেই পড়া হয়, কোথাও পাঠানো হয় না।">
<title>SRP-২৬ রিপোর্ট জেনারেটর</title>
<link rel="icon" href="{FAVICON}">
<style>
:root{{color-scheme:light}}
[hidden]{{display:none!important}}
{chr(10).join(faces)}
{css}
</style>
</head>
<body>
<div id="app">
{page}
</div>
<div id="tip" role="tooltip"></div>
<script>{sheetjs}</script>
<script>{tpl_js}{app}</script>
</body>
</html>
"""
    OUT.write_text(html, encoding="utf-8")
    print(f"{OUT.name} তৈরি হয়েছে ({OUT.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
