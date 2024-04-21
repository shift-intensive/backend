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

  @Cron('0 0 */5 * * *')
  async handleCron() {
    const deliveries = await this.find({
      $and: [{ status: { $ne: PizzaStatus.SUCCESS } }, { status: { $ne: PizzaStatus.CANCELED } }]
    });

    const randomDeliveries = deliveries.filter(() => Math.random() < 0.3);

    if (!randomDeliveries.length) return;

    await this.updateMany(
      { _id: { $in: randomDeliveries.map((delivery) => delivery._id) } },
      { $inc: { status: 1, cancellable: false } }
    );
  }
}
