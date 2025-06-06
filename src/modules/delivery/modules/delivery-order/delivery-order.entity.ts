import type { Document } from 'mongoose';

import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';

import {
  DeliveryOptionType,
  DeliveryPackageType,
  DeliveryPerson,
  DeliveryPoint,
  DeliveryReceiverAddress,
  DeliverySenderAddress
} from '../../entities';

export enum Payer {
  RECEIVER = 'RECEIVER',
  SENDER = 'SENDER'
}
registerEnumType(Payer, {
  name: 'Payer'
});

export enum DeliveryStatus {
  IN_PROCESSING,
  WAITING_COURIER,
  ON_MY_WAY,
  SUCCESS,
  CANCELED
}
registerEnumType(DeliveryStatus, {
  name: 'DeliveryStatus'
});

@InputType('DeliveryOrderInput')
@ObjectType()
@Schema({
  collection: 'delivery/order',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
export class DeliveryOrder {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ description: 'Цена доставки', type: Number })
  price: number;

  @Field(() => DeliveryPackageType)
  @Prop({ required: true })
  @ApiProperty({ description: 'Тип посылки', type: DeliveryPackageType })
  package: DeliveryPackageType;

  @Field(() => DeliveryOptionType)
  @Prop({ required: true })
  @ApiProperty({ description: 'Тип доставки', enum: DeliveryOptionType })
  option: DeliveryOptionType;

  @Field(() => DeliveryPoint)
  @Prop({ required: true })
  @ApiProperty({ description: 'Город отправки', type: DeliveryPoint })
  senderPoint: DeliveryPoint;

  @Field(() => DeliverySenderAddress)
  @Prop({ required: true })
  @ApiProperty({ description: 'Адрес отправителя', type: DeliverySenderAddress })
  senderAddress: DeliverySenderAddress;

  @Field(() => DeliveryPerson)
  @Prop({ required: true })
  @ApiProperty({ description: 'Отправитель', type: DeliveryPerson })
  sender: DeliveryPerson;

  @Field(() => DeliveryPoint)
  @Prop({ required: true })
  @ApiProperty({ description: 'Город получения', type: DeliveryPoint })
  receiverPoint: DeliveryPoint;

  @Field(() => DeliveryReceiverAddress)
  @Prop({ required: true })
  @ApiProperty({ description: 'Адрес получателя', type: DeliveryReceiverAddress })
  receiverAddress: DeliveryReceiverAddress;

  @Field(() => DeliveryPerson)
  @Prop({ required: true })
  @ApiProperty({ description: 'Получатель', type: DeliveryPerson })
  receiver: DeliveryPerson;

  @Field(() => Payer)
  @Prop({ required: true })
  @ApiProperty({ description: 'Кто будет оплачивать', enum: Payer })
  payer: Payer;

  @Field(() => DeliveryStatus)
  @Prop({ required: true, default: DeliveryStatus.IN_PROCESSING })
  @ApiProperty({ description: 'Статус доставки', enum: DeliveryStatus })
  status: DeliveryStatus;

  @Field(() => Boolean)
  @Prop({ required: true, default: true })
  @ApiProperty({ description: 'Статус отмены', type: Boolean })
  cancellable: boolean;
}

export type DeliveryOrderDocument = DeliveryOrder & Document;
export const DeliveryOrderSchema = SchemaFactory.createForClass(DeliveryOrder);
