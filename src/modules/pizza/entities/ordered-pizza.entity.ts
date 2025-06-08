import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Dough } from './pizza-dough.entity';
import { Ingredient } from './pizza-ingredient.entity';
import { Size } from './pizza-size.entity';

@InputType('OrderedPizzaInput')
@ObjectType()
export class OrderedPizza {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Идентификатор пиццы' })
  id: string;

  @Field(() => [Ingredient])
  @ApiProperty({ description: 'Топпинги' })
  toppings: Ingredient[];

  @IsEnum(Size)
  @Field(() => Size)
  @ApiProperty({ description: 'Размер пиццы', enum: Size })
  size: Size;

  @IsEnum(Dough)
  @Field(() => Dough)
  @ApiProperty({ description: 'Тип теста', enum: Dough })
  dough: Dough;
}
