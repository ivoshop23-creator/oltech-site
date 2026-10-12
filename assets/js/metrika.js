/* Яндекс Метрика. Номер счётчика — в METRIKA_ID. Пока он 0, счётчик выключен. */
(function () {
  "use strict";
  var METRIKA_ID = 0;
  if (!METRIKA_ID) return;
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = 1 * new Date();
    for (var j = 0; j < e.scripts.length; j++) { if (e.scripts[j].src === r) return; }
    k = e.createElement(t); a = e.getElementsByTagName(t)[0];
    k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  window.ym(METRIKA_ID, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
  window.OLTECH_METRIKA_ID = METRIKA_ID;
})();
