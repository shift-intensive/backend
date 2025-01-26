import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { PizzaOrderDocument } from './pizza-order.entity';

import { PizzaOrder } from './pizza-order.entity';

@Injectable()
export class PizzaOrderService extends BaseService<PizzaOrderDocument> {
  constructor(@InjectModel(PizzaOrder.name) private PizzaOrderModel: Model<PizzaOrderDocument>) {
    super(PizzaOrderModel);
  }
}
