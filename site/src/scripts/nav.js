const ICON_MOON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
const ICON_SUN  = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';

let navThemeToggleEl = null;

/** Syncs the nav theme-toggle icon + aria-label to the current data-theme. Exported so other theme controls (e.g. the landing page demo toggle) can reuse it instead of duplicating the icon-swap logic. */
export function syncNavThemeIcon() {
  if (!navThemeToggleEl) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  navThemeToggleEl.innerHTML = isDark ? ICON_SUN : ICON_MOON;
  navThemeToggleEl.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const ICON_MENU = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
  const ICON_X    = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

  // ── Theme toggle ─────────────────────────────────────────────────────────
  navThemeToggleEl = nav.querySelector('.nav-theme-toggle');
  if (navThemeToggleEl) {
    syncNavThemeIcon();
    navThemeToggleEl.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('farn-theme', next);
      syncNavThemeIcon();
    });
  }

  // ── Mobile drawer ────────────────────────────────────────────────────────
  const navToggle = nav.querySelector('.nav-toggle');
  const drawer    = document.querySelector('.nav-drawer');
  const overlay   = document.querySelector('.nav-overlay');
  const closeBtn  = drawer?.querySelector('.nav-drawer-close');

  let trapHandler = null;

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('active');
    navToggle?.setAttribute('aria-expanded', 'true');
    if (navToggle) navToggle.innerHTML = ICON_X;
    document.body.style.overflow = 'hidden';

    if (drawer) {
      const focusable = Array.from(drawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      if (focusable.length) focusable[0].focus();
      trapHandler = (e) => {
        if (e.key !== 'Tab' || !focusable.length) return;
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      };
      drawer.addEventListener('keydown', trapHandler);
    }
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    if (navToggle) navToggle.innerHTML = ICON_MENU;
    document.body.style.overflow = '';
    if (drawer && trapHandler) {
      drawer.removeEventListener('keydown', trapHandler);
      trapHandler = null;
    }
    navToggle?.focus();
  }

  navToggle?.addEventListener('click', () => {
    drawer?.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) closeDrawer();
  });

  // ── Scroll behaviors ─────────────────────────────────────────────────────
  const fills    = nav.hasAttribute('data-nav-fill');
  const autohide = nav.hasAttribute('data-nav-autohide');

  if (fills || autohide) {
    let lastY = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      if (fills)    nav.classList.toggle('filled', y > 10);
      if (autohide) nav.classList.toggle('hidden', y > lastY && y > 80);
      lastY = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
