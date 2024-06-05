import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { Pizza } from '@/modules/pizza/entities/pizza.entity';
import { PizzaOrder } from '@/modules/pizza/modules/pizza-order/pizza-order.entity';
import { BaseResponse } from '@/utils/services';

@ObjectType()
export class PizzasResponse extends BaseResponse {
  @Field(() => [Pizza])
  @ApiProperty({ description: 'Пиццы', type: [Pizza] })
  catalog: Pizza[];
}

@ObjectType()
export class PizzaPaymentResponse extends BaseResponse {
  @Field(() => PizzaOrder)
  @ApiProperty({ description: 'Доставка', type: PizzaOrder })
  order: PizzaOrder;
}

@ObjectType()
export class PizzaOrdersResponse extends BaseResponse {
  @Field(() => [PizzaOrder])
  @ApiProperty({ description: 'Доставки', type: [PizzaOrder] })
  orders: PizzaOrder[];
}

@ObjectType()
export class PizzaOrderResponse extends BaseResponse {
  @Field(() => PizzaOrder)
  @ApiProperty({ description: 'Доставки', type: PizzaOrder })
  order: PizzaOrder;
}
