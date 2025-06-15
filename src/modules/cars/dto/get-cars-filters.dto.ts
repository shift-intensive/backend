import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

import { transformSearchParam } from '@/utils/helpers';

import { BodyType, Brand, Color, Steering, Transmission } from '../constants/enums';

@ArgsType()
export class GetCarsFilterDto {
  @IsOptional()
  @Transform(transformSearchParam)
  @IsArray()
  @IsString({ each: true })
  @Field(() => [Brand], { nullable: true })
  brand?: Brand[];

  @IsOptional()
  @Transform(transformSearchParam)
  @IsArray()
  @IsString({ each: true })
  @Field(() => [BodyType], { nullable: true })
  bodyType?: BodyType[];

  @IsOptional()
  @Transform(transformSearchParam)
  @IsArray()
  @IsString({ each: true })
  @Field(() => [Color], { nullable: true })
  color?: Color[];

  @IsOptional()
  @Transform(transformSearchParam)
  @IsArray()
  @IsString({ each: true })
  @Field(() => [Steering], { nullable: true })
  steering?: Steering;

  @IsOptional()
  @Transform(transformSearchParam)
  @IsArray()
  @IsString({ each: true })
  @Field(() => [Transmission], { nullable: true })
  transmission?: Transmission;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsNumber()
  @Field(() => Number, { nullable: true })
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsNumber()
  @Field(() => Number, { nullable: true })
  maxPrice?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsNumber()
  @Field(() => Number, { nullable: true })
  page?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsNumber()
  @Field(() => Number, { nullable: true })
  limit?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  search?: string;
}
