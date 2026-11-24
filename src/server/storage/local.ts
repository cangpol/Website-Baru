import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { StorageDriver, StorageFileResult, StorageUnavailableError } from "./types";

export class LocalDiskStorageDriver implements StorageDriver {
  name = "local";
  private uploadsDir: string;

  constructor() {
    this.uploadsDir = path.join(process.cwd(), "uploads");
  }

  async saveFile(buffer: Buffer, filename: string, mimeType: string): Promise<StorageFileResult> {
    const filePath = path.join(this.uploadsDir, filename);
    try {
      if (!fsSync.existsSync(this.uploadsDir)) {
        fsSync.mkdirSync(this.uploadsDir, { recursive: true });
      }
      await fs.writeFile(filePath, buffer);
    } catch (err) {
      const code = (err as NodeJS.ErrnoException)?.code;
      if (code === "EROFS" || code === "EACCES" || code === "EPERM" || code === "ENOENT") {
        throw new StorageUnavailableError(
          "Penyimpanan berkas belum dikonfigurasi di server ini. Hubungkan Vercel Blob (BLOB_READ_WRITE_TOKEN) agar unggahan dapat disimpan."
        );
      }
      throw err;
    }
    return {
      url: `/uploads/${filename}`,
      path: filename,
      size: buffer.length,
      mimeType,
    };
  }

  async deleteFile(filename: string): Promise<boolean> {
    try {
      const sanitizedName = path.basename(filename);
      const filePath = path.join(this.uploadsDir, sanitizedName);
      await fs.unlink(filePath);
      return true;
    } catch (err) {
      console.error(`Failed to delete local file ${filename}:`, err);
      return false;
    }
  }

  getFileUrl(filename: string): string {
    const sanitizedName = path.basename(filename);
    return `/uploads/${sanitizedName}`;
  }
}
