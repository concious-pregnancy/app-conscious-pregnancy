import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { test } from "@playwright/test";

const OUT = path.resolve(process.cwd(), "artifacts", "toggle-fonts");
const URL = "https://clearpath-template.framer.website/";

test("extract ClearPath Toggle (Balance) heading + body fonts", async ({ page }) => {
  await mkdir(OUT, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);

  // Toggle section sits ~scrollY 1500-2400 based on prior architecture extraction
  await page.evaluate(() => {
    const toggle = document.querySelector('[data-framer-name="Toggle"]');
    toggle?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "center" });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, "toggle.png"), fullPage: false });

  const fonts = await page.evaluate(() => {
    const toggle = document.querySelector('[data-framer-name="Toggle"]') as HTMLElement | null;
    if (!toggle) return null;

    // Find every text-bearing element inside Toggle
    const items: any[] = [];
    const visit = (el: Element) => {
      const tag = el.tagName.toLowerCase();
      if (["h1", "h2", "h3", "h4", "p", "span", "li", "a"].includes(tag)) {
        const text = (el.textContent || "").trim().slice(0, 80);
        if (text.length > 5) {
          const cs = window.getComputedStyle(el as HTMLElement);
          items.push({
            tag,
            framerName: (el as HTMLElement).dataset.framerName ?? null,
            class: el.className?.toString?.().slice(0, 100) ?? "",
            text,
            fontFamily: cs.fontFamily,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            fontStyle: cs.fontStyle,
            lineHeight: cs.lineHeight,
            letterSpacing: cs.letterSpacing,
            color: cs.color,
            textAlign: cs.textAlign,
          });
        }
      }
      for (const child of el.children) visit(child);
    };
    visit(toggle);

    return {
      toggleRect: toggle.getBoundingClientRect().toJSON(),
      items,
    };
  });

  await writeFile(path.join(OUT, "fonts.json"), JSON.stringify(fonts, null, 2), "utf-8");
});
