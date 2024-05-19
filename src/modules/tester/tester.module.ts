import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Otp, OtpSchema, OtpsModule } from '@/modules/otps';

import { TesterController } from './tester.controller';

@Module({
  controllers: [TesterController],
  imports: [OtpsModule, MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }])]
})
export class TesterModule {}
