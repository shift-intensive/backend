import { Query, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { AuthService, BaseResolver } from '@/utils/services';

import { CarsPaginatedResponse } from './cars.model';
import { CARS } from './constants';
import { CarFilters } from './dto/get-cars-filters.dto';
import { getFilteredCars } from './helpers';

@Resolver('🏎️ cars query')
@DescribeContext('CarsQuery')
export class CarsQuery extends BaseResolver {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Query(() => CarsPaginatedResponse)
  getCars(getCarsQuery: CarFilters): CarsPaginatedResponse {
    // Значения по умолчанию
    const page = getCarsQuery.page || 1;
    const limit = getCarsQuery.limit || 10;

    // Фильтрация
    const filteredCars = getFilteredCars({
      filters: getCarsQuery,
      cars: CARS
    });

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
