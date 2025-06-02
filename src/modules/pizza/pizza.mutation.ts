import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UsersService } from '@/modules/users';
import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { BaseResolver, BaseResponse } from '@/utils/services';

import { CancelPizzaOrderDto, CreatePizzaPaymentDto } from './dto';
import { PizzaOrderService, PizzaStatus } from './modules/pizza-order';
import { PizzaPaymentResponse } from './pizza.model';
import { PizzaService } from './pizza.service';

@Resolver('🍕 pizza mutation')
@DescribeContext('PizzaMutation')
@Resolver()
export class PizzaMutation extends BaseResolver {
  constructor(
    private readonly pizzaService: PizzaService,
    private readonly pizzaOrderService: PizzaOrderService,
    private readonly usersService: UsersService
  ) {
    super();
  }

  @GqlAuthorizedOnly()
  @Mutation(() => BaseResponse)
  async cancelPizzaOrder(@Args() cancelPizzaOrderDto: CancelPizzaOrderDto): Promise<BaseResponse> {
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

  @Mutation(() => PizzaPaymentResponse)
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
}
