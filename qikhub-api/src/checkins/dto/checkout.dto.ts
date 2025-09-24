import { IsOptional, IsString, IsJSON } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CheckOutDto {
  @ApiProperty({ example: 'participant_123' })
  @IsString()
  participantId!: string;

  @ApiProperty({ example: 'event_456' })
  @IsString()
  eventId!: string;

  @ApiProperty({ example: 'user_789', description: 'Operator performing the check-out' })
  @IsString()
  userId!: string; // operator performing the check-out

  @ApiPropertyOptional({ example: 'device_abc' })
  @IsOptional()
  @IsString()
  deviceId?: string | null;

  @ApiPropertyOptional({ description: 'JSON string with extra context', example: '{"note":"left early"}' })
  @IsOptional()
  @IsJSON()
  metadata?: string; // JSON string
}
