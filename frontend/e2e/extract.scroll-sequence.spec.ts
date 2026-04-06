import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { expect, test } from "@playwright/test";

const TARGET_URL = process.env.CRAWL_TARGET_URL ?? "https://clearpath-template.framer.website/";
const LOCAL_URL = "http://127.0.0.1:3000";
const OUT_DIR = path.resolve(process.cwd(), "artifacts", "scroll-sequence");
const STEP_PX = 80;
const SETTLE_MS = 120;
const WHEEL_DELTA = 60;

async function settleAfterScroll(page: import("@playwright/test").Page, ms = 600) {
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 100))),
  );
  await page.waitForTimeout(ms);
}

async function captureScrollSequence(
  page: import("@playwright/test").Page,
  url: string,
  label: string,
  outDir: string,
) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await settleAfterScroll(page, 1500);

  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = 900;
  const maxScroll = totalHeight - viewportHeight;
  const totalSteps = Math.ceil(maxScroll / STEP_PX);
  const captureEvery = Math.max(1, Math.floor(STEP_PX <= 100 ? 1 : STEP_PX / 100));

  let currentY = 0;
  let frameIndex = 0;
  const manifest: Array<{ file: string; scrollY: number }> = [];

  await page.screenshot({
    path: path.join(outDir, `scroll-0000px-${label}.png`),
    fullPage: false,
  });
  manifest.push({ file: `scroll-0000px-${label}.png`, scrollY: 0 });

  for (let step = 0; step < totalSteps && currentY < maxScroll; step++) {
    const remaining = Math.min(STEP_PX, maxScroll - currentY);
    const wheelSteps = Math.ceil(remaining / WHEEL_DELTA);

    for (let w = 0; w < wheelSteps; w++) {
      const delta = Math.min(WHEEL_DELTA, maxScroll - currentY);
      await page.mouse.wheel(0, delta);
      currentY += delta;
      await page.waitForTimeout(16);
    }

    await page.waitForTimeout(SETTLE_MS);

    if (step % captureEvery === 0 || step === totalSteps - 1) {
      const actualY = await page.evaluate(() => Math.round(window.scrollY));
      const yStr = String(actualY).padStart(5, "0");
      const filename = `scroll-${yStr}px-${label}.png`;
      await page.screenshot({
        path: path.join(outDir, filename),
        fullPage: false,
      });
      manifest.push({ file: filename, scrollY: actualY });
      frameIndex++;
    }

    if (frameIndex > 200) break;
  }

  await writeFile(
    path.join(outDir, `manifest-${label}.json`),
    JSON.stringify({ url, label, totalHeight, frames: manifest.length, manifest }, null, 2),
    "utf-8",
  );

  return manifest.length;
}

test("capture fine-grained scroll sequence from template", async ({ page }) => {
  await mkdir(OUT_DIR, { recursive: true });

  const frames = await captureScrollSequence(page, TARGET_URL, "template", OUT_DIR);
  expect(frames).toBeGreaterThan(10);

  if (process.env.PW_LOCAL === "1") {
    try {
      const localFrames = await captureScrollSequence(page, LOCAL_URL, "local", OUT_DIR);
      console.log(`Local: ${localFrames} frames captured`);
    } catch {
      console.warn("Local site not reachable — only template scroll sequence captured");
    }
  }
});
