import { IsBoolean, IsIn, IsJSON, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsString()
  message!: string;

  @IsIn(['INFO', 'WARNING', 'ERROR', 'SUCCESS'])
  type!: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';

  @IsString()
  userId!: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsJSON()
  metadata?: string; // JSON string
}
