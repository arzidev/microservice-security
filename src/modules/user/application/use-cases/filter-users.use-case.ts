import { Inject, Injectable } from '@nestjs/common';
import { QueryParamsInputDto } from '@/modules/user/application/dto/query-params-input.dto';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserOutputDto } from '../dto/user-output.dto';
import { UserMapper } from '@/modules/user/interface/mappers/user.mapper';
import { USER_REPOSITORY } from '@/shared/tokens';

@Injectable()
export class FilterUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(params?: QueryParamsInputDto): Promise<UserOutputDto[] | null> {
    let data: UserEntity[];
    if (params && Object.values(params).some((v) => v !== undefined)) {
      data = await this.userRepository.search(params);
    } else {
      data = await this.userRepository.getAll();
    }
    if (data.length == 0) {
      return null;
    }
    return data.map((e) => {
      return UserMapper.toPublicDto(e);
    });
  }
}
