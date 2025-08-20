import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '@/infrastructure/database/user/entities/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

const collections = [{ name: User.name, schema: UserSchema }];

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
    }),
    MongooseModule.forFeature(collections),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
