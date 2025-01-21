import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { PizzaDough } from './pizza-dough.entity';
import { Ingredient } from './pizza-ingredient.entity';
import { PizzaSize } from './pizza-size.entity';

@InputType('OrderedPizzaIngredientInput')
@ObjectType()
export class OrderedPizzaIngredient {
  @IsEnum(Ingredient)
  @Field(() => Ingredient)
  @ApiProperty({ enum: Ingredient, description: 'Название ингредиента' })
  name: Ingredient;

  @IsNotEmpty()
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

  @ValidateNested()
  @Field(() => [OrderedPizzaIngredient])
  @ApiProperty({ description: 'Топпинги', type: [OrderedPizzaIngredient] })
  @Type(() => OrderedPizzaIngredient)
  toppings: OrderedPizzaIngredient[];

  @ValidateNested()
  @Field(() => PizzaSize)
  @ApiProperty({ description: 'Размеры пиццы', type: PizzaSize })
  @Type(() => PizzaSize)
  size: PizzaSize;

  @ValidateNested()
  @Field(() => PizzaDough)
  @ApiProperty({ description: 'Тип теста', type: PizzaDough })
  @Type(() => PizzaDough)
  doughs: PizzaDough;
}
