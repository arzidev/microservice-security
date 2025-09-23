import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { UserOutputDto } from '../dto/user-output.dto';
import { UserMapper } from '@/modules/user/interface/mappers/user.mapper';
import { USER_REPOSITORY } from '@/shared/tokens';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userId: string): Promise<UserOutputDto | null> {
    const data = await this.userRepository.getById(userId);
    if (!data) {
      return null;
    }
    return UserMapper.toPublicDto(data);
  }
}
