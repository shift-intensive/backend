import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { FilmHallCell, FilmHallCellType } from './film-hall-cell.entity';

@InputType('FilmHallInput')
@ObjectType()
export class FilmHall {
  @Field(() => String)
  @ApiProperty({ example: 'red', description: 'Название зала' })
  name: string;

  @Field(() => [[FilmHallCell]])
  @ApiProperty({
    example: [[{ type: FilmHallCellType.ECONOM, price: 100 }]],
    description: 'Места в зале',
    type: [[FilmHallCell]]
  })
  places: FilmHallCell[][];
}
