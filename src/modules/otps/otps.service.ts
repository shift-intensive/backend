import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { OtpDocument } from './entities';

import { OTP_EXPIRED_TIME } from './constants';
import { Otp } from './entities';

@Injectable()
export class OtpsService extends BaseService<OtpDocument> {
  constructor(@InjectModel(Otp.name) private OtpModel: Model<OtpDocument>) {
    super(OtpModel);
  }

  @Cron('* */10 * * * *')
  async handleCron() {
    console.log('OTP CRON:', new Date());
    const otps = await this.find({});

    const expiredOtpsIds = otps
      .filter((otp) => new Date(otp.created).getTime() + OTP_EXPIRED_TIME < new Date().getTime())
      .map((otp) => otp._id);

    await this.delete({ _id: { $in: expiredOtpsIds } });
  }
}
