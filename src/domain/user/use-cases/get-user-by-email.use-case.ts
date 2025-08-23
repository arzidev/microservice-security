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
export class GetUserByEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userEmail: string): Promise<UserEntity | null> {
    const data = await this.userRepository.getByEmail(userEmail);
    if (!data) {
      return null;
    }
    return data;
  }
}
