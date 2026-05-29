# Section divider patterns

Reference for implementing organic section transitions. CSS-preferred; SVG noted where CSS alone is insufficient.

---

## 1. Sine wave

**Character:** Organic, fluid, rhythmic. The nordtheme.com approach.

**How it works:** An SVG `<path>` using cubic bezier curves sits absolutely positioned at the bottom of a section. The next section's background colour fills the path. A second, slightly offset path layered behind adds the illusion of depth.

**CSS vs SVG:** SVG is required for the curve geometry. Positioning and sizing are CSS.

**Bug fix from first version:** The depth layer must render *behind* the main wave, so it should come first in the SVG source (SVG paints in document order). The original had them reversed.

```css
.section {
  position: relative;
  /* padding-bottom must be at least as tall as the SVG height */
  padding-bottom: 80px;
}

.section-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0; /* removes inline whitespace gap below svg */
}

.section-wave svg {
  display: block;
  width: 100%;
  height: 80px;
}
```

```html
<div class="section section-dark">
  <!-- content -->
  <div class="section-wave" aria-hidden="true">
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
      <!-- depth layer first (renders behind) -->
      <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z"
            fill="var(--color-section-b)" opacity="0.4"/>
      <!-- main wave on top -->
      <path d="M0,45 C300,85 900,5 1200,45 L1200,80 L0,80 Z"
            fill="var(--color-section-b)"/>
    </svg>
  </div>
</div>
```

**Tips:**

- Control point Y values (`80`, `0`) control amplitude. Equal offsets = symmetric wave; unequal = lopsided.
- `preserveAspectRatio="none"` is essential — without it the wave won't stretch to full width.
- To reverse direction (wave dips down), place the SVG at the top of the next section and add `transform: scaleY(-1)` to the wrapper. Do not use `rotateX` — it requires a 3D context.
- Always add `aria-hidden="true"` to the wave wrapper; it is decorative.

---

## 2. Organic blob

**Character:** Freeform, hand-drawn, expressive. Pairs well with illustrations and playful brand moments.

**How it works:** An irregular SVG path with no mathematical regularity defines the boundary. The shape is custom per design. Two slightly offset paths layered in document order create softness at the edge.

**CSS vs SVG:** SVG required for the path geometry.

```css
.section {
  position: relative;
  padding-bottom: 100px;
}

.section-blob {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.section-blob svg {
  display: block;
  width: 100%;
  height: 100px;
}
```

```html
<div class="section-blob" aria-hidden="true">
  <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
    <!-- depth layer first -->
    <path d="M0,60 C150,25 200,80 400,55
             C600,28 700,75 900,50
             C1050,28 1150,65 1200,45
             L1200,100 L0,100 Z"
          fill="var(--color-section-b)" opacity="0.45"/>
    <!-- main blob -->
    <path d="M0,65 C150,30 200,85 400,60
             C600,33 700,80 900,55
             C1050,33 1150,70 1200,50
             L1200,100 L0,100 Z"
          fill="var(--color-section-b)"/>
  </svg>
</div>
```

**Tips:**

- Draw in Figma or Inkscape, export the `d` attribute directly. Do not hand-author complex blob paths.
- Works best as a single use per page. Its distinctiveness is the point; repetition neutralises it.
- The silhouette can echo a motif elsewhere in the design (e.g. a landscape, a terrain form, a product shape).
- Unlike the sine wave, the blob should not be animated — its irregularity makes the motion look chaotic.

---

## 3. Convex arc

**Character:** Gentle, refined, lens-like. A single peak rather than repeating crests — much calmer than the sine wave.

**How it works:** A single `Q` (quadratic bezier) command creates one smooth dome across the full width. Flipping vertically gives a concave bowl variant.

**CSS vs SVG:** SVG for the curve; CSS for positioning.

**Bug fix from first version:** The concave variant used `transform: scaleY(-1)` on the outer wrapper, which also flips the fill colour visually in some compositing contexts. A cleaner approach is to redraw the path with the control point below the baseline, or use `scaleY(-1)` only on the `<svg>` element, not the wrapper div.

```css
.section {
  position: relative;
  padding-bottom: 80px;
}

.section-arc {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  /* no overflow: hidden needed — arc stays within viewBox bounds */
}

.section-arc svg {
  display: block;
  width: 100%;
  height: 80px;
}
```

```html
<!-- Convex (dome upward) -->
<div class="section-arc" aria-hidden="true">
  <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
    <path d="M0,80 Q600,0 1200,80 Z"
          fill="var(--color-section-b)"/>
  </svg>
</div>

<!-- Concave (bowl upward) — redraw with control point below -->
<div class="section-arc" aria-hidden="true">
  <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
    <path d="M0,0 Q600,80 1200,0 L1200,80 L0,80 Z"
          fill="var(--color-section-b)"/>
  </svg>
</div>
```

**Tips:**

- Shift the control point horizontally (`Q400,0` instead of `Q600,0`) for an asymmetric, off-centre arc.
- Increase the viewBox height (`0 0 1200 120`) for a more dramatic curve without changing the SVG's rendered height.
- The arc frames centred hero content naturally — whatever sits at the apex draws the eye.
- A subtle second arc path at `opacity: 0.3` offset by ~10px vertically adds the same depth effect as the wave.

---

## 4. Layered overlap

**Character:** Dimensional, modern. Creates z-axis depth with no curves at all.

**How it works:** The next section (or a card inside it) uses a negative `margin-top` to bleed upward into the previous section's space. `border-radius` on the top corners and a contrasting background complete the floating-panel illusion.

**CSS vs SVG:** Pure CSS. No SVG required.

```css
/* Option A — entire section overlaps */
.section-b {
  position: relative;
  z-index: 10;
  margin-top: -60px;
  border-radius: 24px 24px 0 0;
  background: var(--color-section-b);
  /* padding-top must exceed the overlap amount */
  padding-top: 80px;
}

/* Option B — a card floats up from section B into section A */
.overlap-card {
  position: relative;
  z-index: 10;
  margin-top: -80px;
  border-radius: 16px;
  background: var(--color-card);
  padding: 2rem;
  /* optional: reinforce the lift */
  box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.12);
}

/* Section A: ensure it does not clip its overflow */
.section-a {
  overflow: visible; /* critical — never set overflow: hidden here */
  padding-bottom: 2rem;
}
```

**Tips:**

- `overflow: hidden` on `.section-a` will clip the overlapping element. This is the most common mistake with this pattern.
- The overlapping element needs a z-index higher than the section behind it, and `position: relative` to establish a stacking context.
- Works especially well dark-over-light: a dark hero section with a light card or panel bleeding up from below.
- Can be layered with the convex arc: cut an arc into section A, then let section B's rounded-top panel overlap into it for a compound effect.

---

## 5. Diagonal cut

**Character:** Sharp, directional, energetic. Implies forward momentum.

**How it works:** A single angled line divides the two sections. Three implementations in increasing precision: `clip-path` polygon, `skewY` on a pseudo-element, or an SVG triangle.

**CSS vs SVG:** CSS `clip-path` or `::before` skew are preferred. SVG is only needed for precise pixel control or animation.

```css
/* Approach 1: clip-path — simplest, no SVG */
.section-a {
  clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
  /* Note: clip-path clips box-shadow too. Use approach 2 if shadows needed. */
}

/* Approach 2: skewY on pseudo-element — content stays horizontal */
.section-skew {
  position: relative;
  padding: 80px 0;
  /* background goes on ::before, not the element itself */
  background: transparent;
}

.section-skew::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-section);
  transform: skewY(-3deg);
  transform-origin: top left;
  z-index: -1;
}
```

```html
<!-- Approach 3: SVG triangle for precise control -->
<svg viewBox="0 0 1200 60" preserveAspectRatio="none"
     style="display:block; width:100%; height:60px;"
     aria-hidden="true">
  <polygon points="0,60 1200,0 1200,60"
           fill="var(--color-section-b)"/>
</svg>
```

**Tips:**

- Keep `skewY` between `-2deg` and `-5deg`. Beyond that, the angle becomes uncomfortable on wide viewports where the vertical offset grows large.
- The direction of the diagonal carries semantic weight: bottom-left to top-right reads as forward; the reverse reads as a step back. Be consistent across a page.
- `clip-path` is GPU-accelerated and the cleanest CSS option, but it clips `box-shadow`. If the section needs a shadow, use the `::before` pseudo-element approach instead.
- One diagonal per scroll flow. Two diagonals pointing in opposite directions creates visual conflict.

---

## 6. Stacked card reveal

**Character:** Cinematic, layered, high drama. Sections feel like a physical deck — each card peels away to expose the next. No divider shape at all; depth is the transition.

**How it works:** Each section is `position: sticky` with `top: 0`, so it pins to the viewport as the user scrolls. A `transform: scale()` value decreases with each card in the stack, making the cards behind appear smaller and further away. As the user scrolls past a section's scroll distance, the next card slides up over it.

**CSS vs SVG:** Pure CSS. No SVG required.

```css
/* Wrapper must be tall enough for all sections to scroll through */
.stack-container {
  /* height = number of sections × 100vh */
  height: 400vh;
}

/* Each section pins and scales according to its depth in the stack */
.stack-section {
  position: sticky;
  top: 0;
  height: 100vh;
  border-radius: 16px 16px 0 0;
  background: var(--color-section);
  overflow: hidden;

  /* CSS custom properties set per-section in HTML or via nth-child */
  transform: scale(calc(1 - (var(--stack-depth, 0) * 0.03)));
  transform-origin: top center;
  z-index: var(--stack-index, 1);
}

/* Set depth and index per section */
.stack-section:nth-child(1) { --stack-depth: 0; --stack-index: 1; }
.stack-section:nth-child(2) { --stack-depth: 1; --stack-index: 2; }
.stack-section:nth-child(3) { --stack-depth: 2; --stack-index: 3; }
.stack-section:nth-child(4) { --stack-depth: 3; --stack-index: 4; }
```

```html
<div class="stack-container">
  <section class="stack-section" style="background: var(--color-section-dark);">
    <!-- Section 1 content -->
  </section>
  <section class="stack-section" style="background: var(--color-section-mid);">
    <!-- Section 2 content -->
  </section>
  <section class="stack-section" style="background: var(--color-section-light);">
    <!-- Section 3 content -->
  </section>
</div>
```

**Tips:**

- The `--stack-depth` multiplier controls how aggressively cards shrink behind the active one. `0.03` per level is subtle; `0.05` is more pronounced.
- `border-radius` on the top corners only reinforces the physical card metaphor. Remove it for a more architectural, flush look.
- Content inside each section must be designed to fit within `100vh`. Sections with variable-length content do not suit this pattern.
- Works best with 3–5 sections. More than 5 and the scale reduction becomes too small to perceive.
- This pattern is its own transition — do not combine it with wave or arc dividers within the same stack.

---

## General implementation notes

**CSS custom properties for colours:** Define all section background colours as CSS variables at `:root` level. Every SVG `fill` and pseudo-element `background` references these directly, making palette-wide changes a single edit. Map to existing Farn semantic tokens rather than hardcoding values:

```css
:root {
  --color-section-dark:  var(--color-bg);        /* resolves per theme */
  --color-section-mid:   var(--color-bg-sunken);
  --color-section-light: var(--color-bg-elevated);
}
```

**Z-index hygiene:** Any section using `position: relative`, negative margins, or `clip-path` establishes or affects a stacking context. Set `z-index` explicitly and document the intended stack order. A common pattern: base sections at `z-index: 1`, divider SVGs at `z-index: 2`, overlapping elements at `z-index: 10`.

**Overflow:** SVG dividers that bleed outside their parent need `overflow: hidden` on that parent. The layered overlap pattern is the explicit exception — the overlapping child must not be clipped.

**Responsive scaling:** Always pair `preserveAspectRatio="none"` with `width: 100%` on divider SVGs and a fixed CSS `height`. The viewBox width (e.g. `1200`) is arbitrary — it just sets the coordinate space for the path. The SVG scales horizontally to fill the viewport without distorting the vertical wave height.

**Accessibility:** All decorative divider elements (SVG wrappers, pseudo-elements) should carry `aria-hidden="true"`. They convey no information to screen reader users.

**Combining patterns:** Use one primary divider type consistently throughout a page and introduce a second only for a single high-emphasis moment — e.g. sine wave throughout, one layered overlap at the CTA section. More than two distinct types on a single page creates visual noise.

---

## Scroll animations

Decisions for each pattern. Two tiers are used throughout:

- **Tier 1 — Intersection Observer:** An `IntersectionObserver` watches for the element entering the viewport and toggles a `.is-visible` class, which triggers a CSS `transition`. Works in all browsers. Best for entry-only animations.
- **Tier 2 — CSS Scroll Timeline:** Uses `animation-timeline: view()` to tie animation progress directly to scroll position. No JS. Runs on the compositor thread. Requires `@supports` guard for older browsers (Chrome 115+, Firefox 110+, Safari 18+).

### Shared infrastructure

Place this in your base stylesheet. Every pattern below builds on it.

```css
/* Tier 1 — base class for all entry-animated elements */
.scroll-reveal {
  transition-property: opacity, transform, clip-path, box-shadow;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Respect reduced motion — always */
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal,
  .scroll-reveal * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

```js
// Tier 1 — single observer wires up all .scroll-reveal elements
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after first reveal — entry animation, not toggle
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
```

---

### 1. Sine wave — wave rises up (Tier 1)

The `.section-wave` wrapper starts translated down and invisible. On entry it rises into position.

```css
.section-wave {
  /* Starting state */
  opacity: 0;
  transform: translateY(24px);
}

.section-wave.is-visible {
  opacity: 1;
  transform: translateY(0);
  /* Slight delay so section content animates in first */
  transition-delay: 0.1s;
}
```

```js
document.querySelectorAll('.section-wave').forEach((el) => {
  el.classList.add('scroll-reveal');
  observer.observe(el);
});
```

**Why this works:** The wave rising into frame echoes the visual metaphor of a tide coming in. The 0.1s delay ensures the section content lands first, then the wave seals the boundary below it.

---

### 2. Convex arc — expands from flat line to full dome (Tier 2)

The arc `clip-path` morphs from a flat baseline to its full dome shape as the section scrolls into view.

```css
.section-arc svg {
  /* Starting state: flat line at the bottom */
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
}

@supports (animation-timeline: view()) {
  @keyframes arc-expand {
    from { clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%); }
    to   { clip-path: polygon(0% 100%, 100% 100%, 100% 0%,   0% 100%); }
  }

  .section-arc svg {
    animation: arc-expand linear both;
    animation-timeline: view();
    animation-range: entry 20% cover 60%;
  }
}

/* Fallback for browsers without Scroll Timeline support */
@supports not (animation-timeline: view()) {
  .section-arc svg {
    clip-path: none; /* Show full arc statically */
  }
}
```

**Note on the dome approximation:** A `Q` bezier curve cannot be expressed directly in `clip-path: polygon()`. The polygon approximation gives a close visual match at this scale. For a pixel-perfect dome, use `clip-path: path()` with matching vertex counts — both paths must use the same command types and point count.

---

### 3. Organic blob — fades in (Tier 1)

The blob fades in on entry only — no translate, no morph. Its irregular shape would look chaotic in motion.

```css
.section-blob {
  opacity: 0;
}

.section-blob.is-visible {
  opacity: 1;
  /* Longer duration — a slower reveal suits the organic character */
  transition-duration: 0.9s;
  transition-delay: 0.05s;
}
```

```js
document.querySelectorAll('.section-blob').forEach((el) => {
  el.classList.add('scroll-reveal');
  observer.observe(el);
});
```

**Why no translate:** The blob's silhouette has no inherent direction. Moving it would imply a direction that conflicts with its formlessness. Opacity alone respects the shape's character.

---

### 4. Layered overlap — card lifts up, shadow intensifies (Tier 1)

The overlapping card starts lower and shadowless. On entry it rises into place and the shadow deepens.

```css
.overlap-card {
  /* Starting state */
  opacity: 0;
  transform: translateY(40px);
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
}

.overlap-card.is-visible {
  opacity: 1;
  transform: translateY(0);
  box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.14);
  transition-duration: 0.7s;
  transition-delay: 0.05s;
}
```

```js
document.querySelectorAll('.overlap-card').forEach((el) => {
  el.classList.add('scroll-reveal');
  observer.observe(el);
});
```

**Why `box-shadow` in the transition:** The shadow growing as the card lifts mimics real-world light physics — objects further from a surface cast a longer shadow.

---

### 5. Diagonal cut — angle flattens as section enters view (Tier 2)

The `::before` pseudo-element starts at its full skew angle and gradually flattens to `0deg`. This makes the diagonal appear to resolve — a sense of arrival.

```css
.section-skew::before {
  transform: skewY(-5deg);
  transform-origin: top left;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@supports (animation-timeline: view()) {
  @keyframes diagonal-flatten {
    from { transform: skewY(-5deg); }
    to   { transform: skewY(0deg); }
  }

  .section-skew::before {
    animation: diagonal-flatten linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
    transition: none;
  }
}

@supports not (animation-timeline: view()) {
  .section-skew::before {
    transform: skewY(-3deg);
  }
}
```

**Why Tier 2 here:** The flattening effect is only meaningful when tied directly to scroll progress — it should feel like the user's scrolling is physically pulling the angle flat. A time-based transition triggered on entry loses that directness.
