import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Request } from 'express';

import { ApiAuthorizedOnly } from '@/utils/guards';
import { AuthService, BaseResolver, BaseResponse } from '@/utils/services';

import type { User } from '../users';

import { UsersService } from '../users';
import { CarsPaginatedResponse, CarsRentsResponse } from './cars.model';
import { cars } from './constants';
import { BodyType, Brand, Color, Transmission } from './constants/enums';
import { CancelCarsRentDto, GetCarDto } from './dto';
import { Car, CreateRent } from './entities';
import { getFilteredCars } from './helpers';
import { CarsRent, CarsRentService, CarsRentStatus } from './modules';

export interface CarFilters {
  bodyType?: BodyType;
  brand?: Brand;
  color: Color;
  endDate?: string;
  limit?: number;
  maxPrice?: number;
  minPrice?: number;
  page?: number;
  search?: string;
  startDate?: string;
  steering?: 'left' | 'right';
  transmission?: Transmission;
  // сомневаюсь насчет дат аренды
}

@ApiTags('🏎️ cars')
@Controller('/cars')
export class CarsController extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly carsRentService: CarsRentService
  ) {
    super();
  }

  @Get('/')
  @ApiOperation({ summary: 'Получить все автомобили' })
  @ApiResponse({
    status: 200,
    type: CarsPaginatedResponse
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Номер текущей страницы (по умолчанию 1)'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Количество элементов на странице (по умолчанию 10)'
  })
  @ApiQuery({
    name: 'color',
    required: false,
    enum: Color,
    description: 'Цвет автомобиля'
  })
  @ApiQuery({
    name: 'brand',
    required: false,
    enum: Brand,
    description: 'Марка автомобиля'
  })
  @ApiQuery({
    name: 'bodyType',
    required: false,
    enum: BodyType,
    description: 'Тип кузова автомобиля'
  })
  @ApiQuery({
    name: 'transmission',
    required: false,
    enum: Transmission,
    description: 'Тип трансмиссии'
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    type: Number,
    description: 'Минимальная цена аренды'
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    type: Number,
    description: 'Максимальная цена аренды'
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Поиск'
  })
  getCars(@Query() getCarsQuery: CarFilters): CarsPaginatedResponse {
    // Значения по умолчанию
    const page = getCarsQuery.page || 1;
    const limit = getCarsQuery.limit || 10;

    // Фильтрация
    const filteredCars = getFilteredCars({ filters: getCarsQuery, cars });

    // Пагинация
    const total = filteredCars.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, total);
    const paginatedCars = filteredCars.slice(startIndex, endIndex);

    return this.wrapSuccess({
      data: paginatedCars,
      meta: {
        total,
        page,
        limit,
        totalPages
      }
    });
  }

  @ApiAuthorizedOnly()
  @Get('/rent')
  @ApiOperation({ summary: 'Получить все аренды' })
  @ApiResponse({
    status: 200,
    description: 'rents',
    type: CarsRentsResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getCarRents(@Req() request: Request): Promise<CarsRentsResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    // Находит аренды для авторизованного юзера по номеру телефона
    const carsRents = await this.carsRentService.find({
      phone: decodedJwtAccessToken.phone
    });

    return this.wrapSuccess({ carsRents });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить автомобиль' })
  @ApiResponse({
    status: 200,
    description: 'car',
    type: Car
  })
  getCar(@Param() params: GetCarDto): Car {
    const car = cars.find((car) => car.id === params.carId);

    if (!car) {
      throw new BadRequestException(this.wrapFail('Автомобиль не найден'));
    }

    return car;
  }

  @Post('rent')
  @ApiOperation({ summary: 'Арендовать автомобиль' })
  @ApiResponse({
    status: 200,
    description: 'create rent',
    type: CarsRent
  })
  async createCarRent(@Body() createCarRentDto: CreateRent) /*: Promise<CarsRent>*/ {
    // const { phone } = createCarRentDto;

    const carsRent = await this.carsRentService.create({
      ...createCarRentDto,
      status: CarsRentStatus.BOOKED,
      cancellable: true
    });

    // let user = await this.usersService.findOne({ phone });

    // if (!user) {
    //   user = await this.usersService.create({ phone });
    // }

    // await this.usersService.findOneAndUpdate(
    //   { phone: user.phone },
    //   {
    //     $set: {
    //       firstname: sender.firstname,
    //       lastname: sender.lastname,
    //       middlename: sender.middlename
    //     }
    //   }
    // );

    return this.wrapSuccess({ carsRent });
  }

  @ApiAuthorizedOnly()
  @Put('/rent/cancel')
  @ApiOperation({ summary: 'Отменить аренду' })
  @ApiResponse({
    status: 200,
    description: 'rent cancel',
    type: BaseResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async cancelCarsRent(@Body() cancelCarsRentDto: CancelCarsRentDto): Promise<BaseResponse> {
    const order = await this.carsRentService.findOne({
      _id: cancelCarsRentDto.carsRentId
    });

    if (!order) {
      throw new BadRequestException(this.wrapFail('Аренда не найдена'));
    }

    await this.carsRentService.updateOne(
      { _id: cancelCarsRentDto.carsRentId },
      { $set: { status: CarsRentStatus.CANCELLED } }
    );

    return this.wrapSuccess();
  }
}
