import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/infrastructure/database/user/schemas/user.schema';
import { UserEntity } from '@domain/user/entities/user.entity';
import {
  mapUserSchemaToEntity,
  mapUserSchemaToEntityWitPassword,
} from '@shared/mappers/user.mapper';
import { UserRepositoryInterface } from '@/domain/user/repositories/user.repository.interface';
import { QueryParamsDto } from '@/application/user/dto/query-params.dto';

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

  async search(filters: QueryParamsDto): Promise<UserEntity[]> {
    try {
      const usersFound = await this.userCollection.find(filters).exec();
      if (usersFound.length == 0) {
        return [];
      }
      return usersFound.map((e) => mapUserSchemaToEntity(e));
    } catch (error) {
      return [];
    }
  }

  async getByEmail(userEmail: string): Promise<UserEntity | null> {
    try {
      const usersFound = await this.userCollection
        .findOne({ email: userEmail })
        .exec();
      if (!usersFound) {
        return null;
      }
      return mapUserSchemaToEntityWitPassword(usersFound);
    } catch (error) {
      return null;
    }
  }

  async getByUsername(username: string): Promise<UserEntity | null> {
    try {
      const usersFound = await this.userCollection.findOne({ username }).exec();
      if (!usersFound) {
        return null;
      }
      return mapUserSchemaToEntityWitPassword(usersFound);
    } catch (error) {
      return null;
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

  async insert(userData: Partial<UserEntity>): Promise<UserEntity | null> {
    try {
      const newUser = new this.userCollection({
        username: userData.username,
        password: userData.password,
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
