import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum Dough {
  THIN = 'THIN',
  THICK = 'THICK'
}

registerEnumType(Dough, {
  name: 'Dough'
});

@InputType('PizzaDoughInput')
@ObjectType()
export class PizzaDough {
  @IsEnum(Dough)
  @Field(() => Dough)
  @ApiProperty({ enum: Dough, description: 'Идентификатор типа теста' })
  type: Dough;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  @ApiProperty({ description: 'Цена теста' })
  price: number;
}
