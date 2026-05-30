# Farn — Agent Guide

## What this repo is
Farn is a CSS custom-property design system. It ships as `dist/farn.css` (a single flat CSS file) built from source files in `tokens/`. A documentation site lives in `site/` (Astro, styled with Farn itself).

## Repo structure

```
tokens/           CSS source — edit here, not in dist/
  colors.css      All 17 palette tokens (--in*, --bm*, --fo*, --bl*)
  typography.css  Font imports + font-family tokens
  spacing.css     Spacing scale, widths, radius, z-index
  dark-light.css  Semantic tokens + data-surface patterns
  base.css        Reset, focus, reduced-motion
  index.css       @import chain (used by the site)
dist/
  farn.css        Built output — concatenation of all tokens/*.css
site/             Astro documentation site (Phase 2+)
CHANGELOG.md      Update on every token or component change
```

## CSS naming conventions

| Prefix | Palette | Examples |
|---|---|---|
| `--in` | Iron Night (dark) | `--in0-void`, `--in1-iron`, `--in2-slate`, `--in3-ash` |
| `--bm` | Birch Mist (light) | `--bm0-sand`, `--bm1-mist`, `--bm2-birch` |
| `--fo` | Forest (accent) | `--fo0-sage`, `--fo1-fern`, `--fo2-forest`, `--fo3-deepwater` |
| `--bl` | Bloom (semantic) | `--bl0-ember`, `--bl1-ochre`, `--bl2-grain`, `--bl3-moss`, `--bl4-heather` |
| `--color-*` | Semantic layer | `--color-bg`, `--color-text`, `--color-accent`, etc. |
| `--space-*` | Spacing scale | `--space-xs` through `--space-4xl` |
| `--font-*` | Font families | `--font-display`, `--font-body`, `--font-mono` |
| `--radius-*` | Border radius | `--radius-sm` through `--radius-full` |
| `--z-*` | Z-index | `--z-dropdown`, `--z-modal`, `--z-toast`, etc. |

## Adding a new color token

1. Add the CSS variable to the appropriate palette block in `tokens/colors.css`
2. If it has a semantic role, add a mapping in `tokens/dark-light.css` for both light and dark contexts
3. Rebuild `dist/farn.css` (see below)
4. Add the token to the color page in `site/src/pages/tokens/colors.astro`
5. Update `CHANGELOG.md`

## Rebuilding dist/farn.css

```bash
cat tokens/colors.css tokens/typography.css tokens/spacing.css tokens/dark-light.css tokens/base.css > dist/farn.css
```

No build tool required — it's plain concatenation.

## Adding a new component

Components are documentation patterns, not CSS classes shipped in `dist/farn.css`. To add one:

1. Create `site/src/pages/components/<component-name>.astro`
2. Include: description, anatomy, live demo (using Farn tokens), CSS snippet, and a status label (`stable` / `beta`)
3. Add the page to the sidebar navigation in `site/src/layouts/DocLayout.astro`

## Typography critical rule

Fraunces is a variable font. Always include `font-variation-settings: 'opsz' <size>` — this is **mandatory**. Without it, optical sizing defaults incorrectly.

```css
h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-variation-settings: 'opsz' 72;
}
```

## Dark/light mode

- Page-level: set `data-theme="dark"` or `data-theme="light"` on `<html>`
- Element-level override: `data-surface="light"`, `data-surface="dark"`, or `data-surface="tinted"` on any element
- FOWT prevention script is documented in `tokens/dark-light.css`

## Release process (tagging)

1. Update `CHANGELOG.md` (move items from Unreleased to the new version)
2. Tag: `git tag v<X.Y.Z> && git push origin v<X.Y.Z>`
3. GitHub Actions attaches `dist/farn.css` to the release
4. jsDelivr CDN link becomes live: `https://cdn.jsdelivr.net/gh/jabopiti/farn-theme@<version>/dist/farn.css`

## Load order for editing tasks

Always read before editing:
- Token changes: read `tokens/colors.css` or the relevant token file first
- Component documentation: read the existing component page
- Site layout: read `site/src/layouts/DocLayout.astro` first
