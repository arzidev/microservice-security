import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { UserController } from '@/application/user/controllers/user.controller';
import { USER_REPOSITORY } from '@/domain/user/repositories/user.repository.interface';
import { UserUseCases } from '@/domain/user/use-cases';
import { UserRepository } from '@/infrastructure/database/user/repositories/user.repository';
import { repositories } from '@/infrastructure/database/user/repositories';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...repositories,
    ...UserUseCases,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [],
})
export class UserModule {}
