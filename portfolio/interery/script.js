(() => {
  "use strict";

  /* Появление блоков при прокрутке */
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("in"));
  }

  /* Мобильное меню */
  const hdr = document.querySelector(".hdr");
  const burger = document.querySelector(".burger");
  const setOpen = (on) => { hdr.classList.toggle("open", on); burger.setAttribute("aria-expanded", on); };
  burger.addEventListener("click", () => setOpen(!hdr.classList.contains("open")));
  hdr.querySelectorAll(".menu a").forEach((a) => a.addEventListener("click", () => setOpen(false)));

  /* Калькулятор */
  const form = document.querySelector("#calcForm");
  const area = form.querySelector("#area");
  const RATE = { plan: 900, design: 2500, full: 2500 };
  const TERM = { plan: "10 дней", design: "30 дней", full: "30 дней + ремонт" };
  const fmt = (n) => Math.round(n).toLocaleString("ru-RU") + " ₽";
  const calc = () => {
    const a = +area.value;
    const pkg = form.querySelector("input[name=pkg]:checked").value;
    let cost = a * RATE[pkg];
    if (pkg === "full") cost += 35000 * 3;
    form.querySelector("#areaOut").value = a;
    form.querySelector("#cost").textContent = fmt(Math.round(cost / 1000) * 1000);
    form.querySelector("#term").textContent = TERM[pkg];
  };
  form.addEventListener("input", calc);
  form.addEventListener("submit", (e) => e.preventDefault());
  calc();

  /* Форма заявки — демо */
  const lead = document.querySelector("#leadForm");
  lead.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("#leadNote").textContent = "Это демо-версия сайта: заявки не отправляются.";
  });
})();
