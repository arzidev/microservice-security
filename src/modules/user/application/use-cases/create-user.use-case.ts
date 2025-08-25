import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@/modules/user/interface/dto/create-user.dto';
import { GetUsersDto } from '@/modules/user/interface/dto/get-users.dto';
import { Response } from '@/shared/models/response.model';
import { mapUserEntityToResponse } from '@/shared/mappers/user.mapper';
import { GenericResponses } from '@/shared/generic-responses';
import { UserEntity } from '../../domain/entities/user.entity';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    userData: CreateUserDto,
  ): Promise<Response<GetUsersDto | void>> {
    const newUser: Partial<UserEntity> = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };
    const inserted = await this.userRepository.insert(newUser);
    if (!inserted) {
      return GenericResponses.GENERIC_SAVE_FAILED();
    }
    const mappedData = mapUserEntityToResponse(inserted);
    return GenericResponses.GENERIC_SAVE_SUCCESS(mappedData);
  }
}
