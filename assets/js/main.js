/* ==========================================================================
   main.js — Header/Footer injection, Theme, RTL, Mobile Nav
   ========================================================================== */

(function () {
  'use strict';

  const NAV_LINKS = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Collections', href: 'book-collections.html' },
    { label: 'Reading Corner', href: 'reading-corner.html' },
    { label: 'Author Events', href: 'author-events.html' },
    { label: 'Staff Picks', href: 'staff-picks.html' },
    { label: 'Special Orders', href: 'special-orders.html' },
    { label: 'Contact', href: 'contact.html' }
  ];

  const LOGO_SVG = `
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 6.5C4 5.67 4.67 5 5.5 5H13C14.66 5 16 6.34 16 8V25C16 23.9 15.1 23 14 23H4V6.5Z" fill="var(--color-primary)"/>
      <path d="M26 6.5C26 5.67 25.33 5 24.5 5H17C15.34 5 14 6.34 14 8V25C14 23.9 14.9 23 16 23H26V6.5Z" fill="var(--color-secondary)"/>
    </svg>`;

  function buildHeader() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const navHtml = NAV_LINKS.map(link => {
      const active = link.href === path ? ' active' : '';
      return `<a href="${link.href}" class="${active.trim()}">${link.label}</a>`;
    }).join('');

    const drawerHtml = NAV_LINKS.map(link => {
      const active = link.href === path ? ' active' : '';
      return `<a href="${link.href}" class="${active.trim()}">${link.label}</a>`;
    }).join('');

    return `
    <div class="header-inner">
      <a href="index.html" class="brand-logo">
        ${LOGO_SVG}
        <span>Aldergate<span class="brand-sub">Books &amp; Reading Room</span></span>
      </a>

      <nav class="main-nav" aria-label="Primary navigation">
        ${navHtml}
      </nav>

      <div class="header-actions">
        <button type="button" class="icon-toggle desktop-only" id="rtl-toggle" aria-label="Toggle right-to-left layout" title="Toggle RTL">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18M3 12h12M3 19h18"/></svg>
        </button>
        <button type="button" class="icon-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle theme">
          <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <a href="book-collections.html" class="btn-custom btn-secondary-custom btn-sm-custom d-none d-lg-inline-flex">Browse Books</a>
        <a href="special-orders.html" class="btn-custom btn-primary-custom btn-sm-custom d-none d-lg-inline-flex">Request a Title</a>
        <button type="button" class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>

    <div class="mobile-nav-drawer" id="mobile-nav-drawer">
      <button type="button" class="drawer-close" id="drawer-close" aria-label="Close menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <nav aria-label="Mobile navigation">${drawerHtml}</nav>
      <div class="d-flex flex-column gap-2 mt-4">
        <a href="book-collections.html" class="btn-custom btn-secondary-custom w-100">Browse Books</a>
        <a href="special-orders.html" class="btn-custom btn-primary-custom w-100">Request a Title</a>
      </div>
    </div>
    <div class="drawer-overlay" id="drawer-overlay"></div>
    `;
  }

  function buildFooter() {
    return `
    <div class="footer-top">
      <div class="footer-brand">
        <a href="index.html" class="brand-logo">
          ${LOGO_SVG}
          <span>Aldergate<span class="brand-sub">Books &amp; Reading Room</span></span>
        </a>
        <p>An independent bookstore and reading room devoted to slow reading, thoughtful curation, and the company of good books.</p>
        <div class="footer-social">
          <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          <a href="#" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="#" aria-label="Pinterest"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.5 20 12 4M8 14s1.5-2 4-2 4 1.5 4-1-2-3-4-3"/></svg></a>
        </div>
      </div>

      <div class="footer-col">
        <h5>Collections</h5>
        <a href="fiction.html">Fiction</a>
        <a href="non-fiction.html">Non-Fiction</a>
        <a href="children-books.html">Children's Books</a>
        <a href="staff-picks.html">Staff Picks</a>
        <a href="new-arrivals.html">New Arrivals</a>
      </div>

      <div class="footer-col">
        <h5>Community</h5>
        <a href="author-events.html">Author Events</a>
        <a href="reading-corner.html">Reading Corner</a>
        <a href="gift-cards.html">Gift Cards</a>
        <a href="faq.html">FAQ</a>
      </div>

      <div class="footer-col footer-newsletter">
        <h5>Newsletter</h5>
        <p style="margin:0 0 0.5rem;font-size:var(--fs-sm);">Monthly reading notes, staff picks, and event invitations.</p>
        <form id="footer-newsletter-form" novalidate>
          <label for="footer-email" class="visually-hidden">Email address</label>
          <input type="email" id="footer-email" placeholder="you@example.com" required>
          <button type="submit" class="btn-custom btn-primary-custom btn-sm-custom" aria-label="Subscribe">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </form>
      </div>
    </div>

    <div class="footer-bottom">
      <span>&copy; <span id="footer-year"></span> Aldergate Books &amp; Reading Room. All rights reserved.</span>
      <div class="d-flex gap-3">
        <a href="contact.html">Contact</a>
        <a href="faq.html">FAQ</a>
      </div>
    </div>
    `;
  }

  function injectHeaderFooter() {
    const headerEl = document.getElementById('main-header');
    const footerEl = document.getElementById('main-footer');
    if (headerEl) headerEl.innerHTML = buildHeader();
    if (footerEl) footerEl.innerHTML = buildFooter();

    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------- Theme ---------------- */

  function initTheme() {
    const stored = localStorage.getItem('bookstore-theme');
    const theme = stored || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    document.querySelectorAll('#theme-toggle').forEach(btn => {
      const sun = btn.querySelector('.icon-sun');
      const moon = btn.querySelector('.icon-moon');
      if (!sun || !moon) return;
      sun.style.display = theme === 'dark' ? 'none' : 'inline-flex';
      moon.style.display = theme === 'dark' ? 'inline-flex' : 'none';
    });
  }

  function toggleTheme() {
    document.body.classList.add('theme-transitioning');
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('bookstore-theme', next);
    updateThemeIcon(next);
    window.setTimeout(() => document.body.classList.remove('theme-transitioning'), 260);
  }

  /* ---------------- RTL ---------------- */

  function initRTL() {
    const stored = localStorage.getItem('bookstore-dir');
    const dir = stored || 'ltr';
    document.documentElement.setAttribute('dir', dir);
  }

  function toggleRTL() {
    document.body.classList.add('theme-transitioning');
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', next);
    localStorage.setItem('bookstore-dir', next);
    window.setTimeout(() => document.body.classList.remove('theme-transitioning'), 260);
  }

  /* ---------------- Mobile nav ---------------- */

  function initMobileNav() {
    document.addEventListener('click', function (e) {
      if (e.target.closest('#mobile-menu-btn')) {
        document.getElementById('mobile-nav-drawer')?.classList.add('open');
        document.getElementById('drawer-overlay')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
      if (e.target.closest('#drawer-close') || e.target.closest('#drawer-overlay')) {
        document.getElementById('mobile-nav-drawer')?.classList.remove('open');
        document.getElementById('drawer-overlay')?.classList.remove('open');
        document.body.style.overflow = '';
      }
      if (e.target.closest('#theme-toggle')) toggleTheme();
      if (e.target.closest('#rtl-toggle')) toggleRTL();
    });
  }

  /* ---------------- Back to top ---------------- */

  function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 480);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Newsletter (frontend-only) ---------------- */

  function initNewsletterForm() {
    document.addEventListener('submit', function (e) {
      const form = e.target.closest('#footer-newsletter-form, #newsletter-form');
      if (!form) return;
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn ? btn.innerHTML : '';
      if (btn) {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>';
        btn.disabled = true;
        window.setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
          form.reset();
        }, 1800);
      }
    });
  }

  /* ---------------- Init ---------------- */

  document.addEventListener('DOMContentLoaded', function () {
    injectHeaderFooter();
    initTheme();
    initRTL();
    initMobileNav();
    initBackToTop();
    initNewsletterForm();
  });
})();
