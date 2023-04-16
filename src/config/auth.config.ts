import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  secret: process.env.JWT_SECRET_KEY,
  refreshSecret: process.env.JWT_REFRESH_SECRET_KEY,
  signOptions: { expiresIn: process.env.JWT_EXPIRED_TIME },
}));
