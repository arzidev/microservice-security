import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export const mapUserSchemaToEntity = (data): UserEntity => ({
  id: data._id.toString(),
  email: data.email,
  username: data.username,
  role: data.role,
  state: data.state,
});

export const mapUserSchemaToEntityWitPassword = (data): UserEntity => ({
  id: data._id.toString(),
  email: data.email,
  username: data.username,
  role: data.role,
  state: data.state,
  password: data.password,
});

export const mapUserEntityToResponse = (data) => ({
  id: data.id ?? '',
  email: data.email,
  username: data.username,
  role: data.role,
  state: data.state,
});
