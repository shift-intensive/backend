import { BadRequestException, Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import type { User } from '@/modules/users';

import { UsersService } from '@/modules/users';
import { ApiAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver, BaseResponse } from '@/utils/services';

import { CancelPizzaOrderDto, CreatePizzaPaymentDto, GetPizzaOrderDto } from './dto';
import { PizzaOrderService, PizzaStatus } from './modules/pizza-order';
import {
  PizzaOrderResponse,
  PizzaOrdersResponse,
  PizzaPaymentResponse,
  PizzasResponse
} from './pizza.model';
import { PizzaService } from './pizza.service';

@ApiTags('🍕 pizza')
@Controller('/pizza')
export class PizzaController extends BaseResolver {
  constructor(
    private readonly pizzaService: PizzaService,
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
    type: PizzasResponse
  })
  getPizzasCatalog(): PizzasResponse {
    return this.wrapSuccess({ catalog: this.pizzaService.getPizzas() });
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
    const { person, receiverAddress } = createPizzaPaymentDto;

    const { pizzas, totalPrice } = createPizzaPaymentDto.pizzas.reduce(
      (acc, orderedPizza) => {
        const pizza = this.pizzaService.getPizza(orderedPizza.id);

        const toppingPrice = pizza.toppings.reduce((acc, topping) => acc + topping.price, 0);
        const doughPrice = pizza.doughs.find((dough) => dough.type === orderedPizza.dough).price;
        const sizePrice = pizza.sizes.find((size) => size.type === orderedPizza.size).price;
        const totalPrice = toppingPrice + doughPrice + sizePrice;

        acc.pizzas.push({ ...pizza, totalPrice });
        acc.totalPrice += totalPrice;

        return acc;
      },
      { pizzas: [], totalPrice: 0 }
    );

    const order = await this.pizzaOrderService.create({
      pizzas,
      person,
      receiverAddress,
      status: PizzaStatus.IN_PROCESSING,
      cancellable: true,
      totalPrice
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
  async getPizzaOrders(@Req() request: Request): Promise<PizzaOrdersResponse> {
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
  async getPizzaOrder(
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
