import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { test } from "@playwright/test";

const TARGET_URL = "https://clearpath-template.framer.website/";
const OUT_DIR = path.resolve(process.cwd(), "artifacts", "footer-architecture");

const COMPUTED_PROPS = [
  "position",
  "top",
  "left",
  "right",
  "bottom",
  "width",
  "height",
  "min-height",
  "z-index",
  "overflow",
  "transform",
  "background",
  "background-color",
  "background-image",
  "color",
  "mix-blend-mode",
  "backdrop-filter",
  "-webkit-backdrop-filter",
  "opacity",
  "display",
  "padding",
  "margin",
  "isolation",
];

test("extract ClearPath footer + nav transition", async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);

  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);

  // Find the footer / Book A Session section + nav
  const layout = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll<HTMLElement>("[data-framer-name]"));
    const candidates = all.filter((el) =>
      /footer|newsletter|book a session|footer-menu|sitemap/i.test(el.dataset.framerName ?? ""),
    );
    return {
      docHeight: document.documentElement.scrollHeight,
      candidates: candidates.map((el) => ({
        name: el.dataset.framerName,
        class: el.className?.toString?.().slice(0, 80),
        rect: el.getBoundingClientRect().toJSON(),
        children: Array.from(el.children)
          .slice(0, 10)
          .map((c) => (c as HTMLElement).dataset.framerName ?? "(none)"),
      })),
      navCandidates: all
        .filter(
          (el) =>
            el.tagName.toLowerCase() === "nav" ||
            /nav|menu|header/i.test(el.dataset.framerName ?? ""),
        )
        .map((el) => ({
          name: el.dataset.framerName,
          tag: el.tagName.toLowerCase(),
          class: el.className?.toString?.().slice(0, 80),
          rect: el.getBoundingClientRect().toJSON(),
        })),
    };
  });

  await writeFile(path.join(OUT_DIR, "layout.json"), JSON.stringify(layout, null, 2), "utf-8");

  // Sample at scroll positions near the bottom: well before footer, footer
  // entering, footer fully on, fully past
  const stops = [
    { label: "before-footer", y: Math.max(0, docHeight - 2400) },
    { label: "footer-entering", y: Math.max(0, docHeight - 1500) },
    { label: "footer-mid", y: Math.max(0, docHeight - 1100) },
    { label: "footer-near-end", y: Math.max(0, docHeight - 900) },
    { label: "page-bottom", y: Math.max(0, docHeight - 900) },
  ];

  for (const stop of stops) {
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior }),
      stop.y,
    );
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(OUT_DIR, `scroll-${stop.label}-${stop.y}.png`),
      fullPage: false,
    });

    const report = await page.evaluate(
      ({ props }) => {
        const out: any = { byCategory: {} };
        const collect = (selector: string, label: string) => {
          const el = document.querySelector<HTMLElement>(selector);
          if (!el) return null;
          const cs = window.getComputedStyle(el);
          const styles: Record<string, string> = {};
          for (const p of props) styles[p] = cs.getPropertyValue(p);
          return {
            tag: el.tagName.toLowerCase(),
            class: el.className?.toString?.().slice(0, 100),
            rect: el.getBoundingClientRect().toJSON(),
            inlineStyle: el.getAttribute("style"),
            computed: styles,
          };
        };

        out.byCategory.nav = collect("nav, header, [data-framer-name='Menu']", "nav");

        // All footer-ish candidates within or below 50% viewport
        const all = Array.from(document.querySelectorAll<HTMLElement>("[data-framer-name]"));
        const footerEls = all
          .filter((el) => {
            const name = el.dataset.framerName ?? "";
            const r = el.getBoundingClientRect();
            const inLowerView = r.top > -200 && r.top < window.innerHeight + 200;
            return (
              inLowerView && /footer|newsletter|book a session|book session|sitemap/i.test(name)
            );
          })
          .slice(0, 10);

        out.byCategory.footers = footerEls.map((el) => {
          const cs = window.getComputedStyle(el);
          const styles: Record<string, string> = {};
          for (const p of props) styles[p] = cs.getPropertyValue(p);
          return {
            framerName: el.dataset.framerName,
            tag: el.tagName.toLowerCase(),
            rect: el.getBoundingClientRect().toJSON(),
            inlineStyle: el.getAttribute("style"),
            computed: styles,
          };
        });

        // Sample background color at top center of viewport (where nav sits)
        // and at bottom center (footer area) via elementsFromPoint
        const sample = (x: number, y: number) => {
          const els = document.elementsFromPoint(x, y);
          return els.slice(0, 6).map((el) => {
            const cs = window.getComputedStyle(el as HTMLElement);
            return {
              tag: el.tagName.toLowerCase(),
              framerName: (el as HTMLElement).dataset?.framerName ?? null,
              class: (el.className?.toString?.() ?? "").slice(0, 60),
              bg: cs.backgroundColor,
              color: cs.color,
              position: cs.position,
              zIndex: cs.zIndex,
            };
          });
        };

        out.byCategory.atTop = sample(720, 30);
        out.byCategory.atTopBelowNav = sample(720, 100);
        out.byCategory.atBottomCenter = sample(720, 800);

        out.scrollY = window.scrollY;
        return out;
      },
      { props: COMPUTED_PROPS },
    );

    await writeFile(
      path.join(OUT_DIR, `report-${stop.label}-${stop.y}.json`),
      JSON.stringify(report, null, 2),
      "utf-8",
    );
  }
});
