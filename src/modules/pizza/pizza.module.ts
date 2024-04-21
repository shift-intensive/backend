import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { UsersModule } from '@/modules/users';
import { AuthModule } from '@/utils/services';

import { PizzaOrderModule } from './modules/pizza-order/pizza-order.module';
import { PizzaController } from './pizza.controller';

@Module({
  controllers: [PizzaController],
  imports: [AuthModule, PizzaOrderModule, UsersModule, ScheduleModule.forRoot()],
  // providers: [DeliveryQuery, DeliveryMutation],
  providers: [],
  exports: []
})
export class PizzaModule {}
