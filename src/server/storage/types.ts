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
