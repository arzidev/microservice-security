import { IsEmail, IsString } from 'class-validator';

export class UserLoginInputDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
