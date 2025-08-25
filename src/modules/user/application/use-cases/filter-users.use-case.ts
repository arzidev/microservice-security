import { Inject, Injectable } from '@nestjs/common';
import { GenericResponses } from '@/shared/generic-responses';
import { GetUsersDto } from '@/modules/user/interface/dto/get-users.dto';
import { Response } from '@/shared/models/response.model';
import { mapUserEntityToResponse } from '@/shared/mappers/user.mapper';
import { QueryParamsDto } from '@/modules/user/interface/dto/query-params.dto';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class FilterUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    params?: QueryParamsDto,
  ): Promise<Response<GetUsersDto[] | void>> {
    let data: UserEntity[];
    if (params && Object.keys(params).length > 0) {
      data = await this.userRepository.search(params);
    } else {
      data = await this.userRepository.getAll();
    }
    if (data.length == 0) {
      return GenericResponses.GENERIC_NOT_FOUND('No se encontraron datos');
    }
    const dataFormated: GetUsersDto[] = data.map((e) =>
      mapUserEntityToResponse(e),
    );
    return GenericResponses.GENERIC_FOUND_DATA(
      'Se encontraron datos',
      dataFormated,
    );
  }
}
