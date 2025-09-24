import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from '@/shared/tokens';
import { RoleOutputDto } from '../dto/role-output.dto';
import { RoleRepositoryInterface } from '../../domain/repositories/role.repository.interface';

@Injectable()
export class GetRoleByIdUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}

  async execute(roleId: string): Promise<RoleOutputDto | null> {
    const roleFound = await this.roleRepository.getById(roleId);
    if (!roleFound) {
      return null;
    }
    return {
      id: roleFound.id,
      code: roleFound.code,
      name: roleFound.name,
      permissions: roleFound.permissions ?? [],
    };
  }
}
