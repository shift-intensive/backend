import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum Ingredient {
  TOMATO_SAUCE = 'TOMATO_SAUCE',
  MOZARELLA = 'MOZARELLA',
  PEPERONI = 'PEPERONI',
  SAUSAGE = 'SAUSAGE',
  GREEN_PEPPER = 'GREEN_PEPPER',
  RED_ONION = 'RED_ONION',
  BLACK_OLIVE = 'BLACK_OLIVE',
  MUSHROOMS = 'MUSHROOMS',
  BASIL = 'BASIL',
  CHEDDAR = 'CHEDDAR',
  PARMESAN = 'PARMESAN',
  FETA = 'FETA',
  HAM = 'HAM',
  PINEAPPLE = 'PINEAPPLE',
  TOMATO = 'TOMATO',
  BEEF = 'BEEF',
  SALAMI = 'SALAMI',
  BACON = 'BACON',
  CHILE = 'CHILE',
  JALAPENO = 'JALAPENO',
  CORN = 'CORN',
  ONION = 'ONION',
  EGG = 'EGG',
  SHRIMPS = 'SHRIMPS',
  MUSSELS = 'MUSSELS',
  SQUID = 'SQUID',
  OLIVES = 'OLIVES',
  SPINACH = 'SPINACH',
  GARLIC = 'GARLIC',
  OREGANO = 'OREGANO',
  BANANA = 'BANANA',
  PEACH = 'PEACH',
  CHICKEN_FILLET = 'CHICKEN_FILLET',
  BBQ_SAUCE = 'BBQ_SAUCE',
  CREAM_SAUCE = 'CREAM_SAUCE',
  SALMON = 'SALMON',
  PHILADELPHIA_CHEESE = 'PHILADELPHIA_CHEESE',
  AVOCADO = 'AVOCADO'
}

registerEnumType(Ingredient, {
  name: 'Ingredient'
});

@InputType('PizzaIngredientInput')
@ObjectType()
export class PizzaIngredient {
  @Field(() => Ingredient)
  @ApiProperty({ enum: Ingredient, description: 'Название ингредиента' })
  name: Ingredient;

  @Field(() => Number)
  @ApiProperty({ description: 'Цена ингредиента' })
  cost: number;
}
