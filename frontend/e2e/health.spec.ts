import { expect, test } from "@playwright/test";

// This spec targets the local dev server that playwright.config.ts boots when PW_LOCAL=1.
// Run with: PW_LOCAL=1 bun run test:e2e e2e/health.spec.ts --project=chromium
const BASE_URL = "http://127.0.0.1:3000";

test("GET /api/health returns ok status", async ({ request }) => {
  const response = await request.get(`${BASE_URL}/api/health`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.status).toBe("ok");
  expect(body.service).toBe("conscious-pregnancy");
});
