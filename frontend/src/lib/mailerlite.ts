/* eslint-disable no-console -- server-side logging for observability */

interface UpsertSubscriberParams {
  email: string;
  fields?: Record<string, string | number>;
}

export async function upsertSubscriber(params: UpsertSubscriberParams): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) throw new Error("MAILERLITE_API_KEY is not configured");

  const groupId = process.env.MAILERLITE_GROUP_ID;
  const email = params.email.toLowerCase().trim();

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      fields: params.fields ?? {},
      groups: groupId ? [groupId] : undefined,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`MailerLite API error (${res.status}): ${errorText}`);
  }

  const body = (await res.json()) as { data?: { id?: string } };
  console.log("[mailerlite] subscriber upserted:", email, body.data?.id ?? "");
}
