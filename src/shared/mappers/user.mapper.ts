import { UserEntity } from '@domain/user/entities/user.entity';
import { User } from '@/infrastructure/database/user/entities/user.schema';

export const mapUserSchemaToEntity = (
  data: User & { _id: any },
): UserEntity => ({
  id: data._id.toString(),
  email: data.email,
  username: data.username,
  role: data.role,
  state: data.state,
});

export const mapUserEntityToResponse = (data: UserEntity) => ({
  id: data.id ?? '',
  email: data.email,
  username: data.username,
  role: data.role,
  state: data.state,
});
