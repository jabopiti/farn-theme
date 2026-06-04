# Farn — Agent Guide

## Navigation structure

`site/src/data/navigation.ts` is the single source of truth for the top nav, sub-nav, and mobile drawer. Edit this file to add pages or groups. `DocLayout.astro` reads from it — do not add nav links directly to DocLayout.

## Repo structure

```
tokens/                   CSS source — edit here, not in dist/
  colors.css              Palette tokens (--in*, --bm*, --fo*, --bl*)
  typography.css          Font imports + font-family tokens
  spacing.css             Spacing scale, widths, radius, z-index
  motion.css              Duration and easing tokens
  dark-light.css          Semantic tokens + data-surface patterns
  components.css          Tier-3 component tokens (--btn-*, --card-*, --badge-*, --accordion-*, --input-*, --link-*, --overlap-*, --wave-height, --arc-height)
  component-classes.css   Shipped CSS classes (.badge, .btn, etc.) — no tokens
  base.css                Reset, focus, reduced-motion
  index.css               @import chain (used by the site)
dist/
  farn.css                Full bundle — tokens + base reset
  farn-tokens.css         Tokens only — no base reset (for consumers with their own reset)
  farn-components.css     Component tokens + classes — opt-in, load alongside farn.css
  farn-typography.css     Typography utility classes — opt-in, load alongside farn.css or farn-tokens.css
site/                     Astro documentation site
CHANGELOG.md              Updated on every token or component change
TASKS.md                  Task backlog — pick up work here
```

## Build command

```bash
# Tokens only (no reset) — build this first
cat tokens/colors.css tokens/typography.css tokens/spacing.css tokens/motion.css tokens/dark-light.css tokens/components.css > dist/farn-tokens.css

# Full bundle (tokens + reset) — appends base.css to the tokens-only output
cat dist/farn-tokens.css tokens/base.css > dist/farn.css

# Component classes (opt-in) — tokens + classes, no reset
cat tokens/components.css tokens/component-classes.css > dist/farn-components.css

# Typography utility classes (opt-in) — requires farn.css or farn-tokens.css for --font-* tokens
cat tokens/typography-classes.css > dist/farn-typography.css
```

`tokens/typography-classes.css` is **not** in `tokens/index.css` — DocLayout imports it directly from source. Do not add it to the index chain.

Run all four after any change to a `tokens/` file (in order — `farn-tokens.css` first). Shorthand: `npm run build` from the repo root.

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
| `--btn-*`, `--card-*`, `--badge-*`, `--accordion-*`, `--input-*`, `--link-*`, `--overlap-*` | Component layer (Tier 3) | `--btn-p-bg`, `--card-bg`, `--badge-general-bg`, `--accordion-border`, `--input-border` |

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

**Dogfood:** The docs site loads `tokens/component-classes.css` directly — every shipped component class must render correctly there before being considered done. If it breaks the docs site, it breaks consumers.

**CHANGELOG:** Update `CHANGELOG.md` with every token or component change.

## Dark/light mode

- Page-level: `data-theme="dark"` or `data-theme="light"` on `<html>`
- Any element: `data-theme="dark|light"` sets `background` + all semantic tokens (self-contained)
- Depth: `data-surface="base|layer|overlay"` — relative to current theme
  - `base` — page-level bg; resets context inside a deeper surface
  - `layer` — card/panel level (mist in light, iron in dark)
  - `overlay` — modal/dropdown level (sand in light, slate in dark)
- Compose: `<section data-theme="dark" data-surface="layer">` = dark panel regardless of page theme
- FOWT prevention: `DocLayout.astro` has an inline `<script>` that reads `localStorage.getItem('farn-theme')` (falling back to `prefers-color-scheme`) and sets `data-theme` on `<html>` before first paint

## Adding a color token

1. Add to the appropriate palette block in `tokens/colors.css`
2. If semantic: add mapping in `tokens/dark-light.css` for both themes
3. Run build command
4. Add to `site/src/pages/styles/color.astro`
5. Update `CHANGELOG.md`

## Adding a component

Two parallel tracks — both required for `stable` status.

**Track A — Component tokens + CSS classes (shipped in dist)**
1. Add `--<name>-*` Tier-3 tokens to `tokens/components.css`
2. Add `.component` CSS classes to `tokens/component-classes.css` — these are built into `dist/farn-components.css`
3. Run build command, update `CHANGELOG.md`

**Track B — Documentation page**

*Adding to an existing group page (most common):*
1. Find the relevant group page: `site/src/pages/components/{layout,navigation,actions,forms,data,status}.astro`
2. Add an `<h2>` section with an `.accordion` disclosure: live preview, anatomy, token reference table, CSS reference
3. No changes to `DocLayout.astro` or `navigation.ts` needed for within-group additions

*Creating a new component group (rare — triggers complexity gate):*
1. Add the group entry to `site/src/data/navigation.ts` (single source of truth for nav)
2. Create `site/src/pages/components/<group>.astro` using an existing group page as template
3. This is a structural change; apply full complexity gate review

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
- `:focus-visible` on every new interactive element (not just `:focus`)?
- JS-disabled fallback for elements that start at `opacity: 0` (use `@media (scripting: none)` to show them)?

**Complexity gate — get user approval if any apply:**
- Effort `M` or `L`
- `colors.css` or `dark-light.css` structure changes
- `data-surface` pattern changes
- `navigation.ts` structure changes or adding a new component group

**Quality gates (always, never skip):**
1. `/simplify`
2. `/review` — low for `XS`; medium for `S`; high for `M`/`L`; bump one level if touching `dark-light.css` or `colors.css`

**Close out:** Mark `done` in TASKS.md, push, open a PR.
