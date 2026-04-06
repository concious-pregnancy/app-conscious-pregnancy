import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { expect, test } from "@playwright/test";

type ResourceRecord = {
  url: string;
  method: string;
  resourceType: string;
  status: number | null;
  ok: boolean;
  contentType: string;
  sizeBytes: number | null;
  firstSeenAtMs: number;
  localPath: string | null;
  error: string | null;
};

const TARGET_URL = process.env.CRAWL_TARGET_URL ?? "https://clearpath-template.framer.website/";
const RUN_ID = process.env.CRAWL_RUN_ID ?? new Date().toISOString().replaceAll(":", "-");
const ROOT_DIR = path.resolve(process.cwd(), "artifacts", "clearpath-crawl", RUN_ID);
const ASSET_DIR = path.join(ROOT_DIR, "assets");
const SHOT_DIR = path.join(ROOT_DIR, "screenshots");

const MIME_EXT: Record<string, string> = {
  "text/html": ".html",
  "text/css": ".css",
  "application/javascript": ".js",
  "text/javascript": ".js",
  "application/json": ".json",
  "application/ld+json": ".json",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "font/woff2": ".woff2",
  "font/woff": ".woff",
};

function hashUrl(input: string): string {
  return createHash("sha1").update(input).digest("hex").slice(0, 12);
}

function extFromContentType(contentType: string): string {
  const mime = contentType.split(";")[0].trim().toLowerCase();
  if (MIME_EXT[mime]) {
    return MIME_EXT[mime];
  }
  if (mime.startsWith("text/")) {
    return ".txt";
  }
  return ".bin";
}

function extFromUrl(input: string): string {
  try {
    const pathname = new URL(input).pathname;
    const ext = path.extname(pathname);
    return ext && ext.length <= 6 ? ext : "";
  } catch {
    return "";
  }
}

async function progressiveScroll(
  pageHeight: number,
  stepPx: number,
  callback: (y: number) => Promise<void>,
) {
  let y = 0;
  while (y < pageHeight) {
    await callback(y);
    y += stepPx;
  }
}

test("crawl clearpath template network and assets", async ({ page }) => {
  await mkdir(ASSET_DIR, { recursive: true });
  await mkdir(SHOT_DIR, { recursive: true });

  const startedAt = Date.now();
  const resources = new Map<string, ResourceRecord>();

  page.on("response", (response) => {
    const request = response.request();
    const key = `${request.method()} ${request.url()} ${request.resourceType()}`;
    if (!resources.has(key)) {
      resources.set(key, {
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
        status: response.status(),
        ok: response.ok(),
        contentType: response.headers()["content-type"] ?? "",
        sizeBytes: null,
        firstSeenAtMs: Date.now() - startedAt,
        localPath: null,
        error: null,
      });
    }
  });

  const nav = await page.goto(TARGET_URL, { waitUntil: "domcontentloaded", timeout: 120_000 });
  expect(nav, "target URL must be reachable").not.toBeNull();

  await page.waitForLoadState("networkidle", { timeout: 120_000 });
  await page.screenshot({ path: path.join(SHOT_DIR, "00-top.png"), fullPage: true });
  await writeFile(path.join(ROOT_DIR, "dom-initial.html"), await page.content(), "utf-8");

  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(300, Math.floor(totalHeight / 14));

  await progressiveScroll(totalHeight, step, async (nextY) => {
    await page.evaluate((value) => window.scrollTo(0, value), nextY);
    await page.waitForTimeout(300);
  });

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(600);

  const hoverTargets = [
    'a:has-text("Start your journey")',
    'a:has-text("Get started")',
    'button:has-text("book a session")',
  ];

  for (const selector of hoverTargets) {
    const candidate = page.locator(selector).first();
    if ((await candidate.count()) > 0) {
      await candidate.hover({ force: true });
      await page.waitForTimeout(150);
    }
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  await page.screenshot({ path: path.join(SHOT_DIR, "01-final-top.png"), fullPage: true });
  await writeFile(path.join(ROOT_DIR, "dom-final.html"), await page.content(), "utf-8");

  const records = [...resources.values()].sort((a, b) => a.firstSeenAtMs - b.firstSeenAtMs);
  for (const entry of records) {
    if (!entry.ok || entry.status === null || entry.status >= 400) {
      continue;
    }
    try {
      const response = await page.request.fetch(entry.url, { method: "GET", timeout: 90_000 });
      if (!response.ok()) {
        entry.error = `fetch failed: ${response.status()}`;
        continue;
      }

      const body = Buffer.from(await response.body());
      entry.sizeBytes = body.byteLength;
      const contentType = response.headers()["content-type"] ?? entry.contentType;
      const ext = extFromUrl(entry.url) || extFromContentType(contentType);
      const filename = `${hashUrl(entry.url)}-${entry.resourceType}${ext}`;
      const localPath = path.join("assets", filename);
      await writeFile(path.join(ROOT_DIR, localPath), body);
      entry.localPath = localPath;
      entry.contentType = contentType;
    } catch (error) {
      entry.error = error instanceof Error ? error.message : "unknown fetch error";
    }
  }

  const byType = records.reduce<Record<string, number>>((acc, item) => {
    acc[item.resourceType] = (acc[item.resourceType] ?? 0) + 1;
    return acc;
  }, {});

  const summary = {
    runId: RUN_ID,
    targetUrl: TARGET_URL,
    generatedAt: new Date().toISOString(),
    totals: {
      requests: records.length,
      downloaded: records.filter((item) => item.localPath !== null).length,
      failed: records.filter((item) => item.error !== null).length,
      byType,
    },
    resources: records,
  };

  await writeFile(path.join(ROOT_DIR, "manifest.json"), JSON.stringify(summary, null, 2), "utf-8");
});
