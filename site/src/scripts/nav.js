(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // ── Theme toggle ─────────────────────────────────────────────────────────
  const themeToggle = nav.querySelector('.nav-theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    function syncIcon() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (icon) icon.className = isDark ? 'ti ti-sun' : 'ti ti-moon';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    syncIcon();
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('farn-theme', next);
      syncIcon();
    });
  }

  // ── Mobile drawer ────────────────────────────────────────────────────────
  const navToggle     = nav.querySelector('.nav-toggle');
  const navToggleIcon = navToggle?.querySelector('i');
  const drawer        = document.querySelector('.nav-drawer');
  const overlay       = document.querySelector('.nav-overlay');
  const closeBtn      = drawer?.querySelector('.nav-drawer-close');

  let trapHandler = null;

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('active');
    navToggle?.setAttribute('aria-expanded', 'true');
    if (navToggleIcon) navToggleIcon.className = 'ti ti-x';
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
    if (navToggleIcon) navToggleIcon.className = 'ti ti-menu-2';
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
