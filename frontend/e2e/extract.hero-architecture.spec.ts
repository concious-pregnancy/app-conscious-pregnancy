import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { test } from "@playwright/test";

const TARGET_URL = "https://clearpath-template.framer.website/";
const OUT_DIR = path.resolve(process.cwd(), "artifacts", "hero-architecture");

const TARGET_NAMES = [
  "Main Container",
  "Page Intro",
  "Image Container",
  "Image",
  "Hero",
  "Animated Lines",
];

const COMPUTED_PROPS = [
  "position",
  "top",
  "left",
  "right",
  "bottom",
  "width",
  "height",
  "min-height",
  "max-height",
  "z-index",
  "overflow",
  "overflow-y",
  "transform",
  "will-change",
  "opacity",
  "mask",
  "mask-image",
  "-webkit-mask",
  "-webkit-mask-image",
  "background",
  "background-color",
  "background-image",
  "display",
  "isolation",
  "padding",
  "margin",
];

test("dump Framer template hero stack architecture", async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);

  const report = await page.evaluate(
    ({ names, props }) => {
      const out: Record<string, unknown> = {};

      const allElements = Array.from(document.querySelectorAll<HTMLElement>("[data-framer-name]"));

      for (const name of names) {
        const matches = allElements.filter((el) => el.dataset.framerName === name);
        out[name] = matches.map((el) => {
          const cs = window.getComputedStyle(el);
          const styles: Record<string, string> = {};
          for (const p of props) styles[p] = cs.getPropertyValue(p);
          const rect = el.getBoundingClientRect();
          return {
            class: el.className,
            id: el.id || null,
            tag: el.tagName.toLowerCase(),
            inlineStyle: el.getAttribute("style"),
            offsetParent: el.offsetParent
              ? `${(el.offsetParent as HTMLElement).tagName.toLowerCase()}.${(el.offsetParent as HTMLElement).className}`
              : null,
            parentName: el.parentElement?.dataset.framerName ?? null,
            childNames: Array.from(el.children)
              .map((c) => (c as HTMLElement).dataset.framerName)
              .filter(Boolean),
            rect: {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            },
            computed: styles,
          };
        });
      }

      const documentHeight = document.documentElement.scrollHeight;
      const viewport = { w: window.innerWidth, h: window.innerHeight };
      return { documentHeight, viewport, byName: out };
    },
    { names: TARGET_NAMES, props: COMPUTED_PROPS },
  );

  await writeFile(path.join(OUT_DIR, "scroll-y-0.json"), JSON.stringify(report, null, 2), "utf-8");

  await page.screenshot({
    path: path.join(OUT_DIR, "scroll-y-0.png"),
    fullPage: false,
  });

  const heights = report.byName as Record<string, Array<{ rect: { height: number; top: number } }>>;
  const imageContainerH = heights["Image Container"]?.[0]?.rect.height ?? 0;
  const heroH = heights.Hero?.[0]?.rect.height ?? 0;

  const stops = [
    { label: "hero-out-quarter", y: Math.round(heroH * 0.5) },
    { label: "hero-out-full", y: Math.round(heroH * 1.0) },
    { label: "image-mid", y: Math.round(imageContainerH * 0.5) },
    { label: "image-fade-start", y: Math.round(imageContainerH * 0.85) },
    { label: "image-fade-end", y: Math.round(imageContainerH * 0.98) },
  ];

  for (const stop of stops) {
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior }),
      stop.y,
    );
    await page.waitForTimeout(700);

    const stopReport = await page.evaluate(
      ({ names, props }) => {
        const out: Record<string, unknown> = {};
        const allElements = Array.from(
          document.querySelectorAll<HTMLElement>("[data-framer-name]"),
        );
        for (const name of names) {
          const matches = allElements.filter((el) => el.dataset.framerName === name);
          out[name] = matches.map((el) => {
            const cs = window.getComputedStyle(el);
            const styles: Record<string, string> = {};
            for (const p of props) styles[p] = cs.getPropertyValue(p);
            const rect = el.getBoundingClientRect();
            return {
              rect: { top: rect.top, height: rect.height },
              opacity: cs.opacity,
              transform: cs.transform,
              position: cs.position,
              top: cs.top,
              mask: cs.mask || cs.getPropertyValue("-webkit-mask"),
              inlineTransform: el.style.transform || null,
              inlineOpacity: el.style.opacity || null,
            };
          });
        }
        return { scrollY: window.scrollY, byName: out };
      },
      { names: TARGET_NAMES, props: COMPUTED_PROPS },
    );

    await writeFile(
      path.join(OUT_DIR, `scroll-${stop.label}-${stop.y}.json`),
      JSON.stringify(stopReport, null, 2),
      "utf-8",
    );
    await page.screenshot({
      path: path.join(OUT_DIR, `scroll-${stop.label}-${stop.y}.png`),
      fullPage: false,
    });
  }
});
