import { SetMetadata } from '@nestjs/common';

export const AUDIT_LOG_KEY = 'audit_log';

export interface AuditOptions {
  action: string;
  resource: string;
  includeBody?: boolean;
  includeResult?: boolean;
}

export const AuditLog = (options: AuditOptions) => SetMetadata(AUDIT_LOG_KEY, options);
