import { UserEntity } from '../entities/user.entity';

export interface UserRepositoryInterface {
  getAll(): Promise<UserEntity[]>;
  search(filters: Partial<UserEntity>): Promise<UserEntity[]>;
  getByEmail(email: string): Promise<UserEntity | null>;
  getByUsername(username: string): Promise<UserEntity | null>;
  getById(userId: string): Promise<UserEntity | null>;
  insert(userData: Partial<UserEntity>): Promise<UserEntity | null>;
  update(
    userId: string,
    userData: Partial<UserEntity>,
  ): Promise<UserEntity | null>;
}
