# Farn — Backlog

Design system enhancement backlog. Each task is independently completable. Pick up any item by creating a branch and resolving it.

**Effort scale:** `XS` < 1 hr · `S` 1–3 hr · `M` half day · `L` full day+

---

## T-01 · Extract shared Footer component
`status: backlog` `effort: XS`

**Gap:** Footer HTML is duplicated verbatim between `site/src/layouts/DocLayout.astro` and `site/src/pages/index.astro`; any copy or link change must be made twice.

- [ ] Create `site/src/components/Footer.astro` containing the shared footer block
- [ ] Replace the inline footer in `DocLayout.astro` and `index.astro` with `<Footer />`
- [ ] Verify no visual regressions in both doc pages and landing page

---

## T-02 · Extract shared sub-nav scroll-tracking utility
`status: backlog` `effort: XS`

**Gap:** The `IntersectionObserver` scroll-tracking logic is structurally identical in `DocLayout.astro` and `index.astro`; threshold or indicator changes must be applied in two places.

- [ ] Create `site/src/scripts/subnav-tracker.js` exporting an `initSubNavTracker(subNavEl)` function
- [ ] Replace the inline observer scripts in both layouts with an import of the shared utility
- [ ] Verify no FOWT or scroll-tracking regressions after switching to module import

---

## T-03 · Make farn-theme the canonical source of truth
`status: backlog` `effort: XS`

**Gap:** `CLAUDE.md` references `bo-creative-kit/design-system/web-reference.md` as the canonical component spec, making this repo a secondary rendition rather than the authoritative source.

- [ ] Remove the "Source of truth for component specs" section from `CLAUDE.md`
- [ ] Update `CLAUDE.md` to state that `site/` pages are the canonical specifications
- [ ] Check for any other references to `bo-creative-kit` in the repo and remove or reframe them

---

## T-04 · Motion tokens
`status: backlog` `effort: S`

**Gap:** Transition timings and easing values are hardcoded throughout `site/src/styles/site.css` rather than tokenized; consumers cannot override animation behaviour via the token system.

- [ ] Add `--duration-*` (e.g. `fast`, `base`, `slow`) and `--ease-*` (e.g. `default`, `in`, `out`) tokens to `tokens/spacing.css` or a new `tokens/motion.css`
- [ ] Replace hardcoded `transition` and `animation` values in `site/src/styles/site.css` with the new tokens
- [ ] Rebuild `dist/farn.css` and update `CHANGELOG.md`

---

## T-05 · Theming demo page
`status: backlog` `effort: S`

**Gap:** The `data-surface` system (light / dark / tinted overrides) is implemented in tokens but has no live documentation page; consumers cannot see it in action without reading source code.

- [ ] Create `site/src/pages/tokens/theming.astro` with live `data-surface` examples showing light, dark, and tinted surfaces nested within each other
- [ ] Document the `data-theme` page-level toggle and the FOWT prevention pattern
- [ ] Add the page to the sidebar nav in `site/src/layouts/DocLayout.astro`

---

## T-06 · Badges documentation page
`status: backlog` `effort: S`

**Gap:** Seven badge variants exist in `site/src/styles/site.css` but are undocumented on the site; consumers have no reference for which variant to use when.

- [ ] Create `site/src/pages/components/badges.astro`
- [ ] Document all 7 variants (general, published, draft, archived, beta, research, category) with live examples and usage guidance
- [ ] Add the page to the sidebar nav in `site/src/layouts/DocLayout.astro`

---

## T-07 · Full contrast matrix
`status: backlog` `effort: S`

**Gap:** Individual contrast ratios are noted on the colors page but no complete matrix covers all semantic token pairs across both light and dark modes.

- [ ] Add a full contrast matrix table to `site/src/pages/tokens/colors.astro` (or a dedicated accessibility page)
- [ ] Cover every semantic foreground/background combination in light mode and dark mode
- [ ] Mark each pair as WCAG AA pass / AAA pass / fail

---

## T-08 · Interactive component tokens — buttons & links (Tier 3)
`status: backlog` `effort: S`

**Gap:** No Tier 3 tokens exist; consumers who want to reskin buttons or links must override implementation details rather than declared intent.

- [ ] Create `tokens/components.css` and add `--btn-*` tokens (background, text, border, radius, hover-background)
- [ ] Update `site/src/styles/site.css` button styles to consume these tokens instead of direct semantic token references
- [ ] Rebuild `dist/farn.css`, update `CHANGELOG.md`, and document the tokens on the buttons component page

---

## T-09 · Container component tokens — cards (Tier 3)
`status: backlog` `effort: S`

**Gap:** Card styles reference semantic tokens directly with no component-level override points.

- [ ] Add `--card-*` tokens (background, border, radius, padding) to `tokens/components.css`
- [ ] Update site card styles to consume these tokens
- [ ] Rebuild `dist/farn.css` and update `CHANGELOG.md`

---

## T-10 · Form component tokens (Tier 3)
`status: backlog` `effort: S`

**Gap:** Form element styles have no component-level tokens; inputs cannot be rethemed without overriding semantic-layer values that affect unrelated elements.

- [ ] Add `--input-*` tokens (background, border, radius, focus-ring color) to `tokens/components.css`
- [ ] Update site form styles to consume these tokens
- [ ] Rebuild `dist/farn.css` and update `CHANGELOG.md`

---

## T-11 · Button component CSS
`status: backlog` `effort: M`

**Gap:** No `.btn` CSS classes are shipped in `dist/farn.css`; every consumer must reimplement button styles from scratch using tokens with no reference implementation.

- [ ] Add `.btn`, `.btn-p`, `.btn-s`, `.btn-g`, `.btn-d` and size modifiers `.btn-sm`, `.btn-lg` to a new `tokens/components.css` (or a separate `dist/farn-components.css` artifact)
- [ ] Button styles must consume T-08 component tokens (`--btn-*`) rather than referencing semantic tokens directly
- [ ] Document variants, sizes, and states (hover, focus, active, disabled) on the buttons component page

---

## T-12 · Badge component CSS
`status: backlog` `effort: S`

**Gap:** Seven `.badge-*` variants exist only in `site/src/styles/site.css` and are not part of the distributed token system.

- [ ] Add `.badge` base class and the 7 variant modifiers to the component CSS artifact
- [ ] Ensure badge styles use palette tokens directly (as they do now) so variants remain visually distinct across themes
- [ ] Document on the badges component page (T-06)

---

## T-13 · Card component CSS
`status: backlog` `effort: S`

**Gap:** No `.card` CSS class is shipped; consumers must build card layouts from scratch using T-09 component tokens with no reference implementation.

- [ ] Add `.card` base class (and any surface/elevated variants) to the component CSS artifact
- [ ] Card styles must consume T-09 `--card-*` tokens
- [ ] Document on the cards component page with live examples

---

## T-14 · Form component CSS
`status: backlog` `effort: M`

**Gap:** No form element CSS is shipped; consumers must style inputs, textareas, selects, and labels from scratch using T-10 component tokens.

- [ ] Add base styles for `input`, `textarea`, `select`, `label`, and a `.form-field` wrapper to the component CSS artifact
- [ ] Styles must consume T-10 `--input-*` tokens
- [ ] Document states (default, focus, error, disabled) on the forms component page

---

## T-15 · Audit & restructure site for target state
`status: backlog` `effort: M`

**Gap:** Site navigation and page structure reflect the initial release; as the system grows toward Tier 3, the IA needs review to clearly separate token reference, component docs, and demo content.

- [ ] Audit current page structure against what a Tier 3 token system's docs should include (tokens, components, theming, getting started, changelog)
- [ ] Propose and implement updated nav hierarchy and page groupings in `DocLayout.astro`
- [ ] Ensure landing page, token reference pages, and component pages are clearly differentiated in purpose and navigation

---

## T-16 · Component demo pages with live token examples
`status: backlog` `effort: M`

**Gap:** Component pages show CSS snippets but no live demos; the relationship between tokens and rendered output is not visible.

- [ ] Add live demo sections to the buttons and cards component pages using Farn token-driven HTML
- [ ] Demos must work correctly in both light and dark mode via the `data-theme` mechanism
- [ ] Consider a token inspector pattern showing which token drives each property

---

## T-17 · Split dist — tokens-only artifact
`status: backlog` `effort: S`

**Gap:** `dist/farn.css` bundles tokens and the base reset together; consumers who manage their own reset cannot import tokens in isolation.

- [ ] Create `dist/farn-tokens.css` as a concatenation of `colors.css`, `typography.css`, `spacing.css`, and `dark-light.css` only (no `base.css`)
- [ ] Update the build command in `CLAUDE.md` to produce both artifacts
- [ ] Add both CDN paths to the getting-started page and `README.md`

---

## T-18 · npm package setup
`status: backlog` `effort: S`

**Gap:** No `package.json` at the repo root; Farn can only be consumed via CDN, not installed as a dependency.

- [ ] Add root `package.json` with `name`, `version`, and `exports` pointing to `dist/farn.css` and `dist/farn-tokens.css`
- [ ] Add npm installation instructions to `site/src/pages/getting-started.astro` and `README.md`
- [ ] Verify the package installs cleanly and exports resolve correctly
