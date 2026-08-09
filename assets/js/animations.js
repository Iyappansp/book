/* ==========================================================================
   animations.js — Scroll reveal, ink-mark signature, counters, accordion
   ========================================================================== */

(function () {
  'use strict';

  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal-up, .ink-mark');
    if (!('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach(t => t.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(t => observer.observe(t));
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length === 0) return;

    const animate = (el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function initAccordion() {
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('.faq-question');
      if (!trigger) return;
      const item = trigger.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      item.parentElement.querySelectorAll('.faq-item.open').forEach(i => {
        if (i !== item) {
          i.classList.remove('open');
          i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !wasOpen);
      trigger.setAttribute('aria-expanded', String(!wasOpen));
    });
  }

  function initSectionHeadingUnderlines() {
    const headings = document.querySelectorAll('.section-heading h2, .section-heading h3, .page-header h1, .category-block-header h3');
    headings.forEach(heading => {
      if (heading.querySelector('.ink-mark')) return;
      const text = heading.innerHTML.trim();
      if (!text) return;
      const words = text.split(' ');
      const lastWord = words.pop();
      const rest = words.join(' ');
      const svgMark = `<span class="ink-mark">${lastWord}<svg viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M4 14 Q 50 4, 100 12 T 196 10"/></svg></span>`;
      heading.innerHTML = rest ? `${rest} ${svgMark}` : svgMark;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSectionHeadingUnderlines();
    initScrollReveal();
    initCounters();
    initAccordion();
  });
})();
