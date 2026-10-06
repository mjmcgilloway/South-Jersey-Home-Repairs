// South Jersey Home Repairs: header menu + trade-page form setup.
// Loads AFTER js/script.js. Doesn't change how your forms submit.
(function () {
  function init() {
    // Mobile menu
    var toggle = document.querySelector(".sjn-toggle");
    var nav = document.getElementById("sjn");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.textContent = open ? "Close" : "Menu";
      });
    }

    // Services dropdown
    var dd = document.querySelector(".sjn-dd-toggle");
    if (dd) {
      var set = function (o) { dd.setAttribute("aria-expanded", String(o)); };
      dd.addEventListener("click", function (e) { e.stopPropagation(); set(dd.getAttribute("aria-expanded") !== "true"); });
      document.addEventListener("click", function (e) { if (!e.target.closest(".sjn-dd")) set(false); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    }

    // Trade pages: pick the trade for the homeowner using your form's own
    // button, so script.js records it exactly like a normal click.
    var form = document.querySelector("form[data-preselect]");
    if (form) {
      var want = form.getAttribute("data-preselect");
      var btn = Array.prototype.find.call(form.querySelectorAll(".option-btn"), function (b) {
        return b.textContent.trim() === want;
      });
      if (btn) btn.click();
      // Safety net: if the click didn't move the form forward, show the
      // service step again so the homeowner can still pick it themselves.
      setTimeout(function () {
        var step1 = form.querySelector('.form-step[data-step="1"]');
        if (step1 && step1.classList.contains("active")) form.removeAttribute("data-preselect");
      }, 400);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
