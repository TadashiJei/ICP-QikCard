import { IsBoolean, IsIn, IsInt, IsJSON, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDeviceDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsIn(['NFC', 'QR', 'HYBRID'])
  deviceType?: 'NFC' | 'QR' | 'HYBRID';

  @IsOptional()
  @IsString()
  @MaxLength(255)
  deviceId?: string;

  @IsOptional()
  @IsIn(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'ERROR'])
  status?: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'ERROR';

  @IsOptional()
  @IsString()
  locationName?: string;

  @IsOptional()
  @IsNumber()
  locationLat?: number | null;

  @IsOptional()
  @IsNumber()
  locationLng?: number | null;

  @IsOptional()
  @IsString()
  firmwareVersion?: string;

  @IsOptional()
  @IsInt()
  batteryLevel?: number;

  @IsOptional()
  @IsInt()
  signalStrength?: number;

  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;

  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @IsString()
  eventId?: string | null;

  @IsOptional()
  @IsJSON()
  configuration?: string; // JSON string
}
