# Farn — Backlog

Design system enhancement backlog. Each task is independently completable. Pick up any item by creating a branch and resolving it.

**Effort scale:** `XS` < 1 hr · `S` 1–3 hr · `M` half day · `L` full day+

**Status values:** `backlog` → `in-progress` (add `branch: <branch-name>`) → `done`

---

## T-02 · Extract shared sub-nav scroll-tracking utility
`status: done` `effort: XS` `branch: claude/busy-allen-ThaIb`

**Gap:** The `IntersectionObserver` scroll-tracking logic is structurally identical in `DocLayout.astro` and `index.astro`; threshold or indicator changes must be applied in two places.

- [x] Create `site/src/scripts/subnav-tracker.js` exporting an `initSubNavTracker(subNavEl)` function
- [x] Replace the inline observer scripts in both layouts with an import of the shared utility
- [x] Verify no FOWT or scroll-tracking regressions after switching to module import

---

## T-03 · Make farn-theme the canonical source of truth
`status: done` `effort: XS` `branch: claude/gifted-goldberg-BaIKt`

**Gap:** `CLAUDE.md` references `bo-creative-kit/design-system/web-reference.md` as the canonical component spec, making this repo a secondary rendition rather than the authoritative source.

- [x] Remove the "Source of truth for component specs" section from `CLAUDE.md`
- [x] Update `CLAUDE.md` to state that `site/` pages are the canonical specifications
- [x] Check for any other references to `bo-creative-kit` in the repo and remove or reframe them

---

## T-04 · Motion tokens
`status: done` `effort: S` `branch: claude/task-t-04-rM9f4`

**Gap:** Transition timings and easing values are hardcoded throughout `site/src/styles/site.css` rather than tokenized; consumers cannot override animation behaviour via the token system.

- [x] Add `--duration-*` (e.g. `fast`, `base`, `slow`) and `--ease-*` (e.g. `default`, `in`, `out`) tokens to `tokens/spacing.css` or a new `tokens/motion.css`
- [x] Replace hardcoded `transition` and `animation` values in `site/src/styles/site.css` with the new tokens
- [x] Rebuild `dist/farn.css` and update `CHANGELOG.md`

---

## T-05 · Theming demo page
`status: done` `effort: S` `branch: claude/quirky-lamport-ItzsB`

**Gap:** The `data-surface` system (`base`, `layer`, `overlay`) is implemented in tokens but has no live documentation page; consumers cannot see it in action without reading source code.

- [ ] Create `site/src/pages/tokens/theming.astro` with live `data-surface` examples showing all three surfaces (`base`, `layer`, `overlay`) nested within each other in both themes
- [ ] Document the `data-theme` page-level toggle and the FOWT prevention pattern
- [ ] Add the page to the sidebar nav in `site/src/layouts/DocLayout.astro`

---

## T-06 · Badges documentation page
`status: done` `effort: S` `branch: claude/next-task-planning-irPLH`

**Gap:** Seven badge variants exist in `site/src/styles/site.css` but are undocumented on the site; consumers have no reference for which variant to use when.

- [x] Create `site/src/pages/components/badges.astro`
- [x] Document all 7 variants (general, published, draft, archived, beta, research, category) with live examples and usage guidance
- [x] Add the page to the sidebar nav in `site/src/layouts/DocLayout.astro`

---

## T-07 · Full contrast matrix
`status: done` `effort: S` `branch: claude/t7-readiness-98re3`

**Gap:** Individual contrast ratios are noted on the colors page but no complete matrix covers all semantic token pairs across both light and dark modes.

- [x] Add a full contrast matrix table to `site/src/pages/tokens/colors.astro` (or a dedicated accessibility page)
- [x] Cover every semantic foreground/background combination in light mode and dark mode
- [x] Mark each pair as WCAG AA pass / AAA pass / fail

---

## T-08 · Interactive component tokens — buttons & links (Tier 3)
`status: done` `effort: S` `branch: claude/nifty-keller-ebzbq`

**Gap:** No Tier 3 tokens exist; consumers who want to reskin buttons or links must override implementation details rather than declared intent.

- [x] Create `tokens/components.css` and add `--btn-*` tokens (background, text, border, radius, hover-background)
- [x] Add `@import './components.css';` to `tokens/index.css` and update the build command in `CLAUDE.md` to include `tokens/components.css` in the `cat` concatenation
- [x] Update `site/src/styles/site.css` button styles to consume these tokens instead of direct semantic token references
- [x] Rebuild `dist/farn.css`, update `CHANGELOG.md`, and document the tokens on the buttons component page

---

## T-09 · Container component tokens — cards (Tier 3)
`status: done` `effort: S` `branch: claude/inspiring-feynman-RmCLb`

**Gap:** Card styles reference semantic tokens directly with no component-level override points.

- [x] Add `--card-*` tokens (background, border, radius, padding) to `tokens/components.css` (created in T-08)
- [x] Update site card styles to consume these tokens
- [x] Rebuild `dist/farn.css` and update `CHANGELOG.md`

---

## T-10 · Form component tokens (Tier 3)
`status: done` `effort: S` `branch: claude/festive-johnson-GM06K`

**Gap:** Form element styles have no component-level tokens; inputs cannot be rethemed without overriding semantic-layer values that affect unrelated elements.

- [x] Add `--input-*` tokens (background, border, radius, focus-ring color) to `tokens/components.css` (created in T-08)
- [x] Update site form styles to consume these tokens
- [x] Rebuild `dist/farn.css` and update `CHANGELOG.md`

---

## T-11 · Button component CSS
`status: done` `effort: M` `branch: claude/laughing-franklin-tgp33`

**Depends on T-43** — resolve the component CSS artifact structure first.

**Gap:** No `.btn` CSS classes are shipped in `dist/farn.css`; every consumer must reimplement button styles from scratch using tokens with no reference implementation.

- [x] Add `.btn`, `.btn-p`, `.btn-s`, `.btn-g`, `.btn-d` and size modifiers `.btn-sm`, `.btn-lg` to the existing `tokens/components.css` (or a separate `dist/farn-components.css` artifact — see T-43)
- [x] Button styles must consume T-08 component tokens (`--btn-*`) rather than referencing semantic tokens directly
- [x] Document variants, sizes, and states (hover, focus, active, disabled) on the buttons component page

---

## T-12 · Badge component CSS
`status: done` `effort: S` `branch: claude/nifty-thompson-ukNhW`

**Depends on T-43** — resolved, merged into this task.

**Gap:** Seven `.badge-*` variants exist only in `site/src/styles/site.css` and are not part of the distributed token system.

- [x] Add `.badge` base class and the 7 variant modifiers to the component CSS artifact
- [x] Ensure badge styles use palette tokens directly (as they do now) so variants remain visually distinct across themes
- [x] Document on the badges component page (T-06)

---

## T-13 · Card component CSS
`status: done` `effort: S` `branch: claude/next-tasks-discussion-LxCfX`

**Depends on T-43** — resolve the component CSS artifact structure first.

**Gap:** No `.card` CSS class is shipped; consumers must build card layouts from scratch using T-09 component tokens with no reference implementation.

- [x] Add `.card` base class (and any surface/elevated variants) to the component CSS artifact
- [x] Card styles must consume T-09 `--card-*` tokens
- [x] Document on the cards component page with live examples

---

## T-14 · Form component CSS
`status: done` `effort: M` `branch: claude/t14-design-system-review-1cVkr`

**Depends on T-43** — resolve the component CSS artifact structure first.

**Gap:** No form element CSS is shipped; consumers must style inputs, textareas, selects, and labels from scratch using T-10 component tokens.

- [x] Add base styles for `input`, `textarea`, `select`, `label`, and a `.form-field` wrapper to the component CSS artifact
- [x] Styles must consume T-10 `--input-*` tokens
- [x] Document states (default, focus, error, disabled) on the forms component page

---

## T-15 · Restructure site into three-pillar IA (Phase 1)
`status: done` `effort: L` `branch: claude/magical-noether-gYvBG`

**Gap:** Site navigation and page structure reflect the initial release — a flat 13-item nav, token pages under `/tokens/*`, one page per component, and a landing page embedding a full palette browser. As Farn has grown into a token-first design system with shipped component classes, the IA no longer cleanly separates concepts, token reference, and components.

**Outcome of the audit:** restructure into three pillars — **Foundations** (concepts), **Styles** (token reference), **Components** (shipped classes) — with group-based navigation. Full IA, the 24 decisions, and phasing are recorded in the planning doc. New follow-on work is split into T-44–T-52; the disclosure prerequisite is T-35.

**This task = Phase 1**, shipped as three ordered PRs (1a → 1b → 1c). Clean-break URLs (no redirects). No dead links at any phase boundary — sub-nav lists only built pages.

**Phase 1a — Nav mechanics** ✅ shipped (#... merged)
- [x] Rebuild top nav in `DocLayout.astro`: 3 group links (Foundations / Styles / Components) + 2 CTAs (Demo / Get Started); rework `isActive()` for group prefixes
- [x] Add group sub-nav rendered from a group→pages map (curated order; lists only built pages); active page highlighted with the sliding pill
- [x] Retire the group-sub-nav scrollspy; repurpose `subnav-tracker.js` for a page-internal TOC on long standalone pages (Getting Started)
- [x] Regroup the mobile drawer under the 3 group headings
- [x] Create three group overview pages: `/foundations`, `/styles`, `/components` (Components overview reframed)

_Nav model later extracted to `site/src/data/navigation.ts` (single source of truth) and `SiteNav.astro` (shared by DocLayout + landing) in 1b. The inert `slot="subnav"` TOC markup has been removed from all moved/grouped pages (token + theming in 1b; component pages in 1c). The scroll-padding offset for sticky sub-navs is handled in `DocLayout`._

**Phase 1b — Styles move + Theming split** ✅ shipped (#68 merged)
- [x] Move `/tokens/{colors,typography,spacing,motion}` → `/styles/{color,typography,spacing,motion}`
- [x] Split `/tokens/theming` → `/foundations/surfaces` (concept) + `/styles/theming` (reference)
- [x] Remove the now-inert `slot="subnav"` anchor blocks from the moved token + theming pages; fix all internal links
- [x] _(pulled forward)_ Unify the landing + doc nav via shared `SiteNav.astro`; remove the `data-view="palette"` toggle + palette-browser markup from `index.astro`

**Phase 1c — Home + positioning + README** (this PR)
- [x] Rework `index.astro` → linear Home + condensed palette taste; remove the `data-view="palette"` toggle + Palette View block _(markup removed in 1b; orphaned palette-browser CSS cleaned in 1c)_
- [x] Reconcile the naming collision between landing in-page anchors and the canonical `/foundations` / `/components` group routes — landing nav + footer now use the group routes (done with the SiteNav unification in 1b)
- [x] Update `index.astro`'s standalone nav to match the DocLayout group nav _(done via shared `SiteNav.astro` in 1b)_
- [x] Absorb the distinctive `about.astro` content (etymology, aesthetic direction, design principles, revised "what Farn is / isn't") into the Home; delete `about.astro`
- [x] Propagate positioning copy ("token-first design system + components") to package.json, README, hero, meta; lean README to ~60 lines
- [x] Build the Icons stub (`/styles/icons`); Demo stub already shipped in 1a
- [ ] ~~Extract shared demo container styles + evaluate `DocComponentPage.astro` wrapper~~ → **deferred to T-44**: Phase 2 consolidates the six per-component pages into group pages, which rewrites this markup wholesale; extracting a shared `.demo` class / per-component wrapper now would be throwaway work superseded by that rework

---

## T-16 · Token inspector pattern on component pages
`status: dropped`

**Dropped:** The click-to-copy / hover-overlay pattern is a human browsing behaviour with modest value. Farn is primarily consumed by AI agents, which read source files directly — the token-to-property mapping already exists in `tokens/components.css` and is redundant to restate as visual annotations. The agent-facing information gap (usage rules, HTML patterns, theming recipes) belongs in T-45 (llms.txt), not as DOM overlays.

---

## T-17 · Split dist — tokens-only artifact
`status: done` `effort: S` `branch: claude/wonderful-hopper-cvk4K`

**Gap:** `dist/farn.css` bundles tokens and the base reset together; consumers who manage their own reset cannot import tokens in isolation.

- [x] Create `dist/farn-tokens.css` as a concatenation of `colors.css`, `typography.css`, `spacing.css`, and `dark-light.css` only (no `base.css`)
- [x] Update the build command in `CLAUDE.md` to produce both artifacts
- [x] Add both CDN paths to the getting-started page and `README.md`

---

## T-19 · Symmetric surface system
`status: done` `effort: M` `branch: claude/task-t-05-AbCGl`

**Gap:** The current surface model (`light`, `dark`, `tinted`) is asymmetric and ambiguous: "tinted" has no dark-mode counterpart, there is no sunken/recessed surface, and it is unclear whether surfaces are absolute or relative to the current theme.

Target model — 5 canonical surfaces, each with a clear dark/light equivalent:

| `data-surface` | Light mode | Dark mode |
|---|---|---|
| `light` | base light bg | forced light (override) |
| `light-elevated` | raised/tinted light | raised light (override) |
| `elevated` | one step up from current theme | one step up from current theme |
| `dark-elevated` | forced dark raised | raised dark bg |
| `dark` | forced dark (override) | base dark bg |
| `sunken` | recessed (inputs, code) | recessed (inputs, code) |

> **Implemented:** symmetric 3-surface model — `base` / `layer` / `overlay` — rather than the 6-surface spec above. See `tokens/dark-light.css` for the canonical definition.

- [x] Audit `tokens/dark-light.css` and define the full symmetric token set for all surface contexts (bg, text, text-secondary, border, accent, accent-hover)
- [x] Replace asymmetric `light/dark/tinted` surfaces with symmetric `base/layer/overlay` model; make `[data-theme]` self-contained with `background: var(--color-bg)`; rename `--color-bg-elevated` → `--color-bg-panel` and `--color-bg-sunken` → `--color-bg-inset`
- [x] Verify that every semantic token cascades correctly when a surface overrides the page theme
- [x] Update `CLAUDE.md` dark/light mode documentation and rebuild `dist/farn.css`

---

## T-18 · npm package setup
`status: done` `effort: S` `branch: claude/t23-review-hliBr`

**Gap:** No `package.json` at the repo root; Farn can only be consumed via CDN, not installed as a dependency.

- [x] Add root `package.json` with `name`, `version`, and `exports` pointing to `dist/farn.css` and `dist/farn-tokens.css`
- [x] Add npm installation instructions to `site/src/pages/getting-started.astro` and `README.md`
- [x] Verify the package installs cleanly and exports resolve correctly

---

## T-20 · Review section divider spec
`status: done` `effort: XS` `branch: claude/t-20-task-Hzhwj`

**Gap:** `divider-spec.md` contains six patterns and per-pattern animation decisions that need a design pass before implementation — to confirm which patterns fit Farn's aesthetic, whether the animation tiers are right, and what the implementation order should be.

- [x] Read `divider-spec.md` in full
- [x] Decide which patterns to implement and in what order; annotate this task or the spec directly
- [x] Confirm whether the stacked card reveal fits the current site structure (requires full-viewport sections)

**Decisions:**

All six patterns are confirmed for implementation. Animation tiers match the spec and need no changes.

Aesthetic fitness for Farn (Iron Night / Birch Mist / Forest palette — organic, Nordic, restrained):
- Sine wave ★★★ — organic, rhythmic; highest character fit
- Convex arc ★★★ — quiet, refined; suits centred hero layouts
- Layered overlap ★★★ — pure CSS depth; aligns with structural restraint
- Organic blob ★★☆ — high-emphasis brand moments; path must be Figma-drawn
- Stacked card reveal ★★☆ — cinematic; deferred (see below)
- Diagonal cut ★☆☆ — weakest fit (directional/energetic vs. organic palette); include for CTA utility

Implementation order for T-23–T-28 (after T-21 and T-22 are done):
1. T-26 Layered overlap — pure CSS, no SVG, simplest entry point
2. T-23 Sine wave — most versatile; best Farn character
3. T-24 Convex arc — calm complement; Tier 2 animation
4. T-25 Organic blob — special-occasion; requires Figma path export
5. T-27 Diagonal cut — energetic CTA use; Tier 2 animation
6. T-28 Stacked card reveal — deferred until T-15 (site restructure removes sidebar)

---

## T-21 · Section transition color tokens
`status: done` `effort: XS` `branch: claude/intelligent-planck-0UKbU`

**Gap:** The divider spec references `--color-section-dark`, `--color-section-mid`, `--color-section-light` etc., which are not part of the token system; SVG fills and pseudo-element backgrounds would be hardcoded.

- [x] Add `--color-section-*` aliases to `tokens/dark-light.css` mapped to existing semantic tokens (e.g. `--color-section-dark: var(--color-bg)`)
- [x] Ensure aliases resolve correctly in both light and dark themes
- [x] Rebuild `dist/farn.css` and update `CHANGELOG.md`

---

## T-22 · Scroll-reveal shared infrastructure
`status: done` `effort: S` `branch: claude/zen-euler-WclY9`

**Gap:** No shared scroll-entry animation infrastructure exists; each animated element would need its own observer and transition logic, and the `prefers-reduced-motion` guard would have to be duplicated.

**Depends on T-04** — `.scroll-reveal` transition values must consume `--duration-base` and `--ease-default` from the motion tokens rather than hardcoding `0.6s` and `cubic-bezier(0.4, 0, 0.2, 1)`.

- [x] Add `.scroll-reveal` base class consuming `var(--duration-reveal)` and `var(--ease-out)` from T-04 to `site/src/styles/site.css` (task spec token names corrected — `--duration-reveal` is the semantic match for content reveals; `--ease-out` per industry guidance)
- [x] Add `@media (prefers-reduced-motion: reduce)` guard covering `.scroll-reveal`
- [x] Create `site/src/scripts/scroll-reveal.js` with the shared `IntersectionObserver` (threshold: 0.15, configurable, unobserve after first reveal)
- [x] Wire the script into Astro's client-side loading (DocLayout.astro + index.astro)

---

## T-23 · Sine wave divider
`status: done` `effort: S` `branch: claude/next-task-discussion-ZE0nK`

**Gap:** No section divider patterns exist in the system; the sine wave is the most versatile and character-appropriate organic transition for Farn's aesthetic.

- [x] Implement `.section-wave` CSS and two-path SVG markup per spec (depth layer first in source order)
- [x] Apply Tier 1 scroll-reveal animation (`translateY(24px)` → `0` + opacity, 0.1s delay) using T-22 infrastructure
- [x] Verify `preserveAspectRatio="none"` and `aria-hidden="true"` are present
- [x] Document on the dividers component page (T-29)

---

## T-24 · Convex arc divider
`status: done` `effort: S` `branch: claude/affectionate-bohr-p4HDs`

**Gap:** No arc divider; the quadratic bezier arc is calmer than the sine wave and suits refined, centred hero layouts.

- [x] Implement `.section-arc` CSS and both convex and concave SVG variants per spec
- [x] Apply Tier 2 `clip-path` expand animation with `animation-timeline: view()` and `@supports not` fallback (static arc)
- [x] Apply the concave bug fix: redrawn path (`Q600,80` control point below baseline) instead of `scaleY(-1)` on wrapper; concave variant always static via `.section-arc--concave` modifier
- [x] Document on the dividers component page (T-29)

---

## T-25 · Organic blob divider
`status: done` `effort: S` `branch: claude/next-ready-task-kqPeX`

**Gap:** No blob divider; the organic shape serves high-emphasis brand moments and one-off expressive transitions.

- [x] Implement `.section-blob` CSS and example two-path SVG per spec
- [x] Apply Tier 1 fade-only animation (opacity only — no translate, no morph) using T-22 infrastructure
- [x] Document that blob paths should be drawn in Figma/Inkscape and exported, not hand-authored
- [x] Document in the "Section Transitions" section of `/components/layout` (T-29 merged into T-44)

---

## T-26 · Layered overlap pattern
`status: done` `effort: S` `branch: claude/next-tasks-queue-veheg`

**Gap:** No layered overlap pattern; it is the only pure-CSS divider in the spec and creates depth without any SVG.

- [x] Implement both Option A (full section overlap) and Option B (card overlap) CSS per spec
- [x] Apply Tier 1 card lift animation (`translateY(40px)` → `0` + opacity + `box-shadow` grow) using T-22 infrastructure
- [x] Document the `overflow: visible` requirement on the preceding section to avoid the common clipping mistake
- [x] Document on the dividers component page (T-29)

---

## T-27 · Diagonal cut divider
`status: done` `effort: S` `branch: claude/task-27-review-plan-Lx00z`

**Gap:** No diagonal cut pattern; the energetic directional transition suits CTAs and momentum-forward page moments.

- [x] Implement all three approaches from spec: `clip-path` polygon, `::before skewY`, and SVG triangle
- [x] Apply Tier 2 angle-flattening animation (`skewY(-5deg)` → `0deg`) with `animation-timeline: view()` and static fallback
- [x] Document the `clip-path` + `box-shadow` incompatibility and when to use the `::before` approach instead
- [x] Document in the "Section Transitions" section of `/components/layout` (T-29 merged into T-44)

---

## T-28 · Stacked card reveal
`status: done` `effort: S` `branch: claude/dreamy-ride-I8Sqt`

**Note:** T-15 is complete. The site uses a top nav + group sub-nav — no traditional sidebar. Before picking up, verify that full-viewport sticky sections (`height: 100vh`) are compatible with the current layout (group sub-nav bar, scroll-padding offset).

**Gap:** No stacked card reveal pattern; the cinematic depth effect is the highest-drama transition in the spec, suited to long scrolling pages with 3–5 landmark sections.

- [x] Implement `.stack-container` and `.stack-section` with `--stack-depth` and `--stack-index` CSS custom properties per spec
- [x] Verify sticky positioning behaviour across Chrome, Firefox, and Safari; document the `height: N×100dvh` requirement
- [x] Document content-height constraint (sections must fit within `100dvh`) and the 3–5 section limit
- [x] Document in the "Section Transitions" section of `/components/layout` (T-29 merged into T-44)

---

## T-29 · Section divider documentation page
`status: done` `effort: M` `merged: T-44`

**Completed in T-44:** Section transitions documentation is now in `/components/layout.astro` as part of the group consolidation. The three shipped patterns (sine wave, convex arc, layered overlap) are documented with live demos, anatomy, token reference, and CSS reference under a "Section Transitions" `<h2>`. Status badge is `beta` — the remaining three patterns (organic blob T-25, diagonal cut T-27, stacked card reveal T-28) are coming-soon items in the same section.

- [x] Document each implemented pattern with live demos
- [x] Include animation notes per pattern
- [x] Add pattern-selection guidance
- [x] Page accessible via sidebar nav (grouped under Components › Layout)

---

## T-30 · Typography utility classes
`status: done` `effort: S` `branch: claude/t30-review-kaOPg`

**Gap:** Font and size tokens exist but there are no utility classes; consumers must manually reapply the type scale (including the mandatory Fraunces `font-variation-settings`) every time they build a new surface.

- [x] Add `.text-display`, `.text-h1`, `.text-h2`, `.text-h3`, `.text-body`, `.text-caption`, `.text-mono` classes consuming `--font-*` tokens and `clamp()` sizes from the documented type scale
- [x] Every Fraunces class must include `font-variation-settings: 'opsz' <value>` — this is a hard requirement per CLAUDE.md
- [x] Add to the component CSS artifact and document on the typography page
- [x] Introduce component-level typography tokens (`--input-font-size`, `--label-font-size`, `--btn-font-size`, `--btn-sm-font-size`, `--btn-lg-font-size`) in `tokens/components.css` and replace the hardcoded `font-size` values in `tokens/component-classes.css` — deferred from T-14 and T-11 because fixing one without the other creates inconsistency

---

## T-31 · Table styles
`status: done` `effort: S` `branch: claude/task-31-review-plan-d3HYZ`

**Gap:** No table styles exist anywhere in the system; tabular data is one of the most common UI patterns and must be reinvented by every consumer.

- [x] Add `.table` base class with border, cell padding, and header styles consuming semantic tokens
- [x] Add `.table-striped` variant using `--color-bg-panel` on alternating rows
- [x] Add `.table-hover` variant for row hover highlight
- [x] Add `.table-sm` / `.table-lg` density variants
- [x] Document the `overflow-x: auto` scroll wrapper pattern for narrow viewports
- [x] Document on the Data component page

---


## T-33 · Code block styles
`status: done` `effort: S` `branch: claude/code-block-copy-button-gHUyY`

**Gap:** `--color-bg-code` and `--font-mono` tokens exist but no `.code-block` or `.inline-code` CSS classes are shipped; code formatting is reinvented by every consumer.

- [x] Add `.code-block` (block-level, scrollable) and `.inline-code` (inline) CSS classes consuming `--code-*` tokens, `--font-mono`, and `--radius-*` tokens
- [x] Add `--code-*` Tier 3 tokens (background, text, border) to `tokens/components.css` so consumers can retheme code blocks independently
- [x] Document on the Data component page; includes copy-to-clipboard button (`.code-copy-btn`) shipped in CSS + reference JS in `site/src/scripts/code-copy.js`

---

## T-34 · Tabs component
`status: done` `effort: M` `branch: claude/fervent-mendel-uaOMZ`

**Gap:** Tabs are one of the three most common navigation components and are entirely absent from the system.

- [ ] Add `--tab-*` Tier 3 tokens (active-border, active-text, inactive-text, panel-background) to `tokens/components.css`
- [ ] Add `.tabs`, `.tab-list`, `.tab`, and `.tab-panel` CSS classes to the component artifact
- [ ] Implement CSS-only active state via `:checked` on radio inputs for no-JS usage; document the ARIA `role="tablist"` JS enhancement separately
- [ ] Document all states (default, active, hover, focus, disabled) on a tabs component page

---

## T-35 · Accordion / disclosure
`status: done` `effort: S` `branch: claude/lucid-volta-rTzVK`

**Gap:** No expandable content pattern; accordions are ubiquitous for FAQs, settings panels, and nested navigation.

- [x] Build on native `<details>` / `<summary>` — no JS required for core functionality
- [x] Add `--accordion-*` Tier 3 tokens (border, summary-background, panel-background) to `tokens/components.css`
- [x] Include a CSS animated height transition using `interpolate-size: allow-keywords` with a static-reveal fallback for older browsers
- [x] Document on an accordion component page

---

## T-36 · Breadcrumbs
`status: done` `effort: XS` `branch: claude/happy-albattani-RkUpI`

**Gap:** No breadcrumb navigation pattern; a basic wayfinding component missing from any multi-level site.

- [x] Add `.breadcrumb` and `.breadcrumb-item` styles with a CSS `::after` separator consuming `--color-text-secondary`
- [x] Current page item uses `--color-text`; preceding items use `--color-text-secondary` — both must adapt per surface
- [x] Document correct `aria-label="Breadcrumb"` and `aria-current="page"` markup on the component page

---

## T-37 · Pagination
`status: done` `effort: S` `branch: claude/vibrant-turing-7y1Ar`

**Gap:** No pagination pattern; any list or data view spanning multiple pages has no reference implementation.

- [x] Add `--pagination-*` Tier 3 tokens (active-background, active-text, border, radius, gap) to `tokens/components.css`
- [x] Add `.pagination`, `.page-item`, and `.page-link` CSS classes with active (`aria-current="page"`), hover, focus-visible, disabled (`aria-disabled="true"`) states; `.pagination-outlined` variant; `.page-ellipsis` for truncated ranges
- [x] Document in Components › Navigation with numbered, ellipsis, prev/next, and outlined live demos; full anatomy, accessibility, token reference, and CSS reference

---

## T-38 · Tooltip
`status: done` `effort: S` `branch: claude/hopeful-darwin-geBKe`

**Gap:** No tooltip pattern; a basic affordance used for labels, abbreviations, and icon-only buttons has no implementation.

- [ ] Implement CSS-only tooltip via `[data-tooltip]` attribute and `::before` / `::after` pseudo-elements; no JS for hover
- [ ] Add `--tooltip-*` Tier 3 tokens (background, text, max-width) to `tokens/components.css`
- [ ] Document the limitation: CSS-only tooltips do not respond to keyboard focus; document the JS enhancement needed for `focus-visible` support
- [ ] Document on a tooltip component page

---

## T-39 · Loading states — skeleton & spinner
`status: done` `effort: S` `branch: claude/hopeful-hamilton-4VDxg`

**Gap:** Farn has no visual language for async or in-progress states; loading feedback must be built from scratch by every consumer.

- [x] Add `.spinner` (rotating ring) using `@keyframes` and consuming `--color-accent` and T-04 `--duration-*` tokens; sm/lg size modifiers
- [x] Add `.skeleton` (shimmer placeholder) using a CSS gradient animation for the loading shimmer effect; `.skeleton-circle` variant
- [x] Both respect `prefers-reduced-motion`: spinner stops, skeleton renders as a static tinted block
- [x] Add `.btn-loading` state modifier; documented in Components › Actions
- [x] Document on Components › Status with live demos, anatomy, accessibility guidance, and token/CSS reference

---


## T-41 · Motion tokens documentation page
`status: done` `effort: XS` `branch: claude/beautiful-ramanujan-jaOUa`

**Gap:** `tokens/motion.css` was added in T-04 but no `site/src/pages/tokens/motion.astro` exists; `--duration-*` and `--ease-*` tokens are invisible to consumers browsing the documentation site.

- [x] Create `site/src/pages/tokens/motion.astro` with a table of all duration and easing tokens, descriptions, and usage guidance
- [x] Add the page to the sidebar nav in `site/src/layouts/DocLayout.astro`
- [x] Update `CHANGELOG.md`

---

## T-42 · Update palette SVG
`status: done` `effort: XS` `branch: claude/serene-goldberg-NsJKD`

**Gap:** `.github/farn-palette.svg` (displayed in README) uses the old palette name "Parchment" for what is now "Birch" (`--bm2-birch`); misleads users reading the repository page.

- [x] Update SVG text labels to current palette names (Birch Mist: Sand, Mist, Birch)
- [x] Verify the image renders correctly in the README on GitHub

---

## T-43 · Decide component CSS artifact structure
`status: done` `effort: XS` `branch: claude/nifty-thompson-ukNhW`

**Merged into T-12.** Decision: separate `dist/farn-components.css` artifact. Classes source in `tokens/component-classes.css`. Tokens stay in `tokens/components.css` and `farn-tokens.css` remains class-free.

**Gates: T-11, T-12, T-13, T-14**

- [x] Review tradeoffs: single `tokens/components.css` (simpler, already exists) vs separate `dist/farn-components.css` (opt-in, keeps tokens and classes separate) vs both
- [x] Document the decision in `CLAUDE.md` Track A (update the open question in the "Adding a component" section)
- [x] Update `CHANGELOG.md`

---

## T-44 · Component group consolidation (T-15 Phase 2)
`status: done` `effort: L` `branch: claude/bold-ride-uL9E1`

**Gap:** Under the three-pillar IA (T-15), the six per-component pages must consolidate into six component group pages with the confirmed template (preview + short notes visible; full anatomy/usage/CSS in a shipped-disclosure collapsible per section).

**Gates: T-15, T-35**

- [x] Build the 6 group pages: `/components/{layout,navigation,actions,forms,data,status}` (curated order)
- [x] Absorb `buttons→actions`, `badges→data`, `cards→layout`, `forms→forms`, `breadcrumbs→navigation`, `dividers→layout`; rename Dividers → "Section Transitions"
- [x] Resolve "Links" first-class question (standalone link styling vs button variant; `--link-*` tokens exist)
- [x] Render coming-soon components inline in logical order with a "coming soon" `.badge`; Status group ships as an all-placeholder roadmap page
- [x] Component URL clean-break here; remove old per-component pages and fix internal links

---

## T-45 · llms.txt + Getting Started AI section
`status: done` `effort: S` `branch: claude/epic-dijkstra-3Jl5c`

**Gap:** No machine-readable guide for AI agents building products *with* Farn (distinct from `CLAUDE.md`, which is for agents developing Farn).

- [x] Create `llms.txt` at repo root (llmstxt.org format: pitch → install → core rules → linked docs)
- [x] Add `llms.txt` to `package.json` `files[]`; ensure it serves at `farn.jbpt.de/llms.txt`
- [x] Add a "For AI agents" section to Getting Started linking to it + a copyable sample prompt
- [ ] (Optional) richer `llms-full.txt` with the complete token dump — deferred

---

## T-46 · Demo page — full guided tour
`status: dropped`

**Dropped:** A separate demo page creates maintenance debt (must stay in sync with each component page). The better approach is to make the component docs pages themselves demo-first: live examples visible by default, technical reference in collapsibles. See T-55 for the rollout.

---

## T-47 · Quote / blockquote component
`status: done` `effort: S` `branch: claude/next-task-planning-lyR12`

**Gap:** The landing page demos a blockquote/pullquote pattern but no `.quote` class ships in `farn-components.css`; it's undocumented.

- [ ] Add `--quote-*` Tier-3 tokens to `tokens/components.css`; add `.quote` classes to `tokens/component-classes.css`
- [ ] Run the 4-file build; update `CHANGELOG.md`
- [ ] Document on a component group page (Data or Layout — decide during build)

---

## T-48 · Separator (content-level divider)
`status: done` `effort: XS` `branch: claude/confident-pascal-cjXcn`

**Gap:** Content-level horizontal rules are used throughout prose but not tokenised/documented (distinct from the section-transition divider patterns).

- [x] Add `<hr>` / `.separator` variants using border tokens to `tokens/component-classes.css`
- [x] Run the 4-file build; update `CHANGELOG.md`
- [x] Document in Components > Layout

---

## T-49 · Complete Foundations section
`status: done` `effort: S` `branch: claude/practical-heisenberg-meRtl`

**Gap:** Three concept pages are missing from Foundations — the overview links to them but they 404. All three are purely documentary (no new CSS) and are the same effort tier, so they ship together.

_(T-50 · Foundations > Layout and T-51 · Foundations > Responsive merged here.)_

- [x] Create `site/src/pages/foundations/accessibility.astro`: WCAG AA commitment (Ash AA-large-only), `:focus-visible` ring, `prefers-reduced-motion`, don't-rely-on-colour-alone; link to the WCAG matrix on Styles > Color
- [x] Create `site/src/pages/foundations/layout.astro`: content-first widths, page-structure skeleton, grid pattern, radius-as-hierarchy; values cross-linked to Styles > Spacing
- [x] Expand `site/src/pages/foundations/responsive.astro`: reflow-by-content philosophy, fluid `clamp()` type callout
- [x] Add Layout and Accessibility to `site/src/data/navigation.ts` under Foundations
- [x] No new CSS — documents existing token behaviour

---

## T-50 · Foundations > Layout page
`status: done` `merged: T-49`

Merged into T-49 (Complete Foundations section).

---

## T-51 · Foundations > Responsive page
`status: done` `merged: T-49`

Merged into T-49 (Complete Foundations section).

---

## T-52 · Styles > Icons guide
`status: done` `effort: XS` `branch: claude/epic-davinci-7sxTf`

**Gap:** Farn ships no icon set; consumers have no guidance on using a third-party library with Farn tokens. The Phase-1 stub needs full content.

- [x] Replace the stub with: rationale for not bundling icons, recommended libraries, and how to size/colour icons with `--space-*` / `--color-*` tokens

---

## T-53 · Landing page redesign
`status: done` `effort: M` `branch: claude/hopeful-ride-2nxrag`

**Gap:** The current `index.astro` is 7 sections long and tries to serve as both a marketing page and a component demo. It dilutes the first impression, and with T-46 (guided demo page) on the horizon the overlap becomes actively unhelpful. A focused editorial redesign will shorten the page, sharpen the message, and direct visitors to the right next step.

**Target structure — 7 sections:**
1. **Hero** — value prop + 2 CTAs (Demo / Get Started); preserve animated fade-in and transparent-to-filled nav behaviour
2. **About** — etymology ("from Old Saxon *farn*") + palette mood; condensed from current (2–3 sentences max + swatches), not removed
3. **The System** — 3-column: Tokens → Semantic layer → Components. Explains the architecture at a glance
4. **Palette + Typography** — condensed colour moment (swatches + palette names) + one Fraunces specimen line. Palette taste, not a full browser.
5. **Tokens in action** — one component shown across `data-surface="base"`, `"layer"`, `"overlay"` with a live light/dark toggle; the "aha" for the token-first story
6. **What you get** — 3 items: CSS tokens · Component classes · Zero dependencies
7. **Closing CTA** — mirrors hero

**Cut from current page:** spacing scale specimen, exhaustive component rows (buttons + badges + forms + dividers + quotes), surfaces grid, principles cards. This content belongs in the demo page and docs.

- [x] Rework `index.astro` to the 7-section structure; remove all cut sections and their associated inline styles
- [x] "Tokens in action" section: light/dark toggle reuses `data-theme` toggle, no new JS
- [x] Carry forward all existing animation infrastructure (scroll-reveal, hero fade-in, transparent nav)
- [x] Ensure zero dead links after cleanup; update landing page meta description

---

## T-54 · Breakpoint tokens
`status: done` `effort: XS` `branch: claude/t54-Z56eJ`

**Gap:** `@media (max-width: 640px)` appears ~9 times across `site/src/styles/site.css` and individual page `<style>` blocks as a hardcoded pixel value. No corresponding token exists — changes to the mobile breakpoint require a site-wide grep-and-replace, and new pages add another hardcoded instance each time.

- [x] Add `--breakpoint-mobile: 640px` (and optionally `--breakpoint-tablet`) to `tokens/spacing.css`
- [x] Replace all `max-width: 640px` media query values in `site/src/styles/site.css` and page-scoped styles with the token (CSS `env()` / custom properties in `@media` require native support — use the token as a reference value in comments, or evaluate `postcss-custom-media` if the build supports it)
- [x] Document the breakpoints in `site/src/pages/foundations/responsive.astro` (T-49)

---

## T-55 · Demo-first docs — roll out to all component pages
`status: done` `effort: M` `branch: claude/dreamy-allen-uula6q`

**Gap:** Following T-46 drop, the proof-of-concept on `actions.astro` and `layout.astro` (cards) establishes the pattern: live demos visible by default, technical reference (anatomy HTML, token tables, override snippets) in `<details>` collapsibles. Remaining component pages still bury some demos inside accordions.

- [x] `components/actions.astro` — button sizes, states, loading demos moved outside accordion; variants table simplified (no inline live buttons)
- [x] `components/layout.astro` — card anatomy demo (media/header/body/footer) moved outside accordion
- [x] `components/navigation.astro` — audited; all demos already outside accordions, no changes needed
- [x] `components/forms.astro` — promoted states (default/error/disabled) and wrapper+hint demos outside accordion
- [x] `components/data.astro` — audited; all demos already outside accordions, no changes needed
- [x] `components/status.astro` — audited; loading states demo already outside accordion, no changes needed

---

## T-56 · Overview pages — live mini-demo card grid
`status: backlog` `effort: M`

**Gap:** The three group overview pages (`/foundations`, `/styles`, `/components`) are flat lists of headings and links — no visual hierarchy, no sense of what each page contains. Visitors can't quickly assess which section is relevant to their task.

**Target:** A responsive card grid where each card renders a small live CSS preview of a representative component or concept, plus a headline and one-sentence description. The card acts as a link. No static screenshots — live renders only so cards never go stale.

**Before coding:** Review how Radix Themes, shadcn/ui, Primer, and IBM Carbon structure their overview / getting-started gallery pages. Decide on card layout (2-col vs 3-col, whether previews are full-card-height or a top strip).

- [ ] Implement live-preview card component (inline in overview pages or as a shared Astro component if reused across all three)
- [ ] Apply to `site/src/pages/foundations/index.astro`, `styles/index.astro`, `components/index.astro`
- [ ] Each card: group name, description, live CSS mini-demo, links to group page
- [ ] Mobile: single column

**Complexity gate:** Adds a new shared Astro component — review before coding.

---

## T-57 · Layout › card highlight dark-mode contrast fix
`status: done` `effort: XS` `branch: claude/relaxed-lovelace-0o1jxn`

**Gap:** `.card-highlight` in dark mode is visually indistinguishable from `.card-outlined` — both show `--in1-iron` background with a `--in2-slate` border. In light mode the high-contrast dark fill makes the variant immediately recognisable; in dark mode it blends in.

- [ ] Review `--card-highlight-bg` and `--card-highlight-border` dark-mode values in `tokens/dark-light.css`
- [ ] Increase dark-mode contrast for highlight variant — consider using `--in0-void` bg or a stronger border token
- [ ] Verify light-mode appearance is unaffected; rebuild and update `CHANGELOG.md`

---

## T-58 · Layout › section transitions — promote demos + fix diagonal cut
`status: done` `effort: S` `branch: claude/relaxed-ramanujan-ox5i1u`

**Gap:** Only the sine wave demo is visible outside the accordion. The layered overlap, diagonal cut, organic blob, and arc demos are buried inside the collapsible. Additionally, the diagonal cut demo appears broken in light mode (renders as a horizontal rule, no visible angle), and the "Approaches 1/2/3" language suggests the implementation may be partially documented as aspirational rather than shipped.

**Before coding:** Audit which section-transition classes are actually shipped in `dist/farn-components.css`. Verify each demo renders correctly in both themes.

- [ ] Move each pattern's sandbox demo outside the accordion, following the sine wave section as a template — each pattern gets its own `<h3>` subsection with a visible demo
- [ ] Fix `.section-skew` in light mode — diagnose why the diagonal angle is not visible and correct the CSS or demo markup
- [ ] Audit and correct any "Approach X" language that describes unimplemented variants; remove or mark as planned
- [ ] Keep the accordion for code examples, token tables, and implementation notes only
- [ ] Update `CHANGELOG.md`

---

## T-59 · Layout › separator visual hierarchy
`status: done` `effort: XS` `branch: claude/relaxed-lovelace-0o1jxn`

**Gap:** `.hairline` and `.section-divider` are visually identical. `.decorative` is only distinguishable by its short width and accent colour — its weight doesn't read as "accent" at a glance. The pullquote `::before` rule already produces a well-weighted decorative line; reusing it would improve consistency and reduce duplication.

- [ ] Increase `.section-divider` visual weight — either border thickness (2px → 3px) or opacity, enough to clearly differ from `.hairline` at a glance
- [ ] Make `.decorative` match the pullquote accent rule proportions — same thickness and visual weight, short width retained
- [ ] Refactor: have `.quote-pull::before` consume the same tokens as `.decorative` so there is one source of truth for the accent rule style
- [ ] Update token values in `tokens/components.css` and classes in `tokens/component-classes.css`; rebuild; update `CHANGELOG.md`

---

## T-60 · Layout › testimonial card rework
`status: backlog` `effort: S`

**Gap:** The `.quote-attribution` component (renamed `.testimonial` or `.quote-testimonial`) has visual issues: quote text in italic+bold is hard to read, name/role line spacing is excessive, and the layout feels unbalanced. The component name "attribution card" is non-standard and hard to discover.

**Before coding:** Research testimonial card patterns in Flowbite, Tailwind UI, HyperUI, and Mantine. Note common patterns: avatar placement, quote text style (italic but not bold is most common), compact name+role stack, border/background treatment. Agree on the foundation before implementing.

- [ ] Rename `.quote-attribution` → `.quote-testimonial` (or decide final name during research); update all usages in the docs site
- [ ] Rework the card layout based on research findings — fix italic+bold quote text, tighten name/role spacing
- [ ] Add `--quote-testimonial-*` tokens (or update existing `--quote-attr-*`) to `tokens/components.css`
- [ ] Update `tokens/component-classes.css`; rebuild; update docs page and `CHANGELOG.md`

**Complexity gate:** Component rename is a breaking change — document in CHANGELOG.

---

## T-61 · Navigation › remove pagination outline variant
`status: done` `effort: XS` `branch: claude/relaxed-ramanujan-ox5i1u`

**Gap:** The pagination outline variant adds visual noise without a clear use case distinct from the default. Fewer variants reduces decision fatigue for consumers.

- [ ] Remove `.pagination-outline` CSS class from `tokens/component-classes.css` and related tokens from `tokens/components.css`
- [ ] Remove the outline variant demo and reference from `site/src/pages/components/navigation.astro`
- [ ] Rebuild; update `CHANGELOG.md`

---

## T-62 · Forms › input border on non-base surfaces + state demos
`status: done` `effort: S` `branch: claude/relaxed-ramanujan-ox5i1u`

**Gap:** The idle input border is `transparent` by default (`--input-border: transparent` in `tokens/components.css`), so inputs are indistinguishable from plain text on low-contrast surfaces. Additionally, even when a visible border is set, `--color-border` becomes invisible on `layer` or `overlay` surfaces (border blends into panel background). The forms docs only show the default state — focus, error, disabled, and readonly states are undocumented.

**Plan:** Change `--input-border` default to `var(--color-border)` so inputs have a visible boundary at rest. Then address surface-relative contrast as a separate concern.

**Before coding:** Check how Material Design, Primer, and Ant Design handle input borders across surfaces and document their approach. Note whether they use surface-relative border tokens or a fixed-contrast approach.

- [ ] Change `--input-border` default from `transparent` to `var(--color-border)` in `tokens/components.css`
- [ ] Fix: define surface-aware border behaviour for inputs — either via `--input-border` value in `data-surface` overrides in `tokens/dark-light.css`, or by using a higher-contrast base token
- [ ] Extend the forms demo: add visible examples of focus, `aria-invalid` error, disabled, and readonly states — all outside the accordion
- [ ] Update `tokens/components.css`, `tokens/component-classes.css`, and `site/src/pages/components/forms.astro`; rebuild; update `CHANGELOG.md`

---

## T-63 · Data › table striped/default distinction + density improvement
`status: done` `effort: S` `branch: claude/relaxed-ramanujan-ox5i1u`

**Gap:** The default and striped table variants appear identical — the alternating row background either isn't rendering or lacks sufficient contrast. Additionally the compact/comfortable density difference is minimal and doesn't reflect standard table density conventions.

**Before coding:** Check how Primer, IBM Carbon, Ant Design, and Material Data Tables implement striped rows and density tiers. Note typical padding values for each tier.

- [ ] Diagnose the striped row rendering — verify `--table-stripe-bg` token value and whether `:nth-child(odd/even)` is firing correctly
- [ ] Increase stripe contrast if needed; confirm it works on base, layer, and overlay surfaces
- [ ] Revise compact/comfortable padding to match common conventions found in research (e.g. Carbon: compact 24px row, default 48px, spacious 64px)
- [ ] Update demos to show all density tiers side-by-side outside the accordion
- [ ] Update `tokens/components.css`, `tokens/component-classes.css`; rebuild; update `CHANGELOG.md`

---

## T-64 · Status › calm loading animations + fix skeleton surface colours
`status: done` `effort: XS` `branch: claude/relaxed-lovelace-0o1jxn`

**Gap:** The spinner rotates too fast and the skeleton shimmer animation is too quick — both feel anxious rather than calm, which conflicts with the Farn design system's "sharp, warm, intellectual" character. Skeleton colours are also fixed palette values rather than surface-relative, so they don't adapt on `layer`/`overlay` surfaces.

**Before coding:** Note the animation speed used by GitHub, Linear, and Notion for their loading spinners and skeleton screens. Target a "calm but perceptible" speed.

- [ ] Increase `--spinner-duration` (suggest 1.2s–1.5s; current value TBD from audit)
- [ ] Increase skeleton shimmer duration to match
- [ ] Make `--skeleton-base` and `--skeleton-shine` surface-aware — define per-surface overrides in `tokens/dark-light.css` so skeletons adapt on `layer`/`overlay` as they do on `base`
- [ ] Update `tokens/components.css` and `tokens/dark-light.css`; rebuild; update `CHANGELOG.md`

---

## T-65 · Foundations › Surfaces + Theming merge and overhaul
`status: done` `effort: M` `branch: claude/task-prioritization-bundling-jiqvdd`

**Gap:** The surface system is split across two pages — concept and demo in `/foundations/surfaces`, token reference in `/styles/theming` — which forces visitors to navigate between pages to understand the full picture. Additionally the current Surfaces page had a broken composition demo.

**Decision:** Merge both pages. `/foundations/surfaces` becomes the single authoritative page covering concept, live demo, and token reference. `/styles/theming` is deleted (no redirect).

- [x] Merge all content from `styles/theming.astro` into `foundations/surfaces.astro`
- [x] Delete `site/src/pages/styles/theming.astro`
- [x] Remove Theming from `site/src/data/navigation.ts` Styles group
- [x] Fix the composition demo — one adaptive panel, one always-dark panel; the contrast makes the feature clear
- [x] Make Surfaces demo-first: live demos with badges + buttons to show token cascade; token tables in accordion
- [x] Fixed CSS bug: `data-theme="light" data-surface="x"` inside a dark page now resolves correctly — added missing light-override rules to `dark-light.css`
- [x] Update all internal cross-links to `/styles/theming`; update `CHANGELOG.md`

---

## T-66 · Foundations › layout — review, research, and demo
`status: done` `effort: M` `branch: claude/task-prioritization-bundling-jiqvdd`

**Gap:** The Layout foundations page documents existing patterns but has no live demos.

- [x] Audit current layout tokens — no new tokens needed, existing set is complete
- [x] Added visual demos: proportional width bars, semantic-landmark wireframe, live auto-fill card grid, radius hierarchy row, z-index stacking ladder
- [x] Reference tables moved into accordions; demos all outside accordions (demo-first)
- [x] No new CSS classes added — all demos use inline styles and existing tokens
- [x] Update `CHANGELOG.md`

---

## T-67 · Foundations › responsive — define strategy + breakpoint demos
`status: done` `effort: S` `branch: claude/stoic-mayer-wq9wz8`

**Gap:** The responsive page is text-only with no visual demos. Breakpoint tokens were added in T-54 but are not demonstrated. The responsive philosophy is stated but not illustrated.

**Before coding:** Review how Bootstrap, Tailwind, and IBM Carbon document responsive systems — particularly whether they use live resize demos, iframe previews, or static breakpoint tables. Decide which approach is feasible within the Astro/CSS-only constraint.

- [x] Add a visual breakpoint scale — show `--breakpoint-mobile` and any tablet token as labelled bars (similar to spacing scale visualisation)
- [x] Add at least one live demo that changes visibly at the mobile breakpoint (e.g. a card-grid collapsing to single column)
- [x] Ensure the reflow-by-content philosophy is illustrated, not just stated
- [x] Update `CHANGELOG.md`

---

## T-68 · Foundations › accessibility — consolidate and make visual
`status: done` `effort: S` `branch: claude/stoic-mayer-wq9wz8`

**Gap:** Accessibility content is thin and spread across pages — the WCAG contrast matrix lives on the Color page, not on Accessibility. The key design system commitments (AA minimum, `focus-visible`, `prefers-reduced-motion`) are stated but not made prominent. No inline colour swatches exist alongside hex codes.

**Before coding:** Review how Primer, USWDS (US Web Design System), and Atlassian structure their accessibility documentation. Note how they present contrast ratios visually.

- [x] Move the WCAG contrast matrix from `styles/color.astro` to `foundations/accessibility.astro` (Color page links to Accessibility for the full matrix)
- [x] Add inline colour preview chips alongside hex values in the contrast table — small CSS-rendered squares showing the actual colour
- [x] Make the three key commitments (AA, focus-visible, reduced-motion) visually prominent at the top of the page — not buried in a list
- [x] Update `CHANGELOG.md`

---

## T-69 · Styles › color page — visual palette redesign
`status: backlog` `effort: M`

**Gap:** The color page presents palettes as plain token tables — visually flat, hard to use as a design reference. Consumers want to see the colours, not read hex strings.

**Target per palette section:** (1) A large rendered swatch strip with click-to-copy hex; (2) Below it: one card per colour showing the swatch, token name, hex value, and role tags (e.g. `bg` `text` `accent` `border` `interactive`).

**Before coding:** Review how Tailwind, Radix, IBM Carbon, and Primer visualise their colour palettes. Decide on the role tag taxonomy — agree on a short fixed set of tags that apply across all tokens.

- [ ] Implement click-to-copy for hex values (small JS snippet or CSS-only with `data-clipboard` approach)
- [ ] Build the swatch strip and per-colour card layout
- [ ] Define and apply role tags to every palette token — note: card highlight bg is `--fo2-forest` (light) and `--fo0-glade` (dark); `--fo3-deepwater` is code block bg + active accent state only
- [ ] Preserve the existing semantic token mapping tables — move to an accordion Reference section
- [ ] Update `CHANGELOG.md`

**Complexity gate:** Effort M, involves `colors.css` cross-reference — review plan before coding.

---

## T-70 · Styles › typography — restructure and add visual demos
`status: backlog` `effort: M`

**Gap:** The typography page mixes reference tables and demos without a clear hierarchy. Font stacks are shown as a table rather than as rendered specimens. The type scale, heading styles, and body styles lack visible size/weight demonstrations.

**Before coding:** Review how Primer, IBM Carbon, and Atlassian Typography pages are structured. Note how they show font families (as large rendered text) and the type scale (as a visual ladder of sizes).

- [ ] Restructure page to follow the blueprint: all rendered demos outside accordion, code/tokens inside
- [ ] Font stacks: replace the table with large rendered specimens — each font family shown at display size with its name and token
- [ ] Type scale: show every step rendered at its actual size in a vertical ladder (not a table)
- [ ] Heading styles, body styles, and utility classes: show each rendered, not just described
- [ ] Ensure every Fraunces usage includes `font-variation-settings: 'opsz' <value>`
- [ ] Update `CHANGELOG.md`

---

## T-71 · Styles › spacing — visualise the scale
`status: done` `effort: S` `branch: claude/cool-gates-c2zoxl`

**Gap:** The spacing page is a table of token names and rem values — nothing is rendered. Consumers cannot quickly understand the proportional relationships between steps or judge which token to reach for.

**Before coding:** Review how IBM Carbon, Primer, and Tailwind visualise spacing scales. Common patterns: horizontal bars proportional to value, or a grid of boxes each labelled with its token.

- [ ] Add a visual spacing scale: each token rendered as a proportional bar or box with the token name, rem value, and px value shown
- [ ] Optionally: show each token in context (e.g. as padding inside a card-shaped container)
- [ ] Keep the reference table in an accordion below the visual
- [ ] Update `CHANGELOG.md`

---

## T-72 · Styles › motion — fix broken previews and improve visualisation
`status: done` `effort: S` `branch: claude/cool-gates-c2zoxl`

**Gap:** The motion page demos do not animate — nothing moves. Additionally the page only documents `--duration-*` and `--ease-*` tokens but does not confirm whether all in-use motion in the design system is covered.

**Before coding:** Review how Material Design, Apple HIG web docs, and IBM Carbon demonstrate easing and duration. Note whether they use looping CSS animations, interactive sliders, or video.

- [ ] Diagnose why animations are not firing on the motion page (likely a CSS scoping or `will-change`/`animation` conflict)
- [ ] Fix or rebuild the demos so each easing and duration token is shown with a moving element (a simple block or icon translating across a track)
- [ ] Audit: list every animated element in the design system (spinners, skeletons, section transitions, btn-loading, scroll-reveal, tab indicator) and verify each is covered by a documented token
- [ ] Add any missing tokens; update `CHANGELOG.md`
## T-73 · Scroll indicator component
`status: backlog` `effort: S`

**Gap:** The landing page hero has no scroll affordance; visitors may not realise there is content below the fold. A reference scroll indicator exists at https://platform-as-a-product.jbpt.de/ (hero section) and should be extracted, adapted to Farn tokens, and shipped as a reusable component.

**Before starting:** Ask the user (bo@jbpt.de) for a screenshot or accessible URL of the reference scroll indicator — the site returned 403 when fetched programmatically. Do not begin implementation until the reference is confirmed.

- [ ] Add `--scroll-indicator-*` Tier-3 tokens to `tokens/components.css`
- [ ] Add `.scroll-indicator` CSS class to `tokens/component-classes.css` — animated chevron/arrow, inherits theme via semantic tokens
- [ ] Respect `prefers-reduced-motion` (show static indicator, no animation)
- [ ] Element is `aria-hidden="true"` (decorative) or carries a descriptive label for screen readers
- [ ] Works correctly in both light and dark mode
- [ ] Documented on the relevant component group page
- [ ] Used in `site/src/pages/index.astro` hero section
- [ ] Run build command, update `CHANGELOG.md`

---

## T-74 · Section transition dividers — landing page
`status: backlog` `effort: M`

**Gap:** Section boundaries on the landing page are hard cuts; adding shaped transition dividers between key sections will improve visual flow and reinforce the Farn aesthetic.

**Required transitions:**
- Architecture (§3, light bg) → Palette (§4, `data-surface="layer"` / mist bg): **Arc**
- Palette (§4) → Token Story (§5): **Sine wave**
- Included (§6) → Ready to Build (§7, dark bg): **Blob**

**ACs:**
- [ ] Each divider SVG colour-matches the adjacent section backgrounds (both light and dark page themes)
- [ ] Dividers are `aria-hidden="true"` and do not disrupt layout flow (`position:absolute` or negative margin pattern)
- [ ] No new JS required — CSS-only shapes
- [ ] All three dividers render correctly with the existing `--arc-height` / `--wave-height` tokens (or new tokens added for blob/sine)
- [ ] Run build command if any `tokens/` file changed, update `CHANGELOG.md`