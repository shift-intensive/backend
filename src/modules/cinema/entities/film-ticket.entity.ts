import type { Document } from 'mongoose';

import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';

export enum FilmTicketStatus {
  PAYED = 'PAYED',
  CANCELED = 'CANCELED'
}

registerEnumType(FilmTicketStatus, {
  name: 'FilmTicketStatus'
});

@InputType('FilmTicketSeanceInput')
@ObjectType()
export class FilmTicketSeance {
  @Field(() => String)
  @ApiProperty({ example: '19.06.23', description: 'Дата сеанса' })
  date: string;

  @Field(() => String)
  @ApiProperty({ example: '21:50', description: 'Время сеанса' })
  time: string;
}

@InputType('TicketInput')
@ObjectType()
@Schema({
  collection: 'tickets',
  versionKey: false,
  minimize: false,
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
export class Ticket {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ description: 'Идентификатор фильма' })
  filmId: string;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ example: 1, description: 'Ряд' })
  row: number;

  @Field(() => Number)
  @Prop({ required: true })
  @ApiProperty({ example: 1, description: 'Место' })
  column: number;

  @Field(() => FilmTicketSeance)
  @Prop({ required: true })
  @ApiProperty({ description: 'Сеанс фильма', type: FilmTicketSeance })
  seance: FilmTicketSeance;

  @Field(() => String)
  @Prop({ required: true })
  @ApiProperty({ example: '89990009999', description: 'Телефон' })
  phone: string;

  @Field(() => FilmTicketStatus)
  @Prop({ required: true })
  @ApiProperty({ description: 'Статус билета', enum: FilmTicketStatus })
  status: FilmTicketStatus;
}

export type TicketDocument = Ticket & Document;
export const TicketSchema = SchemaFactory.createForClass(Ticket);
