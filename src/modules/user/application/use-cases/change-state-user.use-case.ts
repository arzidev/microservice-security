import { GetUsersDto } from '@/modules/user/interface/dto/get-users.dto';
import { Response } from '@/shared/models/response.model';
import { mapUserEntityToResponse } from '@/shared/mappers/user.mapper';
import { GenericResponses } from '@/shared/generic-responses';
import { ChangeStateUserDto } from '@/modules/user/interface/dto/change-state-user.dto';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../../domain/repositories/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ChangeStateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    userId: string,
    userData: ChangeStateUserDto,
  ): Promise<Response<GetUsersDto | void>> {
    const newData: { state: string } = {
      state: userData.state,
    };
    const inserted = await this.userRepository.update(userId, newData);
    if (!inserted) {
      return GenericResponses.GENERIC_SAVE_FAILED();
    }
    const mappedData = mapUserEntityToResponse(inserted);
    return GenericResponses.GENERIC_SAVE_SUCCESS(mappedData);
  }
}
