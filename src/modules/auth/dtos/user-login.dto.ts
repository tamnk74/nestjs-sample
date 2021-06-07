import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { Trim } from 'decorators/transforms.decorator';

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
