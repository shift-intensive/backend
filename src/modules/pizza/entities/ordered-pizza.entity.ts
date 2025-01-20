import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { PizzaDough } from './pizza-dough.entity';
import { Ingredient } from './pizza-ingredient.entity';
import { PizzaSize } from './pizza-size.entity';

@InputType('OrderedPizzaIngredientInput')
@ObjectType()
export class OrderedPizzaIngredient {
  @Field(() => Ingredient)
  @ApiProperty({ enum: Ingredient, description: 'Название ингредиента' })
  name: Ingredient;

  @Field(() => Number)
  @ApiProperty({ description: 'Цена ингредиента' })
  cost: number;
}

@InputType('OrderedPizzaInput')
@ObjectType()
export class OrderedPizza {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Идентификатор пиццы' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ description: 'Название пиццы' })
  name: string;

  @Field(() => [OrderedPizzaIngredient])
  @ApiProperty({ description: 'Топпинги', type: [OrderedPizzaIngredient] })
  toppings: OrderedPizzaIngredient[];

  @IsString()
  @IsNotEmpty()
  @Field(() => PizzaSize)
  @ApiProperty({ description: 'Размеры пиццы', type: PizzaSize })
  size: PizzaSize;

  @IsString()
  @IsNotEmpty()
  @Field(() => PizzaDough)
  @ApiProperty({ description: 'Тип теста', type: PizzaDough })
  doughs: PizzaDough;
}
