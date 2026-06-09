/* Hub logic. Reads the manifest (window.DECKS), loads each deck's data file
   to get its card count + progress, and renders the tiles. Add a deck by
   adding its data file and a manifest line — this picks it up automatically. */
(function () {
  var DECKS = window.DECKS || [];
  var grid = document.getElementById("grid");
  var overall = document.getElementById("overall");

  function loadScript(src) {
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = function () { resolve(true); };
      s.onerror = function () { resolve(false); };
      document.head.appendChild(s);
    });
  }

  function masteredCount(id) {
    try {
      var raw = window.ASCStore.get("asc_" + id + "_v1");
      if (!raw) return 0;
      var skills = (JSON.parse(raw) || {}).skills || {};
      var n = 0;
      for (var k in skills) if (skills[k] && skills[k].status === "C") n++;
      return n;
    } catch (e) { return 0; }
  }

  Promise.all(DECKS.map(function (d) { return loadScript("data/" + d.id + ".js"); }))
    .then(function () {
      var packs = window.PACKS || {};
      var totalCards = 0, totalMastered = 0, html = "";

      DECKS.forEach(function (d) {
        var deck = packs[d.id];
        var total = Array.isArray(deck) ? deck.length : 0;
        var done = total ? masteredCount(d.id) : 0;
        totalCards += total; totalMastered += done;
        var pct = total ? Math.round(done / total * 100) : 0;
        var complete = total && done === total;
        var go = !total ? "Soon" : done === 0 ? "Start \u2192" : complete ? "Review \u2192" : "Continue \u2192";
        var ringInner = total ? ('<b>' + done + '</b>/' + total) : "\u2014";

        html +=
          '<a class="deck-tile" href="pack.html#' + encodeURIComponent(d.id) + '">' +
            '<span class="ord">' + (d.n < 10 ? "0" + d.n : d.n) + '</span>' +
            '<div class="ring' + (complete ? " done" : "") + '" style="--p:' + pct + '">' +
              '<span class="inner">' + ringInner + '</span></div>' +
            '<div class="meta"><p class="t">' + d.title + '</p><p class="s">' + d.subtitle + '</p></div>' +
            '<span class="go">' + go + '</span>' +
          '</a>';
      });

      grid.innerHTML = html;
      overall.innerHTML = '<b>' + totalMastered + '</b> / ' + totalCards + ' cards mastered across all packs';
      if (!window.ASCStore.persistent) {
        overall.innerHTML += ' \u00b7 <span style="color:var(--b)">progress won\u2019t be saved in this view</span>';
      }
    });
})();
