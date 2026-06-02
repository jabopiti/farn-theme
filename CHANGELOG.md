# Changelog

All notable changes to Farn will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
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
