import { CreateUserUseCase } from './create-user.use-case';
import { UpdateUserUseCase } from './update-user.use-case';
import { ChangeStateUserUseCase } from './change-state-user.use-case';
import { FilterUsersUseCase } from './filter-users.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { GetUserByEmailUseCase } from './get-user-by-email.use-case';
import { GetUserByUsernameUseCase } from './get-user-by-username.use-case';

export const userUseCases = [
  CreateUserUseCase,
  UpdateUserUseCase,
  ChangeStateUserUseCase,
  FilterUsersUseCase,
  GetUserByIdUseCase,
  GetUserByEmailUseCase,
  GetUserByUsernameUseCase,
];

// Si igual quieres, puedes exportar individuales:
export {
  CreateUserUseCase,
  UpdateUserUseCase,
  ChangeStateUserUseCase,
  FilterUsersUseCase,
  GetUserByIdUseCase,
  GetUserByEmailUseCase,
  GetUserByUsernameUseCase,
};
