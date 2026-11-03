import path from "path";
import { getStorageDriver } from "./index";

/**
 * Menghapus berkas dari storage (local / uploads atau Vercel Blob)
 * Melindungi aset statis default (/images/, dll) agar tidak terhapus.
 */
export async function deleteUploadedFile(fileUrl?: string | null): Promise<boolean> {
  if (!fileUrl || typeof fileUrl !== "string") return false;

  // Jangan pernah menghapus gambar statis bawaan template
  if (
    fileUrl.startsWith("/images/") || 
    fileUrl.startsWith("/logo") || 
    fileUrl.startsWith("/favicon") ||
    fileUrl.startsWith("/icons/")
  ) {
    return false;
  }

  try {
    const driver = getStorageDriver();
    if (fileUrl.startsWith("/uploads/")) {
      const filename = path.basename(fileUrl);
      return await driver.deleteFile(filename);
    } else if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
      return await driver.deleteFile(fileUrl);
    }
    return false;
  } catch (err) {
    console.warn(`Gagal menghapus berkas penyimpanan ${fileUrl}:`, err);
    return false;
  }
}

