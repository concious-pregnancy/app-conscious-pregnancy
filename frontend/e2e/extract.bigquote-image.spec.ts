import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { test } from "@playwright/test";

const TARGET_URL = "https://clearpath-template.framer.website/";
const OUT_DIR = path.resolve(process.cwd(), "artifacts", "bigquote-image");

test("find arched image element in Big Quote section", async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);

  for (const y of [9000, 9300, 9600]) {
    await page.evaluate(
      (sy) => window.scrollTo({ top: sy, behavior: "instant" as ScrollBehavior }),
      y,
    );
    await page.waitForTimeout(800);

    const report = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll<HTMLElement>("*"));
      const out: any[] = [];
      for (const el of all) {
        const r = el.getBoundingClientRect();
        // Only look in viewport, sized for image
        if (r.top > window.innerHeight || r.bottom < 0) continue;
        if (r.width < 200 || r.height < 100) continue;
        const cs = window.getComputedStyle(el);
        const bg = cs.backgroundImage;
        const tag = el.tagName.toLowerCase();
        const isImg = tag === "img" || tag === "picture";
        const hasBg = bg !== "none" && (bg.includes("url(") || bg.includes("framerusercontent"));
        if (!isImg && !hasBg) continue;
        out.push({
          tag,
          framerName: (el as HTMLElement).dataset.framerName ?? null,
          parentFramerName: (el.parentElement as HTMLElement)?.dataset.framerName ?? null,
          grandparentFramerName:
            (el.parentElement?.parentElement as HTMLElement)?.dataset.framerName ?? null,
          class: el.className?.toString?.().slice(0, 100) ?? "",
          src: (el as HTMLImageElement).src ?? null,
          bgImage: bg.slice(0, 200),
          rect: { top: r.top, left: r.left, width: r.width, height: r.height },
          mask: cs.maskImage,
          webkitMask: cs.getPropertyValue("-webkit-mask-image"),
          clipPath: cs.clipPath,
          borderRadius: cs.borderRadius,
          borderTopLeftRadius: cs.borderTopLeftRadius,
          borderTopRightRadius: cs.borderTopRightRadius,
          transform: cs.transform.slice(0, 200),
          parentTransform: el.parentElement
            ? window.getComputedStyle(el.parentElement).transform.slice(0, 150)
            : null,
          parentClip: el.parentElement ? window.getComputedStyle(el.parentElement).clipPath : null,
          parentMask: el.parentElement ? window.getComputedStyle(el.parentElement).maskImage : null,
          parentBorderRadius: el.parentElement
            ? window.getComputedStyle(el.parentElement).borderRadius
            : null,
        });
      }
      return out;
    });

    await writeFile(
      path.join(OUT_DIR, `images-${y}.json`),
      JSON.stringify(report, null, 2),
      "utf-8",
    );
  }
});
