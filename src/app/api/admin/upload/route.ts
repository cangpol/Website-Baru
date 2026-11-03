import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { getStorageDriver } from "@/server/storage";
import {
  MAX_UPLOAD_FILE_SIZE_BYTES,
  validateAndSanitizeFile,
} from "@/server/storage/magic-bytes";
import { recordAuditLog } from "@/server/audit";

const MAX_UPLOAD_REQUEST_SIZE_BYTES = MAX_UPLOAD_FILE_SIZE_BYTES + 64 * 1024;

export async function POST(request: NextRequest) {
  try {
    const session = await requirePermission("media", "create");

    const contentLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_UPLOAD_REQUEST_SIZE_BYTES) {
      return NextResponse.json(
        { ok: false, message: "Ukuran permintaan unggah melebihi batas maksimum." },
        { status: 413 }
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { ok: false, message: "Data unggahan tidak valid." },
        { status: 400 }
      );
    }

    const fileEntry = formData.get("file");
    const altTextEntry = formData.get("altText");
    const altText = typeof altTextEntry === "string" ? altTextEntry : "";

    if (!(fileEntry instanceof File)) {
      return NextResponse.json(
        { ok: false, message: "Tidak ada berkas yang diunggah." },
        { status: 400 }
      );
    }

    const file = fileEntry;
    if (file.size > MAX_UPLOAD_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { ok: false, message: "Ukuran berkas melebihi batas maksimum 20 MB." },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuffer);

    // Validate magic bytes & sanitize
    const validation = await validateAndSanitizeFile(rawBuffer, file.name);
    if (!validation.valid || !validation.sanitizedBuffer || !validation.mime || !validation.ext) {
      return NextResponse.json(
        { ok: false, message: validation.error || "Berkas tidak valid." },
        { status: 400 }
      );
    }

    // Generate random secure filename (never use original filename on disk/cloud)
    const randomUUID = crypto.randomUUID();
    const secureFilename = `${randomUUID}.${validation.ext}`;

    // Save using configured storage driver
    const storageDriver = getStorageDriver();
    const stored = await storageDriver.saveFile(
      validation.sanitizedBuffer,
      secureFilename,
      validation.mime
    );

    // Record in database MediaAsset
    let mediaAsset;
    try {
      mediaAsset = await prisma.mediaAsset.create({
        data: {
          filename: file.name.slice(0, 255), // original name stored as reference metadata only
          path: stored.url, // accessible URL path
          mimeType: validation.mime,
          size: stored.size,
          width: validation.width || null,
          height: validation.height || null,
          altText: altText.slice(0, 500) || file.name.slice(0, 100),
          uploadedById: session.userId,
        },
      });
    } catch (error) {
      const deleted = await storageDriver.deleteFile(stored.url);
      if (!deleted) {
        console.error("Failed to clean up uploaded file after database error:", stored.url);
      }
      throw error;
    }

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPLOAD",
      entity: "MediaAsset",
      entityId: mediaAsset.id,
      details: JSON.stringify({
        filename: file.name,
        storedPath: stored.url,
        mime: validation.mime,
        size: stored.size,
      }),
    });

    return NextResponse.json({
      ok: true,
      message: "Berkas berhasil diunggah.",
      data: {
        id: mediaAsset.id,
        url: mediaAsset.path,
        filename: mediaAsset.filename,
        mimeType: mediaAsset.mimeType,
        size: mediaAsset.size,
        width: mediaAsset.width,
        height: mediaAsset.height,
        altText: mediaAsset.altText,
      },
    });
  } catch (err) {
    console.error("Upload API error:", err);
    const message = err instanceof Error ? err.message : "Terjadi kesalahan internal saat mengunggah.";
    const status = /harus login/i.test(message)
      ? 401
      : /hak akses|tidak memiliki izin/i.test(message)
        ? 403
        : 500;
    return NextResponse.json(
      {
        ok: false,
        message: status === 500 ? "Terjadi kesalahan internal saat mengunggah." : message,
      },
      { status }
    );
  }
}
