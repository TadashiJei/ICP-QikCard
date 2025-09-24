import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WsGateway } from './ws/ws.gateway';
import { EventsModule } from './events/events.module';
import { IcpModule } from './icp/icp.module';
import { UsersModule } from './users/users.module';
import { ParticipantsModule } from './participants/participants.module';
import { DevicesModule } from './devices/devices.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CheckinsModule } from './checkins/checkins.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Basic app-wide rate limiting (can be overridden per-route with @Throttle)
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 60,
      },
    ]),
    // Scheduling for background heartbeats
    ScheduleModule.forRoot(),
    PrismaModule,
    EventsModule,
    IcpModule,
    UsersModule,
    ParticipantsModule,
    DevicesModule,
    NotificationsModule,
    CheckinsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    WsGateway,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
