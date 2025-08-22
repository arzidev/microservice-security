import { IsEmail, IsOptional } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @IsEmail()
  email?: string;
}
