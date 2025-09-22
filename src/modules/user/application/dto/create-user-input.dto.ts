import { IsEmail, IsString } from 'class-validator';

export class CreateUserInputDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
