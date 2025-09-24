import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from '@/shared/tokens';
import { CreateRoleInputDto } from '../dto/create-role-input.dto';
import { RoleRepositoryInterface } from '../../domain/repositories/role.repository.interface';
import { RoleOutputDto } from '../dto/role-output.dto';
import { RoleEntity } from '../../domain/entities/role.entity';
import { UpdateRoleInputDto } from '../dto/update-role-input.dto';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}

  async execute(
    roleId: string,
    roleData: UpdateRoleInputDto,
  ): Promise<RoleOutputDto | null> {
    const userFound = await this.roleRepository.getById(roleId);
    if (!userFound) {
      return null;
    }
    const newData: Partial<RoleEntity> = {
      ...(roleData.code && { code: roleData.code }),
      ...(roleData.name && { name: roleData.name }),
    };
    const roleUpdated = await this.roleRepository.update(roleId, newData);
    if (!roleUpdated) {
      return null;
    }
    return {
      id: roleUpdated.id,
      code: roleUpdated.code,
      name: roleUpdated.name,
      permissions: roleUpdated.permissions ?? [],
    };
  }
}
