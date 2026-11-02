import { describe, it, expect, beforeEach } from "vitest";
import { signSessionToken, verifySessionToken } from "@/lib/auth";
import { Role } from "@prisma/client";

describe("Auth Token & Session Verification", () => {
  beforeEach(() => {
    process.env.ADMIN_SESSION_SECRET = "test-secret-key-that-is-at-least-32-chars-long";
  });

  it("signs and verifies a valid session token", () => {
    const raw = {
      userId: "user-123",
      email: "admin@upitra.ac.id",
      name: "Admin UPITRA",
      role: Role.SUPERADMIN,
    };

    const token = signSessionToken(raw);
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(2);

    const verified = verifySessionToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.userId).toBe(raw.userId);
    expect(verified?.email).toBe(raw.email);
    expect(verified?.role).toBe(Role.SUPERADMIN);
  });

  it("rejects token with tampered signature", () => {
    const raw = {
      userId: "user-attacker",
      email: "attacker@fake.com",
      name: "Attacker",
      role: Role.SUPERADMIN,
    };

    const token = signSessionToken(raw);
    const [payloadB64, signature] = token.split(".");
    // Tamper with one character of the signature
    const tamperedSignature = signature.slice(0, -1) + (signature.slice(-1) === "a" ? "b" : "a");
    const tamperedToken = `${payloadB64}.${tamperedSignature}`;

    const verified = verifySessionToken(tamperedToken);
    expect(verified).toBeNull();
  });

  it("rejects token with tampered payload", () => {
    const raw = {
      userId: "user-1",
      email: "writer@upitra.ac.id",
      name: "Writer",
      role: Role.CONTENT_WRITER,
    };

    const token = signSessionToken(raw);
    const [, signature] = token.split(".");

    // Forging a different payload
    const forgedPayload = Buffer.from(
      JSON.stringify({
        userId: "user-1",
        email: "writer@upitra.ac.id",
        name: "Writer",
        role: Role.SUPERADMIN, // Privilege escalation attempt
        exp: Math.floor(Date.now() / 1000) + 3600,
      })
    ).toString("base64url");

    const forgedToken = `${forgedPayload}.${signature}`;
    const verified = verifySessionToken(forgedToken);
    expect(verified).toBeNull();
  });

  it("rejects malformed token strings", () => {
    expect(verifySessionToken("")).toBeNull();
    expect(verifySessionToken("just-a-string")).toBeNull();
    expect(verifySessionToken("a.b.c")).toBeNull();
    expect(verifySessionToken("invalidBase64.invalidSig")).toBeNull();
  });
});

