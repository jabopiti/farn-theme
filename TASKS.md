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

## T-16 · Component demo pages with live token examples
`status: backlog` `effort: M`

**Gap:** Component pages show CSS snippets but no live demos; the relationship between tokens and rendered output is not visible.

- [ ] Add live demo sections to the buttons, cards, and forms component pages using Farn token-driven HTML (note: forms page has basic demos from T-14; T-16 scope is richer interactive / token-visible demos)
- [ ] Demos must work correctly in both light and dark mode via the `data-theme` mechanism
- [ ] Consider a token inspector pattern showing which token drives each property

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
`status: backlog` `effort: S`

**Gap:** No blob divider; the organic shape serves high-emphasis brand moments and one-off expressive transitions.

- [ ] Implement `.section-blob` CSS and example two-path SVG per spec
- [ ] Apply Tier 1 fade-only animation (opacity only — no translate, no morph) using T-22 infrastructure
- [ ] Document that blob paths should be drawn in Figma/Inkscape and exported, not hand-authored
- [ ] Document on the dividers component page (T-29)

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
`status: backlog` `effort: S`

**Gap:** No diagonal cut pattern; the energetic directional transition suits CTAs and momentum-forward page moments.

- [ ] Implement all three approaches from spec: `clip-path` polygon, `::before skewY`, and SVG triangle
- [ ] Apply Tier 2 angle-flattening animation (`skewY(-5deg)` → `0deg`) with `animation-timeline: view()` and static fallback
- [ ] Document the `clip-path` + `box-shadow` incompatibility and when to use the `::before` approach instead
- [ ] Document on the dividers component page (T-29)

---

## T-28 · Stacked card reveal
`status: backlog` `effort: S`

**Depends on T-15** — the T-15 IA restructure must explicitly include sidebar removal before this pattern is viable; full-viewport sticky sections (`height: 100vh` per section) are incompatible with the current sidebar layout. Confirm sidebar removal is in T-15's approved outline before picking up T-28.

**Gap:** No stacked card reveal pattern; the cinematic depth effect is the highest-drama transition in the spec, suited to long scrolling pages with 3–5 landmark sections.

- [ ] Implement `.stack-container` and `.stack-section` with `--stack-depth` and `--stack-index` CSS custom properties per spec
- [ ] Verify sticky positioning behaviour across Chrome, Firefox, and Safari; document the `height: N×100vh` requirement
- [ ] Document content-height constraint (sections must fit within `100vh`) and the 3–5 section limit
- [ ] Document on the dividers component page (T-29)

---

## T-29 · Section divider documentation page
`status: backlog` `effort: M`

**Gap:** No documentation page for section transitions; the six patterns in `divider-spec.md` are invisible to consumers of the system.

- [ ] Create `site/src/pages/components/dividers.astro` with a live demo of each implemented pattern
- [ ] Include the animation for each pattern (not just static CSS snippets)
- [ ] Add pattern-selection guidance: one primary type per page, when to use each
- [ ] Add the page to the sidebar nav in `site/src/layouts/DocLayout.astro`

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
`status: backlog` `effort: S`

**Gap:** No table styles exist anywhere in the system; tabular data is one of the most common UI patterns and must be reinvented by every consumer.

- [ ] Add `.table` base class with border, cell padding, and header styles consuming semantic tokens
- [ ] Add `.table-striped` variant using `--color-bg-panel` on alternating rows
- [ ] Document the `overflow-x: auto` scroll wrapper pattern for narrow viewports
- [ ] Document on a tables component page

---

## T-32 · Alert / notification component
`status: backlog` `effort: S`

**Gap:** State tokens (`--color-error`, `--color-warning`, `--color-success`) exist but no `.alert` component consumes them; status messages cannot be expressed consistently across projects.

- [ ] Add `--alert-*` Tier 3 tokens (background, border, text, icon-color per variant) to `tokens/components.css`
- [ ] Add `.alert` base class and `.alert-info`, `.alert-success`, `.alert-warning`, `.alert-error` variants to the component CSS artifact
- [ ] Verify all variants work correctly in both light and dark modes
- [ ] Document on an alerts component page with dismissible and non-dismissible examples

---

## T-33 · Code block styles
`status: backlog` `effort: S`

**Gap:** `--color-bg-code` and `--font-mono` tokens exist but no `.code-block` or `.inline-code` CSS classes are shipped; code formatting is reinvented by every consumer.

- [ ] Add `.code-block` (block-level, scrollable) and `.inline-code` (inline) CSS classes consuming `--color-bg-code`, `--font-mono`, and `--radius-*` tokens
- [ ] Add `--code-*` Tier 3 tokens (background, text, border) to `tokens/components.css` so consumers can retheme code blocks independently
- [ ] Document on the typography page or a dedicated code component page

---

## T-34 · Tabs component
`status: backlog` `effort: M`

**Gap:** Tabs are one of the three most common navigation components and are entirely absent from the system.

- [ ] Add `--tab-*` Tier 3 tokens (active-border, active-text, inactive-text, panel-background) to `tokens/components.css`
- [ ] Add `.tabs`, `.tab-list`, `.tab`, and `.tab-panel` CSS classes to the component artifact
- [ ] Implement CSS-only active state via `:checked` on radio inputs for no-JS usage; document the ARIA `role="tablist"` JS enhancement separately
- [ ] Document all states (default, active, hover, focus, disabled) on a tabs component page

---

## T-35 · Accordion / disclosure
`status: backlog` `effort: S`

**Gap:** No expandable content pattern; accordions are ubiquitous for FAQs, settings panels, and nested navigation.

- [ ] Build on native `<details>` / `<summary>` — no JS required for core functionality
- [ ] Add `--accordion-*` Tier 3 tokens (border, summary-background, panel-background) to `tokens/components.css`
- [ ] Include a CSS animated height transition using `interpolate-size: allow-keywords` with a static-reveal fallback for older browsers
- [ ] Document on an accordion component page

---

## T-36 · Breadcrumbs
`status: done` `effort: XS` `branch: claude/happy-albattani-RkUpI`

**Gap:** No breadcrumb navigation pattern; a basic wayfinding component missing from any multi-level site.

- [ ] Add `.breadcrumb` and `.breadcrumb-item` styles with a CSS `::after` separator consuming `--color-text-secondary`
- [ ] Current page item uses `--color-text`; preceding items use `--color-text-secondary` — both must adapt per surface
- [ ] Document correct `aria-label="Breadcrumb"` and `aria-current="page"` markup on the component page

---

## T-37 · Pagination
`status: backlog` `effort: S`

**Gap:** No pagination pattern; any list or data view spanning multiple pages has no reference implementation.

- [ ] Add `--pagination-*` Tier 3 tokens (active-background, active-text, border) to `tokens/components.css`
- [ ] Add `.pagination`, `.page-item`, and `.page-link` CSS classes with active, hover, focus, and disabled states
- [ ] Document on a pagination component page with previous/next and numbered variants

---

## T-38 · Tooltip
`status: backlog` `effort: S`

**Gap:** No tooltip pattern; a basic affordance used for labels, abbreviations, and icon-only buttons has no implementation.

- [ ] Implement CSS-only tooltip via `[data-tooltip]` attribute and `::before` / `::after` pseudo-elements; no JS for hover
- [ ] Add `--tooltip-*` Tier 3 tokens (background, text, max-width) to `tokens/components.css`
- [ ] Document the limitation: CSS-only tooltips do not respond to keyboard focus; document the JS enhancement needed for `focus-visible` support
- [ ] Document on a tooltip component page

---

## T-39 · Loading states — skeleton & spinner
`status: backlog` `effort: S`

**Gap:** Farn has no visual language for async or in-progress states; loading feedback must be built from scratch by every consumer.

- [ ] Add `.spinner` (rotating ring) using `@keyframes` and consuming `--color-accent` and T-04 `--duration-*` tokens
- [ ] Add `.skeleton` (shimmer placeholder) using a CSS gradient animation for the loading shimmer effect
- [ ] Both must respect `prefers-reduced-motion`: spinner stops, skeleton renders as a static tinted block
- [ ] Document on a feedback / loading states component page

---

## T-40 · Modal / dialog
`status: backlog` `effort: M`

**Gap:** No modal or dialog pattern; the most common overlay component is entirely absent from the system.

- [ ] Add `--modal-*` Tier 3 tokens (background, backdrop-color, border-radius, shadow) to `tokens/components.css`
- [ ] Add `.modal`, `.modal-backdrop`, `.modal-header`, `.modal-body`, `.modal-footer` CSS classes with size variants (sm, md, lg)
- [ ] Document the required JS responsibilities clearly: focus trap, `aria-modal="true"`, `role="dialog"`, `Escape` key handler — CSS owns appearance, JS owns behaviour
- [ ] Document on a modal component page

---

## T-41 · Motion tokens documentation page
`status: done` `effort: XS` `branch: claude/beautiful-ramanujan-jaOUa`

**Gap:** `tokens/motion.css` was added in T-04 but no `site/src/pages/tokens/motion.astro` exists; `--duration-*` and `--ease-*` tokens are invisible to consumers browsing the documentation site.

- [ ] Create `site/src/pages/tokens/motion.astro` with a table of all duration and easing tokens, descriptions, and usage guidance
- [ ] Add the page to the sidebar nav in `site/src/layouts/DocLayout.astro`
- [ ] Update `CHANGELOG.md`

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
`status: backlog` `effort: L`

**Gap:** Under the three-pillar IA (T-15), the six per-component pages must consolidate into six component group pages with the confirmed template (preview + short notes visible; full anatomy/usage/CSS in a shipped-disclosure collapsible per section).

**Gates: T-15, T-35**

- [ ] Build the 6 group pages: `/components/{layout,navigation,actions,forms,data,status}` (curated order)
- [ ] Absorb `buttons→actions`, `badges→data`, `cards→layout`, `forms→forms`, `breadcrumbs→navigation`, `dividers→layout`; rename Dividers → "Section Transitions"
- [ ] Resolve "Links" first-class question (standalone link styling vs button variant; `--link-*` tokens exist)
- [ ] Render coming-soon components inline in logical order with a "coming soon" `.badge`; Status group ships as an all-placeholder roadmap page
- [ ] Component URL clean-break here; remove old per-component pages and fix internal links

---

## T-45 · llms.txt + Getting Started AI section
`status: backlog` `effort: S`

**Gap:** No machine-readable guide for AI agents building products *with* Farn (distinct from `CLAUDE.md`, which is for agents developing Farn).

**Gates: T-15**

- [ ] Create `llms.txt` at repo root (llmstxt.org format: pitch → install → core rules → linked docs)
- [ ] Add `llms.txt` to `package.json` `files[]`; ensure it serves at `farn.jbpt.de/llms.txt`
- [ ] Add a "For AI agents" section to Getting Started linking to it + a copyable sample prompt
- [ ] (Optional) richer `llms-full.txt` with the complete token dump

---

## T-46 · Demo page — full guided tour
`status: backlog` `effort: M`

**Gap:** The `/demo` stub (built in T-15 Phase 1c) needs full content — a guided, end-to-end visual tour so humans can experience Farn before committing. (Distinct from T-16, which adds live demos to component pages.)

**Gates: T-15**

- [ ] Replace the stub with a guided tour: palette, typography, theming/surfaces, components in context
- [ ] Works in both light and dark via `data-theme`; standalone page (no group sub-nav, page-internal TOC if long)

---

## T-47 · Quote / blockquote component
`status: backlog` `effort: S`

**Gap:** The landing page demos a blockquote/pullquote pattern but no `.quote` class ships in `farn-components.css`; it's undocumented.

- [ ] Add `--quote-*` Tier-3 tokens to `tokens/components.css`; add `.quote` classes to `tokens/component-classes.css`
- [ ] Run the 4-file build; update `CHANGELOG.md`
- [ ] Document on a component group page (Data or Layout — decide during build)

---

## T-48 · Separator (content-level divider)
`status: backlog` `effort: XS`

**Gap:** Content-level horizontal rules are used throughout prose but not tokenised/documented (distinct from the section-transition divider patterns).

- [ ] Add `<hr>` / `.separator` variants using border tokens to `tokens/component-classes.css`
- [ ] Run the 4-file build; update `CHANGELOG.md`
- [ ] Document in Components > Layout

---

## T-49 · Foundations > Accessibility page
`status: backlog` `effort: S`

**Gap:** Farn's accessibility commitments (WCAG 2.1 AA, focus styles, reduced motion, contrast-by-construction) are implemented but have no narrative documentation page.

**Gates: T-15**

- [ ] Create `site/src/pages/foundations/accessibility.astro`: WCAG AA commitment (Ash AA-large-only), `:focus-visible` ring, `prefers-reduced-motion`, don't-rely-on-colour-alone; link to the WCAG matrix on Styles > Color
- [ ] No new CSS — documents existing `base.css` / `dark-light.css` behaviour

---

## T-50 · Foundations > Layout page
`status: backlog` `effort: XS`

**Gap:** Layout philosophy (content-first widths, page structure, grid-vs-flex, radius-as-hierarchy) is implicit in tokens but undocumented as a concept page.

**Gates: T-15**

- [ ] Create `site/src/pages/foundations/layout.astro` from existing `spacing.astro` content (widths, page-structure skeleton, grid pattern); concept here, values cross-linked to Styles > Spacing

---

## T-51 · Foundations > Responsive page
`status: backlog` `effort: XS`

**Gap:** Responsive philosophy (reflow-by-content, the three breakpoints, fluid `clamp()` type) is undocumented as a concept page.

**Gates: T-15**

- [ ] Create `site/src/pages/foundations/responsive.astro` from existing `spacing.astro` breakpoints + `typography.astro` clamp note; semantic meaning of each breakpoint, avoid fixed pixel breakpoints

---

## T-52 · Styles > Icons guide
`status: backlog` `effort: XS`

**Gap:** Farn ships no icon set; consumers have no guidance on using a third-party library with Farn tokens. The Phase-1 stub needs full content.

**Gates: T-15**

- [ ] Replace the stub with: rationale for not bundling icons, recommended libraries, and how to size/colour icons with `--space-*` / `--color-*` tokens
