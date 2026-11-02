import { prisma } from "@/lib/prisma";

export type AuditAction = 
  | "LOGIN" 
  | "FAILED_LOGIN" 
  | "LOGOUT" 
  | "CREATE" 
  | "UPDATE" 
  | "DELETE" 
  | "RESTORE" 
  | "PUBLISH" 
  | "UNPUBLISH";

export interface LogAuditParams {
  userId?: string | null;
  userEmail?: string | null;
  action: AuditAction;
  entity: string;
  entityId?: string | null;
  details?: Record<string, unknown> | null;
  ipAddress?: string | null;
}

export async function recordAuditLog(params: LogAuditParams): Promise<void> {
  const timestamp = new Date().toISOString();
  
  // Structured log for server logging
  console.log(`[AUDIT_LOG] ${timestamp} | ${params.action} | ${params.entity}:${params.entityId || "N/A"} | by ${params.userEmail || params.userId || "anonymous"}`);

  try {
    const p = prisma as unknown as { auditLog?: { create: (arg: unknown) => Promise<unknown> } };
    if (p.auditLog && typeof p.auditLog.create === "function") {
      await p.auditLog.create({
        data: {
          userId: params.userId || null,
          action: params.action,
          entity: params.entity,
          entityId: params.entityId || null,
          details: params.details ? JSON.stringify(params.details) : null,
          ipAddress: params.ipAddress || null,
        },
      });
    }
  } catch {
    // Graceful ignore if migration is not yet deployed
  }
}
