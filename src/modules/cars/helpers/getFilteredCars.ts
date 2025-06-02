import { CarFilters } from '../cars.controller';
import { Car } from '../entities';

export const getFilteredCars = ({ filters, cars }: { filters: CarFilters; cars: Car[] }) => {
  let filteredCars = [...cars];

  if (filters.brand?.length) {
    filteredCars = filteredCars.filter((car) => filters.brand.includes(car.brand));
  }

  if (filters.bodyType?.length) {
    filteredCars = filteredCars.filter((car) => filters.bodyType.includes(car.bodyType));
  }

  if (filters.color?.length) {
    filteredCars = filteredCars.filter((car) => filters.color.includes(car.color));
  }

  if (filters.transmission) {
    filteredCars = filteredCars.filter((car) => car.transmission === filters.transmission);
  }

  if (filters.minPrice !== undefined) {
    filteredCars = filteredCars.filter((car) => car.price >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    filteredCars = filteredCars.filter((car) => car.price <= filters.maxPrice);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();

    filteredCars = filteredCars.filter((car) =>
      Object.values(car).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm);
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      })
    );
  }

  return filteredCars;
};
