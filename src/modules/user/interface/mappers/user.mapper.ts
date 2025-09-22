import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { User } from '@/modules/user/infrastructure/schemas/user.schema';
import { UserOutputDto } from '../../application/dto/user-output.dto';

export class UserMapper {
  // BD -> Entity
  static toEntity(document: User): UserEntity {
    return new UserEntity({
      id: document._id as string,
      email: document.email,
      username: document.username,
      roles: document.roles,
      state: document.state,
      password: document.password,
    });
  }

  static toPublicDto(entity: UserEntity): UserOutputDto {
    return {
      id: entity.id,
      email: entity.email,
      username: entity.username,
      roles: entity.roles,
      state: entity.state,
      permissions: entity.permissions,
    };
  }
}
