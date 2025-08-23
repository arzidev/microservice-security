import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../../user/repositories/user.repository.interface';
import { GetUsersDto } from '@/application/user/dto/get-users.dto';
import { Response } from '@/shared/models/response.model';
import { mapUserEntityToResponse } from '@/shared/mappers/user.mapper';
import { GenericResponses } from '@/shared/generic-responses';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '@/application/user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { GetUserByEmailUseCase } from '@/domain/user/use-cases/get-user-by-email.use-case';
import { GetUserByUsernameUseCase } from '@/domain/user/use-cases/get-user-by-username.use-case';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    // private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(userData: LoginUserDto): Promise<Response<GetUsersDto | void>> {
    const user = await this.getUserByEmailUseCase.execute(userData.email);
    if (!user) {
      return GenericResponses.GENERIC_NOT_FOUND('Usuario no encontrado.');
    }
    const passwordMatched = await bcrypt.compare(
      userData.password,
      user.password as string,
    );
    if (!passwordMatched) {
      return GenericResponses.GENERIC_NOT_FOUND('Contraseña incorrecta.');
    }

    const payload = {
      sub: user[0].id,
      email: user[0].email,
      userName: user[0].username,
      role: user[0].role,
    };
    const token = this.jwtService.sign(payload);
    return GenericResponses.GENERIC_SUCCESS(
      'Se ha iniciado sesión correctamente.',
      {
        token: token,
        user: mapUserEntityToResponse(user[0]),
      },
    );
  }
}
