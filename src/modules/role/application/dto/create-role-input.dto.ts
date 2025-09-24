import { IsEmail, IsString } from 'class-validator';

export class CreateRoleInputDto {
  @IsString()
  code: string;

  @IsString()
  name: string;
}
