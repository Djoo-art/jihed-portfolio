import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

// NOTE: Using a server-proxy upload instead of the documented client-token
// flow (@vercel/blob/client + handleUpload) because Vercel currently has a
// confirmed platform bug where the client-upload endpoint (vercel.com/api/blob)
// returns a CORS error with no Access-Control-Allow-Origin header, blocking
// the browser's direct upload entirely. See:
// https://community.vercel.com/t/vercel-blob-client-upload-blocked-by-cors-access-control-allow-origin-missing/46967
//
// Trade-off: this caps uploads at ~4.5MB (Vercel serverless function body
// limit), since the file now passes through our server instead of going
// straight from the browser to Blob storage. Fine for photos; a real video
// file may exceed this — revisit once Vercel fixes the client-upload bug.

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}