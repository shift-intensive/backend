import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { CarRentDocument } from './car-rent.entity';

import { CarRent } from './car-rent.entity';

@Injectable()
export class CarRentService extends BaseService<CarRentDocument> {
  constructor(@InjectModel(CarRent.name) private CarRentModel: Model<CarRentDocument>) {
    super(CarRentModel);
  }
}
