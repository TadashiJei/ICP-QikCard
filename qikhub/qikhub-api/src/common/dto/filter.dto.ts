import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class BaseFilterDto {
  @ApiPropertyOptional({ description: 'Search term for text fields' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Sort field' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'], description: 'Sort order' })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}

export class UserFilterDto extends BaseFilterDto {
  @ApiPropertyOptional({ enum: ['USER', 'ORGANIZER', 'ADMIN'], description: 'User role filter' })
  @IsOptional()
  @IsEnum(['USER', 'ORGANIZER', 'ADMIN'])
  role?: 'USER' | 'ORGANIZER' | 'ADMIN';

  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isActive?: boolean;
}

export class EventFilterDto extends BaseFilterDto {
  @ApiPropertyOptional({ enum: ['DRAFT', 'ACTIVE', 'ONGOING', 'COMPLETED', 'CANCELLED'], description: 'Event status filter' })
  @IsOptional()
  @IsEnum(['DRAFT', 'ACTIVE', 'ONGOING', 'COMPLETED', 'CANCELLED'])
  status?: 'DRAFT' | 'ACTIVE' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

  @ApiPropertyOptional({ description: 'Filter by organizer ID' })
  @IsOptional()
  @IsString()
  organizerId?: string;

  @ApiPropertyOptional({ description: 'Filter events starting from this date (ISO string)' })
  @IsOptional()
  @IsString()
  startDateFrom?: string;

  @ApiPropertyOptional({ description: 'Filter events starting until this date (ISO string)' })
  @IsOptional()
  @IsString()
  startDateTo?: string;
}

export class ParticipantFilterDto extends BaseFilterDto {
  @ApiPropertyOptional({ description: 'Filter by event ID' })
  @IsOptional()
  @IsString()
  eventId?: string;

  @ApiPropertyOptional({ enum: ['REGISTERED', 'APPROVED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'], description: 'Participant status filter' })
  @IsOptional()
  @IsEnum(['REGISTERED', 'APPROVED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'])
  status?: 'REGISTERED' | 'APPROVED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
}
