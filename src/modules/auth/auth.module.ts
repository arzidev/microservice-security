import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/modules/auth/interface/controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { userUseCases } from '../user/application/use-cases';
import { RoleRepository } from './infrastructure/respositories/role.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/shared/auth/strategies/jwt-strategy';
import { authUseCases } from './application/use-cases';
import { PASSWORD_HASHER, ROLE_REPOSITORY } from './domain/tokens';
import { BcryptHasher } from './infrastructure/hashers/bcrypt-hasher';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
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
      provide: ROLE_REPOSITORY,
      useClass: RoleRepository,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: BcryptHasher,
    },
  ],
  exports: [ROLE_REPOSITORY, JwtModule, PassportModule, JwtStrategy],
})
export class AuthModule {}
