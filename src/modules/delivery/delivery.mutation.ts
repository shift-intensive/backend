import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'node:crypto';

import { UsersService } from '@/modules/users';
import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { getDistance } from '@/utils/helpers';
import { BaseResolver, BaseResponse } from '@/utils/services';

import type { DeliveryOption } from './entities';

import { CalculateDeliveryResponse, DeliverResponse } from './delivery.model';
import { CalculateDeliveryDto, CancelDeliveryOrderDto, CreateDeliveryOrderDto } from './dto';
import { DeliveryOptionType } from './entities';
import { DeliveryOrderService, DeliveryStatus } from './modules';

@Resolver('📦 delivery mutation')
@DescribeContext('DeliveryMutation')
@Resolver()
export class DeliveryMutation extends BaseResolver {
  constructor(
    private readonly deliveryOrderService: DeliveryOrderService,
    private readonly usersService: UsersService
  ) {
    super();
  }

  @GqlAuthorizedOnly()
  @Mutation(() => BaseResponse)
  async cancelDeliveryOrder(
    @Args() cancelDeliveryOrderDto: CancelDeliveryOrderDto
  ): Promise<BaseResponse> {
    const order = await this.deliveryOrderService.findOne({ _id: cancelDeliveryOrderDto.orderId });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Доставка не найдена'));
    }

    if (order.status > DeliveryStatus.IN_PROCESSING) {
      throw new BadRequestException(this.wrapFail('Доставка нельзя отменить'));
    }

    await this.deliveryOrderService.updateOne(
      { _id: cancelDeliveryOrderDto.orderId },
      { $set: { status: DeliveryStatus.CANCELED } }
    );

    return this.wrapSuccess();
  }

  @Mutation(() => DeliverResponse)
  async createDeliveryOrder(
    @Args() createDeliveryOrderDto: CreateDeliveryOrderDto
  ): Promise<DeliverResponse> {
    const { sender } = createDeliveryOrderDto;

    const order = await this.deliveryOrderService.create({
      ...createDeliveryOrderDto,
      status: DeliveryStatus.IN_PROCESSING,
      cancellable: true
    });

    let user = await this.usersService.findOne({ phone: sender.phone });

    if (!user) {
      user = await this.usersService.create({ phone: sender.phone });
    }

    await this.usersService.findOneAndUpdate(
      { phone: user.phone },
      {
        $set: {
          firstname: sender.firstname,
          lastname: sender.lastname,
          middlename: sender.middlename
        }
      }
    );

    return this.wrapSuccess({ order });
  }

  @Mutation(() => CalculateDeliveryResponse)
  async calculateDelivery(
    @Args() calculateDeliveryDto: CalculateDeliveryDto
  ): Promise<CalculateDeliveryResponse> {
    const distancePrice = getDistance(
      calculateDeliveryDto.receiverPoint.latitude,
      calculateDeliveryDto.receiverPoint.longitude,
      calculateDeliveryDto.senderPoint.latitude,
      calculateDeliveryDto.senderPoint.longitude
    );

    const sizeWeightPrice =
      (calculateDeliveryDto.package.length *
        calculateDeliveryDto.package.weight *
        calculateDeliveryDto.package.height *
        calculateDeliveryDto.package.width) /
      10000;

    const price = Math.round((distancePrice + sizeWeightPrice) * 100);
    const days = Math.floor(Math.random() * 7) + 2;
    const options: DeliveryOption[] = [
      {
        id: randomUUID(),
        days,
        price,
        name: 'стандартная доставка',
        type: DeliveryOptionType.DEFAULT
      },
      {
        id: randomUUID(),
        price: price * 2,
        days: Math.floor(days / 2),
        name: 'экспресс доставка',
        type: DeliveryOptionType.EXPRESS
      }
    ];

    return this.wrapSuccess({ options });
  }
}
