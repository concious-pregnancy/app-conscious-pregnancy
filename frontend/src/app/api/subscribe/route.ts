import { NextResponse, type NextRequest } from "next/server";
import { sendNotificationEmail, upsertContact } from "@/lib/brevo";

interface SubscribePayload {
  source: "footer";
  email: string;
}

function isValid(body: unknown): body is SubscribePayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return b.source === "footer" && typeof b.email === "string" && /.+@.+\..+/.test(b.email);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValid(json)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const result = await upsertContact({
      email: json.email,
      attributes: { SOURCE: json.source },
    });

    if (result.created) {
      const safeEmail = escapeHtml(json.email);
      await sendNotificationEmail({
        subject: `New Conscious Pregnancy subscriber: ${json.email}`,
        replyToEmail: json.email,
        htmlContent: `
          <p>Someone just subscribed via the footer.</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <hr>
          <p style="color:#666;font-size:12px">Hit Reply to respond directly.</p>
        `,
      });
    }

    return NextResponse.json({ ok: true, created: result.created });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
