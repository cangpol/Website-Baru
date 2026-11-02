import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { StorageDriver, StorageFileResult } from "./types";

export class LocalDiskStorageDriver implements StorageDriver {
  name = "local";
  private uploadsDir: string;

  constructor() {
    this.uploadsDir = path.join(process.cwd(), "uploads");
    if (!fsSync.existsSync(this.uploadsDir)) {
      fsSync.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async saveFile(buffer: Buffer, filename: string, mimeType: string): Promise<StorageFileResult> {
    const filePath = path.join(this.uploadsDir, filename);
    await fs.writeFile(filePath, buffer);
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
