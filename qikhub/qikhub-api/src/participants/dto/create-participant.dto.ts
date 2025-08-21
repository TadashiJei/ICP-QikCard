import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsEmail()
  @MaxLength(255)
  email!: string;

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
  @IsEnum(['REGISTERED', 'APPROVED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'] as const)
  status?: 'REGISTERED' | 'APPROVED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkedInAt?: Date | null;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkedOutAt?: Date | null;

  @IsString()
  eventId!: string;
}
