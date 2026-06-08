export function initTabs() {
  document.querySelectorAll('[role="tablist"]').forEach(list => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const isEnabled = t => !t.disabled && t.getAttribute('aria-disabled') !== 'true';
    const enabled = () => tabs.filter(isEnabled);

    list.addEventListener('click', e => {
      const tab = e.target.closest('[role="tab"]');
      if (tab && isEnabled(tab)) activate(tab, tabs);
    });

    list.addEventListener('keydown', e => {
      const tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const active = enabled();
      const idx = active.indexOf(tab);
      if (e.key === 'ArrowRight') activate(active[(idx + 1) % active.length], tabs);
      if (e.key === 'ArrowLeft')  activate(active[(idx - 1 + active.length) % active.length], tabs);
      if (e.key === 'Home')       activate(active[0], tabs);
      if (e.key === 'End')        activate(active[active.length - 1], tabs);
    });
  });
}

function activate(tab, tabs) {
  tabs.forEach(t => {
    if (t === tab) return;
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = true;
  });
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
  tab.focus();
  const panel = document.getElementById(tab.getAttribute('aria-controls'));
  if (panel) panel.hidden = false;
}
