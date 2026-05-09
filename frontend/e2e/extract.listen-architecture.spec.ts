import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { test } from "@playwright/test";

const TARGET_URL = "https://clearpath-template.framer.website/";
const OUT_DIR = path.resolve(process.cwd(), "artifacts", "listen-architecture");

const COMPUTED_PROPS = [
  "position",
  "top",
  "left",
  "right",
  "width",
  "height",
  "z-index",
  "overflow",
  "transform",
  "opacity",
  "mask",
  "mask-image",
  "-webkit-mask",
  "-webkit-mask-image",
  "clip-path",
  "border-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "background",
  "background-image",
  "display",
];

test("extract ClearPath quote/listen section architecture", async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);

  // Find the Listen / Big Quote section. ClearPath uses a section that
  // contains the body-is-always-speaking-equivalent quote with a hand
  // image and a thread/squiggle SVG.
  const sectionInfo = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll<HTMLElement>("[data-framer-name]"));
    const candidates = all.filter((el) => {
      const name = el.dataset.framerName ?? "";
      return /quote|big quote|listen|story b|story a/i.test(name);
    });
    return candidates.map((el) => ({
      name: el.dataset.framerName,
      class: el.className,
      rect: el.getBoundingClientRect().toJSON(),
      childNames: Array.from(el.querySelectorAll<HTMLElement>("[data-framer-name]"))
        .slice(0, 30)
        .map((c) => c.dataset.framerName),
    }));
  });

  await writeFile(
    path.join(OUT_DIR, "section-candidates.json"),
    JSON.stringify(sectionInfo, null, 2),
    "utf-8",
  );

  // Scroll progressively and at each stop, find any element with mask, clip-path,
  // or interesting border-radius and dump its computed style + rect. Also capture
  // any SVG paths visible (looking for the squiggle thread).
  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const stops = [
    { label: "0", y: 0 },
    { label: "first-section-end", y: 900 },
    { label: "balance-mid", y: 1800 },
    { label: "deep-1", y: 4000 },
    { label: "deep-2", y: 5000 },
    { label: "deep-3", y: 6000 },
    { label: "deep-4", y: 7000 },
    { label: "deep-5", y: 8000 },
    { label: "deep-6", y: 9000 },
    { label: "deep-7", y: 10000 },
    { label: "deep-8", y: 11000 },
    { label: "deep-9", y: 12000 },
  ].filter((s) => s.y < docHeight);

  for (const stop of stops) {
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior }),
      stop.y,
    );
    await page.waitForTimeout(700);
    await page.screenshot({
      path: path.join(OUT_DIR, `scroll-${stop.label}-${stop.y}.png`),
      fullPage: false,
    });

    const stylesReport = await page.evaluate(
      ({ props }) => {
        const all = Array.from(document.querySelectorAll<HTMLElement>("*"));
        const interesting = all.filter((el) => {
          const cs = window.getComputedStyle(el);
          const r = el.getBoundingClientRect();
          const inViewport =
            r.top < window.innerHeight && r.bottom > 0 && r.width > 100 && r.height > 100;
          if (!inViewport) return false;
          const hasMask =
            cs.maskImage !== "none" || cs.getPropertyValue("-webkit-mask-image") !== "none";
          const hasClip = cs.clipPath !== "none";
          const hasBigRadius =
            parseFloat(cs.borderTopLeftRadius) > 50 || parseFloat(cs.borderTopRightRadius) > 50;
          return hasMask || hasClip || hasBigRadius;
        });
        return interesting.slice(0, 25).map((el) => {
          const cs = window.getComputedStyle(el);
          const styles: Record<string, string> = {};
          for (const p of props) styles[p] = cs.getPropertyValue(p);
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            framerName: (el as HTMLElement).dataset.framerName ?? null,
            class: el.className?.toString?.().slice(0, 120) ?? "",
            rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
            computed: styles,
          };
        });
      },
      { props: COMPUTED_PROPS },
    );

    await writeFile(
      path.join(OUT_DIR, `styles-${stop.label}-${stop.y}.json`),
      JSON.stringify(stylesReport, null, 2),
      "utf-8",
    );

    const svgReport = await page.evaluate(() => {
      const svgs = Array.from(document.querySelectorAll<SVGSVGElement>("svg"));
      return svgs
        .map((svg) => {
          const r = svg.getBoundingClientRect();
          if (r.top > window.innerHeight || r.bottom < 0 || r.width < 50) return null;
          const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
          return {
            rect: { top: r.top, left: r.left, width: r.width, height: r.height },
            viewBox: svg.getAttribute("viewBox"),
            preserve: svg.getAttribute("preserveAspectRatio"),
            paths: paths.map((p) => ({
              d: p.getAttribute("d"),
              stroke: p.getAttribute("stroke") || window.getComputedStyle(p).stroke,
              fill: p.getAttribute("fill") || window.getComputedStyle(p).fill,
              strokeWidth: p.getAttribute("stroke-width") || window.getComputedStyle(p).strokeWidth,
              strokeDasharray:
                p.getAttribute("stroke-dasharray") || window.getComputedStyle(p).strokeDasharray,
              strokeDashoffset:
                p.getAttribute("stroke-dashoffset") || window.getComputedStyle(p).strokeDashoffset,
              pathLength: p.getTotalLength?.() ?? null,
            })),
          };
        })
        .filter(Boolean);
    });

    await writeFile(
      path.join(OUT_DIR, `svgs-${stop.label}-${stop.y}.json`),
      JSON.stringify(svgReport, null, 2),
      "utf-8",
    );
  }
});
