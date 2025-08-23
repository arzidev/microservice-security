import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@/application/user/dto/create-user.dto';
import { GetUsersDto } from '@/application/user/dto/get-users.dto';
import { Response } from '@/shared/models/response.model';
import * as bcrypt from 'bcrypt';
import { CreateUserUseCase } from '@/domain/user/use-cases';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  private readonly saltRounds = 10;

  private async hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, this.saltRounds);
    return hashed;
  }

  async execute(
    userData: CreateUserDto,
  ): Promise<Response<GetUsersDto | void>> {
    const hashedPassword = await this.hashPassword(userData.password);
    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    return await this.createUserUseCase.execute(newUser);
  }
}
