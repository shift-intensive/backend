import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { BodyType, Brand, Color, Steering, Transmission } from '../constants/enums';

registerEnumType(Brand, { name: 'Brand' });
registerEnumType(Transmission, { name: 'Transmission' });
registerEnumType(Color, { name: 'Color' });
registerEnumType(BodyType, { name: 'BodyType' });

@ObjectType('Car')
export class Car {
  @Field(() => String)
  @ApiProperty({ example: '1', description: 'ID автомобиля' })
  id: string;

  @Field(() => String)
  @ApiProperty({ example: 'Model X', description: 'Название модели' })
  name: string;

  @Field(() => Brand)
  @ApiProperty({
    enum: Object.values(Brand),
    description: 'Марка автомобиля'
  })
  brand: Brand;

  @Field(() => String)
  @ApiProperty({ example: 'https://example.com/car.jpg', description: 'URL изображения' })
  img: string;

  @Field(() => Transmission)
  @ApiProperty({
    enum: Object.values(Transmission),
    description: 'Тип коробки передач'
  })
  transmission: Transmission;

  @Field(() => Number)
  @ApiProperty({ example: 15000, description: 'Цена аренды в сутки' })
  price: number;

  @Field(() => String)
  @ApiProperty({ example: 'Москва, ул. Пушкина 10', description: 'Местоположение' })
  location: string;

  @Field(() => Number, { nullable: true })
  @ApiProperty({
    example: 2,
    description: 'Минимальное количество дней аренды',
    required: false
  })
  minRentalDays?: number;

  @Field(() => Color)
  @ApiProperty({ enum: Color, description: 'Цвет автомобиля' })
  color: Color;

  @Field(() => BodyType)
  @ApiProperty({ enum: BodyType, description: 'Тип кузова' })
  bodyType: BodyType;

  @Field(() => String)
  @ApiProperty({
    enum: Steering,
    description: 'Расположение руля'
  })
  steering: Steering;

  @Field(() => Boolean)
  @ApiProperty({
    example: true,
    description: 'Доступен ли автомобиль для аренды'
  })
  available: boolean;
}

@ObjectType('PaginationMeta')
export class PaginationMeta {
  @Field(() => Number)
  @ApiProperty({
    example: 100,
    description: 'Общее количество элементов во всех страницах',
    type: Number
  })
  total: number;

  @Field(() => Number)
  @ApiProperty({
    example: 1,
    description: 'Текущий номер страницы (по умолчанию 1)',
    type: Number
  })
  page: number;

  @Field(() => Number)
  @ApiProperty({
    example: 10,
    description: 'Количество элементов на странице (по умолчанию 10)',
    type: Number
  })
  limit: number;

  @Field(() => Number)
  @ApiProperty({
    example: 10,
    description: 'Общее количество доступных страниц',
    type: Number
  })
  totalPages: number;
}
