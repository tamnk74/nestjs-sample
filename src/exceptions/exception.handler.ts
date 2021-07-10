import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ApiException } from './api.exception';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  constructor(private config: ConfigService) {}
  catch(exception: HttpException | ApiException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof ApiException) {
      response
        .status(exception.getStatus())
        .json((<ApiException>exception).toJSON());
      return;
    }
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = (<HttpException>exception).getResponse();
      response.status(status).json({
        status,
        code: `ERR-${status}`,
        message: (<{ message: string }>res).message || res || exception.message,
        stack: !['staging', 'production'].includes(
          this.config.get('NODE_ENV') as string,
        )
          ? exception.stack
          : undefined,
      });
      return;
    }
    response.status(500).json(
      new ApiException({
        status: 500,
        code: 'ERR-500',
        message: (<Error>exception).message,
        stack:
          this.config.get('ENV') === 'development'
            ? (<Error>exception).stack
            : undefined,
      }),
    );
  }
}
