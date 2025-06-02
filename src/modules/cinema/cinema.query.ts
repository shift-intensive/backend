import { BadRequestException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { getDDMMYYFormatDate } from '@/utils/helpers';
import { AuthService, BaseResolver } from '@/utils/services';

import type { User } from '../users';

import {
  CinemaOrdersResponse,
  FilmResponse,
  FilmsResponse,
  ScheduleResponse
} from './cinema.model';
import { CinemaService } from './cinema.service';
import { GetFilmDto, GetScheduleDto } from './dto';
import { FilmHallCellType } from './entities';
import { CinemaOrderService, CinemaTicketService } from './modules';

@Resolver('🍿 cinema query')
@DescribeContext('CinemaQuery')
export class CinemaQuery extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly cinemaService: CinemaService,
    private readonly cinemaOrderService: CinemaOrderService,
    private readonly cinemaTicketService: CinemaTicketService
  ) {
    super();
  }

  @Query(() => FilmsResponse)
  getCinemaToday(): FilmsResponse {
    const films = this.cinemaService.getFilms();
    return this.wrapSuccess({ films });
  }

  @Query(() => FilmResponse)
  getFilm(@Args() getFilmDto: GetFilmDto): FilmResponse {
    const film = this.cinemaService.getFilm(getFilmDto.filmId);
    return this.wrapSuccess({ film });
  }

  @Query(() => ScheduleResponse)
  async getFilmSchedule(@Args() getScheduleDto: GetScheduleDto): Promise<ScheduleResponse> {
    const filmSchedule = this.cinemaService.getFilmSchedule(getScheduleDto.filmId);
    const tickets = await this.cinemaTicketService.find({ filmId: getScheduleDto.filmId });

    const updatedFilmSchedule = filmSchedule.reduce(
      (acc, schedule, index) => {
        const formattedDate = getDDMMYYFormatDate(index);

        const seances = schedule.map((seance) => {
          const updatedPlaces = structuredClone(seance.hall.places);
          const payedTickets = tickets.filter(
            (ticket) =>
              ticket.seance.date === formattedDate &&
              ticket.seance.time === seance.time &&
              ticket.filmId === getScheduleDto.filmId
          );

          if (payedTickets.length) {
            payedTickets.forEach((ticket) => {
              updatedPlaces[ticket.row - 1][ticket.column - 1].type = FilmHallCellType.PAYED;
            });
          }

          return { ...seance, hall: { ...seance.hall, places: updatedPlaces } };
        });

        acc.push({ date: formattedDate, seances });

        return acc;
      },
      [] as ScheduleResponse['schedules']
    );

    return this.wrapSuccess({ schedules: updatedFilmSchedule });
  }

  @GqlAuthorizedOnly()
  @Query(() => CinemaOrdersResponse)
  async getCinemaOrders(@Args('token') token: string): Promise<CinemaOrdersResponse> {
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const orders = await this.cinemaOrderService.find({
      'person.phone': decodedJwtAccessToken.phone
    });

    return this.wrapSuccess({ orders });
  }
}
