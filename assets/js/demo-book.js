(() => {
  const f = document.getElementById("book");
  if (!f) return;
  const q = new URLSearchParams(location.search), k = (q.get("k") || "").slice(0, 60), c = (q.get("c") || "").slice(0, 40);
  if (k) {
    const h = document.querySelector("h1"), crumbs = document.querySelector(".crumbs");
    const p = document.createElement("p"); p.className = "crumbs"; p.textContent = "Пример страницы записи для «" + k + "»" + (c ? ", " + c : "");
    crumbs.replaceWith(p); h.textContent = k + ": " + h.textContent.charAt(0).toLowerCase() + h.textContent.slice(1);
    document.title = k + " — онлайн-запись";
    const r = q.get("r"), n = q.get("n"), vet = f.dataset.niche === "ветклиника";
    const who = vet ? "хозяин питомца" : "водитель";
    const pts = [
      (r && n ? "У вас " + r + "★ и " + n + " отзывов в 2ГИС: люди вам доверяют. " : "") + "Но сайта нет, и записаться онлайн нельзя.",
      "Вечером и в выходные " + who + " не дозванивается и уходит к тем, у кого есть кнопка «Записаться».",
      vet ? "Администратор весь день отвечает на «сколько стоит приём?» вместо работы с клиентами." : "В сезон телефон разрывается, а мастер не может ответить, пока работает."
    ];
    const box = document.createElement("div"); box.className = "pain";
    box.innerHTML = "<b>Что сейчас теряет «" + k.replace(/[<>&"]/g, "") + "»</b><ul>" + pts.map((x) => "<li>" + x.replace(/[<>&]/g, "") + "</li>").join("") + "</ul><b>Решение ниже: так будет выглядеть ваша запись 24/7 ↓</b>";
    document.querySelector(".page-hero .lead").after(box);
  }
  const days = document.getElementById("b-days"), times = document.getElementById("b-times");
  const wd = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const now = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(now); d.setDate(now.getDate() + i + 1);
    const t = wd[d.getDay()] + " " + d.getDate() + "." + String(d.getMonth() + 1).padStart(2, "0");
    days.insertAdjacentHTML("beforeend", `<input type="radio" name="b-day" id="d${i}" value="${t}"${i ? "" : " checked"}><label for="d${i}">${t}</label>`);
  }
  f.dataset.slots.split(",").forEach((s, i) => {
    const busy = (i * 7 + 3) % 4 === 0;
    times.insertAdjacentHTML("beforeend", `<input type="radio" name="b-time" id="t${i}" value="${s}"${busy ? " disabled" : ""}><label for="t${i}"${busy ? ' title="занято" style="opacity:.35"' : ""}>${s}</label>`);
  });
  const first = times.querySelector("input:not([disabled])"); if (first) first.checked = true;
  const run = () => {
    const svc = f.querySelector("input[name=b-svc]:checked");
    const day = f.querySelector("input[name=b-day]:checked").value;
    const tm = f.querySelector("input[name=b-time]:checked");
    document.getElementById("b-sum").textContent = (+svc.value).toLocaleString("ru-RU") + " ₽";
    document.getElementById("b-when").textContent = svc.dataset.name + ", " + day + (tm ? " в " + tm.value : "");
    const msg = "Здравствуйте! Посмотрел демо онлайн-записи (" + f.dataset.niche + "). Хочу такую для своего бизнеса: ";
    document.getElementById("b-send").href = "https://t.me/olvr23?text=" + encodeURIComponent(msg);
  };
  f.addEventListener("input", run);
  f.addEventListener("submit", (e) => e.preventDefault());
  run();
})();
