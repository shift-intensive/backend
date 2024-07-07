import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import type { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

import { OrderedPizza, PizzaAddress, PizzaPerson } from '../../entities';

export enum PizzaStatus {
  IN_PROCESSING,
  WAITING_COURIER,
  ON_MY_WAY,
  SUCCESS,
  CANCELED
}
registerEnumType(PizzaStatus, {
  name: 'PizzaStatus'
});

@InputType('PizzaOrderInput')
@ObjectType()
@Schema({
  collection: 'pizza/order',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
export class PizzaOrder {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [OrderedPizza])
  @Prop({ required: true })
  @ApiProperty({ description: 'Пиццы', type: [OrderedPizza] })
  pizzas: OrderedPizza[];

  @Field(() => PizzaPerson)
  @Prop({ required: true })
  @ApiProperty({ description: 'Данные пользователя', type: PizzaPerson })
  person: PizzaPerson;

  @Field(() => PizzaAddress)
  @Prop({ required: true })
  @ApiProperty({ description: 'Адрес доставки', type: PizzaAddress })
  receiverAddress: PizzaAddress;

  @Field(() => PizzaStatus)
  @Prop({ required: true, default: PizzaStatus.IN_PROCESSING })
  @ApiProperty({ description: 'Статус доставки', enum: PizzaStatus })
  status: PizzaStatus;

  @Field(() => Boolean)
  @Prop({ required: true, default: true })
  @ApiProperty({ description: 'Статус отмены', type: Boolean })
  cancellable: boolean;
}

export type PizzaOrderDocument = PizzaOrder & Document;
export const PizzaOrderSchema = SchemaFactory.createForClass(PizzaOrder);
