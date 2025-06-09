import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { Car, PaginationMeta } from './entities';
import { CarRent } from './modules';

@ObjectType()
export class CarsPaginatedResponse extends BaseResponse {
  @Field(() => [Car])
  @ApiProperty({ description: 'Массив автомобилей с информацией', type: [Car] })
  data: Car[];

  @Field(() => PaginationMeta)
  @ApiProperty({
    description: 'Метаданные пагинации (общее количество, текущая страница и т.д.)',
    type: PaginationMeta
  })
  meta: PaginationMeta;
}

@ObjectType()
export class CarRentsResponse extends BaseResponse {
  @Field(() => [CarRent])
  @ApiProperty({ description: 'Аренды', type: [CarRent] })
  carRents: CarRent[];
}
