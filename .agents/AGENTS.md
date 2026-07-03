# Farn — Agent Guide

Token-first CSS design system: palette → semantic → component token layers, with opt-in shipped component classes. Source in `tokens/`, built to `dist/`, documented in `site/` (Astro). Task backlog lives in GitHub Issues.

## Repo structure

```
tokens/                         CSS source — edit here, not in dist/
  colors.css                    Palette tokens (--in*, --bm*, --fo*, --bl*)
  typography.css                Font imports, font-family tokens, UI text scale (--text-*)
  spacing.css                   Spacing scale, widths, radius, z-index
  motion.css                    Duration and easing tokens
  dark-light.css                Semantic tokens + data-surface patterns (4 surfaces: base/layer/overlay/featured)
  components.css                Tier-3 component tokens (--btn-*, --card-*, --badge-*, --accordion-*, --input-*, --link-*, --tab-*, --tooltip-*, --table-*, --pagination-*, --code-*, --quote-*, --separator-*, --overlap-*, --wave-height, --arc-height)
  component-classes.css         Shipped CSS classes (.badge, .btn, .card, .table, etc.) — no tokens
  typography-classes.css        Typography utility classes (.text-display, .text-h1, etc.) — NOT in index.css
  base.css                      Reset, focus, reduced-motion
  index.css                     @import chain (used by the site)
dist/
  farn.css                      Full bundle — tokens + base reset
  farn-tokens.css               Tokens only — no base reset (for consumers with their own reset)
  farn-components.css           Component tokens + classes — opt-in, load alongside farn.css
  farn-typography.css           Typography utility classes — opt-in
  farn-layout.css               Layout composition primitives — opt-in, requires farn.css or farn-tokens.css
  tabs.js                       Tab widget script — exported as farn-theme/scripts/tabs
site/
  src/data/navigation.ts        Single source of truth for top nav, sub-nav, mobile drawer
  src/components/SiteNav.astro  Shared nav — rendered by DocLayout.astro and index.astro
  src/scripts/
    subnav-tracker.js           Page-internal TOC scroll-tracking utility
    scroll-reveal.js            Shared IntersectionObserver for .scroll-reveal elements
    code-copy.js                Copy-to-clipboard for .code-block elements
    tabs.js                     Tab component progressive enhancement (source; dist/tabs.js is the built copy)
  src/pages/foundations/
    surfaces.astro              Surfaces deep-dive (data-surface values, base/layer/overlay/featured)
    layout.astro                Layout foundations
    responsive.astro            Responsive system
    accessibility.astro         Accessibility guidelines
  src/pages/styles/
    color.astro                 Color palette + semantic token reference (edit here when adding color tokens)
    typography.astro            Typography scale reference
    spacing.astro               Spacing scale reference
    motion.astro                Motion tokens reference
    icons.astro                 Icon reference
  src/pages/components/
    layout.astro                Group page — Cards, Section Transitions, Separators, Quotes
    navigation.astro            Group page — Breadcrumbs, Pagination, Tabs
    actions.astro               Group page — Buttons, Links
    forms.astro                 Group page — Inputs, Labels, Selects, Form Fields
    data.astro                  Group page — Tables, Code Blocks, Badges
    status.astro                Group page — Spinner, Skeleton
llms.txt                        Machine-readable guide for AI agents building *with* Farn (root is canonical; synced to site/public/)
CHANGELOG.md                    Updated on every token or component change
```

## Navigation structure

`site/src/data/navigation.ts` is the single source of truth for the top nav, sub-nav, and mobile drawer. `SiteNav.astro` renders the nav — it is shared by `DocLayout.astro` and `index.astro`. Do not add nav links directly to either template.

Component group pages live at `site/src/pages/components/{layout,navigation,actions,forms,data,status}.astro`. Add new components to an existing group page — do not create a new per-component `.astro` page. Creating a new group page is a rare structural change that requires complexity gate review.

## Build command

```bash
# Tokens only (no reset) — build this first
cat tokens/colors.css tokens/typography.css tokens/spacing.css tokens/motion.css tokens/components.css tokens/dark-light.css > dist/farn-tokens.css

# Full bundle (tokens + reset) — appends base.css to the tokens-only output
cat dist/farn-tokens.css tokens/base.css > dist/farn.css

# Component classes (opt-in) — tokens + classes, no reset
cat tokens/components.css tokens/component-classes.css > dist/farn-components.css

# Typography utility classes (opt-in) — requires farn.css or farn-tokens.css for --font-* tokens
cat tokens/typography-classes.css > dist/farn-typography.css

# Layout composition primitives (opt-in) — requires farn.css or farn-tokens.css loaded first
cat tokens/layout.css > dist/farn-layout.css

# Sync llms.txt to site/public so farn.jbpt.de/llms.txt stays current (root file is canonical)
cp llms.txt site/public/llms.txt

# Copy tabs script to dist so it ships as farn-theme/scripts/tabs
cp site/src/scripts/tabs.js dist/tabs.js
```

`tokens/typography-classes.css` is **not** in `tokens/index.css` — DocLayout imports it directly from source. Do not add it to the index chain.

Run all steps after any change to a `tokens/` file, `llms.txt`, or `site/src/scripts/tabs.js` (in order — `farn-tokens.css` first). Shorthand: `npm run build` from the repo root.

A PostToolUse hook auto-runs `npm run build` after every `tokens/` edit for Claude Code — Claude does not need to run it manually between individual changes. For `llms.txt` or `site/src/scripts/tabs.js` changes, run it explicitly.

**Antigravity (Gemini) exception:** Antigravity does not use background hooks. You must explicitly execute `npm run build` manually after modifying `tokens/` files.

## Docs site dev server

```bash
cd site && npm run dev   # Astro dev server — http://localhost:4321
```

The docs site (`site/`) has its own `package.json` and dependencies. Run `npm install` inside `site/` once before first use.

## CSS naming conventions

| Prefix | Tier | Examples |
|---|---|---|
| `--in` | Palette — Iron Night (dark) | `--in0-void`, `--in1-iron`, `--in2-slate`, `--in3-ash` |
| `--bm` | Palette — Birch Mist (light) | `--bm0-sand`, `--bm1-mist`, `--bm2-birch` |
| `--fo` | Palette — Forest (accent) | `--fo0-glade`, `--fo1-fern`, `--fo2-forest`, `--fo3-deepwater` |
| `--bl` | Palette — Bloom (semantic) | `--bl0-ember`, `--bl1-ochre`, `--bl2-grain`, `--bl3-moss`, `--bl4-heather` |
| `--color-*` | Semantic layer | `--color-bg`, `--color-text`, `--color-accent`, `--color-border` |
| `--space-*` | Spacing scale | `--space-xs` through `--space-4xl` |
| `--text-*` | UI text scale | `--text-2xs` (11px), `--text-xs` (12px), `--text-sm` (14px), `--text-base` (16px) |
| `--font-*` | Font families | `--font-display`, `--font-body`, `--font-mono` |
| `--radius-*` | Border radius | `--radius-sm` through `--radius-full` |
| `--z-*` | Z-index | `--z-dropdown`, `--z-modal`, `--z-toast` |
| `--duration-*`, `--ease-*` | Motion | `--duration-fast`, `--duration-base`, `--ease-out`, `--ease-in-out` |
| `--btn-*`, `--card-*`, `--badge-*`, ... | Component layer (Tier 3) | See `tokens/components.css` for the full list; examples: `--btn-p-bg`, `--card-bg`, `--input-border`, `--tab-active-border`, `--table-row-stripe-bg` |

**`--text-*` vs. heading utilities:** `--text-*` tokens are for component CSS (buttons, inputs, badges, tabs, tooltips, tables, etc.) — not for page typography. Heading and body utility classes (`.text-display`, `.text-h1`, etc.) live in `tokens/typography-classes.css` and use `clamp()` sizes.

## Hard rules

**Typography — mandatory:** Every Fraunces usage must include `font-variation-settings: 'opsz' <value>`. Canonical opsz values from `tokens/typography-classes.css`: display/h1 → `72`, h2 → `24`, h3 → `20`. Use `20` for pullquotes and decorative display text.

```css
h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-variation-settings: 'opsz' 72;
}
```

**Tokens only:** Edit `tokens/` files, never `dist/` files directly.

**Semantic only in site/ and templates:** `site/src/pages/index.astro` is the canonical reference consumer of the design system. It, `DocLayout.astro`, all template pages, and all block CSS must use only semantic tokens (`--color-*`, `--space-*`, `--text-*`, `--font-*`, `--radius-*`, `--duration-*`, `--ease-*`). Palette tokens (`--in*`, `--bm*`, `--fo*`, `--bl*`) and hardcoded values are not allowed in `site/` CSS or inline styles — the only exceptions are intentionally sub-scale values (e.g. `font-size: 9px` with a comment explaining why) and typographic em-relative spacing tied to a specific font size. Component classes in `tokens/` may not reference palette tokens either — use semantic tokens so consumers get correct dark-mode behavior automatically.

**Import chain:** Every page that loads Farn tokens must import them in this order: `colors.css` → `typography.css` → `spacing.css` → `motion.css` → `components.css` → `dark-light.css`. `dark-light.css` must load last so its theme-specific overrides win cascade ties against `components.css`'s Tier-3 defaults. Skipping `typography.css` leaves `--text-*` undefined and causes all component font sizes to fall back to the browser default (16px).

**Dogfood:** The docs site loads `tokens/component-classes.css` directly — every shipped component class must render correctly there before being considered done. If it breaks the docs site, it breaks consumers.

**CHANGELOG:** Update `CHANGELOG.md` with every token or component change. Mark breaking changes with ⚠️ **Breaking**.

**No tech debt:** Do not leave TODO or FIXME comments in committed code — open a GitHub issue for deferred work instead. No half-implemented features — a component needs both Track A (tokens + CSS) and Track B (docs) for `stable` status. In-progress or planned work is marked `badge-beta` or `badge-coming-soon` in the docs.

**Scout rule:** After running `/simplify` or `/code-review`, scan the touched code for adjacent waste or debt. Fix trivial issues in the same pass; open a GitHub issue for anything larger. Always leave the code cleaner than you found it.

**Demo-first docs:** Every component section on a group page shows a live demo outside any accordion. Token tables and code examples go inside `<details>` accordions.

## Dark/light mode

- Page-level: `data-theme="dark"` or `data-theme="light"` on `<html>`
- Any element: `data-theme="dark|light"` sets `background` + all semantic tokens (self-contained)
- Depth — `data-surface="<value>"`:
  - `base` — page-level bg (birch in light, void in dark); resets context inside a deeper surface
  - `layer` — card/panel level (mist in light, iron in dark)
  - `overlay` — modal/dropdown level (sand in light, slate in dark)
  - `featured` — maximum contrast against the page: void (`#0D1117`) in light mode, mist (`#E9E6DC`) in dark mode. Used for hero/brand sections. `featured` is self-contained — do not also set `data-theme="dark"` on the same element.
- Compose: `<section data-theme="dark" data-surface="layer">` = dark panel regardless of page theme
- FOWT prevention: `DocLayout.astro` has an inline `<script>` that reads `localStorage.getItem('farn-theme')` (falling back to `prefers-color-scheme`) and sets `data-theme` on `<html>` before first paint

## Adding a color token

1. Add to the appropriate palette block in `tokens/colors.css`
2. If semantic: add mapping in `tokens/dark-light.css` for both themes (and all four `data-surface` blocks where the token must vary by depth)
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
2. Add an `<h2>` section: live demo outside accordion, anatomy HTML + token reference table + CSS reference inside `<details>`
3. No changes to `DocLayout.astro` or `navigation.ts` needed for within-group additions

*Creating a new component group (rare — triggers complexity gate):*
1. Add the group entry to `site/src/data/navigation.ts`
2. Create `site/src/pages/components/<group>.astro` using an existing group page as template
3. This is a structural change — apply the full complexity gate and get user approval before coding

`site/` pages are the canonical specification for each component.

## Adding a block

A **Block** is a named, reusable page section documented on a template page. Blocks use only Farn semantic tokens — no hardcoded color, spacing, or size values. Block CSS classes (`.hero`, `.features`, etc.) are copy-paste starters for builders, not stable Farn API. They are **not** shipped in `dist/`.

**Rule:** every block must use only semantic tokens (`--color-*`, `--space-*`, `--text-*`, `--font-*`, `--radius-*`). No palette tokens, no hardcoded values.

To add a block to an existing template page:
1. Find the relevant template page: `site/src/pages/templates/<template-name>.astro`
2. Add an `<h2 id="block-name">` section with:
   - A brief description paragraph (when to use this block)
   - A live demo inside `<div class="block-preview">` — use `b-` prefixed class names in the demo to avoid collision with the copy-paste class names shown in the code
   - Copy-paste HTML in a `<details class="accordion">` accordion
   - Copy-paste CSS in a second `<details class="accordion">` accordion
3. Add `b-*` prefixed CSS to the page `<style>` block for the live demo rendering
4. The copy-paste CSS (shown in the accordion) uses unprefixed semantic names (`.hero`, `.features`, etc.) — these are what builders will use

The `b-` prefix is docs-only — it scopes demo styles to avoid collision with the copy-paste examples rendered on the same page.

## Adding a template

A **Template** is a complete page layout assembled from blocks, documented as a single page.

1. Create `site/src/pages/templates/<template-name>.astro` using `landing-page.astro` as a reference
2. Add the template to the Templates group in `site/src/data/navigation.ts`
3. Add a card for the template to `site/src/pages/templates/index.astro`
4. Update `llms.txt` — add the template's blocks to the Templates section
5. Update `CHANGELOG.md`

Template pages use `DocLayout`. Each block gets its own `<h2>` section following the live demo + accordion pattern above.

## Release

Use the `/release-farn` skill to be guided through these steps.

Farn has three core deliverables that must be aligned on every release:
1. **CSS artifacts** — `dist/farn.css`, `dist/farn-tokens.css`, `dist/farn-components.css`, `dist/farn-typography.css`, `dist/tabs.js`
2. **`llms.txt`** — machine-readable spec for AI agents building with Farn; root file is canonical, synced to `site/public/llms.txt` via build
3. **Documentation site** — deployed to Cloudflare Pages; must match what ships in dist

All three must reflect the same feature set and version on every release. A token added to dist but absent from llms.txt or the docs site is a broken release.

### Pre-release alignment check

Before bumping the version, verify these are in sync:
- [ ] Every surface listed in `data-surface="..."` in `dark-light.css` is documented in `llms.txt` Core rules and in the docs (Foundations › Surfaces)
- [ ] Every component listed in `package.json` exports has docs on the corresponding group page
- [ ] All URLs in the `llms.txt` Reference section resolve (no 404s from page moves or renames)
- [ ] `llms.txt` component lists and status page reflect current `done` / `coming soon` state
- [ ] `CHANGELOG.md` `## [Unreleased]` captures all changes since the last tag

### Version bump — files to update

- `package.json` — `"version"` field
- `CHANGELOG.md` — rename `## [Unreleased]` to `## [X.Y.Z] — YYYY-MM-DD`, add empty `## [Unreleased]` above it
- `README.md` — CDN URL `@X.Y.Z` (the version badge on line 7 is dynamic — auto-updates from GitHub tags, no manual change needed)
- `llms.txt` — CDN URL `@X.Y.Z`
- `site/src/components/Footer.astro` — version badge `vX.Y.Z`
- `site/src/pages/getting-started.astro` — all CDN URL occurrences (use replace_all)

### Release steps

1. Complete the pre-release alignment check above; fix any gaps first
2. Make all version bumps
3. Run `npm run build` (rebuilds all dist/ artifacts and syncs `site/public/llms.txt`)
4. Verify dist/ contains all 5 artifacts with updated content: `ls -la dist/`
5. Commit, push, open a PR
6. After merge: create a GitHub Release at `github.com/jabopiti/farn-theme/releases/new` — set tag `vX.Y.Z`, target `main`; GitHub creates the tag automatically and activates the jsDelivr CDN URL

### Keeping llms.txt current (between releases)

`llms.txt` is a living document — update it (content, not just version) whenever:
- A new `data-surface` value is added or renamed
- A component reaches `stable` status or is renamed/removed
- A reference URL changes (page moves, IA restructures)
- A core rule changes (token naming, opsz values, load order)

## Task lifecycle

When creating, picking up, or closing a GitHub issue, or when documenting discovered or deferred work: invoke the `tracker` skill.

### Complexity gate — get user approval (Risk: high) if any apply

- Complexity `M` or `L` on a new feature (not a fix)
- Structural changes to `colors.css` or `dark-light.css` (adding/removing a surface or palette)
- Adding a new `data-surface` value
- Structural changes to `navigation.ts` or adding a new component group page
- Breaking rename of a token or class affecting consumers (mark ⚠️ Breaking in CHANGELOG)

### When to ask the user (AskUserQuestion)

**Ask when:**
- Risk is `high` — always ask before writing code
- The issue spec has an unresolved fork that meaningfully changes the output (e.g. new component vs. variant of an existing one)
- A token name or class API will be public-facing and has more than one reasonable option
- A "Before coding" research step surfaces a decision that changes the implementation direction

**Do not ask about:**
- Which files to edit — derive from the issue and existing patterns
- Whether to update CHANGELOG.md — always yes
- Whether to run the build — always yes if any `tokens/` file changed
- Implementation details resolvable by reading existing code patterns

### Self-critique before executing

- Editing `tokens/` (not `dist/` directly)?
- Build command included if any `tokens/` file changed?
- `CHANGELOG.md` update included?
- `font-variation-settings: 'opsz' <value>` on every Fraunces usage?
- Dark/light mode regression considered across all four surfaces (base / layer / overlay / featured)?
- `:focus-visible` on every new interactive element (not just `:focus`)?
- `prefers-reduced-motion` guard on every animation or transition?
- JS-disabled fallback for elements that start at `opacity: 0` (use `@media (scripting: none)`)?
- Demo-first: live demo visible outside the accordion, reference content inside?
- Any new CSS in `site/` or templates using only semantic tokens (no palette tokens, no hardcoded px/rem/color values)?
- Import chain in any new or edited page includes `typography.css` between `colors.css` and `spacing.css`?

### Complete

- [ ] `/simplify` — apply all suggested cleanups before review
- [ ] `/review` at the correct level: Complexity `XS` → low · `S` → medium · `M`/`L` → high; bump one level if touching `dark-light.css` or `colors.css`
- [ ] No TODO/FIXME comments in committed code — open a GitHub issue for deferred work instead
- [ ] `CHANGELOG.md` updated with `#N` issue reference and a description of every token, class, or behaviour change (⚠️ Breaking where applicable)
- [ ] `npm run build` if `llms.txt` or `site/src/scripts/tabs.js` changed (tokens/ edits rebuild automatically via hook)
- [ ] PR body includes `Closes #N` — the issue auto-closes when the PR merges

### Superseded work

Comment "Merged into #N" on the superseded issue, then close it.
