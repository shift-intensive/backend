import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PizzaOrderModule } from '@/modules/pizza/modules';
import { UsersModule } from '@/modules/users';
import { AuthModule } from '@/utils/services';

import { PizzaController } from './pizza.controller';

@Module({
  controllers: [PizzaController],
  imports: [AuthModule, PizzaOrderModule, UsersModule, ScheduleModule.forRoot()],
  // providers: [DeliveryQuery, DeliveryMutation],
  providers: [],
  exports: []
})
export class PizzaModule {}
