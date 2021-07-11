import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { Trim } from 'decorators/transforms.decorator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly password: string;
}
