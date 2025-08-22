import { IsOptional, IsString, IsJSON } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCheckInDto {
  @ApiProperty({ example: 'participant_123' })
  @IsString()
  participantId!: string;

  @ApiProperty({ example: 'event_456' })
  @IsString()
  eventId!: string;

  @ApiProperty({ example: 'user_789', description: 'Operator performing the check-in' })
  @IsString()
  userId!: string; // operator performing the check-in

  @ApiPropertyOptional({ example: 'device_abc' })
  @IsOptional()
  @IsString()
  deviceId?: string | null;

  @ApiPropertyOptional({ description: 'JSON string with extra context', example: '{"source":"kiosk"}' })
  @IsOptional()
  @IsJSON()
  metadata?: string; // JSON string
}
