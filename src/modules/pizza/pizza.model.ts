import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Pizza } from '@/modules/pizza/entities/pizza.entity';
import { PizzaOrder } from '@/modules/pizza/modules/pizza-order/pizza-order.entity';
import { BaseResponse } from '@/utils/services';

@ObjectType()
export class CatalogResponse extends BaseResponse {
  @Field(() => [Pizza])
  @ApiProperty({ description: 'Пиццы', type: [Pizza] })
  catalog: Pizza[];
}

@ObjectType()
export class PaymentResponse extends BaseResponse {
  @Field(() => PizzaOrder)
  @ApiProperty({ description: 'Доставка', type: PizzaOrder })
  order: PizzaOrder;
}
