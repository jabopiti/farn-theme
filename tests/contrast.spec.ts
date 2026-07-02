import { test, expect, type Locator, type Page } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const FIXTURE_URL = pathToFileURL(
  path.join(__dirname, 'fixtures', 'button-matrix.html'),
).toString();

// Regression guard for the "invisible ghost/secondary button on the featured
// surface" bug: --btn-s-bg, --btn-s-hover-bg, --btn-s-active-bg, --btn-g-border,
// --btn-g-hover-bg and --btn-g-active-bg were only ever redeclared inside the
// page-level [data-theme] blocks, never inside [data-surface="featured"]. That
// left them frozen to whatever the ambient page theme resolved to, instead of
// the surface's own (often inverted) colors — producing near-invisible text
// and borders. This suite renders every button variant inside every surface,
// in both page themes, including the surface pinned to the opposite theme on
// the same element, and checks that text/border stay legible at rest, on
// hover, and on press.

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
const VARIANTS = ['btn-p', 'btn-s', 'btn-g', 'btn-d'] as const;

const MIN_TEXT_CONTRAST = 4.5; // WCAG 1.4.3 (normal text)
const MIN_BORDER_CONTRAST = 3; // WCAG 1.4.11 (non-text / UI component boundaries)

// Expected background of the SURFACE BLOCK ITSELF per (theme, surface),
// independent of contrast math. Catches selector/specificity bugs (e.g. a
// same-element theme pin losing a cascade tie and silently rendering the
// OTHER theme's palette) that would otherwise slip through: two palettes can
// both be internally contrast-safe while still being the wrong one for the
// pin that was requested. "page" has no data-surface and thus no pin logic
// to lose a tie on, so it's intentionally omitted here.
const VOID = 'rgb(13, 17, 23)';
const MIST = 'rgb(233, 230, 220)';
const BIRCH = 'rgb(247, 246, 243)';
const SAND = 'rgb(213, 210, 199)';
const IRON = 'rgb(55, 65, 81)';
const SLATE = 'rgb(75, 85, 99)';

const EXPECTED_SURFACE_BG: Record<(typeof THEMES)[number], Partial<Record<(typeof SURFACES)[number], string>>> = {
  light: {
    base: BIRCH,
    layer: MIST,
    overlay: SAND,
    featured: VOID,
    'featured-pinned-dark': MIST,
    'featured-pinned-light': VOID,
  },
  dark: {
    base: VOID,
    layer: IRON,
    overlay: SLATE,
    featured: MIST,
    'featured-pinned-dark': MIST,
    'featured-pinned-light': VOID,
  },
};

// Assumes legacy comma-separated rgb()/rgba() syntax, which is what Chromium's
// getComputedStyle returns (the only browser this config runs). Would need a
// space-separated `rgb(r g b / a)` branch too if a non-Chromium project is added.
function parseRgb(value: string): [number, number, number, number] {
  const m = value.match(/rgba?\(([^)]+)\)/);
  if (!m) throw new Error(`Unparseable color: ${value}`);
  const parts = m[1].split(',').map((p) => parseFloat(p.trim()));
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
}

function relativeLuminance([r, g, b]: [number, number, number, number]): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const [rl, gl, bl] = [toLinear(r), toLinear(g), toLinear(b)];
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(parseRgb(a));
  const lb = relativeLuminance(parseRgb(b));
  const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

async function effectiveBackground(locator: Locator): Promise<string> {
  return locator.evaluate((start) => {
    let el: Element | null = start;
    while (el) {
      const bg = getComputedStyle(el).backgroundColor;
      const m = bg.match(/rgba?\(([^)]+)\)/);
      const alpha = m ? (m[1].split(',')[3] ?? '1') : '0';
      if (parseFloat(alpha) > 0) return bg;
      el = el.parentElement;
    }
    return 'rgb(255, 255, 255)';
  });
}

async function setTheme(page: Page, theme: (typeof THEMES)[number]) {
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
}

test.describe('button contrast across surfaces and themes', () => {
  for (const theme of THEMES) {
    for (const surface of SURFACES) {
      for (const variant of VARIANTS) {
        test(`${theme} page / ${surface} surface / ${variant} stays legible at rest, on hover, and on press`, async ({
          page,
        }) => {
          await page.goto(FIXTURE_URL);
          // body has `transition: background-color var(--duration-slow) ...`
          // for the theme toggle; disable transitions so a measurement right
          // after setTheme() doesn't catch a mid-fade color.
          await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
          await setTheme(page, theme);

          const surfaceBlock = page.locator(`[data-surface-name="${surface}"]`);
          const btn = surfaceBlock.locator(`.${variant}`);
          await expect(btn).toBeVisible();

          // Two palettes can each be internally contrast-safe while one is still
          // the WRONG one for a pinned surface (a cascade-tie bug, not a color
          // choice) — so pin the expected background independently of contrast.
          // Checked against the surface block itself, not effectiveBackground(btn):
          // that helper deliberately returns an opaque button's OWN background
          // (correct for contrast math), which isn't the surface's background.
          const expectedBg = EXPECTED_SURFACE_BG[theme][surface];
          if (expectedBg) {
            const surfaceBg = await surfaceBlock.evaluate((el) => getComputedStyle(el).backgroundColor);
            expect(
              surfaceBg,
              `${surface} surface resolved to the wrong background under a ${theme} page (${surfaceBg}, expected ${expectedBg}) — likely a lost cascade specificity tie, not a contrast issue`,
            ).toBe(expectedBg);
          }

          // At rest
          const restColor = await btn.evaluate((el) => getComputedStyle(el).color);
          const restBorder = await btn.evaluate((el) => getComputedStyle(el).borderColor);
          const restRawBg = await btn.evaluate((el) => getComputedStyle(el).backgroundColor);
          const restBg = await effectiveBackground(btn);

          const restTextContrast = contrastRatio(restColor, restBg);
          expect(
            restTextContrast,
            `${variant} text vs background contrast too low at rest (${restColor} on ${restBg})`,
          ).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST);

          if (variant === 'btn-g') {
            const borderContrast = contrastRatio(restBorder, restBg);
            expect(
              borderContrast,
              `btn-g border vs background contrast too low at rest (${restBorder} on ${restBg})`,
            ).toBeGreaterThanOrEqual(MIN_BORDER_CONTRAST);
          }

          // On hover — this is what actually broke: --btn-*-hover-bg leaking
          // the ambient page theme's fill onto a surface with inverted colors.
          await btn.hover();
          const hoverColor = await btn.evaluate((el) => getComputedStyle(el).color);
          const hoverBg = await btn.evaluate((el) => getComputedStyle(el).backgroundColor);
          const effectiveHoverBg = hoverBg.startsWith('rgba') && parseRgb(hoverBg)[3] === 0
            ? await effectiveBackground(btn)
            : hoverBg;

          const hoverTextContrast = contrastRatio(hoverColor, effectiveHoverBg);
          expect(
            hoverTextContrast,
            `${variant} text vs background contrast too low on hover (${hoverColor} on ${effectiveHoverBg})`,
          ).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST);

          // On press (:active) — a real mousedown, not just a CSS class toggle,
          // since :active only applies to the element actually under the
          // pointer at mousedown time. Exercises --btn-*-active-bg/-active-text,
          // which (unlike hover) aren't covered anywhere else in this suite.
          const box = await btn.boundingBox();
          if (!box) throw new Error(`${variant} in ${surface} has no bounding box to click`);
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
          const activeColor = await btn.evaluate((el) => getComputedStyle(el).color);
          const activeBg = await btn.evaluate((el) => getComputedStyle(el).backgroundColor);
          await page.mouse.up();
          const effectiveActiveBg = activeBg.startsWith('rgba') && parseRgb(activeBg)[3] === 0
            ? await effectiveBackground(btn)
            : activeBg;

          const activeTextContrast = contrastRatio(activeColor, effectiveActiveBg);
          expect(
            activeTextContrast,
            `${variant} text vs background contrast too low on press (${activeColor} on ${effectiveActiveBg})`,
          ).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST);

          // A press that resolves to the SAME fill as rest gives no feedback
          // at all — contrast math alone can't catch this (an --active-bg
          // token can leak the wrong ambient value and still pass contrast
          // if it happens to equal a still-legible resting color). btn-s is
          // exempt: --btn-s-active-bg is deliberately aliased to the same
          // --color-bg-inset as --btn-s-bg (the "hover-sandwich" convention —
          // idle and pressed share a fill, only hover lifts it), so equality
          // there is the intended design, not a leak.
          if (variant !== 'btn-s') {
            expect(
              activeBg,
              `${variant} press background is identical to its resting background (${activeBg}) — pressing gives no visual feedback, likely a leaked/frozen --btn-*-active-bg token`,
            ).not.toBe(restRawBg);
          }
        });
      }
    }
  }
});
