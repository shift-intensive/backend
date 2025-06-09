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
export class BookedDateRange {
  @Field(() => Number)
  @ApiProperty({ description: 'Дата начала аренды (timestamp)', example: 1717236000000 })
  startDate: number;

  @Field(() => Number)
  @ApiProperty({ description: 'Дата окончания аренды (timestamp)', example: 1717610400000 })
  endDate: number;
}

@ObjectType()
export class CarWithBookedDates extends Car {
  @Field(() => [BookedDateRange])
  @ApiProperty({
    description: 'Занятые промежутки дат (timestamp)',
    type: [BookedDateRange]
  })
  bookedDates: BookedDateRange[];
}

@ObjectType()
export class CarResponse extends BaseResponse {
  @Field(() => CarWithBookedDates)
  @ApiProperty({
    description: 'Данные автомобиля с арендованными датами',
    type: CarWithBookedDates
  })
  data: CarWithBookedDates;
}

@ObjectType()
export class CarRentsResponse extends BaseResponse {
  @Field(() => [CarRent])
  @ApiProperty({ description: 'Аренды', type: [CarRent] })
  carRents: CarRent[];
}
