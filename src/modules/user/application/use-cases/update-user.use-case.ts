import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserInputDto } from '@/modules/user/application/dto/update-user-input.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { UserOutputDto } from '../dto/user-output.dto';
import { UserMapper } from '@/modules/user/interface/mappers/user.mapper';
import { USER_REPOSITORY } from '@/shared/tokens';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    userId: string,
    userData: UpdateUserInputDto,
  ): Promise<UserOutputDto | null> {
    const userFound = await this.userRepository.getById(userId);
    if (!userFound) {
      return null;
    }
    const newData: Partial<UserEntity> = {
      ...(userData.email && { email: userData.email }),
      ...(userData.username && { username: userData.username }),
    };
    const userUpdated = await this.userRepository.update(userId, newData);
    if (!userUpdated) {
      return null;
    }
    return UserMapper.toPublicDto(userUpdated);
  }
}
