import type { Document } from 'mongoose';

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';

import { BodyType, Brand, Color, Steering, Transmission } from '../../constants/enums';
import { Car } from '../../entities';

export enum CarRentStatus {
  BOOKED,
  CANCELLED
}
registerEnumType(CarRentStatus, {
  name: 'CarRentStatus'
});

@ObjectType()
@Schema({
  collection: 'cars/rent',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
export class CarRent {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Car)
  @Prop({ required: true })
  @ApiProperty({
    example: {
      id: '12',
      name: 'Kia Rio 1.4 AT',
      brand: Brand.KIA,
      img: '/static/images/cars/kia-rio-black.webp',
      transmission: Transmission.MANUAL,
      price: 3100,
      location: 'Новосибирск, ул. Ленина, 5',
      color: Color.BLACK,
      bodyType: BodyType.SEDAN,
      steering: Steering.LEFT
    },
    description: 'Информация об автомобиле'
  })
  carInfo: Car;

  @Field(() => CarRentStatus)
  @Prop({ required: true, default: CarRentStatus.BOOKED })
  @ApiProperty({ example: '0', description: 'Статус брони', enum: CarRentStatus })
  status: CarRentStatus;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: 'Москва, ул. Ленина, 1', description: 'Место получения автомобиля' })
  pickupLocation: string;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: 'Москва, ул. Тверская, 10', description: 'Место возврата автомобиля' })
  returnLocation: string;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({
    example: 1717236000000,
    description: 'Дата начала аренды (timestamp в миллисекундах)'
  })
  startDate: number;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({
    example: 1717610400000,
    description: 'Дата окончания аренды (timestamp в миллисекундах)'
  })
  endDate: number;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ example: 25000, description: 'Общая сумма аренды' })
  totalPrice: number;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: 'Иван', description: 'Имя арендатора' })
  firstName: string;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: 'Иванов', description: 'Фамилия арендатора' })
  lastName: string;

  @Field(() => String, { nullable: true })
  @Prop()
  @ApiProperty({ example: 'Иванович', description: 'Отчество арендатора', required: false })
  middleName?: string;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: '1990-05-10', description: 'Дата рождения арендатора' })
  birthDate: string;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: 'ivan@example.com', description: 'Email арендатора' })
  email: string;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({
    example: '79991234567',
    description: 'Телефон арендатора (совпадает с номером пользователя)'
  })
  phone: string;

  @Field(() => String, { nullable: true })
  @Prop()
  @ApiProperty({
    example: 'Позвонить за час до выдачи',
    description: 'Комментарий',
    required: false
  })
  comment?: string;
}

export type CarRentDocument = CarRent & Document;
export const CarRentSchema = SchemaFactory.createForClass(CarRent);
