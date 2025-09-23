import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { UserOutputDto } from '../dto/user-output.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '@/modules/user/interface/mappers/user.mapper';
import { CreateUserInputDto } from '../dto/create-user-input.dto';
import { USER_REPOSITORY } from '@/shared/tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userData: CreateUserInputDto): Promise<UserOutputDto | null> {
    const newUser = new UserEntity({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      roles: ['user'],
      state: 'activo',
      permissions: [],
    });
    const inserted = await this.userRepository.insert(newUser);
    if (!inserted) {
      return null;
    }
    return UserMapper.toPublicDto(inserted);
  }
}
