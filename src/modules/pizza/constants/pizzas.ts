import type { Pizza } from '../entities';

import { Dough, Ingredient, Size } from '../entities';

export const TOPPINGS = [
  { type: Ingredient.PINEAPPLE, price: 80, img: '/static/images/ingredient/pineapple.png' },
  { type: Ingredient.GREEN_PEPPER, price: 60, img: '/static/images/ingredient/green_pepper.png' },
  { type: Ingredient.MUSHROOMS, price: 80, img: '/static/images/ingredient/mushrooms.png' },
  { type: Ingredient.BACON, price: 80, img: '/static/images/ingredient/bacon.png' },
  { type: Ingredient.SHRIMPS, price: 80, img: '/static/images/ingredient/shrimps.png' },
  { type: Ingredient.HAM, price: 80, img: '/static/images/ingredient/ham.png' },
  { type: Ingredient.MOZZARELLA, price: 70, img: '/static/images/ingredient/mozzarella.png' },
  { type: Ingredient.PEPERONI, price: 120, img: '/static/images/ingredient/peperoni.png' },
  {
    type: Ingredient.CHICKEN_FILLET,
    price: 80,
    img: '/static/images/ingredient/chicken_fillet.png'
  },
  { type: Ingredient.ONION, price: 80, img: '/static/images/ingredient/onion.png' },
  { type: Ingredient.BASIL, price: 80, img: '/static/images/ingredient/basil.png' },
  { type: Ingredient.CHILE, price: 80, img: '/static/images/ingredient/chile.png' },
  { type: Ingredient.CHEDDAR, price: 80, img: '/static/images/ingredient/cheddar.png' },
  { type: Ingredient.MEATBALLS, price: 80, img: '/static/images/ingredient/meatballs.png' },
  { type: Ingredient.PICKLE, price: 80, img: '/static/images/ingredient/pickle.png' },
  { type: Ingredient.TOMATO, price: 80, img: '/static/images/ingredient/tomato.png' },
  { type: Ingredient.FETA, price: 80, img: '/static/images/ingredient/feta.png' }
];

export const PIZZAS: Pizza[] = [
  {
    id: '1',
    name: 'ШИФТ Суприм',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.PEPERONI,
        price: 120,
        img: '/static/images/ingredient/peperoni.png'
      },

      {
        type: Ingredient.GREEN_PEPPER,
        price: 60,
        img: '/static/images/ingredient/green_pepper.png'
      },

      {
        type: Ingredient.MUSHROOMS,
        price: 80,
        img: '/static/images/ingredient/mushrooms.png'
      }
    ],
    toppings: TOPPINGS,
    description:
      'Шифт пицца с пепперони, колбасой, зеленым перцем, луком, оливками и шампиньонами.',
    sizes: [
      { type: Size.SMALL, price: 499 },
      { type: Size.MEDIUM, price: 799 },
      { type: Size.LARGE, price: 1149 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 320,
    protein: '18г',
    totalFat: '15г',
    carbohydrates: '28г',
    sodium: '860мг',
    allergens: ['молоко', 'пшеница', 'соевые бобы'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: true,
    img: '/static/images/pizza/1.webp'
  },
  {
    id: '2',
    name: 'Маргарита',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.BASIL,
        price: 40,
        img: '/static/images/ingredient/basil.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Классическая пицца с томатным соусом, моцареллой и листьями базилика.',
    sizes: [
      { type: Size.SMALL, price: 449 },
      { type: Size.MEDIUM, price: 749 },
      { type: Size.LARGE, price: 1099 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 250,
    protein: '12г',
    totalFat: '10г',
    carbohydrates: '20г',
    sodium: '650мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: true,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/2.webp'
  },
  {
    id: '3',
    name: 'Четыре Сыра',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.CHEDDAR,
        price: 90,
        img: '/static/images/ingredient/cheddar.png'
      },
      {
        type: Ingredient.PARMESAN,
        price: 90,
        img: '/static/images/ingredient/green_pepper.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с миксом моцареллы, чеддера, пармезана и феты.',
    sizes: [
      { type: Size.SMALL, price: 549 },
      { type: Size.MEDIUM, price: 849 },
      { type: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 380,
    protein: '20г',
    totalFat: '18г',
    carbohydrates: '30г',
    sodium: '780мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: true,
    isGlutenFree: false,
    isNew: true,
    isHit: false,
    img: '/static/images/pizza/3.webp'
  },
  {
    id: '4',
    name: 'Гавайская',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.HAM,
        price: 150,
        img: '/static/images/ingredient/ham.png'
      },
      {
        type: Ingredient.PINEAPPLE,
        price: 100,
        img: '/static/images/ingredient/pineapple.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с ветчиной и ананасом.',
    sizes: [
      { type: Size.SMALL, price: 549 },
      { type: Size.MEDIUM, price: 849 },
      { type: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 420,
    protein: '22г',
    totalFat: '20г',
    carbohydrates: '32г',
    sodium: '800мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/4.webp'
  },
  {
    id: '5',
    name: 'Пепперони',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.PEPERONI,
        price: 120,
        img: '/static/images/ingredient/peperoni.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Классическая пицца с пепперони.',
    sizes: [
      { type: Size.SMALL, price: 499 },
      { type: Size.MEDIUM, price: 799 },
      { type: Size.LARGE, price: 1149 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 350,
    protein: '16г',
    totalFat: '14г',
    carbohydrates: '25г',
    sodium: '800мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/5.webp'
  },
  {
    id: '6',
    name: 'Вегетарианская',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.TOMATO,
        price: 60,
        img: '/static/images/ingredient/tomato.png'
      },
      {
        type: Ingredient.MUSHROOMS,
        price: 80,
        img: '/static/images/ingredient/mushrooms.png'
      },
      {
        type: Ingredient.GREEN_PEPPER,
        price: 60,
        img: '/static/images/ingredient/green_pepper.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с овощами: помидорами, шампиньонами, зеленым перцем и красным луком.',
    sizes: [
      { type: Size.SMALL, price: 549 },
      { type: Size.MEDIUM, price: 849 },
      { type: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 280,
    protein: '14г',
    totalFat: '12г',
    carbohydrates: '30г',
    sodium: '700мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: true,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/6.webp'
  },
  {
    id: '7',
    name: 'Мясная',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.BACON,
        price: 160,
        img: '/static/images/ingredient/bacon.png'
      },
      {
        type: Ingredient.SHRIMPS,
        price: 120,
        img: '/static/images/ingredient/shrimps.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с ассорти мяса: говядиной, салями и беконом.',
    sizes: [
      { type: Size.SMALL, price: 599 },
      { type: Size.MEDIUM, price: 899 },
      { type: Size.LARGE, price: 1299 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 450,
    protein: '24г',
    totalFat: '22г',
    carbohydrates: '28г',
    sodium: '900мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/7.webp'
  },
  {
    id: '8',
    name: 'Мексиканская',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },

      {
        type: Ingredient.CHILE,
        price: 80,
        img: '/static/images/ingredient/green_pepper.png'
      },

      {
        type: Ingredient.ONION,
        price: 60,
        img: '/static/images/ingredient/onion.png'
      }
    ],
    toppings: TOPPINGS,
    description:
      'Пицца с мексиканскими пряностями: говядиной, перцем чили, перцем халапеньо, кукурузой и луком.',
    sizes: [
      { type: Size.SMALL, price: 599 },
      { type: Size.MEDIUM, price: 899 },
      { type: Size.LARGE, price: 1299 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 380,
    protein: '18г',
    totalFat: '20г',
    carbohydrates: '32г',
    sodium: '820мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/8.webp'
  },
  {
    id: '9',
    name: 'Кальцоне',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.HAM,
        price: 120,
        img: '/static/images/ingredient/ham.png'
      },
      {
        type: Ingredient.MUSHROOMS,
        price: 80,
        img: '/static/images/ingredient/mushrooms.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Запеченная пицца-кальцоне с моцареллой, ветчиной, грибами и яйцом.',
    sizes: [
      { type: Size.SMALL, price: 599 },
      { type: Size.MEDIUM, price: 899 },
      { type: Size.LARGE, price: 1299 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 420,
    protein: '20г',
    totalFat: '18г',
    carbohydrates: '30г',
    sodium: '900мг',
    allergens: ['молоко', 'пшеница', 'яйцо'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/9.webp'
  },
  {
    id: '10',
    name: 'Мясоед',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },

      {
        type: Ingredient.BACON,
        price: 160,
        img: '/static/images/ingredient/bacon.png'
      },
      {
        type: Ingredient.HAM,
        price: 140,
        img: '/static/images/ingredient/ham.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца для любителей мяса с салями, беконом и ветчиной.',
    sizes: [
      { type: Size.SMALL, price: 649 },
      { type: Size.MEDIUM, price: 999 },
      { type: Size.LARGE, price: 1449 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 480,
    protein: '26г',
    totalFat: '24г',
    carbohydrates: '32г',
    sodium: '950мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/10.webp'
  },
  {
    id: '11',
    name: 'Морская',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.SHRIMPS,
        price: 180,
        img: '/static/images/ingredient/shrimps.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с морепродуктами: креветками, мидиями, кальмарами и маслинами.',
    sizes: [
      { type: Size.SMALL, price: 649 },
      { type: Size.MEDIUM, price: 999 },
      { type: Size.LARGE, price: 1449 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 420,
    protein: '22г',
    totalFat: '20г',
    carbohydrates: '28г',
    sodium: '900мг',
    allergens: ['молоко', 'пшеница', 'морепродукты'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/11.webp'
  },
  {
    id: '12',
    name: 'Четыре Сыра с грибами',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.CHEDDAR,
        price: 90,
        img: '/static/images/ingredient/cheddar.png'
      },
      {
        type: Ingredient.PARMESAN,
        price: 90,
        img: '/static/images/ingredient/green_pepper.png'
      },

      {
        type: Ingredient.MUSHROOMS,
        price: 80,
        img: '/static/images/ingredient/mushrooms.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с миксом моцареллы, чеддера, пармезана, феты и шампиньонами.',
    sizes: [
      { type: Size.SMALL, price: 649 },
      { type: Size.MEDIUM, price: 999 },
      { type: Size.LARGE, price: 1449 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 400,
    protein: '20г',
    totalFat: '18г',
    carbohydrates: '30г',
    sodium: '850мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: true,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/12.webp'
  },
  {
    id: '13',
    name: 'Маринара',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Простая пицца с томатным соусом, чесноком, оливковым маслом и орегано.',
    sizes: [
      { type: Size.SMALL, price: 449 },
      { type: Size.MEDIUM, price: 749 },
      { type: Size.LARGE, price: 1099 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 280,
    protein: '6г',
    totalFat: '12г',
    carbohydrates: '30г',
    sodium: '650мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: true,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/13.webp'
  },
  {
    id: '14',
    name: 'Фруктовая',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.PINEAPPLE,
        price: 100,
        img: '/static/images/ingredient/pineapple.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с фруктами: ананасом, бананом и персиком.',
    sizes: [
      { type: Size.SMALL, price: 499 },
      { type: Size.MEDIUM, price: 799 },
      { type: Size.LARGE, price: 1149 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 320,
    protein: '8г',
    totalFat: '10г',
    carbohydrates: '35г',
    sodium: '700мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: true,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/14.webp'
  },
  {
    id: '15',
    name: 'Барбекю Чикен',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.CHICKEN_FILLET,
        price: 150,
        img: '/static/images/ingredient/chicken_fillet.png'
      },
      {
        type: Ingredient.ONION,
        price: 60,
        img: '/static/images/ingredient/onion.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с куриной грудкой, луком и барбекю соусом.',
    sizes: [
      { type: Size.SMALL, price: 549 },
      { type: Size.MEDIUM, price: 849 },
      { type: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 380,
    protein: '20г',
    totalFat: '16г',
    carbohydrates: '30г',
    sodium: '820мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/15.webp'
  },
  {
    id: '16',
    name: 'Филадельфия',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.ONION,
        price: 50,
        img: '/static/images/ingredient/onion.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с лососем, сыром филадельфия, авокадо и зеленым луком.',
    sizes: [
      { type: Size.SMALL, price: 649 },
      { type: Size.MEDIUM, price: 999 },
      { type: Size.LARGE, price: 1449 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 420,
    protein: '22г',
    totalFat: '20г',
    carbohydrates: '30г',
    sodium: '900мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/16.webp'
  },
  {
    id: '17',
    name: 'Пикантная Мексиканская',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.CHILE,
        price: 80,
        img: '/static/images/ingredient/green_pepper.png'
      },
      {
        type: Ingredient.ONION,
        price: 60,
        img: '/static/images/ingredient/onion.png'
      },
      {
        type: Ingredient.CHEDDAR,
        price: 90,
        img: '/static/images/ingredient/cheddar.png'
      }
    ],
    toppings: TOPPINGS,
    description:
      'Острая пицца с говядиной, перцем чили, перцем халапеньо, кукурузой, луком и топленным сыром.',
    sizes: [
      { type: Size.SMALL, price: 599 },
      { type: Size.MEDIUM, price: 899 },
      { type: Size.LARGE, price: 1299 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 400,
    protein: '22г',
    totalFat: '20г',
    carbohydrates: '32г',
    sodium: '820мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/17.webp'
  },
  {
    id: '18',
    name: 'Карбонара',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.BACON,
        price: 160,
        img: '/static/images/ingredient/bacon.png'
      },
      {
        type: Ingredient.PARMESAN,
        price: 100,
        img: '/static/images/ingredient/green_pepper.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с беконом, сыром пармезан и яйцом в сливочном соусе.',
    sizes: [
      { type: Size.SMALL, price: 649 },
      { type: Size.MEDIUM, price: 999 },
      { type: Size.LARGE, price: 1449 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 450,
    protein: '24г',
    totalFat: '22г',
    carbohydrates: '28г',
    sodium: '900мг',
    allergens: ['молоко', 'пшеница', 'яйцо'],
    isVegetarian: false,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/18.webp'
  },
  {
    id: '19',
    name: 'Греческая',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.TOMATO,
        price: 60,
        img: '/static/images/ingredient/tomato.png'
      },

      {
        type: Ingredient.GREEN_PEPPER,
        price: 60,
        img: '/static/images/ingredient/green_pepper.png'
      }
    ],
    toppings: TOPPINGS,
    description:
      'Пицца с томатным соусом, моцареллой, помидорами, оливками, перцем, фетой и орегано.',
    sizes: [
      { type: Size.SMALL, price: 549 },
      { type: Size.MEDIUM, price: 849 },
      { type: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 320,
    protein: '16г',
    totalFat: '14г',
    carbohydrates: '30г',
    sodium: '800мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: true,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/19.webp'
  },
  {
    id: '20',
    name: 'Шпинатная',
    ingredients: [
      {
        type: Ingredient.MOZZARELLA,
        price: 70,
        img: '/static/images/ingredient/mozzarella.png'
      },
      {
        type: Ingredient.PINEAPPLE,
        price: 100,
        img: '/static/images/ingredient/pineapple.png'
      },
      {
        type: Ingredient.PARMESAN,
        price: 100,
        img: '/static/images/ingredient/green_pepper.png'
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с томатным соусом, моцареллой, шпинатом, фетой, чесноком и орегано.',
    sizes: [
      { type: Size.SMALL, price: 549 },
      { type: Size.MEDIUM, price: 849 },
      { type: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { type: Dough.THIN, price: 0 },
      { type: Dough.THICK, price: 50 }
    ],
    calories: 300,
    protein: '14г',
    totalFat: '12г',
    carbohydrates: '28г',
    sodium: '700мг',
    allergens: ['молоко', 'пшеница'],
    isVegetarian: true,
    isGlutenFree: false,
    isNew: false,
    isHit: false,
    img: '/static/images/pizza/20.webp'
  }
];
