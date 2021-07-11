import { ConfigService } from '@nestjs/config';

export const jwtConfig = (configService: ConfigService) => ({
  secret: configService.get('JWT_SECRET_KEY', 'local'),
  signOptions: { expiresIn: configService.get('JWT_EXPIRED_TIME', '1h') },
});
