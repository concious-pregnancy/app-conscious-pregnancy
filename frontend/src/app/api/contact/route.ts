import { NextResponse, type NextRequest } from "next/server";
import { sendNotificationEmail, upsertContact } from "@/lib/brevo";

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  stage?: string[];
  message?: string;
}

function isValid(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b.lastName === "string" &&
    typeof b.email === "string" &&
    /.+@.+\..+/.test(b.email) &&
    (b.phone === undefined || typeof b.phone === "string") &&
    (b.stage === undefined ||
      (Array.isArray(b.stage) && b.stage.every((s) => typeof s === "string"))) &&
    (b.message === undefined || typeof b.message === "string")
  );
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
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const stageList = (json.stage ?? []).join(", ");
  const trimmedMessage = (json.message ?? "").slice(0, 1500);

  // Brevo SMS attribute requires 00-prefixed international format (matches eyeboga pattern).
  const smsValue = json.phone ? json.phone.replace(/^\+/, "00") : "";

  const attributes: Record<string, string> = {
    FIRSTNAME: json.firstName,
    LASTNAME: json.lastName,
    SOURCE: "homepage_contact",
  };
  if (smsValue) attributes.SMS = smsValue;
  if (stageList) attributes.STAGE = stageList;
  if (trimmedMessage) attributes.MESSAGE = trimmedMessage;

  try {
    const result = await upsertContact({
      email: json.email,
      attributes,
    });

    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br>");
    const detailRows = [
      `<strong>Name:</strong> ${escapeHtml(json.firstName)} ${escapeHtml(json.lastName)}`,
      `<strong>Email:</strong> ${escapeHtml(json.email)}`,
      json.phone ? `<strong>Phone:</strong> ${escapeHtml(json.phone)}` : null,
      stageList ? `<strong>Where they are:</strong> ${escapeHtml(stageList)}` : null,
    ]
      .filter(Boolean)
      .join("<br>");

    await sendNotificationEmail({
      subject: `New Conscious Pregnancy enquiry from ${json.firstName} ${json.lastName}`,
      replyToEmail: json.email,
      replyToName: `${json.firstName} ${json.lastName}`,
      htmlContent: `
        <p>New enquiry just landed on consciouspregnancy.care.</p>
        <p>${detailRows}</p>
        <p><strong>Message:</strong><br>${safeMessage || "<em>(none)</em>"}</p>
        <hr>
        <p style="color:#666;font-size:12px">Hit Reply to respond directly to ${escapeHtml(json.firstName)}.</p>
      `,
    });

    return NextResponse.json({ ok: true, created: result.created });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
