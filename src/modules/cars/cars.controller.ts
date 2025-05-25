import {
  Controller,
  Get,
  Query
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { AuthService, BaseResolver } from '@/utils/services';

import { UsersService } from '../users';
import { CarsPaginatedResponse } from './cars.model';
import { cars } from './constants';
import { BodyType, Brand, Transmission } from './constants/enums';

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
    private readonly usersService: UsersService
  ) {
    super();
  }

  @Get('/')
  @ApiOperation({ summary: 'получить автомобили' })
  @ApiResponse({
    status: 200,
    description: 'автомобили с пагинацией и фильтрацией',
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
}
