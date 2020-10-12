import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}