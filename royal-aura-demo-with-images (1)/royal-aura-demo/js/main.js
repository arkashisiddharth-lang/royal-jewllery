/* ROYAL AURA — demo interactions (front-end only; nothing is sent anywhere) */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* Toast */
  var toast = $('.toast'), toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 2600);
  }

  /* Mobile menu */
  var toggle = $('.menu-toggle'), nav = $('#primary-nav');
  function setMenu(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    var img = $('img', toggle);
    if (img) img.setAttribute('src', open ? 'assets/icons/close.svg' : 'assets/icons/menu.svg');
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  if (nav) $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 900) setMenu(false); });

  /* Smooth in-page anchors, offset for the sticky header */
  function headerOffset() {
    var h = $('.store-nav');
    return h && window.getComputedStyle(h).position === 'sticky' ? h.offsetHeight : 0;
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (a.hasAttribute('data-demo') || href === '#') {
        e.preventDefault();
        showToast(a.getAttribute('data-demo') || 'This page is not part of the homepage demo.');
        return;
      }
      var target = $(href);
      if (!target) return;
      e.preventDefault();
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset() + 1;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* Wishlist hearts (kept in memory only) */
  var wishCount = 0, wishBadge = $('.wish-count');
  function updateWish() {
    if (!wishBadge) return;
    wishBadge.textContent = wishCount;
    wishBadge.hidden = wishCount === 0;
  }
  $$('.product__overlay button').forEach(function (btn) {
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      btn.textContent = on ? '♥' : '♡';
      wishCount += on ? 1 : -1;
      updateWish();
      var name = btn.closest('.product').querySelector('h3').textContent;
      showToast(on ? name + ' saved to your wishlist' : name + ' removed from your wishlist');
    });
  });

  /* Header utility buttons (demo messages) */
  var msgs = {
    'Search': 'Search is not part of this demo.',
    'Account': 'Accounts are not part of this demo.',
    'Wishlist': function () { return wishCount + (wishCount === 1 ? ' piece' : ' pieces') + ' saved on this page.'; },
    'Bag': 'Shopping bag and checkout are not part of this demo.'
  };
  $$('.utilities button').forEach(function (b) {
    b.addEventListener('click', function () {
      var m = msgs[b.getAttribute('aria-label')];
      if (m) showToast(typeof m === 'function' ? m() : m);
    });
  });

  /* Newsletter (validation only — nothing is submitted) */
  var form = $('.signup'), msg = $('.signup__msg');
  if (form && msg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('input', form), v = input.value.trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      msg.classList.toggle('is-error', !ok);
      if (ok) { msg.textContent = 'Thank you — this is a demo, so no email was sent.'; input.value = ''; }
      else { msg.textContent = 'Please enter a valid email address.'; input.focus(); }
    });
  }

  /* Back to top */
  var topBtn = $('.to-top');
  function onScroll() { if (topBtn) topBtn.hidden = window.pageYOffset < 700; }
  if (topBtn) {
    topBtn.addEventListener('click', function () {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Reveal on scroll */
  var items = $$('.section-heading, .category, .product, .bridal__copy, .craft__image, .craft__copy, .stories > *, .newsletter > *');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }
})();
