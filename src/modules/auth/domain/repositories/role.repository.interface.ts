import { Role } from '../../infrastructure/schemas/role.schema';

export interface RoleRepositoryInterface {
  getPermissionsByRoles(roles: string[]): Promise<string[]>;
  populateCollections();
  // Asignar permisos a role

  // Crear role
}
