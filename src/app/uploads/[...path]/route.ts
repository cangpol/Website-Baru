import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const pathSegments = params.path || [];

    if (pathSegments.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Sanitize path segments to prevent directory traversal
    const safeFilename = path.basename(pathSegments.join("/"));
    const uploadsDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadsDir, safeFilename);

    // Verify file exists
    if (!fsSync.existsSync(filePath)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Determine extension and mime type
    const ext = path.extname(safeFilename).toLowerCase();
    const contentType = MIME_MAP[ext] || "application/octet-stream";

    // Read file buffer
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `inline; filename="${safeFilename}"`,
      },
    });
  } catch (err) {
    console.error("Error serving uploaded file:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
