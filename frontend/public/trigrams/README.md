# Trigrams (Bagua / I Ching)

The triple-bar marks on the Conscious Pregnancy site are the eight I Ching trigrams (Bagua). They render two ways in the live app:

1. **As Unicode text** (☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷) inside service cards, sourced from Sanity CMS string fields. Styled with CSS in `Services.module.css` (color sage, larger size, eyebrow-like).
2. **As an SVG favicon** at `app/frontend/public/icon.svg`. This is a hand-drawn ☵ Kan (Water) in sage `#7fa69b`, used as the browser tab mark.

## Files in this folder

- `favicon-trigram-kan-water.svg`. The live favicon, copied as-is from `public/icon.svg`. Kan / Water (010).
- `trigram-XYZ-name.svg`. All eight trigrams generated using the same visual grammar as the favicon (viewBox `-3 -3 40 28`, three rows at y=1, y=10, y=19, height 2px, solid bar w=34, broken bars w=14 + w=14 with a 6px gap). `fill="currentColor"` so the consuming surface controls color.

## Full set with semantic naming

| Pattern | Glyph | Name | Element  | File                           |
| ------- | ----- | ---- | -------- | ------------------------------ |
| 111     | ☰    | Qian | Heaven   | `trigram-111-qian-heaven.svg`  |
| 110     | ☱    | Dui  | Lake     | `trigram-110-dui-lake.svg`     |
| 101     | ☲    | Li   | Fire     | `trigram-101-li-fire.svg`      |
| 100     | ☳    | Zhen | Thunder  | `trigram-100-zhen-thunder.svg` |
| 011     | ☴    | Xun  | Wind     | `trigram-011-xun-wind.svg`     |
| 010     | ☵    | Kan  | Water    | `trigram-010-kan-water.svg`    |
| 001     | ☶    | Gen  | Mountain | `trigram-001-gen-mountain.svg` |
| 000     | ☷    | Kun  | Earth    | `trigram-000-kun-earth.svg`    |

## Why this matters for the design system

The trigram is the closest thing the brand has to a personal mark. Ashley's main practice site (drashleyalden.com) uses a triple-bar glyph in the wordmark between "Ashley" and "Alden", which is the same visual idea distilled to one row. Conscious Pregnancy is a sub-brand. The trigram set can be load-bearing decoration here: per-service / per-section semantic icon, hover state, divider motif, repeat ornament. A direction worth proposing: do all eight trigrams stay as iconography across the site (each section gets one), or does the system commit to a single trigram (Kan / Water) as the master mark and use the other seven as supporting marks?

Open question for Claude Design: should these be redrawn with more brushed / sumi-e energy (looser ends, ink-bleed) to match a warmer, more Ashley palette, or stay geometric like the favicon?
