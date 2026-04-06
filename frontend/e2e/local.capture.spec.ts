import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { expect, test } from "@playwright/test";

const RUN_ID = process.env.LOCAL_CAPTURE_RUN_ID ?? new Date().toISOString().replaceAll(":", "-");
const OUT_DIR = path.resolve(process.cwd(), "artifacts", "local-capture", RUN_ID);

const viewports = [
  { name: "desktop", width: 1440, height: 1024 },
  { name: "tablet", width: 1024, height: 1366 },
  { name: "mobile", width: 390, height: 844 },
];

test("capture local page across breakpoints and scroll milestones", async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true });

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });

    await expect(page.locator("main")).toBeVisible();
    await page.screenshot({
      path: path.join(OUT_DIR, `${viewport.name}-00-top.png`),
      fullPage: true,
    });

    const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const checkpoints = [0.22, 0.45, 0.68, 0.9];
    for (const [index, ratio] of checkpoints.entries()) {
      const y = Math.floor(fullHeight * ratio);
      await page.evaluate((value) => window.scrollTo(0, value), y);
      await page.waitForTimeout(450);
      await page.screenshot({
        path: path.join(
          OUT_DIR,
          `${viewport.name}-${String(index + 1).padStart(2, "0")}-scroll.png`,
        ),
        fullPage: false,
      });
    }
  }

  await writeFile(
    path.join(OUT_DIR, "capture-summary.json"),
    JSON.stringify(
      {
        runId: RUN_ID,
        generatedAt: new Date().toISOString(),
        viewports,
      },
      null,
      2,
    ),
    "utf-8",
  );
});
