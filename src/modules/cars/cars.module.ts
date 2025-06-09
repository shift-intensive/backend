import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { UsersModule } from '@/modules/users';
import { AuthModule } from '@/utils/services';

import { CarsController } from './cars.controller';
import { CarsQuery } from './cars.query';
import { CarsService } from './cars.service';
import { CarRentModule } from './modules';

@Module({
  controllers: [CarsController],
  imports: [AuthModule, UsersModule, CarRentModule, ScheduleModule.forRoot()],
  providers: [CarsQuery, CarsService],
  exports: []
})
export class CarsModule {}
