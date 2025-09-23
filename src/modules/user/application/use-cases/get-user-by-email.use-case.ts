import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { UserOutputDto } from '../dto/user-output.dto';
import { UserMapper } from '@/modules/user/interface/mappers/user.mapper';
import { USER_REPOSITORY } from '@/shared/tokens';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userEmail: string): Promise<UserOutputDto | null> {
    const data = await this.userRepository.getByEmail(userEmail);
    if (!data) {
      return null;
    }
    return UserMapper.toPublicDto(data);
  }
}
