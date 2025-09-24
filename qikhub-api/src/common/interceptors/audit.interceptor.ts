import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AUDIT_LOG_KEY, AuditOptions } from '../decorators/audit.decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditInterceptor.name);

  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditOptions = this.reflector.get<AuditOptions>(
      AUDIT_LOG_KEY,
      context.getHandler(),
    );

    if (!auditOptions) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || 'Unknown';
    const userId = request.user?.id || 'Anonymous';

    const auditData = {
      timestamp: new Date().toISOString(),
      userId,
      action: auditOptions.action,
      resource: auditOptions.resource,
      method,
      url,
      ip,
      userAgent,
      ...(auditOptions.includeBody && { body: request.body }),
    };

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: (result) => {
          const duration = Date.now() - startTime;
          const logData = {
            ...auditData,
            status: 'success',
            duration,
            ...(auditOptions.includeResult && { result }),
          };
          
          this.logger.log(`AUDIT: ${JSON.stringify(logData)}`);
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const logData = {
            ...auditData,
            status: 'error',
            duration,
            error: error.message,
          };
          
          this.logger.error(`AUDIT: ${JSON.stringify(logData)}`);
        },
      }),
    );
  }
}
