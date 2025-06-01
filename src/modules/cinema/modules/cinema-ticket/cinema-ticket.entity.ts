import type { Document } from 'mongoose';

import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';

export enum CinemaTicketStatus {
  PAYED = 'PAYED',
  CANCELED = 'CANCELED'
}

registerEnumType(CinemaTicketStatus, {
  name: 'CinemaTicketStatus'
});

@InputType('CinemaTicketSeanceInput')
@ObjectType()
export class CinemaTicketSeance {
  @Field(() => String)
  @ApiProperty({ example: '29.06.23', description: 'Дата сеанса' })
  date: string;

  @Field(() => String)
  @ApiProperty({ example: '10:00', description: 'Время сеанса' })
  time: string;
}

@InputType('CinemaTicketInput')
@ObjectType()
@Schema({
  collection: 'cinema/tickets',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
export class CinemaTicket {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ description: 'Идентификатор фильма' })
  filmId: string;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ description: 'Идентификатор заказа' })
  orderId: string;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ example: 1, description: 'Ряд' })
  row: number;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ example: 1, description: 'Место' })
  column: number;

  @Field(() => CinemaTicketSeance)
  @Prop({ required: true })
  @ApiProperty({ description: 'Сеанс фильма', type: CinemaTicketSeance })
  seance: CinemaTicketSeance;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: '89990009999', description: 'Телефон' })
  phone: string;

  @Field(() => CinemaTicketStatus)
  @Prop({ required: true })
  @ApiProperty({ description: 'Статус билета', enum: CinemaTicketStatus })
  status: string;
}

export type CinemaTicketDocument = CinemaTicket & Document;
export const CinemaTicketSchema = SchemaFactory.createForClass(CinemaTicket);
