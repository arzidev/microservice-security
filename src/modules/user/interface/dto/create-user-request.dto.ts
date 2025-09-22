import { IsEmail, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
