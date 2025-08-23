import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { authUseCases } from '@/domain/auth/use-cases';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/application/auth/controllers/auth.controller';
import { userUseCases } from '@/domain/user/use-cases';
import { USER_REPOSITORY } from '@/domain/user/repositories/user.repository.interface';
import { UserRepository } from '@/infrastructure/database/user/repositories';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // secreto para firmar tokens
      signOptions: { expiresIn: '1h' }, // duración del token
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...authUseCases,
    ...userUseCases,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [],
})
export class AuthModule {}
