# Changelog

All notable changes to Farn will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
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
