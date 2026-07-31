import { test, expect, type Locator } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const FIXTURE_URL = pathToFileURL(
  path.join(__dirname, 'fixtures', 'form-fields.html'),
).toString();

// Regression guard for the :is(input, textarea, select) specificity bug
// documented above the base form-field recipe rule in component-classes.css
// — [readonly] and [aria-invalid="true"]/.form-field--error had the identical
// flaw as :hover/:focus-visible and silently never painted on <input>, until
// the base rule was wrapped in :where(...) to permanently zero its
// specificity. .ref-page-bg/.ref-border-error in the fixture are ground-truth
// swatches (same convention as card-matrix.html's .ref-panel/.ref-inset) that
// each state below must match.

async function bg(locator: Locator): Promise<string> {
  return locator.evaluate((el) => getComputedStyle(el).backgroundColor);
}

async function borderColor(locator: Locator): Promise<string> {
  return locator.evaluate((el) => getComputedStyle(el).borderColor);
}

test.describe('form field state overrides win the cascade', () => {
  test('[readonly] gets the page background, not the resting input background', async ({ page }) => {
    await page.goto(FIXTURE_URL);

    const plainBg = await bg(page.locator('#plain'));
    const readonlyBg = await bg(page.locator('#readonly'));
    const expectedBg = await bg(page.locator('.ref-page-bg'));

    expect(readonlyBg, 'readonly input still shows the resting --input-bg color instead of --color-bg').toBe(expectedBg);
    expect(readonlyBg).not.toBe(plainBg);
  });

  test('[aria-invalid="true"] gets the error border color', async ({ page }) => {
    await page.goto(FIXTURE_URL);

    const plainBorder = await borderColor(page.locator('#plain'));
    const invalidBorder = await borderColor(page.locator('#invalid'));
    const expectedBorder = await borderColor(page.locator('.ref-border-error'));

    expect(invalidBorder, 'aria-invalid input still shows the resting --input-border color instead of --input-border-error').toBe(expectedBorder);
    expect(invalidBorder).not.toBe(plainBorder);
  });

  test('.form-field--error input gets the error border color', async ({ page }) => {
    await page.goto(FIXTURE_URL);

    const plainBorder = await borderColor(page.locator('#plain'));
    const errorClassBorder = await borderColor(page.locator('#error-class'));
    const expectedBorder = await borderColor(page.locator('.ref-border-error'));

    expect(errorClassBorder).toBe(expectedBorder);
    expect(errorClassBorder).not.toBe(plainBorder);
  });
});
