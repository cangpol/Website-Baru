import { describe, it, expect } from "vitest";
import { sanitizeRichText } from "@/lib/sanitize";

describe("sanitizeRichText - XSS Prevention", () => {
  it("removes dangerous <script> tags completely", () => {
    const input = '<p>Artikel berita</p><script>alert("xss")</script>';
    const output = sanitizeRichText(input);
    expect(output).not.toContain("<script>");
    expect(output).not.toContain("alert");
    expect(output).toContain("<p>Artikel berita</p>");
  });

  it("strips event handlers like onerror from <img> tags", () => {
    const input = '<img src="/images/hero.jpg" onerror="alert(document.cookie)" alt="Hero" />';
    const output = sanitizeRichText(input);
    expect(output).not.toContain("onerror");
    expect(output).not.toContain("alert");
    expect(output).toContain('src="/images/hero.jpg"');
    expect(output).toContain('alt="Hero"');
  });

  it("strips javascript: pseudo-protocol in href links", () => {
    const input = '<a href="javascript:alert(1)">Klik Di Sini</a>';
    const output = sanitizeRichText(input);
    expect(output).not.toContain("javascript:");
    expect(output).not.toContain("alert");
  });

  it("enforces rel='noopener noreferrer' on external hyperlinks", () => {
    const input = '<a href="https://example.com" target="_blank">External Link</a>';
    const output = sanitizeRichText(input);
    expect(output).toContain('rel="noopener noreferrer"');
  });

  it("preserves safe semantic rich text markup", () => {
    const input = '<h2>Judul</h2><p>Paragraf <strong>tebal</strong> dan <em>miring</em>.</p>';
    const output = sanitizeRichText(input);
    expect(output).toBe('<h2>Judul</h2><p>Paragraf <strong>tebal</strong> dan <em>miring</em>.</p>');
  });
});
