import type { Pizza } from '../entities';
import { Dough, Ingredient, Size } from '../entities';

const TOPPINGS = [
  { name: Ingredient.GREEN_PEPPER, cost: 60, img: './static/images/green_pepper.png' },
  { name: Ingredient.TOMATO_SAUCE, cost: 50, img: '' },
  { name: Ingredient.MOZARELLA, cost: 70, img: '' },
  { name: Ingredient.PEPERONI, cost: 120, img: '' },
  { name: Ingredient.SAUSAGE, cost: 130, img: '' },
  { name: Ingredient.RED_ONION, cost: 60, img: '' },
  { name: Ingredient.BLACK_OLIVE, cost: 70, img: '' },
  { name: Ingredient.MUSHROOMS, cost: 80, img: '' },
  { name: Ingredient.BASIL, cost: 80, img: '' },
  { name: Ingredient.CHEDDAR, cost: 80, img: '' },
  { name: Ingredient.PARMESAN, cost: 80, img: '' },
  { name: Ingredient.FETA, cost: 80, img: '' },
  { name: Ingredient.HAM, cost: 80, img: '' },
  { name: Ingredient.PINEAPPLE, cost: 80, img: '' },
  { name: Ingredient.TOMATO, cost: 80, img: '' },
  { name: Ingredient.BEEF, cost: 80, img: '' },
  { name: Ingredient.SALAMI, cost: 80, img: '' },
  { name: Ingredient.BACON, cost: 80, img: '' },
  { name: Ingredient.CHILE, cost: 80, img: '' },
  { name: Ingredient.JALAPENO, cost: 80, img: '' },
  { name: Ingredient.CORN, cost: 80, img: '' },
  { name: Ingredient.ONION, cost: 80, img: '' },
  { name: Ingredient.EGG, cost: 80, img: '' },
  { name: Ingredient.SHRIMPS, cost: 80, img: '' },
  { name: Ingredient.MUSSELS, cost: 80, img: '' },
  { name: Ingredient.SQUID, cost: 80, img: '' },
  { name: Ingredient.OLIVES, cost: 80, img: '' },
  { name: Ingredient.SPINACH, cost: 80, img: '' },
  { name: Ingredient.GARLIC, cost: 80, img: '' },
  { name: Ingredient.OREGANO, cost: 80, img: '' },
  { name: Ingredient.BANANA, cost: 80, img: '' },
  { name: Ingredient.PEACH, cost: 80, img: '' },
  { name: Ingredient.CHICKEN_FILLET, cost: 80, img: '' },
  { name: Ingredient.BBQ_SAUCE, cost: 80, img: '' },
  { name: Ingredient.CREAM_SAUCE, cost: 80, img: '' },
  { name: Ingredient.SALMON, cost: 80, img: '' },
  { name: Ingredient.PHILADELPHIA_CHEESE, cost: 80, img: '' },
  { name: Ingredient.AVOCADO, cost: 80, img: '' }
];

export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'ШИФТ Суприм',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.PEPERONI,
        cost: 120,
        img: ''
      },
      {
        name: Ingredient.SAUSAGE,
        cost: 130,
        img: ''
      },
      {
        name: Ingredient.GREEN_PEPPER,
        cost: 60,
        img: './static/images/green_pepper.png'
      },
      {
        name: Ingredient.RED_ONION,
        cost: 60,
        img: ''
      },
      {
        name: Ingredient.BLACK_OLIVE,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.MUSHROOMS,
        cost: 80,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description:
      'Наша пицца с пепперони, колбасой, зеленым перцем, луком, оливками и шампиньонами.',
    sizes: [
      { name: Size.SMALL, price: 499 },
      { name: Size.MEDIUM, price: 799 },
      { name: Size.LARGE, price: 1149 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/1.jpeg'
  },
  {
    id: '2',
    name: 'Маргарита',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.BASIL,
        cost: 40,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Классическая пицца с томатным соусом, моцареллой и листьями базилика.',
    sizes: [
      { name: Size.SMALL, price: 449 },
      { name: Size.MEDIUM, price: 749 },
      { name: Size.LARGE, price: 1099 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/2.jpeg'
  },
  {
    id: '3',
    name: 'Четыре Сыра',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.CHEDDAR,
        cost: 90,
        img: ''
      },
      {
        name: Ingredient.PARMESAN,
        cost: 90,
        img: ''
      },
      {
        name: Ingredient.FETA,
        cost: 100,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с миксом моцареллы, чеддера, пармезана и феты.',
    sizes: [
      { name: Size.SMALL, price: 549 },
      { name: Size.MEDIUM, price: 849 },
      { name: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/3.jpeg'
  },
  {
    id: '4',
    name: 'Гавайская',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.HAM,
        cost: 150,
        img: ''
      },
      {
        name: Ingredient.PINEAPPLE,
        cost: 100,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с ветчиной и ананасом.',
    sizes: [
      { name: Size.SMALL, price: 549 },
      { name: Size.MEDIUM, price: 849 },
      { name: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/4.jpeg'
  },
  {
    id: '5',
    name: 'Пепперони',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.PEPERONI,
        cost: 120,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Классическая пицца с пепперони.',
    sizes: [
      { name: Size.SMALL, price: 499 },
      { name: Size.MEDIUM, price: 799 },
      { name: Size.LARGE, price: 1149 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/5.jpeg'
  },
  {
    id: '6',
    name: 'Вегетарианская',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.TOMATO,
        cost: 60,
        img: ''
      },
      {
        name: Ingredient.MUSHROOMS,
        cost: 80,
        img: ''
      },
      {
        name: Ingredient.GREEN_PEPPER,
        cost: 60,
        img: './static/images/green_pepper.png'
      },
      {
        name: Ingredient.RED_ONION,
        cost: 60,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с овощами: помидорами, шампиньонами, зеленым перцем и красным луком.',
    sizes: [
      { name: Size.SMALL, price: 549 },
      { name: Size.MEDIUM, price: 849 },
      { name: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/6.jpeg'
  },
  {
    id: '7',
    name: 'Мясная',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.BEEF,
        cost: 140,
        img: ''
      },
      {
        name: Ingredient.SALAMI,
        cost: 120,
        img: ''
      },
      {
        name: Ingredient.BACON,
        cost: 160,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с ассорти мяса: говядиной, салями и беконом.',
    sizes: [
      { name: Size.SMALL, price: 599 },
      { name: Size.MEDIUM, price: 899 },
      { name: Size.LARGE, price: 1299 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/7.jpeg'
  },
  {
    id: '8',
    name: 'Мексиканская',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.BEEF,
        cost: 140,
        img: ''
      },
      {
        name: Ingredient.CHILE,
        cost: 80,
        img: ''
      },
      {
        name: Ingredient.JALAPENO,
        cost: 80,
        img: ''
      },
      {
        name: Ingredient.CORN,
        cost: 60,
        img: ''
      },
      {
        name: Ingredient.ONION,
        cost: 60,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description:
      'Пицца с мексиканскими пряностями: говядиной, перцем чили, перцем халапеньо, кукурузой и луком.',
    sizes: [
      { name: Size.SMALL, price: 599 },
      { name: Size.MEDIUM, price: 899 },
      { name: Size.LARGE, price: 1299 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/8.jpeg'
  },
  {
    id: '9',
    name: 'Кальцоне',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.HAM,
        cost: 120,
        img: ''
      },
      {
        name: Ingredient.MUSHROOMS,
        cost: 80,
        img: ''
      },
      {
        name: Ingredient.EGG,
        cost: 30,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Запеченная пицца-кальцоне с моцареллой, ветчиной, грибами и яйцом.',
    sizes: [
      { name: Size.SMALL, price: 599 },
      { name: Size.MEDIUM, price: 899 },
      { name: Size.LARGE, price: 1299 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/9.jpeg'
  },
  {
    id: '10',
    name: 'Мясоед',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.SALAMI,
        cost: 120,
        img: ''
      },
      {
        name: Ingredient.BACON,
        cost: 160,
        img: ''
      },
      {
        name: Ingredient.HAM,
        cost: 140,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца для любителей мяса с салями, беконом и ветчиной.',
    sizes: [
      { name: Size.SMALL, price: 649 },
      { name: Size.MEDIUM, price: 999 },
      { name: Size.LARGE, price: 1449 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/10.jpeg'
  },
  {
    id: '11',
    name: 'Морская',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.SHRIMPS,
        cost: 180,
        img: ''
      },
      {
        name: Ingredient.MUSSELS,
        cost: 150,
        img: ''
      },
      {
        name: Ingredient.SQUID,
        cost: 140,
        img: ''
      },
      {
        name: Ingredient.OLIVES,
        cost: 60,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с морепродуктами: креветками, мидиями, кальмарами и маслинами.',
    sizes: [
      { name: Size.SMALL, price: 649 },
      { name: Size.MEDIUM, price: 999 },
      { name: Size.LARGE, price: 1449 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/11.jpeg'
  },
  {
    id: '12',
    name: 'Четыре Сыра с грибами',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.CHEDDAR,
        cost: 90,
        img: ''
      },
      {
        name: Ingredient.PARMESAN,
        cost: 90,
        img: ''
      },
      {
        name: Ingredient.FETA,
        cost: 100,
        img: ''
      },
      {
        name: Ingredient.MUSHROOMS,
        cost: 80,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с миксом моцареллы, чеддера, пармезана, феты и шампиньонами.',
    sizes: [
      { name: Size.SMALL, price: 649 },
      { name: Size.MEDIUM, price: 999 },
      { name: Size.LARGE, price: 1449 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/12.jpeg'
  },
  {
    id: '13',
    name: 'Маринара',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.GARLIC,
        cost: 30,
        img: ''
      },
      {
        name: Ingredient.OLIVES,
        cost: 40,
        img: ''
      },
      {
        name: Ingredient.OREGANO,
        cost: 20,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Простая пицца с томатным соусом, чесноком, оливковым маслом и орегано.',
    sizes: [
      { name: Size.SMALL, price: 449 },
      { name: Size.MEDIUM, price: 749 },
      { name: Size.LARGE, price: 1099 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/13.jpeg'
  },
  {
    id: '14',
    name: 'Фруктовая',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.PINEAPPLE,
        cost: 100,
        img: ''
      },
      {
        name: Ingredient.BANANA,
        cost: 80,
        img: ''
      },
      {
        name: Ingredient.PEACH,
        cost: 80,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с фруктами: ананасом, бананом и персиком.',
    sizes: [
      { name: Size.SMALL, price: 499 },
      { name: Size.MEDIUM, price: 799 },
      { name: Size.LARGE, price: 1149 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/14.jpeg'
  },
  {
    id: '15',
    name: 'Барбекю Чикен',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.CHICKEN_FILLET,
        cost: 150,
        img: ''
      },
      {
        name: Ingredient.ONION,
        cost: 60,
        img: ''
      },
      {
        name: Ingredient.BBQ_SAUCE,
        cost: 80,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с куриной грудкой, луком и барбекю соусом.',
    sizes: [
      { name: Size.SMALL, price: 549 },
      { name: Size.MEDIUM, price: 849 },
      { name: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/15.jpeg'
  },
  {
    id: '16',
    name: 'Филадельфия',
    ingredients: [
      {
        name: Ingredient.CREAM_SAUCE,
        cost: 60,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.SALMON,
        cost: 200,
        img: ''
      },
      {
        name: Ingredient.PHILADELPHIA_CHEESE,
        cost: 120,
        img: ''
      },
      {
        name: Ingredient.ONION,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.AVOCADO,
        cost: 80,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с лососем, сыром филадельфия, авокадо и зеленым луком.',
    sizes: [
      { name: Size.SMALL, price: 649 },
      { name: Size.MEDIUM, price: 999 },
      { name: Size.LARGE, price: 1449 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/16.jpeg'
  },
  {
    id: '17',
    name: 'Пикантная Мексиканская',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.BEEF,
        cost: 140,
        img: ''
      },
      {
        name: Ingredient.CHILE,
        cost: 80,
        img: ''
      },
      {
        name: Ingredient.JALAPENO,
        cost: 80,
        img: ''
      },
      {
        name: Ingredient.CORN,
        cost: 60,
        img: ''
      },
      {
        name: Ingredient.ONION,
        cost: 60,
        img: ''
      },
      {
        name: Ingredient.CHEDDAR,
        cost: 90,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description:
      'Острая пицца с говядиной, перцем чили, перцем халапеньо, кукурузой, луком и топленным сыром.',
    sizes: [
      { name: Size.SMALL, price: 599 },
      { name: Size.MEDIUM, price: 899 },
      { name: Size.LARGE, price: 1299 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/17.jpeg'
  },
  {
    id: '18',
    name: 'Карбонара',
    ingredients: [
      {
        name: Ingredient.CREAM_SAUCE,
        cost: 60,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.BACON,
        cost: 160,
        img: ''
      },
      {
        name: Ingredient.PARMESAN,
        cost: 100,
        img: ''
      },
      {
        name: Ingredient.EGG,
        cost: 30,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с беконом, сыром пармезан и яйцом в сливочном соусе.',
    sizes: [
      { name: Size.SMALL, price: 649 },
      { name: Size.MEDIUM, price: 999 },
      { name: Size.LARGE, price: 1449 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/18.jpeg'
  },
  {
    id: '19',
    name: 'Греческая',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.TOMATO,
        cost: 60,
        img: ''
      },
      {
        name: Ingredient.OLIVES,
        cost: 80,
        img: ''
      },
      {
        name: Ingredient.GREEN_PEPPER,
        cost: 60,
        img: './static/images/green_pepper.png'
      },
      {
        name: Ingredient.FETA,
        cost: 100,
        img: ''
      },
      {
        name: Ingredient.OREGANO,
        cost: 30,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description:
      'Пицца с томатным соусом, моцареллой, помидорами, оливками, перцем, фетой и орегано.',
    sizes: [
      { name: Size.SMALL, price: 549 },
      { name: Size.MEDIUM, price: 849 },
      { name: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/19.jpeg'
  },
  {
    id: '20',
    name: 'Шпинатная',
    ingredients: [
      {
        name: Ingredient.TOMATO_SAUCE,
        cost: 50,
        img: ''
      },
      {
        name: Ingredient.MOZARELLA,
        cost: 70,
        img: ''
      },
      {
        name: Ingredient.SPINACH,
        cost: 80,
        img: ''
      },
      {
        name: Ingredient.FETA,
        cost: 100,
        img: ''
      },
      {
        name: Ingredient.GARLIC,
        cost: 30,
        img: ''
      },
      {
        name: Ingredient.OREGANO,
        cost: 30,
        img: ''
      }
    ],
    toppings: TOPPINGS,
    description: 'Пицца с томатным соусом, моцареллой, шпинатом, фетой, чесноком и орегано.',
    sizes: [
      { name: Size.SMALL, price: 549 },
      { name: Size.MEDIUM, price: 849 },
      { name: Size.LARGE, price: 1249 }
    ],
    doughs: [
      { name: Dough.THIN, price: 0 },
      { name: Dough.THICK, price: 50 }
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
    img: '/static/images/pizza/20.jpeg'
  }
];
