import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/entities';

export const User = createParamDecorator<UserEntity>(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);
