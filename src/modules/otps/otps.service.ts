import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { OtpDocument } from './entities';

import { Otp } from './entities';

@Injectable()
export class OtpsService extends BaseService<OtpDocument> {
  constructor(@InjectModel(Otp.name) private OtpModel: Model<OtpDocument>) {
    super(OtpModel);
  }
}
