import { StorageDriver, StorageFileResult } from "./types";

export class VercelBlobStorageDriver implements StorageDriver {
  name = "vercel-blob";

  async saveFile(buffer: Buffer, filename: string, mimeType: string): Promise<StorageFileResult> {
    try {
      // Dynamic import to avoid runtime crash if @vercel/blob is not configured or in local dev
      const { put } = await import("@vercel/blob");
      const blob = await put(filename, buffer, {
        access: "public",
        contentType: mimeType,
      });

      return {
        url: blob.url,
        path: blob.pathname,
        size: buffer.length,
        mimeType,
      };
    } catch (err) {
      console.error("Vercel Blob upload failed:", err);
      throw new Error(`Gagal mengunggah berkas ke Vercel Blob: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async deleteFile(urlOrPath: string): Promise<boolean> {
    try {
      const { del } = await import("@vercel/blob");
      await del(urlOrPath);
      return true;
    } catch (err) {
      console.error("Vercel Blob delete failed:", err);
      return false;
    }
  }

  getFileUrl(urlOrPath: string): string {
    return urlOrPath;
  }
}

