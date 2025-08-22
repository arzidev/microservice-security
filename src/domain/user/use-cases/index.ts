import { CreateUserUseCase } from './create-user.use-case';
import { UpdateUserUseCase } from './update-user.use-case';
import { GetUsersUseCase } from './get-users.use-case';
import { ChangeStateUserUseCase } from './change-state-user.use-case';

export const UserUseCases = [
  CreateUserUseCase,
  UpdateUserUseCase,
  GetUsersUseCase,
  ChangeStateUserUseCase,
];

// Si igual quieres, puedes exportar individuales:
export {
  CreateUserUseCase,
  UpdateUserUseCase,
  GetUsersUseCase,
  ChangeStateUserUseCase,
};
