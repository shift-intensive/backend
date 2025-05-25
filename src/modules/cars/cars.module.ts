import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { UsersModule } from '@/modules/users';
import { AuthModule } from '@/utils/services';

import { CarsController } from './cars.controller';
import { CarsQuery } from './cars.query';

@Module({
  controllers: [CarsController],
  imports: [AuthModule, UsersModule, ScheduleModule.forRoot()],
  providers: [CarsQuery],
  exports: []
})
export class CarsModule {}
