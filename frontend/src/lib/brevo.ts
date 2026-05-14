/* eslint-disable no-console -- server-side logging for observability */

interface UpsertContactParams {
  email: string;
  attributes?: Record<string, string | number>;
  listIds?: number[];
}

interface UpsertContactResult {
  created: boolean;
}

export async function upsertContact(params: UpsertContactParams): Promise<UpsertContactResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is not configured");

  const listIds = params.listIds ?? [];
  const listIdFromEnv = process.env.BREVO_LIST_ID;
  if (listIds.length === 0 && listIdFromEnv) listIds.push(Number(listIdFromEnv));

  const email = params.email.toLowerCase().trim();
  const attributes: Record<string, string | number> = { ...(params.attributes ?? {}) };

  async function postOnce(): Promise<Response> {
    return fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": apiKey!, "Content-Type": "application/json" },
      body: JSON.stringify({ email, attributes, listIds, updateEnabled: true }),
    });
  }

  let res = await postOnce();

  // Brevo enforces account-wide uniqueness on phone (SMS attribute). If the SMS
  // is already attached to another contact, the whole upsert fails. Strip the
  // SMS and retry so the email still gets captured; the phone is preserved in
  // the notification email body either way.
  if (res.status === 400 && "SMS" in attributes) {
    const peek = await res.clone().text();
    if (peek.includes("duplicate_parameter") && peek.includes("SMS")) {
      console.warn("[brevo] SMS already attached to another contact, retrying without SMS");
      delete attributes.SMS;
      res = await postOnce();
    }
  }

  if (res.status === 201) {
    console.log("[brevo] contact created:", email);
    return { created: true };
  }
  if (res.status === 204) {
    console.log("[brevo] contact updated:", email);
    return { created: false };
  }

  const errorText = await res.text();
  throw new Error(`Brevo API error (${res.status}): ${errorText}`);
}

interface NotificationEmailParams {
  subject: string;
  htmlContent: string;
  replyToEmail?: string;
  replyToName?: string;
}

export async function sendNotificationEmail(params: NotificationEmailParams): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.BREVO_NOTIFY_FROM_EMAIL;
  const fromName = process.env.BREVO_NOTIFY_FROM_NAME ?? "Conscious Pregnancy";
  const toList = (process.env.BREVO_NOTIFY_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey || !fromEmail || toList.length === 0) {
    console.warn("[brevo] notification email skipped (missing config)");
    return;
  }

  const body = {
    sender: { email: fromEmail, name: fromName },
    to: toList.map((email) => ({ email })),
    replyTo: params.replyToEmail
      ? { email: params.replyToEmail, name: params.replyToName ?? params.replyToEmail }
      : undefined,
    subject: params.subject,
    htmlContent: params.htmlContent,
  };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`[brevo] notification email failed (${res.status}): ${errorText}`);
  }
}
