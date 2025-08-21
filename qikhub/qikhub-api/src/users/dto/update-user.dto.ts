import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  principalId?: string;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  displayName?: string;

  @IsOptional()
  @IsString()
  avatar?: string | null;

  @IsOptional()
  @IsEnum(['USER', 'ORGANIZER', 'ADMIN'] as const)
  role?: 'USER' | 'ORGANIZER' | 'ADMIN';

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
