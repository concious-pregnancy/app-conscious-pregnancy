import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_CACHE_TAG } from "@/lib/sanity/client";

// Called by the Sanity publish webhook. Sanity signs each request with the
// webhook's Secret field (same value as SANITY_WEBHOOK_SECRET), so the secret
// never appears in the URL. Expires every cached Sanity fetch and every page
// built from them so the next request renders fresh content.
export async function POST(req: NextRequest) {
  const { isValidSignature } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET);

  // null means no secret configured or no signature header, false means a bad signature.
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidateTag(SANITY_CACHE_TAG, { expire: 0 });
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
