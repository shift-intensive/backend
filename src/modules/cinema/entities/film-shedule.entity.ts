import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { FilmHall } from './film-hall.entity';

@ObjectType()
export class FilmScheduleSeance {
  @Field(() => String)
  @ApiProperty({ description: 'Время сеанса', example: '12:00' })
  time: string;

  @Field(() => FilmHall)
  @ApiProperty({ description: 'Зал', type: FilmHall })
  hall: FilmHall;
}

@ObjectType()
export class FilmSchedule {
  @Field(() => String)
  @ApiProperty({ description: 'Дата', example: '01.01.2024' })
  date: string;

  @Field(() => [FilmScheduleSeance])
  @ApiProperty({ description: 'Сеансы', type: [FilmScheduleSeance] })
  seances: FilmScheduleSeance[];
}
