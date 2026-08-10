/* ==========================================================================
   main.js — Header/Footer injection, Theme, RTL, Mobile Nav
   ========================================================================== */

(function () {
  'use strict';

  const NAV_LINKS = [
    { label: 'Home', href: 'index.html' },
    { label: 'Home 2', href: 'home-2.html' },
    {
      label: 'Genre',
      dropdown: true,
      items: [
        { label: 'Fiction', href: 'fiction.html' },
        { label: 'Non-Fiction', href: 'non-fiction.html' },
        { label: 'Children\'s Books', href: 'children-books.html' },
        { label: 'All Collections', href: 'book-collections.html' }
      ]
    },
    { label: 'About', href: 'about.html' },
    {
      label: 'Events',
      dropdown: true,
      items: [
        { label: 'Reading Corner', href: 'reading-corner.html' },
        { label: 'Author Events', href: 'author-events.html' }
      ]
    },
    {
      label: 'Services',
      dropdown: true,
      items: [
        { label: 'Staff Picks', href: 'staff-picks.html' },
        { label: 'Special Orders', href: 'special-orders.html' }
      ]
    },
    { label: 'Contact', href: 'contact.html' }
  ];

  const LOGO_SVG = `
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 6.5C4 5.67 4.67 5 5.5 5H13C14.66 5 16 6.34 16 8V25C16 23.9 15.1 23 14 23H4V6.5Z" fill="var(--color-primary)"/>
      <path d="M26 6.5C26 5.67 25.33 5 24.5 5H17C15.34 5 14 6.34 14 8V25C14 23.9 14.9 23 16 23H26V6.5Z" fill="var(--color-secondary)"/>
    </svg>`;

  function buildHeader() {
    const rawPath = window.location.pathname.split('/').pop() || 'index.html';
    const path = rawPath === '' ? 'index.html' : rawPath;

    const navHtml = NAV_LINKS.map(link => {
      if (link.dropdown) {
        const isChildActive = link.items.some(item => item.href === path);
        const activeClass = isChildActive ? ' active' : '';
        const itemsHtml = link.items.map(item => {
          const itemActive = item.href === path ? ' class="active"' : '';
          return `<a href="${item.href}"${itemActive}>${item.label}</a>`;
        }).join('');
        return `
          <div class="nav-dropdown">
            <button type="button" class="dropdown-toggle-btn${activeClass}" aria-expanded="false" aria-haspopup="true">
              <span>${link.label}</span>
              <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="dropdown-menu-custom">
              ${itemsHtml}
            </div>
          </div>
        `;
      } else {
        const active = link.href === path ? ' class="active"' : '';
        return `<a href="${link.href}"${active}>${link.label}</a>`;
      }
    }).join('');

    const drawerHtml = NAV_LINKS.map(link => {
      if (link.dropdown) {
        const isChildActive = link.items.some(item => item.href === path);
        const activeGroup = isChildActive ? ' active-group' : '';
        const itemsHtml = link.items.map(item => {
          const itemActive = item.href === path ? ' class="active"' : '';
          return `<a href="${item.href}"${itemActive}>${item.label}</a>`;
        }).join('');
        return `
          <div class="mobile-dropdown-group${activeGroup}">
            <div class="mobile-dropdown-title">${link.label}</div>
            <div class="mobile-dropdown-links">
              ${itemsHtml}
            </div>
          </div>
        `;
      } else {
        const active = link.href === path ? ' class="active"' : '';
        return `<a href="${link.href}"${active}>${link.label}</a>`;
      }
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
        <button type="button" class="btn-rtl-toggle" id="rtl-toggle" aria-label="Toggle layout direction" title="Toggle RTL Layout">
          <span class="rtl-text">RTL</span>
        </button>
        <button type="button" class="icon-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle theme">
          <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <a href="login.html" class="btn-custom btn-primary-custom btn-sm-custom">Login</a>
        <button type="button" class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>

    <div class="mobile-nav-drawer" id="mobile-nav-drawer">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <button type="button" class="drawer-close" id="drawer-close" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <nav aria-label="Mobile navigation">${drawerHtml}</nav>
      <div class="d-flex flex-column gap-2 mt-4">
        <a href="login.html" class="btn-custom btn-primary-custom w-100">Login</a>
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
        <a href="login.html">Login</a>
        <a href="faq.html">FAQ</a>
      </div>
    </div>
    `;
  }

  function injectHeaderFooter() {
    const rawPath = window.location.pathname.split('/').pop() || '';
    if (rawPath === 'login.html') {
      // Hide header and footer on login page as requested
      const headerEl = document.getElementById('main-header');
      const footerEl = document.getElementById('main-footer');
      if (headerEl) headerEl.style.display = 'none';
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

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
    document.querySelectorAll('#theme-toggle, .theme-toggle-btn').forEach(btn => {
      const sun = btn.querySelector('.icon-sun');
      const moon = btn.querySelector('.icon-moon');
      if (!sun || !moon) return;
      sun.style.display = theme === 'dark' ? 'none' : 'inline-flex';
      moon.style.display = theme === 'dark' ? 'inline-flex' : 'none';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', theme === 'dark' ? 'Light mode' : 'Dark mode');
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
    updateRTLButtonText(dir);
  }

  function updateRTLButtonText(dir) {
    document.querySelectorAll('#rtl-toggle, .btn-rtl-toggle').forEach(btn => {
      const txt = btn.querySelector('.rtl-text');
      if (txt) txt.textContent = 'RTL';
      btn.classList.toggle('active-rtl', dir === 'rtl');
      btn.setAttribute('aria-pressed', dir === 'rtl' ? 'true' : 'false');
    });
  }

  function toggleRTL() {
    document.body.classList.add('theme-transitioning');
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', next);
    localStorage.setItem('bookstore-dir', next);
    updateRTLButtonText(next);
    window.setTimeout(() => document.body.classList.remove('theme-transitioning'), 260);
  }

  /* ---------------- Desktop & Mobile Navigation Interactivity ---------------- */

  function initNavEvents() {
    document.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('.dropdown-toggle-btn');
      if (toggleBtn) {
        const dropdown = toggleBtn.closest('.nav-dropdown');
        const isOpen = dropdown.classList.contains('open');
        document.querySelectorAll('.nav-dropdown').forEach(d => {
          d.classList.remove('open');
          d.querySelector('.dropdown-toggle-btn')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          dropdown.classList.add('open');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      } else if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(d => {
          d.classList.remove('open');
          d.querySelector('.dropdown-toggle-btn')?.setAttribute('aria-expanded', 'false');
        });
      }

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
      if (e.target.closest('#theme-toggle, .theme-toggle-btn')) toggleTheme();
      if (e.target.closest('#rtl-toggle, .btn-rtl-toggle')) toggleRTL();
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

  /* ---------------- Buy Now & Pre-Book Modal System ---------------- */

  function ensureModalContainers() {
    if (!document.getElementById('buyNowModal')) {
      const modalHtml = `
        <!-- BUY NOW MODAL -->
        <div class="book-modal-backdrop" id="buyNowModal" role="dialog" aria-modal="true" aria-labelledby="buyModalTitle">
          <div class="book-modal-dialog">
            <div class="book-modal-header">
              <h4 id="buyModalTitle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Instant Purchase
              </h4>
              <button type="button" class="book-modal-close" data-close-modal="buyNowModal" aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <form id="buyNowForm">
              <div class="book-modal-body">
                <div class="modal-book-preview">
                  <img src="" alt="" class="modal-book-cover" id="buyCover">
                  <div class="modal-book-meta">
                    <h5 id="buyTitle">Book Title</h5>
                    <div class="author" id="buyAuthor">Author Name</div>
                    <div class="price-tag" id="buyBasePrice">$0.00</div>
                  </div>
                </div>

                <div class="modal-form-group">
                  <label>Select Format</label>
                  <div class="format-selector">
                    <div class="format-option selected" data-fmt="hardcover" data-add="0">
                      <span class="fmt-title">Hardcover</span>
                      <span class="fmt-price" id="fmtHardPrice">Standard</span>
                    </div>
                    <div class="format-option" data-fmt="paperback" data-add="-5">
                      <span class="fmt-title">Paperback</span>
                      <span class="fmt-price">-$5.00</span>
                    </div>
                    <div class="format-option" data-fmt="collector" data-add="12">
                      <span class="fmt-title">Signed Edition</span>
                      <span class="fmt-price">+$12.00</span>
                    </div>
                  </div>
                </div>

                <div class="row g-2">
                  <div class="col-6">
                    <div class="modal-form-group">
                      <label>Quantity</label>
                      <div class="qty-control">
                        <button type="button" class="qty-btn" id="qtyMinus">-</button>
                        <span class="qty-val" id="qtyVal">1</span>
                        <button type="button" class="qty-btn" id="qtyPlus">+</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="modal-form-group">
                      <label for="buyPaymentMethod">Payment</label>
                      <select class="modal-form-control" id="buyPaymentMethod" required>
                        <option value="card">Credit Card / Debit</option>
                        <option value="apple">Apple Pay / GPay</option>
                        <option value="store">Bookstore Token</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="modal-form-group">
                  <label for="buyCustomerEmail">Delivery Email</label>
                  <input type="email" class="modal-form-control" id="buyCustomerEmail" placeholder="reader@example.com" required>
                </div>

                <div class="price-summary-box">
                  <div class="summary-row"><span>Book Price:</span><span id="sumBookPrice">$0.00</span></div>
                  <div class="summary-row"><span>Local Tax &amp; Shipping:</span><span>$3.50</span></div>
                  <div class="summary-row total"><span>Total Amount:</span><span id="sumTotal">$0.00</span></div>
                </div>
              </div>
              <div class="book-modal-footer">
                <button type="button" class="btn-custom btn-secondary-custom btn-sm-custom" data-close-modal="buyNowModal">Cancel</button>
                <button type="submit" class="btn-custom btn-primary-custom btn-sm-custom" id="btnSubmitBuy">Complete Purchase</button>
              </div>
            </form>
          </div>
        </div>

        <!-- PRE-BOOK MODAL -->
        <div class="book-modal-backdrop" id="prebookModal" role="dialog" aria-modal="true" aria-labelledby="preModalTitle">
          <div class="book-modal-dialog">
            <div class="book-modal-header">
              <h4 id="preModalTitle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                Pre-Book Title Reservation
              </h4>
              <button type="button" class="book-modal-close" data-close-modal="prebookModal" aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <form id="prebookForm">
              <div class="book-modal-body">
                <div class="modal-book-preview">
                  <img src="" alt="" class="modal-book-cover" id="preCover">
                  <div class="modal-book-meta">
                    <h5 id="preTitle">Upcoming Release</h5>
                    <div class="author" id="preAuthor">Author</div>
                    <div style="font-size:0.8rem; font-weight:600; color:var(--color-burgundy);" id="preReleaseDate">Releasing Soon</div>
                  </div>
                </div>

                <div class="price-summary-box" style="margin-bottom:1rem; border-color:var(--color-gold);">
                  <div class="d-flex align-items-center gap-2" style="font-size:0.85rem; font-weight:600; color:var(--color-primary);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    Aldergate Pre-Book Guarantee
                  </div>
                  <p style="font-size:0.78rem; margin:0.35rem 0 0; color:var(--text-secondary);">
                    No payment charged until release. Reserves a first-print hardcover copy with optional author bookplate.
                  </p>
                </div>

                <div class="modal-form-group">
                  <label for="preCustomerName">Full Name</label>
                  <input type="text" class="modal-form-control" id="preCustomerName" placeholder="Your name" required>
                </div>

                <div class="modal-form-group">
                  <label for="preCustomerEmail">Notification Email</label>
                  <input type="email" class="modal-form-control" id="preCustomerEmail" placeholder="you@example.com" required>
                </div>

                <div class="modal-form-group">
                  <label for="preDeliveryPref">Fulfillment Preference</label>
                  <select class="modal-form-control" id="preDeliveryPref">
                    <option value="pickup">In-Store Pickup (Aldergate Lane)</option>
                    <option value="ship">Courier Delivery on Release Day</option>
                  </select>
                </div>

                <div class="d-flex align-items-center gap-2 mt-2" style="font-size:0.82rem; color:var(--text-secondary);">
                  <input type="checkbox" id="preSignedBookplate" checked style="accent-color:var(--color-gold);">
                  <label for="preSignedBookplate" style="margin:0; cursor:pointer;">Include complimentary author-signed bookplate</label>
                </div>
              </div>

              <div class="book-modal-footer">
                <button type="button" class="btn-custom btn-secondary-custom btn-sm-custom" data-close-modal="prebookModal">Cancel</button>
                <button type="submit" class="btn-custom btn-primary-custom btn-sm-custom">Confirm Pre-Order</button>
              </div>
            </form>
          </div>
        </div>

        <!-- TOAST NOTIFICATION -->
        <div class="book-toast" id="bookToast">
          <div class="toast-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <span id="toastMessage">Action completed successfully!</span>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
  }

  let currentBookPrice = 26.00;
  let currentQty = 1;
  let currentFmtAdd = 0;

  function recalculateBuyPrice() {
    const sumBookPrice = document.getElementById('sumBookPrice');
    const sumTotal = document.getElementById('sumTotal');
    if (!sumBookPrice || !sumTotal) return;

    const unitPrice = currentBookPrice + currentFmtAdd;
    const subtotal = unitPrice * currentQty;
    const total = subtotal + 3.50;

    sumBookPrice.textContent = '$' + subtotal.toFixed(2);
    sumTotal.textContent = '$' + total.toFixed(2);
  }

  function showToast(msg) {
    const toast = document.getElementById('bookToast');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  function openBuyModal(cardData) {
    ensureModalContainers();
    const modal = document.getElementById('buyNowModal');
    const titleEl = document.getElementById('buyTitle');
    const authorEl = document.getElementById('buyAuthor');
    const basePriceEl = document.getElementById('buyBasePrice');
    const coverEl = document.getElementById('buyCover');

    titleEl.textContent = cardData.title || 'Selected Book';
    authorEl.textContent = cardData.author || 'Aldergate Author';
    coverEl.src = cardData.cover || 'https://picsum.photos/seed/book/200/300';
    coverEl.alt = cardData.title || 'Book Cover';

    currentBookPrice = parseFloat(cardData.price) || 26.00;
    basePriceEl.textContent = '$' + currentBookPrice.toFixed(2);
    currentQty = 1;
    currentFmtAdd = 0;

    const qtyVal = document.getElementById('qtyVal');
    if (qtyVal) qtyVal.textContent = '1';

    // reset format options
    document.querySelectorAll('#buyNowModal .format-option').forEach((opt, idx) => {
      if (idx === 0) opt.classList.add('selected');
      else opt.classList.remove('selected');
    });

    recalculateBuyPrice();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openPrebookModal(cardData) {
    ensureModalContainers();
    const modal = document.getElementById('prebookModal');
    const titleEl = document.getElementById('preTitle');
    const authorEl = document.getElementById('preAuthor');
    const coverEl = document.getElementById('preCover');
    const dateEl = document.getElementById('preReleaseDate');

    titleEl.textContent = cardData.title || 'Upcoming Title';
    authorEl.textContent = cardData.author || 'Author';
    coverEl.src = cardData.cover || 'https://picsum.photos/seed/prebook/200/300';
    dateEl.textContent = cardData.release || 'Releasing Next Month';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function initBuyPrebookInteractivity() {
    ensureModalContainers();

    // Event Delegation for Buy Now / Pre-Book clicks
    document.addEventListener('click', function (e) {
      const buyBtn = e.target.closest('.btn-buy-now');
      if (buyBtn) {
        e.preventDefault();
        const card = buyBtn.closest('.book-card, .arrival-item, .vault-card, .spotlight-wrapper, .genre-card') || buyBtn.parentElement;
        const title = buyBtn.dataset.title || card?.querySelector('h4, h5, .arrival-title, .vault-card h4')?.textContent?.trim() || 'Selected Title';
        const author = buyBtn.dataset.author || card?.querySelector('.book-author, .vault-author, p:not(.arrival-price)')?.textContent?.trim() || 'Aldergate Author';
        const priceStr = buyBtn.dataset.price || card?.querySelector('.arrival-price, .vault-price, .price-tag, [data-price]')?.textContent || '$24.00';
        const priceClean = priceStr.replace(/[^0-9.]/g, '') || '24.00';
        const cover = buyBtn.dataset.cover || card?.querySelector('img')?.src || 'https://picsum.photos/seed/book-cover/200/300';

        openBuyModal({ title, author, price: priceClean, cover });
        return;
      }

      const preBtn = e.target.closest('.btn-prebook');
      if (preBtn) {
        e.preventDefault();
        const card = preBtn.closest('.book-card, .arrival-item, .vault-card, .spotlight-wrapper') || preBtn.parentElement;
        const title = preBtn.dataset.title || card?.querySelector('h4, h5, .arrival-title')?.textContent?.trim() || 'Upcoming Release';
        const author = preBtn.dataset.author || card?.querySelector('.book-author, .vault-author')?.textContent?.trim() || 'Aldergate Author';
        const release = preBtn.dataset.release || card?.querySelector('.vault-release-badge')?.textContent?.trim() || 'Releasing Sep 2026';
        const cover = preBtn.dataset.cover || card?.querySelector('img')?.src || 'https://picsum.photos/seed/upcoming/200/300';

        openPrebookModal({ title, author, release, cover });
        return;
      }

      // Close modal buttons
      const closeBtn = e.target.closest('[data-close-modal]');
      if (closeBtn) {
        const targetModalId = closeBtn.getAttribute('data-close-modal');
        closeModal(targetModalId);
        return;
      }

      // Close on backdrop click
      if (e.target.classList.contains('book-modal-backdrop')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
        return;
      }

      // Format selector option click inside Buy Modal
      const fmtOpt = e.target.closest('.format-option');
      if (fmtOpt) {
        document.querySelectorAll('#buyNowModal .format-option').forEach(o => o.classList.remove('selected'));
        fmtOpt.classList.add('selected');
        currentFmtAdd = parseFloat(fmtOpt.dataset.add) || 0;
        recalculateBuyPrice();
        return;
      }

      // Quantity buttons inside Buy Modal
      if (e.target.id === 'qtyPlus') {
        currentQty++;
        document.getElementById('qtyVal').textContent = currentQty;
        recalculateBuyPrice();
        return;
      }
      if (e.target.id === 'qtyMinus') {
        if (currentQty > 1) currentQty--;
        document.getElementById('qtyVal').textContent = currentQty;
        recalculateBuyPrice();
        return;
      }

      // Spotlight section tab button click
      const tabBtn = e.target.closest('.spotlight-tab-btn');
      if (tabBtn) {
        const targetId = tabBtn.dataset.tab;
        const wrapper = tabBtn.closest('.spotlight-wrapper');
        if (wrapper && targetId) {
          wrapper.querySelectorAll('.spotlight-tab-btn').forEach(b => b.classList.remove('active'));
          wrapper.querySelectorAll('.spotlight-tab-pane').forEach(p => p.classList.remove('active'));
          tabBtn.classList.add('active');
          const pane = wrapper.querySelector('#' + targetId);
          if (pane) pane.classList.add('active');
        }
      }
    });

    // Form submit handlers
    document.addEventListener('submit', function (e) {
      if (e.target.id === 'buyNowForm') {
        e.preventDefault();
        const title = document.getElementById('buyTitle').textContent;
        closeModal('buyNowModal');
        showToast(`Order Confirmed! "${title}" has been placed.`);
      }
      if (e.target.id === 'prebookForm') {
        e.preventDefault();
        const title = document.getElementById('preTitle').textContent;
        closeModal('prebookModal');
        showToast(`Pre-Order Reserved! "${title}" will arrive on release day.`);
      }
    });
  }

  /* ---------------- Unique Book Showcase Interactivity (Home 2) ---------------- */

  function initUniqueBookShowcase() {
    const bookShowcaseData = {
      'book-1': {
        title: 'The Cartography of Grief',
        author: 'Noor Abbasi',
        tag: 'Literary Masterpiece',
        price: 24.50,
        rating: '4.9 ★ (142 reviews)',
        img: 'https://picsum.photos/seed/fic-award-01/400/580',
        excerpt: '"Mapmaking is not about where the land ends, but where the heart loses its compass. In the coastal town of Al-Minha, three generations of women kept books they never intended to publish..."',
        audioTime: '03:12'
      },
      'book-2': {
        title: 'The Quiet Ledger',
        author: 'Mara Solenne',
        tag: 'Mystery & Suspense',
        price: 26.00,
        rating: '4.8 ★ (98 reviews)',
        img: 'https://picsum.photos/seed/fic-lit-01/400/580',
        excerpt: '"The ledger was bound in dark calfskin, stained at the corners with black tea. Page forty-two listed forty-eight names, but only forty-seven were accounted for in the village churchyard..."',
        audioTime: '02:45'
      },
      'book-3': {
        title: 'Architects of Memory',
        author: 'Julian Vance',
        tag: 'Philosophy & Science',
        price: 28.00,
        rating: '4.95 ★ (215 reviews)',
        img: 'https://picsum.photos/seed/cc-side-history/400/580',
        excerpt: '"To remember a landmark is easy; to remember the light that fell across its stone on an October afternoon in 1894 requires a different kind of architecture altogether..."',
        audioTime: '04:05'
      },
      'book-4': {
        title: 'Winter at Thornfield',
        author: 'E. M. Castellane',
        tag: 'Vintage Classic',
        price: 14.00,
        rating: '4.7 ★ (84 reviews)',
        img: 'https://picsum.photos/seed/fic-classic-01/400/580',
        excerpt: '"Snow began falling at three in the afternoon, coating the old stone chimneys until Thornfield looked less like an estate and more like a sleeping beast wrapped in frost..."',
        audioTime: '02:18'
      }
    };

    document.addEventListener('click', function (e) {
      const tab = e.target.closest('.ub-tab-btn');
      if (tab) {
        const bookId = tab.dataset.book;
        const showcase = tab.closest('.ub-section');
        if (!showcase || !bookId || !bookShowcaseData[bookId]) return;

        showcase.querySelectorAll('.ub-tab-btn').forEach(b => b.classList.remove('active'));
        tab.classList.add('active');

        const data = bookShowcaseData[bookId];

        const titleEl = showcase.querySelector('.ub-book-title');
        const authorEl = showcase.querySelector('.ub-book-author');
        const tagEl = showcase.querySelector('.ub-book-tag');
        const priceEl = showcase.querySelector('.ub-price-tag');
        const ratingEl = showcase.querySelector('.ub-book-rating');
        const imgEl = showcase.querySelector('.ub-3d-book-cover');
        const excerptEl = showcase.querySelector('.ub-excerpt-text');
        const audioTimeEl = showcase.querySelector('.ub-audio-time');
        const buyBtn = showcase.querySelector('.ub-buy-btn');

        if (titleEl) titleEl.textContent = data.title;
        if (authorEl) authorEl.textContent = 'By ' + data.author;
        if (tagEl) tagEl.textContent = data.tag;
        if (priceEl) priceEl.textContent = '$' + data.price.toFixed(2);
        if (ratingEl) ratingEl.textContent = data.rating;
        if (imgEl) {
          imgEl.src = data.img;
          imgEl.alt = '3D Book Cover of ' + data.title;
        }
        if (excerptEl) excerptEl.textContent = data.excerpt;
        if (audioTimeEl) audioTimeEl.textContent = data.audioTime;

        if (buyBtn) {
          buyBtn.dataset.title = data.title;
          buyBtn.dataset.price = data.price;
          buyBtn.dataset.img = data.img;
        }

        const audioBtn = showcase.querySelector('.ub-audio-play-btn');
        const wave = showcase.querySelector('.ub-audio-wave');
        if (audioBtn) audioBtn.classList.remove('playing');
        if (wave) wave.classList.remove('active');
      }

      const audioBtn = e.target.closest('.ub-audio-play-btn');
      if (audioBtn) {
        const isPlaying = audioBtn.classList.contains('playing');
        const wave = audioBtn.closest('.ub-audio-player')?.querySelector('.ub-audio-wave');
        if (isPlaying) {
          audioBtn.classList.remove('playing');
          if (wave) wave.classList.remove('active');
          showToast('Audio sample paused');
        } else {
          audioBtn.classList.add('playing');
          if (wave) wave.classList.add('active');
          showToast('Playing audio excerpt sample...');
        }
      }

      const fmtPill = e.target.closest('.ub-fmt-pill');
      if (fmtPill) {
        const parent = fmtPill.closest('.ub-fmt-group');
        if (parent) {
          parent.querySelectorAll('.ub-fmt-pill').forEach(p => p.classList.remove('active'));
          fmtPill.classList.add('active');
          const addPrice = parseFloat(fmtPill.dataset.add) || 0;
          const section = fmtPill.closest('.ub-section');
          const basePrice = 24.50;
          const priceEl = section?.querySelector('.ub-price-tag');
          if (priceEl) priceEl.textContent = '$' + (basePrice + addPrice).toFixed(2);
        }
      }
    });
  }

  /* ---------------- Mood Matrix Interactivity (Home 2) ---------------- */

  function initMoodMatrix() {
    document.addEventListener('click', function (e) {
      const pill = e.target.closest('.rj-mood-pill');
      if (!pill) return;
      const mood = pill.dataset.mood;
      const section = pill.closest('.rj-section');
      if (!section) return;

      section.querySelectorAll('.rj-mood-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const cards = section.querySelectorAll('.rj-card');
      cards.forEach(card => {
        if (mood === 'all' || card.dataset.mood === mood) {
          card.classList.remove('mood-dimmed');
          card.classList.add('mood-highlighted');
        } else {
          card.classList.remove('mood-highlighted');
          card.classList.add('mood-dimmed');
        }
      });
    });
  }

  /* ---------------- Init ---------------- */

  document.addEventListener('DOMContentLoaded', function () {
    injectHeaderFooter();
    initTheme();
    initRTL();
    initNavEvents();
    initBackToTop();
    initNewsletterForm();
    initBuyPrebookInteractivity();
    initUniqueBookShowcase();
    initMoodMatrix();
  });
})();

