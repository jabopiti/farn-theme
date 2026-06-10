# Changelog

All notable changes to Farn will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Fixed
- `tokens/dark-light.css`: Hover states for secondary/ghost buttons, accordions, tabs, and pagination were invisible on `layer` surfaces (low-contrast adjacent palette steps) and broken on dark `overlay` surfaces (hover matched surface bg exactly). Root cause: all interactive hover tokens pointed to `--color-bg-panel`, which is repurposed per surface and no longer reliably contrasts with the surface background.

### Added
- `tokens/dark-light.css`: `--color-bg-interactive-hover` semantic token — defined at every surface/theme level to always provide legible contrast: light base → mist, light layer → sand, light overlay → birch (go lighter; sand is the palette endpoint), dark base/layer/overlay → ash (lightest dark step, contrasts all three dark surface levels). Token lives in the semantic layer alongside `--color-accent-hover` and other purpose-mapped tokens.
- `tokens/components.css`: `--btn-s-hover-bg`, `--btn-g-hover-bg`, `--accordion-summary-hover-bg`, `--tab-hover-bg`, `--pagination-hover-bg` now reference `var(--color-bg-interactive-hover)` instead of `var(--color-bg-panel)`. Removes the now-redundant dark-mode `--btn-s-hover-bg` component override.
- `site/src/styles/site.css`, `site/src/pages/index.astro`: Site-level nav and hero hover states updated to use `--color-bg-interactive-hover` for consistency.
- **T-71** `site/src/pages/styles/spacing.astro`: Full visual rewrite — every section (Space Scale, Layout Widths, Page Structure, Grid Pattern, Border Radius, Z-index, Breakpoints) now has a live visual demo followed by a reference accordion. Space Scale: height-bar skyline with token labels + padding-in-context blocks. Layout Widths: proportional ruler bars. Page Structure and Grid Pattern promoted from h3 sub-sections to full h2 sections with wireframe and live grid demos. Border Radius chips redesigned for visibility (accent fill + border). Z-index: layered legend with depth-scaled left border. Breakpoints: annotated three-zone ruler.
- **T-72** `site/src/pages/styles/motion.astro`: Fixed two bugs that prevented all animations from running: (1) `animation-duration` defaulted to `0s` in the shorthand — replaced with CSS custom property pattern (`--_dur` set via inline style, consumed in animation shorthand); (2) `translateX(calc(100% - 16px))` referenced ball's own width rather than track width — replaced with explicit `184px`. Easing and duration demos now animate correctly at actual token speeds. Pairing Guide section redesigned with five continuously-looping mini-demo cards (button press, hover colour, panel enter, panel exit, content reveal). All animations include `prefers-reduced-motion` guard.- **T-53** `site/src/components/FernMultiplaneHero.astro`: Five-plane parallax fern hero component — real fern SVG artwork (4 sprite symbols, `currentColor` fill) arranged in depth planes with wind-energy motion model (scroll + pointer inject gust, energy decays to stillness), staggered frond-in entrance, `prefers-reduced-motion` guard, progressive enhancement via `html.js` class. Dark/light mode support via `--frond-far`/`--frond-mid`/`--frond-fg-dark`/`--frond-fg-deep` intermediary tokens and a `[data-theme="dark"]` background gradient override — frond colors resolve lazily so theme switches apply without re-running JS. `font-variation-settings: 'opsz' 72` on h1 per house rule. Named `overlay` slot for absolutely-positioned children (palette strip, wave divider) that must position relative to the section.
- **T-53** `site/src/pages/index.astro`: Full landing page redesign — 7 focused sections replacing the 8+ section page. Hero (badge eyebrow + `.btn.btn-p`/`.btn.btn-g` dogfooding + staggered palette strip entrance + `prefers-reduced-motion`-guarded float animation + theme-aware background radials + `.section-wave` divider into About), About (always-dark, condensed copy, hover-expand swatches, CTA to Foundations), The System (3 `.card` tier breakdown with `.inline-code` examples + arrow flow + CTA to Styles), Palette & Typography (`data-surface="layer"`, hover swatches, "Farn." Fraunces specimen + type specimen rows, CTA to Colors), Tokens in Action (scoped `data-theme` toggle, 3-column `data-surface` card demo), What You Get (3 `.card` elements + `.section-arc` divider into closing CTA), Closing CTA (dark, mirrors hero). All buttons switched to shipped `.btn` classes. `tokens/motion.css` and `tokens/typography-classes.css` added to page imports.- **T-53** `site/src/components/FernBackground.astro`: Five-plane parallax fern background component — real fern SVG artwork (4 sprite symbols, `currentColor` fill) arranged in depth planes with wind-energy motion model (scroll + pointer inject gust, energy decays to stillness), staggered frond-in entrance, `prefers-reduced-motion` guard, progressive enhancement via `html.js` class. Dark/light mode support via `--frond-far`/`--frond-mid`/`--frond-fg-dark`/`--frond-fg-deep` intermediary tokens on `[data-fern]` — frond colors resolve lazily so theme switches apply without re-running JS. `is:global` styles scoped to `[data-fern]` so JS-created frond divs are styled correctly.
- **T-53** `site/src/pages/index.astro`: Full landing page redesign — 7 focused sections. Hero (`<section class="hero" data-fern>` uses `FernBackground` as background layer; badge eyebrow + `.btn.btn-p`/`.btn.btn-g` dogfooding + staggered `fadeUp` entrance animations + palette strip with `prefers-reduced-motion`-guarded float + theme-aware gradient background + `.section-wave` divider; `overflow:clip` prevents edge-anchored fronds from creating scroll container; `z-index:40` on `.hero-inner`, `z-index:20` on palette strip), About (always-dark, condensed copy, hover-expand swatches, CTA to Foundations), The System (3 `.card` tier breakdown with `.inline-code` examples + arrow flow + CTA to Styles), Palette & Typography (`data-surface="layer"`, hover swatches, "Farn." Fraunces specimen + type specimen rows, CTA to Colors), Tokens in Action (scoped `data-theme` toggle, 3-column `data-surface` card demo), What You Get (3 `.card` elements + `.section-arc` divider into closing CTA), Closing CTA (dark, mirrors hero). All buttons switched to shipped `.btn` classes. `tokens/motion.css` and `tokens/typography-classes.css` added to page imports.

### Added
- **T-59** `tokens/components.css`: `--separator-section-weight` (3px), `--separator-decorative-width` (32px), `--separator-decorative-weight` (2px), `--separator-decorative-color` (`--color-accent`) Tier-3 tokens for separator visual hierarchy
- **T-59** `tokens/components.css`: `--quote-pull-rule-*` tokens now reference `--separator-decorative-*` — single source of truth for accent rule dimensions shared between pullquote and decorative separator

### Changed
- **T-57** `tokens/dark-light.css`: `--color-card-highlight-bg` changed to `--fo3-deepwater` (light) / `--fo2-forest` (dark) — both are dark enough for Birch Mist text (8.6:1 and 6.7:1); `--color-card-highlight-text*` promoted to semantic layer in `:root` only (no dark override needed — text is always Birch Mist)
- **T-57** `tokens/components.css`: `--card-highlight-text*` tokens now reference `--color-card-highlight-text*` semantic aliases
- **T-57** `site/src/pages/index.astro`: Updated home page custom card-highlight classes to use deepwater/forest palette; removed unused `.card-highlight-dark` dead code; updated text colours from Iron Night to Birch Mist
- **T-57** `tokens/colors.css`: Role comments updated — Sage and Forest now document card highlight background role (dark and light respectively); Deepwater role narrowed to code block bg and active accent state
- **T-59** `tokens/component-classes.css`: `.section-divider` and `.decorative` now consume `--separator-*` tokens; `.section-divider` weight increased from 2px to 3px for clear visual separation from `.hairline` (which retains `1px` directly)
- **T-64** `tokens/components.css`: `--spinner-duration` changed from `var(--duration-loop)` (800ms) to `1.2s`; `--skeleton-duration` changed to `1.6s` — calmer, less anxious loading animations in keeping with Farn's character
- **T-64** `tokens/dark-light.css`: `--skeleton-base` and `--skeleton-shine` per-surface overrides added to `layer` and `overlay` blocks (both themes) — fixes invisible shimmer bug where both tokens resolved to the same colour on non-base surfaces

- **T-55** `site/src/pages/components/actions.astro`: Button sizes, states, and loading demos promoted outside the accordion — all live examples now visible without expanding any disclosure; accordion retained for anatomy HTML, token reference, and override snippets
- **T-55** `site/src/pages/components/layout.astro`: Card anatomy demo (full card with `.card-media` / `.card-header` / `.card-body` / `.card-footer` slots) promoted outside the accordion with a visible `<h3>Anatomy</h3>` heading

### Changed
- `site/src/styles/site.css`: `.demo-surface` background fill removed — demo containers now render on the page base background so components appear in their true context; border and padding retained for visual grouping

### Removed
- **T-46 dropped** `site/src/pages/demo.astro`: Deleted — a separate demo page creates maintenance debt; the docs pages are the demo. `navigation.ts` Demo link removed. Home page CTAs updated to link to `/components`.

- **T-28** `tokens/components.css`: `--stack-scale-step` (0.03), `--stack-top` (0px), `--stack-radius` (radius-xl), `--stack-count` (4), `--stack-height` (100vh) Tier-3 tokens for the stacked card reveal pattern
- **T-28** `tokens/component-classes.css`: `.stack-container` and `.stack-section` CSS classes — pure sticky-scroll depth effect, no JS; `nth-last-child` defaults assign `--stack-depth`/`--stack-index` for 2–5 section stacks (last section = front card, full-size); `prefers-reduced-motion` removes scale transform; `--stack-height` token controls section height (`100dvh` opt-in for dynamic viewport tracking); `--stack-top` token for fixed-nav offset — shipped in `dist/farn-components.css`
- **T-28** `tokens/component-classes.css`: `.scrollbar-none` utility class — hides scrollbar visually while preserving scroll functionality (`scrollbar-width: none` + `::-webkit-scrollbar` guard)
- **T-28** `site/src/pages/components/layout.astro`: Stacked card reveal fully documented — self-contained scrollable demo, anatomy, constraints (content within `--stack-height`, 3–5 sections, no mixing with other divider patterns), `--stack-top` nav-offset guidance, token reference split into pre-defined Tier-3 tokens and per-section variables, patterns table updated; "Upcoming patterns" stub removed

- **T-39** `tokens/motion.css`: `--duration-loop` (800ms) — named token for repeating cycle animations (spinner, skeleton shimmer); `--ease-in-out: ease-in-out` added to the easing scale
- **T-39** `tokens/components.css`: `--spinner-color`, `--spinner-track`, `--spinner-size`, `--spinner-sm-size`, `--spinner-lg-size`, `--spinner-border`, `--spinner-lg-border`, `--spinner-duration`; `--skeleton-radius`, `--skeleton-base`, `--skeleton-duration` Tier-3 tokens; `tokens/dark-light.css`: `--skeleton-shine` defined per-theme — `--bm2-birch` in light (lighter than panel mist), `--in2-slate` in dark (lighter than panel iron)
- **T-39** `tokens/component-classes.css`: `.spinner` (rotating ring, `farn-spin` keyframe), `.spinner-sm` / `.spinner-lg` size modifiers; `.skeleton` (shimmer gradient, `farn-shimmer` keyframe), `.skeleton-circle` variant; `.btn-loading` state modifier — all shipped in `dist/farn-components.css`; `prefers-reduced-motion` guards stop rotation / collapse shimmer to static block
- **T-39** `site/src/pages/components/status.astro`: Loading states section promoted from `coming soon` to `stable` — live spinner + skeleton demos, button loading composition, full accessibility guidance, token reference, and CSS reference
- **T-39** `site/src/pages/components/actions.astro`: "Loading state" subsection added to the Buttons accordion — `.btn-loading` usage, live demo, and `aria-label` / focus-restoration guidance
- **T-34** `tokens/components.css`: `--tab-idle-text`, `--tab-hover-bg`, `--tab-active-text`, `--tab-indicator`, `--tab-border`, `--tab-panel-bg`, `--tab-gap`, `--tab-font-size`, `--tab-disabled-opacity` Tier-3 tokens for independent tab retheme
- **T-34** `tokens/component-classes.css`: `.tab-list`, `.tab`, `.tab-panel` CSS classes with underline indicator, `[aria-selected]`-driven active state, hover/focus-visible/disabled, overflow-scroll, and `@media (scripting: none)` all-panels fallback — shipped in `dist/farn-components.css`
- **T-34** `dist/tabs.js` + `package.json`: `initTabs()` progressive-enhancement script distributed as `farn-theme/scripts/tabs` — click switching, roving-tabindex keyboard navigation (← → Home End), skips disabled tabs
- **T-34** `site/src/pages/components/navigation.astro`: Tabs section with live demo, full anatomy, script wiring guide, keyboard nav table, usage guidance, accessibility table (`tabindex="0"` guidance for empty panels), token reference, and CSS reference; status updated from `coming soon` to `stable`

- **T-45** `llms.txt` at repo root and `site/public/llms.txt` (served at `farn.jbpt.de/llms.txt`) — machine-readable guide for AI agents building with Farn; covers install, core rules (token hierarchy, Fraunces `opsz`, dark/light theming, surface depth, FOWT), token layer architecture, FOWT snippet, sample system prompt, and linked reference for all docs pages (llmstxt.org format)
- **T-45** `package.json`: `llms.txt` added to `files[]` so it ships in the npm package alongside `dist/` and `tokens/`
- **T-45** `site/src/pages/getting-started.astro`: "For AI Agents" callout card at top of page — links to `/llms.txt` and includes a copyable inline system prompt; sub-nav entry added

### Fixed
- `tokens/base.css`: Global `a`, `a:visited`, and `a:hover` rules now use `:where()` (zero specificity) so component class selectors always win. Previously `a:visited` had specificity (0,1,1), beating single-class component rules like `.nav-cta` and `.btn-p`, causing visited CTA buttons to render green text on a green background (invisible) and the nav logo "Farn" to appear in accent colour instead of primary text colour.
- `tokens/component-classes.css`: `.btn` now has a `:focus-visible` outline (`2px solid var(--color-accent)`, offset 3px) — buttons were invisible to keyboard users when loaded via `farn-components.css` standalone
- `tokens/component-classes.css`: `.breadcrumb-item a:focus-visible` added to the hover/current selector so keyboard navigation shows the text colour change
- `tokens/component-classes.css`: Input focus now uses `:focus-visible` instead of `:focus`; `box-shadow` glow wrapped in `@supports (color: color-mix(...))` — older browsers fall back to the border-colour indicator
- `tokens/component-classes.css`: `.section-wave` and `.overlap-card` are now visible when JavaScript is unavailable via `@media (scripting: none)` (Chrome 120+, Firefox 113+, Safari 17+)

### Changed
- `tokens/component-classes.css`: `.section-divider` border increased from 1px to 2px and margin increased from `--space-md` to `--space-lg` to visually distinguish it from `.hairline` (which remains 1px / `--space-sm`)
- `site/src/styles/site.css`: Nav logo font-size increased from 22px to 28px; `font-variation-settings: 'opsz'` updated to match (28).

### Added
- **T-38** `tokens/components.css`: `--tooltip-max-width` (220px), `--tooltip-radius`, `--tooltip-padding`, `--tooltip-font-size` Tier-3 tokens; `tokens/dark-light.css`: `--tooltip-bg` and `--tooltip-text` theme-inverse overrides (dark bubble in light mode, light bubble in dark mode)
- **T-38** `tokens/component-classes.css`: `[data-tooltip]` CSS-only tooltip — bubble via `::before` (`content: attr(data-tooltip)`), arrow via `::after`; shows on `:hover` and `:focus-visible`; `data-tooltip-placement="bottom"` modifier for below-trigger placement; `prefers-reduced-motion` guard
- **T-38** `site/src/pages/components/actions.astro`: Tooltip section with live demo, placement table, anatomy, accessibility guidance (`aria-label` companion requirement, touch caveat), token reference, and viewport-edge limitation note
- **T-37** `tokens/components.css`: `--pagination-active-bg`, `--pagination-active-text`, `--pagination-hover-bg`, `--pagination-hover-text`, `--pagination-border`, `--pagination-radius`, `--pagination-gap` Tier-3 tokens
- **T-37** `tokens/component-classes.css`: `.pagination`, `.page-item`, `.page-link` CSS classes with `aria-current="page"` active state, `aria-disabled="true"` disabled state, hover/focus-visible, and `.pagination-outlined` variant; `.page-ellipsis` for truncated-range separators — all shipped in `dist/farn-components.css`
- **T-37** `site/src/pages/components/navigation.astro`: Pagination section with live demos (numbered, ellipsis, prev/next, outlined), anatomy, accessibility guidance, token reference, and CSS reference; status updated from `coming soon` to `stable`
- **T-27** `tokens/components.css`: `--diagonal-angle` (`-3deg`) Tier-3 token — adjusts the static display angle for the diagonal cut; `tokens/component-classes.css`: `.section-skew` class with `isolation: isolate`, `::before skewY` background, and Tier 2 `animation-timeline: view()` angle-flattening animation (`skewY(-5deg)` → `skewY(0deg)`); static fallback for unsupported browsers; all three approaches (clip-path polygon, `::before skewY`, SVG triangle) documented in Components › Layout including the `clip-path` + `box-shadow` incompatibility
- **T-31** `tokens/components.css`: `--table-border`, `--table-header-bg`, `--table-header-text`, `--table-row-stripe-bg`, `--table-row-hover-bg`, `--table-font-size`, `--table-cell-padding`, `--table-cell-padding-sm`, `--table-cell-padding-lg`, `--table-radius` Tier-3 tokens for independent retheme of table components
- **T-31** `tokens/component-classes.css`: `.table` (base), `.table-striped` (alternating rows), `.table-hover` (row hover highlight), `.table-sm` (compact padding), `.table-lg` (comfortable padding) CSS classes shipped in `dist/farn-components.css`
- **T-31** `site/src/pages/components/data.astro`: Table section with live demos for all variants, token reference, anatomy, and CSS reference; scroll wrapper and rounded-corners wrapper patterns documented
- **T-49** `site/src/pages/foundations/layout.astro`: new Foundations page — content-first widths (`--width-content/prose/narrow`), page structure skeleton, grid vs flex guidance, radius-as-hierarchy token table
- **T-49** `site/src/pages/foundations/accessibility.astro`: new Foundations page — WCAG AA commitment, global `:focus-visible` ring, `prefers-reduced-motion` guard, colour-alone caveat; links to contrast matrix on Styles › Color
- **T-49** `site/src/pages/foundations/responsive.astro`: expanded with reflow-by-content philosophy and fluid type callout
- **T-49** `site/src/pages/foundations/index.astro`: Layout and Accessibility promoted from "Coming soon" to real links
- **T-49** `site/src/data/navigation.ts`: Layout and Accessibility added to Foundations sub-nav (order: Surfaces → Layout → Responsive → Accessibility)
- **T-49** `site/src/pages/styles/color.astro`: `id="accessibility"` added to the Accessibility `<h2>` to enable deep-linking
- **T-33** `tokens/components.css`: `--code-bg`, `--code-text`, `--code-border`, `--code-radius`, `--code-copy-size`, `--code-copy-radius` Tier-3 tokens for independent retheme of code blocks
- **T-33** `tokens/component-classes.css`: `.code-block` (block-level, scrollable), `.inline-code` (inline), and `.code-copy-btn` (clipboard icon button) CSS classes shipped in `dist/farn-components.css`
- **T-33** `site/src/scripts/code-copy.js`: Reference copy-to-clipboard implementation — injects `.code-copy-btn` into every `<pre>` element; 2-second checkmark feedback; graceful no-JS and no-clipboard-API fallback
- **T-54** `tokens/spacing.css`: `--breakpoint-mobile: 640px` and `--breakpoint-tablet: 768px` reference tokens; all 8 `@media (max-width: …)` queries in `site/` annotated with `/* --breakpoint-mobile */` / `/* --breakpoint-tablet */` comments; `site/src/pages/foundations/responsive.astro` stub documents the two tokens and the comment-annotation pattern; Responsive added to Foundations sub-nav
- **T-48** `tokens/component-classes.css`: `.hairline`, `.section-divider`, `.decorative` separator classes (replaces previous modifier-based API: `hr`/`.separator`, `.separator-strong/subtle/ghost`, `.separator-labeled` removed); `hr` gets a browser reset only — all variants require an explicit class; documented in Components › Layout
- **T-47** `tokens/components.css`: `--quote-*`, `--quote-pull-*`, `--quote-attr-*` Tier-3 tokens; `tokens/component-classes.css`: `.quote` (blockquote), `.quote-pull` (pullquote figure), `.quote-attribution` (testimonial card) component classes; `site/src/pages/index.astro` updated to use shipped classes; documented in Components › Layout
- **T-25** `tokens/components.css`: `--blob-height` (100px) and `--blob-duration` (900ms) Tier-3 tokens; `tokens/component-classes.css`: `.section-blob` class with opacity-only fade-in via T-22 scroll-reveal infrastructure; documented in Components › Layout with token reference and Figma/Inkscape path guidance
- `tokens/dark-light.css`: `--color-on-success` and `--color-on-warning` semantic tokens (map to `--color-accent-text`; WCAG AA verified on moss/grain backgrounds)
- `tokens/components.css`: Badge Tier-3 tokens — `--badge-height`, `--badge-padding`, `--badge-letter-spacing`, `--badge-{variant}-bg/text` for all 7 variants; badge classes now reference these tokens
- `tokens/components.css`: Button spacing tokens — `--btn-gap`, `--btn-padding-x`, `--btn-sm-padding-x`, `--btn-lg-padding-x`; button classes updated to consume them
- `tokens/components.css`: Accordion toggle tokens — `--accordion-toggle-size`, `--accordion-toggle-rotation`; accordion class updated

### Changed
- `site/src/pages/index.astro`: Removed `data-theme="dark"` from the hero section — it now follows the page theme like any other section
- `site/src/styles/site.css`: Nav unfilled state now uses semantic tokens throughout (`--color-text`, `--color-text-secondary`, `--color-text-tertiary`, `--color-accent`, `--color-accent-text`, `--color-bg-panel`) instead of hardcoded light-on-dark palette values; nav CTA always renders as a primary accent button regardless of scroll state
- `tokens/dark-light.css`: `--color-border-subtle` and `--color-ghost-border` now use `color-mix()` instead of hardcoded `rgba()`, keeping them tied to palette tokens

### Docs
- `CLAUDE.md`: Navigation structure section added; Track B updated to reflect group-page workflow and `navigation.ts` as nav source of truth; color token doc path corrected to `site/src/pages/styles/color.astro`; complexity gate updated to reference `navigation.ts` instead of DocLayout.astro
- `site/src/pages/getting-started.astro`: Fixed layer count (7 not 6 — `components.css` was omitted); all 4 npm import paths documented; CDN section now includes `farn-components.css` and `farn-typography.css` links; Tier-3 token override subsection added
- `README.md`: Component classes and typography utilities mentioned in intro; 4th `@import "farn-theme/typography"` path added

### Added
- `site/src/pages/components/layout.astro` — Layout group page: Cards (stable) with all variants, sizes, anatomy, token reference, and CSS reference; Section Transitions (beta) covering layered overlap, sine wave, and convex arc patterns; Separator (coming soon) (T-44)
- `site/src/pages/components/navigation.astro` — Navigation group page: Breadcrumbs (stable) and Accordion (stable) with full reference disclosures; Tabs and Pagination (coming soon) (T-44)
- `site/src/pages/components/actions.astro` — Actions group page: Buttons (stable) and Links (stable, peer section with `--link-*` token reference); Tooltip (coming soon) (T-44)
- `site/src/pages/components/data.astro` — Data group page: Badges (stable) with all 7 variants; Table and Code block (coming soon) (T-44)
- `site/src/pages/components/status.astro` — Status group page: Alert, Loading states, and Modal/dialog (all coming soon) (T-44)

### Changed
- `site/src/pages/components/forms.astro` — rewritten as a group page with full accordion-wrapped reference section for form elements (T-44)
- `site/src/pages/components/index.astro` — rewritten as a component overview page linking all 6 group pages; "Loading components" and "Surfaces and theme context" moved to `<h3>` (T-44)
- `site/src/data/navigation.ts` — Components group updated to 6 group pages (`layout`, `navigation`, `actions`, `forms`, `data`, `status`), replacing the previous 7 per-component entries (T-44)

### Removed
- `site/src/pages/components/badges.astro`, `buttons.astro`, `cards.astro`, `breadcrumbs.astro`, `accordion.astro`, `dividers.astro` — consolidated into group pages; clean-break URL change (T-44)

### Added
- `tokens/components.css`: `--accordion-*` Tier-3 tokens — `--accordion-border`, `--accordion-radius`, `--accordion-summary-bg`, `--accordion-summary-hover-bg`, `--accordion-panel-bg`, `--accordion-font-size` (T-35)
- `dist/farn-components.css`: `.accordion` and `.accordion-panel` classes shipped — built on native `<details>`/`<summary>`; no JS required; `+` icon rotates 45° on open; animated height via `interpolate-size: allow-keywords` + `::details-content` in Chrome 131+; instant static-reveal fallback in older browsers; `prefers-reduced-motion` guard disables both transitions (T-35)
- `site/src/pages/components/accordion.astro` — accordion documentation page with live demos (including default-open panel), anatomy, usage guidance table, animation notes, token reference, and CSS reference (T-35)
- `tokens/components.css`: `--arc-height: 80px` Tier-3 token — ties the SVG rendered height and the parent section's required `padding-bottom` to a single override point (T-24)
- `dist/farn-components.css`: `.section-arc` and `.section-arc--concave` classes shipped — SVG convex arc divider; absolutely positioned at bottom of parent section; single quadratic bezier dome fills `var(--color-section-next)`; Tier-2 scroll-driven animation (`clip-path` expands from flat baseline to dome via `animation-timeline: view()`) in supporting browsers; `@supports not` fallback shows full arc statically; concave variant (`--concave` modifier) redraws path with control point below baseline — static only (T-24)
- `site/src/pages/components/dividers.astro`: Convex arc section added — live convex and concave demos, anatomy table, customisation notes (asymmetric apex, depth layer tip), token reference, CSS reference; subnav updated; intro paragraph updated; usage guidance table updated (T-24)
- `tokens/typography-classes.css` — new opt-in file shipping 12 typography utility classes: `.text-display`, `.text-h1`, `.text-h2`, `.text-h3`, `.text-h4`, `.text-h5`, `.text-body`, `.text-body-lg`, `.text-body-sm`, `.text-label`, `.text-caption`, `.text-mono`; Fraunces classes include mandatory `font-variation-settings: 'opsz'`; distributed as `dist/farn-typography.css` via `farn-theme/typography` export (T-30)
- `tokens/components.css`: 8 component typography tokens — `--btn-font-size`, `--btn-sm-font-size`, `--btn-lg-font-size`, `--label-font-size`, `--input-font-size`, `--badge-font-size`, `--hint-font-size`, `--breadcrumb-font-size` — replacing all hardcoded `font-size` values in component classes (T-30)
- `dist/farn-typography.css` — typography utility classes artifact; load alongside `farn.css` or `farn-tokens.css` (T-30)
- `package.json`: `farn-theme/typography` export path for the new artifact (T-30)
- `site/src/pages/tokens/typography.astro`: "Typography Utility Classes" section — import instructions, live previews, and CSS reference for all 12 utility classes (T-30)
- `tokens/components.css`: `--wave-height: 80px` Tier-3 token — ties the SVG rendered height and the parent section's required `padding-bottom` to a single override point (T-23)
- `dist/farn-components.css`: `.section-wave` class shipped — SVG sine wave divider; absolutely positioned at bottom of parent section; two-path SVG (depth layer first, main wave on top) fills `var(--color-section-next)`; Tier-1 entry animation via `data-scroll-reveal` (`translateY(24px)` → `0` + opacity fade, 0.1s delay, `prefers-reduced-motion` guard) (T-23)
- `site/src/pages/components/dividers.astro`: Sine wave section added — live demo (dark → light transition), anatomy table, customisation notes (amplitude, direction reversal), token reference, CSS reference; subnav updated with Sine wave and Usage links; intro paragraph updated; usage guidance table compares both shipped patterns (T-23)

### Changed
- `tokens/component-classes.css`: replaced all hardcoded `font-size` values in `.badge`, `.btn`, `.btn-sm`, `.btn-lg`, `label`, `input/textarea/select`, `.form-hint`, `.breadcrumb` with `var(--*-font-size)` token references (T-30)
- `site/src/layouts/DocLayout.astro`: imports `tokens/typography-classes.css` to dogfood utility classes on the docs site (T-30)
- `dist/farn-tokens.css`, `dist/farn.css`, `dist/farn-components.css`: rebuilt (T-30)

- Root `package.json` — Farn is now installable as an npm package (`npm install farn-theme`) with three named export paths: default (`farn-theme`) for the full bundle, `farn-theme/tokens` for tokens without the base reset, and `farn-theme/components` for opt-in component classes (T-18)
- `tokens/components.css`: `--overlap-*` Tier-3 tokens — `--overlap-section-radius`, `--overlap-section-offset`, `--overlap-card-radius`, `--overlap-card-offset`, `--overlap-card-duration`, `--overlap-card-shadow-raised` (T-26)
- `tokens/dark-light.css`: `--overlap-card-shadow-raised` dark-mode override — deepened to `rgba(0,0,0,0.40)` so the lift shadow remains perceptible on dark backgrounds (T-26)
- `dist/farn-components.css`: layered overlap classes shipped — `.overlap-preceding` (overflow guardrail), `.overlap-section` (Option A: full section slides up), `.overlap-card` (Option B: card floats up with Tier-1 entry animation — opacity + translateY(40px) + box-shadow growth) (T-26)
- `site/src/scripts/scroll-reveal.js`: extended selector to `'.scroll-reveal, [data-scroll-reveal]'` — future divider patterns opt in via `data-scroll-reveal` attribute without requiring JS changes (T-26)
- `site/src/pages/components/dividers.astro` — section dividers documentation page; covers layered overlap (both options), anatomy, overflow guardrail warning, token reference, and CSS reference; sidebar entry added (T-26)
- `site/src/layouts/DocLayout.astro`: Dividers link added to desktop nav and mobile drawer (T-26)
- `site/src/pages/tokens/motion.astro` — Motion tokens documentation page with animated previews and tables for all `--duration-*` and `--ease-*` tokens; pairing guide and usage rules included (T-41)
- `site/src/layouts/DocLayout.astro`: Motion link added to main nav and mobile drawer between Spacing and Theming (T-41)
- `site/src/scripts/scroll-reveal.js`: shared `initScrollReveal({ threshold })` module — `IntersectionObserver` with configurable threshold (default 0.15), unobserves after first reveal, skips observer entirely under `prefers-reduced-motion` as a performance optimization (T-22)
- `site/src/styles/site.css`: `.scroll-reveal` base class consuming `var(--duration-reveal)` and `var(--ease-out)`; `@media (prefers-reduced-motion: reduce)` guard rendering elements immediately visible with no animation (T-22)

### Changed
- `site/src/pages/index.astro`, `site/src/layouts/DocLayout.astro`: wired `initScrollReveal()` via module `<script>`; replaced inline `IntersectionObserver` in `index.astro` with shared module (T-22)
- `site/src/styles/site.css`: renamed `.reveal` → `.scroll-reveal`; corrected scroll-reveal transform easing from `--ease-spring` to `--ease-out` — springs are discouraged for scroll-reveal per industry guidance (T-22)
- `dist/farn-components.css`: `.breadcrumb` and `.breadcrumb-item` classes — CSS-only breadcrumb navigation; `›` separator via `::after` consuming `--color-text-secondary`; preceding items use `--color-text-secondary` with hover lift to `--color-text`; current page link styled via `a[aria-current="page"]` to `--color-text`; all colors adapt to `data-theme` / `data-surface` via semantic tokens (T-36)
- `site/src/pages/components/breadcrumbs.astro` — breadcrumbs documentation page with live demo, anatomy, usage guidance, accessibility attribute reference, and CSS reference (T-36)
- `site/src/layouts/DocLayout.astro`: Breadcrumbs link added to desktop nav and mobile drawer (T-36)
- `dist/farn-tokens.css`, `dist/farn.css`, `dist/farn-components.css`: rebuilt (T-36)
- `tokens/dark-light.css`: `--color-section`, `--color-section-next`, `--color-section-base`, `--color-section-layer`, `--color-section-overlay` semantic aliases — map to `--color-bg`, `--color-bg-panel`, and `--color-bg-inset`; no dark-mode overrides needed as the underlying tokens already adapt per theme; `divider-spec.md` updated to use new names (T-21)
- `dist/farn-components.css`: form element styles shipped — bare `input`, `textarea`, `select`, `label` selectors; `.form-field` wrapper (flex column, `--space-md` bottom margin); `.form-hint` helper text; `.form-field--error` BEM modifier; `[aria-invalid="true"]` error state; `accent-color` theming for `input[type="checkbox"]` and `input[type="radio"]`; all styles consume `--input-*` Tier-3 tokens (T-14)
- `site/src/pages/components/forms.astro` — forms component documentation page with live element demos, states (default, error via ARIA + wrapper class, disabled), wrapper pattern, token reference table, and override examples (T-14)
- `site/src/layouts/DocLayout.astro`: Forms link added to main nav and mobile drawer (T-14)
- `dist/farn-tokens.css`, `dist/farn.css`, `dist/farn-components.css`: rebuilt (T-14)
- `dist/farn-components.css`: card classes shipped — `.card` (base), `.card-outlined`, `.card-highlight` (variants), `.card-interactive` (hover/focus/active modifier), `.card-grid` (layout utility); anatomy classes `.card-media`, `.card-header`, `.card-body`, `.card-footer` with `:has()`-powered auto-padding (T-13)
- `tokens/components.css`: `--card-highlight-bg` and `--card-highlight-border` Tier-3 tokens (T-13)
- `tokens/dark-light.css`: `--color-card-highlight-bg` and `--color-card-highlight-border` semantic tokens — light: `--in0-void` / `transparent`; dark: `--in1-iron` / `--in2-slate` (T-13)
- `site/src/pages/components/cards.astro`: Cards documentation page with live demos of all variants, full anatomy, interactive states, card grid, token reference, and CSS reference (T-13)

### Changed
- `site/src/pages/components/index.astro`: updated intro to reflect Farn's component layer direction; Cards section updated to reference shipped classes and anatomy (T-13)
- `site/src/layouts/DocLayout.astro`: Cards link added to desktop nav and mobile drawer (T-13)
- `dist/farn-tokens.css`, `dist/farn.css`, `dist/farn-components.css`: rebuilt (T-13)

---
- `dist/farn-components.css`: button classes shipped — `.btn` (base), `.btn-p`, `.btn-s`, `.btn-g`, `.btn-d` (variants), `.btn-sm`, `.btn-lg` (size modifiers); all states (hover, active/pressed, disabled) driven by `--btn-*` tokens (T-11)
- `tokens/components.css`: `--btn-p-active-bg`, `--btn-s-active-bg`, `--btn-g-active-bg`, `--btn-d-active-bg` pressed-state tokens (T-11)
- `tokens/dark-light.css`: `--color-accent-active` semantic token (`--fo3-deepwater`; theme-invariant); `--btn-g-active-bg` dark-mode override (`--in0-void`) for pressed ghost button (T-11)

### Changed
- `site/src/pages/components/buttons.astro`: status upgraded from beta to stable; states section updated to document active/pressed state; token reference table updated with `--btn-*-active-bg` rows; secondary hover token corrected from `--in2-slate` to `--in3-ash` (T-11)
- `site/src/styles/site.css`: removed duplicate `.btn` block — button classes now sourced from `tokens/component-classes.css` via `DocLayout.astro` (T-11)
- `dist/farn-tokens.css`, `dist/farn.css`, `dist/farn-components.css`: rebuilt (T-11)

---

### Added
- `site/src/pages/tokens/theming.astro` — live documentation for the `data-surface` / `data-theme` system with forced-pair light+dark demos, composition examples, page-reactive demo, and FOWT prevention guide (T-05)
- `tokens/components.css`: `--card-*` Tier-3 tokens — `--card-bg` (`--color-bg-panel`), `--card-hover-bg` (`--color-bg-inset`), `--card-border` (`transparent`), `--card-radius` (`--radius-lg`), `--card-padding` (`--space-md` / 24px) — card surfaces are now overridable without touching semantic tokens (T-09)
- `tokens/components.css`: `--input-*` Tier-3 form tokens — `--input-radius`, `--input-bg`, `--input-bg-active`, `--input-border`, `--input-border-focus`, `--input-border-error`, `--input-focus-shadow` (adaptive glow via `color-mix()`), `--input-text`, `--input-placeholder`, `--input-disabled-opacity` (T-10)

### Fixed
- `.github/farn-palette.svg`: Birch Mist swatches updated — labels corrected from `linen`/`parchment` to `mist`/`birch`; hex values aligned to current tokens (`--bm0-sand`, `--bm1-mist`, `--bm2-birch`) (T-42)

### Changed
- `tokens/dark-light.css`: Fixed `--color-bg-inset` in dark mode — was `var(--in0-void)` (same as page bg, invisible in dark); now `var(--in2-slate)`, restoring the three-step surface ramp (void/iron/slate) to mirror light mode (birch/mist/sand). `--btn-s-hover-bg` dark override updated from `var(--in2-slate)` to `var(--in3-ash)` to step forward from the corrected resting state (T-10)
- `site/src/pages/index.astro`: `.field-input` styles updated to consume `--input-*` tokens; hardcoded `[data-theme="dark"]` overrides removed; switched to `:focus-visible`; focus state shows `--input-focus-shadow` glow; hover+focus-visible background combined into `:is()` selector (T-10)
- `dist/farn-tokens.css`, `dist/farn.css`, `dist/farn-components.css`: rebuilt (T-09, T-10)

---

### Added
- `dist/farn-components.css`: new opt-in component CSS artifact — ships component tokens (`--btn-*`, `--link-*`) and CSS classes (`.badge` + 7 variants); load alongside `farn.css` or `farn-tokens.css` (T-43, T-12)
- `tokens/component-classes.css`: new source file for shipped CSS classes — `.badge` base class and `.badge-general`, `.badge-published`, `.badge-draft`, `.badge-archived`, `.badge-beta`, `.badge-research`, `.badge-category` variant modifiers using palette tokens directly (T-12)

### Changed
- `site/src/layouts/DocLayout.astro`: imports `tokens/component-classes.css` — docs site now dogfoods its own component classes (T-12)
- `site/src/styles/site.css`: badge CSS removed; classes now sourced from `tokens/component-classes.css` (T-12)
- `site/src/pages/components/badges.astro`: CSS reference section notes that badge classes are shipped in `dist/farn-components.css` (T-12)
- `CLAUDE.md`: build command extended with step 3 for `farn-components.css`; repo structure and Track A section updated with resolved artifact decision; dogfood rule added (T-43)
- `tokens/components.css`: new Tier-3 component token file with `--btn-*` tokens (radius, disabled-opacity, and per-variant bg/text/border/hover-bg for primary, secondary, ghost, and destructive) and `--link-*` tokens (color, hover-color, visited-color) (T-08)
- `tokens/dark-light.css`: `--color-on-error` semantic token (text on error/destructive backgrounds; maps to `--bm2-birch` in both themes) and `--btn-s-hover-bg` dark-mode override (`var(--in2-slate)`) (T-08)
- `tokens/index.css`: `@import './components.css'` added to the token import chain (T-08)
- `site/src/pages/components/buttons.astro`: buttons documentation page with live demos of all 4 variants, 3 sizes, disabled states, link-button pattern, full `--btn-*` token reference table, and override examples (T-08)
- `dist/farn-tokens.css`: tokens-only build artifact — palette tokens, typography, spacing, motion, semantic tokens, and component tokens without the base reset (`base.css`); now includes `tokens/components.css` (T-17 + T-08)
- `site/src/pages/tokens/colors.astro`: full WCAG 2.1 contrast matrix covering all 54 semantic foreground/background token pairs across light and dark modes, with AAA/AA/AA Large/Fail ratings (T-07)
- `site/src/pages/components/badges.astro`: dedicated badges documentation page with live demos of all 7 variants, usage guidance, anatomy reference, and full CSS snippet (T-06)
- `tokens/motion.css`: `--duration-fast` (80ms), `--duration-base` (120ms), `--duration-slow` (200ms), `--duration-enter` (250ms), `--duration-reveal` (400ms), `--ease-default`, `--ease-out`, `--ease-spring` motion tokens (T-04)
- `tokens/index.css`: `@import './motion.css'` added to the token import chain (T-04)

### Changed
- `site/src/pages/index.astro`: `.card`, `.card:hover`, `.card-highlight-dark`, `.specimen-card`, `.token-card` updated to consume `--card-*` Tier-3 tokens; `.card-highlight-dark` now drives the border via scoped `--card-border` override rather than a hard `border` shorthand; `.card` and `.token-card` transitions migrated from hardcoded durations to `--duration-*`/`--ease-*` motion tokens (T-09)
- `site/src/pages/getting-started.astro`: "Using Tokens" card example updated to demonstrate Tier-3 `--card-*` tokens (T-09)
- `site/src/styles/site.css`: button variant rules updated to consume `--btn-*` Tier-3 tokens; `.btn` base class changed from `border: none` to `border: 1.5px solid transparent` so ghost border renders via token; dark-mode `[data-theme="dark"] .btn-s:hover` override removed (now handled by `--btn-s-hover-bg` in `dark-light.css`); disabled state added via `--btn-disabled-opacity` (T-08)
- `tokens/base.css`: naked `<a>` rule updated to consume `--link-color`, `--link-hover-color`, and `--link-visited-color` tokens (T-08)
- `CLAUDE.md`: build command updated to include `tokens/components.css` in the tokens-only artifact step (T-08)
- `tokens/base.css`, `site/src/styles/site.css`: all hardcoded `transition` durations and easing values replaced with `--duration-*` and `--ease-*` tokens — 17 declarations updated across 16 rule sets (T-04)
- `CLAUDE.md`: build command updated to include `tokens/motion.css` in the `cat` concatenation (T-04)

### Documentation
- `CLAUDE.md`: declared `site/` pages as the canonical component specification; removed ambiguity about external sources (T-03)
- `CLAUDE.md`: Phase 4 quality gates now marked mandatory for all effort sizes, with explicit low-effort guidance for `XS` tasks (T-03)

### Refactored
- Extracted shared `Footer` component to `site/src/components/Footer.astro`; `DocLayout.astro` and `index.astro` now use `<Footer>` with a default slot for context-specific nav links (T-01)

### Fixed
- `index.astro`: `.usage-dark` pill in dark mode now uses `var(--in0-void)` background and `var(--bm0-sand)` text; previously used a semi-transparent `--in1-iron` that blended into the card surface, making the pill invisible
- `site.css`: `.btn-d:hover` was using hardcoded `#a8343e`; replaced with `var(--in0-void)`
- `site.css`: `.hamburger` color and hover background were using `rgba(245,244,240,...)` (stale bm2-parchment value `#F5F4F0`); corrected to `rgba(247,246,243,...)` matching current `--bm2-birch`
- `site.css`: `.hamburger:hover` color was `var(--bm2-parchment)` (undefined token); replaced with `var(--bm2-birch)`
- `index.astro`: copy-button color was `var(--bs2-parchment)` (wrong prefix, undefined token); replaced with `var(--bm2-birch)`
- `index.astro`: `.usage-light` dark-mode tint was `rgba(228,226,218,...)` (stale bm1-mist value); corrected to `rgba(233,230,220,...)` matching current `--bm1-mist`

### Changed
- Replaced `data-surface="light"`, `"dark"`, `"tinted"` with a symmetric 3-surface relative model: `"base"` (page-level), `"layer"` (cards/panels), `"overlay"` (modals/dropdowns). All surfaces adapt automatically when the page theme switches (T-19)
- `[data-theme="dark|light"]` now sets `background: var(--color-bg)` in addition to custom properties, making it self-contained when applied to any element — enabling `data-theme` + `data-surface` composition (T-19)
- Renamed `--color-bg-elevated` → `--color-bg-panel` and `--color-bg-sunken` → `--color-bg-inset` throughout all token definitions and site styles (T-19)
- Badge text tokens (`.badge-published`, `.badge-draft`, `.badge-archived`, `.badge-beta`, `.badge-research`, `.badge-category`) now use `var(--color-accent-text)` instead of direct `var(--bm2-birch)`
- Birch Mist palette differentiation widened: `--bm0-sand` #E4E2DA → #D5D2C7, `--bm1-mist` (was `linen`) #EEEDE9 → #E9E6DC, `--bm2-birch` (was `parchment`) #F5F4F0 → #F7F6F3; lightness spread per step increases from ~5–6 pts to ~9–10 pts for better screen differentiation
- `--bm1-linen` renamed to `--bm1-mist`; `--bm2-parchment` renamed to `--bm2-birch` — names now reflect the palette's birch/mist character
- `--color-ghost-border` dark mode rgba updated from `rgba(245,244,240,0.25)` → `rgba(247,246,243,0.25)` to match new bm2-birch value

### Added
- `site/src/scripts/subnav-tracker.js`: shared `initSubNavTracker(subNavEl, options)` utility — extracts duplicated `IntersectionObserver` scroll-tracking from `DocLayout.astro` and `index.astro`; targets derived from nav link `href` attributes, `CSS.escape()` applied consistently, accepts `threshold`/`activateFirst`/`setScrollPadding` options
- `--color-error`, `--color-warning`, `--color-success` semantic tokens in `tokens/dark-light.css` (map to `--bl0-ember`, `--bl2-grain`, `--bl3-moss`; same in both modes)
- Badge redesign: 7 solid-palette-token variants replacing 6 semi-transparent variants
  - New classes: `.badge-general`, `.badge-published`, `.badge-draft`, `.badge-archived`, `.badge-beta`, `.badge-research`, `.badge-category`
  - Old classes removed: `.badge-neutral`, `.badge-forest`, `.badge-moss`, `.badge-grain`, `.badge-ember`, `.badge-heather`
  - All variants use opaque `var(--*)` tokens; no dark-mode overrides required
  - WCAG AA contrast: all 7 pass at 4.5:1 or better
- `--color-border-strong`, `--color-border-subtle`, `--color-ghost-border`, `--color-bg-code`, `--color-error`, `--color-warning`, `--color-success` documented in `tokens/colors.astro` Semantic Token Layer section
- Intentional transparent-overlay pattern documented in `site/src/styles/site.css` above `.nav`

### Changed
- `site.css`: `.nav.filled .theme-toggle` and `.github-link` now use `var(--color-text-tertiary)` (was `var(--kn3-ash)`)
- `site.css`: `.nav.filled .nav-cta:hover` and `.btn-p:hover` now use `var(--color-accent-text)` (was `var(--bs2-parchment)`)
- `site.css`: `.btn-d` background now uses `var(--color-error)` (was `var(--bl0-ember)`)
- `site.css`: `.footer-logo span` now uses `var(--color-accent)` (was `var(--fr1-fern)`)
- `site.css`: `.sub-nav` default border now uses `var(--color-border-subtle)` (was `rgba(75,85,99,0.25)`)
- `index.astro`: Card-highlight tag/arrow colour now uses `var(--color-accent)` (was `var(--fr0-sage)`)
- `index.astro`: Field focus `box-shadow` glow removed; outline-only focus indicator retained from `base.css`
- `index.astro`: `.field-error` and `.field-error-msg` now use `var(--color-error)` (was `var(--bl0-ember)`)
- `index.astro`: Attribution demo dark border now uses `var(--color-border)` (was `var(--kn2-slate)`)
- `index.astro`: Copy button text now uses `var(--bs2-parchment)` (was `white`)
- `index.astro`: Palette swatch hex label colours now use palette tokens (was Tailwind `#9CA3AF`/`#D1D5DB`)
- `index.astro`: Semantic layer diagram mode labels now use `var(--color-accent)` (was `var(--fr1-fern)`)
- Stale documentation corrected: Buttons table dark Primary and Text link columns updated from `--fr0-sage` to `--fr1-fern` (`components/index.astro`)
- Stale documentation corrected: `about.astro` dark-mode snippet updated from `--fr0-sage` to `--fr1-fern`
- Stale documentation corrected: `getting-started.astro` comment updated from "Fern (light) or Sage (dark)" to "always Fern"
- `--bl4-heather` role description updated to "Special states, beta, experimental" (Research now uses `--bl1-ochre`)

- Fern icon (`fern_icon.png`) as favicon (ICO + PNG + apple-touch-icon), nav/footer wordmark icon, and README header image; removed placeholder `favicon.svg`
- `--color-border-subtle` semantic token (hairline borders; light: `rgba(55,65,81,0.12)`, dark: `rgba(75,85,99,0.25)`)
- `--color-ghost-border` semantic token (semi-transparent border for ghost elements; light: `rgba(55,65,81,0.25)`, dark: `rgba(247,246,243,0.25)`)
- `--color-bg-code` semantic token (code block backgrounds; maps to `--fo3-deepwater` in both modes)
- `--z-content: 10` z-index token (sticky sub-nav stacking, between `--z-raised` and `--z-dropdown`)
- GitHub icon link in nav (Tabler Icons `ti-brand-github`, icon-only with aria-label)
- "Get Started" CTA button in landing page nav linking to `/getting-started`

### Changed
- **Color coherence overhaul** aligned with Nord theme philosophy:
  - Dark mode `--color-accent` now maps to `--fr1-fern` (was `--fr0-sage`); dark mode hover shifts to Sage — Fern is now the primary accent in both modes
  - Dark mode `--color-accent-hover` now maps to `--fr0-sage` (was `--fr1-fern`)
  - Dark mode `--color-bg-sunken` now maps to `--kn0-void` (was `--kn2-slate`); depth hierarchy void < iron < void matches inset expectation
  - Dark mode `--color-text-secondary` now maps to `--bs1-linen` (was `--bs0-sand`); full Birch Storm 3-level scale restored
  - Dark mode `--color-text-tertiary` now maps to `--bs0-sand` (was `--kn3-ash`); text hierarchy stays within Birch Storm family
  - Dark mode `--color-bg-code` now maps to `--kn1-iron` (was `--fr3-deepwater`); deepwater on void had near-zero contrast
  - Light mode `--color-border` now maps to `--kn3-ash` (was `--kn1-iron`); reduces default border weight from 9:1 to ~4:1
  - New `--color-border-strong` token added (light: `--kn1-iron`, dark: `--bs0-sand`) for intentionally heavy borders
  - `data-surface` overrides updated to match all the above in their respective contexts
- Nav `.nav-logo span` and `.nav-links a.active` now use `var(--color-accent)` (was hardcoded `var(--fr0-sage)`)
- `[data-theme="dark"] .btn-s:hover` now uses `var(--kn2-slate)` (was `var(--kn3-ash)`)
- `hr.section-divider` no longer applies `opacity: 0.4` (ash-weight border is already light enough)
- Field input hover/focus in dark mode explicitly uses `var(--kn2-slate)` to prevent invisible inputs when `--color-bg-sunken` resolves to void
- All 17 color token cards in landing page updated with new usage pills aligned to final tag definitions
- Usage pill styles are now mode-invariant (no dark-theme overrides): light=parchment/iron, dark=slate/parchment, both=sage/void
- Semantic layer diagram updated to reflect dark mode changes (accent→fern, accent-hover→sage, text-secondary→linen, text-tertiary→sand, bg-sunken→void)
- `--fr0-sage` token comment updated to "Supporting accent, dark-mode hover state"
- Nav and footer logo switched from inline formatting to flexbox; icon grows from ~27.5px to 40px in the nav bar and 56px in the footer; footer tagline and nav links indent to align under the "Farn." wordmark
- Landing page replaced with full prototype implementation (hero, Design System view, Palette view)
- Hero and footer now use `data-surface="dark"` with semantic tokens throughout (no hardcoded palette refs)
- Semantic comparison dark card uses `data-surface="dark"` instead of inline `var(--in1-iron)`
- Code blocks use `var(--color-bg-code)` instead of direct `var(--fo3-deepwater)`
- Hero secondary CTA changed from "Read the guide" to "Getting Started →" linking to `/getting-started`
- Version strings updated from "v2.0" to "v0.1.0"
- DocLayout: sidebar removed; full-width content layout; nav updated to match prototype style
- DocLayout: nav always starts in filled state (no transparent-over-hero behavior)
- DocLayout: Tabler Icons added for theme toggle (sun/moon) and hamburger
- `site/src/styles/site.css` created as shared stylesheet for nav, buttons, badges, footer, and animations

### Removed
- PWA Patterns page (`/pwa`) — not yet production-ready

---

## [0.1.0] — 2026-05-27

### Added
- Initial public release
- Four color palettes: Iron Night, Birch Mist, Forest, Bloom (17 tokens)
- Semantic token layer with light and dark mode (`[data-theme]`)
- Surface pattern overrides (`[data-surface="light|dark|tinted"]`)
- Typography tokens: Fraunces, Instrument Sans, JetBrains Mono
- Spacing scale (xs–4xl), layout widths, border radius, z-index scale
- Base reset and global styles
- `dist/farn.css` — single-file distributable
- CDN distribution via jsDelivr
