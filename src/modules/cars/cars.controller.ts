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
import { BodyType, Brand, Transmission } from './constants/enums';
import { CancelCarsRentDto, GetCarDto } from './dto';
import { Car, CreateRent } from './entities';
import { CarsRent, CarsRentService, CarsRentStatus } from './modules';

interface CarFilters {
  bodyType?: BodyType;
  brand?: Brand;
  endDate?: string;
  limit?: number;
  maxPrice?: number;
  minPrice?: number;
  page?: number;
  search?: string;
  startDate?: string;
  steering?: 'left' | 'right';
  transmission?: Transmission;
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
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'brand', required: false, enum: Brand })
  @ApiQuery({ name: 'bodyType', required: false, enum: BodyType })
  @ApiQuery({ name: 'transmission', required: false, enum: Transmission })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  getCars(@Query() filters: CarFilters): CarsPaginatedResponse {
    // Значения по умолчанию
    const page = filters.page || 1;
    const limit = filters.limit || 10;

    // Фильтрация
    let filteredCars = [...cars];

    if (filters.brand) {
      filteredCars = filteredCars.filter((car) => car.brand === filters.brand);
    }

    if (filters.bodyType) {
      filteredCars = filteredCars.filter((car) => car.bodyType === filters.bodyType);
    }

    if (filters.transmission) {
      filteredCars = filteredCars.filter((car) => car.transmission === filters.transmission);
    }

    if (filters.minPrice) {
      filteredCars = filteredCars.filter((car) => car.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filteredCars = filteredCars.filter((car) => car.price <= filters.maxPrice);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCars = filteredCars.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm) ||
          car.location.toLowerCase().includes(searchTerm)
      );
    }

    // Сортировка (если нужно)
    // filteredCars = filteredCars.sort(...);

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

  // @Get('rent')
  // @ApiOperation({ summary: 'Получить все аренды' })
  // @ApiResponse({
  //   status: 200,
  //   type: [CarsRent]
  // })
  // getRents() {
  //   return carsRents;
  //   // return this.carsRentService.getRents();
  // }

  @ApiAuthorizedOnly()
  @Get('/rent')
  @ApiOperation({ summary: 'Получить все аренды' })
  @ApiResponse({
    status: 200,
    description: 'orders',
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
  @ApiOperation({ summary: 'Аренда автомобиля' })
  @ApiResponse({
    status: 200,
    description: 'order',
    type: CarsRent
  })
  async createCarRent(@Body() createCarRentDto: CreateRent) /*: Promise<CarsRent>*/ {
    // return this.carsService.createRent(dto);

    const { phone } = createCarRentDto;

    const carsRent = await this.carsRentService.create({
      ...createCarRentDto,
      status: CarsRentStatus.BOOKED,
      cancellable: true
    });

    let user = await this.usersService.findOne({ phone });

    if (!user) {
      user = await this.usersService.create({ phone });
    }

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
  @ApiOperation({ summary: 'отменить аренду' })
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
