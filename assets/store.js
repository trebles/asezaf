/* Tiny storage layer shared by the hub and the trainer.
   Prefers localStorage; falls back to in-memory if it's unavailable
   (private browsing, or a sandboxed preview). One codebase, persists
   wherever it can. */
window.ASCStore = (function () {
  var mem = {}, ok = false;
  try {
    var k = "__asc_test__";
    localStorage.setItem(k, "1");
    localStorage.removeItem(k);
    ok = true;
  } catch (e) { ok = false; }
  return {
    persistent: ok,
    get: function (key) {
      try { return ok ? localStorage.getItem(key) : (key in mem ? mem[key] : null); }
      catch (e) { return key in mem ? mem[key] : null; }
    },
    set: function (key, val) {
      try { if (ok) localStorage.setItem(key, val); else mem[key] = val; }
      catch (e) { mem[key] = val; }
    },
    del: function (key) {
      try { if (ok) localStorage.removeItem(key); else delete mem[key]; }
      catch (e) { delete mem[key]; }
    }
  };
})();
