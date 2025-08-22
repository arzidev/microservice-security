import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../repositories/user.repository.interface';
import { UserEntity } from '../entities/user.entity';
import { GenericResponses } from '@/shared/generic-responses';
import { GetUsersDto } from '@/application/user/dto/get-users.dto';
import { Response } from '@/shared/models/response.model';
import { mapUserEntityToResponse } from '@/shared/mappers/user.mapper';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(): Promise<Response<GetUsersDto[] | void>> {
    const data: UserEntity[] = await this.userRepository.getAll();
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
