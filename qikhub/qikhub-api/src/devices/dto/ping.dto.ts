import { IsBoolean, IsInt, IsJSON, IsOptional } from 'class-validator';

export class DevicePingDto {
  @IsOptional()
  @IsInt()
  batteryLevel?: number;

  @IsOptional()
  @IsInt()
  signalStrength?: number;

  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;

  @IsOptional()
  @IsJSON()
  healthData?: string; // JSON string
}
