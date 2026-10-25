# SRP-২৬ জেলা রিপোর্ট জেনারেটর

জেলার উপকারভোগী ডাটা ফাইল (Excel বা CSV) দিলে চার্টসহ বাংলা রিপোর্ট তৈরি হয়। প্রতিটি জেলার জন্য আলাদা A4 ল্যান্ডস্কেপ PDF সেভ করা যায়।

- কোনো সার্ভার বা ডাটাবেস নেই। পুরো টুল একটি `index.html` ফাইল।
- ফাইল ব্রাউজারেই পড়া হয়। NID, মোবাইল নম্বরসহ কোনো তথ্য কোথাও পাঠানো বা সংরক্ষণ হয় না।
- ডাটা টেমপ্লেট (.xlsx) পেজ থেকেই ডাউনলোড করা যায়।

## অনলাইনে চালু করা (GitHub Pages)

1. GitHub-এ নতুন রেপো বানান, যেমন `srp-district-report`।
2. এই ফোল্ডারের সব ফাইল আপলোড করুন (`Add file` → `Upload files`)। `.nojekyll` ও `.gitignore` ফাইলও যেন যায়।
3. রেপোর `Settings` → `Pages` খুলুন। `Source` এ `Deploy from a branch` বাছুন, Branch `main` এবং ফোল্ডার `/ (root)` দিয়ে `Save` চাপুন।
4. এক-দুই মিনিট পর লিংক পাবেন: `https://<ইউজারনেম>.github.io/<রেপোর-নাম>/`

প্রাইভেট রেপো রাখলে Pages চালু করতে GitHub-এর পেইড প্ল্যান লাগে। পাবলিক রেপোতেও কোনো ডাটা থাকে না, তাই নিরাপদ।

## ব্যবহার

1. পেজ খুলে **টেমপ্লেট ডাউনলোড** করুন এবং জেলার তথ্য পূরণ করুন। Kobo থেকে নামানো পুরো এক্সপোর্টও সরাসরি চলবে।
2. ফাইলটি ঘরে ছেড়ে দিন বা ক্লিক করে বাছুন।
3. রিপোর্ট দেখে **PDF / প্রিন্ট** চাপুন, তারপর প্রিন্ট ডায়ালগে **Save as PDF** বাছুন। ফাইলের নাম জেলার নামে আসবে।

একটি ফাইলে একাধিক জেলা থাকলে ওপরের ঘর থেকে জেলা বাছা যায়। প্রত্যেকের সহায়তার অঙ্ক (ডিফল্ট ৫০,০০০ টাকা) ওপরের ঘরে বদলানো যায়।

## কলাম কীভাবে মেলে

- কলামের **অবস্থান বা ক্রম** দেখা হয় না, প্রথম সারির **হেডারের নাম** মিলিয়ে দেখা হয়। বাড়তি কলাম উপেক্ষা করা হয়।
- নামের বাড়তি স্পেস ও য়/ড়-এর লেখার ধরনের পার্থক্য নিজে থেকেই মেলানো হয়।
- কোনো কলাম না মিললে শুধু সংশ্লিষ্ট অংশ ফাঁকা থাকে এবং রিপোর্টের নিচে "তথ্য সম্পর্কে" অংশে তালিকা আসে।
- বাধ্যতামূলক ৭টি কলাম: উপকারভোগীর নাম, জেলা, উপজেলা, লিঙ্গ নির্বাচন, আপনি কিভাবে স্বাবলম্বী হতে চান?, পরিবারের মোট ইনকাম, মোট দেনা। এর মধ্যে ৩টির বেশি না থাকলে ফাইল নেওয়া হয় না।
- একই নামের দুটি কলাম থাকলে প্রথমটি ধরা হয়। একাধিক শিট থাকলে "উপকারভোগীর নাম" হেডারওয়ালা শিট পড়া হয়।

## ডাটা নিরাপত্তা

`.gitignore` ফাইলে `*.xlsx`, `*.xls`, `*.csv` বাদ দেওয়া আছে, শুধু টেমপ্লেট ছাড়া। তবু ব্রাউজার থেকে সরাসরি আপলোড করলে ফাইল যাচাই করে নিন, উপকারভোগীর ডাটা যেন কোনোভাবেই রেপোতে না যায়।

## ফোল্ডারের গঠন

```
index.html                 বিল্ড করা সম্পূর্ণ টুল (GitHub Pages এটাই দেখায়)
src/page.html              পেজের কাঠামো
src/style.css              ডিজাইন ও প্রিন্ট লেআউট
src/app.js                 হিসাব, চার্ট, ফাইল পড়া, টেমপ্লেট ডাউনলোড
src/vendor/                SheetJS (Excel পড়ার লাইব্রেরি)
src/fonts/                 Hind Siliguri ফন্ট
template/                  ডাটা টেমপ্লেট (.xlsx)
tools/build.py             src থেকে index.html বানায়
tools/make_template.py     টেমপ্লেট নতুন করে বানায়
licenses/                  তৃতীয় পক্ষের লাইসেন্স
```

## পরিবর্তন করতে চাইলে

`src/`-এর ফাইল বদলে চালান:

```
python3 tools/build.py
```

এতে নতুন `index.html` তৈরি হবে। শুধু Python 3 লাগে। সম্পাদনার সময় সরাসরি `index.html` না বদলে `src/` বদলান, নইলে পরের বিল্ডে পরিবর্তন হারাবে।

সাধারণ পরিবর্তনের জায়গা:

| কী বদলাবেন | কোথায় |
|---|---|
| উপজেলা ও জেলার বাংলা নাম যোগ করা | `src/app.js`-এর `UP` ও `DIST` তালিকা |
| কলামের হেডারের নাম বা নতুন কলাম | `src/app.js`-এর `KEYS` তালিকা, তারপর `tools/make_template.py` |
| রং, ফন্ট, প্রিন্ট লেআউট | `src/style.css` |
| ডিফল্ট সহায়তার অঙ্ক | `src/app.js`-এর `STATE.fund` এবং `src/page.html`-এর `fundIn` |

`KEYS` বদলালে `tools/make_template.py` চালিয়ে (`pip install openpyxl` লাগবে) টেমপ্লেট নতুন করে বানান, তারপর `tools/build.py` চালান।

উপজেলার বাংলা নাম তালিকায় না থাকলে রিপোর্টে ইংরেজি বানানে দেখায় এবং "তথ্য সম্পর্কে" অংশে সেই নামগুলো আসে। ওগুলো `UP` তালিকায় যোগ করে নিন।

## ব্রাউজার

Chrome, Edge, Firefox ও Safari-এর সাম্প্রতিক সংস্করণে চলে। PDF-এর জন্য Chrome বা Edge-এর প্রিন্ট সবচেয়ে নির্ভরযোগ্য, সেখানে "Background graphics" চালু রাখুন।

## তৃতীয় পক্ষের উপাদান

- [SheetJS](https://sheetjs.com) Community Edition, Apache License 2.0 (`licenses/SheetJS-LICENSE.txt`)
- Hind Siliguri ফন্ট, SIL Open Font License 1.1 (`licenses/HindSiliguri-OFL.txt`)

---

## English summary

A single-file, browser-only report generator for district-level SRP-26 beneficiary data. Drop an Excel/CSV export, get a Bengali chart report, and save a landscape A4 PDF per district via the browser's print dialog. Columns are matched by header name, not position. No data leaves the browser. Deploy by enabling GitHub Pages on the repo root; rebuild after editing `src/` with `python3 tools/build.py`.
