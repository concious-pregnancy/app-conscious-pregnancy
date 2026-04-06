# Playwright Crawl Harness

This folder contains e2e specs used for reverse-engineering animation and layout behavior from external reference sites.

## ClearPath crawl

Run:

```bash
bun run crawl:clearpath
```

Optional environment variables:

- `CRAWL_TARGET_URL` (default: `https://clearpath-template.framer.website/`)
- `CRAWL_RUN_ID` (default: ISO timestamp)

Artifacts are written to:

`frontend/artifacts/clearpath-crawl/<run-id>/`

Each run includes:

- `manifest.json` (request summary and local asset map)
- `dom-initial.html`
- `dom-final.html`
- `assets/*` downloaded response bodies
- `screenshots/*` full-page snapshots

## Local rebuild capture

Run:

```bash
bun run capture:local
```

Artifacts are written to:

`frontend/artifacts/local-capture/<run-id>/`

Each run captures desktop/tablet/mobile screenshots at top and several scroll checkpoints.

## Structural extraction pipeline

### Blueprint (section structure + layout + typography)

```bash
bun run extract:blueprint
```

Outputs: `frontend/artifacts/clearpath-blueprint/sections.json`

Extracts all top-level and deep sections with bounding boxes, layout modes, heading/body typography, image sources, and text previews.

### Computed styles & design tokens

```bash
bun run extract:styles
```

Outputs: `frontend/artifacts/clearpath-styles/tokens.json`

Extracts CSS custom properties, font-face declarations, media breakpoints, and per-element computed styles.

### Scroll animation metadata

```bash
bun run extract:animations
```

Outputs: `frontend/artifacts/clearpath-animations/animations.json`

Extracts GSAP ScrollTrigger data (if globally exposed), Framer Motion `data-framer-*` attributes, transform/opacity snapshots at 11 scroll positions, CSS keyframes, and sticky/fixed element inventory.

### Matched section screenshots

```bash
bun run extract:screenshots
```

Outputs: `frontend/artifacts/section-comparison/`

Takes viewport screenshots at 12 evenly-spaced scroll positions from both the template and local site for visual comparison.

### Fine-grained scroll sequence

```bash
bun run extract:scroll-sequence
```

Outputs: `frontend/artifacts/scroll-sequence/`

Captures a viewport screenshot every ~80px of scroll using `mouse.wheel()` for natural parallax triggering. Includes a manifest JSON with scroll position for each frame.

### Video recording

```bash
bun run extract:video
```

Outputs: `frontend/artifacts/videos/`

Records a smooth-scroll video of the entire page using Playwright's built-in video recorder.

### Run all extractions at once

```bash
bun run extract:all
```

Runs blueprint, styles, and animations extraction sequentially, then matched screenshots with the local dev server.
