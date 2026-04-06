import { mkdir } from "node:fs/promises";
import path from "node:path";

import { expect, test } from "@playwright/test";

const TEMPLATE_URL = process.env.CRAWL_TARGET_URL ?? "https://clearpath-template.framer.website/";
const LOCAL_URL = "http://127.0.0.1:3000";
const OUT_DIR = path.resolve(process.cwd(), "artifacts", "section-comparison");

async function settleAfterScroll(page: import("@playwright/test").Page, ms = 600) {
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 100))),
  );
  await page.waitForTimeout(ms);
}

async function captureSections(
  page: import("@playwright/test").Page,
  url: string,
  suffix: string,
  outDir: string,
) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await settleAfterScroll(page, 1500);

  await page.screenshot({ path: path.join(outDir, `00-fullpage-${suffix}.png`), fullPage: true });

  const sectionCount = await page.evaluate(() => {
    return document.querySelectorAll("body > *").length;
  });

  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const steps = 12;
  const stepSize = Math.floor(totalHeight / steps);

  for (let i = 0; i <= steps; i++) {
    const y = Math.min(i * stepSize, totalHeight - 900);
    await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: "instant" }), y);
    await settleAfterScroll(page, 700);
    const idx = String(i + 1).padStart(2, "0");
    await page.screenshot({
      path: path.join(outDir, `${idx}-scroll-${suffix}.png`),
      fullPage: false,
    });
  }

  return sectionCount;
}

test("capture matched section screenshots from template and local", async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true });

  const templateSections = await captureSections(page, TEMPLATE_URL, "template", OUT_DIR);
  expect(templateSections).toBeGreaterThan(3);

  let localSections = 0;
  try {
    localSections = await captureSections(page, LOCAL_URL, "local", OUT_DIR);
  } catch {
    console.warn("Local site not reachable — only template screenshots captured");
  }

  console.log(
    `Template: ${templateSections} top-level elements, Local: ${localSections} top-level elements`,
  );
});
