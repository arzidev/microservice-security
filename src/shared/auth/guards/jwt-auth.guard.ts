import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    console.log('🔒 Ruta protegida, verificando token'); // Debug

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      console.log('❌ No se encontró header Authorization'); // Debug
      throw new UnauthorizedException('Token no proporcionado');
    }

    if (!authHeader.startsWith('Bearer ')) {
      console.log('❌ Header no tiene formato Bearer'); // Debug
      throw new UnauthorizedException('Formato de token inválido');
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // console.log('🎭 handleRequest llamado'); // Debug
    // console.log('Error:', err); // Debug
    // console.log('User:', user); // Debug
    // console.log('Info:', info); // Debug

    if (err) {
      console.log('❌ Error en handleRequest:', err); // Debug
      throw err;
    }

    if (!user) {
      console.log('❌ No user en handleRequest, info:', info); // Debug
      throw new UnauthorizedException('Token no válido o expirado');
    }

    const requiredPermissions =
      this.reflector.get<string[]>('permissions', context.getHandler()) || [];
    if (requiredPermissions.length) {
      const hasPermission = requiredPermissions.every((p) =>
        user.permissions.includes(p),
      );
      if (!hasPermission) {
        throw new UnauthorizedException('No tiene permisos suficientes');
      }
      console.log('permitido');
    }

    // console.log('✅ Usuario autenticado:', user); // Debug

    return user;
  }
}
