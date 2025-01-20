import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { DeliveryOrderDocument } from './delivery-order.entity';

import { DeliveryOrder, DeliveryStatus } from './delivery-order.entity';

@Injectable()
export class DeliveryOrderService extends BaseService<DeliveryOrderDocument> {
  constructor(
    @InjectModel(DeliveryOrder.name) private DeliveryOrderModel: Model<DeliveryOrderDocument>
  ) {
    super(DeliveryOrderModel);
  }

  @Cron('*/20 * * * *')
  async handleCron() {
    console.log('DELIVERY CRON:', new Date());
    const deliveries = await this.find({
      $and: [
        { status: { $ne: DeliveryStatus.SUCCESS } },
        { status: { $ne: DeliveryStatus.CANCELED } }
      ]
    });

    const randomDeliveries = deliveries.filter(() => Math.random() < 0.3);

    if (!randomDeliveries.length) return;

    await this.updateMany(
      { _id: { $in: randomDeliveries.map((delivery) => delivery._id) } },
      { $inc: { status: 1 }, $set: { cancellable: false } }
    );
  }
}
