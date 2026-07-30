import { test, expect, type Locator, type Page } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const FIXTURE_URL = pathToFileURL(
  path.join(__dirname, 'fixtures', 'card-matrix.html'),
).toString();

// Regression guard for the token-scoping bug where --card-bg/--card-hover-bg
// (and the same-shaped --input-bg/--input-bg-active) were declared once at
// :root as var(--color-bg-panel)/var(--color-bg-inset). Per the CSS custom
// properties spec, that value gets resolved and frozen at :root — never
// re-evaluated inside a [data-surface] block, even though --color-bg-panel/
// --color-bg-inset themselves are correctly re-scoped there. The fix moved
// these tokens to a var(--card-bg, var(--color-bg-panel)) fallback in
// component-classes.css (mirroring the existing --btn-* pattern), so this
// suite asserts each token's rendered background matches the SAME surface
// block's own live --color-bg-panel/--color-bg-inset — not :root's.

const THEMES = ['light', 'dark'] as const;
const SURFACES = [
  'page',
  'base',
  'layer',
  'overlay',
  'featured',
  'featured-pinned-dark',
  'featured-pinned-light',
] as const;

async function bg(locator: Locator): Promise<string> {
  return locator.evaluate((el) => getComputedStyle(el).backgroundColor);
}

async function setTheme(page: Page, theme: (typeof THEMES)[number]) {
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
}

test.describe('card/input background scoping across surfaces and themes', () => {
  for (const theme of THEMES) {
    for (const surface of SURFACES) {
      test(`${theme} page / ${surface} surface: card and input backgrounds track this surface's own tokens`, async ({
        page,
      }) => {
        await page.goto(FIXTURE_URL);
        await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
        await setTheme(page, theme);

        const block = page.locator(`[data-surface-name="${surface}"]`);
        const refPanelBg = await bg(block.locator('.ref-panel'));
        const refInsetBg = await bg(block.locator('.ref-inset'));

        // Resting card background must match this surface's own panel color,
        // not whatever :root happened to resolve --color-bg-panel to.
        const card = block.locator('.card').first();
        expect(
          await bg(card),
          `.card background in ${theme}/${surface} doesn't match this surface's own --color-bg-panel (${refPanelBg}) — looks frozen at :root instead`,
        ).toBe(refPanelBg);

        // Hover background must match this surface's own inset color.
        const interactiveCard = block.locator('.card-interactive');
        await interactiveCard.hover();
        expect(
          await bg(interactiveCard),
          `.card-interactive:hover background in ${theme}/${surface} doesn't match this surface's own --color-bg-inset (${refInsetBg}) — looks frozen at :root instead`,
        ).toBe(refInsetBg);

        // Inputs share the exact same --color-bg-panel/--color-bg-inset
        // shape as cards (--input-bg/--input-bg-active), so they're prone to
        // the identical freeze bug.
        const input = block.locator('input');
        expect(
          await bg(input),
          `input background in ${theme}/${surface} doesn't match this surface's own --color-bg-panel (${refPanelBg}) — looks frozen at :root instead`,
        ).toBe(refPanelBg);

        await input.hover();
        expect(
          await bg(input),
          `input hover background in ${theme}/${surface} doesn't match this surface's own --color-bg-inset (${refInsetBg}) — looks frozen at :root instead`,
        ).toBe(refInsetBg);

        // The two references themselves must actually differ inside this
        // surface — otherwise the assertions above would trivially pass even
        // with a real bug (this is the --color-bg-inset-collapses-onto-panel
        // gap that shipped for [data-surface="layer"] before this fix: inset
        // silently inherited the ambient theme's value and coincided with
        // this surface's own promoted panel color).
        expect(
          refInsetBg,
          `--color-bg-panel and --color-bg-inset both resolve to ${refPanelBg} in ${theme}/${surface} — hover states here would have zero contrast against resting state`,
        ).not.toBe(refPanelBg);
      });
    }
  }
});
