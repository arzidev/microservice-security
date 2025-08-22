import { UserEntity } from '../entities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepositoryInterface {
  getAll(): Promise<UserEntity[]>;
  getByEmail(userEmail: string): Promise<UserEntity | null>;
  getById(userId: string): Promise<UserEntity | null>;
  insert(userData: Partial<UserEntity>): Promise<UserEntity | null>;
  update(
    userId: string,
    userData: Partial<UserEntity>,
  ): Promise<UserEntity | null>;
}
