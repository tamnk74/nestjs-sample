import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { ExceptionHandlerFilter } from 'src/exceptions';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: { target: false },
    }),
  );

  app.enable('trust proxy');
  app.use(helmet());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
  app.use(compression());
  app.use(morgan('combined'));
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  app.useGlobalFilters(new ExceptionHandlerFilter(configService));
  await app.listen(
    configService.get<string>('PORT' as never, '3000'),
    '0.0.0.0',
  );
}
bootstrap();
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(
      new Date().toUTCString() + ' uncaughtException:',
      err.message,
    );
    console.error(err.stack);
    process.exit(1);
  });
