(() => {
  "use strict";

  /* Появление блоков */
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
  } else els.forEach((el) => el.classList.add("in"));

  /* Мобильное меню */
  const hdr = document.querySelector(".hdr");
  const burger = document.querySelector(".burger");
  const setOpen = (on) => { hdr.classList.toggle("open", on); burger.setAttribute("aria-expanded", on); };
  burger.addEventListener("click", () => setOpen(!hdr.classList.contains("open")));
  hdr.querySelectorAll(".menu a").forEach((a) => a.addEventListener("click", () => setOpen(false)));

  /* Калькулятор: цена за м² с материалами (вымышленные) */
  const MAT = {
    roof:  [["Металлочерепица", 2400], ["Гибкая черепица", 3100], ["Фальцевая кровля", 3600]],
    house: [["Каркасный дом", 38000], ["Дом из бруса", 44000], ["Газобетон", 52000]],
    fix:   [["Частичный ремонт", 900], ["Замена покрытия", 1600], ["Полная замена с утеплением", 2600]]
  };
  const form = document.querySelector("#calcForm");
  const mat = form.querySelector("#mat");
  const area = form.querySelector("#area");
  const fmt = (n) => (Math.round(n / 1000) * 1000).toLocaleString("ru-RU") + " ₽";
  const kind = () => form.querySelector("[name=kind]:checked").value;

  const fill = () => {
    mat.innerHTML = "";
    MAT[kind()].forEach(([name, rate], i) => mat.add(new Option(name, rate, i === 0, i === 0)));
  };
  const days = (n) => n + " " + (n % 10 === 1 && n % 100 !== 11 ? "день" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "дня" : "дней");
  const calc = () => {
    const a = +area.value, sum = a * +mat.value, k = kind();
    form.querySelector("#areaOut").textContent = a;
    form.querySelector("#cost").textContent = fmt(sum * 0.95) + " – " + fmt(sum * 1.08);
    let term;
    if (k === "house") term = (3 + Math.ceil(a / 60)) + " мес.";
    else if (k === "roof") term = days(5 + Math.ceil(a / 25));
    else term = days(2 + Math.ceil(a / 50));
    form.querySelector("#term").textContent = term;
  };
  form.querySelectorAll("[name=kind]").forEach((r) => r.addEventListener("change", () => { fill(); calc(); }));
  mat.addEventListener("change", calc);
  area.addEventListener("input", calc);
  fill(); calc();

  /* Заявка — демо */
  document.querySelector("#leadForm").addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("#leadNote").textContent = "Демо-версия: заявка не отправляется. На реальном сайте она придёт в CRM и Telegram.";
  });
})();
