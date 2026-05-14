#!/usr/bin/env bun
/**
 * Idempotent setup for a Brevo workspace used by this app.
 *
 * Brevo silently drops contact attributes that aren't pre-defined in the
 * workspace schema. Run this once per Brevo account/workspace so all the
 * attributes our /api/contact and /api/subscribe routes send actually
 * persist on each contact.
 *
 *   BREVO_API_KEY=xkeysib-... bun run scripts/brevo-bootstrap.ts
 *
 * Returns 0 on success, non-zero on failure. Safe to re-run.
 */

const REQUIRED_ATTRIBUTES = ["SOURCE", "MESSAGE", "STAGE"] as const;

async function main(): Promise<number> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set");
    return 1;
  }

  const existing = await fetch("https://api.brevo.com/v3/contacts/attributes", {
    headers: { "api-key": apiKey },
  });
  if (!existing.ok) {
    console.error(`Failed to list attributes: ${existing.status} ${await existing.text()}`);
    return 1;
  }
  const data = (await existing.json()) as { attributes: { name: string }[] };
  const have = new Set(data.attributes.map((a) => a.name));

  let createdCount = 0;
  for (const name of REQUIRED_ATTRIBUTES) {
    if (have.has(name)) {
      console.log(`[skip] ${name} already exists`);
      continue;
    }
    const res = await fetch(`https://api.brevo.com/v3/contacts/attributes/normal/${name}`, {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ type: "text" }),
    });
    if (!res.ok) {
      console.error(`[fail] ${name}: ${res.status} ${await res.text()}`);
      return 1;
    }
    console.log(`[create] ${name}`);
    createdCount++;
  }

  console.log(
    `done. ${createdCount} created, ${REQUIRED_ATTRIBUTES.length - createdCount} already present`,
  );
  return 0;
}

main().then((code) => process.exit(code));
