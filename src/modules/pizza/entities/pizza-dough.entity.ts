import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum Dough {
  THIN = 'Тонкое',
  THICK = 'Толстое'
}

registerEnumType(Dough, {
  name: 'Dough'
});

@InputType('PizzaDoughInput')
@ObjectType()
export class PizzaDough {
  @Field(() => Dough)
  @ApiProperty({ enum: Dough, description: 'Тип теста' })
  name: Dough;

  @Field(() => Number)
  @ApiProperty({ description: 'Цена теста' })
  price: number;
}
