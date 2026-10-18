"use strict";
const CATS={serum:"Сыворотки",cream:"Кремы",clean:"Очищение",spf:"SPF",toner:"Тоники"};
const SKIN={oily:"Жирная",dry:"Сухая",sens:"Чувствительная",combo:"Комбинированная"};
const GOALS={acne:"Высыпания",pores:"Поры",dry:"Сухость",tone:"Тон и пятна",age:"Морщины"};

let products=[
 {id:1,name:"Сыворотка Ниацинамид",act:"Ниацинамид 10% + цинк 1%",cat:"serum",price:1490,old:1790,vol:[30,60],ph:"5.5",shape:"drop",tint:"#DCE6E3",color:"#2F6F66",skin:["oily","combo"],goal:["acne","pores"],stock:42,on:true,hit:true,rating:4.8,rev:312,
  desc:"Сужает поры и выравнивает тон за 4 недели. Цинк снижает выработку себума, кожа меньше блестит к вечеру.",
  inci:"Aqua, Niacinamide, Zinc PCA, Pentylene Glycol, Tamarindus Indica Seed Gum, Xanthan Gum, Phenoxyethanol",
  use:"2 раза в день, 3–4 капли на чистую кожу перед кремом. Не сочетать в одно применение с кислотами выше 10%."},
 {id:2,name:"Сыворотка Витамин C",act:"Этил-аскорбиновая к-та 15%",cat:"serum",price:2190,vol:[30],ph:"4.5",shape:"drop",tint:"#F1E4CF",color:"#C27A1B",skin:["dry","combo","oily"],goal:["tone","age"],stock:8,on:true,hit:true,rating:4.7,rev:198,
  desc:"Стабильная форма витамина C. Осветляет постакне и пигментные пятна, не окисляется в открытом флаконе 6 месяцев.",
  inci:"Aqua, 3-O-Ethyl Ascorbic Acid, Propanediol, Ferulic Acid, Tocopherol, Sodium Hyaluronate",
  use:"Утром, 3 капли, затем SPF обязательно."},
 {id:3,name:"Сыворотка Гиалурон",act:"5 видов гиалуроновой к-ты 2%",cat:"serum",price:1290,vol:[30,60],ph:"6.0",shape:"drop",tint:"#DDE3F6",color:"#3D55C4",skin:["dry","sens","combo","oily"],goal:["dry"],stock:65,on:true,rating:4.9,rev:451,
  desc:"Пять размеров молекул увлажняют разные слои кожи. Подходит даже самой реактивной коже.",
  inci:"Aqua, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium Acetylated Hyaluronate, Panthenol",
  use:"Утром и вечером на влажную кожу, сверху крем."},
 {id:4,name:"Ретинал 0,05%",act:"Ретинальдегид 0,05%",cat:"serum",price:2690,vol:[15,30],ph:"5.8",shape:"drop",tint:"#EEDDE0",color:"#9A3E52",skin:["dry","combo","oily"],goal:["age","acne"],stock:0,on:true,rating:4.6,rev:87,
  desc:"Ретиноид нового поколения: работает в 11 раз быстрее ретинола, мягче к коже. Для тех, кто начинает.",
  inci:"Caprylic/Capric Triglyceride, Squalane, Retinal, Tocopherol, Bisabolol",
  use:"Вечером 2 раза в неделю, через 2 недели — через день. Днём SPF 50."},
 {id:5,name:"Крем-барьер Церамиды",act:"Церамиды 3% + холестерин",cat:"cream",price:1690,vol:[50],ph:"5.5",shape:"jar",tint:"#E7E3DA",color:"#6E6455",skin:["dry","sens"],goal:["dry"],stock:30,on:true,hit:true,rating:4.9,rev:276,
  desc:"Восстанавливает защитный барьер кожи за 7 дней. Снимает стянутость после умывания и холода.",
  inci:"Aqua, Ceramide NP, Ceramide AP, Cholesterol, Phytosphingosine, Shea Butter, Squalane",
  use:"Последним шагом утром и вечером."},
 {id:6,name:"Гель-крем Матирующий",act:"Ниацинамид 4% + каолин",cat:"cream",price:1390,vol:[50],ph:"5.5",shape:"tube",tint:"#DDE8E2",color:"#3B7A5E",skin:["oily","combo"],goal:["pores","acne"],stock:24,on:true,rating:4.5,rev:133,
  desc:"Лёгкая текстура без плёнки. Матовость держится до 6 часов.",
  inci:"Aqua, Niacinamide, Kaolin, Glycerin, Silica, Allantoin",
  use:"Утром тонким слоем, можно под макияж."},
 {id:7,name:"Гель для умывания мягкий",act:"Бетаин + пантенол 2%",cat:"clean",price:890,vol:[150,300],ph:"5.5",shape:"pump",tint:"#E2E8EC",color:"#4D6A7C",skin:["sens","dry","combo","oily"],goal:["dry"],stock:110,on:true,rating:4.8,rev:520,
  desc:"Очищает без сухости. pH как у здоровой кожи — нет ощущения стянутости.",
  inci:"Aqua, Coco-Glucoside, Cocamidopropyl Betaine, Glycerin, Panthenol, Allantoin",
  use:"Утром и вечером, вспенить в ладонях, смыть тёплой водой."},
 {id:8,name:"Гидрофильное масло",act:"Сквалан + масло жожоба",cat:"clean",price:1190,vol:[150],ph:"—",shape:"pump",tint:"#F0EAD6",color:"#9C8238",skin:["dry","sens","combo"],goal:["dry"],stock:5,on:true,rating:4.7,rev:164,
  desc:"Растворяет SPF и стойкий макияж за 30 секунд. Не забивает поры.",
  inci:"Squalane, Simmondsia Chinensis Seed Oil, Polyglyceryl-4 Oleate, Tocopherol",
  use:"На сухую кожу, массировать 30 секунд, эмульгировать водой."},
 {id:9,name:"Тоник AHA/BHA",act:"Гликолевая 5% + салициловая 1%",cat:"toner",price:1090,vol:[150],ph:"3.8",shape:"bottle",tint:"#E8E2F0",color:"#6B4E9A",skin:["oily","combo"],goal:["pores","acne","tone"],stock:38,on:true,rating:4.6,rev:207,
  desc:"Мягкий пилинг для ежедневного обновления кожи. Очищает поры изнутри.",
  inci:"Aqua, Glycolic Acid, Salicylic Acid, Sodium Hydroxide, Aloe Barbadensis Leaf Juice",
  use:"Вечером через день, ватным диском. Утром SPF."},
 {id:10,name:"Флюид SPF 50 PA++++",act:"Фотостабильные фильтры",cat:"spf",price:1590,old:1890,vol:[50],ph:"6.0",shape:"tube",tint:"#F3E9DC",color:"#B5652E",skin:["oily","combo","sens","dry"],goal:["tone","age"],stock:52,on:true,hit:true,rating:4.8,rev:389,
  desc:"Невесомый флюид без белых следов. Защищает от пигментации и фотостарения.",
  inci:"Aqua, Ethylhexyl Triazone, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Niacinamide",
  use:"Утром последним шагом, обновлять каждые 2–3 часа на солнце."}
];
const BASE=JSON.parse(JSON.stringify(products));

function store(k,v){try{if(v===undefined){return JSON.parse(localStorage.getItem(k))}localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
let cart=store("norma_cart")||[];
let state={view:"home",cat:"",id:null,filters:{skin:[],goal:[]},sort:"pop",promo:false,mode:"shop",pick:{skin:"oily",goal:"pores"}};

const rub=n=>n.toLocaleString("ru-RU")+" ₽";
const $=s=>document.querySelector(s);
const byId=id=>products.find(p=>p.id===id);
function visible(){return products.filter(p=>p.on)}

function bottle(p,big){
  const c=p.color, l="rgba(255,255,255,.85)";
  const label=`<rect x="34" y="${p.shape==="jar"?96:92}" width="52" height="26" rx="3" fill="${l}"/><text x="60" y="${p.shape==="jar"?113:109}" text-anchor="middle" font-family="NormaMono,monospace" font-size="8" fill="#15201E">${(p.act.match(/[\d,]+%/)||[p.ph!=="—"?"pH "+p.ph:"NORMA"])[0]}</text>`;
  let s="";
  if(p.shape==="drop") s=`<rect x="52" y="10" width="16" height="30" rx="8" fill="#15201E"/><rect x="48" y="38" width="24" height="14" rx="2" fill="#2a3533"/><rect x="34" y="52" width="52" height="106" rx="10" fill="${c}"/>`+label;
  if(p.shape==="pump") s=`<rect x="56" y="8" width="26" height="8" rx="2" fill="#15201E"/><rect x="54" y="14" width="10" height="20" fill="#15201E"/><rect x="46" y="32" width="28" height="14" rx="3" fill="#2a3533"/><rect x="30" y="46" width="60" height="112" rx="14" fill="${c}"/>`+label;
  if(p.shape==="tube") s=`<path d="M34 20 H86 L80 136 H40 Z" fill="${c}"/><rect x="44" y="136" width="32" height="22" rx="3" fill="#15201E"/>`+label.replace(/y="92"/,'y="70"').replace(/y="109"/,'y="87"');
  if(p.shape==="jar") s=`<rect x="22" y="60" width="76" height="22" rx="4" fill="#15201E"/><rect x="18" y="80" width="84" height="74" rx="12" fill="${c}"/>`+label;
  if(p.shape==="bottle") s=`<rect x="50" y="12" width="20" height="26" rx="3" fill="#15201E"/><path d="M50 38 H70 L84 60 V150 a8 8 0 0 1 -8 8 H44 a8 8 0 0 1 -8 -8 V60 Z" fill="${c}"/>`+label;
  return `<svg viewBox="0 0 120 168" role="img" aria-label="${p.name}"><ellipse cx="60" cy="162" rx="40" ry="4" fill="rgba(0,0,0,.08)"/>${s}</svg>`;
}

function stockPill(p){
  if(p.stock===0) return '<span class="pill out">нет в наличии</span>';
  if(p.stock<10) return `<span class="pill low">осталось ${p.stock}</span>`;
  return `<span class="pill ok">${p.stock} шт</span>`;
}

function card(p){
  const out=p.stock===0;
  return `<article class="card" style="--tint:${p.tint}">
    <button class="ph" data-open="${p.id}" aria-label="Открыть ${p.name}">${p.old?`<span class="badge">−${Math.round((1-p.price/p.old)*100)}%</span>`:p.hit?'<span class="badge">хит</span>':""}${bottle(p)}</button>
    <div class="body">
      <span class="active">${p.act}</span>
      <h3>${p.name}</h3>
      <span class="meta">★ ${p.rating} · ${p.rev} отзывов · ${p.vol[0]} мл</span>
      <div class="buy"><span class="price">${rub(p.price)}${p.old?`<s>${rub(p.old)}</s>`:""}</span>
      <button class="add" data-add="${p.id}" ${out?"disabled":""}>${out?"Скоро":"В корзину"}</button></div>
    </div></article>`;
}

/* ---------- VIEWS ---------- */
function vHome(){
  const hero=byId(1);
  const hits=visible().filter(p=>p.hit).slice(0,4);
  return `
  <section class="hero">
    <div>
      <span class="label">Уход с открытой формулой</span>
      <h1 style="margin-top:14px">Знайте, что <em>в банке.</em> До процента.</h1>
      <p class="lead">На каждом флаконе — концентрация актива и pH. Никаких «секретных комплексов»: только формулы, которые работают на вашем типе кожи.</p>
      <div class="ctas"><button class="btn" data-go="catalog" data-cat="">Смотреть каталог</button><button class="btn ghost" data-scroll="picker">Подобрать уход за 20 секунд</button></div>
    </div>
    <div class="formula" style="--tint:${hero.tint}">
      <div style="background:${hero.tint};border-radius:16px;padding:12px;display:grid;place-items:center">${bottle(hero)}</div>
      <div style="min-width:0">
        <span class="label">Формула №1 · хит продаж</span>
        <table><tr><td>Ниацинамид</td><td>10,0%</td></tr><tr><td>Цинк PCA</td><td>1,0%</td></tr><tr><td>Отдушки</td><td>0%</td></tr><tr><td>Спирт</td><td>0%</td></tr></table>
        <div class="ph"><span>pH 5.5</span><span>30 мл · ${rub(hero.price)}</span></div>
        <button class="add" style="margin-top:12px;width:100%" data-open="1">Открыть карточку</button>
      </div>
    </div>
  </section>
  <div class="stats">
    <div><b>4,8 ★</b><span>средняя оценка, 2 700+ отзывов</span></div>
    <div><b>1–3 дня</b><span>доставка СДЭК по России</span></div>
    <div><b>от 3 000 ₽</b><span>бесплатная доставка</span></div>
    <div><b>14 дней</b><span>возврат, если не подошло</span></div>
  </div>

  <section class="block">
    <div class="block-head"><h2>Хиты этого месяца</h2><button class="btn ghost" data-go="catalog" data-cat="">Весь каталог →</button></div>
    <div class="grid">${hits.map(card).join("")}</div>
  </section>

  <section class="block" id="picker">
    <div class="picker">
      <div>
        <span class="label" style="color:inherit;opacity:.6">Подбор ухода</span>
        <h2 style="margin:10px 0 8px">Какая у вас кожа и что беспокоит?</h2>
        <p>Выберите два параметра, и мы соберём утренний и вечерний уход из трёх средств.</p>
        <span class="label" style="color:inherit;opacity:.6">Тип кожи</span>
        <div class="chips">${Object.entries(SKIN).map(([k,v])=>`<button class="chip" data-pskin="${k}" aria-pressed="${state.pick.skin===k}">${v}</button>`).join("")}</div>
        <span class="label" style="color:inherit;opacity:.6">Задача</span>
        <div class="chips">${Object.entries(GOALS).map(([k,v])=>`<button class="chip" data-pgoal="${k}" aria-pressed="${state.pick.goal===k}">${v}</button>`).join("")}</div>
      </div>
      <div class="result" id="pick-res">${pickResult()}</div>
    </div>
  </section>`;
}
function pickResult(){
  const {skin,goal}=state.pick;
  const v=visible();
  const clean=v.find(p=>p.cat==="clean"&&p.skin.includes(skin))||v.find(p=>p.cat==="clean");
  const act=v.filter(p=>(p.cat==="serum"||p.cat==="toner")&&p.goal.includes(goal)&&p.skin.includes(skin)).sort((a,b)=>b.rating-a.rating)[0]||v.find(p=>p.cat==="serum");
  const fin=goal==="tone"||goal==="age"?v.find(p=>p.cat==="spf"):(v.find(p=>p.cat==="cream"&&p.skin.includes(skin))||v.find(p=>p.cat==="cream"));
  const set=[clean,act,fin].filter(Boolean);
  const sum=set.reduce((s,p)=>s+p.price,0);
  return `<span class="label" style="color:inherit;opacity:.6">Ваш уход · ${SKIN[skin].toLowerCase()} кожа, ${GOALS[goal].toLowerCase()}</span>
   ${set.map((p,i)=>`<button class="mini" data-open="${p.id}"><span style="background:${p.tint};border-radius:10px;display:grid;place-items:center;height:52px">${bottle(p).replace("<svg","<svg width=\"28\"")}</span><span><span class="mono" style="opacity:.6">Шаг ${i+1}</span><br>${p.name}</span><span class="mono">${rub(p.price)}</span></button>`).join("")}
   <div class="row" style="border-top:1px solid color-mix(in srgb,var(--bg) 20%,transparent);padding-top:12px"><span>Набор со скидкой 10%</span><span class="mono"><s style="opacity:.5">${rub(sum)}</s> ${rub(Math.round(sum*.9))}</span></div>
   <button class="btn" data-addset="${set.map(p=>p.id).join(",")}">Добавить набор в корзину</button>`;
}

function vCatalog(){
  return `<div class="cat-layout">
    <aside class="filters">
      <fieldset><legend class="label">Категория</legend>
        <select id="f-cat"><option value="">Все средства</option>${Object.entries(CATS).map(([k,v])=>`<option value="${k}" ${state.cat===k?"selected":""}>${v}</option>`).join("")}</select></fieldset>
      <fieldset><legend class="label">Тип кожи</legend>${Object.entries(SKIN).map(([k,v])=>`<label><input type="checkbox" id="fs-${k}" data-fskin="${k}" ${state.filters.skin.includes(k)?"checked":""}>${v}</label>`).join("")}</fieldset>
      <fieldset><legend class="label">Задача</legend>${Object.entries(GOALS).map(([k,v])=>`<label><input type="checkbox" id="fg-${k}" data-fgoal="${k}" ${state.filters.goal.includes(k)?"checked":""}>${v}</label>`).join("")}</fieldset>
    </aside>
    <div style="min-width:0">
      <div class="toolbar"><h2 style="font-size:26px">${state.cat?CATS[state.cat]:"Каталог"}</h2>
        <select id="f-sort" aria-label="Сортировка"><option value="pop">Сначала популярные</option><option value="cheap">Сначала дешевле</option><option value="exp">Сначала дороже</option><option value="rate">По рейтингу</option></select></div>
      <div id="cat-grid"></div>
    </div></div>`;
}
function renderCatGrid(){
  let list=visible().filter(p=>(!state.cat||p.cat===state.cat)
    &&(!state.filters.skin.length||state.filters.skin.some(s=>p.skin.includes(s)))
    &&(!state.filters.goal.length||state.filters.goal.some(g=>p.goal.includes(g))));
  const s=state.sort;
  list.sort((a,b)=>s==="cheap"?a.price-b.price:s==="exp"?b.price-a.price:s==="rate"?b.rating-a.rating:b.rev-a.rev);
  $("#cat-grid").innerHTML=list.length?`<p class="note" style="margin:0 0 12px">Найдено: ${list.length}</p><div class="grid">${list.map(card).join("")}</div>`:`<div class="empty">Под эти фильтры ничего нет. Снимите одну галочку.</div>`;
}

function vProduct(){
  const p=byId(state.id); if(!p||!p.on) return `<div class="empty" style="margin-top:32px">Товар снят с продажи.</div>`;
  const out=p.stock===0;
  const ings=p.act.split("+").map(x=>x.trim());
  return `<div class="crumbs"><button data-go="catalog" data-cat="">Каталог</button> / <button data-go="catalog" data-cat="${p.cat}">${CATS[p.cat]}</button> / ${p.name}</div>
  <div class="pdp">
    <div class="visual" style="--tint:${p.tint}">${p.old?`<span class="badge">−${Math.round((1-p.price/p.old)*100)}%</span>`:""}${bottle(p,true)}</div>
    <div style="min-width:0">
      <span class="active mono" style="color:var(--accent)">${p.act}</span>
      <h1>${p.name}</h1>
      <p class="sub">${p.desc}</p>
      <div class="vol" role="group" aria-label="Объём">${p.vol.map((v,i)=>`<button data-vol="${i}" aria-pressed="${i===0}">${v} мл</button>`).join("")}</div>
      <div class="buyrow"><span class="price" id="pdp-price">${rub(p.price)}${p.old?`<s>${rub(p.old)}</s>`:""}</span>
        <button class="btn" data-add="${p.id}" ${out?"disabled":""}>${out?"Нет в наличии":"Добавить в корзину"}</button></div>
      <div class="facts">
        <div><span class="label">pH</span><b>${p.ph}</b></div>
        <div><span class="label">Рейтинг</span><b>★ ${p.rating}</b></div>
        <div><span class="label">Отзывы</span><b>${p.rev}</b></div>
      </div>
      <details open><summary>Формула</summary>
        <div class="bars">${ings.map(x=>{const m=x.match(/([\d,]+)%/);const v=m?parseFloat(m[1].replace(",",".")):0;return `<div class="bar"><span>${x.replace(/\s*[\d,]+%/,"")}</span><i style="--w:${Math.min(100,v*6+(v?8:0))}%"></i><span class="mono">${m?m[1]+"%":"—"}</span></div>`}).join("")}</div>
        <p class="inci">INCI: ${p.inci}</p></details>
      <details><summary>Как применять</summary><p>${p.use}</p></details>
      <details><summary>Для какой кожи</summary><p>${p.skin.map(s=>SKIN[s]).join(", ")}. Задачи: ${p.goal.map(g=>GOALS[g].toLowerCase()).join(", ")}.</p></details>
      <details><summary>Доставка и возврат</summary><p>СДЭК, Почта России, курьер по Москве. Бесплатно от 3 000 ₽. Вернём деньги за невскрытый товар в течение 14 дней.</p></details>
    </div>
  </div>
  <section class="block"><div class="block-head"><h2>С этим берут</h2></div>
    <div class="grid">${visible().filter(x=>x.id!==p.id&&x.goal.some(g=>p.goal.includes(g))).slice(0,4).map(card).join("")}</div></section>`;
}

function cartLines(){return cart.map(l=>({...l,p:byId(l.id)})).filter(l=>l.p)}
function totals(){
  const lines=cartLines();
  const sub=lines.reduce((s,l)=>s+l.price*l.q,0);
  const disc=state.promo?Math.round(sub*.1):0;
  const ship=sub-disc>=3000||sub===0?0:350;
  return {lines,sub,disc,ship,total:sub-disc+ship};
}
function vCart(){
  const t=totals();
  if(!t.lines.length) return `<div class="success"><h2>Корзина пуста</h2><p class="note">Начните с хитов или подберите уход по типу кожи.</p><button class="btn" data-go="home">На главную</button></div>`;
  const left=Math.max(0,3000-(t.sub-t.disc));
  return `<div class="cart"><div style="min-width:0">
    <h2 style="font-size:28px;margin-bottom:8px">Корзина</h2>
    ${t.lines.map((l,i)=>`<div class="line" style="--tint:${l.p.tint}"><div class="th">${bottle(l.p)}</div>
      <div style="min-width:0"><b>${l.p.name}</b><div class="note">${l.vol} мл · ${l.p.act}</div>
      <div class="qty"><button data-q="${i}" data-d="-1" aria-label="Меньше">−</button><span>${l.q}</span><button data-q="${i}" data-d="1" aria-label="Больше">+</button></div></div>
      <span class="price">${rub(l.price*l.q)}</span></div>`).join("")}
  </div>
  <form class="summary" id="checkout" novalidate>
    <span class="label">Оформление</span>
    <div class="progress" aria-hidden="true"><i style="width:${Math.min(100,(t.sub-t.disc)/30)}%"></i></div>
    <span class="note">${left?`Ещё ${rub(left)} до бесплатной доставки`:"Доставка бесплатная"}</span>
    <div class="row"><span>Товары</span><span class="mono">${rub(t.sub)}</span></div>
    ${t.disc?`<div class="row" style="color:var(--ok)"><span>Промокод NORMA10</span><span class="mono">−${rub(t.disc)}</span></div>`:""}
    <div class="row"><span>Доставка СДЭК</span><span class="mono">${t.ship?rub(t.ship):"0 ₽"}</span></div>
    <div class="row total"><span>Итого</span><span class="mono">${rub(t.total)}</span></div>
    <div class="field"><label for="promo">Промокод (попробуйте NORMA10)</label><div style="display:flex;gap:8px"><input type="text" id="promo" placeholder="NORMA10"><button type="button" class="btn ghost" id="promo-btn" style="padding:10px 14px">Применить</button></div></div>
    <div class="field"><label for="c-name">Имя</label><input type="text" id="c-name" value="Анна"></div>
    <div class="field"><label for="c-phone">Телефон</label><input type="tel" id="c-phone" value="+7 912 000-00-00"></div>
    <div class="field"><label for="c-city">Город и пункт выдачи</label><input type="text" id="c-city" value="Екатеринбург, ПВЗ СДЭК ул. Малышева, 51"></div>
    <div class="pay" role="radiogroup" aria-label="Оплата">
      <label><input type="radio" name="pay" id="pay-card" checked> Картой онлайн (ЮKassa)</label>
      <label><input type="radio" name="pay" id="pay-sbp"> СБП</label>
      <label><input type="radio" name="pay" id="pay-split"> Частями (Сплит)</label>
    </div>
    <button class="btn" type="submit">Оформить заказ на ${rub(t.total)}</button>
    <span class="note">В демо оплата не списывается. Заказ попадёт в CRM владельца в рабочей версии.</span>
  </form></div>`;
}

function vAdmin(){
  return `<div class="admin">
    <div class="admin-intro"><div><span class="label">Панель владельца · демо</span><h2 style="font-size:24px;margin-top:6px">Товары</h2>
      <p>Так владелец управляет магазином: меняет цену, остаток и видимость товара. Измените цену, затем переключитесь на «Глазами покупателя», и витрина обновится сразу.</p></div>
      <button class="btn ghost" id="reset">Сбросить изменения</button></div>
    <div class="newform"><div class="field"><label for="n-name">Новый товар</label><input type="text" id="n-name" placeholder="Например, Маска с глиной"></div>
      <div class="field"><label for="n-cat">Категория</label><select id="n-cat">${Object.entries(CATS).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select></div>
      <div class="field"><label for="n-price">Цена, ₽</label><input type="number" id="n-price" value="990" min="1"></div>
      <div class="field"><label for="n-stock">Остаток</label><input type="number" id="n-stock" value="20" min="0"></div>
      <button class="btn" id="n-add">Добавить</button></div>
    <div class="tbl-wrap"><table class="adm"><thead><tr><th></th><th>Название</th><th>Категория</th><th>Цена, ₽</th><th>Остаток</th><th>Статус</th><th>На сайте</th></tr></thead>
    <tbody>${products.map(p=>`<tr style="--tint:${p.tint}"><td><div class="sw">${bottle(p)}</div></td>
      <td><input type="text" id="a-name-${p.id}" data-edit="${p.id}" data-k="name" value="${p.name}"></td>
      <td>${CATS[p.cat]}</td>
      <td style="width:120px"><input type="number" id="a-price-${p.id}" data-edit="${p.id}" data-k="price" value="${p.price}" min="1"></td>
      <td style="width:100px"><input type="number" id="a-stock-${p.id}" data-edit="${p.id}" data-k="stock" value="${p.stock}" min="0"></td>
      <td id="st-${p.id}">${stockPill(p)}</td>
      <td><button class="toggle" data-vis="${p.id}" aria-pressed="${p.on}" aria-label="Показывать ${p.name} на сайте"></button></td></tr>`).join("")}</tbody></table></div>
    <p class="note">В рабочей версии на WooCommerce: та же логика плюс фото, описания, акции, заказы, выгрузка в 1С/МойСклад и на Ozon/WB.</p>
  </div>`;
}

/* ---------- RENDER ---------- */
function render(scroll=true){
  const v=$("#view");
  if(state.mode==="admin") v.innerHTML=vAdmin();
  else if(state.view==="home") v.innerHTML=vHome();
  else if(state.view==="catalog"){v.innerHTML=vCatalog();$("#f-sort").value=state.sort;renderCatGrid()}
  else if(state.view==="product") v.innerHTML=vProduct();
  else if(state.view==="cart") v.innerHTML=vCart();
  document.querySelectorAll("nav.main button").forEach(b=>b.classList.toggle("on",state.mode==="shop"&&state.view==="catalog"&&b.dataset.cat===state.cat));
  $("#cart-n").textContent=cart.reduce((s,l)=>s+l.q,0);
  if(scroll) window.scrollTo({top:0});
}
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),1800)}
function save(){store("norma_cart",cart);$("#cart-n").textContent=cart.reduce((s,l)=>s+l.q,0)}
function addToCart(id,volIdx=0,silent){
  const p=byId(id); if(!p||p.stock===0) return;
  const vol=p.vol[volIdx]; const price=volIdx?Math.round(p.price*1.75/10)*10:p.price;
  const ex=cart.find(l=>l.id===id&&l.vol===vol);
  ex?ex.q++:cart.push({id,vol,price,q:1});
  save(); if(!silent) toast(`«${p.name}» в корзине`);
}
function setMode(m){state.mode=m;$("#mode-shop").setAttribute("aria-pressed",m==="shop");$("#mode-admin").setAttribute("aria-pressed",m==="admin");render()}

document.addEventListener("click",e=>{
  const t=e.target.closest("button"); if(!t) return;
  const d=t.dataset;
  if(t.id==="mode-shop") return setMode("shop");
  if(t.id==="mode-admin") return setMode("admin");
  if(d.go){state.mode="shop";setMode("shop");state.view=d.go;if(d.cat!==undefined){state.cat=d.cat;state.filters={skin:[],goal:[]}}render();return}
  if(d.open){state.mode="shop";state.view="product";state.id=+d.open;state.volIdx=0;render();return}
  if(d.add){addToCart(+d.add,state.view==="product"?state.volIdx||0:0);if(t.classList.contains("add")){t.textContent="✓ Добавлено";t.classList.add("done");setTimeout(()=>{t.textContent="В корзину";t.classList.remove("done")},1300)}return}
  if(d.addset){d.addset.split(",").forEach(id=>addToCart(+id,0,true));state.promo=true;toast("Набор добавлен, скидка 10% применена");return}
  if(d.scroll){document.getElementById(d.scroll).scrollIntoView({behavior:"smooth"});return}
  if(d.pskin||d.pgoal){if(d.pskin)state.pick.skin=d.pskin;if(d.pgoal)state.pick.goal=d.pgoal;
    document.querySelectorAll("[data-pskin]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.pskin===state.pick.skin));
    document.querySelectorAll("[data-pgoal]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.pgoal===state.pick.goal));
    $("#pick-res").innerHTML=pickResult();return}
  if(d.vol!==undefined){const p=byId(state.id);state.volIdx=+d.vol;document.querySelectorAll("[data-vol]").forEach(b=>b.setAttribute("aria-pressed",b===t));
    const pr=state.volIdx?Math.round(p.price*1.75/10)*10:p.price;$("#pdp-price").innerHTML=rub(pr)+(p.old&&!state.volIdx?`<s>${rub(p.old)}</s>`:"");return}
  if(d.q!==undefined){const l=cart[+d.q];l.q+= +d.d;if(l.q<=0)cart.splice(+d.q,1);save();render(false);return}
  if(t.id==="promo-btn"){const v=($("#promo").value||"").trim().toUpperCase();if(v==="NORMA10"){state.promo=true;render(false);toast("Скидка 10% применена")}else toast("Такого промокода нет. Попробуйте NORMA10");return}
  if(d.vis){const p=byId(+d.vis);p.on=!p.on;t.setAttribute("aria-pressed",p.on);toast(p.on?"Товар снова на сайте":"Товар скрыт с витрины");return}
  if(t.id==="reset"){products=JSON.parse(JSON.stringify(BASE));render(false);toast("Каталог восстановлен");return}
  if(t.id==="n-add"){const name=$("#n-name").value.trim();if(!name){toast("Введите название товара");return}
    const cat=$("#n-cat").value,price=Math.max(1,+$("#n-price").value||0),stock=Math.max(0,+$("#n-stock").value||0);
    const id=Math.max(...products.map(p=>p.id))+1;
    products.push({id,name,act:"Новинка",cat,price,vol:[50],ph:"5.5",shape:cat==="cream"?"jar":cat==="clean"?"pump":cat==="spf"?"tube":"drop",tint:"#E4E6EF",color:"#5A5F8A",skin:["oily","dry","sens","combo"],goal:["dry"],stock,on:true,rating:5,rev:0,desc:"Описание добавит владелец в админке.",inci:"—",use:"—"});
    render(false);toast(`«${name}» добавлен на витрину`);return}
});
document.addEventListener("change",e=>{
  const t=e.target,d=t.dataset;
  if(t.id==="f-cat"){state.cat=t.value;render(false);return}
  if(t.id==="f-sort"){state.sort=t.value;renderCatGrid();return}
  if(d.fskin||d.fgoal){const k=d.fskin?"skin":"goal",v=d.fskin||d.fgoal,arr=state.filters[k];t.checked?arr.push(v):arr.splice(arr.indexOf(v),1);renderCatGrid();return}
  if(d.edit){const p=byId(+d.edit);if(d.k==="name"){p.name=t.value.trim()||p.name}else{const n=Math.max(d.k==="price"?1:0,Math.round(+t.value||0));p[d.k]=n;t.value=n}
    const st=document.getElementById("st-"+p.id);if(st)st.innerHTML=stockPill(p);toast("Сохранено");}
});
document.addEventListener("submit",e=>{
  if(e.target.id!=="checkout") return; e.preventDefault();
  const t=totals(); const num="N-"+String(Date.now()).slice(-5);
  cart=[];state.promo=false;save();
  $("#view").innerHTML=`<div class="success"><span class="label">Заказ ${num}</span><h2>Спасибо, заказ оформлен</h2>
   <p class="note" style="max-width:46ch">Это демо, деньги не списаны. В рабочей версии покупатель оплатит ${rub(t.total)} через ЮKassa, получит SMS и трек-номер СДЭК, а заказ появится у владельца в админке и CRM.</p>
   <button class="btn" data-go="home">Вернуться в магазин</button></div>`;window.scrollTo({top:0});
});
render(false);
