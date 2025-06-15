import { BadRequestException } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { GqlAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver } from '@/utils/services';

import type { User } from '../users';

import { UsersService } from '../users';
import { CarRentsResponse, CarResponse, CarsPaginatedResponse } from './cars.model';
import { CarsService } from './cars.service';
import { GetCarDto, GetCarRentDto, GetCarsFilterDto } from './dto';
import { CarRentService, CarRentStatus } from './modules';

@Resolver('🏎️ cars query')
export class CarsQuery extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly carRentService: CarRentService,
    private readonly carsService: CarsService
  ) {
    super();
  }

  @Query(() => CarsPaginatedResponse)
  getCars(@Args() getCarsQuery: GetCarsFilterDto): CarsPaginatedResponse {
    const filteredCars = this.carsService.getFilteredCars({ filters: getCarsQuery });
    const paginatedCars = this.carsService.getPagination({
      items: filteredCars,
      page: getCarsQuery.page,
      limit: getCarsQuery.limit
    });

    return this.wrapSuccess(paginatedCars);
  }

  @Query(() => CarResponse)
  async getCar(@Args() getCarDto: GetCarDto): Promise<CarResponse> {
    const car = this.carsService.getCar(getCarDto.carId);

    if (!car) {
      throw new BadRequestException(this.wrapFail('Автомобиль не найден'));
    }

    const carRents = await this.carRentService.find({
      carId: getCarDto.carId,
      status: CarRentStatus.BOOKED
    });

    const rents = carRents.map((rent) => ({
      startDate: new Date(rent.startDate).getTime(),
      endDate: new Date(rent.endDate).getTime()
    }));

    return this.wrapSuccess({
      data: { ...car, rents }
    });
  }

  @GqlAuthorizedOnly()
  @Query(() => CarRentsResponse)
  async getCarRents(@Context() context: { req: Request }): Promise<CarRentsResponse> {
    const token = context.req.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const rents = await this.carRentService.find({
      phone: decodedJwtAccessToken.phone
    });

    return this.wrapSuccess({ rents });
  }

  @GqlAuthorizedOnly()
  @Query(() => CarResponse)
  async getCarRent(@Args() getCarRentDto: GetCarRentDto, @Context() context: { req: Request }) {
    const token = context.req.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const rent = await this.carRentService.findOne({
      _id: getCarRentDto.carRentId
    });

    if (!rent) {
      throw new BadRequestException(this.wrapFail('Аренда не найдена'));
    }

    return this.wrapSuccess({ rent });
  }
}
