import { UserState } from '@/shared/constants';
import { IsEnum } from 'class-validator';

export class ChangeStateUserInputDto {
  @IsEnum(UserState, { message: 'state must be Activo or Inactivo' })
  state: string;
}
