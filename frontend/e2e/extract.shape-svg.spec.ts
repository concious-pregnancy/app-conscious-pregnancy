import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { test } from "@playwright/test";

const TARGET_URL = "https://clearpath-template.framer.website/";
const OUT_DIR = path.resolve(process.cwd(), "artifacts", "shape-svg");

test("extract Shape SVG markup and Big Quote backdrop", async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);

  for (const y of [9000, 9300, 9700]) {
    await page.evaluate(
      (sy) => window.scrollTo({ top: sy, behavior: "instant" as ScrollBehavior }),
      y,
    );
    await page.waitForTimeout(800);

    const dump = await page.evaluate(() => {
      const shapeContainer = document.querySelector<HTMLElement>(
        '[data-framer-name="Shape Container"]',
      );
      const shape = document.querySelector<HTMLElement>('[data-framer-name="Shape"]');
      const bigQuote = document.querySelector<HTMLElement>('[data-framer-name="Big Quote"]');

      const dumpDeep = (el: Element | null) => {
        if (!el) return null;
        return {
          outerHTMLTrunc: el.outerHTML.slice(0, 4000),
        };
      };

      const sc = shapeContainer ? window.getComputedStyle(shapeContainer) : null;
      const sh = shape ? window.getComputedStyle(shape) : null;

      // Look at what's UNDER Shape Container (its preceding siblings or background)
      const bgCandidates = bigQuote
        ? Array.from(bigQuote.querySelectorAll<HTMLElement>("*"))
            .filter((el) => {
              const cs = window.getComputedStyle(el);
              return (
                (cs.maskImage && cs.maskImage !== "none") ||
                (cs.clipPath && cs.clipPath !== "none") ||
                cs.transformStyle === "preserve-3d" ||
                cs.perspective !== "none"
              );
            })
            .slice(0, 30)
            .map((el) => ({
              tag: el.tagName.toLowerCase(),
              class: el.className?.toString?.().slice(0, 80),
              framerName: el.dataset.framerName,
              rect: el.getBoundingClientRect().toJSON(),
              mask: window.getComputedStyle(el).maskImage,
              webkitMask: window.getComputedStyle(el).getPropertyValue("-webkit-mask-image"),
              clipPath: window.getComputedStyle(el).clipPath,
              perspective: window.getComputedStyle(el).perspective,
              transformStyle: window.getComputedStyle(el).transformStyle,
              transform: window.getComputedStyle(el).transform.slice(0, 150),
            }))
        : [];

      return {
        scrollY: window.scrollY,
        shapeContainer: shapeContainer
          ? {
              outerHTML: shapeContainer.outerHTML.slice(0, 4000),
              computed: {
                transform: sc!.transform,
                transformStyle: sc!.transformStyle,
                transformOrigin: sc!.transformOrigin,
                perspective: sc!.perspective,
                mask: sc!.maskImage,
                clipPath: sc!.clipPath,
                background: sc!.backgroundColor,
                backgroundImage: sc!.backgroundImage,
              },
            }
          : null,
        shape: shape
          ? {
              outerHTML: shape.outerHTML.slice(0, 4000),
              computed: {
                background: sh!.backgroundColor,
                backgroundImage: sh!.backgroundImage,
                mask: sh!.maskImage,
                clipPath: sh!.clipPath,
                transform: sh!.transform,
                transformStyle: sh!.transformStyle,
              },
            }
          : null,
        bigQuote: dumpDeep(bigQuote),
        bigQuoteCandidates: bgCandidates,
      };
    });

    await writeFile(path.join(OUT_DIR, `dump-${y}.json`), JSON.stringify(dump, null, 2), "utf-8");
  }
});
