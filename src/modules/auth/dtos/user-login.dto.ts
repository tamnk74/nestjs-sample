import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'src/decorators/transforms.decorator';

export class UserLoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
