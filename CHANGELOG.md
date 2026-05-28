# Changelog

All notable changes to Farn will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- Fern icon (`fern_icon.png`) as favicon (ICO + PNG + apple-touch-icon), nav/footer wordmark icon, and README header image; removed placeholder `favicon.svg`
- `--color-border-subtle` semantic token (hairline borders; light: `rgba(55,65,81,0.12)`, dark: `rgba(75,85,99,0.25)`)
- `--color-ghost-border` semantic token (semi-transparent border for ghost elements; light: `rgba(55,65,81,0.25)`, dark: `rgba(245,244,240,0.25)`)
- `--color-bg-code` semantic token (code block backgrounds; maps to `--fr3-deepwater` in both modes)
- `--z-content: 10` z-index token (sticky sub-nav stacking, between `--z-raised` and `--z-dropdown`)
- GitHub icon link in nav (Tabler Icons `ti-brand-github`, icon-only with aria-label)
- "Get Started" CTA button in landing page nav linking to `/getting-started`

### Changed
- Nav and footer logo switched from inline formatting to flexbox; icon grows from ~27.5px to 40px in the nav bar and 56px in the footer; footer tagline and nav links indent to align under the "Farn." wordmark
- Landing page replaced with full prototype implementation (hero, Design System view, Palette view)
- Hero and footer now use `data-surface="dark"` with semantic tokens throughout (no hardcoded palette refs)
- Semantic comparison dark card uses `data-surface="dark"` instead of inline `var(--kn1-iron)`
- Code blocks use `var(--color-bg-code)` instead of direct `var(--fr3-deepwater)`
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
- Four color palettes: Iron Night, Birch Storm, Forest, Bloom (17 tokens)
- Semantic token layer with light and dark mode (`[data-theme]`)
- Surface pattern overrides (`[data-surface="light|dark|tinted"]`)
- Typography tokens: Fraunces, Instrument Sans, JetBrains Mono
- Spacing scale (xs–4xl), layout widths, border radius, z-index scale
- Base reset and global styles
- `dist/farn.css` — single-file distributable
- CDN distribution via jsDelivr
