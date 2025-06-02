import { Injectable } from '@nestjs/common';

import { PIZZAS } from './constants';
import { Pizza } from './entities';

@Injectable()
export class PizzaService {
  getPizzas(): Pizza[] {
    return PIZZAS;
  }

  getPizza(pizzaId: string): Pizza {
    return PIZZAS.find((pizza) => pizza.id === pizzaId);
  }
}
