import { IsOptional, IsString } from 'class-validator';

export class QueryParamsRequestDto {
  @IsOptional()
  @IsString()
  code?: string;
}
