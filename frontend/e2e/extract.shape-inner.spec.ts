import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { test } from "@playwright/test";

const TARGET_URL = "https://clearpath-template.framer.website/";
const OUT_DIR = path.resolve(process.cwd(), "artifacts", "shape-inner");

test("inspect Shape Container inner HTML", async ({ page }) => {
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
      const sc = document.querySelector<HTMLElement>('[data-framer-name="Shape Container"]');
      if (!sc) return null;
      const treeDump = (el: Element, depth = 0): any => {
        const cs = window.getComputedStyle(el as HTMLElement);
        const r = (el as HTMLElement).getBoundingClientRect();
        return {
          depth,
          tag: el.tagName.toLowerCase(),
          framerName: (el as HTMLElement).dataset?.framerName ?? null,
          class: (el.className?.toString?.() ?? "").slice(0, 80),
          attrs: Array.from(el.attributes)
            .filter((a) => !["class", "style"].includes(a.name))
            .map((a) => `${a.name}="${a.value.slice(0, 60)}"`),
          inlineStyle: (el as HTMLElement).getAttribute("style")?.slice(0, 200) ?? null,
          rect: { top: r.top, left: r.left, width: r.width, height: r.height },
          computed: {
            position: cs.position,
            transform: cs.transform.slice(0, 150),
            transformStyle: cs.transformStyle,
            perspective: cs.perspective,
            backfaceVisibility: cs.backfaceVisibility,
            backgroundImage: cs.backgroundImage.slice(0, 100),
            mask: cs.maskImage,
            clipPath: cs.clipPath,
            borderRadius: cs.borderRadius,
            display: cs.display,
            overflow: cs.overflow,
          },
          children: Array.from(el.children).map((c) => treeDump(c, depth + 1)),
        };
      };
      const ancestor = sc.closest('[data-framer-name="Big Quote"]') ?? sc.parentElement;
      return ancestor ? treeDump(ancestor) : treeDump(sc);
    });

    await writeFile(path.join(OUT_DIR, `tree-${y}.json`), JSON.stringify(dump, null, 2), "utf-8");
  }
});
