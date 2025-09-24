import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleInputDto {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  name: string;
}
