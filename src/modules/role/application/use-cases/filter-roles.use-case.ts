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
    let data: RoleEntity[];
    if (params && Object.keys(params).length > 0) {
      data = await this.roleRepository.search(params);
    } else {
      data = await this.roleRepository.getAll();
    }
    if (data.length == 0) {
      return null;
    }
    return data;
  }
}
