import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import * as request from 'supertest';

import {
  Dough,
  Ingredient,
  PizzaOrder,
  PizzaOrderSchema,
  PizzaOrderService,
  Size
} from '@/modules/pizza';
import { PIZZAS } from '@/modules/pizza/constants';
import { CreatePizzaPaymentDto } from '@/modules/pizza/dto';
import { PizzaController } from '@/modules/pizza/pizza.controller';
import { PizzaService } from '@/modules/pizza/pizza.service';
import { User, UserSchema, UsersService } from '@/modules/users';
import { AuthService } from '@/utils/services';
import { PasswordService } from '@/utils/services/auth/common/password';

describe('Pizza', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let pizzaOrderModel: Model<PizzaOrder>;
  let userModel: Model<User>;
  let pizzaService: PizzaService;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    pizzaOrderModel = mongoConnection.model(PizzaOrder.name, PizzaOrderSchema);
    userModel = mongoConnection.model(User.name, UserSchema);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PizzaController],
      providers: [
        {
          provide: PizzaService,
          useValue: {
            getPizzas: jest.fn(),
            getPizza: jest.fn()
          }
        },
        PizzaOrderService,
        AuthService,
        JwtService,
        PasswordService,
        UsersService,
        {
          provide: getModelToken(PizzaOrder.name),
          useValue: pizzaOrderModel
        },
        {
          provide: getModelToken(User.name),
          useValue: userModel
        }
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    pizzaService = moduleFixture.get<PizzaService>(PizzaService);
    jest.spyOn(pizzaService, 'getPizzas').mockReturnValue(PIZZAS);
    jest.spyOn(pizzaService, 'getPizza').mockReturnValue(PIZZAS[0]);

    await app.init();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
    await app.close();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('/pizza/catalog (GET)', () => {
    it('should return pizza catalog', async () => {
      const response = await request(app.getHttpServer()).get('/pizza/catalog').expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('catalog');
      expect(response.body.catalog).toEqual(PIZZAS);
    });
  });

  describe('/pizza/payment (POST)', () => {
    it('should create pizza order', async () => {
      const pizzaPaymentDto: CreatePizzaPaymentDto = {
        person: {
          firstname: 'Ivan',
          lastname: 'Ivanov',
          middlename: 'middlename',
          phone: '89999999999'
        },
        receiverAddress: {
          street: 'Street',
          house: '1',
          apartment: '1',
          comment: 'comment'
        },
        debitCard: {
          pan: '1111 1111',
          expireDate: '11/24',
          cvv: '1111'
        },
        pizzas: [
          {
            id: '1',
            toppings: [Ingredient.PINEAPPLE],
            dough: Dough.THIN,
            size: Size.SMALL
          }
        ]
      };

      const response = await request(app.getHttpServer())
        .post('/pizza/payment')
        .send(pizzaPaymentDto)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('order');
      expect(response.body.order).toHaveProperty('pizzas');
      expect(response.body.order.pizzas[0]).toMatchObject({
        id: '1'
      });
    });
  });
});
