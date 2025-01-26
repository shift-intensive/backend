import type { Document } from 'mongoose';

import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';

import { FilmPerson, Ticket } from '../../entities';

export enum CinemaOrderStatus {
  PAYED = 'PAYED',
  CANCELED = 'CANCELED'
}

registerEnumType(CinemaOrderStatus, {
  name: 'CinemaOrderStatus'
});

@InputType('CinemaOrderInput')
@ObjectType()
@Schema({
  collection: 'cinema/order',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
export class CinemaOrder {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ description: 'Название фильма' })
  filmName: string;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ description: 'Номер заказа' })
  orderNumber: number;

  @Field(() => [Ticket])
  @Prop({ required: true })
  @ApiProperty({ description: 'Билеты', type: [Ticket] })
  tickets: Ticket[];

  @Field(() => FilmPerson)
  @Prop({ required: true })
  @ApiProperty({ description: 'Данные пользователя', type: FilmPerson })
  person: FilmPerson;

  @Field(() => CinemaOrderStatus)
  @Prop({ required: true, default: CinemaOrderStatus.PAYED })
  @ApiProperty({ description: 'Статус заказа', enum: CinemaOrderStatus })
  status: CinemaOrderStatus;
}

export type CinemaOrderDocument = CinemaOrder & Document;
export const CinemaOrderSchema = SchemaFactory.createForClass(CinemaOrder);
