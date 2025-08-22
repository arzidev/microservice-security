import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/infrastructure/database/user/entities/user.schema';
import { UserEntity } from '@domain/user/entities/user.entity';
import { mapUserSchemaToEntity } from '@shared/mappers/user.mapper';
import { UserRepositoryInterface } from '@/domain/user/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name)
    private userCollection: Model<User>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    try {
      const data = await this.userCollection.find().lean();
      return data.map((u) => {
        return mapUserSchemaToEntity(u);
      });
    } catch (error) {
      return [];
    }
  }

  async getByEmail(userEmail: string): Promise<UserEntity | null> {
    try {
      const userFound = await this.userCollection
        .findOne({ email: userEmail })
        .lean();
      if (!userFound) {
        return null;
      }
      return mapUserSchemaToEntity(userFound);
    } catch (error) {
      throw new Error(error.stack);
    }
  }

  async getById(userId: string): Promise<UserEntity | null> {
    try {
      const userFound = await this.userCollection.findById(userId).exec();
      if (!userFound) {
        return null;
      }
      return mapUserSchemaToEntity(userFound);
    } catch (error) {
      throw new Error(error.stack);
    }
  }

  async insert(userData: UserEntity): Promise<UserEntity | null> {
    try {
      const newUser = new this.userCollection({
        username: userData.username,
        password: userData.password,
        state: userData.state,
        role: userData.role,
        email: userData.email,
      });
      console.log(userData);
      const saved = await newUser.save();
      return mapUserSchemaToEntity(saved);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(
    userId: string,
    userData: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    try {
      const newUser = await this.userCollection
        .findByIdAndUpdate(
          userId,
          {
            $set: userData,
          },
          { new: true },
        )
        .exec();

      if (!newUser) return null;
      return mapUserSchemaToEntity(newUser);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
