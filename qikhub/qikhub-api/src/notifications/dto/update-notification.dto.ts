import { IsBoolean, IsIn, IsJSON, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsIn(['INFO', 'WARNING', 'ERROR', 'SUCCESS'])
  type?: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsJSON()
  metadata?: string; // JSON string
}
