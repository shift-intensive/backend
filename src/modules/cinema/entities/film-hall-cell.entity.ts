import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum FilmHallCellStatus {
  DEFAULT = 'DEFAULT',
  PAYED = 'PAYED'
}

registerEnumType(FilmHallCellStatus, {
  name: 'FilmHallCellStatus'
});

export enum FilmHallCellType {
  ECONOM = 'ECONOM',
  COMFORT = 'COMFORT',
  BLOCKED = 'BLOCKED',
  PAYED = 'PAYED'
}

registerEnumType(FilmHallCellType, {
  name: 'FilmHallCellType'
});

@InputType('FilmHallCellInput')
@ObjectType()
export class FilmHallCell {
  @Field(() => FilmHallCellType)
  @ApiProperty({
    example: FilmHallCellType.ECONOM,
    description: 'Тип места в зале',
    enum: FilmHallCellType
  })
  type: FilmHallCellType;

  @ApiProperty()
  @Field(() => Number)
  @ApiProperty({ example: 100, description: 'Цена места в зале' })
  price: number;
}
