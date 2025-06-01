import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { Film, FilmSchedule } from './entities';
import { CinemaOrder } from './modules/cinema-order/cinema-order.entity';

@ObjectType()
export class FilmResponse extends BaseResponse {
  @Field(() => Film)
  @ApiProperty({ description: 'Фильм', type: Film })
  film: Film;
}

@ObjectType()
export class FilmsResponse extends BaseResponse {
  @Field(() => [Film])
  @ApiProperty({ description: 'Фильмы', type: [Film] })
  films: Film[];
}

@ObjectType()
export class ScheduleResponse extends BaseResponse {
  @Field(() => FilmSchedule)
  @ApiProperty({
    description: 'Расписание',
    type: FilmSchedule
  })
  schedules: FilmSchedule[];
}

@ObjectType()
export class PaymentResponse extends BaseResponse {
  @Field(() => CinemaOrder)
  @ApiProperty({ description: 'Заказ', type: CinemaOrder })
  order: CinemaOrder;
}

@ObjectType()
export class CinemaOrdersResponse extends BaseResponse {
  @Field(() => [CinemaOrder])
  @ApiProperty({ description: 'Заказы', type: [CinemaOrder] })
  orders: CinemaOrder[];
}
