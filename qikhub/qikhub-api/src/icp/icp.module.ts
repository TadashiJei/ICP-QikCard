import { Module } from '@nestjs/common';
import { IcpService } from './icp.service';

@Module({
  providers: [IcpService],
  exports: [IcpService],
})
export class IcpModule {}
