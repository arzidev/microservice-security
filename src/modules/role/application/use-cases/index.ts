import { CreateRoleUseCase } from './create-role.use-case';
import { FilterRolesUseCase } from './filter-roles.use-case';
import { GetRoleByIdUseCase } from './get-role-by-id.use-case';
import { UpdateRoleUseCase } from './update-role.use-case';

export const rolesUseCases = [
  FilterRolesUseCase,
  GetRoleByIdUseCase,
  UpdateRoleUseCase,
  CreateRoleUseCase,
];

export {
  FilterRolesUseCase,
  GetRoleByIdUseCase,
  UpdateRoleUseCase,
  CreateRoleUseCase,
};
