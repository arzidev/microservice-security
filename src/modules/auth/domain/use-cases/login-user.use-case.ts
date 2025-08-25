import { Injectable } from '@nestjs/common';
import { GetUsersDto } from '@/modules/user/interface/dto/get-users.dto';
import { Response } from '@/shared/models/response.model';
import { mapUserEntityToResponse } from '@/shared/mappers/user.mapper';
import { GenericResponses } from '@/shared/generic-responses';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '@/modules/user/interface/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { GetUserByEmailUseCase } from '@/modules/user/application/use-cases';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    // private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    userData: LoginUserDto,
  ): Promise<Response<{ token: string; user: GetUsersDto } | void>> {
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
      sub: user.id,
      email: user.email,
      userName: user.username,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return GenericResponses.GENERIC_SUCCESS(
      'Se ha iniciado sesión correctamente.',
      {
        token: token,
        user: mapUserEntityToResponse(user),
      },
    );
  }
}
