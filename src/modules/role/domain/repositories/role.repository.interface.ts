import { QueryParamsInputDto } from '../../application/dto/query-params-input.dto';
import { RoleEntity } from '../entities/role.entity';

export interface RoleRepositoryInterface {
  getPermissionsByRoles(roles: string[]): Promise<string[]>;
  getAll(): Promise<RoleEntity[]>;
  search(filters: Partial<RoleEntity>): Promise<RoleEntity[]>;
  getById(userId: string): Promise<RoleEntity | null>;
  insert(userData: Partial<RoleEntity>): Promise<RoleEntity | null>;
  update(
    roleId: string,
    roleData: Partial<RoleEntity>,
  ): Promise<RoleEntity | null>;

  // populateCollections();
}
