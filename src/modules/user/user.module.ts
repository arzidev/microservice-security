import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { UserRepository } from '@/infrastructure/database/user/repositories/user.repository';
import { USER_REPOSITORY } from '@/domain/user/repositories/user.repository.interface';
import { UserController } from '@/application/user/controllers/user.controller';
import { GetUsersUseCase } from '@/domain/user/use-cases/get-users.use-case';
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserRepository,
    GetUsersUseCase,
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [],
})
export class UserModule {}
