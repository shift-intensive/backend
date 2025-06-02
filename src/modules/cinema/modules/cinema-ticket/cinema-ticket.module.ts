import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CinemaTicket, CinemaTicketSchema } from './cinema-ticket.entity';
import { CinemaTicketService } from './cinema-ticket.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CinemaTicket.name, schema: CinemaTicketSchema }])],
  providers: [CinemaTicketService],
  exports: [CinemaTicketService]
})
export class CinemaTicketModule {}
