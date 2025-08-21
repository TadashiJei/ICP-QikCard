import { IsBoolean, IsIn, IsInt, IsJSON, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsIn(['NFC', 'QR', 'HYBRID'])
  deviceType!: 'NFC' | 'QR' | 'HYBRID';

  @IsString()
  @MaxLength(255)
  deviceId!: string;

  @IsOptional()
  @IsIn(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'ERROR'])
  status?: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'ERROR';

  @IsString()
  locationName!: string;

  @IsOptional()
  @IsNumber()
  locationLat?: number | null;

  @IsOptional()
  @IsNumber()
  locationLng?: number | null;

  @IsString()
  firmwareVersion!: string;

  @IsOptional()
  @IsInt()
  batteryLevel?: number;

  @IsOptional()
  @IsInt()
  signalStrength?: number;

  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;

  @IsString()
  ownerId!: string;

  @IsOptional()
  @IsString()
  eventId?: string | null;

  @IsOptional()
  @IsJSON()
  configuration?: string; // JSON string
}
