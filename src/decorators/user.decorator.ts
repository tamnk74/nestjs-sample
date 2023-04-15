import { UserEntity } from '@/modules/users/entities';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator<UserEntity>(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);
