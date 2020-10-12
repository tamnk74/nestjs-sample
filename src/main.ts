import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as RateLimit from 'express-rate-limit';
import * as morgan from 'morgan';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: { target: false },
    }),
  );

  app.enable('trust proxy');
  app.use(helmet());
  app.use(RateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
  app.use(compression());
  app.use(morgan('combined'));
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT', '3000'));
}
bootstrap();
