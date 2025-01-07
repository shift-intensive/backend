import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { PizzaOrderDocument } from './pizza-order.entity';

import { PizzaOrder, PizzaStatus } from './pizza-order.entity';

@Injectable()
export class PizzaOrderService extends BaseService<PizzaOrderDocument, PizzaOrder> {
  constructor(@InjectModel(PizzaOrder.name) private PizzaOrderModel: Model<PizzaOrderDocument>) {
    super(PizzaOrderModel);
  }

  @Cron('*/20 * * * *')
  async handleCron() {
    const orders = await this.find({
      $and: [{ status: { $ne: PizzaStatus.SUCCESS } }, { status: { $ne: PizzaStatus.CANCELED } }]
    });

    const randomOrders = orders.filter(() => Math.random() < 0.3);

    if (!randomOrders.length) return;

    await this.updateMany(
      { _id: { $in: randomOrders.map((order) => order._id) } },
      { $inc: { status: 1 }, $set: { cancellable: false } }
    );
  }
}
