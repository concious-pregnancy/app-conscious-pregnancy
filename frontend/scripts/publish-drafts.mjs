/**
 * Publishes every draft document in the Sanity dataset.
 *
 * Each `drafts.<id>` is rewritten as the published `<id>` (createOrReplace)
 * and the draft is deleted. Use after a seed run if Studio's draft view
 * shadows the seed values, or any time you want to flush in-progress drafts
 * to production.
 *
 * Run: node scripts/publish-drafts.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const raw = readFileSync(join(ROOT, ".env.local"), "utf8");
const env = {};
for (const line of raw.split("\n")) {
  const [k, ...rest] = line.split("=");
  if (k && rest.length) env[k.trim()] = rest.join("=").trim();
}

const client = createClient({
  projectId: env["NEXT_PUBLIC_SANITY_PROJECT_ID"],
  dataset: env["NEXT_PUBLIC_SANITY_DATASET"] ?? "production",
  apiVersion: env["NEXT_PUBLIC_SANITY_API_VERSION"] ?? "2024-01-01",
  token: env["SANITY_API_TOKEN"],
  useCdn: false,
});

const drafts = await client.fetch(`*[_id in path("drafts.**")]{_id,_type}`);
// eslint-disable-next-line no-console
console.log(`Found ${drafts.length} drafts.`);

for (const d of drafts) {
  const draft = await client.getDocument(d._id);
  if (!draft) continue;
  const publishedId = d._id.replace(/^drafts\./, "");
  const { _id, _rev, _updatedAt, _createdAt, ...rest } = draft;
  await client.createOrReplace({ ...rest, _id: publishedId });
  await client.delete(d._id);
  // eslint-disable-next-line no-console
  console.log(`  published ${publishedId} (${d._type})`);
}

// eslint-disable-next-line no-console
console.log("Done.");
