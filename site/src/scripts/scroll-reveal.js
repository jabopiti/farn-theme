export function initScrollReveal({ threshold = 0.15 } = {}) {
  // CSS already makes .scroll-reveal elements visible under prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });
  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}
