import { BadRequestException } from '@nestjs/common';

export class UserPasswordNotValidException extends BadRequestException {
  constructor(error?: string) {
    super('error.user_password_not_valid', error);
  }
}
