import { BadRequestException } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import type { Request } from 'express';

import { pizzas } from '@/modules/pizza/constants/pizzas';
import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver } from '@/utils/services';

import type { User } from '../users';

import { PizzaOrderService } from './modules/pizza-order';
import { GetPizzaOrderDto } from './dto';
import { CatalogResponse, PizzaOrderResponse, PizzaOrdersResponse } from './pizza.model';

@Resolver('🍕 pizza query')
@DescribeContext('PizzaQuery')
@Resolver()
export class PizzaQuery extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly pizzaOrderService: PizzaOrderService
  ) {
    super();
  }

  @Query(() => CatalogResponse)
  getPizzas(): CatalogResponse {
    return this.wrapSuccess({ catalog: pizzas });
  }

  @GqlAuthorizedOnly()
  @Query(() => PizzaOrdersResponse)
  async getDeliveries(@Context() context: { req: Request }): Promise<PizzaOrdersResponse> {
    const token = context.req.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const orders = await this.pizzaOrderService.find({
      $or: [{ 'person.phone': decodedJwtAccessToken.phone }]
    });

    return this.wrapSuccess({ orders });
  }

  @GqlAuthorizedOnly()
  @Query(() => PizzaOrderResponse)
  async getDelivery(
    @Args() getPizzaOrderDto: GetPizzaOrderDto,
    @Context() context: { req: Request }
  ): Promise<PizzaOrderResponse> {
    const token = context.req.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const order = await this.pizzaOrderService.findOne({
      _id: getPizzaOrderDto.orderId,
      $or: [{ 'person.phone': decodedJwtAccessToken.phone }]
    });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Заказ не найден'));
    }

    return this.wrapSuccess({ order });
  }
}
