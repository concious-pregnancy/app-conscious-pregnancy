import { mkdir } from "node:fs/promises";
import path from "node:path";

import { test } from "@playwright/test";

const OUT = path.resolve(process.cwd(), "artifacts", "mobile-audit");
const URL = "http://localhost:3000/";

test("mobile audit screenshots — iPhone 13 width", async ({ page }) => {
  await mkdir(OUT, { recursive: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1000);

  const sections = [
    { id: "hero", label: "00-hero" },
    { id: "balance", label: "01-balance" },
    { id: "services", label: "02-services" },
    { id: "philosophy", label: "03-philosophy" },
    { id: "credentials", label: "04-credentials" },
    { id: "ready", label: "05-ready" },
    { id: "approach", label: "06-approach" },
    { id: "listen", label: "07-listen" },
    { id: "real-stories", label: "08-real-stories" },
    { id: "faq", label: "09-faq" },
    { id: "contact", label: "10-contact" },
    { id: "footer", label: "11-footer" },
  ];

  for (const s of sections) {
    const found = await page.evaluate((id) => {
      const el = document.querySelector(`[data-section="${id}"], #${id}`);
      if (!el) return null;
      el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      return true;
    }, s.id);
    if (!found) continue;
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, `${s.label}.png`), fullPage: false });
  }

  // also take a fullPage shot for footer + page bottom
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, "12-bottom.png"), fullPage: false });
});
