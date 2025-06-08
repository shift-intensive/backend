import { BodyType, Brand, Color, Steering, Transmission } from '../constants/enums';
import { GetCarsFilterDto } from '../dto';
import { Car } from '../entities';

interface GetFilteredCarsParams {
  cars: Car[];
  filters: GetCarsFilterDto;
}

export const getFilteredCars = ({ filters, cars }: GetFilteredCarsParams) => {
  let filteredCars = [...cars];

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
};
