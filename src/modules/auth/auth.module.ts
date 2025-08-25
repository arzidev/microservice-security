import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { authUseCases } from '@/modules/auth/domain/use-cases';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/modules/auth/application/controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { userUseCases } from '../user/application/use-cases';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // secreto para firmar tokens
      signOptions: { expiresIn: '1h' }, // duración del token
    }),
  ],
  controllers: [AuthController],
  providers: [...authUseCases, ...userUseCases],
  exports: [],
})
export class AuthModule {}
