import { Controller } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { CarRentService, CarRentStatus } from '@/modules/cars/modules/car-rent';
import { DeliveryOrderService, DeliveryStatus } from '@/modules/delivery/modules/delivery-order';
import { PizzaOrderService, PizzaStatus } from '@/modules/pizza/modules/pizza-order';
import { BaseResolver, PrismaService } from '@/utils/services';

import { OTP_EXPIRED_TIME, OtpsService } from '../otps';

@Controller('/cron')
export class CronController extends BaseResolver {
  constructor(
    private readonly deliveryOrderService: DeliveryOrderService,
    private readonly pizzaOrderService: PizzaOrderService,
    private readonly otpsService: OtpsService,
    private readonly prismaService: PrismaService,
    private readonly carRentService: CarRentService
  ) {
    super();
  }

  @Cron('* * * * *')
  async handleOtpCron() {
    const mongoOtps = await this.otpsService.find();
    const postgresOtps = await this.prismaService.otp.findMany();

    const mongoExpiredOtpsIds = mongoOtps
      .filter((otp) => new Date(otp.created).getTime() + OTP_EXPIRED_TIME < new Date().getTime())
      .map((otp) => otp._id);

    const postgresExpiredOtpsIds = postgresOtps
      .filter((otp) => new Date(otp.createdAt).getTime() + OTP_EXPIRED_TIME < new Date().getTime())
      .map((otp) => otp.id);

    await Promise.all([
      this.otpsService.delete({ _id: { $in: mongoExpiredOtpsIds } }),
      this.prismaService.otp.deleteMany({
        where: {
          id: { in: postgresExpiredOtpsIds }
        }
      })
    ]);

    console.log('OTP CRON:', new Date(), 'deleted', mongoExpiredOtpsIds.length);
  }

  @Cron('*/20 * * * *')
  async handlePizzaCron() {
    const orders = await this.pizzaOrderService.find({
      $and: [{ status: { $ne: PizzaStatus.SUCCESS } }, { status: { $ne: PizzaStatus.CANCELED } }]
    });

    const randomOrders = orders.filter(() => Math.random() < 0.3);

    if (!randomOrders.length) return;

    const updatedResult = await this.pizzaOrderService.updateMany(
      { _id: { $in: randomOrders.map((order) => order._id) } },
      { $inc: { status: 1 }, $set: { cancellable: false } }
    );

    console.log('PIZZA CRON:', new Date(), 'updated', updatedResult.modifiedCount);
  }

  @Cron('*/20 * * * *')
  async handleDeliveryCron() {
    const deliveries = await this.deliveryOrderService.find({
      $and: [
        { status: { $ne: DeliveryStatus.SUCCESS } },
        { status: { $ne: DeliveryStatus.CANCELED } }
      ]
    });

    const randomDeliveries = deliveries.filter(() => Math.random() < 0.3);

    if (!randomDeliveries.length) return;

    const updatedResult = await this.deliveryOrderService.updateMany(
      { _id: { $in: randomDeliveries.map((delivery) => delivery._id) } },
      { $inc: { status: 1 }, $set: { cancellable: false } }
    );

    console.log('DELIVERY CRON:', new Date(), 'updated', updatedResult.modifiedCount);
  }

  @Cron('0 0 * * *')
  async handleCarsCron() {
    const dateNow = new Date();

    const rents = await this.carRentService.find({
      $and: [{ status: { $ne: CarRentStatus.CANCELLED }, endDate: { $gt: dateNow.toISOString() } }]
    });

    if (!rents.length) return;

    const updatedResult = await this.carRentService.updateMany(
      { _id: { $in: rents.map((rent) => rent._id) } },
      { $inc: { status: CarRentStatus.CANCELLED } }
    );

    console.log('CAR RENT CRON:', new Date(), 'updated', updatedResult.modifiedCount);
  }
}
