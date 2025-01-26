import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { DeliveryOrderDocument } from './delivery-order.entity';

import { DeliveryOrder } from './delivery-order.entity';

@Injectable()
export class DeliveryOrderService extends BaseService<DeliveryOrderDocument> {
  constructor(
    @InjectModel(DeliveryOrder.name) private DeliveryOrderModel: Model<DeliveryOrderDocument>
  ) {
    super(DeliveryOrderModel);
  }
}
