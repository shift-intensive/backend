import { Module } from '@nestjs/common';

import { AndroidSampleController } from './android-sample.controller';

@Module({
  controllers: [AndroidSampleController]
})
export class AndroidSampleModule {}
