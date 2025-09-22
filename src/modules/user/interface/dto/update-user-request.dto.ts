import { IsEmail, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;
}
