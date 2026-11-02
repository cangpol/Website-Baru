import { describe, it, expect } from "vitest";
import { validateAndSanitizeFile } from "@/server/storage/magic-bytes";

describe("validateAndSanitizeFile - Upload Security & MIME Validation", () => {
  it("rejects SVG files containing <svg or XML headers", async () => {
    const svgBuffer = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><circle r="10"/></svg>');
    const res = await validateAndSanitizeFile(svgBuffer, "exploit.svg");
    expect(res.valid).toBe(false);
    expect(res.error).toContain("SVG, HTML, dan script executable ditolak");
  });

  it("rejects HTML files disguised as images", async () => {
    const htmlBuffer = Buffer.from("<!DOCTYPE html><html><body><h1>Safe Test</h1></body></html>");
    const res = await validateAndSanitizeFile(htmlBuffer, "fake.jpg");
    expect(res.valid).toBe(false);
  });

  it("rejects PHP scripts disguised as images or documents", async () => {
    const phpBuffer = Buffer.from("<?php echo 'test'; ?>");
    const res = await validateAndSanitizeFile(phpBuffer, "safe-test.php");
    expect(res.valid).toBe(false);
    expect(res.error).toContain("ditolak demi keamanan");
  });

  it("rejects arbitrary plain text disguised as JPG", async () => {
    const fakeJpg = Buffer.from("This is a plain text file masquerading as a JPEG image file.");
    const res = await validateAndSanitizeFile(fakeJpg, "masquerade.jpg");
    expect(res.valid).toBe(false);
    expect(res.error).toContain("Tipe berkas tidak dikenali atau tidak diizinkan");
  });

  it("validates a genuine PDF header (%PDF-)", async () => {
    const pdfBuffer = Buffer.concat([
      Buffer.from("%PDF-1.4\n%test\n"),
      Buffer.alloc(200, 0x20),
      Buffer.from("%%EOF\n"),
    ]);
    const res = await validateAndSanitizeFile(pdfBuffer, "document.pdf");
    expect(res.valid).toBe(true);
    expect(res.mime).toBe("application/pdf");
    expect(res.ext).toBe("pdf");
    expect(res.isImage).toBe(false);
  });

  it("validates a minimal 1x1 valid PNG image", async () => {
    // 1x1 transparent PNG binary bytes
    const pngBuffer = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64"
    );
    const res = await validateAndSanitizeFile(pngBuffer, "pixel.png");
    expect(res.valid).toBe(true);
    expect(res.mime).toBe("image/png");
    expect(res.ext).toBe("png");
    expect(res.width).toBe(1);
    expect(res.height).toBe(1);
    expect(res.isImage).toBe(true);
  });
});

