import { CarFilters } from '../cars.controller';
import { Car } from '../entities';

export const getFilteredCars = ({ filters, cars }: { filters: CarFilters; cars: Car[] }) => {
  let filteredCars = [...cars];

  if (filters.brand?.length) {
    const brandSet = filters.brand.map((b) => b.toLowerCase());
    filteredCars = filteredCars.filter((car) => brandSet.includes(car.brand.toLowerCase()));
  }

  if (filters.bodyType?.length) {
    const bodyTypeSet = filters.bodyType.map((b) => b.toLowerCase());
    filteredCars = filteredCars.filter((car) => bodyTypeSet.includes(car.bodyType.toLowerCase()));
  }

  if (filters.color?.length) {
    const colorSet = filters.color.map((c) => c.toLowerCase());
    filteredCars = filteredCars.filter((car) => colorSet.includes(car.color.toLowerCase()));
  }

  if (filters.transmission) {
    const transmission = filters.transmission.toLowerCase();
    filteredCars = filteredCars.filter((car) => car.transmission.toLowerCase() === transmission);
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
