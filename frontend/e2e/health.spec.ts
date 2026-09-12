import { expect, test } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";

test("GET /api/health returns ok", async ({ request }) => {
  const response = await request.get(`${baseURL}/api/health`);
  expect(response.status()).toBe(200);

  const body = (await response.json()) as { status: string; service: string };
  expect(body.status).toBe("ok");
  expect(body.service).toBe("conscious-pregnancy");
});
