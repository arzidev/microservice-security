import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/modules/user/infrastructure/schemas/user.schema';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { UserRepositoryInterface } from '@/modules/user/domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name)
    private userCollection: Model<User>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    try {
      const data = await this.userCollection.find().lean();
      return data.map((e) => {
        return new UserEntity({
          id: e._id as string,
          email: e.email,
          username: e.username,
          roles: e.roles,
          state: e.state,
          password: e.password,
        });
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async search(filters: Partial<UserEntity>): Promise<UserEntity[]> {
    try {
      const usersFound = await this.userCollection.find(filters).exec();
      if (usersFound.length == 0) {
        return [];
      }
      return usersFound.map((e) => {
        return new UserEntity({
          id: e._id as string,
          email: e.email,
          username: e.username,
          roles: e.roles,
          state: e.state,
          password: e.password,
        });
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getByEmail(userEmail: string): Promise<UserEntity | null> {
    try {
      const userFound = await this.userCollection
        .findOne({ email: userEmail })
        .exec();
      if (!userFound) {
        return null;
      }
      return new UserEntity({
        id: userFound._id as string,
        email: userFound.email,
        username: userFound.username,
        roles: userFound.roles,
        state: userFound.state,
        password: userFound.password,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getByUsername(username: string): Promise<UserEntity | null> {
    try {
      const userFound = await this.userCollection.findOne({ username }).exec();
      if (!userFound) {
        return null;
      }
      return new UserEntity({
        id: userFound._id as string,
        email: userFound.email,
        username: userFound.username,
        roles: userFound.roles,
        state: userFound.state,
        password: userFound.password,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getById(userId: string): Promise<UserEntity | null> {
    try {
      const userFound = await this.userCollection.findById(userId).exec();
      if (!userFound) {
        return null;
      }
      console.log('userfound', userFound);
      const entidad = new UserEntity({
        id: userFound._id as string,
        email: userFound.email,
        username: userFound.username,
        roles: userFound.roles,
        state: userFound.state,
        password: userFound.password,
      });
      console.log('entidad', entidad);
      return entidad;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async insert(userData: Partial<UserEntity>): Promise<UserEntity | null> {
    try {
      const newUser = new this.userCollection({
        username: userData.username,
        password: userData.password,
        email: userData.email,
      });
      const saved = await newUser.save();
      return new UserEntity({
        id: saved._id as string,
        email: saved.email,
        username: saved.username,
        roles: saved.roles,
        state: saved.state,
        password: saved.password,
      });
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
      const userUpdated = await this.userCollection
        .findByIdAndUpdate(
          userId,
          {
            $set: userData,
          },
          { new: true },
        )
        .exec();

      if (!userUpdated) {
        return null;
      }
      return new UserEntity({
        id: userUpdated._id as string,
        email: userUpdated.email,
        username: userUpdated.username,
        roles: userUpdated.roles,
        state: userUpdated.state,
        password: userUpdated.password,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
