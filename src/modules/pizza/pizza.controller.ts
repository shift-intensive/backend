import { BadRequestException, Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import type { User } from '@/modules/users';
import { UsersService } from '@/modules/users';
import { ApiAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver, BaseResponse } from '@/utils/services';

import { pizzas } from './constants/pizzas';
import { PizzaOrderService, PizzaStatus } from './modules/pizza-order';
import { CancelPizzaOrderDto, CreatePizzaPaymentDto, GetPizzaOrderDto } from './dto';
import {
  CatalogResponse,
  PizzaOrderResponse,
  PizzaOrdersResponse,
  PizzaPaymentResponse
} from './pizza.model';

@ApiTags('🍕 pizza')
@Controller('/pizza')
export class PizzaController extends BaseResolver {
  constructor(
    private readonly pizzaOrderService: PizzaOrderService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
    super();
  }

  @Get('/catalog')
  @ApiOperation({ summary: 'Получить пиццы' })
  @ApiResponse({
    status: 200,
    description: 'catalog',
    type: CatalogResponse
  })
  getPizzas(): CatalogResponse {
    return this.wrapSuccess({ catalog: pizzas });
  }

  @Post('/payment')
  @ApiOperation({ summary: 'Оплатить корзину' })
  @ApiResponse({
    status: 200,
    description: 'payment',
    type: PizzaPaymentResponse
  })
  async createPizzaPayment(
    @Args() createPizzaPaymentDto: CreatePizzaPaymentDto
  ): Promise<PizzaPaymentResponse> {
    const { person } = createPizzaPaymentDto;

    const order = await this.pizzaOrderService.create({
      ...createPizzaPaymentDto,
      status: PizzaStatus.IN_PROCESSING,
      cancellable: true
    });

    let user = await this.usersService.findOne({ phone: person.phone });

    if (!user) {
      user = await this.usersService.create({ phone: person.phone });
    }

    await this.usersService.findOneAndUpdate(
      { phone: user.phone },
      {
        $set: {
          firstname: person.firstname,
          lastname: person.lastname,
          middlename: person.middlename
        }
      }
    );

    return this.wrapSuccess({ order });
  }

  @ApiAuthorizedOnly()
  @Get('/orders')
  @ApiOperation({ summary: 'Получить все заказы' })
  @ApiResponse({
    status: 200,
    description: 'orders',
    type: PizzaOrdersResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getDeliveries(@Req() request: Request): Promise<PizzaOrdersResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const orders = await this.pizzaOrderService.find({
      $or: [{ 'person.phone': decodedJwtAccessToken.phone }]
    });

    return this.wrapSuccess({ orders });
  }

  @ApiAuthorizedOnly()
  @Get('/orders/:orderId')
  @ApiOperation({ summary: 'Получить заказ' })
  @ApiResponse({
    status: 200,
    description: 'order',
    type: PizzaOrderResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getDelivery(
    @Param() getPizzaOrderDto: GetPizzaOrderDto,
    @Req() request: Request
  ): Promise<PizzaOrderResponse> {
    const token = request.headers.authorization.split(' ')[1];
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

  @ApiAuthorizedOnly()
  @Put('/orders/cancel')
  @ApiOperation({ summary: 'Отменить заказ' })
  @ApiResponse({
    status: 200,
    description: 'order cancel',
    type: BaseResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async cancelPizzaOrder(@Body() cancelPizzaOrderDto: CancelPizzaOrderDto): Promise<BaseResponse> {
    const order = await this.pizzaOrderService.findOne({ _id: cancelPizzaOrderDto.orderId });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Заказ не найден'));
    }

    if (order.status > PizzaStatus.IN_PROCESSING) {
      throw new BadRequestException(this.wrapFail('Заказ нельзя отменить'));
    }

    await this.pizzaOrderService.updateOne(
      { _id: cancelPizzaOrderDto.orderId },
      { $set: { status: PizzaStatus.CANCELED } }
    );

    return this.wrapSuccess();
  }
}
