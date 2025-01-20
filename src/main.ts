import type { NestExpressApplication } from '@nestjs/platform-express';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'node:path';

import { AppModule } from './app.module';
import { AndroidSampleModule } from './modules/android-sample';
import { OtpsModule } from './modules/otps';
import { UsersModule } from './modules/users';
import { BASE_URL, withBaseUrl } from './utils/helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: '*' }
  });

  app.setGlobalPrefix(BASE_URL);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  app.use(withBaseUrl('/health'), (_req, res) => {
    res.json({ status: true });
  });

  const restConfig = new DocumentBuilder()
    .setTitle('shift backend 🔥')
    .setDescription('Апи для выполнения индивидуальных заданий')
    .setVersion('1.0')
    .addServer(process.env.SERVER_URL)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .build();

  const document = SwaggerModule.createDocument(app, restConfig);
  SwaggerModule.setup(withBaseUrl('/rest'), app, document);

  app.setBaseViewsDir(join(__dirname, 'static/views'));
  app.setViewEngine('hbs');

  const testerConfig = new DocumentBuilder()
    .setTitle('shift tester 🧪')
    .setDescription('Апи для тестирования')
    .setVersion('1.0')
    .addServer(process.env.SERVER_URL)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .build();

  const testerDocument = SwaggerModule.createDocument(app, testerConfig, {
    include: [OtpsModule, UsersModule]
  });
  SwaggerModule.setup(withBaseUrl('/tester'), app, testerDocument);

  const androidSampleConfig = new DocumentBuilder()
    .setTitle('android sample 🤖')
    .setDescription('Апи для android sample')
    .setVersion('1.0')
    .addServer(process.env.SERVER_URL)
    .build();

  const androidSampleDocument = SwaggerModule.createDocument(app, androidSampleConfig, {
    include: [AndroidSampleModule]
  });
  SwaggerModule.setup(withBaseUrl('/android-sample'), app, androidSampleDocument);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}/${BASE_URL}`);
}
bootstrap();
