import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../repositories/user.repository.interface';
import { CreateUserDto } from '@/application/user/dto/create-user.dto';
import { GetUsersDto } from '@/application/user/dto/get-users.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userData: CreateUserDto): Promise<GetUsersDto> {
    const newUser: UserEntity = {
      id: '',
      username: userData.username,
      email: userData.email,
      role: userData.role,
      state: userData.state,
      password: userData.password,
    };
    const inserted = await this.userRepository.insert(newUser);
    if (!inserted) {
      throw new Error('No se guardó');
    }
    return {
      email: inserted.email,
      id: inserted.id,
      username: inserted.username,
      state: inserted.state,
      role: inserted.role,
    };
  }
}
