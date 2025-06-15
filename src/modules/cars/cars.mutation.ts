import { BadRequestException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { GqlAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver, BaseResponse } from '@/utils/services';

import type { User } from '../users';

import { UsersService } from '../users';
import { CarRentResponse } from './cars.model';
import { CarsService } from './cars.service';
import { CancelCarRentDto, CreateRentDto } from './dto';
import { CarRentService, CarRentStatus } from './modules';

@Resolver('🏎️ cars mutation')
export class CarsMutation extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly carRentService: CarRentService,
    private readonly carsService: CarsService
  ) {
    super();
  }

  @Mutation(() => CarRentResponse)
  async createCarRent(@Args() createCarRentDto: CreateRentDto): Promise<CarRentResponse> {
    const { phone } = createCarRentDto;

    const startDate = new Date(Number(createCarRentDto.startDate));
    const endDate = new Date(Number(createCarRentDto.endDate));

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      throw new BadRequestException(
        this.wrapFail('Дата начала аренды не может быть раньше сегодняшнего дня')
      );
    }

    const rentalDurationMs = endDate.getTime() - startDate.getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const rentalDays = rentalDurationMs / oneDayMs + 1;
    if (rentalDays < 1) {
      throw new BadRequestException(this.wrapFail('Аренда должна быть минимум 1 день'));
    }

    const car = this.carsService.getCar(createCarRentDto.carId);

    if (!car) {
      throw new BadRequestException(this.wrapFail('Автомобиль не найден'));
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

    let user = await this.usersService.findOne({ phone });

    if (!user) {
      user = await this.usersService.create({ phone });
    }

    await this.carRentService.updateMany(
      {
        phone: user.phone,
        status: CarRentStatus.BOOKED
      },
      {
        $set: { status: CarRentStatus.CANCELLED }
      }
    );

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

    const rent = await this.carRentService.create({
      ...createCarRentDto,
      carId: undefined,
      status: CarRentStatus.BOOKED,
      totalPrice: rentalDays * car.price,
      carInfo: car
    });

    return this.wrapSuccess({ rent });
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
