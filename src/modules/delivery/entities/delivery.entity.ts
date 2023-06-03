import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Document } from 'mongoose';

import { Address } from './address.entity';
import { Person } from './person.entity';

export enum Payer {
  RECEIVER = 'receiver',
  SENDER = 'sender'
}
registerEnumType(Payer, {
  name: 'Payer'
});

export enum DeliveryStatus {
  IN_PROCESSING,
  SUCCESS
}

registerEnumType(DeliveryStatus, {
  name: 'DeliveryStatus'
});

@InputType('DeliveryInput')
@ObjectType()
@Schema({
  collection: 'delivery',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
export class Delivery {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ description: 'Адрес отправителя', type: Address })
  senderAddress: Address;

  @Field(() => Person)
  @Prop({ required: true })
  @ApiProperty({ description: 'Отправитель', type: Person })
  sender: Person;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ description: 'Адрес получателя', type: Address })
  receiverAddress: Address;

  @Field(() => Person)
  @Prop({ required: true })
  @ApiProperty({ description: 'Получатель', type: Person })
  receiver: Person;

  @Field(() => Payer)
  @Prop({ required: true })
  @ApiProperty({ description: 'Кто будет оплачивать', enum: Payer })
  payer: Payer;

  @Field(() => DeliveryStatus)
  @Prop({ required: true, default: DeliveryStatus.IN_PROCESSING })
  @ApiProperty({ description: 'Статус доставки', enum: DeliveryStatus })
  status: DeliveryStatus;
}

export type DeliveryDocument = Delivery & Document;
export const DeliverySchema = SchemaFactory.createForClass(Delivery);