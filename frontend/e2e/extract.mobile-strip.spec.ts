import { mkdir } from "node:fs/promises";
import path from "node:path";
import { test } from "@playwright/test";

const OUT = path.resolve(process.cwd(), "artifacts", "mobile-strip");

test("verify mobile strip + Ready H2 alignment", async ({ page }) => {
  await mkdir(OUT, { recursive: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1500);

  // Scroll to Services strip (after grid)
  await page.evaluate(() => {
    const strip = document.querySelector('[class*="strip"]');
    strip?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, "strip.png"), fullPage: false });

  // Grid columns check
  const stripCols = await page.evaluate(() => {
    const strip = document.querySelector(
      '[class*="services"][class*="strip"], [class*="strip"]',
    ) as HTMLElement | null;
    if (!strip) return null;
    return {
      gridTemplateColumns: getComputedStyle(strip).gridTemplateColumns,
      childCount: strip.children.length,
      width: strip.getBoundingClientRect().width,
      fifthCol: strip.children[4]
        ? getComputedStyle(strip.children[4] as HTMLElement).gridColumn
        : null,
    };
  });
  console.log("STRIP:", JSON.stringify(stripCols));

  // Scroll to Ready
  await page.evaluate(() => {
    document
      .querySelector('[data-section="ready"]')
      ?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, "ready.png"), fullPage: false });

  const readyAlign = await page.evaluate(() => {
    const sec = document.querySelector('[data-section="ready"]') as HTMLElement | null;
    if (!sec) return null;
    const h2 = sec.querySelector("h2") as HTMLElement | null;
    return {
      sectionTextAlign: getComputedStyle(sec).textAlign,
      h2TextAlign: h2 ? getComputedStyle(h2).textAlign : null,
      h2Rect: h2?.getBoundingClientRect().toJSON(),
    };
  });
  console.log("READY:", JSON.stringify(readyAlign));
});
