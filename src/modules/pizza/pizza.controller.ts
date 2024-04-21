import { Controller, Get, Post } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { pizzas } from '@/modules/pizza/constants/pizzas';
import { CreatePizzaPaymentDto } from '@/modules/pizza/dto/create-pizza-payment.dto';
import { PizzaStatus } from '@/modules/pizza/modules/pizza-order/pizza-order.entity';
import { PizzaOrderService } from '@/modules/pizza/modules/pizza-order/pizza-order.service';
import { CatalogResponse, PaymentResponse } from '@/modules/pizza/pizza.model';
import { UsersService } from '@/modules/users';
import { AuthService, BaseResolver } from '@/utils/services';

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
    type: PaymentResponse
  })
  async createPizzaPayment(
    @Args() createPizzaPaymentDto: CreatePizzaPaymentDto
  ): Promise<PaymentResponse> {
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
}
