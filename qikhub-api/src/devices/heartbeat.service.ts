import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HeartbeatService {
  private readonly logger = new Logger(HeartbeatService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Every minute, mark devices offline if lastSeen is too old
  @Cron(CronExpression.EVERY_MINUTE)
  async markStaleDevicesOffline() {
    const minutes = Number(process.env.DEVICE_OFFLINE_THRESHOLD_MINUTES ?? 5);
    const thresholdDate = new Date(Date.now() - minutes * 60 * 1000);

    // Only mark devices currently online
    try {
      const result = await this.prisma.qikPointDevice.updateMany({
        where: {
          isOnline: true,
          lastSeen: { lt: thresholdDate },
        },
        data: { isOnline: false },
      });

      if (result.count > 0) {
        this.logger.log(`Marked ${result.count} device(s) offline (stale heartbeat)`);
      }
    } catch (e) {
      this.logger.error('Failed to mark stale devices offline', e as any);
    }
  }
}
