/**
 * initSubNavTracker
 *
 * Sets up an IntersectionObserver that tracks which section is in view and
 * repositions the sliding indicator pill to the active sub-nav link.
 *
 * Targets are derived from each .sub-nav-link's href attribute, so the
 * caller does not need to maintain a hardcoded list of section IDs.
 *
 * @param {Element}  subNavEl                   Container holding .sub-nav-link anchors
 *                                              and a .sub-nav-indicator span.
 * @param {object}  [options]
 * @param {number}  [options.threshold=0.1]     IntersectionObserver threshold.
 * @param {boolean} [options.activateFirst=true] Mark the first link active immediately.
 * @param {boolean} [options.setScrollPadding=false] Set scrollPaddingTop on <html>.
 *
 * @returns {{ updateIndicator: () => void }}
 */
export function initSubNavTracker(subNavEl, options = {}) {
  const { threshold = 0.1, activateFirst = true, setScrollPadding = false } = options;
  if (!subNavEl) return { updateIndicator: () => {} };

  if (setScrollPadding) {
    document.documentElement.style.scrollPaddingTop = 'var(--scroll-offset)';
  }

  const links = subNavEl.querySelectorAll('.sub-nav-link');
  const indicator = subNavEl.querySelector('.sub-nav-indicator');

  function updateIndicator() {
    const active = subNavEl.querySelector('.sub-nav-link.active') || links[0];
    if (active && indicator) {
      indicator.style.left = active.offsetLeft + 'px';
      indicator.style.width = active.offsetWidth + 'px';
    }
  }

  if (activateFirst && links[0]) {
    links[0].classList.add('active');
    requestAnimationFrame(updateIndicator);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const link = subNavEl.querySelector(`a[href="#${CSS.escape(e.target.id)}"]`);
        if (link) { link.classList.add('active'); updateIndicator(); }
      }
    });
  }, { threshold });

  links.forEach(l => {
    const id = l.getAttribute('href')?.slice(1);
    const el = id ? document.getElementById(id) : null;
    if (el) obs.observe(el);
  });

  return { updateIndicator };
}
