import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxAttendees?: number;

  @IsOptional()
  @IsString()
  status?: 'DRAFT' | 'ACTIVE' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

  @IsOptional()
  @IsString()
  venueName?: string;

  @IsOptional()
  @IsString()
  venueAddress?: string;

  @IsOptional()
  @IsNumber()
  venueLat?: number | null;

  @IsOptional()
  @IsNumber()
  venueLng?: number | null;

  @IsOptional()
  @IsBoolean()
  wifiAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  registrationOpen?: boolean;

  @IsOptional()
  @IsBoolean()
  requireApproval?: boolean;

  @IsOptional()
  @IsObject()
  customFields?: Record<string, unknown> | null;

  @IsOptional()
  @IsString()
  organizerId?: string;
}
