import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { UserController } from '@/modules/user/interface/controllers/user.controller';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { repositories } from '@/modules/user/infrastructure/repositories';
import { userUseCases } from './application/use-cases';
import { USER_REPOSITORY } from '@/shared/tokens';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...repositories,
    ...userUseCases,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [...userUseCases, USER_REPOSITORY],
})
export class UserModule {}
