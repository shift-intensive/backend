import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

import { BodyType, Brand, Color, Steering, Transmission } from '../constants/enums';

export class GetCarsFilterDto {
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value?.map?.((value) => value.toLowerCase()) : [value.toLowerCase()]
  )
  @IsArray()
  @IsString({ each: true })
  brand?: Brand[];

  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value?.map?.((value) => value.toLowerCase()) : [value.toLowerCase()]
  )
  @IsArray()
  @IsString({ each: true })
  bodyType?: BodyType[];

  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value?.map?.((value) => value.toLowerCase()) : [value.toLowerCase()]
  )
  @IsArray()
  @IsString({ each: true })
  color?: Color[];

  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value?.map?.((value) => value.toLowerCase()) : [value.toLowerCase()]
  )
  @IsArray()
  @IsString({ each: true })
  steering?: Steering;

  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value?.map?.((value) => value.toLowerCase()) : [value.toLowerCase()]
  )
  @IsArray()
  @IsString({ each: true })
  transmission?: Transmission;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsNumber()
  page?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
