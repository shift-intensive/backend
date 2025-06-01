import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PizzaOrderModule } from '@/modules/pizza/modules';
import { UsersModule } from '@/modules/users';
import { AuthModule } from '@/utils/services';

import { PizzaController } from './pizza.controller';
import { PizzaMutation } from './pizza.mutation';
import { PizzaQuery } from './pizza.query';
import { PizzaService } from './pizza.service';

@Module({
  controllers: [PizzaController],
  imports: [AuthModule, PizzaOrderModule, UsersModule, ScheduleModule.forRoot()],
  providers: [PizzaQuery, PizzaMutation, PizzaService],
  exports: []
})
export class PizzaModule {}
