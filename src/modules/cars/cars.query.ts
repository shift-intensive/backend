import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { DescribeContext } from '@/utils/decorators';
import { AuthService, BaseResolver } from '@/utils/services';

import { CarsPaginatedResponse } from './cars.model';
import { cars } from './constants';
import { BodyType, Brand, Transmission } from './constants/enums';

@Resolver('🏎️ cars query')
@DescribeContext('CarsQuery')
export class CarsQuery extends BaseResolver {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Query(() => CarsPaginatedResponse)
  getCars(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
    @Args('brand', { type: () => Brand, nullable: true }) brand?: Brand,
    @Args('bodyType', { type: () => BodyType, nullable: true }) bodyType?: BodyType,
    @Args('transmission', { type: () => Transmission, nullable: true }) transmission?: Transmission,
    @Args('minPrice', { type: () => Int, nullable: true }) minPrice?: number,
    @Args('maxPrice', { type: () => Int, nullable: true }) maxPrice?: number,
    @Args('search', { type: () => String, nullable: true }) search?: string
  ): CarsPaginatedResponse {
    // Фильтрация
    let filteredCars = [...cars];

    if (brand) {
      filteredCars = filteredCars.filter((car) => car.brand === brand);
    }

    if (bodyType) {
      filteredCars = filteredCars.filter((car) => car.bodyType === bodyType);
    }

    if (transmission) {
      filteredCars = filteredCars.filter((car) => car.transmission === transmission);
    }

    if (minPrice) {
      filteredCars = filteredCars.filter((car) => car.price >= minPrice);
    }

    if (maxPrice) {
      filteredCars = filteredCars.filter((car) => car.price <= maxPrice);
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      filteredCars = filteredCars.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm) ||
          car.location.toLowerCase().includes(searchTerm)
      );
    }

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
