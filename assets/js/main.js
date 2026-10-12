(() => {
  "use strict";

  /* Куда пишут клиенты. Укажите username Telegram без @ — и все кнопки сайта поведут в чат. */
  const CONTACT = {
    telegram: "olvr23",
    fallback: "https://kwork.ru/user/olvr23"
  };

  const contactUrl = (text) => {
    if (!CONTACT.telegram) return CONTACT.fallback;
    const base = "https://t.me/" + CONTACT.telegram;
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  };

  /* Цели Яндекс Метрики: tg_click — переход в Telegram, calc_send / calc_copy — калькулятор */
  const goal = (name, params) => {
    try { if (window.ym && window.OLTECH_METRIKA_ID) window.ym(window.OLTECH_METRIKA_ID, "reachGoal", name, params || {}); } catch (e) {}
  };
  const page = location.pathname.replace(/\/$/, "") || "/main";

  document.querySelectorAll("[data-contact]").forEach((a) => {
    a.href = contactUrl(a.dataset.contact || "");
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", () => goal("tg_click", { page: page, button: a.textContent.trim() }));
  });

  /* Мобильное меню */
  const top = document.querySelector(".top");
  const burger = document.querySelector(".burger");
  if (top && burger) {
    const setOpen = (on) => { top.classList.toggle("open", on); burger.setAttribute("aria-expanded", on); };
    burger.addEventListener("click", () => setOpen(!top.classList.contains("open")));
    top.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Hero: обычная карточка превращается в продающую по мере прокрутки */
  const hero = document.querySelector(".hero");
  if (hero) {
    const tile = hero.querySelector(".tile.me");
    const notes = hero.querySelectorAll(".note");
    const desktop = window.matchMedia("(min-width: 961px)");
    let ticking = false;

    const paint = () => {
      ticking = false;
      let p = 1;
      if (desktop.matches && !reduce) {
        const r = hero.getBoundingClientRect();
        const run = hero.offsetHeight - window.innerHeight;
        p = Math.min(1, Math.max(0, -r.top / (run * 0.7)));
      }
      tile.style.setProperty("--p", Math.min(1, p / 0.55).toFixed(3));
      tile.style.setProperty("--lift", Math.max(0, (p - 0.55) / 0.45).toFixed(3));
      tile.classList.toggle("on", p > 0.98);
      notes.forEach((n, i) => n.classList.toggle("on", p > 0.35 + i * 0.22));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };

    if (!desktop.matches || reduce) {
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          let p = 0;
          const step = () => {
            p = Math.min(1, p + 0.018);
            tile.style.setProperty("--p", Math.min(1, p / 0.55));
            tile.style.setProperty("--lift", Math.max(0, (p - 0.55) / 0.45));
            notes.forEach((n, i) => n.classList.toggle("on", p > 0.35 + i * 0.22));
            if (p < 1) requestAnimationFrame(step); else tile.classList.add("on");
          };
          reduce ? (tile.style.setProperty("--p", 1), tile.style.setProperty("--lift", 1), notes.forEach((n) => n.classList.add("on"))) : setTimeout(() => requestAnimationFrame(step), 500);
          io.disconnect();
        });
      }, { threshold: 0.5 });
      io.observe(tile);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      paint();
    }
  }

  /* Ползунок «было / стало» */
  document.querySelectorAll(".ba").forEach((ba) => {
    const input = ba.querySelector("input");
    const set = () => ba.style.setProperty("--x", input.value + "%");
    input.addEventListener("input", set);
    set();
  });

  /* Калькулятор */
  const calc = document.querySelector("#calc");
  if (calc) {
    const fmt = (n) => Math.round(n).toLocaleString("ru-RU") + " ₽";
    const $ = (s) => calc.querySelector(s);
    const PRICE = { cover: 1000, slide: 375, seo: 500, model: 1500, anim: 2500, both: 1.6, rush: 1.3 };
    let last = "";

    const run = () => {
      const slides = +$("#slides").value;
      const qty = +$("#qty").value;
      const mp = calc.querySelector("input[name=mp]:checked").value;
      $("#slides-out").value = slides;
      $("#qty-out").value = qty;

      let one = PRICE.cover + (slides - 1) * PRICE.slide;
      if (mp === "both") one *= PRICE.both;
      if ($("#seo").checked) one += PRICE.seo;
      if ($("#model").checked) one += PRICE.model;
      if ($("#anim").checked) one += PRICE.anim;
      if ($("#rush").checked) one *= PRICE.rush;
      one = Math.round(one / 50) * 50;

      const d = qty >= 5 ? 0.15 : qty >= 3 ? 0.1 : 0;
      const total = Math.round((one * qty * (1 - d)) / 50) * 50;

      $("#sum").textContent = fmt(total);
      $("#per").textContent = qty > 1 ? fmt(one) + " за товар до скидки" : "за один товар";
      $("#disc").textContent = d ? "Скидка " + d * 100 + "% за " + qty + " товаров" : "";

      const extras = ["seo", "model", "anim", "rush"].filter((k) => $("#" + k).checked).map((k) => $("#" + k).dataset.label);
      const mpName = { wb: "Wildberries", ozon: "Ozon", both: "Wildberries и Ozon" }[mp];
      last = "Здравствуйте! Хочу карточки: " + mpName + ", " + slides + " слайд(ов), товаров: " + qty +
        (extras.length ? ", доп.: " + extras.join(", ") : "") + ". Расчёт с сайта: " + fmt(total) + ".";
      $("#send").href = contactUrl(last);
    };

    calc.addEventListener("input", run);
    calc.addEventListener("submit", (e) => e.preventDefault());
    $("#send").addEventListener("click", () => goal("calc_send", { sum: $("#sum").textContent }));
    run();

    const toast = document.querySelector(".toast");
    $("#copy").addEventListener("click", async () => {
      goal("calc_copy");
      try { await navigator.clipboard.writeText(last); toast.textContent = "Расчёт скопирован"; }
      catch { toast.textContent = "Не получилось скопировать. Выделите текст вручную."; }
      toast.classList.add("on");
      setTimeout(() => toast.classList.remove("on"), 2200);
    });
  }

  /* Кнопка «наверх» */
  const up = document.querySelector(".to-top");
  if (up) {
    const toggleUp = () => up.classList.toggle("on", window.scrollY > 700);
    window.addEventListener("scroll", toggleUp, { passive: true });
    toggleUp();
    up.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
  }

  /* Карусели примеров сайтов + просмотр крупно */
  const cars = document.querySelectorAll(".site");
  let lb = null, lbItems = [], lbIdx = 0;
  const lbShow = (i) => {
    lbIdx = (i + lbItems.length) % lbItems.length;
    const it = lbItems[lbIdx];
    lb.querySelector("img").src = it.full;
    lb.querySelector("img").alt = it.alt;
    lb.querySelector(".lb-c").textContent = it.title + " · " + (lbIdx + 1) + " / " + lbItems.length;
  };
  const lbClose = () => { lb.hidden = true; document.body.style.overflow = ""; };
  const lbOpen = (items, i) => {
    if (!lb) {
      lb = document.createElement("div");
      lb.className = "lb"; lb.hidden = true;
      lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Просмотр примера");
      lb.innerHTML = '<img alt=""><button class="lb-x" type="button" aria-label="Закрыть">✕</button>' +
        '<button class="lb-p" type="button" aria-label="Предыдущий">‹</button><button class="lb-n" type="button" aria-label="Следующий">›</button><p class="lb-c"></p>';
      document.body.appendChild(lb);
      lb.querySelector(".lb-x").addEventListener("click", lbClose);
      lb.querySelector(".lb-p").addEventListener("click", () => lbShow(lbIdx - 1));
      lb.querySelector(".lb-n").addEventListener("click", () => lbShow(lbIdx + 1));
      lb.addEventListener("click", (e) => { if (e.target === lb) lbClose(); });
      document.addEventListener("keydown", (e) => {
        if (lb.hidden) return;
        if (e.key === "Escape") lbClose();
        if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
        if (e.key === "ArrowRight") lbShow(lbIdx + 1);
      });
    }
    lbItems = items; lb.hidden = false; document.body.style.overflow = "hidden";
    lbShow(i); lb.querySelector(".lb-x").focus();
  };

  cars.forEach((site) => {
    const box = site.querySelector(".site-car");
    const thumbs = [...site.querySelectorAll(".site-thumbs button")];
    if (!box || !thumbs.length) return;
    const img = box.querySelector("img");
    const count = box.querySelector(".car-count");
    const items = thumbs.map((b) => ({ full: b.dataset.full, alt: b.dataset.alt, title: b.title }));
    let cur = 0;
    const go = (i) => {
      cur = (i + items.length) % items.length;
      thumbs.forEach((b, k) => { b.classList.toggle("on", k === cur); b.setAttribute("aria-pressed", k === cur); });
      if (count) count.textContent = (cur + 1) + " / " + items.length;
      if (reduce) { img.src = items[cur].full; img.alt = items[cur].alt; return; }
      img.classList.add("fade");
      const pre = new Image();
      pre.onload = pre.onerror = () => { img.src = items[cur].full; img.alt = items[cur].alt; img.classList.remove("fade"); };
      pre.src = items[cur].full;
    };
    thumbs.forEach((b, k) => b.addEventListener("click", () => go(k)));
    box.querySelector(".car-p")?.addEventListener("click", () => go(cur - 1));
    box.querySelector(".car-n")?.addEventListener("click", () => go(cur + 1));
    box.querySelector(".car-zoom")?.addEventListener("click", () => lbOpen(items, cur));
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => lbOpen(items, cur));
    /* Свайп пальцем */
    let x0 = null;
    box.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? cur + 1 : cur - 1);
    }, { passive: true });
  });

  const y = document.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
