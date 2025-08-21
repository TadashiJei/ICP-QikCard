import { IsOptional, IsString, IsJSON } from 'class-validator';

export class CreateCheckInDto {
  @IsString()
  participantId!: string;

  @IsString()
  eventId!: string;

  @IsString()
  userId!: string; // operator performing the check-in

  @IsOptional()
  @IsString()
  deviceId?: string | null;

  @IsOptional()
  @IsJSON()
  metadata?: string; // JSON string
}
