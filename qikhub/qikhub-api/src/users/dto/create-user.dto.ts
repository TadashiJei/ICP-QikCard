import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  principalId!: string;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsString()
  @MaxLength(255)
  displayName!: string;

  @IsOptional()
  @IsString()
  avatar?: string | null;

  @IsOptional()
  @IsIn(['USER', 'ORGANIZER', 'ADMIN'])
  role?: 'USER' | 'ORGANIZER' | 'ADMIN';

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
