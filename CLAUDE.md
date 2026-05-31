# Farn — Agent Guide

## Repo structure

```
tokens/           CSS source — edit here, not in dist/
  colors.css      Palette tokens (--in*, --bm*, --fo*, --bl*)
  typography.css  Font imports + font-family tokens
  spacing.css     Spacing scale, widths, radius, z-index
  dark-light.css  Semantic tokens + data-surface patterns
  base.css        Reset, focus, reduced-motion
  index.css       @import chain (used by the site)
dist/
  farn.css        Built output — concatenation of all tokens/*.css
site/             Astro documentation site
CHANGELOG.md      Updated on every token or component change
```

## Build command

```bash
cat tokens/colors.css tokens/typography.css tokens/spacing.css tokens/dark-light.css tokens/base.css > dist/farn.css
```

Run after any change to a `tokens/` file.

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

Components are documentation patterns, not shipped CSS classes. The `site/` pages in this repo are the canonical specification for all components — no external repo is authoritative.

1. Create `site/src/pages/components/<name>.astro` — include description, anatomy, live demo, CSS snippet, status label (`stable` / `beta`)
2. Add to sidebar in `site/src/layouts/DocLayout.astro`

## Release

1. Update `CHANGELOG.md` (move Unreleased items to new version)
2. `git tag v<X.Y.Z> && git push origin v<X.Y.Z>`

## Task workflow

### Phase 0 — Select
Pick one `status: backlog` task from TASKS.md, respecting `Depends on` notes. Update its status to `in-progress`, add `branch: <name>`, create the branch.

### Phase 1 — Specify (WHAT)
Before writing code:
1. Read the task + related files:
   - Token changes → `tokens/colors.css` or relevant token file
   - Component docs → the existing component page
   - Site layout changes → `site/src/layouts/DocLayout.astro`
2. Identify ambiguities, options, tradeoffs.
3. Propose options and a recommendation via `AskUserQuestion`. **Skip only if the user said "hands-off".**

### Phase 2 — Plan (HOW)
1. Draft an implementation plan.
2. Self-critique — check all of these:
   - Editing `tokens/` files (not `dist/` directly)?
   - Build command included if any token file changes?
   - `CHANGELOG.md` update included?
   - `font-variation-settings: 'opsz' <value>` on every Fraunces usage?
   - Dark/light mode regression considered?
   - Existing utilities reused?
3. **Complexity gate — get user approval (ExitPlanMode) if any apply:**
   - Effort `M` or `L`
   - Token architecture changes (`colors.css`, `dark-light.css` structure)
   - Surface system changes (`data-surface` patterns)
   - IA/nav changes (`DocLayout.astro` sidebar, URL structure)

### Phase 3 — Execute
Commit in logical chunks. Update `CHANGELOG.md` as part of the work.

### Phase 4 — Quality gates
**Mandatory — never skip, regardless of effort size.**

Run in order:
1. `/simplify`
2. `/review` (low effort for `XS`; medium for `S`; high for `M`/`L`; bump one level if the task touches token architecture files — `dark-light.css`, `colors.css`)

Fix all findings before closing.

### Phase 5 — Close out
Mark `done` in TASKS.md. Push and open a PR.
