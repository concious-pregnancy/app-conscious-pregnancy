import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { test } from "@playwright/test";

const TARGET_URL = "https://clearpath-template.framer.website/";
const OUT_DIR = path.resolve(process.cwd(), "artifacts", "bigquote-deep");

test("deep dive Big Quote section in ClearPath", async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);

  // Big Quote rect: y 9347, h 1080. Sample inside it.
  const stops = [9000, 9300, 9600, 9900, 10200];

  for (const y of stops) {
    await page.evaluate(
      (sy) => window.scrollTo({ top: sy, behavior: "instant" as ScrollBehavior }),
      y,
    );
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT_DIR, `scroll-${y}.png`), fullPage: false });

    const report = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll<HTMLElement>("*"));
      const interesting: any[] = [];
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.top > window.innerHeight || r.bottom < 0) continue;
        const cs = window.getComputedStyle(el);
        const mask =
          cs.maskImage !== "none" ? cs.maskImage : cs.getPropertyValue("-webkit-mask-image");
        const clip = cs.clipPath !== "none" ? cs.clipPath : null;
        const blr = parseFloat(cs.borderTopLeftRadius);
        const brr = parseFloat(cs.borderTopRightRadius);
        const inFramerNames = (el as HTMLElement).dataset.framerName;
        const interestingCondition =
          (mask && mask !== "none") ||
          clip ||
          blr > 30 ||
          brr > 30 ||
          inFramerNames === "Shape" ||
          inFramerNames === "Shape Container" ||
          inFramerNames === "Big Quote" ||
          inFramerNames === "big-quote";
        if (!interestingCondition) continue;
        interesting.push({
          framerName: inFramerNames ?? null,
          tag: el.tagName.toLowerCase(),
          class: el.className?.toString?.().slice(0, 100) ?? "",
          rect: { top: r.top, left: r.left, width: r.width, height: r.height },
          maskImage: mask || null,
          clipPath: clip,
          borderTopLeftRadius: cs.borderTopLeftRadius,
          borderTopRightRadius: cs.borderTopRightRadius,
          borderRadius: cs.borderRadius,
          background: cs.background.slice(0, 200),
          backgroundImage: cs.backgroundImage.slice(0, 200),
          transform: cs.transform,
          opacity: cs.opacity,
        });
      }
      return interesting;
    });

    await writeFile(
      path.join(OUT_DIR, `report-${y}.json`),
      JSON.stringify(report, null, 2),
      "utf-8",
    );
  }
});
