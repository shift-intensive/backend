import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BaseResponse } from '@/utils/services';

import { Film } from './entities';
import { Ticket } from './entities/ticket.entity';

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
export class FilmResponse extends BaseResponse {
  @Field(() => [Film])
  @ApiProperty({ description: 'Фильм', type: Film })
  film: Film;
}
