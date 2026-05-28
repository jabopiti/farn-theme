# Farn

A design system rooted in the forests of northern Germany. Inspired by [Nord Theme](https://nordtheme.com).

## Sharp. *Warm.* Intellectual.

Four palettes — Iron Night · Birch Storm · Forest · Bloom — with a two-layer token architecture for clean dark/light mode switching.

---

## Quick start

Add one `<link>` to your HTML:

```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/jabopiti/farn-theme@0.1.0/dist/farn.css">
```

Prevent flash of wrong theme by adding this script before `<body>`:

```html
<script>
  (function() {
    const stored = localStorage.getItem('farn-theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', stored ?? system);
  })();
</script>
```

Then use the tokens:

```css
.my-component {
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.my-cta {
  background: var(--fr1-fern);
  color: var(--bs2-parchment);
  font-family: var(--font-body);
}
```

---

## Token overview

### Palette tokens (raw — use sparingly)

| Palette | Tokens | Use for |
|---|---|---|
| Iron Night (`--kn*`) | void, iron, slate, ash | Dark surfaces, borders |
| Birch Storm (`--bs*`) | sand, linen, parchment | Light surfaces, text on dark |
| Forest (`--fr*`) | sage, fern, forest, deepwater | Accents, CTAs, links |
| Bloom (`--bl*`) | ember, ochre, grain, moss, heather | Semantic states |

### Semantic tokens (preferred for components)

| Token | Light | Dark |
|---|---|---|
| `--color-bg` | parchment | void |
| `--color-bg-elevated` | linen | iron |
| `--color-bg-sunken` | sand | slate |
| `--color-text` | void | parchment |
| `--color-text-secondary` | slate | sand |
| `--color-text-tertiary` | ash | ash |
| `--color-border` | iron | slate |
| `--color-accent` | fern | sage |
| `--color-accent-hover` | forest | fern |
| `--color-accent-text` | parchment | parchment |

### Dark/light mode

Set `data-theme="dark"` or `data-theme="light"` on `<html>`. The FOWT prevention script above handles the initial state.

### Surface overrides

Force a surface context on any element, independent of the page theme:

```html
<section data-surface="dark">Always dark background</section>
<section data-surface="light">Always light background</section>
<section data-surface="tinted">Slightly tinted light background</section>
```

---

## Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / H1 | Fraunces | 800 | `font-variation-settings: 'opsz' 72` required |
| H2 | Fraunces | 700 | `'opsz' 24` |
| H3 | Fraunces | 600 | `'opsz' 20` |
| Body | Instrument Sans | 400 | 16px, line-height 1.7 |
| UI / metadata | Instrument Sans | 500–600 | 11–14px |
| Code | JetBrains Mono | 400–500 | 12–13px |

**Important:** Fraunces is a variable font and requires `font-variation-settings: 'opsz' <size>` to render correctly. Without it the optical sizing axis defaults to a value that may not match the intended weight.

---

## Spacing scale

| Token | Value |
|---|---|
| `--space-xs` | 6px |
| `--space-sm` | 12px |
| `--space-md` | 24px |
| `--space-lg` | 36px |
| `--space-xl` | 48px |
| `--space-2xl` | 60px |
| `--space-3xl` | 72px |
| `--space-4xl` | 96px |

---

## WCAG accessibility

All semantic pairings meet WCAG 2.1 AA:

| Pair | Ratio | Result |
|---|---|---|
| Parchment on Void | 13.07:1 | ✓ AA |
| Fern on Parchment | 4.80:1 | ✓ AA |
| Fern on Void | 4.68:1 | ✓ AA |
| Sage on Void | 5.19:1 | ✓ AA |
| All Bloom colors on Parchment | ≥ 4.47:1 | ✓ AA |

Full contrast matrix in the [documentation](https://farn.jbpt.de).

---

## License

MIT — see [LICENSE](LICENSE).

Design by [Jacob Lueg Tiedemann (Bo.)](https://jbpt.de).
