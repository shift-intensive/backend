import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { Film, FilmSeance, Ticket } from './entities';
import { CinemaOrder } from './modules';

@ObjectType()
export class FilmsResponse extends BaseResponse {
  @Field(() => [Film])
  @ApiProperty({ description: 'Фильмы', type: [Film] })
  films: Film[];
}

@ObjectType()
export class TicketsResponse extends BaseResponse {
  @Field(() => [Ticket])
  @ApiProperty({ description: 'Билеты', type: [Ticket] })
  tickets: Ticket[];
}

@ObjectType()
export class CinemaOrdersResponse extends BaseResponse {
  @Field(() => [CinemaOrder])
  @ApiProperty({ description: '', type: [CinemaOrder] })
  orders: CinemaOrder[];
}

@ObjectType()
export class FilmResponse extends BaseResponse {
  @Field(() => Film)
  @ApiProperty({ description: 'Фильм', type: Film })
  film: Film;
}

@ObjectType()
export class Schedule {
  @Field(() => String)
  @ApiProperty({ description: 'Дата сеансов' })
  date: string;

  @Field(() => [FilmSeance])
  @ApiProperty({ description: 'Сеансы', type: [FilmSeance] })
  seances: FilmSeance[];
}

@ObjectType()
export class ScheduleResponse extends BaseResponse {
  @Field(() => [Schedule])
  @ApiProperty({ description: 'Расписание', type: [Schedule] })
  schedules: Schedule[];
}

@ObjectType()
export class PaymentResponse extends BaseResponse {
  @Field(() => CinemaOrder)
  @ApiProperty({ description: 'Номер заказа', type: CinemaOrder })
  order: CinemaOrder;
}
