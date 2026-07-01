# Farn — Design System Review

Staff-level review of the design system, the Astro landing page, and the doc pages.
Scope commit: `claude/design-system-review-xckuy9` at v0.6.1.

Priority axes (tie-break order): **1** Design-system architecture · **2** Code quality ·
**3** Dogfooding fidelity · **4** Page quality. Lenses applied throughout: Accessibility
(WCAG 2.1 AA), Performance, Token & API architecture, Visual craft.

---

## Phase 0 — Inventory

**Stack.** Framework-agnostic CSS design system. Source in `tokens/*.css`, concatenated to
`dist/*.css` by a `cat`-based npm `build` script (no PostCSS/Sass). Docs site is Astro
(`site/`), static-first, with a handful of vanilla-JS islands (`nav.js`, `tabs.js`,
`code-copy.js`, `scroll-reveal.js`, `subnav-tracker.js`). Styling strategy = CSS custom
properties + shipped component classes. Theming via `data-theme` (light/dark) and
`data-surface` (base/layer/overlay/featured) attributes.

**Token architecture.** Three tiers:
- Tier 1 — palette (`tokens/colors.css`): `--in*` (Iron Night), `--bm*` (Birch Mist),
  `--fo*` (Forest), `--bl*` (Bloom). 15 raw colors.
- Tier 2 — semantic (`tokens/dark-light.css`): `--color-*` mapped per theme + four
  `data-surface` blocks.
- Tier 3 — component (`tokens/components.css`): `--btn-*`, `--card-*`, `--badge-*`, etc.

  Non-color categories are single-layer (`spacing.css`, `typography.css`, `motion.css`).
  Categories covered: color, space, type scale (`--text-*`), font families, radius, z-index,
  duration, easing, breakpoints (reference-only). **Not covered:** shadow (only ad-hoc
  `--overlap-card-shadow-*`), a 16px spacing step.

**Component inventory** (Tier-3 tokens + `component-classes.css` classes): badge (7 variants),
button (4 variants × 3 sizes + loading), form fields (input/textarea/select/checkbox/radio,
error state), card (outlined/highlight/interactive + anatomy), layered-overlap primitives
(section/card/wave/arc/blob/skew/stack), pagination, breadcrumb, accordion, separators, quotes
(blockquote/pull/testimonial), code block + inline code + copy button, tooltip, table
(striped/hover/sm/lg), spinner (3 sizes), skeleton, tabs, nav + drawer + footer. Layout
primitives are a separate opt-in file (`layout.css` → `farn-layout.css`).

**Pages.** Landing (`index.astro`, standalone, 7 sections). Docs under `DocLayout.astro`:
Foundations (overview, surfaces, layout, responsive, accessibility), Styles (color, typography,
spacing, motion, icons), Components (6 group pages + overview), Templates (overview, landing-page).
Nav model is data-driven from `navigation.ts`.

---

## Epics

## [EPIC-A] Repair the landing-page client scripts
The landing page ships two broken/duplicated inline scripts that throw at runtime and duplicate
`nav.js`. Fixing them removes console errors, dead code, and a state-desync bug.
Order / dependencies: ISSUE-1 before ISSUE-2 (both touch the same `<script>` blocks).
Contains: ISSUE-1, ISSUE-2

## [EPIC-B] Restore the token layer boundary in the theme file
Component-tier tokens and card-highlight tokens leak into / are missing from the semantic theme
file, breaking the "define once, consume everywhere" chain and causing a dark-mode regression.
Order / dependencies: ISSUE-3 and ISSUE-4 are independent but both edit `dark-light.css`; land together.
Contains: ISSUE-3, ISSUE-4

## [EPIC-C] Fix AA contrast failures the tokens already flag
The token files contain inline comments admitting specific contrast failures that still ship.
Contains: ISSUE-5

## [EPIC-D] Make the pages dogfood the palette instead of duplicating it
Swatches and demos hardcode palette hex that duplicates `colors.css`, so the "single source of
truth" claim the pages make about themselves is false.
Contains: ISSUE-6, ISSUE-7

## [EPIC-E] Remove dead weight & doc drift
Unused component file, mislabeled changelog entries, and doc/impl mismatches.
Contains: ISSUE-8, ISSUE-9, ISSUE-10

---

## Issues

### [ISSUE-1] Remove the broken `getElementById('nav')` smart-nav script on the landing page
- Type: Fix · Axis: Code quality · Lens: Token & API architecture, Performance
- Severity: High · Effort: S
- Epic: EPIC-A

Finding:
`site/src/pages/index.astro` L707–725 runs an inline smart-nav script that starts with
`const nav = document.getElementById('nav')`. No element with `id="nav"` exists — `SiteNav.astro`
(L19–24) renders `<nav class="nav" …>` with **no id**. `nav` is therefore `null`, and the scroll
handler at L715 (`nav.classList.remove('hidden')`) throws
`TypeError: Cannot read properties of null` on the first scroll event, on every scroll, for the
life of the page. The behaviour it intends (fill + auto-hide on scroll) is already implemented
correctly by `site/src/scripts/nav.js` L82–98, which `SiteNav` loads and which is driven by the
`data-nav-fill` / `data-nav-autohide` attributes `SiteNav` sets when `filled` is false (the
landing case). The inline block is dead, duplicated, and error-throwing.

Acceptance criteria:
- [ ] The L707–725 inline smart-nav script is removed from `index.astro`.
- [ ] Nav still fills after scrolling past the hero and auto-hides on scroll-down (behaviour preserved via `nav.js`).
- [ ] No console errors on scroll on the landing page.

### [ISSUE-2] Fix the demo theme toggle so the nav icon stays in sync, and drop dead icon refs
- Type: Fix · Axis: Code quality · Lens: Visual craft, Accessibility
- Severity: Medium · Effort: S
- Epic: EPIC-A

Finding:
The §5 demo toggle script in `index.astro` (L728–751) flips `data-theme` and then tries to update
`document.getElementById('themeIcon')` and `getElementById('themeToggle')` (L746–749). Neither id
exists — the nav toggle is `<button class="nav-theme-toggle">` with an inline SVG (SiteNav L40–43),
managed by `nav.js`'s `syncIcon()`. The `if (…)` guards make these safe no-ops, so they are dead
code referencing a removed icon-font toggle. Consequence: after the user clicks "Switch to Dark"
in §5, the **nav** theme button's moon/sun icon and `aria-label` are never refreshed and go stale
(icon shows the wrong state, `aria-label` announces the wrong action to screen readers) until the
next full paint.

Acceptance criteria:
- [ ] Dead `themeIcon` / `themeToggle` getElementById lines removed.
- [ ] Toggling theme via the §5 demo button updates the nav theme button's icon and `aria-label` (e.g. by dispatching the same code path `nav.js` uses, or calling a shared sync).
- [ ] Nav icon and `aria-label` match the active theme after using either toggle.

### [ISSUE-3] Stop redefining component-tier button tokens inside the semantic theme file
- Type: Fix · Axis: Design-system architecture · Lens: Token & API architecture
- Severity: High · Effort: M
- Epic: EPIC-B

Finding:
`--btn-*` tokens are declared in `tokens/components.css` (L26–54) *and* re-declared in all three
theme blocks of `tokens/dark-light.css`: no-JS dark (L53–66), light (L106–117), dark (L160–171).
Several redeclarations are byte-identical duplicates of the Tier-3 defaults — e.g.
`--btn-p-bg: var(--color-accent)` appears in components.css L27 and dark-light.css L106 and L160.
This inverts the intended layering (Tier 3 should consume Tier 2, not be re-authored inside it),
and means a change to a button default must be made in up to four places. The redeclarations that
*do* differ per theme (`--btn-p-active-bg: var(--fo1-fern)` in dark vs the semantic
`--color-accent-active`; `--btn-g-active-bg`, `--btn-g-text`/`--btn-s-text` needing `--bm2-birch`)
reveal the real gap: these are per-theme values with no backing semantic token, so the component
layer reaches past Tier 2 into palette tokens.

Acceptance criteria:
- [ ] `dark-light.css` contains no `--btn-*` declaration that is identical to its `components.css` default.
- [ ] Any `--btn-*` value that genuinely varies by theme is backed by a semantic token (e.g. add `--color-accent-pressed`, `--color-on-ghost`) defined in `dark-light.css`; `components.css` maps `--btn-*` to those semantic tokens only.
- [ ] Rendered button colors (all 4 variants × idle/hover/active/disabled) are unchanged in light and dark, verified visually.
- [ ] Changing `--color-accent` in one place updates primary buttons in both themes with no other edits.

### [ISSUE-4] Define card-highlight text/border tokens for dark mode (currently undefined → fallback)
- Type: Fix · Axis: Design-system architecture · Lens: Token & API architecture, Accessibility, Visual craft
- Severity: High · Effort: S
- Epic: EPIC-B

Finding:
`--color-card-highlight-text`, `-text-secondary`, `-text-tertiary`, and `-border` are declared
**only** in the light block of `dark-light.css` (L99–102). The `[data-theme="dark"]` block (L129–174)
sets only `--color-card-highlight-bg` (L156); the no-JS dark block (L49) likewise. `.card-highlight`
(component-classes.css L187–194) does `--color-text: var(--card-highlight-text)` where
`--card-highlight-text` → `var(--color-card-highlight-text)`, which is **undefined in dark mode**.
The declaration becomes invalid-at-computed-value-time, so `color`/`border-color` fall back to
inherited/`currentColor`. In dark mode `.card-highlight` therefore relies on luck for its text
color and can render an unintended `currentColor` 1px border. The highlight background (forest) is
theme-fixed, so the missing tokens are a real gap, not an inheritance nicety.

Acceptance criteria:
- [ ] `[data-theme="dark"]` (and the no-JS dark block) declare `--color-card-highlight-text{,-secondary,-tertiary}` and `--color-card-highlight-border`.
- [ ] `.card-highlight` in dark mode shows explicit, intended text and border colors (no reliance on undefined-variable fallback).
- [ ] Text on the highlight background meets WCAG AA (≥4.5:1 body) in both themes.
- [ ] Visual check: `.card-highlight` has no stray currentColor border in dark mode.

### [ISSUE-5] Fix primary-button hover/active contrast failure in dark mode
- Type: Fix · Axis: Design-system architecture · Lens: Accessibility
- Severity: High · Effort: M
- Epic: EPIC-C

Finding:
In dark mode the primary button label is `--btn-p-text` = `--color-accent-text` = `--in0-void`
(near-black). On hover the background becomes `--btn-p-hover-bg` = `--color-accent-hover` =
`--fo1-fern` (`#327A59`), and on active `--btn-p-active-bg` = `--fo1-fern` as well
(`dark-light.css` L145, L163). Near-black text on mid-dark-green fails AA — the token file's own
comments admit it: L145 and L163 both annotate "forest + void text = 2.53:1 fail". So the idle
state passes (glade bg, 9.79:1) but every primary button drops well below 4.5:1 (and below the 3:1
non-text floor) the moment it is hovered or pressed. This is shipped and self-documented as broken.

Acceptance criteria:
- [ ] Primary-button label contrast in dark mode is ≥4.5:1 in idle, hover, and active states.
- [ ] The "…= 2.53:1 fail" comments in `dark-light.css` are resolved (either the hover/active bg lightens, or the text flips to a light token on those states).
- [ ] Light-mode primary button is unaffected.
- [ ] Fix is token-level (no per-page override needed by consumers).

### [ISSUE-6] Render color swatches from palette tokens, not duplicated hex literals
- Type: Fix · Axis: Dogfooding fidelity · Lens: Token & API architecture
- Severity: High · Effort: M
- Epic: EPIC-D

Finding:
The pages that exist to showcase the palette hardcode the palette's hex values a second time.
`site/src/pages/styles/color.astro` sets every swatch with `style="background:#0D1117"` … through
`#885DB4` (L23–248, ~16 swatches) — the exact values already defined as `--in0-void … --bl4-heather`
in `tokens/colors.css`. `index.astro` repeats the full palette twice more as inline-hex swatches
(About section L427–451; Palette section L536–560, ~31 swatches). This is a second source of truth:
change a palette token in `colors.css` and all three renderings silently drift. The literal is only
needed for the copy-to-clipboard/label affordance, not the fill.

Acceptance criteria:
- [ ] Swatch **fills** reference palette tokens (`background: var(--in0-void)` etc.) in `color.astro` and both `index.astro` palette blocks.
- [ ] Editing a value in `colors.css` updates every swatch with no other edit (verify by changing one token locally).
- [ ] The copy-to-clipboard hex value and visible hex label remain correct (these may keep the literal, ideally derived from the token / computed style).
- [ ] Swatches render identically before/after (visual diff).

### [ISSUE-7] Give the "tokens in action" demo cards a real surface fill via a shared block, not bespoke CSS
- Type: Addition · Axis: Dogfooding fidelity · Lens: Token & API architecture, Visual craft
- Severity: Medium · Effort: M
- Epic: EPIC-D
- Confidence: Medium · Cost of not adding: every page that wants a labeled surface-swatch trio rebuilds `.demo-card` + surface labels by hand.

Finding:
`index.astro` §5 hand-builds `.demo-card` (L333–354) and the surface-column scaffolding
(`.tokens-demo-cols`, `.tokens-demo-col`, `.surface-label`, L312–332) purely to demonstrate
`data-surface`. The Surfaces foundation page and the landing page both need "here is a card on each
surface" — the same pattern, rebuilt. This is exactly the surface-demonstration the system sells,
yet there is no shipped or documented block for it. The escape (bespoke `.demo-card` with raw
`padding`/`border-radius` from tokens) is the tell.

Acceptance criteria:
- [ ] A documented block (docs-only `b-`/template block per AGENTS.md "Adding a block", or a Foundations › Surfaces example) renders a card per `data-surface` value using only semantic tokens.
- [ ] `index.astro` §5 consumes that block instead of bespoke `.demo-card` CSS, or the bespoke CSS is reduced to layout-only.
- [ ] No hardcoded color/size values introduced; existing render preserved.

### [ISSUE-8] Delete the unused 3,994-line `FernMultiplaneHero.astro`
- Type: Fix · Axis: Code quality · Lens: Performance
- Severity: Medium · Effort: S
- Epic: EPIC-E

Finding:
`site/src/components/FernMultiplaneHero.astro` is 3,994 lines and is imported nowhere — the only
repo references are its own header and historical `CHANGELOG.md` lines. The live hero uses
`FernBackground.astro` (`index.astro` L7, L396). It also contains 21 palette-token references,
which would violate the "semantic only in site/" rule if it were live. Dead code of this size is a
maintenance and review-noise liability.

Acceptance criteria:
- [ ] `FernMultiplaneHero.astro` is removed (or, if it is a deliberate WIP, moved out of `src/components` and tracked in a GitHub issue).
- [ ] `npm run build` and the Astro build succeed with no broken imports.
- [ ] Landing hero renders unchanged.

### [ISSUE-9] Correct the button font-size documentation to match the shipped tokens
- Type: Fix · Axis: Dogfooding fidelity · Lens: Token & API architecture
- Severity: Medium · Effort: S
- Epic: EPIC-E

Finding:
The Actions doc "Size tokens" table (`site/src/pages/components/actions.astro` L86–88) lists font
sizes Small = 12px, Default = 13px, Large = 14px. The shipped tokens
(`tokens/components.css` L145–147) are `--btn-sm-font-size: var(--text-2xs)` = **11px**,
`--btn-font-size: var(--text-xs)` = **12px**, `--btn-lg-font-size: var(--text-sm)` = 14px. Small and
Default are both documented one step too large. Since `site/` pages are declared the canonical spec
for each component, the spec contradicts the implementation.

Acceptance criteria:
- [ ] The table shows the actual resolved sizes (11 / 12 / 14 px) — or the tokens change and the table matches, whichever is the intended design.
- [ ] Doc values and `--btn-*-font-size` token values agree.
- [ ] A note ties each row to its token name for future drift-checking.

### [ISSUE-10] Refile the mislabeled `## [Unreleased]` CHANGELOG entries
- Type: Fix · Axis: Code quality · Lens: — (process/docs)
- Severity: Low · Effort: S
- Epic: EPIC-E

Finding:
Under `## [Unreleased]` → `### Removed`, `CHANGELOG.md` lists items that are **additions**
(CI drift-detection steps, release-workflow artifact uploads, pre-publish presence check,
`npm publish --provenance`) — none are removals. Separately, the `--gap-*` removal bullet runs on
into an unrelated sentence describing the no-JS FOWT fallback ("…updated accordingly. Fires before
the FOWT inline script sets `data-theme`…"), which belongs to the `### Added` no-JS entry. The
release process (AGENTS.md) treats the changelog as a release gate, so miscategorised entries will
propagate into the next release notes.

Acceptance criteria:
- [ ] CI / release-workflow additions moved under an appropriate `### Added`/`### Changed` heading (a non-`tokens/` "Tooling" grouping is fine).
- [ ] The `--gap-*` bullet describes only the token removal; the FOWT sentence is merged into the no-JS `### Added` entry.
- [ ] Every `## [Unreleased]` bullet sits under the Keep-a-Changelog category it actually belongs to.

### [ISSUE-11] Add a shadow (elevation) token scale
- Type: Addition · Axis: Design-system architecture · Lens: Token & API architecture, Visual craft
- Severity: Low · Effort: S
- Epic: standalone
- Confidence: Medium · Cost of not adding: elevation stays inconsistent and hand-tuned — raised cards, drawers, and any future popover each invent their own shadow.

Finding:
There is no shadow token category. The only elevation values are
`--overlap-card-shadow-raised: 0 -4px 32px rgba(0,0,0,0.14)` (components.css L80, dark override L172)
and a raw `box-shadow` on `.overlap-card` (component-classes.css L260, L270). Modals, dropdowns, and
tooltips get z-index tokens but no shadow, so any consumer needing elevation hardcodes it. A small
`--shadow-sm/md/lg` (or `--elevation-*`) scale would close a category gap that the overlap
primitives already needed.

Acceptance criteria:
- [ ] `--shadow-*` (or `--elevation-*`) tokens added to a tokens file, documented on a Styles page.
- [ ] `--overlap-card-shadow-raised` and `.overlap-card` reference the new scale instead of raw rgba.
- [ ] At least the overlap primitive renders unchanged; new tokens available to consumers.

### [ISSUE-12] Add a 16px spacing step (or document why 16px is raw everywhere)
- Type: Addition · Axis: Design-system architecture · Lens: Token & API architecture
- Severity: Low · Effort: S
- Epic: standalone
- Confidence: Low · Cost of not adding: `16px` stays a magic number in button and nav padding, breaking the "spacing comes from the scale" rule.

Finding:
The spacing scale is 12px-based: `--space-xs` 6 · `sm` 12 · `md` 24 · … (spacing.css L5–13), with no
16px step. But 16px is used raw repeatedly in the component layer: `--btn-padding-x: 16px`
(components.css L22), `.nav-cta { padding: 0 16px }` (component-classes.css L1285),
`.nav-cta { padding: 0 16px }` in the drawer path, etc. Either the scale is missing a rung the
components actually want, or these should snap to `--space-md`/`--space-sm`. Low confidence because
16px on a 12-based scale may be a deliberate optical value — but if so it deserves one named token
rather than three literals.

Acceptance criteria:
- [ ] Decision recorded: add a named 16px token (e.g. `--space-sm-plus`) **or** replace raw 16px with an existing scale token.
- [ ] No raw `16px` padding remains in `components.css` / `component-classes.css` without a comment justifying it as sub-scale.
- [ ] Buttons and nav CTA render at the same size before/after.

---

## Notes verified but not filed
- **Version alignment is clean.** All CDN/version references (README L42, llms.txt L21–24,
  getting-started L49–207, Footer L15, package.json) read `0.6.1` — no drift.
- **Accessibility scaffolding is strong.** Skip link, focus-visible on every interactive class,
  `prefers-reduced-motion` guards, `@media (scripting: none)` fallbacks for `opacity:0` elements,
  and a focus trap in the drawer are all present and correct. The contrast issues filed above are
  specific token pairs, not a systemic gap.
- **Astro discipline is good.** Static-by-default pages; islands are minimal and hydrated only where
  interaction demands it. The findings above (EPIC-A) are about inline-script hygiene, not misuse of
  the framework.
