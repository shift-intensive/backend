import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum Ingredient {
  PINEAPPLE = 'PINEAPPLE',
  MOZZARELLA = 'MOZZARELLA',
  PEPERONI = 'PEPERONI',
  GREEN_PEPPER = 'GREEN_PEPPER',
  MUSHROOMS = 'MUSHROOMS',
  BASIL = 'BASIL',
  CHEDDAR = 'CHEDDAR',
  PARMESAN = 'PARMESAN',
  FETA = 'FETA',
  HAM = 'HAM',
  PICKLE = 'PICKLE',
  TOMATO = 'TOMATO',
  BACON = 'BACON',
  ONION = 'ONION',
  CHILE = 'CHILE',
  SHRIMPS = 'SHRIMPS',
  CHICKEN_FILLET = 'CHICKEN_FILLET',
  MEATBALLS = 'MEATBALLS'
}

registerEnumType(Ingredient, {
  name: 'Ingredient'
});

@InputType('PizzaIngredientInput')
@ObjectType()
export class PizzaIngredient {
  @Field(() => Ingredient)
  @ApiProperty({ enum: Ingredient, description: 'Идентификатор ингредиента' })
  type: Ingredient;

  @Field(() => Number)
  @ApiProperty({ description: 'Цена ингредиента' })
  price: number;

  @Field(() => String)
  @ApiProperty({ description: 'Изображение ингредиента' })
  img: string;
}
