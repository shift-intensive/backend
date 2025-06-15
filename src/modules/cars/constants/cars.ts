import { Car } from '../entities';
import { BodyType, Brand, Color, Steering, Transmission } from './enums';

export const CARS: Car[] = [
  {
    id: '1',
    name: 'Haval Jolion',
    brand: Brand.HAVAL,
    img: '/static/images/cars/haval-jolion.webp',
    transmission: Transmission.AUTOMATIC,
    price: 4200,
    location: 'Москва, ул. Садовая, 5',
    color: Color.SILVER,
    bodyType: BodyType.SUV,
    steering: Steering.LEFT
  },
  {
    id: '2',
    name: 'Hyundai Sonata 2.0 AT',
    brand: Brand.HYUNDAI,
    img: '/static/images/cars/hyundai-sonata.webp',
    transmission: Transmission.AUTOMATIC,
    price: 3900,
    location: 'Санкт-Петербург, Невский проспект, 22',
    color: Color.WHITE,
    bodyType: BodyType.SEDAN,
    steering: Steering.LEFT
  },
  {
    id: '3',
    name: 'Volkswagen Polo 1.6 AT',
    brand: Brand.VOLKSWAGEN,
    img: '/static/images/cars/volkswagen-polo.webp',
    transmission: Transmission.AUTOMATIC,
    price: 3100,
    location: 'Новосибирск, ул. Ленина, 5',
    color: Color.WHITE,
    bodyType: BodyType.SEDAN,
    steering: Steering.LEFT
  },
  {
    id: '4',
    name: 'Kia Rio 1.4 AT',
    brand: Brand.KIA,
    img: '/static/images/cars/kia-rio-white.webp',
    transmission: Transmission.AUTOMATIC,
    price: 3100,
    location: 'Новосибирск, ул. Ленина, 5',
    color: Color.WHITE,
    bodyType: BodyType.SEDAN,
    steering: Steering.LEFT
  },
  {
    id: '5',
    name: 'Hyundai Solaris 1.6 AT',
    brand: Brand.HYUNDAI,
    img: '/static/images/cars/hyundai-solaris.webp',
    transmission: Transmission.MANUAL,
    price: 3200,
    location: 'Екатеринбург, ул. Мира, 45',
    color: Color.BLACK,
    bodyType: BodyType.SEDAN,
    steering: Steering.LEFT
  },
  {
    id: '6',
    name: 'Kia Rio 1.6 AT',
    brand: Brand.KIA,
    img: '/static/images/cars/kia-rio-red.webp',
    transmission: Transmission.AUTOMATIC,
    price: 2500,
    location: 'Екатеринбург, ул. Мира, 45',
    color: Color.RED,
    bodyType: BodyType.SEDAN,
    steering: Steering.LEFT
  },
  {
    id: '7',
    name: 'Haval H3',
    brand: Brand.HAVAL,
    img: '/static/images/cars/haval-h3.webp',
    transmission: Transmission.MANUAL,
    price: 3500,
    location: 'Екатеринбург, ул. Малышева, 15',
    color: Color.GREY,
    bodyType: BodyType.SUV,
    steering: Steering.LEFT
  },
  {
    id: '8',
    name: 'Haval F7 4WD',
    brand: Brand.HAVAL,
    img: '/static/images/cars/haval-f7.webp',
    transmission: Transmission.AUTOMATIC,
    price: 4500,
    location: 'Новосибирск, ул. Ленина, 5',
    color: Color.BLUE,
    bodyType: BodyType.SUV,
    steering: Steering.LEFT
  },
  {
    id: '9',
    name: 'Hyundai Palisade HT',
    brand: Brand.HYUNDAI,
    img: '/static/images/cars/hyundai-palisade.webp',
    transmission: Transmission.AUTOMATIC,
    price: 5000,
    location: 'Новосибирск, ул. Ленина, 5',
    color: Color.WHITE,
    bodyType: BodyType.HATCHBACK,
    steering: Steering.LEFT
  },
  {
    id: '10',
    name: 'Geely Preface',
    brand: Brand.GEELY,
    img: '/static/images/cars/geely-preface.webp',
    transmission: Transmission.MANUAL,
    price: 4200,
    location: 'Екатеринбург, ул. Малышева, 15',
    color: Color.BLACK,
    bodyType: BodyType.SEDAN,
    steering: Steering.LEFT
  },
  {
    id: '11',
    name: 'Geely Emgrand',
    brand: Brand.GEELY,
    img: '/static/images/cars/geely-emgrand.webp',
    transmission: Transmission.AUTOMATIC,
    price: 4000,
    location: 'Екатеринбург, ул. Мира, 45',
    color: Color.SILVER,
    bodyType: BodyType.SEDAN,
    steering: Steering.LEFT
  },
  {
    id: '12',
    name: 'Kia Rio 1.4 AT',
    brand: Brand.KIA,
    img: '/static/images/cars/kia-rio-black.webp',
    transmission: Transmission.MANUAL,
    price: 3100,
    location: 'Новосибирск, ул. Ленина, 5',
    color: Color.BLACK,
    bodyType: BodyType.SEDAN,
    steering: Steering.LEFT
  }
];
