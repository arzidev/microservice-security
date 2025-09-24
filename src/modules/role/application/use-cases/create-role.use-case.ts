import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleInputDto } from '../dto/create-role-input.dto';
import { ROLE_REPOSITORY } from '@/shared/tokens';
import { RoleOutputDto } from '../dto/role-output.dto';
import { RoleRepositoryInterface } from '../../domain/repositories/role.repository.interface';
import { RoleEntity } from '../../domain/entities/role.entity';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}

  async execute(roleData: CreateRoleInputDto): Promise<RoleOutputDto | null> {
    const newRole: Partial<RoleEntity> = new RoleEntity({
      code: roleData.code,
      name: roleData.name,
    });
    const inserted = await this.roleRepository.insert(newRole);
    if (!inserted) {
      return null;
    }
    return {
      id: inserted.id,
      code: inserted.code,
      name: inserted.name,
      permissions: inserted.permissions ?? [],
    };
  }
}
