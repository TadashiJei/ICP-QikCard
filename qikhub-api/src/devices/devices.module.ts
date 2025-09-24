import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { HeartbeatService } from './heartbeat.service';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService, HeartbeatService],
  exports: [DevicesService],
})
export class DevicesModule {}
