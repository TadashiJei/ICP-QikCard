import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WsGateway } from './ws/ws.gateway';
import { EventsModule } from './events/events.module';
import { IcpModule } from './icp/icp.module';
import { UsersModule } from './users/users.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EventsModule,
    IcpModule,
    UsersModule,
    ParticipantsModule,
  ],
  controllers: [AppController],
  providers: [AppService, WsGateway],
})
export class AppModule {}
