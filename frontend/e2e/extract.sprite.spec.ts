import { test } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(process.cwd(), "artifacts", "svg-sprite");

test("extract svg sprite", async ({ page }) => {
  await mkdir(OUT, { recursive: true });
  await page.goto("https://clearpath-template.framer.website/", {
    waitUntil: "networkidle",
    timeout: 120_000,
  });
  await page.waitForTimeout(1500);
  const sprite = await page.evaluate(() => {
    const def = document.querySelector("#svg-1049314060_207");
    return def ? def.outerHTML : null;
  });
  await writeFile(path.join(OUT, "sprite.html"), sprite || "(not found)", "utf-8");
});
