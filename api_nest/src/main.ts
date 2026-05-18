// TOUCHED TO RESTART APP
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  const configService = app.get(ConfigService);
  const port = configService.get<number>('env.port') || 3000;

  // Middleware
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(cookieParser());

  // CORS
  app.enableCors({
    origin: [
      'http://manfolio.id.vn',
      'https://manfolio.id.vn',
      'http://admin.manfolio.id.vn',
      'https://admin.manfolio.id.vn',
      'http://api.manfolio.id.vn',
      'https://api.manfolio.id.vn',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:9999',
      'http://192.168.1.2:3000',
      'http://192.168.1.2:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Static files
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });

  await app.listen(port, '0.0.0.0');
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Network access: http://192.168.1.2:${port}`);
}
bootstrap();
