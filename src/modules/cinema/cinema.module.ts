import { Module } from '@nestjs/common';

import { UsersModule } from '@/modules/users';
import { AuthModule } from '@/utils/services';

import { CinemaController } from './cinema.controller';
import { CinemaMutation } from './cinema.mutation';
import { CinemaQuery } from './cinema.query';
import { CinemaService } from './cinema.service';
import { CinemaOrderModule, CinemaTicketModule } from './modules';

@Module({
  controllers: [CinemaController],
  imports: [AuthModule, UsersModule, CinemaOrderModule, CinemaTicketModule],
  providers: [CinemaService, CinemaMutation, CinemaQuery],
  exports: []
})
export class CinemaModule {}
