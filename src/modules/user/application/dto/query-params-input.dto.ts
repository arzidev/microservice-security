import { IsEmail, IsOptional } from 'class-validator';

export class QueryParamsInputDto {
  @IsOptional()
  @IsEmail()
  email?: string;
}
