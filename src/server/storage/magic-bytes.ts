import sharp from "sharp";

export interface MagicBytesValidationResult {
  valid: boolean;
  mime?: string;
  ext?: string;
  error?: string;
  isImage: boolean;
  width?: number;
  height?: number;
  sanitizedBuffer?: Buffer;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_DOC_SIZE = 20 * 1024 * 1024; // 20 MB

export async function validateAndSanitizeFile(
  buffer: Buffer,
  originalFilename: string
): Promise<MagicBytesValidationResult> {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: "File buffer kosong.", isImage: false };
  }

  // Check magic bytes
  // 1. JPEG: FF D8 FF
  const isJpeg =
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff;

  // 2. PNG: 89 50 4E 47 0D 0A 1A 0A
  const isPng =
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a;

  // 3. WebP: RIFF .... WEBP
  const isWebp =
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50;

  // 4. GIF: GIF87a or GIF89a
  const isGif =
    buffer.length >= 6 &&
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38 &&
    (buffer[4] === 0x37 || buffer[4] === 0x39) &&
    buffer[5] === 0x61;

  // 5. PDF: %PDF (25 50 44 46)
  const isPdf =
    buffer.length >= 4 &&
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46;

  // Disallow SVG explicitly (SVG can contain <script> or event handlers)
  const lowerName = originalFilename.toLowerCase();
  if (lowerName.endsWith(".svg") || lowerName.endsWith(".html") || lowerName.endsWith(".php")) {
    return {
      valid: false,
      error: "Format berkas tidak diizinkan. SVG, HTML, dan script executable ditolak demi keamanan.",
      isImage: false,
    };
  }

  // Also inspect start of buffer for text/xml/html/php markers
  const headStr = buffer.slice(0, 512).toString("utf-8").toLowerCase();
  if (
    headStr.includes("<svg") ||
    headStr.includes("<?xml") ||
    headStr.includes("<!doctype html") ||
    headStr.includes("<html") ||
    headStr.includes("<?php") ||
    headStr.includes("<script")
  ) {
    return {
      valid: false,
      error: "Isi berkas terdeteksi mengandung format dokumen berbasis web atau script yang tidak aman.",
      isImage: false,
    };
  }

  if (isJpeg || isPng || isWebp || isGif) {
    if (buffer.length > MAX_IMAGE_SIZE) {
      return {
        valid: false,
        error: `Ukuran gambar melebihi batas maksimum 5 MB (${(buffer.length / (1024 * 1024)).toFixed(2)} MB).`,
        isImage: true,
      };
    }

    try {
      const sharpInstance = sharp(buffer);
      const metadata = await sharpInstance.metadata();

      if (!metadata.format || !metadata.width || !metadata.height) {
        return {
          valid: false,
          error: "Berkas gambar tidak valid atau rusak.",
          isImage: true,
        };
      }

      // Determine mime and ext
      let mime = "image/jpeg";
      let ext = "jpg";
      if (isPng) {
        mime = "image/png";
        ext = "png";
      } else if (isWebp) {
        mime = "image/webp";
        ext = "webp";
      } else if (isGif) {
        mime = "image/gif";
        ext = "gif";
      }

      // Re-encode to strip EXIF and normalize
      let sanitizedBuffer: Buffer;
      if (isJpeg) {
        sanitizedBuffer = await sharp(buffer).rotate().jpeg({ quality: 85, mozjpeg: true }).toBuffer();
      } else if (isPng) {
        sanitizedBuffer = await sharp(buffer).rotate().png({ compressionLevel: 8 }).toBuffer();
      } else if (isWebp) {
        sanitizedBuffer = await sharp(buffer).rotate().webp({ quality: 85 }).toBuffer();
      } else {
        // GIF
        sanitizedBuffer = buffer;
      }

      return {
        valid: true,
        mime,
        ext,
        isImage: true,
        width: metadata.width,
        height: metadata.height,
        sanitizedBuffer,
      };
    } catch (err) {
      return {
        valid: false,
        error: `Gagal memproses gambar: ${err instanceof Error ? err.message : "Data biner rusak."}`,
        isImage: true,
      };
    }
  }

  if (isPdf) {
    if (buffer.length > MAX_DOC_SIZE) {
      return {
        valid: false,
        error: `Ukuran dokumen melebihi batas maksimum 20 MB (${(buffer.length / (1024 * 1024)).toFixed(2)} MB).`,
        isImage: false,
      };
    }

    return {
      valid: true,
      mime: "application/pdf",
      ext: "pdf",
      isImage: false,
      sanitizedBuffer: buffer,
    };
  }

  return {
    valid: false,
    error: "Tipe berkas tidak dikenali atau tidak diizinkan. Hanya menerima format JPEG, PNG, WebP, GIF, dan PDF.",
    isImage: false,
  };
}
