import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('FilmUserRatingInput')
@ObjectType()
export class FilmUserRating {
  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ example: '10', description: 'Рейтинг кинопоиск' })
  kinopoisk: string;

  @ApiProperty()
  @Field(() => String)
  @ApiProperty({ example: '10', description: 'Рейтинг imdb' })
  imdb: string;
}
