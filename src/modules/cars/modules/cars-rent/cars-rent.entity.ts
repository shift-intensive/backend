import type { Document } from 'mongoose';

import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';

export enum CarsRentStatus {
  BOOKED,
  CANCELLED
}
registerEnumType(CarsRentStatus, {
  name: 'CarsRentStatus'
});

@InputType('CarsRentInput')
@ObjectType()
@Schema({
  collection: 'cars/rent',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
@ObjectType()
export class CarsRent {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @ApiProperty({ example: 'car123', description: 'Идентификатор автомобиля' })
  carId: string;

  @Field(() => CarsRentStatus)
  @Prop({ required: true, default: CarsRentStatus.BOOKED })
  @ApiProperty({ example: '0', description: 'Статус брони', enum: CarsRentStatus })
  status: CarsRentStatus;

  @Field(() => String)
  @ApiProperty({ example: 'Москва, ул. Ленина, 1', description: 'Место получения автомобиля' })
  pickupLocation: string;

  @Field(() => String)
  @ApiProperty({ example: 'Москва, ул. Тверская, 10', description: 'Место возврата автомобиля' })
  returnLocation: string;

  @Field(() => String)
  @ApiProperty({ example: '2025-06-01T10:00:00Z', description: 'Дата начала аренды (ISO)' })
  startDate: string;

  @Field(() => String)
  @ApiProperty({ example: '2025-06-10T18:00:00Z', description: 'Дата окончания аренды (ISO)' })
  endDate: string;

  @Field(() => Number)
  @ApiProperty({ example: 25000, description: 'Общая сумма аренды' })
  totalPrice: number;

  @Field(() => String)
  @ApiProperty({ example: 'Иван Иванов', description: 'ФИО арендатора' })
  fullName: string;

  @Field(() => String)
  @ApiProperty({ example: '1990-05-10', description: 'Дата рождения арендатора' })
  birthDate: string;

  @Field(() => String)
  @ApiProperty({ example: 'ivan@example.com', description: 'Email арендатора' })
  email: string;

  @Field(() => String)
  @ApiProperty({
    example: '79991234567',
    description: 'Телефон арендатора (совпадает с номером пользователя)'
  })
  phone: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    example: 'Позвонить за час до выдачи',
    description: 'Комментарий',
    required: false
  })
  comment?: string;
}

export type CarsRentDocument = CarsRent & Document;
export const CarsRentSchema = SchemaFactory.createForClass(CarsRent);
