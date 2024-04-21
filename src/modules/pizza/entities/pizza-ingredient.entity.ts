import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum Ingredient {
  TOMATO_SAUCE = 'томатный соус',
  MOZARELLA = 'моцарелла',
  PEPERONI = 'пепперони',
  SAUSAGE = 'колбаса',
  GREEN_PEPPER = 'зеленый перец',
  RED_ONION = 'красный лук',
  BLACK_OLIVE = 'черные оливки',
  MUSHROOMS = 'грибы',
  BASIL = 'базилик',
  CHEDDAR = 'чеддер',
  PARMESAN = 'пармезан',
  FETA = 'фета',
  HAM = 'ветчина',
  PINEAPPLE = 'ананас',
  TOMATO = 'помидор',
  BEEF = 'говядина',
  SALAMI = 'салями',
  BACON = 'бекон',
  CHILE = 'чили',
  JALAPENO = 'халапеньо',
  CORN = 'кукуруза',
  ONION = 'лук',
  EGG = 'яйцо',
  SHRIMPS = 'креветки',
  MUSSELS = 'мидии',
  SQUID = 'кальмар',
  OLIVES = 'оливки',
  SPINACH = 'шпинат',
  GARLIC = 'чеснок',
  OREGANO = 'орегано',
  BANANA = 'банан',
  PEACH = 'персик',
  CHICKEN_FILLET = 'куриное филе',
  BBQ_SAUCE = 'барбекю',
  CREAM_SAUCE = 'сливочный соус',
  SALMON = 'лосось',
  PHILADELPHIA_CHEESE = 'сыр филадельфия',
  AVOCADO = 'авокадо'
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
