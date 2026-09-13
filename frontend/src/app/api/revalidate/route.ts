import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { SANITY_CACHE_TAG } from "@/lib/sanity/client";

// Called by the Sanity publish webhook. Expires every cached Sanity fetch and
// every page built from them so the next request renders fresh content.
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_WEBHOOK_SECRET || secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag(SANITY_CACHE_TAG, { expire: 0 });
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
