import { Inject, Injectable } from '@nestjs/common';
import { UserRegisterOutputDto } from '../dto/auth/user-register-output.dto';
import { UserRegisterInputDto } from '../dto/auth/user-register-input.dto';
import { CreateUserUseCase } from '@/modules/user/application/use-cases';
import { IPasswordHasher } from '../../domain/hashers/password-hasher.interface';
import { CreateUserInputDto } from '@/modules/user/application/dto/create-user-input.dto';
import { PASSWORD_HASHER } from '@/shared/tokens';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(
    userData: UserRegisterInputDto,
  ): Promise<UserRegisterOutputDto | null> {
    const hashedPassword = await this.passwordHasher.hash(userData.password);
    const newUser: CreateUserInputDto = {
      password: hashedPassword,
      email: userData.email,
      username: userData.username,
    };
    const userCreated = await this.createUserUseCase.execute(newUser);
    if (!userCreated) {
      return null;
    }
    return {
      userId: userCreated.id,
      username: userCreated.username,
      email: userCreated.email,
      roles: userCreated.roles,
      state: userCreated.state,
    };
  }
}
