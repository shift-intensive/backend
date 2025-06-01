import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export enum Size {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

registerEnumType(Size, {
  name: 'Size'
});

@InputType('PizzaSizeInput')
@ObjectType()
export class PizzaSize {
  @IsEnum(Size)
  @Field(() => Size)
  @ApiProperty({ enum: Size, description: 'Идентификатор размера пиццы' })
  type: Size;

  @IsNumber()
  @Field(() => Number)
  @ApiProperty({ description: 'Цена пиццы' })
  price: number;
}
