import { StorageDriver } from "./types";
import { LocalDiskStorageDriver } from "./local";
import { VercelBlobStorageDriver } from "./vercel-blob";

let storageInstance: StorageDriver | null = null;

export function getStorageDriver(): StorageDriver {
  if (storageInstance) return storageInstance;

  const driverEnv = process.env.STORAGE_DRIVER?.toLowerCase();
  if (driverEnv === "vercel-blob") {
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
