# Open Tasks

Technical debt and deferred improvements. Pick up any item by creating a branch and resolving it.

---

## Refactor: Extract shared Footer component

**Context:** The footer HTML (logo, tagline, nav links, copyright, legal links) is duplicated verbatim between `site/src/layouts/DocLayout.astro` and `site/src/pages/index.astro`. Any version bump (`v0.1.0 → v0.2.0`), legal link change, or tagline edit must be made in two places.

**Fix:**
1. Create `site/src/components/Footer.astro` containing the `<footer class="page-footer" ...>` block
2. Accept props or slots for the nav links (they differ: DocLayout uses real routes; index.astro uses `#anchor` and `data-view` attributes for the landing-page JS)
3. Replace the inline footer in `DocLayout.astro` and `index.astro` with `<Footer />`

**Files:** `site/src/layouts/DocLayout.astro` · `site/src/pages/index.astro` · `site/src/components/Footer.astro` (new)

---

## Refactor: Extract shared sub-nav scroll-tracking utility

**Context:** The `IntersectionObserver` sub-nav scroll-tracking pattern (observe sections → remove all `.active` → add `.active` on intersecting link → update indicator position) is structurally identical in `DocLayout.astro` and `index.astro`. Threshold, indicator logic, or offset changes must be applied in both.

**Fix:**
1. Create `site/src/scripts/subnav-tracker.js` (or `.ts`) that exports an `initSubNavTracker(subNavEl)` function
2. Call it from `DocLayout.astro` (already has the `if (docSubNav)` guard) and from `index.astro`'s two observers (`dsNavObs`, `paletteNavObs`)
3. Switch both layouts from `<script is:inline>` to a regular Astro `<script>` so the module can be imported — verify no FOWT regression

**Files:** `site/src/layouts/DocLayout.astro` · `site/src/pages/index.astro` · `site/src/scripts/subnav-tracker.js` (new)
