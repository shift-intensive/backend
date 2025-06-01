import { BadRequestException, Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { randomUUID } from 'node:crypto';

import { ApiAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver, BaseResponse } from '@/utils/services';

import type { User } from '../users';
import type { DeliveryOption } from './entities';

import { UsersService } from '../users';
import {
  CalculateDeliveryResponse,
  DeliverResponse,
  DeliveryOrderResponse,
  DeliveryOrdersResponse,
  DeliveryPackageTypesResponse,
  DeliveryPointsResponse
} from './delivery.model';
import { DeliveryService } from './delivery.service';
import {
  CalculateDeliveryDto,
  CancelDeliveryOrderDto,
  CreateDeliveryOrderDto,
  GetDeliveryOrderDto
} from './dto';
import { DeliveryOptionType } from './entities';
import { calculateDelivery } from './helpers';
import { DeliveryOrderService, DeliveryStatus } from './modules';

@ApiTags('📦 delivery')
@Controller('/delivery')
export class DeliveryController extends BaseResolver {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly deliveryOrderService: DeliveryOrderService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
    super();
  }

  @Get('/points')
  @ApiOperation({ summary: 'Получить пункты выдачи' })
  @ApiResponse({
    status: 200,
    description: 'points',
    type: DeliveryPointsResponse
  })
  getPoints(): DeliveryPointsResponse {
    return this.wrapSuccess({ points: this.deliveryService.getDeliveryPoints() });
  }

  @Get('/package/types')
  @ApiOperation({ summary: 'Получить типы посылок' })
  @ApiResponse({
    status: 200,
    description: 'package types',
    type: DeliveryPackageTypesResponse
  })
  getPackageTypes(): DeliveryPackageTypesResponse {
    return this.wrapSuccess({ packages: this.deliveryService.getDeliveryPackageTypes() });
  }

  @Post('/calc')
  @ApiOperation({ summary: 'Расчет доставки' })
  @ApiResponse({
    status: 200,
    description: 'calc',
    type: CalculateDeliveryResponse
  })
  async calculateDelivery(
    @Body() calculateDeliveryDto: CalculateDeliveryDto
  ): Promise<CalculateDeliveryResponse> {
    const price = calculateDelivery({
      senderPointCoordinates: calculateDeliveryDto.senderPoint,
      receiverPointCoordinates: calculateDeliveryDto.receiverPoint,
      packageData: calculateDeliveryDto.package
    });

    const days = Math.floor(Math.random() * 7) + 2;

    const options: DeliveryOption[] = [
      {
        id: randomUUID(),
        days,
        price,
        name: 'Стандартная доставка',
        type: DeliveryOptionType.DEFAULT
      },
      {
        id: randomUUID(),
        price: price * 2,
        days: Math.floor(days / 2),
        name: 'Эксперсс доставка',
        type: DeliveryOptionType.EXPRESS
      }
    ];

    return this.wrapSuccess({ options });
  }

  @Post('/order')
  @ApiOperation({ summary: 'Создание заявки доставки' })
  @ApiResponse({
    status: 200,
    description: 'order',
    type: DeliverResponse
  })
  async createOrder(
    @Body() createDeliveryOrderDto: CreateDeliveryOrderDto
  ): Promise<DeliverResponse> {
    const { sender, senderPointId, receiverPointId, receiver, optionType } = createDeliveryOrderDto;

    const senderPoint = this.deliveryService.getDeliveryPoint(senderPointId);
    const receiverPoint = this.deliveryService.getDeliveryPoint(receiverPointId);
    const packageType = this.deliveryService.getDeliveryPackageType(
      createDeliveryOrderDto.packageId
    );

    if (!senderPoint || !receiverPoint || !packageType) {
      throw new BadRequestException(this.wrapFail('Некорректные данные'));
    }

    let price = calculateDelivery({
      senderPointCoordinates: senderPoint,
      receiverPointCoordinates: receiverPoint,
      packageData: packageType
    });

    if (createDeliveryOrderDto.optionType === DeliveryOptionType.EXPRESS) {
      price *= 2;
    }

    const order = await this.deliveryOrderService.create({
      price,
      option: optionType,
      package: packageType,
      senderPoint,
      receiverPoint,
      sender,
      receiver,
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

  @ApiAuthorizedOnly()
  @Get('/orders')
  @ApiOperation({ summary: 'Получить все заявки на доставку' })
  @ApiResponse({
    status: 200,
    description: 'orders',
    type: DeliveryOrdersResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getDeliveries(@Req() request: Request): Promise<DeliveryOrdersResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const orders = await this.deliveryOrderService.find({
      $or: [
        { 'sender.phone': decodedJwtAccessToken.phone },
        { 'receiver.phone': decodedJwtAccessToken.phone }
      ]
    });

    return this.wrapSuccess({ orders });
  }

  @ApiAuthorizedOnly()
  @Get('/orders/:orderId')
  @ApiOperation({ summary: 'Получить заявку на доставку' })
  @ApiResponse({
    status: 200,
    description: 'order',
    type: DeliveryOrderResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getDelivery(
    @Param() getDeliveryOrderDto: GetDeliveryOrderDto,
    @Req() request: Request
  ): Promise<DeliveryOrderResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const order = await this.deliveryOrderService.findOne({
      _id: getDeliveryOrderDto.orderId,
      $or: [
        { 'sender.phone': decodedJwtAccessToken.phone },
        { 'receiver.phone': decodedJwtAccessToken.phone }
      ]
    });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Заказ не найден'));
    }

    return this.wrapSuccess({ order });
  }

  @ApiAuthorizedOnly()
  @Put('/orders/cancel')
  @ApiOperation({ summary: 'Отменить доставку' })
  @ApiResponse({
    status: 200,
    description: 'order cancel',
    type: BaseResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async cancelDeliveryOrder(
    @Body() cancelDeliveryOrderDto: CancelDeliveryOrderDto
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
}
