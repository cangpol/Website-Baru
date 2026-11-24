export interface StorageFileResult {
  url: string;
  path: string;
  size: number;
  mimeType: string;
}

export interface StorageDriver {
  name: string;
  saveFile(buffer: Buffer, filename: string, mimeType: string): Promise<StorageFileResult>;
  deleteFile(path: string): Promise<boolean>;
  getFileUrl(path: string): string;
}


// Dilempar saat penyimpanan berkas tidak bisa dipakai di server ini (mis. disk read-only di Vercel).
export class StorageUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageUnavailableError";
  }
}
