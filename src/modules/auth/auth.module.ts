import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/modules/auth/interface/controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { userUseCases } from '../user/application/use-cases';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/shared/auth/strategies/jwt-strategy';
import { authUseCases } from './application/use-cases';
import { BcryptHasher } from './infrastructure/hashers/bcrypt-hasher';
import { RoleModule } from '../role/role.module';
import { PASSWORD_HASHER } from '@/shared/tokens';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    RoleModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secreto',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    ...authUseCases,
    ...userUseCases,
    {
      provide: PASSWORD_HASHER,
      useClass: BcryptHasher,
    },
  ],
  exports: [JwtModule, PassportModule, JwtStrategy],
})
export class AuthModule {}
