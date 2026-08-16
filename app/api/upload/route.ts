import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (/* pathname */) => {
        // TODO: once admin auth (Step 4) exists, verify the session cookie here
        // and throw if it's missing/invalid — otherwise anyone who finds this
        // URL can upload directly to your Blob store.
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "video/mp4",
            "video/quicktime",
            "application/vnd.android.package-archive", // .apk
          ],
          maximumSizeInBytes: 200 * 1024 * 1024, // 200MB — plenty for a demo video
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Fires after the file actually lands in Blob storage.
        // Note: this webhook only fires on a deployed (public) URL, not on
        // localhost — Vercel can't reach your machine to call it back.
        console.log("blob upload completed:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}