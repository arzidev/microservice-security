import { RoleRepositoryInterface } from '@/modules/auth/domain/repositories/role.repository.interface';
import { ROLE_REPOSITORY } from '@/modules/auth/domain/tokens';
import { GetUserByIdUseCase } from '@/modules/user/application/use-cases';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepositoryInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secreto',
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.getUserByIdUseCase.execute(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      if (user.state === 'Inactivo') {
        throw new UnauthorizedException('Usuario inactivo');
      }

      const userPermissions = await this.roleRepository.getPermissionsByRoles(
        user.roles,
      );
      // Retorna el usuario que se agregará al request
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        permissions: userPermissions,
      };
    } catch (error) {
      console.log('invalido', error);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
