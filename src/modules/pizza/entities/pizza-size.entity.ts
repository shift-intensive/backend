import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum Size {
  SMALL = 'Маленькая',
  MEDIUM = 'Средняя',
  LARGE = 'Большая'
}

registerEnumType(Size, {
  name: 'Size'
});

@InputType('PizzaSizeInput')
@ObjectType()
export class PizzaSize {
  @Field(() => Size)
  @ApiProperty({ enum: Size, description: 'Размер пиццы' })
  name: Size;

  @Field(() => Number)
  @ApiProperty({ description: 'Цена пиццы' })
  price: number;
}
