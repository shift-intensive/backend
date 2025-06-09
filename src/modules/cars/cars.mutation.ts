import { BadRequestException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { GqlAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver, BaseResponse } from '@/utils/services';

import type { User } from '../users';

import { UsersService } from '../users';
import { CARS } from './constants';
import { CancelCarRentDto, CreateRentDto } from './dto';
import { CarRent, CarRentService, CarRentStatus } from './modules';

@Resolver('🏎️ cars mutation')
export class CarsMutation extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly carRentService: CarRentService
  ) {
    super();
  }

  @GqlAuthorizedOnly()
  @Mutation(() => CarRent)
  async createCarRent(
    @Args() createCarRentDto: CreateRentDto,
    @Context() context: { req: Request }
  ): Promise<CarRent> {
    const token = context.req.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const { phone } = createCarRentDto;

    const startDate = new Date(Number(createCarRentDto.startDate));
    const endDate = new Date(Number(createCarRentDto.endDate));

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      throw new BadRequestException(
        this.wrapFail('Даты должна быть переданы в формате timestamp (миллисекунды)')
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      throw new BadRequestException(
        this.wrapFail('Дата начала аренды не может быть раньше сегодняшнего дня')
      );
    }

    const rentalDurationMs = endDate.getTime() - startDate.getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    if (rentalDurationMs % oneDayMs !== 0) {
      throw new BadRequestException(this.wrapFail('Аренда может быть только полными днями'));
    }

    const rentalDays = rentalDurationMs / oneDayMs;

    const car = CARS.find((car) => car.id === createCarRentDto.carId);

    if (!car) {
      throw new BadRequestException(this.wrapFail('Автомобиль не найден'));
    }

    if (rentalDays < car.minRentalDays) {
      throw new BadRequestException(
        this.wrapFail(
          `Минимальное количество дней аренды для данного автомобиля — ${car.minRentalDays}`
        )
      );
    }

    const overlappingRents = await this.carRentService.find({
      carId: createCarRentDto.carId,
      status: CarRentStatus.BOOKED,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate }
    });

    if (overlappingRents.length) {
      throw new BadRequestException(
        this.wrapFail('Выбранные даты пересекаются с уже существующей арендой')
      );
    }

    const carRent = await this.carRentService.create({
      ...createCarRentDto,
      status: CarRentStatus.BOOKED
    });

    let user = await this.usersService.findOne({ phone });

    if (!user) {
      user = await this.usersService.create({ phone });
    }

    await this.usersService.findOneAndUpdate(
      { phone: user.phone },
      {
        $set: {
          firstname: createCarRentDto.firstName,
          lastname: createCarRentDto.lastName,
          middlename: createCarRentDto.middleName
        }
      }
    );

    return carRent;
  }

  @GqlAuthorizedOnly()
  @Mutation(() => BaseResponse)
  async cancelCarRent(
    @Args() cancelCarRentDto: CancelCarRentDto,
    @Context() context: { req: Request }
  ): Promise<BaseResponse> {
    const token = context.req.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const order = await this.carRentService.findOne({
      _id: cancelCarRentDto.carRentId
    });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Аренда не найдена'));
    }

    await this.carRentService.updateOne(
      { _id: cancelCarRentDto.carRentId },
      { $set: { status: CarRentStatus.CANCELLED } }
    );

    return this.wrapSuccess();
  }
}
