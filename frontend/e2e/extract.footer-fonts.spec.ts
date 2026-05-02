import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { test } from "@playwright/test";

const OUT = path.resolve(process.cwd(), "artifacts", "footer-fonts");

test("extract ClearPath Footer fonts", async ({ page }) => {
  await mkdir(OUT, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("https://clearpath-template.framer.website/", {
    waitUntil: "networkidle",
    timeout: 120_000,
  });
  await page.waitForTimeout(1500);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, "footer.png"), fullPage: false });

  const fonts = await page.evaluate(() => {
    const footers = Array.from(
      document.querySelectorAll<HTMLElement>('[data-framer-name="Footer Container"], footer'),
    );
    if (footers.length === 0) return null;
    const items: any[] = [];
    for (const footer of footers) {
      const visit = (el: Element) => {
        const tag = el.tagName.toLowerCase();
        if (["h1", "h2", "h3", "h4", "p", "span", "li", "a", "label", "button"].includes(tag)) {
          const text = (el.textContent || "").trim();
          if (text.length > 1 && text.length < 80) {
            const cs = window.getComputedStyle(el as HTMLElement);
            items.push({
              tag,
              framerName: (el as HTMLElement).dataset.framerName ?? null,
              text: text.slice(0, 60),
              fontFamily: cs.fontFamily,
              fontSize: cs.fontSize,
              fontWeight: cs.fontWeight,
              fontStyle: cs.fontStyle,
              textTransform: cs.textTransform,
              lineHeight: cs.lineHeight,
              letterSpacing: cs.letterSpacing,
              color: cs.color,
            });
          }
        }
        for (const child of el.children) visit(child);
      };
      visit(footer);
    }
    return { items };
  });

  await writeFile(path.join(OUT, "fonts.json"), JSON.stringify(fonts, null, 2), "utf-8");
});
