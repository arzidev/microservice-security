import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../../domain/repositories/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserOutputDto } from '../dto/user-output.dto';
import { UserMapper } from '@/modules/user/interface/mappers/user.mapper';

@Injectable()
export class ActivateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userId: string): Promise<UserOutputDto | null> {
    const userFound = await this.userRepository.getById(userId);
    if (!userFound) {
      return null;
    }
    const userUpdated = await this.userRepository.update(userId, {
      state: 'activo',
    });

    if (!userUpdated) {
      return null;
    }

    return UserMapper.toPublicDto(userUpdated);
  }
}
