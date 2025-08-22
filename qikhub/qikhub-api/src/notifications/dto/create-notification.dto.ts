import { IsBoolean, IsIn, IsJSON, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ example: 'Device online', maxLength: 255 })
  @IsString()
  @MaxLength(255)
  title!: string;

  @ApiProperty({ example: 'Device ABC123 is now online' })
  @IsString()
  message!: string;

  @ApiProperty({ enum: ['INFO', 'WARNING', 'ERROR', 'SUCCESS'], example: 'INFO' })
  @IsIn(['INFO', 'WARNING', 'ERROR', 'SUCCESS'])
  type!: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';

  @ApiProperty({ example: 'user_123' })
  @IsString()
  userId!: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiPropertyOptional({ description: 'Optional JSON string for extra context', example: '{"k":"v"}' })
  @IsOptional()
  @IsJSON()
  metadata?: string; // JSON string
}
