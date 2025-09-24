import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateParticipantDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string | null;

  @IsOptional()
  @IsString()
  avatar?: string | null;

  @IsOptional()
  @IsObject()
  customData?: Record<string, unknown> | null;

  @IsOptional()
  @IsIn(['REGISTERED', 'APPROVED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'])
  status?: 'REGISTERED' | 'APPROVED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkedInAt?: Date | null;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkedOutAt?: Date | null;

  @IsOptional()
  @IsString()
  eventId?: string;
}
