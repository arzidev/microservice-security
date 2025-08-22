import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../repositories/user.repository.interface';
import { GenericResponses } from '@/shared/generic-responses';
import { GetUsersDto } from '@/application/user/dto/get-users.dto';
import { Response } from '@/shared/models/response.model';
import { mapUserEntityToResponse } from '@/shared/mappers/user.mapper';
import { QueryParamsDto } from '@/application/user/dto/query-params.dto';

@Injectable()
export class FilterUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    params: QueryParamsDto,
  ): Promise<Response<GetUsersDto[] | void>> {
    const data = await this.userRepository.search(params);
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
