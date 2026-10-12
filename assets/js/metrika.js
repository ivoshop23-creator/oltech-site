/* Яндекс Метрика + согласие на cookie.
   Номер счётчика — в METRIKA_ID. Пока он 0, Метрика не загружается и плашка не показывается.
   Метрика загружается только после нажатия «Принять» (152-ФЗ). */
(function () {
  "use strict";
  var METRIKA_ID = 0;
  var KEY = "oltech_cookie_consent"; // "yes" | "no"

  var read = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var save = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };

  var started = false;
  var start = function () {
    if (started || !METRIKA_ID) return;
    started = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      k = e.createElement(t); a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    window.ym(METRIKA_ID, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
    window.OLTECH_METRIKA_ID = METRIKA_ID;
  };

  var banner = null;
  var hide = function () { if (banner) { banner.classList.remove("on"); } };
  var show = function () {
    if (!METRIKA_ID) return;
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "cookie";
      banner.setAttribute("role", "dialog");
      banner.setAttribute("aria-label", "Согласие на cookie");
      banner.innerHTML =
        '<p>Сайт использует cookie и Яндекс Метрику, чтобы понимать, что посетителям удобно. ' +
        'Подробнее — в <a href="/privacy/">политике конфиденциальности</a>.</p>' +
        '<div class="cookie-btns"><button type="button" class="btn btn-main" data-c="yes">Принять</button>' +
        '<button type="button" class="btn btn-line" data-c="no">Отказаться</button></div>';
      banner.addEventListener("click", function (e) {
        var v = e.target && e.target.getAttribute("data-c");
        if (!v) return;
        save(v);
        hide();
        if (v === "yes") start();
        else if (started) location.reload(); // отзыв согласия: перезагружаем страницу без Метрики
      });
      document.body.appendChild(banner);
    }
    requestAnimationFrame(function () { banner.classList.add("on"); });
  };

  var init = function () {
    var c = read();
    if (c === "yes") start();
    else if (c !== "no") setTimeout(show, 1200);
    document.querySelectorAll("[data-cookie-settings]").forEach(function (b) {
      if (!METRIKA_ID) { b.hidden = true; var d = b.previousElementSibling; if (d && d.classList.contains("dot")) d.hidden = true; return; }
      b.addEventListener("click", show);
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
