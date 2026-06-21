const COPY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`;
const CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>`;

export function initCodeCopy() {
  if (!navigator?.clipboard) return;
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.code-copy-wrap')) return;
    const code = pre.querySelector('code');
    if (!code) return;

    // Wrap <pre> in a positioning div so the button stays fixed in the top-right
    // corner during horizontal scroll (position:absolute inside overflow-x:auto scrolls
    // with the content; wrapping breaks that coupling).
    const wrap = document.createElement('div');
    wrap.className = 'code-copy-wrap';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = COPY_SVG;
    let resetTimer;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent ?? '');
        clearTimeout(resetTimer);
        btn.setAttribute('aria-label', 'Copied');
        btn.innerHTML = CHECK_SVG;
        resetTimer = setTimeout(() => {
          btn.setAttribute('aria-label', 'Copy code');
          btn.innerHTML = COPY_SVG;
        }, 2000);
      } catch { /* clipboard unavailable — silent */ }
    });
    wrap.append(btn);
  });
}
