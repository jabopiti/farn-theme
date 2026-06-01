# Farn — Agent Guide

## Repo structure

```
tokens/                   CSS source — edit here, not in dist/
  colors.css              Palette tokens (--in*, --bm*, --fo*, --bl*)
  typography.css          Font imports + font-family tokens
  spacing.css             Spacing scale, widths, radius, z-index
  motion.css              Duration and easing tokens
  dark-light.css          Semantic tokens + data-surface patterns
  components.css          Tier-3 component tokens (--btn-*, --link-*)
  component-classes.css   Shipped CSS classes (.badge, .btn, etc.) — no tokens
  base.css                Reset, focus, reduced-motion
  index.css               @import chain (used by the site)
dist/
  farn.css                Full bundle — tokens + base reset
  farn-tokens.css         Tokens only — no base reset (for consumers with their own reset)
  farn-components.css     Component tokens + classes — opt-in, load alongside farn.css
site/                     Astro documentation site
CHANGELOG.md              Updated on every token or component change
```

## Build command

```bash
# Tokens only (no reset) — build this first
cat tokens/colors.css tokens/typography.css tokens/spacing.css tokens/motion.css tokens/dark-light.css tokens/components.css > dist/farn-tokens.css

# Full bundle (tokens + reset) — appends base.css to the tokens-only output
cat dist/farn-tokens.css tokens/base.css > dist/farn.css

# Component classes (opt-in) — tokens + classes, no reset
cat tokens/components.css tokens/component-classes.css > dist/farn-components.css
```

Run all three after any change to a `tokens/` file (in order — `farn-tokens.css` first).

## CSS naming conventions

| Prefix | Palette | Examples |
|---|---|---|
| `--in` | Iron Night (dark) | `--in0-void`, `--in1-iron`, `--in2-slate`, `--in3-ash` |
| `--bm` | Birch Mist (light) | `--bm0-sand`, `--bm1-mist`, `--bm2-birch` |
| `--fo` | Forest (accent) | `--fo0-sage`, `--fo1-fern`, `--fo2-forest`, `--fo3-deepwater` |
| `--bl` | Bloom (semantic) | `--bl0-ember`, `--bl1-ochre`, `--bl2-grain`, `--bl3-moss`, `--bl4-heather` |
| `--color-*` | Semantic layer | `--color-bg`, `--color-text`, `--color-accent` |
| `--space-*` | Spacing scale | `--space-xs` through `--space-4xl` |
| `--font-*` | Font families | `--font-display`, `--font-body`, `--font-mono` |
| `--radius-*` | Border radius | `--radius-sm` through `--radius-full` |
| `--z-*` | Z-index | `--z-dropdown`, `--z-modal`, `--z-toast` |
| `--btn-*`, `--link-*` | Component layer (Tier 3) | `--btn-p-bg`, `--btn-p-text`, `--link-color` |

## Hard rules

**Typography — mandatory:** Every Fraunces usage must include `font-variation-settings: 'opsz' <value>`.

```css
h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-variation-settings: 'opsz' 72;
}
```

**Tokens only:** Edit `tokens/` files, never `dist/farn.css` directly.

**Dogfood:** The docs site is built with Farn. Every component shipped in `dist/farn-components.css` must also be imported by `DocLayout.astro` from `tokens/component-classes.css`. If it breaks the site, it breaks consumers — catch it here first.

**CHANGELOG:** Update `CHANGELOG.md` with every token or component change.

## Dark/light mode

- Page-level: `data-theme="dark"` or `data-theme="light"` on `<html>`
- Any element: `data-theme="dark|light"` sets `background` + all semantic tokens (self-contained)
- Depth: `data-surface="base|layer|overlay"` — relative to current theme
  - `base` — page-level bg; resets context inside a deeper surface
  - `layer` — card/panel level (mist in light, iron in dark)
  - `overlay` — modal/dropdown level (sand in light, slate in dark)
- Compose: `<section data-theme="dark" data-surface="layer">` = dark panel regardless of page theme
- FOWT prevention: see `tokens/dark-light.css`

## Adding a color token

1. Add to the appropriate palette block in `tokens/colors.css`
2. If semantic: add mapping in `tokens/dark-light.css` for both themes
3. Run build command
4. Add to `site/src/pages/tokens/colors.astro`
5. Update `CHANGELOG.md`

## Adding a component

Two parallel tracks — both required for `stable` status.

**Track A — Component tokens + CSS classes (shipped in dist)**
1. Add `--<name>-*` Tier-3 tokens to `tokens/components.css`
2. Add `.component` CSS classes to `tokens/component-classes.css` — these are built into `dist/farn-components.css`
3. Run build command, update `CHANGELOG.md`

**Track B — Documentation page**
1. Create `site/src/pages/components/<name>.astro` — description, anatomy, live demo, CSS snippet, status (`stable` / `beta`)
2. Add to sidebar in `site/src/layouts/DocLayout.astro`

`site/` pages remain the canonical specification for each component.

## Release

1. Update `CHANGELOG.md` (move Unreleased items to new version)
2. `git tag v<X.Y.Z> && git push origin v<X.Y.Z>`

## Task workflow

Pick a `status: backlog` task (respect `Depends on`). Set `in-progress`, add `branch: <name>`, create the branch.

**Before coding:** Read related files, identify ambiguities; propose options via `AskUserQuestion` (skip only if user said "hands-off").

**Self-critique before executing:**
- Editing `tokens/` (not `dist/` directly)?
- Build command included if any `tokens/` file changed?
- `CHANGELOG.md` update included?
- `font-variation-settings: 'opsz' <value>` on every Fraunces usage?
- Dark/light mode regression considered?

**Complexity gate — get user approval if any apply:**
- Effort `M` or `L`
- `colors.css` or `dark-light.css` structure changes
- `data-surface` pattern changes
- `DocLayout.astro` sidebar or URL structure changes

**Quality gates (always, never skip):**
1. `/simplify`
2. `/review` — low for `XS`; medium for `S`; high for `M`/`L`; bump one level if touching `dark-light.css` or `colors.css`

**Close out:** Mark `done` in TASKS.md, push, open a PR.
