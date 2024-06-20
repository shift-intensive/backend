import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PizzaDough } from './pizza-dough.entity';
import { PizzaIngredient } from './pizza-ingredient.entity';
import { PizzaSize } from './pizza-size.entity';

@InputType('PizzaInput')
@ObjectType()
export class Pizza {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'Идентификатор пиццы' })
  id: string;

  @Field(() => String)
  @ApiProperty({ description: 'Название пиццы' })
  name: string;

  @Field(() => [PizzaIngredient])
  @ApiProperty({ description: 'Ингредиенты', type: [PizzaIngredient] })
  ingredients: PizzaIngredient[];

  @Field(() => [PizzaIngredient])
  @ApiProperty({ description: 'Топпинги', type: [PizzaIngredient] })
  toppings: PizzaIngredient[];

  @Field(() => String)
  @ApiProperty({ description: 'Описание пиццы' })
  description: string;

  @Field(() => [PizzaSize])
  @ApiProperty({ description: 'Размеры пиццы', type: [PizzaSize] })
  sizes: PizzaSize[];

  @Field(() => [PizzaDough])
  @ApiProperty({ description: 'Тип теста', type: [PizzaDough] })
  doughs: PizzaDough[];

  @Field(() => Number)
  @ApiProperty({ description: 'Количество калорий' })
  calories: number;

  @Field(() => String)
  @ApiProperty({ description: 'Количество белков' })
  protein: string;

  @Field(() => String)
  @ApiProperty({ description: 'Количество жиров' })
  totalFat: string;

  @Field(() => String)
  @ApiProperty({ description: 'Количество углеводов' })
  carbohydrates: string;

  @Field(() => String)
  @ApiProperty({ description: 'Количество натрия' })
  sodium: string;

  @Field(() => [String])
  @ApiProperty({ description: 'Список аллергенов' })
  allergens: string[];

  @Field(() => Boolean)
  @ApiProperty({ description: 'Для вегетарианцев' })
  isVegetarian: boolean;

  @Field(() => Boolean)
  @ApiProperty({ description: 'Наличие глютена' })
  isGlutenFree: boolean;

  @Field(() => Boolean)
  @ApiProperty({ description: 'Новинка' })
  isNew: boolean;

  @Field(() => Boolean)
  @ApiProperty({ description: 'Хит' })
  isHit: boolean;

  @Field(() => String)
  @ApiProperty({ description: 'Изображение пиццы' })
  img: string;
}
