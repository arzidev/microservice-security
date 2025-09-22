import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginOutputDto } from '../dto/auth/user-login-output.dto';
import { UserLoginInputDto } from '../dto/auth/user-login-input.dto';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '@/modules/user/domain/repositories/user.repository.interface';
import { PASSWORD_HASHER } from '../../domain/tokens';
import { IPasswordHasher } from '../../domain/hashers/password-hasher.interface';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(
    userData: UserLoginInputDto,
  ): Promise<UserLoginOutputDto | null> {
    const user = await this.userRepository.getByEmail(userData.email);
    if (!user) {
      return null;
    }
    const passwordMatched = await this.passwordHasher.compare(
      userData.password,
      user.password,
    );
    console.log('aajnjnhfsdf', passwordMatched);
    if (!passwordMatched) {
      return null;
    }
    const payload = {
      sub: user.id,
      email: user.email,
      userName: user.username,
      roles: user.roles,
    };

    const token = this.jwtService.sign(payload);
    return {
      token: token,
      userId: user.id as string,
      email: user.email,
      roles: user.roles,
      state: user.state,
      username: user.username,
    };
  }
}
