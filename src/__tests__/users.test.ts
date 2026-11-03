import { beforeEach, describe, expect, it, vi } from "vitest";
import { Role } from "@prisma/client";
import { requirePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUserAction } from "@/server/users";

vi.mock("@/lib/auth", () => ({
  requirePermission: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      count: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock("@/server/audit", () => ({
  recordAuditLog: vi.fn(),
}));

describe("User management safeguards", () => {
  beforeEach(() => {
    vi.mocked(requirePermission).mockReset().mockResolvedValue({
      userId: "admin-2",
      email: "admin2@upitra.ac.id",
      name: "Admin 2",
      role: Role.SUPERADMIN,
      exp: Math.floor(Date.now() / 1000) + 60,
    });
    vi.mocked(prisma.user.findUnique).mockReset();
    vi.mocked(prisma.user.count).mockReset();
    vi.mocked(prisma.user.update).mockReset();
  });

  it("prevents disabling the last active superadmin", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: "admin-1",
      role: Role.SUPERADMIN,
      isActive: true,
    } as never);
    vi.mocked(prisma.user.count).mockResolvedValue(1);

    const result = await saveUserAction("admin-1", {
      name: "Admin Utama",
      email: "admin@upitra.ac.id",
      role: Role.SUPERADMIN,
      isActive: false,
      password: "",
    });

    expect(result.ok).toBe(false);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });
});
