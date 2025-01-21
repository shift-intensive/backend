import { Module } from '@nestjs/common';

import { OtpsModule } from '@/modules/otps';
import { AuthModule, PrismaService } from '@/utils/services';

import { UsersModule } from '../users';
import { TesterController } from './tester.controller';

@Module({
  controllers: [TesterController],
  imports: [UsersModule, OtpsModule, AuthModule],
  providers: [PrismaService]
})
export class TesterModule {}
