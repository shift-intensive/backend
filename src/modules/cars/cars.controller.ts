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
import {
  CarRentResponse,
  CarRentsResponse,
  CarResponse,
  CarsPaginatedResponse
} from './cars.model';
import { CarsService } from './cars.service';
import { BodyType, Brand, Color, Transmission } from './constants/enums';
import { CancelCarRentDto, CreateRentDto, GetCarDto, GetCarRentDto, GetCarsFilterDto } from './dto';
import { CarRent, CarRentService, CarRentStatus } from './modules';

@ApiTags('🏎️ cars')
@Controller('/cars')
export class CarsController extends BaseResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly carRentService: CarRentService,
    private readonly carsService: CarsService
  ) {
    super();
  }

  @Get('/info')
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
  getCars(@Query() getCarsQuery: GetCarsFilterDto): CarsPaginatedResponse {
    const filteredCars = this.carsService.getFilteredCars({ filters: getCarsQuery });
    const paginatedCars = this.carsService.getPagination({
      items: filteredCars,
      page: getCarsQuery.page,
      limit: getCarsQuery.limit
    });

    return this.wrapSuccess(paginatedCars);
  }

  @Get('info/:carId')
  @ApiOperation({ summary: 'Получить автомобиль' })
  @ApiResponse({
    status: 200,
    description: 'car with rents',
    type: CarResponse
  })
  async getCar(@Param() params: GetCarDto): Promise<CarResponse> {
    const car = this.carsService.getCar(params.carId);

    if (!car) {
      throw new BadRequestException(this.wrapFail('Автомобиль не найден'));
    }

    const carRents = await this.carRentService.find({
      carId: params.carId,
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

  @Post('rent')
  @ApiOperation({ summary: 'Арендовать автомобиль' })
  @ApiResponse({
    status: 200,
    description: 'create rent',
    type: CarRentResponse
  })
  async createCarRent(@Body() createCarRentDto: CreateRentDto) {
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

  @ApiAuthorizedOnly()
  @Get('/rent')
  @ApiOperation({ summary: 'Получить все аренды' })
  @ApiResponse({
    status: 200,
    description: 'rents',
    type: CarRentsResponse
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getCarRents(@Req() request: Request): Promise<CarRentsResponse> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const rents = await this.carRentService.find({
      phone: decodedJwtAccessToken.phone
    });

    return this.wrapSuccess({ rents });
  }

  @ApiAuthorizedOnly()
  @Get('/rent/:carRentId')
  @ApiOperation({ summary: 'Получить аренду' })
  @ApiResponse({
    status: 200,
    description: 'rent',
    type: CarRent
  })
  @ApiHeader({
    name: 'authorization'
  })
  @ApiBearerAuth()
  async getCarRent(@Param() params: GetCarRentDto, @Req() request: Request): Promise<CarRent> {
    const token = request.headers.authorization.split(' ')[1];
    const decodedJwtAccessToken = (await this.authService.decode(token)) as User;

    if (!decodedJwtAccessToken) {
      throw new BadRequestException(this.wrapFail('Некорректный токен авторизации'));
    }

    const rent = await this.carRentService.findOne({
      _id: params.carRentId
    });
    if (!rent) {
      throw new BadRequestException(this.wrapFail('Аренда не найдена'));
    }

    return rent;
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
  async cancelCarRent(@Body() cancelCarRentDto: CancelCarRentDto): Promise<BaseResponse> {
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
