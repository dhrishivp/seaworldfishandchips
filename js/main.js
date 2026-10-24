(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* Nav: solid on scroll + mobile drawer --------------------------------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenuOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenuOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenuOpen(false);
  });

  /* Open / closed status (Europe/London, Mon–Sat 11:00–21:00) ------------- */
  var OPEN_MIN = 11 * 60;
  var CLOSE_MIN = 21 * 60;
  var CLOSED_DAYS = [0]; // Sunday

  function londonNow() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: days[get("weekday")], minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10) };
  }

  function isOpenDay(day) { return CLOSED_DAYS.indexOf(day) === -1; }

  function nextOpening(day) {
    for (var i = 1; i <= 7; i++) {
      var d = (day + i) % 7;
      if (isOpenDay(d)) return i === 1 ? "tomorrow" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d];
    }
  }

  function updateStatus() {
    var now = londonNow();
    var open = isOpenDay(now.day) && now.minutes >= OPEN_MIN && now.minutes < CLOSE_MIN;
    var text;
    if (open) {
      var left = CLOSE_MIN - now.minutes;
      text = left <= 60 ? "Open now · closes in " + left + " min" : "Open now · until 9pm";
    } else if (isOpenDay(now.day) && now.minutes < OPEN_MIN) {
      text = "Closed · opens today at 11am";
    } else {
      text = "Closed · opens " + nextOpening(now.day) + " at 11am";
    }
    document.querySelectorAll("[data-status]").forEach(function (el) {
      el.textContent = text;
      el.classList.toggle("is-open", open);
      el.classList.toggle("is-closed", !open);
      el.hidden = false;
    });
    document.querySelectorAll("#hours-table tr").forEach(function (tr) {
      tr.classList.toggle("is-today", Number(tr.dataset.day) === now.day);
    });
  }
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* Menu ----------------------------------------------------------------- */
  var menu = window.MENU || [];
  var tabsEl = document.getElementById("menu-tabs");
  var panelsEl = document.getElementById("menu-panels");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  tabsEl.innerHTML = menu.map(function (cat) {
    return '<a class="menu__tab" href="#cat-' + cat.id + '">' + esc(cat.title) + "</a>";
  }).join("");

  panelsEl.innerHTML = menu.map(function (cat) {
    var items = cat.items.map(function (item) {
      return (
        '<li class="menu__item">' +
          '<div class="menu__item-row">' +
            '<span class="menu__item-name">' + esc(item.name) + "</span>" +
            '<span class="menu__item-dots" aria-hidden="true"></span>' +
            '<span class="menu__item-price">' + (item.from ? "<small>from</small> " : "") + "£" + esc(item.price) + "</span>" +
          "</div>" +
          (item.desc ? '<p class="menu__item-desc">' + esc(item.desc) + "</p>" : "") +
        "</li>"
      );
    }).join("");
    return (
      '<section class="menu__category" id="cat-' + cat.id + '" aria-labelledby="cat-' + cat.id + '-h">' +
        '<div class="menu__category-head">' +
          '<h3 id="cat-' + cat.id + '-h">' + esc(cat.title) + "</h3>" +
          (cat.note ? "<p>" + esc(cat.note) + "</p>" : "") +
        "</div>" +
        '<ul class="menu__list">' + items + "</ul>" +
      "</section>"
    );
  }).join("");

  // Highlight the tab for the category in view
  var tabs = Array.prototype.slice.call(tabsEl.querySelectorAll(".menu__tab"));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        tabs.forEach(function (t) {
          var active = t.getAttribute("href") === id;
          t.classList.toggle("is-active", active);
          if (active) t.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    panelsEl.querySelectorAll(".menu__category").forEach(function (el) { spy.observe(el); });
  }

  /* Reveal on scroll ------------------------------------------------------ */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
