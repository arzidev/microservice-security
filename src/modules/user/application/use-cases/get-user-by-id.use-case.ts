import { Inject, Injectable } from '@nestjs/common';
import { GenericResponses } from '@/shared/generic-responses';
import { GetUsersDto } from '@/modules/user/interface/dto/get-users.dto';
import { Response } from '@/shared/models/response.model';
import { mapUserEntityToResponse } from '@/shared/mappers/user.mapper';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userId: string): Promise<Response<GetUsersDto[] | void>> {
    const data = await this.userRepository.getById(userId);
    if (!data) {
      return GenericResponses.GENERIC_NOT_FOUND('No se encontraron datos');
    }
    const dataFormated: GetUsersDto = mapUserEntityToResponse(data);
    return GenericResponses.GENERIC_FOUND_DATA(
      'Se encontraron datos',
      dataFormated,
    );
  }
}
