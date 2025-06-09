import { Injectable } from '@nestjs/common';

import { CARS } from './constants';
import { BodyType, Brand, Color, Steering, Transmission } from './constants/enums';
import { GetCarsFilterDto } from './dto';

interface GetFilteredCarsParams {
  filters: GetCarsFilterDto;
}

interface GetPaginationParams<T> {
  items: T[];
  limit?: number;
  page?: number;
}

interface PaginationMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

interface PaginationResult<T> {
  data: T[];
  meta: PaginationMeta;
}

@Injectable()
export class CarsService {
  getFilteredCars({ filters }: GetFilteredCarsParams) {
    let filteredCars = CARS;

    if (filters.brand?.length) {
      filteredCars = filteredCars.filter((car) =>
        filters.brand.includes(car.brand.toLowerCase() as Brand)
      );
    }

    if (filters.bodyType?.length) {
      filteredCars = filteredCars.filter((car) =>
        filters.bodyType.includes(car.bodyType.toLowerCase() as BodyType)
      );
    }

    if (filters.color?.length) {
      filteredCars = filteredCars.filter((car) =>
        filters.color.includes(car.color.toLowerCase() as Color)
      );
    }

    if (filters.transmission) {
      filteredCars = filteredCars.filter((car) =>
        filters.transmission.includes(car.transmission.toLowerCase() as Transmission)
      );
    }

    if (filters.steering) {
      filteredCars = filteredCars.filter((car) =>
        filters.steering.includes(car.steering.toLowerCase() as Steering)
      );
    }

    if (typeof filters.minPrice === 'number') {
      filteredCars = filteredCars.filter((car) => car.price >= filters.minPrice);
    }

    if (typeof filters.maxPrice === 'number') {
      filteredCars = filteredCars.filter((car) => car.price <= filters.maxPrice);
    }

    if (filters.search) {
      filteredCars = filteredCars.filter((car) =>
        Object.values(car).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(filters.search);
          }
          if (typeof value === 'number') {
            return value.toString().includes(filters.search);
          }
          return false;
        })
      );
    }

    return filteredCars;
  }

  getPagination<T>({ items, page = 1, limit = 10 }: GetPaginationParams<T>): PaginationResult<T> {
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, total);
    const data = items.slice(startIndex, endIndex);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages
      }
    };
  }
  // getFilteredCars;
  // и;
  // getPagination;
  // getFilm(id: string) {
  //   const films = this.getFilms();
  //   return films.find((film) => film.id === id);
  // }
  // getFilmSchedule(filmId: string) {
  //   const currentDay = new Date().getDay();
  //   const schedules = this.getSchedules();
  //   const { schedule } = schedules.find((scheduleDataItem) => scheduleDataItem.filmId === filmId);
  //   if (currentDay === 0) return schedule;
  //   return schedule.slice(currentDay, schedule.length).concat(schedule.slice(0, currentDay));
  // }
}
