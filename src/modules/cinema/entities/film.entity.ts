import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Country } from '@/utils/common';

import { FilmStaff } from './film-staff.entity';
import { FilmUserRating } from './film-user-rating.entity';

export enum Rating {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG13',
  R = 'R',
  NC17 = 'NC17'
}

registerEnumType(Rating, {
  name: 'Rating'
});

@InputType('FilmInput')
@ObjectType()
export class Film {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Идентификатор фильма' })
  id: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ description: 'Название фильма' })
  name: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ description: 'Оригинальное название' })
  originalName: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ description: 'Описание фильма' })
  description: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ description: 'Дата выхода' })
  releaseDate: string;

  @ApiProperty()
  @Field(() => [FilmStaff], { defaultValue: [] })
  @ApiProperty({ description: 'Актеры', type: [FilmStaff] })
  actors: FilmStaff[];

  @ApiProperty()
  @Field(() => [FilmStaff], { defaultValue: [] })
  @ApiProperty({ description: 'Режиссер', type: [FilmStaff] })
  directors: FilmStaff[];

  @ApiProperty()
  @Field(() => Number)
  @ApiProperty({ description: 'Продолжительность', type: Number })
  runtime: number;

  @ApiProperty()
  @Field(() => Rating)
  @ApiProperty({ description: 'Возрастное ограничение', enum: Rating })
  ageRating: Rating;

  @ApiProperty()
  @Field(() => [String], { defaultValue: [] })
  genres: string[];

  @ApiProperty()
  @Field(() => FilmUserRating)
  @ApiProperty({ description: 'Рейтинг пользователей', type: FilmUserRating })
  userRatings: FilmUserRating;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ description: 'Изображение фильма' })
  img: string;

  @ApiProperty()
  @Field(() => Country, { nullable: true })
  @ApiProperty({ description: 'Страна', nullable: true, required: false })
  country?: Country;
}
