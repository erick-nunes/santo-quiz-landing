// Reveal on scroll para elementos abaixo do hero.
// Vanilla, ~30 linhas, zero dependência.
(function () {
  'use strict';

  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Seletores e stagger máximo (em ms) dentro de cada grupo.
  const GROUPS = [
    { selector: '.features .card', maxDelay: 180 },
    { selector: '.section-label', maxDelay: 0 },
    { selector: '.showcase-text', maxDelay: 0 },
    { selector: '.showcase-text .checklist li', maxDelay: 240 },
    { selector: '.showcase-shots img', maxDelay: 180 },
    { selector: '.faq h2', maxDelay: 0 },
    { selector: '.faq details', maxDelay: 300 },
    { selector: '.cta-final h2, .cta-final p, .cta-final .cta-row', maxDelay: 120 },
  ];

  const observed = [];

  GROUPS.forEach(({ selector, maxDelay }) => {
    const els = document.querySelectorAll(selector);
    const n = els.length;
    els.forEach((el, i) => {
      el.classList.add('reveal');
      if (n > 1 && maxDelay > 0) {
        const delay = Math.round((i / (n - 1)) * maxDelay);
        el.style.transitionDelay = delay + 'ms';
      }
      observed.push(el);
    });
  });

  // Se o usuário prefere menos animação, revela tudo de uma vez.
  if (prefersReduced || !('IntersectionObserver' in window)) {
    observed.forEach((el) => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  observed.forEach((el) => io.observe(el));
})();
