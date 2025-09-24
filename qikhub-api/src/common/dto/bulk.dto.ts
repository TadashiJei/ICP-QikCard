import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { Type } from 'class-transformer';

export class BulkOperationDto<T> {
  @ApiProperty({ description: 'Array of items to process', type: [Object] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => Object)
  items: T[];
}

export class BulkDeleteDto {
  @ApiProperty({ description: 'Array of IDs to delete', type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  ids: string[];
}

export class BulkResponseDto<T> {
  success: T[];
  failed: Array<{
    item: T;
    error: string;
  }>;
  total: number;
  successCount: number;
  failedCount: number;

  constructor(success: T[], failed: Array<{ item: T; error: string }>) {
    this.success = success;
    this.failed = failed;
    this.total = success.length + failed.length;
    this.successCount = success.length;
    this.failedCount = failed.length;
  }
}
