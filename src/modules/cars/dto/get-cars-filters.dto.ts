import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

import { BodyType, Brand, Color } from '../constants/enums';

export class CarFilters {
  @IsOptional()
  @Transform(({ value }) => value?.map?.((value) => value.toLowerCase()) || [value.toLowerCase()])
  @IsArray()
  @IsString({ each: true })
  brand?: Brand[];

  @IsOptional()
  @Transform(({ value }) => value?.map?.((value) => value.toLowerCase()) || [value.toLowerCase()])
  @IsArray()
  @IsString({ each: true })
  bodyType?: BodyType[];

  @IsOptional()
  @Transform(({ value }) => value?.map?.((value) => value.toLowerCase()) || [value.toLowerCase()])
  @IsArray()
  @IsString({ each: true })
  color?: Color[];

  @IsOptional()
  @IsString()
  transmission?: string;

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

  // сомневаюсь насчет дат аренды
}
