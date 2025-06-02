import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/services';

import type { CinemaTicketDocument } from './cinema-ticket.entity';

import { CinemaTicket } from './cinema-ticket.entity';

@Injectable()
export class CinemaTicketService extends BaseService<CinemaTicketDocument> {
  constructor(
    @InjectModel(CinemaTicket.name) private CinemaTicketModel: Model<CinemaTicketDocument>
  ) {
    super(CinemaTicketModel);
  }
}
