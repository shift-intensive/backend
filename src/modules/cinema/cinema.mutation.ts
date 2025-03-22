import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UsersService } from '@/modules/users';
import { DescribeContext } from '@/utils/decorators';
import { GqlAuthorizedOnly } from '@/utils/guards';
import { BaseResolver, BaseResponse } from '@/utils/services';

import { PaymentResponse } from './cinema.model';
import { CinemaService } from './cinema.service';
import { CancelCinemaOrderDto, CreateCinemaPaymentDto } from './dto';
import { FilmTicketStatus, Ticket } from './entities';
import { CinemaOrderService, CinemaOrderStatus } from './modules';

@Resolver('📦 cinema mutation')
@DescribeContext('CinemaMutation')
@Resolver(() => Ticket)
export class CinemaMutation extends BaseResolver {
  constructor(
    private readonly cinemaService: CinemaService,
    private readonly cinemaOrderService: CinemaOrderService,
    private readonly usersService: UsersService
  ) {
    super();
  }

  @GqlAuthorizedOnly()
  @Mutation(() => BaseResponse)
  async cancelCinemaOrder(
    @Args() cancelCinemaOrderDto: CancelCinemaOrderDto
  ): Promise<BaseResponse> {
    const order = await this.cinemaOrderService.findOne({ _id: cancelCinemaOrderDto.orderId });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Заказ не найден'));
    }

    if (order.status !== CinemaOrderStatus.PAYED) {
      throw new BadRequestException(this.wrapFail('Заказ нельзя отменить'));
    }

    await this.cinemaService.updateMany(
      { _id: { $in: order.tickets.map((ticket) => ticket._id) } },
      { $set: { status: FilmTicketStatus.CANCELED } }
    );

    const updatedTickets = await this.cinemaService.find({
      _id: { $in: order.tickets.map((ticket) => ticket._id) }
    });

    await this.cinemaOrderService.updateOne(
      { _id: cancelCinemaOrderDto.orderId },
      { $set: { status: CinemaOrderStatus.CANCELED, tickets: updatedTickets } }
    );

    return this.wrapSuccess();
  }

  @Mutation(() => PaymentResponse)
  async createCinemaPayment(
    @Args() createCinemaPaymentDto: CreateCinemaPaymentDto
  ): Promise<PaymentResponse> {
    const { person } = createCinemaPaymentDto;

    const formattedTickets = createCinemaPaymentDto.tickets.map((ticket) => ({
      filmId: createCinemaPaymentDto.filmId,
      seance: createCinemaPaymentDto.seance,
      phone: createCinemaPaymentDto.person.phone,
      row: ticket.row,
      column: ticket.column,
      status: FilmTicketStatus.PAYED
    }));

    const existedTickets = [];
    await Promise.all(
      formattedTickets.map(async (ticket) => {
        const existedTicket = await this.cinemaService.findOne({
          'seance.date': ticket.seance.date,
          'seance.time': ticket.seance.time,
          row: ticket.row,
          column: ticket.column,
          status: ticket.status
        });

        if (existedTicket) {
          existedTickets.push(ticket);
        }
      })
    );

    if (existedTickets.length) {
      throw new BadRequestException(
        this.wrapFail(
          `Данные билеты уже куплены: ${existedTickets
            .map(
              (ticket, index) =>
                `${index + 1}. ${ticket.seance.date} ${ticket.seance.time} ${ticket.row} ${
                  ticket.column
                }`
            )
            .join(' ')}`,
          {
            tickets: existedTickets.map((ticket) => ({
              seance: ticket.seance,
              row: ticket.row,
              column: ticket.column,
              status: ticket.status
            }))
          }
        )
      );
    }

    const tickets = await this.cinemaService.insertMany(formattedTickets);
    const filmName = this.cinemaService.getFilmName(createCinemaPaymentDto.filmId);

    const orderNumber = Math.floor(Math.random() * 10 ** 6);
    const order = await this.cinemaOrderService.create({
      filmName,
      orderNumber,
      tickets,
      person,
      status: CinemaOrderStatus.PAYED
    });

    let user = await this.usersService.findOne({ phone: person.phone });

    if (!user) {
      user = await this.usersService.create({ phone: person.phone });
    }

    await this.usersService.findOneAndUpdate(
      { phone: user.phone },
      {
        $set: {
          firstname: person.firstname,
          lastname: person.lastname,
          middlename: person.middlename
        }
      }
    );

    return this.wrapSuccess({ order });
  }
}
