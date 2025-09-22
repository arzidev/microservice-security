import { IsEmail, IsString } from 'class-validator';

export class UserRegisterInputDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
