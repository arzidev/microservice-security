import { UserState } from '@/shared/constants';
import { IsEnum, IsIn } from 'class-validator';

export class ChangeStateUserDto {
  @IsEnum(UserState, { message: 'state must be Activo or Inactivo' })
  state: string;
}
