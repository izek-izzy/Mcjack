// Small site behavior: year update and contact form handling
document.addEventListener('DOMContentLoaded', function () {
  var y = new Date().getFullYear();
  var els = document.querySelectorAll('#year');
  els.forEach(function (e) { e.textContent = y; });

  var form = document.getElementById('contactForm');
  if (form) {
    // Contact form removed; keep handler empty to avoid errors in older browsers
    form.style.display = 'none';
  }
});