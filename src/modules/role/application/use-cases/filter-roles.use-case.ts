import { Inject, Injectable } from '@nestjs/common';
import { RoleRepositoryInterface } from '../../domain/repositories/role.repository.interface';
import { RoleEntity } from '../../domain/entities/role.entity';
import { QueryParamsInputDto } from '../dto/query-params-input.dto';
import { RoleOutputDto } from '../dto/role-output.dto';
import { ROLE_REPOSITORY } from '@/shared/tokens';

@Injectable()
export class FilterRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}

  async execute(params?: QueryParamsInputDto): Promise<RoleOutputDto[] | null> {
    let rolesFound: RoleEntity[];
    if (params && Object.values(params).some((v) => v !== undefined)) {
      rolesFound = await this.roleRepository.search(params);
    } else {
      rolesFound = await this.roleRepository.getAll();
    }
    if (rolesFound.length == 0) {
      return null;
    }
    return rolesFound.map((e) => ({
      id: e.id,
      code: e.code,
      name: e.name,
      permissions: e.permissions ?? [],
    }));
  }
}
