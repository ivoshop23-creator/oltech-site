(() => {
  const f = document.getElementById("demo-calc");
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => Math.round(n).toLocaleString("ru-RU") + " ₽";
  const run = () => {
    const area = +$("d-area").value, lamps = +$("d-lamps").value;
    const price = +f.querySelector("input[name=d-type]:checked").value;
    const perim = 4 * Math.sqrt(area);
    let sum = area * price + lamps * 450;
    if ($("d-shadow").checked) sum += perim * 350;
    if ($("d-curt").checked) sum += 2500;
    $("d-area-out").textContent = area;
    $("d-lamps-out").textContent = lamps;
    $("d-sum").textContent = fmt(sum);
    const msg = "Здравствуйте! Посмотрел демо калькулятора (потолки, " + area + " м², " + fmt(sum) + "). Хочу такой для своего бизнеса: ";
    $("d-send").href = "https://t.me/olvr23?text=" + encodeURIComponent(msg);
  };
  f.addEventListener("input", run);
  f.addEventListener("submit", (e) => e.preventDefault());
  run();
})();
