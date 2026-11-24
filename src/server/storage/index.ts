import { StorageDriver } from "./types";
import { LocalDiskStorageDriver } from "./local";
import { VercelBlobStorageDriver } from "./vercel-blob";

let storageInstance: StorageDriver | null = null;

export function getStorageDriver(): StorageDriver {
  if (storageInstance) return storageInstance;

  const driverEnv = process.env.STORAGE_DRIVER?.toLowerCase();
  // Otomatis memakai Vercel Blob bila tokennya tersedia (store Blob terhubung ke project).
  if (driverEnv === "vercel-blob" || (!driverEnv && process.env.BLOB_READ_WRITE_TOKEN)) {
    storageInstance = new VercelBlobStorageDriver();
  } else {
    storageInstance = new LocalDiskStorageDriver();
  }

  return storageInstance;
}

export * from "./types";
export * from "./local";
export * from "./vercel-blob";
export * from "./cleanup";
