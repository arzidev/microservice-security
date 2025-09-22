import { CreateUserUseCase } from './create-user.use-case';
import { UpdateUserUseCase } from './update-user.use-case';
import { FilterUsersUseCase } from './filter-users.use-case';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { GetUserByEmailUseCase } from './get-user-by-email.use-case';
import { DeactivateUserUseCase } from './deactivate-user.use-case';
import { ActivateUserUseCase } from './activate-user.use-case';

export const userUseCases = [
  CreateUserUseCase,
  UpdateUserUseCase,
  DeactivateUserUseCase,
  ActivateUserUseCase,
  FilterUsersUseCase,
  GetUserByIdUseCase,
  GetUserByEmailUseCase,
];

export {
  CreateUserUseCase,
  UpdateUserUseCase,
  DeactivateUserUseCase,
  ActivateUserUseCase,
  FilterUsersUseCase,
  GetUserByIdUseCase,
  GetUserByEmailUseCase,
};
