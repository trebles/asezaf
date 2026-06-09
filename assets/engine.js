/* Agent Script, easy as Force — trainer engine.
   Reads:  window.__DECK_ID__  (set by pack.html)
           window.DECKS        (manifest, for the deck title)
           window.PACKS[id]     (the 25 cards)
   Renders into #app. Every card is type -> reveal -> rate A/B/C.
   A and B cards keep returning until rated C. */
(function () {
  var DECK_ID = window.__DECK_ID__;
  var cards = (window.PACKS || {})[DECK_ID];
  var meta = (window.DECKS || []).filter(function (d) { return d.id === DECK_ID; })[0] || {};
  var app = document.getElementById("app");

  if (!Array.isArray(cards) || !cards.length) {
    app.className = "trainer";
    app.innerHTML =
      '<a class="back" href="index.html">\u2190 All packs</a>' +
      '<div class="errbox"><h2>Deck not found</h2>' +
      '<p>This pack hasn\u2019t been added yet, or the link is off.</p>' +
      '<a class="btn" href="index.html">Back to all packs</a></div>';
    return;
  }

  var KEY = "asc_" + DECK_ID + "_v1";
  var FOCUS = 3;                 // max A/B cards in flight before a new one is introduced
  var OFFSET = { A: 2, B: 5 };   // turns until an A/B card resurfaces
  var TYPE_LABEL = { write: "Write", fix: "Fix", recall: "Recall", predict: "Predict", assemble: "Assemble" };

  var state = { step: 0, skills: {} };
  var current = null;

  /* ---------- persistence ---------- */
  function load() {
    try {
      var raw = window.ASCStore.get(KEY);
      if (raw) state = JSON.parse(raw);
    } catch (e) {}
    cards.forEach(function (c) {
      if (!state.skills[c.id]) state.skills[c.id] = { status: "new", dueAt: 0 };
    });
    if (typeof state.step !== "number") state.step = 0;
  }
  function save() { try { window.ASCStore.set(KEY, JSON.stringify(state)); } catch (e) {} }

  /* ---------- syntax highlight (display only) ---------- */
  function esc(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function hl(raw) {
    var re = /(#[^\n]*)|("(?:[^"\\]|\\.)*")|(@[A-Za-z_][\w.]*)|(->|\|)|(\bTrue\b|\bFalse\b)|(\b(?:mutable|string|boolean|number|integer|long|currency|object|date|datetime|time|list|id|if|else|run|with|set|None|topic|subagent|start_agent|reasoning|welcome|error|linked|available|when|transition|to|consult)\b)|(\b\d+(?:\.\d+)?\b)/g;
    var out = "", last = 0, m;
    while ((m = re.exec(raw))) {
      out += esc(raw.slice(last, m.index));
      var t = esc(m[0]);
      if (m[1]) out += '<span class="g">' + t + "</span>";
      else if (m[2]) out += '<span class="s">' + t + "</span>";
      else if (m[3]) out += '<span class="r">' + t + "</span>";
      else if (m[4]) out += '<span class="o">' + t + "</span>";
      else if (m[5]) out += '<span class="bo">' + t + "</span>";
      else if (m[6]) out += '<span class="k">' + t + "</span>";
      else if (m[7]) out += '<span class="bo">' + t + "</span>";
      last = re.lastIndex;
    }
    out += esc(raw.slice(last));
    return out;
  }

  /* ---------- scheduler ---------- */
  function pickNext() {
    var nonC = cards.filter(function (c) { return state.skills[c.id].status !== "C"; });
    if (!nonC.length) return null;
    var rated = nonC.filter(function (c) { var s = state.skills[c.id].status; return s === "A" || s === "B"; });
    var ord = { A: 0, B: 1 };
    var due = rated.filter(function (c) { return state.skills[c.id].dueAt <= state.step; })
      .sort(function (a, b) {
        return (state.skills[a.id].dueAt - state.skills[b.id].dueAt) ||
               (ord[state.skills[a.id].status] - ord[state.skills[b.id].status]);
      });
    if (due.length) return due[0];
    var fresh = cards.filter(function (c) { return state.skills[c.id].status === "new"; });
    if (rated.length < FOCUS && fresh.length) return fresh[0];
    if (rated.length) {
      var soon = Math.min.apply(null, rated.map(function (c) { return state.skills[c.id].dueAt; }));
      state.step = soon;
      return pickNext();
    }
    if (fresh.length) return fresh[0];
    return null;
  }

  function counts() {
    var c = 0, prog = 0;
    cards.forEach(function (card) {
      var s = state.skills[card.id].status;
      if (s === "C") c++; else if (s === "A" || s === "B") prog++;
    });
    return { c: c, prog: prog, total: cards.length };
  }

  function rate(grade) {
    var s = state.skills[current.id];
    if (grade === "C") s.status = "C";
    else { s.status = grade; s.dueAt = state.step + OFFSET[grade]; }
    state.step++;
    save();
    render();
  }

  /* ---------- render ---------- */
  function header() {
    var n = counts();
    return '<header>' +
      '<div><a class="back" href="index.html">\u2190 All packs</a>' +
      '<a class="mark" href="index.html"><span class="glyph"><span class="ar">-&gt;</span> <span class="pi">|</span></span>' +
      '<div>Agent Script, easy as Force<span class="deck-name">' + (meta.title || DECK_ID) + '</span></div></a></div>' +
      '<div class="tally"><b>' + n.c + '</b> / ' + n.total + ' mastered</div>' +
      '</header>' +
      '<div class="rail"><i style="width:' + (n.c / n.total * 100) + '%"></i></div>';
  }

  function render() {
    current = pickNext();
    app.className = "trainer";

    if (!current) {
      app.innerHTML = header() +
        '<div class="done fade"><div class="gl"><span class="ar">-&gt;</span> <span class="pi">|</span></div>' +
        '<p class="big">Deck mastered.</p>' +
        '<p>Every card in ' + (meta.title || "this deck") + ' is rated C. Pick another pack, or run this one again.</p>' +
        '<div class="row"><a class="btn" href="index.html">All packs</a>' +
        '<button class="btn" id="rs">Start this deck over</button></div></div>';
      document.getElementById("rs").onclick = reset;
      return;
    }

    var st = state.skills[current.id].status;
    function rung(g) { return '<span class="' + g + (st === g ? " on" : "") + '">' + g + "</span>"; }
    var n = counts();
    var notice = window.ASCStore.persistent ? "" :
      '<p class="note"><b>Heads up:</b> storage is off in this view, so progress won\u2019t be saved.</p>';

    app.innerHTML = header() +
      '<div class="card fade">' +
        '<div class="top"><div class="tier"><span class="dot"></span>' + current.tier + '</div>' +
        '<div class="ladder">' + rung("A") + rung("B") + rung("C") + '</div></div>' +
        '<div class="body">' +
          '<h2 class="skill">' + current.skill + '</h2>' +
          '<p class="lesson">' + current.lesson + '</p>' +
          '<div class="task"><div class="lbl">' + (TYPE_LABEL[current.type] || "Practice") + '</div><p>' + current.task + '</p></div>' +
          '<textarea id="scratch" placeholder="Type your answer, then reveal to self-check\u2026" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea>' +
          '<button class="btn reveal" id="rev">Reveal answer</button>' +
          '<div class="answer hide" id="ans">' +
            '<div class="ans-lbl">Answer</div>' +
            '<pre>' + hl(current.answer) + '</pre>' +
            '<p class="why"><b>Why:</b> ' + current.why + '</p>' +
            '<div class="rate"><div class="lbl">How did that go?</div><div class="row">' +
              '<div class="grade A" data-g="A"><div class="g">A</div><div class="t">Still learning</div><span class="k">1</span></div>' +
              '<div class="grade B" data-g="B"><div class="g">B</div><div class="t">Needs practice</div><span class="k">2</span></div>' +
              '<div class="grade C" data-g="C"><div class="g">C</div><div class="t">Got it</div><span class="k">3</span></div>' +
            '</div></div>' +
          '</div>' +
          notice +
          '<div class="foot"><span>' + n.prog + ' card' + (n.prog === 1 ? "" : "s") + ' in rotation</span>' +
          '<button class="link" id="reset">Reset this deck</button></div>' +
        '</div>' +
      '</div>';

    var revealed = false;
    function doReveal() {
      if (revealed) return;
      revealed = true;
      document.getElementById("ans").classList.remove("hide");
      document.getElementById("rev").classList.add("hide");
    }
    document.getElementById("rev").onclick = doReveal;
    document.getElementById("reset").onclick = reset;
    [].forEach.call(app.querySelectorAll(".grade"), function (b) {
      b.onclick = function () { rate(b.getAttribute("data-g")); };
    });

    var ta = document.getElementById("scratch");
    ta.focus();
    app.onkeydown = function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { doReveal(); e.preventDefault(); return; }
      if (revealed && document.activeElement !== ta) {
        if (e.key === "1") rate("A");
        else if (e.key === "2") rate("B");
        else if (e.key === "3") rate("C");
      }
    };
  }

  function reset() {
    state = { step: 0, skills: {} };
    cards.forEach(function (c) { state.skills[c.id] = { status: "new", dueAt: 0 }; });
    save();
    render();
  }

  load();
  render();
})();
