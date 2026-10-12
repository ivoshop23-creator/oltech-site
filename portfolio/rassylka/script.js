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

  /* Калькулятор: книг в год (книга ≈ 300 страниц) */
  const form = document.querySelector("#calcForm");
  const min = form.querySelector("#min");
  const plural = (n, a, b, c) => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return a;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return b;
    return c;
  };
  const calc = () => {
    const m = +min.value;
    const pace = +form.querySelector("[name=pace]:checked").value;
    const books = Math.max(1, Math.round(m * pace * 365 / 300));
    form.querySelector("#minOut").textContent = m;
    form.querySelector("#books").textContent = books;
    form.querySelector("#booksWord").textContent = plural(books, "книга", "книги", "книг") + " в год";
    const weeks = 52 / books;
    form.querySelector("#booksHint").textContent = weeks <= 1
      ? "Это больше книги в неделю. Впечатляет."
      : "Это одна книга каждые " + weeks.toFixed(1).replace(".", ",").replace(",0", "") + " " + (weeks < 5 ? "недели" : "недель") + ".";
  };
  min.addEventListener("input", calc);
  form.querySelectorAll("[name=pace]").forEach((r) => r.addEventListener("change", calc));
  calc();

  /* Подписка — демо */
  document.querySelectorAll("form.sub").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = f.parentElement.querySelector("[data-note]");
    if (note) note.textContent = "Демо-версия: письмо не отправляется. На реальном сайте адрес попадёт в сервис рассылок.";
  }));
})();
