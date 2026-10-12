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

  document.querySelectorAll("[data-contact]").forEach((a) => {
    a.href = contactUrl(a.dataset.contact || "");
    a.target = "_blank";
    a.rel = "noopener";
  });

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
    const PRICE = { cover: 1000, slide: 400, seo: 500, model: 1500, anim: 2500, both: 1.6, rush: 1.3 };
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
    run();

    const toast = document.querySelector(".toast");
    $("#copy").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(last); toast.textContent = "Расчёт скопирован"; }
      catch { toast.textContent = "Не получилось скопировать. Выделите текст вручную."; }
      toast.classList.add("on");
      setTimeout(() => toast.classList.remove("on"), 2200);
    });
  }

  const y = document.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
