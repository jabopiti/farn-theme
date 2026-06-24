<img src="site/public/fern_icon.png" alt="Farn icon" height="72" />

# Farn

[![CI](https://img.shields.io/github/actions/workflow/status/jabopiti/farn-theme/ci.yml?branch=main&label=CI&color=327A59)](https://github.com/jabopiti/farn-theme/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-327A59)](LICENSE)
[![Version](https://img.shields.io/github/v/tag/jabopiti/farn-theme?color=327A59&label=version&sort=semver)](https://github.com/jabopiti/farn-theme/releases)

## Sharp. *Warm.* Intellectual.

Farn is a zero-dependency, token-first CSS design system for projects that want a calm, intellectual aesthetic without a JavaScript framework. A single `<link>` gives you a two-layer token system — raw palette tokens plus semantic tokens for dark and light mode — and opt-in component classes (buttons, cards, forms, badges, breadcrumbs, accordion) and typography utilities built on top. Inspired by [Nord Theme](https://nordtheme.com).

### 📖 Full documentation at **[farn.jbpt.de](https://farn.jbpt.de)**

Tokens, components, theming, live examples, and copy-paste [Templates](https://farn.jbpt.de/templates) live on the docs site. This README is just enough to install and orient.

---

![Farn colour palettes — Iron Night, Birch Mist, Forest, Bloom](.github/farn-palette.svg)

---

## Install

**npm / pnpm / yarn**

```sh
npm install farn-theme
```

```css
@import "farn-theme";             /* full bundle: tokens + base reset */
@import "farn-theme/tokens";      /* tokens only — no reset */
@import "farn-theme/components";  /* opt-in component classes */
@import "farn-theme/typography";  /* opt-in typography utility classes */
```

**CDN (no build step)**

```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/jabopiti/farn-theme@0.6.0/dist/farn.css">
```

> Replace `0.5.0` with the [latest release tag](https://github.com/jabopiti/farn-theme/releases), or pin it for stability.

Prevent a flash of the wrong theme by adding this before `<body>`:

```html
<script>
  (function() {
    const stored = localStorage.getItem('farn-theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', stored ?? system);
  })();
</script>
```

Set `data-theme="dark|light"` for mode and `data-surface="base|layer|overlay"` for depth — see the [Getting Started guide](https://farn.jbpt.de/getting-started) for the full setup.

---

## Repo layout

For anyone forking or contributing:

- **`tokens/`** — CSS source of truth. Edit here, never `dist/`.
- **`dist/`** — built bundles (`farn.css`, `farn-tokens.css`, `farn-components.css`, `farn-typography.css`).
- **`site/`** — the Astro documentation site, itself built with Farn.

Build bundles after any `tokens/` change with `npm run build`. Contributor conventions live in [.agents/AGENTS.md](.agents/AGENTS.md); release history in [CHANGELOG.md](CHANGELOG.md).

---

## For AI assistants

The [`farn-styling`](https://github.com/jabopiti/bo-skills/tree/main/skills/farn-styling) skill applies Farn colors and typography to any visual output. If your AI assistant supports skills, you can use this to ensure visual consistency when generating UI artifacts.

A compact reference for AI-assisted coding is also available at [`llms.txt`](llms.txt).

## License

MIT — see [LICENSE](LICENSE).

Design by [Jacob Lueg Tiedemann](https://jbpt.de).
