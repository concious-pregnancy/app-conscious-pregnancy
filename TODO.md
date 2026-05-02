# Conscious Pregnancy App — TODO

## UI Polish: Hero photo scroll-over effect

**Status:** Shipped in PR on `feat/process-clearpath-scroll`. Partially working — photo fades and Balance scrolls over it, but the exact timing / visual polish may need tweaking in a follow-up.

**What was done:**
- `Hero.module.css`: Changed `.media` from `position: absolute` to `position: fixed` so the hero photo stays viewport-pinned while all other content (hero text, Balance section) scrolls normally over it.
- `Balance.module.css`: Added `z-index: 1` to `.balance` so the Balance section paints above the fixed photo layer.
- `MotionProvider.tsx`: Hero dissolve `ScrollTrigger` already had the right timing (triggers on hero section scroll progress, fades photo opacity 1→0 as hero exits). Added `onLeave` to set `visibility: hidden` once faded so the photo doesn't interfere with sections below, and `onEnterBack` to restore visibility when scrolling back up.

**Prior failed approaches (three attempts in another session):**
1. Removed existing GSAP parallax on photo (correctly fixed a separate scroll bug but didn't achieve the pinned-photo effect)
2. Made hero section `position: sticky` — pinned the text too, not just the photo
3. Added `[data-hero-media]` fade via GSAP tween — fading worked but the photo was still scrolling with the hero (root cause never addressed: `position: absolute` inside a scrolling section)

**Root cause of all failures:** The photo was `position: absolute` inside a `min-height: 100svh` hero section. It scrolled with the section. The fix is `position: fixed` on the photo layer — Balance then physically scrolls over the pinned photo while GSAP drives opacity.

**If follow-up needed:**
- Timing of the fade (start/end scroll positions)
- Whether the hero's own `isolation: isolate` / `overflow: hidden` need adjustment for specific browsers
- The teal → Balance teal color transition seamlessness

## Avatar circles in "Ready to Find Your Path"

**Status:** Shipped. Five face portrait photos from `assets/clearpath-ref/` (the Framer template reference images) copied to `app/frontend/public/avatars/` and wired into `Ready.tsx` as `background-image` on the `.av` spans, replacing the placeholder gradient fills.

## Listen section: uniform dome arc

**Status:** deferred. Current arc (border-radius) animates correctly but has uneven curvature — corners are ~6–7x steeper than the center because `border-top-left/right-radius: 50% 35vh` produces a wide, flat ellipse.

**The fix:** replace border-radius with a JS-computed `clip-path: path()` using a true circle segment. The circle radius is derived from element dimensions:

```
r = (w² / 4 + D²) / (2D)
```

where `w` = element width in px, `D` = dome depth at edges in px. The SVG arc path:

```
M 0 D  A r r 0 0 1 w D  L w h  L 0 h  Z
```

(sweep-flag = 1, large-arc-flag = 0 gives the short arc through the apex)

**Why the previous attempt failed:** `gsap.fromTo(el, { "--arc": 0 }, { "--arc": 1 })` can drive a CSS variable but GSAP can't interpolate a full `clip-path: path(...)` string. The animation broke because each frame needs a freshly computed path string with recalculated `r` and `D` values.

**How to implement it correctly:**

In `MotionProvider.tsx`, replace the `gsap.fromTo("--arc")` block with a `ScrollTrigger.create` that uses `onUpdate` to write the path directly:

```ts
let savedProgress = 0;

const setDome = (progress: number) => {
  savedProgress = progress;
  const w = listenWrap.offsetWidth;
  const h = listenWrap.offsetHeight;
  const maxDepth = h * 0.14;
  const D = maxDepth * (1 - progress);
  if (D < 1) { listenWrap.style.clipPath = ""; return; }
  const r = (w * w / 4 + D * D) / (2 * D);
  listenWrap.style.clipPath = `path('M 0 ${D} A ${r} ${r} 0 0 1 ${w} ${D} L ${w} ${h} L 0 ${h} Z')`;
};

setDome(0); // paint initial state before scroll

ScrollTrigger.create({
  trigger: listenSection,
  start: "top 80%",
  end: "top top",
  scrub: true,
  onUpdate: (self) => setDome(self.progress),
  onRefresh: () => setDome(savedProgress),
});
```

Remove the `--arc` CSS variable and border-radius from `Listen.module.css` once this is wired up. Add a `ResizeObserver` or `window.addEventListener("resize", ...)` to repaint on resize since `clip-path: path()` uses fixed pixel values.
