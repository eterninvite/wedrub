(function () {
  "use strict";

  var CFG = window.InvitationConfig || {};
  var venuePlace =
    CFG.venue.address && CFG.venue.address !== CFG.venue.name
      ? CFG.venue.name + ", " + CFG.venue.address
      : CFG.venue.name;
  var EVENT = {
    start: CFG.event.start,
    end: CFG.event.end,
    title: CFG.event.title,
    place: venuePlace,
    map: CFG.venue.mapQuery || CFG.venue.address || CFG.venue.name,
    namesAt: CFG.event.namesAt || 2.2,
  };

  function $(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    var el = $(id);
    if (el && value != null) el.textContent = value;
  }

  function setHtml(id, value) {
    var el = $(id);
    if (el && value != null) el.innerHTML = value;
  }

  function showSection(id, on) {
    var el = $(id);
    if (!el) return;
    el.hidden = !on;
  }

  function applyConfig() {
    var couple = CFG.couple || {};
    var names = (couple.bride || "") + " & " + (couple.groom || "");
    var title = CFG.event.title || names;
    document.title = title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", title);
    document.querySelectorAll('meta[property="og:title"], meta[property="og:description"]').forEach(function (m) {
      m.setAttribute("content", title);
    });

    setText("introFor", CFG.intro.forText);
    setText("introMono", couple.initials);
    setText("introBlow", CFG.intro.tapText || CFG.intro.blowText);
    setText("introOr", CFG.intro.orText);
    setText("heroFor", CFG.intro.together);
    setText("heroBride", couple.bride);
    setText("heroGroom", couple.groom);
    setText("heroInv", CFG.intro.inviteLine);
    setText("heroDate", CFG.event.dateShort);
    setText("heroPlace", venuePlace);
    setText("dear", CFG.letter.greeting);
    setText("letterMsg", CFG.letter.message);
    setText("letterSig", names);
    setText("calHeading", CFG.calendar.heading);
    setText("calSub", CFG.calendar.subtitle);
    setText("deskHead", couple.initials);
    setText("calLong", CFG.event.dateLong);
    setText("calNote", CFG.event.dateNote);
    setText("calAdd", CFG.calendar.addLabel);
    setText("progHeading", CFG.programme.heading);
    setText("progSub", CFG.programme.subtitle);
    setText("venueName", CFG.venue.name);
    if ($("venueAddr")) {
      var showAddr = CFG.venue.address && CFG.venue.address !== CFG.venue.name;
      $("venueAddr").hidden = !showAddr;
      if (showAddr) $("venueAddr").textContent = CFG.venue.address;
    }
    setText("route", CFG.venue.directionsLabel);
    setText("dressHeading", CFG.dress.heading);
    setText("dressDetail", CFG.dress.detail);
    setText("wishHeading", CFG.wishes.heading);
    setText("faqHeading", CFG.faq.heading);
    setText("closeHeading", CFG.closing.heading);
    setText("loveLead", CFG.closing.love);
    setHtml("loveNames", couple.bride + "<em>&amp;</em>" + couple.groom);
    setText("rsvpHeading", CFG.rsvp.heading);
    setText("rsvpDemoNote", CFG.rsvp.demoNote);
    setText("tkDate", CFG.event.dateLong);
    setText("tkPlace", CFG.venue.name);
    if ($("made") && CFG.credit) {
      $("made").innerHTML = CFG.credit.prefix + '<a href="' + CFG.credit.href + '" id="madeLink">' + CFG.credit.label + "</a>";
    }

    ["introBlur", "introStill"].forEach(function (id) {
      var el = $(id);
      if (el) el.src = CFG.intro.firstFrame;
    });
    var last = $("introLast");
    if (last) last.src = CFG.intro.lastFrame;
    var film = $("film");
    if (film) film.setAttribute("poster", CFG.intro.firstFrame);
    var vImg = $("venueImg");
    if (vImg) {
      vImg.src = CFG.venue.image;
      vImg.alt = CFG.venue.imageAlt || "";
    }

    var intro = $("intro");
    intro.setAttribute(
      "aria-label",
      "Un perete de sclipici roșu. Atinge ecranul de 3 ori pentru a deschide invitația de la " + names
    );

    var list = $("progList");
    list.innerHTML = (CFG.programme.items || [])
      .map(function (item) {
        return (
          "<li><time>" +
          item.time +
          "</time><div class=\"eve__tx\"><b>" +
          item.title +
          "</b><span>" +
          item.detail +
          "</span></div></li>"
        );
      })
      .join("");

    var how = $("venueHow");
    how.innerHTML = (CFG.venue.how || [])
      .map(function (row) {
        return "<div><b>" + row.title + "</b><p>" + row.text + "</p></div>";
      })
      .join("");
    how.hidden = !CFG.sections.venueHow;

    var fab = $("fabGrid");
    fab.innerHTML = (CFG.dress.fabrics || [])
      .map(function (f) {
        return (
          "<figure><img src=\"" +
          f.src +
          "\" alt=\"" +
          f.alt +
          "\" loading=\"lazy\"><figcaption>" +
          f.caption +
          "</figcaption></figure>"
        );
      })
      .join("");
    fab.hidden = !CFG.dress.showFabrics;

    var pal = $("sw");
    pal.innerHTML = (CFG.dress.palette || [])
      .map(function (p) {
        return (
          "<li><button type=\"button\" style=\"--c:" +
          p.color +
          "\" aria-pressed=\"false\" data-n=\"" +
          p.name +
          "\" aria-label=\"" +
          p.name +
          "\"></button><span>" +
          p.name +
          "</span></li>"
        );
      })
      .join("");
    pal.hidden = !CFG.dress.showPalette;

    $("wishList").innerHTML = (CFG.wishes.items || [])
      .map(function (w) {
        return (
          "<article class=\"wcard rv\"><h3>" +
          w.title +
          "</h3><p dir=\"auto\">" +
          w.text +
          "</p></article>"
        );
      })
      .join("");

    $("faqList").innerHTML = (CFG.faq.items || [])
      .map(function (item) {
        return "<details><summary>" + item.q + "</summary><p>" + item.a + "</p></details>";
      })
      .join("");

    var parts = $("rsvpParts");
    parts.innerHTML =
      "<legend>La ce momente vei participa?</legend><div class=\"choice\">" +
      (CFG.programme.items || [])
        .map(function (item) {
          return (
            "<label><input type=\"checkbox\" name=\"parts\" value=\"" +
            item.title +
            "\"><span> " +
            item.title +
            "</span></label>"
          );
        })
        .join("") +
      "</div>";

    showSection("letter", CFG.sections.letter !== false);
    showSection("date", CFG.sections.calendar !== false);
    showSection("programme", CFG.sections.programme !== false);
    showSection("venue", CFG.sections.venue !== false);
    showSection("dress", CFG.sections.dress !== false);
    showSection("wishes", CFG.sections.wishes !== false);
    showSection("rsvp", !!(CFG.rsvp.enabled && CFG.sections.rsvp));
    showSection("faq", CFG.sections.faq !== false);
    showSection("closing", CFG.sections.closing !== false);
    showSection("dock", !!(CFG.rsvp.enabled && CFG.sections.dock));
  }

  applyConfig();

  (function initFullscreen() {
    var isMobile =
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) ||
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    if (!isMobile) return;

    var requested = false;
    function enterFullscreen() {
      if (requested) return;
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        requested = true;
        return;
      }
      var el = document.documentElement;
      var fn = el.requestFullscreen || el.webkitRequestFullscreen;
      if (!fn) return;
      try {
        var res = el.requestFullscreen
          ? el.requestFullscreen({ navigationUI: "hide" })
          : el.webkitRequestFullscreen();
        if (res && res.then) {
          res
            .then(function () {
              requested = true;
            })
            .catch(function () {});
        } else {
          requested = true;
        }
      } catch (e) {}
    }

    ["touchend", "click"].forEach(function (ev) {
      document.addEventListener(ev, enterFullscreen, { capture: true, passive: true });
    });
  })();

  (function initMusic() {
    var musicCfg = CFG.music || {};
    var audio = $("bgMusic");
    var btn = $("musicBtn");
    if (!audio || !btn) return;
    if (musicCfg.enabled === false) {
      btn.hidden = true;
      return;
    }
    if (musicCfg.src) audio.src = musicCfg.src;
    audio.loop = true;
    audio.volume = musicCfg.volume != null ? musicCfg.volume : 0.5;
    btn.classList.add("is-visible");

    var retryEvents = ["pointerdown", "touchstart", "click", "keydown"];
    function cleanupRetry() {
      retryEvents.forEach(function (ev) {
        document.removeEventListener(ev, tryPlay, true);
      });
    }
    function tryPlay() {
      var play = audio.play();
      if (play && play.then) {
        play.then(cleanupRetry).catch(function () {
          retryEvents.forEach(function (ev) {
            document.addEventListener(ev, tryPlay, { capture: true, passive: true, once: true });
          });
        });
      }
    }
    tryPlay();

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (audio.paused) {
        audio.muted = false;
        tryPlay();
      } else {
        audio.muted = !audio.muted;
      }
      btn.classList.toggle("is-muted", audio.muted || audio.paused);
      btn.setAttribute("aria-label", audio.muted || audio.paused ? "Activează muzica" : "Dezactivează muzica");
    });

    var awayPaused = false;
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (!audio.paused && !audio.muted) {
          awayPaused = true;
          audio.pause();
        }
      } else if (awayPaused) {
        awayPaused = false;
        tryPlay();
      }
    });
  })();

  (function () {
    var H = document.documentElement;
    var q = new URLSearchParams(location.search);
    var still = matchMedia("(prefers-reduced-motion:reduce)").matches;
    var clamp = function (v) {
      return Math.max(0, Math.min(1, v));
    };
    function buzz(ms) {
      try {
        navigator.vibrate && navigator.vibrate(ms);
      } catch (e) {}
    }

    var guest = (q.get("g") || "").trim().slice(0, 60);
    if (guest) {
      $("introFor").textContent = guest + ", invitația ta se ascunde sub sclipici";
      $("heroFor").textContent = "Dragă " + guest + ",";
      $("dear").textContent = "Dragă " + guest;
      $("gName").value = guest;
    }

    var intro = $("intro");
    var film = $("film");
    var meter = $("meter");
    var cv = $("anim");
    var opened = false;
    var named = false;
    var taps = 0;
    var TAPS_NEEDED = 3;
    var vidReady = false;
    var mode = "";
    var autoOK = null;
    var VID = CFG.intro.video;
    var DECODE_JSON = CFG.intro.decodeJson;

    film.muted = true;
    film.defaultMuted = true;
    film.setAttribute("muted", "");
    film.src = VID;
    try {
      film.load();
    } catch (e) {}
    film.addEventListener("canplaythrough", function () {
      if (!vidReady) vidReady = true;
    });
    try {
      var wp = film.play();
      if (wp && wp.then)
        wp.then(
          function () {
            autoOK = true;
            if (!opened) {
              film.pause();
              try {
                film.currentTime = 0;
              } catch (e) {}
            }
            vidReady = true;
          },
          function (e) {
            if (e && e.name === "NotAllowedError") {
              autoOK = false;
              prepDecode();
              vidReady = true;
            }
          }
        );
    } catch (e) {}

    var DEC = null;
    function prepDecode() {
      if (DEC || !window.VideoDecoder || !window.fetch) return DEC;
      DEC = Promise.all([
        fetch(VID).then(function (r) {
          return r.arrayBuffer();
        }),
        fetch(DECODE_JSON).then(function (r) {
          return r.json();
        }),
      ]).then(function (x) {
        var m = x[1];
        var d = atob(m.desc);
        var desc = new Uint8Array(d.length);
        for (var i = 0; i < d.length; i++) desc[i] = d.charCodeAt(i);
        var cfg = { codec: m.codec, codedWidth: m.w, codedHeight: m.h, description: desc };
        return VideoDecoder.isConfigSupported(cfg).then(function (r) {
          if (!r.supported) throw 0;
          return { buf: new Uint8Array(x[0]), m: m, cfg: cfg };
        });
      });
      DEC.catch(function () {});
      return DEC;
    }

    function playDecoded() {
      if (mode === "dec" || named) return;
      mode = "dec";
      try {
        film.pause();
      } catch (e) {}
      var p = prepDecode();
      if (!p) {
        stillEnd();
        return;
      }
      p.then(
        function (D) {
          if (named) return;
          var r = cv.getBoundingClientRect();
          var dpr = Math.min(2, devicePixelRatio || 1);
          var W = (cv.width = Math.round(r.width * dpr));
          var Hc = (cv.height = Math.round(r.height * dpr));
          var g = cv.getContext("2d");
          var sc = Math.max(W / D.m.w, Hc / D.m.h);
          var dw = D.m.w * sc;
          var dh = D.m.h * sc;
          var dx = (W - dw) / 2;
          var dy = (Hc - dh) / 2;
          var F = D.m.f;
          var q = [];
          var i = 0;
          var t0 = 0;
          var last = F[F.length - 1][2];
          var done = false;
          var dec = new VideoDecoder({
            output: function (fr) {
              q.push(fr);
            },
            error: function () {
              if (!done) {
                done = true;
                stillEnd();
              }
            },
          });
          dec.configure(D.cfg);
          function feed() {
            while (i < F.length && q.length + dec.decodeQueueSize < 12) {
              var f = F[i++];
              dec.decode(
                new EncodedVideoChunk({
                  type: f[3] ? "key" : "delta",
                  timestamp: f[2],
                  data: D.buf.subarray(f[0], f[0] + f[1]),
                })
              );
            }
            if (i >= F.length) dec.flush().catch(function () {});
          }
          feed();
          (function step(now) {
            if (done) return;
            if (!t0 && q.length) {
              t0 = now;
              intro.classList.add("is-seq", "is-playing");
            }
            if (t0) {
              var t = (now - t0) * 1000;
              var fr = null;
              while (q.length && q[0].timestamp <= t) {
                if (fr) fr.close();
                fr = q.shift();
              }
              if (fr) {
                g.drawImage(fr, dx, dy, dw, dh);
                fr.close();
              }
              if (t >= EVENT.namesAt * 1e6) showNames();
              if (t > last + 40000 && i >= F.length && !q.length) {
                done = true;
                intro.classList.add("is-still");
                showNames();
                try {
                  dec.close();
                } catch (e) {}
                return;
              }
            }
            feed();
            requestAnimationFrame(step);
          })(performance.now());
        },
        function () {
          stillEnd();
        }
      );
      setTimeout(function () {
        if (!named && !intro.classList.contains("is-seq")) stillEnd();
      }, 9000);
    }

    function setProgress(v) {
      if (meter) meter.style.setProperty("--blow", v.toFixed(3));
    }

    function open(byTap) {
      if (opened) return;
      opened = true;
      buzz([20, 30, 40]);
      setProgress(1);
      intro.classList.add("is-go");
      intro.removeAttribute("role");
      intro.removeAttribute("tabindex");
      intro.setAttribute("aria-label", (CFG.couple.bride || "") + " & " + (CFG.couple.groom || ""));
      if (!byTap && autoOK === false) {
        playDecoded();
        return;
      }
      mode = "video";
      try {
        film.currentTime = 0;
      } catch (e) {}
      var fail = function () {
        if (byTap) stillEnd();
        else playDecoded();
      };
      try {
        var p = film.play();
        if (p && p.then) p.then(function () {}, fail);
      } catch (e) {
        fail();
      }
      setTimeout(function () {
        if (mode === "video" && !named && film.currentTime < 0.05) {
          if (byTap) return;
          try {
            film.pause();
          } catch (e) {}
          playDecoded();
        }
      }, 4000);
      setTimeout(function () {
        if (mode === "video" && !named && film.currentTime < 0.3) stillEnd();
      }, 10000);
    }

    function stillEnd() {
      if (named) return;
      try {
        film.pause();
      } catch (e) {}
      intro.classList.add("is-still", "is-playing");
      showNames();
    }

    function showNames() {
      if (named) return;
      named = true;
      intro.classList.add("is-names");
      H.classList.remove("is-intro");
      dockSync();
    }

    film.addEventListener("playing", function () {
      if (mode === "video") intro.classList.add("is-playing");
    });
    film.addEventListener("timeupdate", function () {
      if (mode === "video" && film.currentTime >= EVENT.namesAt) showNames();
    });
    film.addEventListener("ended", function () {
      if (mode === "video") showNames();
    });
    film.addEventListener("error", function () {
      if (!vidReady) vidReady = true;
      if (opened && mode === "video") playDecoded();
    });

    function registerTap() {
      if (opened) return;
      taps += 1;
      setProgress(taps / TAPS_NEEDED);
      var left = TAPS_NEEDED - taps;
      if (left > 0) {
        buzz(15);
        setText("introOr", left === 1 ? "încă o atingere" : "încă " + left + " atingeri");
        return;
      }
      open(true);
    }

    intro.addEventListener("click", function () {
      registerTap();
    });
    intro.addEventListener("keydown", function (e) {
      if (!opened && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        registerTap();
      }
    });

    var rv = [].slice.call(document.querySelectorAll(".rv"));
    if (still || !("IntersectionObserver" in window)) {
      rv.forEach(function (el) {
        el.classList.add("is-in");
      });
    } else {
      var rio = new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              rio.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      rv.forEach(function (el) {
        rio.observe(el);
      });
    }

    var venueArch = $("venueArch");
    if (venueArch) {
      if (still || !("IntersectionObserver" in window)) venueArch.classList.add("is-in");
      else
        new IntersectionObserver(
          function (es, o) {
            if (es[0].isIntersecting) {
              venueArch.classList.add("is-in");
              o.disconnect();
            }
          },
          { threshold: 0.35 }
        ).observe(venueArch);
    }

    var env = $("env");
    var note = $("note");
    var risen = false;
    function envLayout() {
      var eh = env.offsetHeight;
      var nh = note.offsetHeight;
      var top = eh * 0.12;
      var lift = Math.max(0, top + nh - eh * 0.56);
      env.style.marginTop = Math.max(0, lift - top + 40) + "px";
      note.style.setProperty("--rise", (risen ? -lift : 0) + "px");
      if (!risen) note.style.setProperty("--cut", Math.max(0, top + nh - eh + 16) + "px");
    }
    function rise() {
      if (risen) return;
      risen = true;
      envLayout();
      var t0 = performance.now();
      (function loop(n) {
        var er = env.getBoundingClientRect();
        var nr = note.getBoundingClientRect();
        note.style.setProperty("--cut", Math.max(0, nr.bottom - er.bottom + 16) + "px");
        if (n - t0 < 2800) requestAnimationFrame(loop);
      })(t0);
    }
    envLayout();
    addEventListener("resize", envLayout);
    if (document.fonts) document.fonts.ready.then(envLayout);
    if (still || !("IntersectionObserver" in window)) rise();
    else
      new IntersectionObserver(
        function (es, o) {
          if (es[0].isIntersecting) {
            rise();
            o.disconnect();
          }
        },
        { threshold: 0.6 }
      ).observe(env);

    var MONTHS = [
      "Ianuarie",
      "Februarie",
      "Martie",
      "Aprilie",
      "Mai",
      "Iunie",
      "Iulie",
      "August",
      "Septembrie",
      "Octombrie",
      "Noiembrie",
      "Decembrie",
    ];
    var W0 = new Date(EVENT.start);
    var wy = W0.getFullYear();
    var wm = W0.getMonth();
    var wd = W0.getDate();
    var list = [];
    for (var k = 4; k >= 0; k--) {
      var dd = new Date(wy, wm - k, 1);
      list.push([dd.getFullYear(), dd.getMonth()]);
    }
    function grid(y, m) {
      var h = "<b>L</b><b>M</b><b>M</b><b>J</b><b>V</b><b>S</b><b>D</b>";
      var lead = (new Date(y, m, 1).getDay() + 6) % 7;
      var n = new Date(y, m + 1, 0).getDate();
      for (var i = 0; i < lead; i++) h += "<span></span>";
      for (var d = 1; d <= n; d++) {
        var wkd = (lead + d - 1) % 7;
        var me = y === wy && m === wm && d === wd;
        h +=
          "<span class=\"" +
          (me ? "day" : wkd > 4 ? "is-we" : "") +
          "\">" +
          d +
          (me
            ? '<svg class="ring" viewBox="0 0 100 80"><path pathLength="1" d="M60 10C38 4 12 14 10 38s22 36 46 34 38-16 34-36S66 2 40 12"/></svg>'
            : "") +
          "</span>";
      }
      return h;
    }
    var pagesEl = $("pages");
    var N = list.length;
    pagesEl.innerHTML = list
      .map(function (it, i) {
        return (
          '<div class="pg" style="z-index:' +
          (50 - i) +
          '"><div class="pg__f"><p class="pg__m">' +
          MONTHS[it[1]] +
          '</p><p class="pg__y">' +
          it[0] +
          '</p><div class="pg__g">' +
          grid(it[0], it[1]) +
          "</div></div><div class=\"pg__b\"></div></div>"
        );
      })
      .join("");
    var pgs = [].slice.call(pagesEl.children);
    var dsec = $("date");
    var dstage = $("dstage");
    var desk = $("desk");
    var landed = false;
    dsec.style.setProperty("--n", N - 1);
    function ease(x) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }
    function calTick() {
      var r = dsec.getBoundingClientRect();
      var span = r.height - innerHeight;
      var p = still ? 1 : clamp(-r.top / Math.max(1, span));
      var flips = N - 1;
      var f = clamp(p / 0.8) * flips;
      pgs.forEach(function (pg, i) {
        if (i >= flips) return;
        var l = ease(clamp(f - i));
        pg.style.setProperty("--a", (-l * 178).toFixed(2));
        pg.style.setProperty("--o", l > 0.42 ? Math.max(0, 1 - (l - 0.42) / 0.2).toFixed(3) : 1);
        pg.style.visibility = l > 0.62 ? "hidden" : "";
        var nx = pgs[i + 1];
        if (nx) nx.firstChild.style.setProperty("--sh", (Math.sin(l * Math.PI) * 0.3).toFixed(3));
      });
      var L = p > 0.84;
      if (L !== landed) {
        landed = L;
        desk.classList.toggle("is-landed", L);
        dstage.classList.toggle("is-landed", L);
        if (L) buzz(20);
      }
    }
    addEventListener(
      "scroll",
      function () {
        requestAnimationFrame(calTick);
      },
      { passive: true }
    );
    addEventListener("resize", calTick);
    calTick();

    var eve = $("eve");
    var lis = [].slice.call(eve.querySelectorAll("li"));
    var plSm = 0;
    var plT = 0;
    var plRaf = 0;
    function eveDraw() {
      plSm += (plT - plSm) * 0.1;
      if (Math.abs(plT - plSm) < 0.001) plSm = plT;
      eve.style.setProperty("--pl", plSm.toFixed(4));
      lis.forEach(function (li, k) {
        li.classList.toggle("is-lit", plSm >= (k + 0.2) / lis.length - 0.05);
      });
      plRaf = plSm !== plT ? requestAnimationFrame(eveDraw) : 0;
    }
    function eveTick() {
      if (still) plT = 1;
      else {
        var r = eve.getBoundingClientRect();
        plT = clamp((innerHeight * 0.65 - r.top) / r.height);
      }
      if (!plRaf) plRaf = requestAnimationFrame(eveDraw);
    }
    addEventListener("scroll", eveTick, { passive: true });
    eveTick();

    var swName = $("swName");
    var swBase = swName.textContent;
    $("sw").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var on = b.getAttribute("aria-pressed") !== "true";
      this.querySelectorAll("button").forEach(function (x) {
        x.setAttribute("aria-pressed", "false");
      });
      b.setAttribute("aria-pressed", on ? "true" : "false");
      swName.textContent = on ? b.dataset.n + " este una dintre culorile noastre" : swBase;
      buzz(10);
    });

    var mq = encodeURIComponent(EVENT.map || EVENT.place);
    var mapEl = $("map");
    mapEl.addEventListener("load", function () {
      if (mapEl.src.indexOf("google") > -1) mapEl.classList.add("is-ready");
    });
    function loadMap() {
      if (mapEl.dataset.on) return;
      mapEl.dataset.on = 1;
      mapEl.src = "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s" + mq + "!6i13";
    }
    if ("IntersectionObserver" in window)
      new IntersectionObserver(
        function (es, o) {
          if (es[0].isIntersecting) {
            loadMap();
            o.disconnect();
          }
        },
        { rootMargin: "1200px 0px" }
      ).observe(mapEl);
    else loadMap();
    $("route").href = "https://www.google.com/maps/dir/?api=1&destination=" + mq;
    var isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
    var gd = function (d) {
      return d.replace(/[-:]/g, "").slice(0, 15);
    };
    var gUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
      encodeURIComponent(EVENT.title) +
      "&dates=" +
      gd(EVENT.start) +
      "/" +
      gd(EVENT.end) +
      "&location=" +
      encodeURIComponent(EVENT.place) +
      "&details=" +
      encodeURIComponent("Invitația noastră de nuntă: " + location.href.split(/[?#]/)[0]);
    $("calAdd").addEventListener("click", function () {
      if (isApple) window.downloadInviteCalendar(EVENT);
      else window.open(gUrl, "_blank", "noopener");
    });

    var tEv = new Date(EVENT.start).getTime();
    var cells = {};
    document.querySelectorAll("[data-cd]").forEach(function (b) {
      cells[b.dataset.cd] = b;
    });
    function cdTick() {
      var s = Math.max(0, Math.floor((tEv - Date.now()) / 1000));
      cells.d.textContent = Math.floor(s / 86400);
      cells.h.textContent = Math.floor((s % 86400) / 3600);
      cells.m.textContent = Math.floor((s % 3600) / 60);
    }
    cdTick();
    setInterval(cdTick, 15000);

    var box = $("rsvpBox");
    var form = $("form");
    function field(id, bad) {
      $(id + "Err").hidden = !bad;
    }
    form.addEventListener("change", function (e) {
      if (e.target.name === "come") {
        box.dataset.come = e.target.value;
        field("come", false);
      }
    });
    form.name.addEventListener("input", function () {
      if (form.name.value.trim()) {
        field("gName", false);
        form.name.setAttribute("aria-invalid", "false");
      }
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var come = (form.querySelector("[name=come]:checked") || {}).value;
      form.name.setAttribute("aria-invalid", name ? "false" : "true");
      field("gName", !name);
      field("come", !come);
      if (!name) {
        form.name.focus();
        return;
      }
      if (!come) {
        form.querySelector("[name=come]").focus();
        return;
      }
      var data = { name: name, come: come, at: new Date().toISOString() };
      new FormData(form).forEach(function (v, k) {
        if (k === "name" || k === "come" || !v) return;
        data[k] = data[k] ? [].concat(data[k], v) : v;
      });
      try {
        localStorage.setItem("invitation:rsvp", JSON.stringify(data));
      } catch (err) {}
      box.querySelector(".t").textContent =
        come === "yes" ? "Ne vedem acolo" : come === "no" ? "Ne va fi dor de tine" : "Te așteptăm cu răspunsul";
      $("doneP").textContent =
        come === "no"
          ? "Îți mulțumim că ne-ai anunțat."
          : "Răspunsul tău a fost salvat pe acest dispozitiv.";
      var tk = $("ticket");
      var yes = come === "yes";
      tk.hidden = !yes;
      if (yes) {
        $("tkName").textContent = name;
        $("tkPlus").textContent = data.plus ? "împreună cu " + data.plus : "";
        buzz([20, 40, 20]);
      }
      box.classList.add("is-sent");
      dockSync();
      $("done").focus();
    });
    $("again").addEventListener("click", function () {
      box.classList.remove("is-sent");
      box.querySelector(".t").textContent = CFG.rsvp.heading;
      dockSync();
      form.name.focus();
    });

    var dock = $("dock");
    var rsvp = $("rsvp");
    var rsvpVis = false;
    function dockSync() {
      if (!CFG.rsvp.enabled || !CFG.sections.dock) {
        dock.classList.remove("is-on");
        return;
      }
      var past = intro.getBoundingClientRect().bottom < innerHeight * 0.3;
      var dr = dsec.getBoundingClientRect();
      var lr = $("letter").getBoundingClientRect();
      var inDate = (dr.top < innerHeight && dr.bottom > 0) || (lr.top < innerHeight && lr.bottom > 0);
      dock.classList.toggle("is-on", named && past && !rsvpVis && !inDate && !box.classList.contains("is-sent"));
    }
    addEventListener(
      "scroll",
      function () {
        requestAnimationFrame(dockSync);
      },
      { passive: true }
    );
    if ("IntersectionObserver" in window && rsvp)
      new IntersectionObserver(function (es) {
        rsvpVis = es[0].isIntersecting;
        dockSync();
      }).observe(rsvp);
  })();
})();
