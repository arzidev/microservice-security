import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../repositories/user.repository.interface';
import { GetUsersDto } from '@/application/user/dto/get-users.dto';
import { UserEntity } from '../entities/user.entity';
import { Response } from '@/shared/models/response.model';
import { mapUserEntityToResponse } from '@/shared/mappers/user.mapper';
import { GenericResponses } from '@/shared/generic-responses';
import { UpdateUserDto } from '@/application/user/dto/update-user.dto';
import { ChangeStateUserDto } from '@/application/user/dto/change-state-user.dto';

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
