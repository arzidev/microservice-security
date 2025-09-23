import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RoleRepository } from './infrastructure/repositories/role.repository';
import { RoleController } from './interface/controllers/role.controller';
import { rolesUseCases } from './application/use-cases';
import { ROLE_REPOSITORY } from '@/shared/tokens';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [
    ...rolesUseCases,
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepository,
    },
  ],
  exports: [ROLE_REPOSITORY],
})
export class RoleModule {}
