import { IsOptional, IsString, IsJSON } from 'class-validator';

export class CheckOutDto {
  @IsString()
  participantId!: string;

  @IsString()
  eventId!: string;

  @IsString()
  userId!: string; // operator performing the check-out

  @IsOptional()
  @IsString()
  deviceId?: string | null;

  @IsOptional()
  @IsJSON()
  metadata?: string; // JSON string
}
