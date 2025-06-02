import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CarsRent, CarsRentSchema } from './cars-rent.entity';
import { CarsRentService } from './cars-rent.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CarsRent.name, schema: CarsRentSchema }])],
  providers: [CarsRentService],
  exports: [CarsRentService]
})
export class CarsRentModule {}
