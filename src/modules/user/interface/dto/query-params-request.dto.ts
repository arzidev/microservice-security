import { IsEmail, IsOptional } from 'class-validator';

export class QueryParamsRequestDto {
  @IsOptional()
  @IsEmail()
  email?: string;
}
