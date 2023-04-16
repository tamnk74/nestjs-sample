import { IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'src/decorators/transforms.decorator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly refreshToken: string;
}
