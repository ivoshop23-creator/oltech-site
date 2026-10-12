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

  /* Форма дат — демо */
  const book = document.querySelector("#book");
  const today = new Date();
  const iso = (d) => d.toISOString().slice(0, 10);
  const inp = book.querySelector("[name=in]"), out = book.querySelector("[name=out]");
  inp.min = iso(today); out.min = iso(new Date(today.getTime() + 864e5));
  /* По умолчанию — ближайшие выходные: пятница → воскресенье */
  const fri = new Date(today); fri.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7 || 7));
  if (!inp.value) inp.value = iso(fri);
  if (!out.value) out.value = iso(new Date(fri.getTime() + 2 * 864e5));
  inp.addEventListener("change", () => { if (inp.value) out.min = iso(new Date(new Date(inp.value).getTime() + 864e5)); });
  book.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("#bookNote").textContent = "Демо-версия: бронирование не работает. На реальном сайте здесь появятся свободные домики.";
  });

  /* Квиз-подбор */
  const quiz = document.querySelector("#quizForm");
  const steps = [...quiz.querySelectorAll(".q")];
  const bar = quiz.querySelector("#qBar");
  const show = (n) => {
    steps.forEach((s) => s.classList.toggle("on", +s.dataset.step === n));
    bar.style.width = Math.min(100, n * 33.4) + "%";
  };
  const RESULT = {
    pair: ["Панорама", "Домик для двоих с кроватью у панорамного окна и камином."],
    family: ["A-фрейм", "Две спальни на двух этажах и свой чан на террасе."],
    friends: ["Дом с баней", "Две спальни, баня на дровах и чан на всю компанию."]
  };
  quiz.addEventListener("change", (e) => {
    const step = +e.target.closest(".q").dataset.step;
    if (step < 3) { setTimeout(() => show(step + 1), 250); return; }
    const who = quiz.querySelector("[name=who]:checked")?.value || "pair";
    const want = quiz.querySelector("[name=want]:checked")?.value;
    let [house, why] = RESULT[who];
    if (who === "pair" && want === "spa") { house = "A-фрейм"; why = "Для двоих с собственным чаном под звёздами."; }
    quiz.querySelector("#qHouse").textContent = house;
    quiz.querySelector("#qWhy").textContent = why;
    setTimeout(() => show(4), 250);
  });
  quiz.addEventListener("submit", (e) => e.preventDefault());
})();
