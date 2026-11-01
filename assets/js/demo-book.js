(() => {
  const f = document.getElementById("book");
  if (!f) return;
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
