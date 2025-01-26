import { Module } from '@nestjs/common';

import { DeliveryOrderModule } from '@/modules/delivery';
import { OtpsModule } from '@/modules/otps';
import { PizzaOrderModule } from '@/modules/pizza';
import { PrismaService } from '@/utils/services';

import { CronController } from './cron.controller';

@Module({
  controllers: [CronController],
  imports: [OtpsModule, PizzaOrderModule, DeliveryOrderModule],
  providers: [PrismaService]
})
export class CronModule {}
