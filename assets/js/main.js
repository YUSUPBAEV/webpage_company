(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: scrolled state + mobile menu ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    header.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("menu-open")) toggle.click();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal, .process");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Systolic array (PE grid) generator ----------
     Any <g data-pe-grid="cols,rows,x,y,size,gap"> is filled with
     processing elements; the pulse runs diagonally like a wavefront. */
  var SVG_NS = "http://www.w3.org/2000/svg";
  document.querySelectorAll("[data-pe-grid]").forEach(function (g) {
    var p = g.getAttribute("data-pe-grid").split(",").map(Number);
    var cols = p[0], rows = p[1], x0 = p[2], y0 = p[3], s = p[4], gap = p[5];
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var x = x0 + c * (s + gap), y = y0 + r * (s + gap);
        var cell = document.createElementNS(SVG_NS, "rect");
        cell.setAttribute("x", x); cell.setAttribute("y", y);
        cell.setAttribute("width", s); cell.setAttribute("height", s);
        cell.setAttribute("rx", 2); cell.setAttribute("class", "pe");
        g.appendChild(cell);
        var pulse = document.createElementNS(SVG_NS, "rect");
        pulse.setAttribute("x", x + 1); pulse.setAttribute("y", y + 1);
        pulse.setAttribute("width", s - 2); pulse.setAttribute("height", s - 2);
        pulse.setAttribute("rx", 1.5); pulse.setAttribute("class", "pe-pulse");
        pulse.style.animationDelay = ((r + c) * 0.14).toFixed(2) + "s";
        g.appendChild(pulse);
      }
    }
  });

  /* ---------- Services sub-navigation highlight ---------- */
  var subLinks = document.querySelectorAll(".subnav a[href^='#']");
  if (subLinks.length && "IntersectionObserver" in window) {
    var map = {};
    subLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          subLinks.forEach(function (a) { a.classList.remove("active"); });
          var link = map[entry.target.id];
          if (link) {
            link.classList.add("active");
            link.scrollIntoView({ block: "nearest", inline: "nearest" });
          }
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) so.observe(el);
    });
  }

  /* ---------- Contact form ----------
     No backend is wired up yet. Until one is, the form opens the visitor's
     email client with the enquiry pre-filled. To use a form service, set
     the form's action attribute and remove data-mailto. */
  var form = document.querySelector("form[data-mailto]");
  if (form) {
    var params = new URLSearchParams(window.location.search);
    var topic = params.get("topic");
    if (topic) {
      var box = form.querySelector("input[name='area'][value='" + topic.replace(/'/g, "") + "']");
      if (box) box.checked = true;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var areas = d.getAll("area").join(", ") || "Not specified";
      var lines = [
        "Name: " + d.get("name"),
        "Company: " + (d.get("company") || "-"),
        "Email: " + d.get("email"),
        "Areas: " + areas,
        "Stage: " + (d.get("stage") || "-"),
        "Target platform: " + (d.get("platform") || "-"),
        "",
        d.get("message")
      ];
      var subject = "Engineering enquiry — " + (d.get("company") || d.get("name"));
      window.location.href = "mailto:" + form.getAttribute("data-mailto") +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      var status = form.querySelector(".form-status");
      if (status) status.classList.add("show");
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
