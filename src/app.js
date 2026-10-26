(function(){
'use strict';
var $ = function(id){ return document.getElementById(id); };
var dg = function(s){ return String(s).replace(/\d/g, function(d){ return '০১২৩৪৫৬৭৮৯'[d]; }); };
function grp(n){
  n = Math.round(n); var neg = n < 0, s = String(Math.abs(n));
  if (s.length > 3){ var last = s.slice(-3), rest = s.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g, ','); s = rest + ',' + last; }
  return (neg ? '−' : '') + dg(s);
}
var pc = function(a,b){ return b ? dg(Math.round(a/b*100)) + '%' : '০%'; };
var sum = function(a){ return a.reduce(function(x,y){ return x + y; }, 0); };
var median = function(a){ if (!a.length) return 0; var s = a.slice().sort(function(x,y){ return x-y; }), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m-1] + s[m]) / 2; };
var mean = function(a){ return a.length ? sum(a)/a.length : 0; };
var BD = function(s){ return String(s).replace(/[০-৯]/g, function(d){ return '০১২৩৪৫৬৭৮৯'.indexOf(d); }); };
var num = function(v){ var x = Number(BD(v == null ? '' : v).replace(/,/g,'')); return isFinite(x) && v !== null && v !== '' ? x : 0; };
var norm = function(s){ return String(s == null ? '' : s).normalize('NFC').replace(/[\u200b-\u200d\ufeff]/g,'').replace(/\s+/g,' ').trim(); };
var BNM = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];

/* ---------- বাংলা নামের তালিকা ---------- */
var DIST = {bagerhat:'বাগেরহাট',bandarban:'বান্দরবান',barguna:'বরগুনা',barishal:'বরিশাল',barisal:'বরিশাল',bhola:'ভোলা',bogura:'বগুড়া',bogra:'বগুড়া',brahmanbaria:'ব্রাহ্মণবাড়িয়া',chandpur:'চাঁদপুর',chapainawabganj:'চাঁপাইনবাবগঞ্জ',chattogram:'চট্টগ্রাম',chittagong:'চট্টগ্রাম',chuadanga:'চুয়াডাঙ্গা',cumilla:'কুমিল্লা',comilla:'কুমিল্লা',coxsbazar:'কক্সবাজার',coxbazar:'কক্সবাজার',dhaka:'ঢাকা',dinajpur:'দিনাজপুর',faridpur:'ফরিদপুর',feni:'ফেনী',gaibandha:'গাইবান্ধা',gazipur:'গাজীপুর',gopalganj:'গোপালগঞ্জ',habiganj:'হবিগঞ্জ',jamalpur:'জামালপুর',jashore:'যশোর',jessore:'যশোর',jhalokati:'ঝালকাঠি',jhalakathi:'ঝালকাঠি',jhalokathi:'ঝালকাঠি',jhenaidah:'ঝিনাইদহ',joypurhat:'জয়পুরহাট',khagrachhari:'খাগড়াছড়ি',khagrachari:'খাগড়াছড়ি',khulna:'খুলনা',kishoreganj:'কিশোরগঞ্জ',kurigram:'কুড়িগ্রাম',kushtia:'কুষ্টিয়া',lakshmipur:'লক্ষ্মীপুর',lalmonirhat:'লালমনিরহাট',madaripur:'মাদারীপুর',magura:'মাগুরা',manikganj:'মানিকগঞ্জ',meherpur:'মেহেরপুর',moulvibazar:'মৌলভীবাজার',maulvibazar:'মৌলভীবাজার',munshiganj:'মুন্সীগঞ্জ',mymensingh:'ময়মনসিংহ',naogaon:'নওগাঁ',narail:'নড়াইল',narayanganj:'নারায়ণগঞ্জ',narsingdi:'নরসিংদী',natore:'নাটোর',netrokona:'নেত্রকোণা',netrakona:'নেত্রকোণা',nilphamari:'নীলফামারী',noakhali:'নোয়াখালী',pabna:'পাবনা',panchagarh:'পঞ্চগড়',patuakhali:'পটুয়াখালী',pirojpur:'পিরোজপুর',rajbari:'রাজবাড়ী',rajshahi:'রাজশাহী',rangamati:'রাঙ্গামাটি',rangpur:'রংপুর',satkhira:'সাতক্ষীরা',shariatpur:'শরীয়তপুর',sherpur:'শেরপুর',sirajganj:'সিরাজগঞ্জ',sunamganj:'সুনামগঞ্জ',sylhet:'সিলেট',tangail:'টাঙ্গাইল',thakurgaon:'ঠাকুরগাঁও'};
/* বিভাগ: [বাংলা নাম, ইংরেজি নাম, জেলার কী-গুলো (বানানের বিকল্পসহ)] */
var DIVS = [
 ['ঢাকা','Dhaka','dhaka faridpur gazipur gopalganj kishoreganj madaripur manikganj munshiganj narayanganj narsingdi rajbari shariatpur tangail'],
 ['চট্টগ্রাম','Chattogram','bandarban brahmanbaria chandpur chattogram chittagong coxsbazar coxbazar cumilla comilla feni khagrachhari khagrachari lakshmipur noakhali rangamati'],
 ['রাজশাহী','Rajshahi','bogura bogra joypurhat naogaon natore chapainawabganj pabna rajshahi sirajganj'],
 ['খুলনা','Khulna','bagerhat chuadanga jashore jessore jhenaidah khulna kushtia magura meherpur narail satkhira'],
 ['বরিশাল','Barishal','barguna barishal barisal bhola jhalokati jhalakathi jhalokathi patuakhali pirojpur'],
 ['সিলেট','Sylhet','habiganj moulvibazar maulvibazar sunamganj sylhet'],
 ['রংপুর','Rangpur','dinajpur gaibandha kurigram lalmonirhat nilphamari panchagarh rangpur thakurgaon'],
 ['ময়মনসিংহ','Mymensingh','jamalpur mymensingh netrokona netrakona sherpur']
];
var DIVMAP = {}, DIVKEY = {}, DIVEN = {};
DIVS.forEach(function(d){ d[2].split(' ').forEach(function(k){ DIVMAP[k] = d[0]; }); DIVKEY[d[1].toLowerCase()] = d[0]; DIVEN[d[0]] = d[1]; });
DIVKEY.barisal = 'বরিশাল'; DIVKEY.chittagong = 'চট্টগ্রাম';
var UP = {sundarganj:'সুন্দরগঞ্জ',gobindaganj:'গোবিন্দগঞ্জ',saghatta:'সাঘাটা',sadullapur:'সাদুল্লাপুর',fulchhari:'ফুলছড়ি',palashbari:'পলাশবাড়ী',
 badarganj:'বদরগঞ্জ',gangachara:'গঙ্গাচড়া',kaunia:'কাউনিয়া',mithapukur:'মিঠাপুকুর',pirgacha:'পীরগাছা',pirganj:'পীরগঞ্জ',taraganj:'তারাগঞ্জ',
 bhurungamari:'ভুরুঙ্গামারী',charrajibpur:'চর রাজিবপুর',chilmari:'চিলমারী',nageshwari:'নাগেশ্বরী',phulbari:'ফুলবাড়ী',rajarhat:'রাজারহাট',raumari:'রৌমারী',ulipur:'উলিপুর',
 aditmari:'আদিতমারী',hatibandha:'হাতীবান্ধা',kaliganj:'কালীগঞ্জ',patgram:'পাটগ্রাম',
 dimla:'ডিমলা',domar:'ডোমার',jaldhaka:'জলঢাকা',kishoreganj:'কিশোরগঞ্জ',saidpur:'সৈয়দপুর',
 birampur:'বিরামপুর',birganj:'বীরগঞ্জ',biral:'বিরল',bochaganj:'বোচাগঞ্জ',chirirbandar:'চিরিরবন্দর',ghoraghat:'ঘোড়াঘাট',hakimpur:'হাকিমপুর',kaharole:'কাহারোল',khansama:'খানসামা',nawabganj:'নবাবগঞ্জ',parbatipur:'পার্বতীপুর',
 baliadangi:'বালিয়াডাঙ্গী',haripur:'হরিপুর',ranisankail:'রাণীশংকৈল',atwari:'আটোয়ারী',boda:'বোদা',debiganj:'দেবীগঞ্জ',tetulia:'তেতুলিয়া'};
var key = function(s){ return String(s || '').toLowerCase().replace(/[^a-z]/g,''); };
function distBn(en){ return DIST[key(en)] || en; }
var unmapped = {};
function upBn(en){
  var k = key(en); if (UP[k]) return UP[k];
  var m = String(en).trim().match(/^(.*?)\s*sadar$/i);
  if (m && DIST[key(m[1])]) return DIST[key(m[1])] + ' সদর';
  if (/[ঀ-৿]/.test(en)) return en;
  unmapped[en] = 1; return en;
}

/* সারির বিভাগ: আগে জেলা থেকে (নির্ভরযোগ্য), না মিললে "বিভাগ" কলাম থেকে */
function divOf(r, idx){
  var d = idx.dist !== undefined ? DIVMAP[key(norm(r[idx.dist]))] : '';
  if (d) return d;
  if (idx.div === undefined) return '';
  var v = norm(r[idx.div]), m = v.match(/\(([^)]+)\)/);
  v = (m ? m[1] : v.replace(/\(.*\)/, '')).replace(/\s*বিভাগ$/, '').trim();
  return /[ঀ-৿]/.test(v) ? v : (DIVKEY[v.toLowerCase().replace(/[^a-z]/g, '')] || v);
}
/* স্থানবাচক বিভক্তি: আ-কারে "য়" (ঢাকায়), ব্যঞ্জনে "ে" (রংপুরে), অন্য স্বরে "তে" (ফুলছড়িতে) */
function loc(n){ return /া$/.test(n) ? n + 'য়' : (/[ক-হড়ঢ়য়ৎং]$/.test(n) ? n + 'ে' : n + 'তে'); }

/* ---------- কলামের নাম (ফর্মের হেডার) ---------- */
var KEYS = {
 com:['কমিউনিটি নম্বর'], imam:['স্থানীয় ইমামের নাম'], elig:['যাকাত সহায়তার জন্য উপকারভোগীর যোগ্যতা'], appr:['অনুমোদনের তারিখ'],
 name:['উপকারভোগীর নাম'], gender:['লিঙ্গ নির্বাচন','লিঙ্গ'], marital:['বৈবাহিক অবস্থা'], edu:['শিক্ষার স্তর'], dob:['জন্ম তারিখ'],
 div:['বিভাগ'], dist:['জেলা'], up:['উপজেলা'], uni:['ইউনিয়ন'], vil:['গ্রাম'],
 kids:['পরিবারের ১৪ বছরের কম বয়সী শিশু কতজন?'], mem:['পরিবারের মোট সদস্যা সংখ্যা','পরিবারের মোট সদস্য সংখ্যা'],
 occ:['উপকারভোগীর পেশা কী?'], ownInc:['উপকারভোগীর মাসিক আয় কত টাকা?'], exp:['উপকারভোগীর মাসিক ব্যয় কত টাকা?'], multi:['পরিবারে কী একাধিক আয়কারী আছেন?'],
 hhInc:['পরিবারের মোট ইনকাম'], plan:['আপনি কিভাবে স্বাবলম্বী হতে চান?'], bizType:['আপনি কী ধরণের ব্যবসা করতে চান?'],
 need:['ব্যবসা করতে কত টাকার প্রয়োজন হতে পারে?'], animal:['আপনি কী লালনপালন করতে চান?'], cap:['আপনার কাছে কত টাকা পুঁজি আছে?'],
 house:['উপকারভোগীর বাড়ির ধরণ'], live:['আপনার কোনো গবাদি পশু আছে?'], allow:['প্রতিবন্ধী / বয়স্ক/ বিধবা ভাতা পান?'],
 hasLoan:['আপনার কী কোন কিস্তি/ঋণ আছে?'], loanType:['আপনি কী ধরনের ঋণ নিয়েছেন?'], loanPur:['ঋণের উদ্দেশ্য কী ছিল?'], loanMet:['ঋন গ্রহণের উদ্দেশ্য পূরন হয়েছে কিনা?'], loanAmt:['মোট ঋণের পরিমাণ'],
 borrow:['চিকিৎসা, সাংসারিক বা একান্ত প্রয়োজনে নেওয়া ঋণের পরিমাণ'], dower:['অনাদায়ী দেনমোহরের পরিমাণ'], debt:['মোট দেনা'], net:['নিট সম্পদ']
};
var REQUIRED = ['name','dist','up','gender','plan','hhInc','debt'];

var STATE = { rows:null, head:null, file:'', dists:[], dist:'', fund:50000, missing:[] };

function indexHeaders(head){
  var h = head.map(norm), idx = {}, missing = [];
  Object.keys(KEYS).forEach(function(k){
    var found = -1;
    KEYS[k].some(function(name){
      var n = norm(name), i = h.indexOf(n);
      if (i < 0 && n.length >= 8) i = h.findIndex(function(x){ return x.indexOf(n) === 0; });
      if (i >= 0){ found = i; return true; }
      return false;
    });
    if (found >= 0) idx[k] = found; else missing.push(k);
  });
  return {idx:idx, missing:missing};
}
function parseDate(v){
  if (v == null || v === '') return null;
  if (v instanceof Date) return isNaN(v) ? null : new Date(v.getTime() + 43200000);
  if (typeof v === 'number' && v > 20000 && v < 80000) return new Date(Math.round((v - 25569) * 86400000) + 43200000 - new Date().getTimezoneOffset()*0 );
  var str = BD(v).trim(), m = str.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/), d = m ? new Date(+m[3], +m[2]-1, +m[1]) : new Date(str); return isNaN(d) ? null : new Date(d.getTime() + 43200000);
}
var ymd = function(d){ return d.getFullYear() + '-' + ('0'+(d.getMonth()+1)).slice(-2) + '-' + ('0'+d.getDate()).slice(-2); };
var dayLabel = function(d){ return dg(d.getDate()) + ' ' + BNM[d.getMonth()]; };

function eduCat(x){
  x = norm(x);
  if (!x) return '';
  if (x.indexOf('নিরক্ষর') >= 0) return 'নিরক্ষর';
  if (x === 'প্রাথমিক অসম্পূর্ণ') return 'প্রাথমিক অসম্পূর্ণ';
  if (x === 'প্রাথমিক সম্পূর্ণ' || x === 'প্রাথমিক শিক্ষা') return 'প্রাথমিক সম্পূর্ণ';
  if (x.indexOf('মাধ্যমিক') === 0) return 'মাধ্যমিক অসম্পূর্ণ';
  if (/^SSC/i.test(x) || x === 'দাখিল') return 'এসএসসি / দাখিল';
  if (/^HSC/i.test(x) || x === 'আলিম') return 'এইচএসসি / আলিম';
  if (x.indexOf('স্নাতক') === 0 || x.indexOf('দাওরা') === 0 || x.indexOf('তাকমিল') >= 0 || /Bachelor|Master/i.test(x)) return 'স্নাতক / দাওরা';
  return x;
}
var EDU_ORDER = ['নিরক্ষর','প্রাথমিক অসম্পূর্ণ','প্রাথমিক সম্পূর্ণ','মাধ্যমিক অসম্পূর্ণ','এসএসসি / দাখিল','এইচএসসি / আলিম','স্নাতক / দাওরা','হিফজুল কুরআন'];

function countBy(arr){ var o = {}; arr.forEach(function(x){ if (x !== '' && x != null) o[x] = (o[x] || 0) + 1; }); return o; }
function entries(o){ return Object.keys(o).map(function(k){ return [k, o[k]]; }).sort(function(a,b){ return b[1]-a[1]; }); }
function bandCount(vals, edges, labels){
  var c = labels.map(function(){ return 0; });
  vals.forEach(function(v){ var i = 0; while (i < edges.length && v > edges[i]) i++; c[i]++; });
  return labels.map(function(l,i){ return [l, c[i]]; });
}

/* ---------- হিসাব ---------- */
function compute(rows, idx, FUND, by){
  var g = function(r,k){ return idx[k] === undefined ? null : r[idx[k]]; };
  var s = function(r,k){ return norm(g(r,k)); };
  var n = rows.length;
  var D = {n:n};
  D.gender = countBy(rows.map(function(r){ return s(r,'gender'); }));
  var female = D.gender['মহিলা'] || 0, male = D.gender['পুরুষ'] || 0;
  var planOf = function(r){ var p = s(r,'plan'); return p.indexOf('ব্যবসা') >= 0 ? 'biz' : (p.indexOf('গবাদি') >= 0 || p.indexOf('পশু') >= 0 ? 'live' : 'other'); };
  /* উপজেলা */
  /* by: 'up' = উপজেলাভিত্তিক (জেলা রিপোর্ট), 'dist' = জেলাভিত্তিক (বিভাগ রিপোর্ট), 'div' = বিভাগভিত্তিক (সব) */
  by = by || 'up';
  var gKey = {up:function(r){ return s(r,'up') || '—'; }, dist:function(r){ return s(r,'dist') || '—'; }, div:function(r){ return divOf(r, idx) || 'বিভাগ অজানা'; }}[by];
  var gName = {up:upBn, dist:distBn, div:function(x){ return x; }}[by];
  var upg = {};
  rows.forEach(function(r){ var k = gKey(r); (upg[k] = upg[k] || []).push(r); });
  D.upazila = Object.keys(upg).map(function(k){ var a = upg[k];
    return {name:gName(k), n:a.length, female:a.filter(function(r){ return s(r,'gender') === 'মহিলা'; }).length, biz:a.filter(function(r){ return planOf(r) === 'biz'; }).length}; })
    .sort(function(a,b){ return b.n - a.n; });
  /* কমিউনিটি */
  var cg = {};
  rows.forEach(function(r){ var k = s(r,'dist') + '|' + (s(r,'com') || '—'); (cg[k] = cg[k] || []).push(r); });
  D.communities = Object.keys(cg).map(function(k){ var a = cg[k], cm = k.slice(k.indexOf('|') + 1), m = cm.match(/(\d+)\s*$/);
    var ups = entries(countBy(a.map(function(r){ return s(r,'up'); })));
    return {id:m ? m[1] : cm, imam:s(a[0],'imam') || '—', up:ups.length && by === 'up' ? upBn(ups[0][0]) : '—', dist:distBn(s(a[0],'dist')), n:a.length}; })
    .sort(function(a,b){ return b.n - a.n || (a.id > b.id ? 1 : -1); });
  /* তারিখ */
  var dts = rows.map(function(r){ return parseDate(g(r,'appr')); }).filter(Boolean);
  D.dmin = dts.length ? new Date(Math.min.apply(null, dts)) : null;
  D.dmax = dts.length ? new Date(Math.max.apply(null, dts)) : null;
  D.dates = dateBuckets(dts);
  /* বয়স */
  var ref = D.dmax || new Date();
  var ages = rows.map(function(r){ var d = parseDate(g(r,'dob')); return d ? (ref - d) / 31557600000 : null; }).filter(function(a){ return a !== null; });
  var AB = ['৩০ এর কম','৩০–৩৯','৪০–৪৯','৫০–৫৯','৬০–৬৯','৭০+'];
  D.age = bandCount(ages, [29.999,39.999,49.999,59.999,69.999], AB);
  D.ageMean = mean(ages); D.ageMedian = median(ages); D.ageN = ages.length;
  D.ageBad = ages.filter(function(a){ return a < 18 || a > 100; }).length;
  /* পরিচয় */
  D.marital = countBy(rows.map(function(r){ return s(r,'marital'); }));
  var ec = countBy(rows.map(function(r){ return eduCat(g(r,'edu')); }));
  D.edu = EDU_ORDER.filter(function(k){ return ec[k]; }).map(function(k){ return [k, ec[k]]; })
    .concat(entries(ec).filter(function(e){ return EDU_ORDER.indexOf(e[0]) < 0; }));
  D.illit = ec['নিরক্ষর'] || 0;
  D.occ = countBy(rows.map(function(r){ return s(r,'occ'); }));
  D.house = countBy(rows.map(function(r){ return s(r,'house'); }));
  /* আয়-ব্যয় */
  var inc = rows.map(function(r){ return num(g(r,'hhInc')); });
  D.incBands = bandCount(inc, [3000,5000,7000,9000,12000], ['≤৩,০০০','৩,০০১–৫,০০০','৫,০০১–৭,০০০','৭,০০১–৯,০০০','৯,০০১–১২,০০০','১২,০০০+']);
  D.incMean = mean(inc); D.incMedian = median(inc);
  D.ownIncMean = mean(rows.map(function(r){ return num(g(r,'ownInc')); }));
  D.expMean = mean(rows.map(function(r){ return num(g(r,'exp')); }));
  var pcs = rows.map(function(r){ var m = num(g(r,'mem')); return m > 0 ? num(g(r,'hhInc')) / m : null; }).filter(function(x){ return x !== null; });
  D.percap = mean(pcs);
  D.expGtInc = rows.filter(function(r){ return num(g(r,'exp')) > num(g(r,'hhInc')); }).length;
  D.members = sum(rows.map(function(r){ return num(g(r,'mem')); })); D.kids = sum(rows.map(function(r){ return num(g(r,'kids')); }));
  var yes = function(k){ return rows.filter(function(r){ return s(r,'' + k) === 'হ্যাঁ'; }).length; };
  D.multi = yes('multi'); D.allow = yes('allow'); D.loanN = yes('hasLoan');
  /* দেনা */
  var debt = rows.map(function(r){ return num(g(r,'debt')); });
  D.debtBands = [['কোনো দেনা নেই', debt.filter(function(v){ return v <= 0; }).length],
    ['১–১০,০০০', debt.filter(function(v){ return v > 0 && v <= 10000; }).length],
    ['১০,০০১–৫০,০০০', debt.filter(function(v){ return v > 10000 && v <= 50000; }).length],
    ['৫০,০০০-এর বেশি', debt.filter(function(v){ return v > 50000; }).length]];
  D.debtTotal = sum(debt); D.hasDebt = debt.filter(function(v){ return v > 0; }).length; D.debtGt50 = debt.filter(function(v){ return v > 50000; }).length;
  D.dower = sum(rows.map(function(r){ return num(g(r,'dower')); })); D.borrow = sum(rows.map(function(r){ return num(g(r,'borrow')); }));
  D.bills = D.debtTotal - D.dower - D.borrow;
  D.netNeg = rows.filter(function(r){ return num(g(r,'net')) < 0; }).length;
  D.loanTotal = sum(rows.map(function(r){ return num(g(r,'loanAmt')); }));
  D.loanType = countBy(rows.map(function(r){ return s(r,'loanType'); }));
  D.loanPur = countBy(rows.map(function(r){ return s(r,'loanPur'); }));
  /* পরিকল্পনা */
  var plans = rows.map(planOf);
  D.biz = plans.filter(function(p){ return p === 'biz'; }).length; D.live = plans.filter(function(p){ return p === 'live'; }).length;
  D.animal = countBy(rows.filter(function(r){ return planOf(r) === 'live'; }).map(function(r){ return s(r,'animal'); }));
  var pg = function(gen){ var a = rows.filter(function(r){ return s(r,'gender') === gen; }); return {n:a.length, biz:a.filter(function(r){ return planOf(r) === 'biz'; }).length, live:a.filter(function(r){ return planOf(r) === 'live'; }).length}; };
  D.pgM = pg('পুরুষ'); D.pgF = pg('মহিলা'); D.male = male; D.female = female;
  var bt = rows.filter(function(r){ return planOf(r) === 'biz'; }).map(function(r){ return s(r,'bizType').replace('হাঁঁস','হাঁস'); }).filter(Boolean);
  var btc = entries(countBy(bt)), named = btc.filter(function(e){ return e[0] !== 'অন্যান্য'; }).slice(0, 10);
  var rest = bt.length - sum(named.map(function(e){ return e[1]; }));
  D.bizTypes = named.concat(rest > 0 ? [['অন্যান্য ধরনের ব্যবসা', rest]] : []); D.bizTypeN = bt.length;
  var need = rows.filter(function(r){ return planOf(r) === 'biz'; }).map(function(r){ return num(g(r,'need')); }).filter(function(v){ return v > 0; });
  D.needN = need.length; D.needMedian = median(need); D.needLe = need.filter(function(v){ return v <= FUND; }).length;
  var edges = [], labs = [];
  if (FUND >= 20000){ var p = 20000; edges.push(p); labs.push('≤' + grp(p)); while (p + 10000 <= FUND){ labs.push(grp(p) + '–' + grp(p+10000)); p += 10000; edges.push(p); } labs[0] = '≤' + grp(20000);
    // labs[i] corresponds to bin i (≤e0, e0–e1, ...)
  } else { edges = [FUND]; labs = ['≤' + grp(FUND)]; }
  labs.push(grp(edges[edges.length-1]) + '-এর বেশি');
  D.needBands = bandCount(need, edges, labs);
  var cap = rows.map(function(r){ return num(g(r,'cap')); });
  D.capZero = cap.filter(function(v){ return v <= 0; }).length; D.capMean = mean(cap);
  var uniq = function(f){ var o = {}; rows.forEach(function(r){ var v = f(r); if (v) o[v] = 1; }); return Object.keys(o).length; };
  D.unions = uniq(function(r){ return s(r,'uni') && s(r,'dist') + '|' + s(r,'up') + '|' + s(r,'uni'); });
  D.nUp = uniq(function(r){ return s(r,'up') && s(r,'dist') + '|' + s(r,'up'); });
  D.nDist = uniq(function(r){ return s(r,'dist'); });
  D.nDiv = uniq(function(r){ return divOf(r, idx); });
  return D;
}

function dateBuckets(dts){
  if (!dts.length) return [];
  var days = {}; dts.forEach(function(d){ var k = ymd(d); days[k] = (days[k] || 0) + 1; });
  var ks = Object.keys(days).sort();
  if (ks.length <= 8) return ks.map(function(k){ var p = k.split('-'); return [dayLabel(new Date(+p[0], +p[1]-1, +p[2])), days[k]]; });
  var weeks = {}, order = [];
  ks.forEach(function(k){ var p = k.split('-'), d = new Date(+p[0], +p[1]-1, +p[2]), dow = (d.getDay() + 6) % 7, st = new Date(d.getFullYear(), d.getMonth(), d.getDate() - dow), wk = ymd(st);
    if (!weeks[wk]){ weeks[wk] = {st:st, n:0}; order.push(wk); } weeks[wk].n += days[k]; });
  if (order.length <= 8) return order.map(function(wk){ var w = weeks[wk], en = new Date(w.st.getFullYear(), w.st.getMonth(), w.st.getDate() + 6);
    return [w.st.getMonth() === en.getMonth() ? dg(w.st.getDate()) + '–' + dg(en.getDate()) + ' ' + BNM[en.getMonth()] : dayLabel(w.st) + '–' + dayLabel(en), w.n]; });
  var ms = {}, mo = [];
  ks.forEach(function(k){ var p = k.split('-'), mk = p[0] + '-' + p[1]; if (!ms[mk]){ ms[mk] = {m:+p[1]-1, y:+p[0], n:0}; mo.push(mk); } ms[mk].n += days[k]; });
  return mo.map(function(mk){ return [BNM[ms[mk].m] + ' ' + dg(ms[mk].y), ms[mk].n]; });
}

/* ---------- চার্টের উপাদান ---------- */
function hbar(id, rows, o){
  o = o || {};
  var el = $(id); if (!rows.length){ el.innerHTML = '<p class="note">এই অংশের তথ্য ফাইলে নেই।</p>'; return; }
  var max = Math.max.apply(null, rows.map(function(r){ return r[1]; })) || 1, tot = o.total || sum(rows.map(function(r){ return r[1]; })), unit = o.unit == null ? 'জন' : o.unit, f = o.fmt || dg;
  el.innerHTML = rows.map(function(r,i){
    var w = Math.max(r[1]/max*100, 1.2), cls = o.cls ? (o.cls(r,i) || '') : '';
    var tip = r[0] + ': ' + f(r[1]) + (unit ? ' ' + unit : '') + (o.noPct ? '' : ' (' + pc(r[1], tot) + ')');
    return '<div class="hb ' + cls + '" data-tip="' + tip + '" tabindex="0"><span class="hl">' + r[0] + '</span><span class="ht"><i style="width:' + w + '%"></i></span><span class="hv">' + f(r[1]) + (o.noPct ? '' : '<small>' + pc(r[1], tot) + '</small>') + '</span></div>';
  }).join('');
}
function cols(id, rows, o){
  o = o || {};
  var el = $(id); if (!rows.length || !sum(rows.map(function(r){ return r[1]; }))){ el.innerHTML = '<p class="note">এই অংশের তথ্য ফাইলে নেই।</p>'; return; }
  var max = Math.max.apply(null, rows.map(function(r){ return r[1]; })) || 1, H = o.h || 160, tot = sum(rows.map(function(r){ return r[1]; }));
  el.innerHTML = '<div class="cols">' + rows.map(function(r,i){
    var cls = o.cls ? (o.cls(r,i) || '') : '';
    return '<div class="col ' + cls + '" data-tip="' + r[0] + ': ' + dg(r[1]) + ' জন (' + pc(r[1], tot) + ')" tabindex="0"><span class="cv">' + dg(r[1]) + '</span><i style="height:calc(' + Math.max(r[1]/max, 0.012) + ' * var(--colh, ' + H + 'px))"></i></div>';
  }).join('') + '</div><div class="collabels">' + rows.map(function(r){ return '<span>' + r[0] + '</span>'; }).join('') + '</div>';
}
function donut(id, parts, big, small){
  parts = parts.filter(function(p){ return p[1] > 0; });
  var R = 52, C = 2*Math.PI*R, tot = sum(parts.map(function(p){ return p[1]; })), off = 0;
  if (!tot){ $(id).innerHTML = '<p class="note">এই অংশের তথ্য ফাইলে নেই।</p>'; return; }
  var arcs = parts.map(function(p){
    var len = p[1]/tot*C, gap = parts.length > 1 ? 2 : 0;
    var sv = '<circle cx="70" cy="70" r="' + R + '" fill="none" stroke="' + p[2] + '" stroke-width="18" stroke-dasharray="' + Math.max(len-gap,0.5) + ' ' + C + '" stroke-dashoffset="' + (-off) + '" transform="rotate(-90 70 70)"><title>' + p[0] + ': ' + dg(p[1]) + ' জন (' + pc(p[1], tot) + ')</title></circle>';
    off += len; return sv;
  }).join('');
  $(id).innerHTML = '<div class="dn"><svg viewBox="0 0 140 140" role="img" aria-label="' + small + '">' + arcs + '<text x="70" y="70" text-anchor="middle" font-size="26" font-weight="600" font-family="Hind Siliguri, sans-serif">' + big + '</text><text x="70" y="90" text-anchor="middle" font-size="11" style="fill:var(--ink2)">' + small + '</text></svg><div class="leg">' +
    parts.map(function(p){ return '<div><span class="sw" style="background:' + p[2] + '"></span><span>' + p[0] + '</span><b>' + dg(p[1]) + '</b><small>' + pc(p[1], tot) + '</small></div>'; }).join('') + '</div></div>';
}
function stack(el, parts){
  var tot = sum(parts.map(function(p){ return p[1]; }));
  el.innerHTML = parts.filter(function(p){ return p[1] > 0; }).map(function(p){ return '<i style="flex:' + p[1] + ';background:' + p[2] + '" data-tip="' + p[0] + ': ' + (p[3] || dg(p[1])) + ' (' + pc(p[1], tot) + ')" tabindex="0"></i>'; }).join('');
}

/* ---------- রিপোর্ট আঁকা ---------- */
function render(rows, idx, meta){
  var SC = STATE.scope || {type:'dist', key:STATE.dist}, by = SC.type === 'dist' ? 'up' : (SC.type === 'div' ? 'dist' : 'div');
  var FUND = STATE.fund, D = compute(rows, idx, FUND, by), N = D.n, errors = [];
  var sec = function(name, fn){ try { fn(); } catch (e) { errors.push(name + ': ' + e.message); } };
  var distEn = STATE.dist, distB = distBn(distEn);
  var divB = rows.length ? divOf(rows[0], idx) : '';
  var period = D.dmin && D.dmax ? ' অনুমোদন হয়েছে ' + dayLabel(D.dmin) + ' ' + dg(D.dmin.getFullYear()) + ' থেকে ' + dayLabel(D.dmax) + ' ' + dg(D.dmax.getFullYear()) + ' পর্যন্ত।' : '';
  var tail = ' জন উপকারভোগীর তথ্য ও সহায়তার বিশ্লেষণ।' + period, scopeB, lead;
  if (SC.type === 'div'){
    scopeB = SC.key + ' বিভাগ'; document.title = (DIVEN[SC.key] || SC.key) + '_Division_SRP-26_Report';
    $('eyebrow').textContent = 'বিভাগভিত্তিক প্রতিবেদন'; $('h1').textContent = scopeB;
    lead = scopeB + 'ের ' + dg(D.nDist) + 'টি জেলার ' + dg(D.nUp) + 'টি উপজেলার ' + dg(N) + tail;
  } else if (SC.type === 'all'){
    scopeB = 'সমন্বিত'; document.title = 'All_Districts_SRP-26_Report';
    $('eyebrow').textContent = 'সব জেলা একসাথে'; $('h1').textContent = 'সমন্বিত প্রতিবেদন';
    lead = dg(D.nDiv) + 'টি বিভাগের ' + dg(D.nDist) + 'টি জেলার ' + dg(D.nUp) + 'টি উপজেলার ' + dg(N) + tail;
  } else {
    scopeB = distB + ' জেলা'; document.title = (distEn || 'District') + '_SRP-26_Report';
    $('eyebrow').textContent = divB ? divB + ' বিভাগ' : ''; $('h1').textContent = scopeB;
    lead = distB + ' জেলার ' + dg(D.upazila.length) + 'টি উপজেলার ' + dg(N) + tail;
  }
  $('lead').textContent = lead;
  var total = N * FUND, crore = Math.floor(total/1e7), lakh = Math.round((total % 1e7)/1e5);
  $('fundBig').textContent = grp(total) + ' টাকা';
  $('fundSub').textContent = (crore ? dg(crore) + ' কোটি ' + (lakh ? dg(lakh) + ' লক্ষ ' : '') + 'টাকা · ' : (total >= 1e5 ? dg(Math.round(total/1e5*10)/10) + ' লক্ষ টাকা · ' : '')) + 'প্রত্যেকে ' + grp(FUND) + ' টাকা';
  Array.prototype.forEach.call(document.querySelectorAll('.F'), function(e){ e.textContent = grp(FUND); });

  sec('kpis', function(){
    $('kpis').innerHTML = [
      [dg(N), 'জন উপকারভোগী'],
      SC.type === 'div' ? [dg(D.nDist) + ' / ' + dg(D.nUp) + ' / ' + dg(D.communities.length), 'জেলা / উপজেলা / কমিউনিটি']
        : (SC.type === 'all' ? [dg(D.nDiv) + ' / ' + dg(D.nDist) + ' / ' + dg(D.nUp), 'বিভাগ / জেলা / উপজেলা']
        : [dg(D.upazila.length) + ' / ' + dg(D.unions) + ' / ' + dg(D.communities.length), 'উপজেলা / ইউনিয়ন / কমিউনিটি']),
      [dg(D.members), 'জন সদস্যের পরিবার, এর মধ্যে ' + dg(D.kids) + ' জন শিশু'],
      [grp(D.incMean), 'টাকা, পরিবারের গড় মাসিক আয়'],
      [grp(D.percap), 'টাকা, মাথাপিছু গড় মাসিক আয়']
    ].map(function(k){ return '<div class="kpi"><b>' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('');
  });
  sec('findings', function(){
    var f = [];
    f.push(dg(N) + ' জনের মধ্যে ' + dg(D.biz) + ' জন (' + pc(D.biz,N) + ') ব্যবসা করে এবং ' + dg(D.live) + ' জন (' + pc(D.live,N) + ') গবাদিপশু পালন করে স্বাবলম্বী হতে চান।');
    if (D.needN) f.push('ব্যবসা করতে চাওয়া ' + dg(D.needN) + ' জনের মধ্যে ' + dg(D.needLe) + ' জনের প্রয়োজনীয় পুঁজি ' + grp(FUND) + ' টাকার মধ্যে। মধ্যমা ' + grp(D.needMedian) + ' টাকা।');
    if (D.female) f.push('নারী উপকারভোগী ' + dg(D.female) + ' জন (' + pc(D.female,N) + ')। তাঁদের ' + pc(D.pgF.live, D.female) + ' পশুপালন বেছে নিয়েছেন' + (D.male ? ', পুরুষদের মধ্যে এই হার ' + pc(D.pgM.live, D.male) : '') + '।');
    f.push(dg(D.hasDebt) + ' জনের (' + pc(D.hasDebt,N) + ') কোনো না কোনো দেনা আছে। ' + dg(D.debtGt50) + ' জনের দেনা ৫০,০০০ টাকার বেশি।');
    f.push(dg(D.expGtInc) + ' জন (' + pc(D.expGtInc,N) + ') উপকারভোগীর মাসিক ব্যয় পরিবারের মোট আয়ের চেয়ে বেশি।');
    $('finds').innerHTML = f.map(function(t){ return '<li>' + t + '</li>'; }).join('');
  });
  var UL = {up:['উপজেলা','উপজেলায়'], dist:['জেলা','জেলায়'], div:['বিভাগ','বিভাগে']}[by];
  $('h-where').textContent = dg(D.upazila.length) + 'টি ' + UL[1] + ' ' + dg(N) + ' জন, সবচেয়ে বেশি ' + (D.upazila[0] ? loc(D.upazila[0].name) + ' (' + dg(D.upazila[0].n) + ' জন)' : '');
  $('upTitle').textContent = UL[0] + 'ভিত্তিক উপকারভোগী ও সহায়তা';
  $('h-who').textContent = pc(D.male,N) + ' পুরুষ, গড় বয়স ' + dg(Math.round(D.ageMean)) + ' বছর, ' + pc(D.illit,N) + ' নিরক্ষর';
  $('h-money').textContent = 'মাথাপিছু আয় দিনে প্রায় ' + dg(Math.round(D.percap/30)) + ' টাকা, ' + pc(D.hasDebt,N) + ' জনের দেনা আছে';
  $('h-use').textContent = pc(D.biz,N) + ' ব্যবসা করতে চান' + (D.needN ? ', তাঁদের ' + pc(D.needLe, D.needN) + '-এর প্রয়োজন ' + grp(FUND) + ' টাকার মধ্যে' : '');

  sec('upazila', function(){
    var mx = Math.max.apply(null, D.upazila.map(function(u){ return u.n; })) || 1;
    $('upTable').innerHTML = '<thead><tr><th>' + UL[0] + '</th><th style="width:34%">উপকারভোগী</th><th class="num">সহায়তা (টাকা)</th><th class="num">নারী</th><th class="num">ব্যবসা বেছেছেন</th></tr></thead><tbody>' +
      D.upazila.map(function(u){ return '<tr data-tip="' + u.name + ': ' + dg(u.n) + ' জন, ' + grp(u.n*FUND) + ' টাকা" tabindex="0"><td>' + u.name + '</td><td><div class="hb" style="grid-template-columns:1fr auto;padding:0"><span class="ht"><i style="width:' + u.n/mx*100 + '%"></i></span><span class="hv">' + dg(u.n) + '</span></div></td><td class="num">' + grp(u.n*FUND) + '</td><td class="num">' + pc(u.female,u.n) + '</td><td class="num">' + pc(u.biz,u.n) + '</td></tr>'; }).join('') +
      '<tr><td><b>মোট</b></td><td><b>' + dg(N) + '</b></td><td class="num"><b>' + grp(total) + '</b></td><td class="num"><b>' + pc(D.female,N) + '</b></td><td class="num"><b>' + pc(D.biz,N) + '</b></td></tr></tbody>';
  });
  sec('dates', function(){ cols('dates', D.dates, {h:150}); });
  sec('communities', function(){
    var one = SC.type === 'dist';
    $('comDet').style.display = one ? '' : 'none';
    $('comSub').textContent = one ? 'প্রতিটি কমিউনিটির উপকারভোগীর সংখ্যা' : 'উপকারভোগীর সংখ্যা অনুযায়ী শীর্ষ ১২টি কমিউনিটি';
    $('comSum').textContent = 'সব ' + dg(D.communities.length) + 'টি কমিউনিটির ইমামের নামসহ তালিকা';
    $('comTable').innerHTML = '<thead><tr><th>নম্বর</th><th>স্থানীয় ইমাম</th><th>উপজেলা</th><th class="num">জন</th></tr></thead><tbody>' + D.communities.map(function(c){ return '<tr><td>' + dg(c.id) + '</td><td>' + c.imam + '</td><td>' + c.up + '</td><td class="num">' + dg(c.n) + '</td></tr>'; }).join('') + '</tbody>';
    var cs = D.communities.slice(0, one ? 20 : 12);
    hbar('comBars', cs.map(function(c){ return ['কমিউনিটি ' + dg(c.id) + (one ? '' : ', ' + c.dist), c.n]; }), {total:N, noPct:true});
    $('comTitle').textContent = one ? dg(D.communities.length) + 'টি কমিউনিটি ও স্থানীয় ইমাম' : dg(D.communities.length) + 'টি কমিউনিটির মধ্যে বড়গুলো';
  });
  sec('who', function(){
    var gp = [['পুরুষ', D.male, 'var(--s1)'], ['মহিলা', D.female, 'var(--s2)']];
    var other = N - D.male - D.female; if (other > 0) gp.push(['অন্যান্য', other, 'var(--s3)']);
    donut('gender', gp, pc(D.female,N), 'নারী');
    $('ageSub').textContent = 'গড় বয়স ' + dg(Math.round(D.ageMean*10)/10) + ' বছর, মধ্যমা ' + dg(Math.round(D.ageMedian*10)/10) + ' বছর';
    cols('age', D.age);
    hbar('edu', D.edu, {total:N});
    hbar('occ', entries(D.occ), {total:N});
    hbar('marital', entries(D.marital), {total:N});
    hbar('house', entries(D.house), {total:N});
  });
  sec('money', function(){
    $('incSub').textContent = 'মধ্যমা ' + grp(D.incMedian) + ' টাকা, টাকার অঙ্কে ব্যান্ড করা';
    var mi = 0; D.incBands.forEach(function(b,i){ if (b[1] > D.incBands[mi][1]) mi = i; });
    cols('inc', D.incBands, {cls:function(r,i){ return i === mi ? 'hi' : ''; }});
    hbar('incexp', [['পরিবারের গড় আয়', D.incMean], ['উপকারভোগীর নিজের আয়', D.ownIncMean], ['উপকারভোগীর গড় ব্যয়', D.expMean]], {fmt:grp, unit:'টাকা', noPct:true, cls:function(r,i){ return i === 2 ? 'alt' : ''; }});
    $('incNote').textContent = dg(D.multi) + ' জনের (' + pc(D.multi,N) + ') পরিবারে একাধিক আয়কারী আছেন। ' + dg(D.allow) + ' জন (' + pc(D.allow,N) + ') প্রতিবন্ধী, বয়স্ক বা বিধবা ভাতা পান।';
    hbar('debt', D.debtBands, {total:N, cls:function(r,i){ return i === 0 ? 'soft' : ''; }});
    $('debtSub').textContent = 'মোট দেনা ' + grp(D.debtTotal) + ' টাকা, গড়ে ' + grp(D.debtTotal/N) + ' টাকা';
    var dparts = [['অনাদায়ী দেনমোহর', D.dower, 'var(--s1)'], ['প্রয়োজনে নেওয়া ঋণ', D.borrow, 'var(--s2)'], ['বকেয়া বিল ও খরচ', Math.max(D.bills,0), 'var(--s3)']];
    stack($('debtStack'), dparts.map(function(p){ return [p[0], p[1], p[2], grp(p[1]) + ' টাকা']; }));
    $('debtLeg').innerHTML = dparts.map(function(p){ return '<div><span class="sw" style="background:' + p[2] + '"></span><span>' + p[0] + '</span><b>' + grp(p[1]) + ' টাকা</b><small>' + pc(p[1], D.debtTotal) + '</small></div>'; }).join('');
    $('loanSub').textContent = dg(D.loanN) + ' জনের ঋণ বা কিস্তি আছে, মোট ' + grp(D.loanTotal) + ' টাকা';
    hbar('loanType', entries(D.loanType), {total:D.loanN || 1});
    $('loanPurSub').textContent = 'ঋণ আছে এমন ' + dg(D.loanN) + ' জনের মধ্যে';
    hbar('loanPurpose', entries(D.loanPur), {total:D.loanN || 1});
  });
  sec('use', function(){
    var aparts = entries(D.animal).map(function(e, i){ return [e[0] + ' পালন', e[1], i === 0 ? 'var(--s2)' : 'var(--s3)']; });
    donut('plan', [['ব্যবসা', D.biz, 'var(--s1)']].concat(aparts.slice(0, 2)), pc(D.biz,N), 'ব্যবসা');
    var pgRows = [['পুরুষ', D.pgM], ['মহিলা', D.pgF]].filter(function(r){ return r[1].n > 0; });
    $('planGender').innerHTML = pgRows.map(function(r, i){
      var parts = [['ব্যবসা', r[1].biz, 'var(--s1)'], ['পশুপালন', r[1].live, 'var(--s2)']];
      return '<div class="stackrow"><h4>' + r[0] + ' (' + dg(r[1].n) + ' জন)</h4><div class="stack" id="pg' + i + '"></div><div class="leg" style="margin-top:8px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">' + parts.map(function(p){ return '<div><span class="sw" style="background:' + p[2] + '"></span><span>' + p[0] + '</span><b>' + dg(p[1]) + '</b><small>' + pc(p[1], r[1].n) + '</small></div>'; }).join('') + '</div></div>';
    }).join('');
    pgRows.forEach(function(r, i){ stack($('pg' + i), [['ব্যবসা', r[1].biz, 'var(--s1)'], ['পশুপালন', r[1].live, 'var(--s2)']]); });
    $('bizSub').textContent = 'ব্যবসা করতে চাওয়া ' + dg(D.biz) + ' জনের মধ্যে';
    hbar('biz', D.bizTypes, {total:D.bizTypeN || D.biz, cls:function(r,i){ return r[0] === 'অন্যান্য ধরনের ব্যবসা' ? 'soft' : ''; }});
    $('needSub').textContent = 'ব্যবসা করতে চাওয়া ' + dg(D.needN) + ' জনের হিসাব';
    var nb = D.needBands, last = nb.length - 1;
    cols('need', nb, {cls:function(r,i){ return i === last ? 'soft' : (i === last - 1 ? 'hi' : ''); }});
    $('needNote').textContent = dg(D.needLe) + ' জনের (' + pc(D.needLe, D.needN) + ') প্রয়োজন ' + grp(FUND) + ' টাকা বা কম। ' + dg(D.capZero) + ' জনের (' + pc(D.capZero,N) + ') নিজের কোনো পুঁজি নেই, গড় পুঁজি ' + grp(D.capMean) + ' টাকা।';
    var ctx = [['পরিবারের গড় বার্ষিক আয় (মাসিক ×১২)', D.incMean*12], ['প্রাপ্ত সহায়তা', FUND]];
    if (D.needN) ctx.push(['ব্যবসার জন্য মধ্যমা প্রয়োজন', D.needMedian]);
    ctx.push(['গড় দেনা', D.debtTotal/N], ['পরিবারের গড় মাসিক আয়', D.incMean], ['বর্তমান গড় পুঁজি', D.capMean]);
    ctx.sort(function(a,b){ return b[1] - a[1]; });
    hbar('context', ctx, {fmt:grp, unit:'টাকা', noPct:true, cls:function(r){ return r[0] === 'প্রাপ্ত সহায়তা' ? 'alt' : 'soft'; }});
  });

  /* তথ্য সম্পর্কে */
  var notes = [];
  notes.push('তথ্যের উৎস: ' + meta.file + ' (' + dg(STATE.rows.length) + 'টি সারি, ' + dg(STATE.head.length) + 'টি কলাম' + (SC.type === 'dist' && STATE.dists.length > 1 ? '; এই রিপোর্ট শুধু ' + distB + ' জেলার ' + dg(N) + ' সারি নিয়ে' : (SC.type === 'div' ? '; এই রিপোর্ট শুধু ' + SC.key + ' বিভাগের ' + dg(N) + ' সারি নিয়ে' : '')) + ')।' +
    (idx.elig !== undefined && rows.every(function(r){ return norm(r[idx.elig]) === 'অনুমোদিত'; }) ? ' সব উপকারভোগী আলেমের অনুমোদনপ্রাপ্ত।' : ''));
  notes.push('প্রত্যেক উপকারভোগীকে ' + grp(FUND) + ' টাকা সহায়তা দেওয়া হয়েছে ধরে সব হিসাব করা হয়েছে। এই অঙ্ক ডাটাশিটে থাকে না, টুলবারের ঘর থেকে বদলানো যায়।');
  if (D.debtTotal > 0) notes.push('“দেনা” হিসাবে অনাদায়ী দেনমোহর ধরা হয়েছে, তাই অনেকের নিট সম্পদ ঋণাত্মক (' + dg(D.netNeg) + ' জন)। মোট দেনার ' + pc(D.dower, D.debtTotal) + ' দেনমোহর।');
  if (D.ageBad) notes.push(dg(D.ageBad) + ' জনের জন্মতারিখ অনুযায়ী বয়স ১৮ বছরের কম বা ১০০ বছরের বেশি আসে। সম্ভবত এন্ট্রির ভুল, তবে বদলানো হয়নি।');
  notes.push('বয়স গণনা হয়েছে ' + (D.dmax ? dayLabel(D.dmax) + ' ' + dg(D.dmax.getFullYear()) : 'আজকের') + ' তারিখ ধরে। ইউনিয়ন ও গ্রামের নাম ডাটার বানান অনুযায়ী আছে।');
  var um = Object.keys(unmapped); if (um.length) notes.push('এই উপজেলার বাংলা নাম তালিকায় নেই, তাই ইংরেজি বানানে দেখানো হয়েছে: ' + um.join(', ') + '।');
  if (STATE.missing.length) notes.push('ফাইলে এই কলামগুলো পাওয়া যায়নি, তাই সংশ্লিষ্ট অংশ ফাঁকা বা অসম্পূর্ণ হতে পারে: ' + STATE.missing.join(', ') + '।');
  if (errors.length) notes.push('কিছু অংশ আঁকতে সমস্যা হয়েছে: ' + errors.join('; '));
  $('notes').innerHTML = notes.map(function(t){ return '<li>' + t + '</li>'; }).join('');
}

/* ---------- ফাইল পড়া ---------- */
function loadRows(wb){
  var name = wb.SheetNames.filter(function(n){ var r = XLSX.utils.sheet_to_json(wb.Sheets[n], {header:1, raw:true, defval:null, range:0}); return r.length && r[0].map(norm).indexOf('উপকারভোগীর নাম') >= 0; })[0] || wb.SheetNames[0];
  var all = XLSX.utils.sheet_to_json(wb.Sheets[name], {header:1, raw:true, defval:null});
  return {head:all[0] || [], body:all.slice(1)};
}
function handleFile(file){
  var msg = $('dropMsg'); msg.textContent = 'ফাইল পড়া হচ্ছে…'; msg.className = '';
  var isCsv = /\.csv$/i.test(file.name), rd = new FileReader();
  rd.onerror = function(){ msg.textContent = 'ফাইলটি পড়া যায়নি। আবার চেষ্টা করুন।'; msg.className = 'err'; };
  rd.onload = function(){
    try {
      var wb = isCsv ? XLSX.read(rd.result, {type:'string', cellDates:true}) : XLSX.read(rd.result, {type:'array', cellDates:true});
      var d = loadRows(wb), ix = indexHeaders(d.head);
      var miss = REQUIRED.filter(function(k){ return ix.idx[k] === undefined; });
      if (miss.length > 3){ msg.textContent = 'এটি SRP-২৬ ফর্মের ডাটা মনে হচ্ছে না। হেডার সারি (প্রথম সারি) ঠিক আছে কি না দেখুন। পাওয়া যায়নি: ' + miss.map(function(k){ return KEYS[k][0]; }).join(', '); msg.className = 'err'; return; }
      var idx = ix.idx, rows = d.body.filter(function(r){ return r && (norm(r[idx.name]) || norm(r[idx.plan])); });
      if (!rows.length){ msg.textContent = 'ফাইলে কোনো উপকারভোগীর সারি পাওয়া যায়নি।'; msg.className = 'err'; return; }
      STATE.rows = rows; STATE.head = d.head; STATE.idx = idx; STATE.file = file.name; STATE.missing = ix.missing.filter(function(k){ return ['loanMet','elig','vil','uni','div','kids','animal'].indexOf(k) < 0 || k === 'kids' || k === 'animal'; }).map(function(k){ return KEYS[k][0]; });
      var ds = {}; rows.forEach(function(r){ var k = idx.dist === undefined ? '' : norm(r[idx.dist]); ds[k] = (ds[k] || 0) + 1; });
      STATE.dists = Object.keys(ds).sort(function(a,b){ return ds[b] - ds[a]; });
      var sel = $('distSel'), dv = {}, esc = function(t){ return String(t).replace(/&/g,'&amp;').replace(/"/g,'&quot;'); };
      rows.forEach(function(r){ var v = divOf(r, idx); if (v) dv[v] = (dv[v] || 0) + 1; });
      var dvs = Object.keys(dv).sort(function(x,y){ return dv[y] - dv[x]; }), multiDiv = dvs.length > 1;
      sel.innerHTML = (multiDiv ? '<option value="a:">সব জেলা একসাথে (' + dg(rows.length) + ')</option>' : '') +
        (STATE.dists.length > 1 && dvs.length ? '<optgroup label="বিভাগ">' + dvs.map(function(k){ return '<option value="v:' + esc(k) + '">' + k + ' বিভাগ (' + dg(dv[k]) + ')</option>'; }).join('') + '</optgroup>' : '') +
        '<optgroup label="জেলা">' + STATE.dists.map(function(k){ return '<option value="d:' + esc(k) + '">' + (k ? distBn(k) + ' (' + dg(ds[k]) + ')' : 'জেলা অজানা') + '</option>'; }).join('') + '</optgroup>';
      $('distWrap').hidden = STATE.dists.length < 2;
      STATE.dist = STATE.dists[0]; STATE.scope = {type:'dist', key:STATE.dist}; sel.value = 'd:' + STATE.dist;
      $('fname').textContent = file.name;
      $('start').hidden = true; $('bar').hidden = false; $('report').hidden = false;
      draw(); window.scrollTo(0, 0);
    } catch (e) { msg.textContent = 'ফাইল খুলতে সমস্যা: ' + e.message; msg.className = 'err'; }
  };
  if (isCsv) rd.readAsText(file, 'utf-8'); else rd.readAsArrayBuffer(file);
}
function draw(){
  var idx = STATE.idx, SC = STATE.scope, rows = STATE.rows.filter(function(r){
    if (SC.type === 'all') return true;
    if (SC.type === 'div') return divOf(r, idx) === SC.key;
    return idx.dist === undefined || norm(r[idx.dist]) === STATE.dist;
  });
  unmapped = {}; render(rows, idx, {file:STATE.file});
}

$('fileIn').addEventListener('change', function(e){ if (e.target.files[0]) handleFile(e.target.files[0]); });
var dz = $('drop');
['dragenter','dragover'].forEach(function(ev){ dz.addEventListener(ev, function(e){ e.preventDefault(); dz.classList.add('over'); }); });
['dragleave','drop'].forEach(function(ev){ dz.addEventListener(ev, function(e){ e.preventDefault(); dz.classList.remove('over'); }); });
dz.addEventListener('drop', function(e){ var f = e.dataTransfer && e.dataTransfer.files[0]; if (f) handleFile(f); });
$('distSel').addEventListener('change', function(e){
  var v = e.target.value, t = v.charAt(0), k = v.slice(2);
  if (t === 'd') STATE.dist = k;
  STATE.scope = {type: t === 'a' ? 'all' : (t === 'v' ? 'div' : 'dist'), key: t === 'd' ? k : (t === 'v' ? k : '')};
  draw();
});
$('fundIn').addEventListener('input', function(e){ var v = Number(e.target.value); if (v > 0){ STATE.fund = v; if (STATE.rows) draw(); } });
$('printBtn').addEventListener('click', function(){ try { window.print(); } catch (e) {} });
$('again').addEventListener('click', function(){ $('fileIn').value = ''; $('start').hidden = false; $('bar').hidden = true; $('report').hidden = true; $('dropMsg').textContent = ''; document.title = 'SRP-২৬ রিপোর্ট জেনারেটর'; });


/* ---------- টেমপ্লেট ডাউনলোড ---------- */
function b64bytes(b){ var s = atob(b), u = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
function tplMsg(t){ ['tplMsg','tplMsg2'].forEach(function(id){ var e = $(id); if (e) e.textContent = t; }); }
function downloadTemplate(){
  var name = 'SRP-26_Data_Template.xlsx';
  try {
    var blob = new Blob([b64bytes(TPL_B64)], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 5000); tplMsg('ডাউনলোড শুরু হয়েছে।');
  } catch (e) { tplMsg('ডাউনলোড করা যায়নি।'); }
}
$('tplBtn').addEventListener('click', downloadTemplate);
$('tplBtn2').addEventListener('click', downloadTemplate);

/* ---------- টুলটিপ ও প্রিন্ট ---------- */
var tip = $('tip');
function showTip(e){
  var t = e.target.closest && e.target.closest('[data-tip]'); if (!t){ tip.style.display = 'none'; return; }
  tip.textContent = t.getAttribute('data-tip'); tip.style.display = 'block';
  var rc = t.getBoundingClientRect(), x = e.clientX != null ? e.clientX : rc.left, y = e.clientY != null ? e.clientY : rc.top, w = tip.offsetWidth;
  tip.style.left = Math.min(Math.max(8, x + 12), innerWidth - w - 8) + 'px'; tip.style.top = Math.max(8, y - 38) + 'px';
}
document.addEventListener('pointermove', showTip); document.addEventListener('pointerdown', showTip);
document.addEventListener('scroll', function(){ tip.style.display = 'none'; }, {passive:true});
document.addEventListener('focusin', function(e){ if (e.target.closest && e.target.closest('[data-tip]')) showTip({target:e.target}); });
document.addEventListener('focusout', function(){ tip.style.display = 'none'; });
window.addEventListener('beforeprint', function(){ document.querySelectorAll('details').forEach(function(d){ d.dataset.was = d.open ? '1' : ''; d.open = true; }); });
window.addEventListener('afterprint', function(){ document.querySelectorAll('details').forEach(function(d){ if (!d.dataset.was) d.open = false; }); });
window.__SRP = {compute:compute, indexHeaders:indexHeaders, handleFile:handleFile};
})();
