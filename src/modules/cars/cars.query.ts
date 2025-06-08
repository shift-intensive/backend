import { Query, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { BaseResolver } from '@/utils/services';

import { CarsPaginatedResponse } from './cars.model';
import { CARS } from './constants';
import { GetCarsFilterDto } from './dto/get-cars-filters.dto';
import { getFilteredCars } from './helpers';

@Resolver('🏎️ cars query')
@DescribeContext('CarsQuery')
export class CarsQuery extends BaseResolver {
  @Query(() => CarsPaginatedResponse)
  getCars(getCarsQuery: GetCarsFilterDto): CarsPaginatedResponse {
    const page = getCarsQuery.page ?? 1;
    const limit = getCarsQuery.limit ?? 10;

    const filteredCars = getFilteredCars({
      filters: getCarsQuery,
      cars: CARS
    });

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
