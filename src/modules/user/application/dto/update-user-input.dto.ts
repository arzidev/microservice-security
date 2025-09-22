import { IsEmail, IsString } from 'class-validator';

export class UpdateUserInputDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;
}
