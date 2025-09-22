import { QueryParamsInputDto } from '@/modules/user/application/dto/query-params-input.dto';
import { UserEntity } from '../entities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepositoryInterface {
  getAll(): Promise<UserEntity[]>;
  search(filters: QueryParamsInputDto): Promise<UserEntity[]>;
  getByEmail(email: string): Promise<UserEntity | null>;
  getByUsername(username: string): Promise<UserEntity | null>;
  getById(userId: string): Promise<UserEntity | null>;
  insert(userData: Partial<UserEntity>): Promise<UserEntity | null>;
  update(
    userId: string,
    userData: Partial<UserEntity>,
  ): Promise<UserEntity | null>;
}
