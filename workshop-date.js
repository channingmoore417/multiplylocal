/* Weekly workshop schedule — the ONLY place to change the day/time.
   Workshop runs every Tuesday at 2:00 PM Central. The page always shows the next
   upcoming session and rolls to the following week the moment one starts.
   To change the day: set DOW (0=Sun … 6=Sat). To change the time: HOUR / MIN (Central). */
(function () {
  var TZ = 'America/Chicago', DOW = 2, HOUR = 14, MIN = 0, LENGTH_MIN = 60;
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function parts(ts) {
    var o = {};
    new Intl.DateTimeFormat('en-US', { timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
      .formatToParts(new Date(ts)).forEach(function (p) { o[p.type] = +p.value; });
    return o;
  }
  function offset(ts) { var p = parts(ts); return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(ts / 1000) * 1000; }
  // Central wall-clock time -> real instant (handles daylight saving)
  function toUtc(y, m, d, h, mi) { var g = Date.UTC(y, m, d, h, mi); var t = g - offset(g); return g - offset(t); }
  function z(ts) { return new Date(ts).toISOString().replace(/[-:]|\.\d{3}/g, ''); }

  function compute(now) {
    var c = parts(now);
    for (var i = 0; i <= 7; i++) {
      var dt = new Date(Date.UTC(c.year, c.month - 1, c.day + i));
      if (dt.getUTCDay() !== DOW) continue;
      var y = dt.getUTCFullYear(), m = dt.getUTCMonth(), d = dt.getUTCDate();
      var start = toUtc(y, m, d, HOUR, MIN);
      if (start > now) {
        return {
          start: start, end: start + LENGTH_MIN * 60000,
          startZ: z(start), endZ: z(start + LENGTH_MIN * 60000),
          startISO: new Date(start).toISOString(), endISO: new Date(start + LENGTH_MIN * 60000).toISOString(),
          day: DAYS[DOW], short: MONTHS[m] + ' ' + d,
          full: DAYS[DOW] + ', ' + MONTHS[m] + ' ' + d + ', ' + y,
          dayShort: DAYS[DOW] + ', ' + MONTHS[m] + ' ' + d,
          ymd: y + String(m + 1).padStart(2, '0') + String(d).padStart(2, '0')
        };
      }
    }
  }

  var W = compute(Date.now());
  W.refresh = function () { if (Date.now() >= W.start) { var n = compute(Date.now()); for (var k in n) W[k] = n[k]; W.render(); return true; } return false; };
  W.render = function () {
    document.querySelectorAll('[data-ws]').forEach(function (el) { el.textContent = W[el.getAttribute('data-ws')]; });
    var md = document.querySelector('meta[name="description"]');
    if (md) md.content = md.content.replace(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)?,? ?(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}/, W.dayShort);
    document.dispatchEvent(new CustomEvent('workshop-date', { detail: W }));
  };
  window.WORKSHOP = W;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', W.render); else W.render();
})();
