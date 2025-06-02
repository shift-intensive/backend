import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { CarsRentDocument } from './cars-rent.entity';

import { CarsRent } from './cars-rent.entity';

@Injectable()
export class CarsRentService extends BaseService<CarsRentDocument> {
  constructor(@InjectModel(CarsRent.name) private CarsRentModel: Model<CarsRentDocument>) {
    super(CarsRentModel);
  }
}
