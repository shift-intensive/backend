import { Module } from '@nestjs/common';

import { OtpsModule } from '@/modules/otps';
import { UsersModule } from '@/modules/users';
import { AuthModule, PrismaService } from '@/utils/services';

import { TesterController } from './tester.controller';

@Module({
  controllers: [TesterController],
  imports: [UsersModule, OtpsModule, AuthModule],
  providers: [PrismaService]
})
export class TesterModule {}
