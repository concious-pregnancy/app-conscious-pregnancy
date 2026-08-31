/* eslint-disable no-console -- server-side logging for observability */

interface NotificationEmailParams {
  subject: string;
  htmlContent: string;
  replyToEmail?: string;
  replyToName?: string;
}

export async function sendNotificationEmail(params: NotificationEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_NOTIFY_FROM_EMAIL;
  const fromName = process.env.RESEND_NOTIFY_FROM_NAME ?? "Conscious Pregnancy";
  const toList = (process.env.RESEND_NOTIFY_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey || !fromEmail || toList.length === 0) {
    console.warn("[resend] notification email skipped (missing config)");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: toList,
      reply_to: params.replyToEmail
        ? `${params.replyToName ?? params.replyToEmail} <${params.replyToEmail}>`
        : undefined,
      subject: params.subject,
      html: params.htmlContent,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`[resend] notification email failed (${res.status}): ${errorText}`);
  }
}
