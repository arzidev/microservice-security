import { QueryParamsDto } from '@/application/user/dto/query-params.dto';
import { UserEntity } from '../entities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepositoryInterface {
  getAll(): Promise<UserEntity[]>;
  search(filters: QueryParamsDto): Promise<UserEntity[]>;
  getById(userId: string): Promise<UserEntity | null>;
  insert(userData: Partial<UserEntity>): Promise<UserEntity | null>;
  update(
    userId: string,
    userData: Partial<UserEntity>,
  ): Promise<UserEntity | null>;
}
