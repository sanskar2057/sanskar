import { NextResponse } from "next/server";
import { FALLBACK_RESUME_URL } from "@/lib/resume-constants";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const debug = requestUrl.searchParams.get("debug") === "1";

  if (debug) {
    return NextResponse.json({
      ok: true,
      note: "Public resume downloads are resolved in the browser from Firestore and Cloudinary.",
      fallback: FALLBACK_RESUME_URL,
    });
  }

  return NextResponse.redirect(new URL(FALLBACK_RESUME_URL, request.url));
}
