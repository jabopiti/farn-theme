# Farn Design System — Color Palette Usage Review

---

## ✅ Correctly Applied Use Cases

- `--color-accent` — `site.css: .nav.filled .nav-links a.active`, `.sub-nav-indicator`, `.section-eyebrow`, `.page-eyebrow`, `.btn-p`, `.mobile-drawer .drawer-cta`, `.scale-bar`, `.decorative hr`, `.blockquote-demo`, `.pullquote-rule` — Primary accent applied to every interactive highlight, indicator, and CTA as documented.

- `--color-accent` + `--color-accent-text` — `site.css: .btn-p`, `index.astro: .btn-primary`, `DocLayout.astro: .nav.filled .nav-cta` — Primary CTA buttons correctly use `var(--color-accent)` background and `var(--color-accent-text)` text, achieving the documented 4.80:1 Fern-on-Parchment ratio.

- `--color-accent-hover` — `site.css: .btn-p:hover` background, `.mobile-drawer .drawer-cta:hover` — Hover shift to `--fr2-forest` (light) or `--fr0-sage` (dark) as defined in `dark-light.css`.

- `--color-bg`, `--color-bg-elevated`, `--color-bg-sunken` — `site.css: .mobile-drawer`, `.btn-s`, `DocLayout.astro .doc-container code`, `pre`, `th`, `td` — Surface backgrounds follow the documented three-level depth hierarchy (sunken < base < elevated).

- `--color-bg-code` — `index.astro: .specimen-mono`, `.code-block`, `DocLayout.astro .doc-container pre` — Code block backgrounds use the semantic token throughout; correctly resolves to `--fr3-deepwater` (light) or `--kn1-iron` (dark) per the CHANGELOG overhaul.

- `--color-text`, `--color-text-secondary`, `--color-text-tertiary` — Used throughout all doc pages (colors, typography, spacing, components, about, getting-started) for primary, supporting, and placeholder text — correct three-level text hierarchy in all cases.

- `--color-border`, `--color-border-subtle` — `DocLayout.astro: th border-bottom`, `tr border-bottom`, `hr`, `blockquote border-left`, `site.css: .sub-nav.filled`, `.footer-hr`, `about.astro: .palette-card border` — Default and hairline borders use semantic tokens throughout filled/document contexts.

- `--bl0-ember` — `index.astro: .field-error .field-input border-color`, `.field-error-msg color`, `site.css: .btn-d background` — Error states and destructive button all use `--bl0-ember` exclusively, matching the "Errors, deletions, destructive actions" documented role.

- `--bl2-grain`, `--bl3-moss` — `index.astro: .wcag-large`, `.wcag-pass` — Grain and Moss applied as WCAG warning/pass status indicators, matching their Warning and Success semantic roles.

- `data-surface="dark"` — `index.astro: hero section`, `about section`, footer; `DocLayout.astro: footer` — Dark surface applied correctly to hero, feature callouts, and footer as specified in the component doc.

- `data-surface="tinted"` — `index.astro: #components section` — Tinted surface applied to the secondary content section, matching the documented "subtle variation, subsections" use case.

- Usage pills (`.usage-light`, `.usage-dark`, `.usage-both`) in `index.astro` — Directly reference `var(--bs2-parchment)`, `var(--kn1-iron)`, `var(--kn2-slate)`, `var(--fr0-sage)`, `var(--kn0-void)`. Per CHANGELOG, these are intentionally mode-invariant (no dark-theme overrides), which is correct and documented.

- Syntax-coloring tokens inside `.code-block` — `index.astro: .code-comment` uses `var(--fr0-sage)`, `.code-prop` uses `var(--bs0-sand)`, `.code-val` uses `var(--bs2-parchment)` — These map to the syntax-highlighting roles already documented in `colors.css` comments ("Comments, placeholders, guides"; "Supporting accent"; "primary text on dark"). Legitimate palette-direct use for brand-moment code display.

- `--kn2-slate` — `[data-theme="dark"] .btn-s:hover`, `[data-surface="dark"] .btn-s:hover` in `site.css` — Intentional per CHANGELOG: prevents invisible secondary button when `--color-bg-sunken` resolves to `--kn0-void`. Correct workaround.

- `--kn2-slate` — `[data-theme="dark"] .field-input:hover` and `:focus` in `index.astro` — Same rationale as above; documented in CHANGELOG.

- Hero palette strip `aria-hidden="true"` — `index.astro` lines 508–525 — All 17 palette hex values hardcoded in a decorative, screen-reader-invisible element. Acceptable as a brand-moment showcase.

---

## ❌ Incorrectly Applied Use Cases

- `var(--fr0-sage)` — `about.astro:83` — The Two-Layer Architecture code snippet shows `[data-theme="dark"] { --color-accent: var(--fr0-sage); }`. This reflects the pre-overhaul mapping. Per CHANGELOG (Color coherence overhaul), dark mode `--color-accent` now resolves to `--fr1-fern`. Use `var(--fr1-fern)` for `--color-accent` and `var(--fr0-sage)` for `--color-accent-hover` in the corrected snippet.

- `"Fern (light) or Sage (dark)"` — `getting-started.astro:84` — Code comment on the `.btn-primary` example reads `/* Fern (light) or Sage (dark) */`. Since the overhaul, dark mode `--color-accent` is also Fern — the comment should read `/* Fern in both modes */`.

- `--fr0-sage` — `components/index.astro:54` — Buttons table, dark-bg column for Primary variant reads "`--fr0-sage`, Parchment text." Per the updated semantic layer, `--color-accent` in dark mode resolves to `--fr1-fern`, not sage. Update to "`--fr1-fern` (via `--color-accent`), Parchment text."

- `--fr0-sage` — `components/index.astro:58` — Text link row, dark column reads "`--fr0-sage` text, underline." Same issue — should read "`--fr1-fern` text (via `--color-accent`), underline."

- `var(--fr1-fern)` — `site.css: .footer-logo span` — The footer `<span>` that renders the "." in "Farn." uses `var(--fr1-fern)` directly. The footer is always wrapped in `data-surface="dark"`, where `--color-accent` resolves to the same value, but bypassing the semantic layer breaks the indirection the system depends on. Replace with `var(--color-accent)`.

- `var(--kn3-ash)` — `site.css: .nav.filled .theme-toggle` and `.nav.filled .github-link` — Tertiary icon colors on the filled nav use `var(--kn3-ash)` directly instead of `var(--color-text-tertiary)`. In light mode these are the same value, but in dark mode the filled nav could theoretically switch context; using `--color-text-tertiary` keeps intent explicit. Replace both with `var(--color-text-tertiary)`.

- `var(--fr0-sage)` — `index.astro: .card-highlight-light .card-tag`, `.card-highlight-light .card-arrow`, `.card-highlight-dark .card-tag`, `.card-highlight-dark .card-arrow` — These are accent-coloured text elements inside dark-background card variants. The correct approach is to add `data-surface="dark"` to the card element and use `var(--color-accent)`, letting the semantic layer supply the right value. Direct sage reference bypasses mode-awareness.

- `var(--fr1-fern)` — `index.astro: .semantic-mode-label` inline style — The "Light mode" and "Dark mode" labels inside the semantic comparison grid use `color:var(--fr1-fern)`. The dark-mode card has `data-surface="dark"`, so `--color-accent` would correctly resolve to Fern there. Replace with `var(--color-accent)` in both cases.

- `var(--kn2-slate)` — `index.astro: [data-theme="dark"] .attribution-demo` border — The attribution card's dark-mode border uses `var(--kn2-slate)` directly. In dark mode, `--color-border` resolves to `var(--kn2-slate)` — the value is identical, but the semantic layer should be respected. Replace with `var(--color-border)`.

- `var(--bs2-parchment)` — `site.css: .btn-p:hover color` and `.nav.filled .nav-cta:hover color` — Hover text on primary CTA buttons uses `var(--bs2-parchment)` directly instead of `var(--color-accent-text)`. The semantic token exists specifically for this purpose. Replace with `var(--color-accent-text)`.

- `"Forest — --fr1-fern"` — `components/index.astro` Badge table, "Primary category" row — Describes the badge as using `--fr1-fern`, but `site.css .badge-forest` uses `var(--fr2-forest)` for text color and `rgba(62,122,98,0.12)` (fern rgb) for background. The table entry conflates the badge name, the background source, and the text token. Clarify: background `rgba(--fr1-fern, 0.12)`, text `var(--fr2-forest)`.

---

## 🕳️ Gaps — Use Cases Not Covered by the Palette

- **Semantic error/warning/success tokens** — `site.css` and `index.astro` — `.btn-d`, `.field-error .field-input`, `.field-error-msg` reference `--bl0-ember` directly because there is no `--color-error` semantic alias. Similarly, no `--color-warning`, `--color-success`, or `--color-annotation` tokens exist. Every component that shows a state badge or validation message must know the raw Bloom token. A `--color-error: var(--bl0-ember)` semantic alias (and equivalents for the other Bloom roles) would complete the semantic layer.

- **Focus-ring glow token** — `index.astro: .field-input:focus` and `components/index.astro` code example — The focus ring glow `rgba(62,122,98,0.15)` (light) and `rgba(92,158,134,0.18)` (dark) are hardcoded in at least three locations. No semantic token covers this. A `--color-focus-glow` token (or documentation of the intended rgba formula) would let every input and interactive element share a single definition.

- **Transparent-nav / transparent-subnav state** — `site.css` — When the nav and sub-nav are transparent (over the hero), link and icon colors are `rgba(245,244,240,0.7)`, `rgba(245,244,240,0.6)`, and border is `rgba(75,85,99,0.25)`. These are not documented tokens — they form an undocumented third surface state (transparent-on-dark). No guidance exists for how consumers should recreate a transparent nav in their own projects.

- **`--color-border-strong`, `--color-ghost-border`, `--color-bg-code` missing from the doc page** — `site/src/pages/tokens/colors.astro` — All three tokens are defined in `tokens/dark-light.css`, noted in the CHANGELOG as newly added, and used throughout the site — but the Semantic Token Layer section in `colors.astro` only lists 10 of the 14 semantic tokens. The doc page omits `--color-border-strong`, `--color-ghost-border`, `--color-bg-code`, and `--color-accent-text`.

- **Destructive button hover** — `site.css: .btn-d:hover` — The destructive button hover state uses `#a8343e` (a manually darkened Ember). There is no documented mechanism for producing a "hover darker" variant of a Bloom token. The palette spec does not address tone-shift hover variants for semantic colors.

- **Badge text contrast colors** — `site.css: .badge-moss`, `.badge-grain`, `.badge-ember`, `.badge-heather` — Each badge requires a darker light-mode text color and a lighter dark-mode text color (eight hardcoded hex values total) because the Bloom tokens themselves don't pass 4.5:1 on a 12%-opacity tinted background. There is no palette token for these adjusted-for-contrast variants, no semantic coverage, and no documentation of how the values were derived.

---

## 🎨 Out-of-Palette Colors

- **Value**: `#a8343e`
  **Location**: `site.css: .btn-d:hover` — destructive button hover background
  **Assessment**: ❌ Replace — this is a manually darkened `--bl0-ember`. The palette has no hover-state variant for Bloom tokens. Add a `--color-error-hover` semantic token (e.g. mapping to a new `--bl0-ember-dark` palette entry, or use `color-mix(in srgb, var(--bl0-ember) 85%, black)`).

- **Value**: `rgba(55,65,81,0.2)`
  **Location**: `site.css: .nav.filled` — border-bottom in light mode
  **Assessment**: ⚠️ Keep — specific use case. This is `--kn1-iron` (rgb 55,65,81) at 20% opacity for a subtle filled-nav hairline. CSS variables cannot produce transparent variants without color-mix() or predefined rgba tokens. Acceptable until a `--color-nav-border` semantic token is defined.

- **Value**: `rgba(75,85,99,0.4)`
  **Location**: `site.css: [data-theme="dark"] .nav.filled` — border-bottom in dark mode
  **Assessment**: ⚠️ Keep — specific use case. Same rationale; `--kn2-slate` (75,85,99) at 40% opacity.

- **Value**: `rgba(75,85,99,0.25)`
  **Location**: `site.css: .sub-nav` default border
  **Assessment**: ❌ Replace — `--color-border-subtle` in dark mode is defined as exactly this value. The `.sub-nav` unfilled state should use `var(--color-border-subtle)` instead of the hardcoded rgba, matching the already-correct `.sub-nav.filled` rule one line above.

- **Value**: `rgba(245,244,240,0.7)`, `rgba(245,244,240,0.6)`, `rgba(245,244,240,0.35)`, `rgba(245,244,240,0.1)`, `rgba(245,244,240,0.25)`
  **Location**: `site.css` — nav transparent-state link colors, icon colors, CTA border
  **Assessment**: ⚠️ Keep — specific use case. `--bs2-parchment` (245,244,240) at varying opacities for the transparent-over-hero nav state. No palette equivalent; transparency is inherent to the use case. Recommend documenting these as a named "transparent nav palette" in the token spec.

- **Value**: `rgba(245,244,240,0.15)`, `rgba(245,244,240,0.25)`
  **Location**: `index.astro: .code-copy-btn` — background and hover background inside code blocks
  **Assessment**: ⚠️ Keep — specific use case. Copy button lives on a dark code-block surface and needs a semi-transparent parchment tint. No palette token exists for UI overlays on code backgrounds.

- **Value**: `rgba(62,122,98,0.12)` and `rgba(62,122,98,0.15)`
  **Location**: `site.css: .badge-forest` bg; `index.astro: .card-icon-wrap` bg, `hero::before` gradient, `.attribution-avatar` bg, `.field-input:focus` glow
  **Assessment**: ⚠️ Keep — specific use case. `--fr1-fern` (62,122,98) at low opacity for tinted fills and glows. Transparency is required; raw value cannot be replaced with the variable. Recommend adding `--color-focus-glow` to the semantic layer for the focus-ring usage specifically.

- **Value**: `rgba(37,77,90,0.15)`
  **Location**: `index.astro: .hero::before` — radial gradient second stop
  **Assessment**: ⚠️ Keep — specific use case. Close to `--fr3-deepwater` (#254D5A = 37,77,90) at 15% opacity. Decorative hero atmosphere gradient; transparency needed.

- **Value**: `rgba(92,158,134,0.15)` and `rgba(92,158,134,0.18)`
  **Location**: `site.css: [data-theme="dark"] .badge-forest` bg, `index.astro: [data-theme="dark"] .card-icon-wrap` bg, `[data-theme="dark"] .attribution-avatar` bg; dark-mode focus glow
  **Assessment**: ⚠️ Keep — specific use case. `--fr0-sage` (92,158,134) at low opacity; transparency required.

- **Value**: `rgba(86,122,55,0.12)` / `rgba(86,122,55,0.15)`, `rgba(141,107,32,0.12)` / `rgba(141,107,32,0.15)`, `rgba(197,65,76,0.1)` / `rgba(197,65,76,0.15)`, `rgba(136,93,180,0.12)` / `rgba(136,93,180,0.15)`
  **Location**: `site.css: .badge-moss`, `.badge-grain`, `.badge-ember`, `.badge-heather` — badge backgrounds (light and dark)
  **Assessment**: ⚠️ Keep — specific use case. These are `--bl3-moss`, `--bl2-grain`, `--bl0-ember`, `--bl4-heather` at 10–15% opacity for badge fill tints. CSS variable transparency is required.

- **Value**: `#3A5523` (badge-moss light text), `#7AAD52` (badge-moss dark text)
  **Location**: `site.css: .badge-moss` and `[data-theme="dark"] .badge-moss`
  **Assessment**: ⚠️ Keep — accessibility. `--bl3-moss` (#567A37) at 12% opacity produces a very light green background. The moss token itself does not pass 4.5:1 against that tinted bg in light mode (computed ~3.2:1 on near-white); `#3A5523` is a manually darkened variant that does pass. Dark mode needs a lighter variant (`#7AAD52`) for the darker background. Neither has a palette equivalent.

- **Value**: `#6B4E17` (badge-grain light), `#C4943A` (badge-grain dark)
  **Location**: `site.css: .badge-grain` text colors
  **Assessment**: ⚠️ Keep — accessibility. Same rationale as badge-moss: `--bl2-grain` itself fails contrast on the tinted badge background; these are adjusted variants.

- **Value**: `#9B2F38` (badge-ember light), `#E06870` (badge-ember dark)
  **Location**: `site.css: .badge-ember` text colors
  **Assessment**: ⚠️ Keep — accessibility. Same rationale as above for `--bl0-ember`.

- **Value**: `#5E3D8A` (badge-heather light), `#AA82D4` (badge-heather dark)
  **Location**: `site.css: .badge-heather` text colors
  **Assessment**: ⚠️ Keep — accessibility. Same rationale for `--bl4-heather`.

- **Value**: `rgba(0,0,0,0.25)`, `rgba(0,0,0,0.45)`, `rgba(0,0,0,0.08)`, `rgba(0,0,0,0.3)`
  **Location**: `index.astro: .token-color-strip .copy-btn`, `.palette-swatch-large:hover box-shadow`, `.palette-swatch-large border` (light Birch swatches), `[data-theme="dark"] .token-card:hover box-shadow`
  **Assessment**: ⚠️ Keep — specific use case. Pure-black semi-transparent overlays for shadows and definition lines on color chips. Not a palette color; system-level shadow utility.

- **Value**: `rgba(0,0,0,0.06)`, `rgba(0,0,0,0.1)`
  **Location**: `index.astro` — border and copy-btn bg on light Birch-Mist palette swatches
  **Assessment**: ⚠️ Keep — accessibility. Near-white swatches (linen, parchment) require a hairline definition border; `rgba(0,0,0,0.06)` provides just enough contrast without distorting the swatch colour.

- **Value**: `rgba(86,122,55,0.5)`
  **Location**: `index.astro: .code-copy-btn.copied` — success-feedback bg on copy button
  **Assessment**: ⚠️ Keep — specific use case. A 50%-opacity Moss fill used as brief copied-state feedback on a dark code block. No palette equivalent at this opacity; the visual is intentionally ephemeral (1500ms).

- **Value**: `rgba(62,122,98,0.8)`
  **Location**: `index.astro: .copy-btn.copied` — success-feedback on palette swatch copy buttons
  **Assessment**: ⚠️ Keep — specific use case. High-opacity Fern for copied-state feedback on swatch cards. Same ephemeral feedback pattern.

- **Value**: `white`
  **Location**: `index.astro: .token-color-strip .copy-btn` — copy button text on color strips
  **Assessment**: ❌ Replace — a palette equivalent exists: `var(--bs2-parchment)` (#F5F4F0) is the documented "white" of the system and achieves 13.07:1 on Void. Replace `color: white` with `color: var(--bs2-parchment)`.

- **Value**: `#9CA3AF`, `#D1D5DB`
  **Location**: `index.astro` — swatch hex label text in `.palette-swatch-large .swatch-hex` (inline `style` on individual swatch elements)
  **Assessment**: ❌ Replace — these are Tailwind-derived grays not in the Iron Night scale. On the dark iron (#374151) and slate (#4B5563) swatches, use `var(--bs0-sand)` (#E4E2DA, 10.96:1 on Void) for legible contrast. On the void swatch, `var(--kn3-ash)` (#6B7280, 3.35:1 on void — AA large only) is already used correctly as `#6B7280`.

---

## 📋 Task & Recommendation List

### A. Changes to the documentation pages

**High — Correctness / Accuracy**

1. **`about.astro:83`** — Update the Two-Layer Architecture code snippet: change `--color-accent: var(--fr0-sage)` → `var(--fr1-fern)`, and add a second line showing `--color-accent-hover: var(--fr0-sage)`, to reflect the current dark-mode mappings.

2. **`getting-started.astro:84`** — Update the `.btn-primary` code comment from `/* Fern (light) or Sage (dark) */` → `/* Fern in both modes */`.

3. **`components/index.astro:54`** — Buttons table, Primary row, dark-bg column: change "`--fr0-sage`, Parchment text" → "`--fr1-fern` (via `--color-accent`), Parchment text."

4. **`components/index.astro:58`** — Buttons table, Text link row, dark column: change "`--fr0-sage` text, underline" → "`--fr1-fern` text (via `--color-accent`), underline."

5. **`tokens/colors.astro`** — The Semantic Token Layer section (lines 88–118) is missing four tokens that are defined in `dark-light.css` and in active use: `--color-border-strong`, `--color-ghost-border`, `--color-bg-code`, `--color-accent-text`. Add all four to both the Light Mode and Dark Mode code blocks with inline comments.

**Medium — Semantic Layer Consistency**

6. **`site/src/styles/site.css: .footer-logo span`** — Replace `color: var(--fr1-fern)` with `color: var(--color-accent)`.

7. **`site/src/styles/site.css: .nav.filled .theme-toggle` and `.nav.filled .github-link`** — Replace `color: var(--kn3-ash)` with `color: var(--color-text-tertiary)` in both rules.

8. **`site/src/styles/site.css: .sub-nav`** — Change `border-bottom: 1px solid rgba(75,85,99,0.25)` → `border-bottom: 1px solid var(--color-border-subtle)`. The `.sub-nav.filled` already uses the token correctly; the default unfilled state should match.

9. **`site/src/styles/site.css: .btn-p:hover`** — Change `color: var(--bs2-parchment)` → `color: var(--color-accent-text)`.

10. **`site/src/styles/site.css: .nav.filled .nav-cta:hover`** — Change `color: var(--bs2-parchment)` → `color: var(--color-accent-text)`.

11. **`index.astro: .card-highlight-light` and `.card-highlight-dark`** — Add `data-surface="dark"` to both card variant elements in the HTML, then replace `color: var(--fr0-sage)` on `.card-highlight-light .card-tag`, `.card-highlight-light .card-arrow`, `.card-highlight-dark .card-tag`, `.card-highlight-dark .card-arrow` with `color: var(--color-accent)`. The surface declaration will supply the correct token per mode.

12. **`index.astro: .semantic-mode-label`** — Replace the inline `style="color:var(--fr1-fern)"` with `style="color:var(--color-accent)"` on both the light-mode and dark-mode labels (the dark-mode card already has `data-surface="dark"`, so `--color-accent` resolves correctly there).

13. **`index.astro: [data-theme="dark"] .attribution-demo`** — Replace `border: 1px solid var(--kn2-slate)` → `border: 1px solid var(--color-border)`.

14. **`components/index.astro` Badge table** — Clarify the "Primary category" row: change "Forest — `--fr1-fern`" → "Forest — `rgba(--fr1-fern, 0.12)` bg / `--fr2-forest` text" to match the actual `site.css .badge-forest` implementation.

**Low — Polish**

15. **`index.astro: .token-color-strip .copy-btn`** — Change `color: white` → `color: var(--bs2-parchment)`.

16. **`index.astro` palette swatches** — Replace the out-of-palette swatch hex label colors `#9CA3AF` and `#D1D5DB` (inline `style` attributes on `.palette-swatch-large .swatch-hex`) with `color: var(--bs0-sand)` for consistent palette fidelity on dark swatches.

---

### B. Changes to the color palette definitions

**High — Correctness / Accessibility**

1. **`tokens/dark-light.css`** — Add semantic error/success/warning/annotation aliases at the bottom of both `:root` and `[data-theme="dark"]` blocks (values are mode-invariant since Bloom tokens don't shift):
   ```css
   --color-error:      var(--bl0-ember);
   --color-warning:    var(--bl2-grain);
   --color-success:    var(--bl3-moss);
   --color-annotation: var(--bl1-ochre);
   --color-special:    var(--bl4-heather);
   ```
   Add matching entries to all four `[data-surface]` blocks. This eliminates direct Bloom palette references from components.

2. **`tokens/dark-light.css`** — Add a `--color-focus-glow` token:
   ```css
   /* Light */  --color-focus-glow: rgba(62,122,98,0.15);
   /* Dark */   --color-focus-glow: rgba(92,158,134,0.18);
   ```
   Currently hardcoded in `index.astro .field-input:focus` and `components/index.astro` code example. Centralising it makes global focus-style changes a one-line edit.

**Medium — Specification Completeness**

3. **`tokens/colors.css: --bl0-ember` comment** — Update from `/* Errors, deletions */` → `/* Errors, deletions, destructive button background */` to explicitly cover the `.btn-d` usage pattern.

4. **`tokens/dark-light.css` or a new `tokens/dark-light.css` section** — Add a prose comment block documenting the "transparent nav" color values (`rgba(--bs2-parchment, 0.7)` for links, `rgba(--kn1-iron, 0.2)` for border in light, etc.) as named design decisions. These are not formal tokens but should be documented so future contributors do not guess or diverge.

5. **`tokens/dark-light.css`** — Specify a destructive hover mechanism. Options: add `--color-error-hover` (mapping to a new palette token `--bl0-ember-dark: #a8343e`) or document that destructive hover uses `color-mix(in srgb, var(--color-error) 85%, black)`. The current bare hex `#a8343e` in `site.css` is invisible to the token system.

6. **`tokens/colors.css`** — Add a developer note to the Bloom palette block explaining why badge-text colors are not palette tokens: those colors are contrast-adjusted variants derived from Bloom tokens for use on low-opacity tinted backgrounds, and must be calculated per-badge-type to meet WCAG 4.5:1.

**Low — Documentation Polish**

7. **`tokens/colors.css: --fr0-sage` comment** — Tighten from `/* Supporting accent, dark-mode hover state */` → `/* Dark-mode --color-accent-hover; supporting accent on dark surfaces */` to be precise about which semantic token it backs.

8. **`tokens/dark-light.css`** — Add all newly defined semantic tokens (`--color-border-strong`, `--color-ghost-border`, `--color-bg-code`, `--color-accent-text`) to the `[data-surface]` blocks where they are currently missing, and verify they already appear in the surface overrides (they do in the current file — this is a verify-only task).
