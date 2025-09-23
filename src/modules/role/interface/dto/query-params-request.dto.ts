import { IsString } from 'class-validator';

export class QueryParamsRequestDto {
  @IsString()
  code?: string;
}
