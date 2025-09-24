import { IsBoolean, IsInt, IsJSON, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class DevicePingDto {
  @ApiPropertyOptional({ example: 85, minimum: 0, maximum: 100 })
  @IsOptional()
  @IsInt()
  batteryLevel?: number;

  @ApiPropertyOptional({ example: 72 })
  @IsOptional()
  @IsInt()
  signalStrength?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;

  @ApiPropertyOptional({ description: 'Arbitrary JSON string with health metrics', example: '{"temp":36.6}' })
  @IsOptional()
  @IsJSON()
  healthData?: string; // JSON string
}
