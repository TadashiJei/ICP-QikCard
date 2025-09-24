import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min, Max } from 'class-validator';

export function IsOptionalInt(min = 1, max = Number.MAX_SAFE_INTEGER) {
  return applyDecorators(
    IsOptional(),
    IsInt(),
    Min(min),
    Max(max),
    Transform(({ value }) => {
      if (value === undefined || value === null || value === '') return undefined;
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? value : parsed;
    }),
  );
}

export function IsPaginationPage() {
  return applyDecorators(
    IsOptional(),
    IsInt(),
    Min(1),
    Transform(({ value }) => {
      if (value === undefined || value === null || value === '') return 1;
      const parsed = parseInt(value, 10);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    }),
  );
}

export function IsPaginationSize() {
  return applyDecorators(
    IsOptional(),
    IsInt(),
    Min(1),
    Max(100),
    Transform(({ value }) => {
      if (value === undefined || value === null || value === '') return 20;
      const parsed = parseInt(value, 10);
      if (isNaN(parsed) || parsed < 1) return 20;
      return parsed > 100 ? 100 : parsed;
    }),
  );
}
