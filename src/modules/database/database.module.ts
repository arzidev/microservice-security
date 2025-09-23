import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '@/modules/user/infrastructure/schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Permission,
  PermissionSchema,
} from '../role/infrastructure/schemas/permission.schema';
import { Role, RoleSchema } from '../role/infrastructure/schemas/role.schema';
import {
  Module as ModuleModel,
  ModuleSchema,
} from '../role/infrastructure/schemas/module.schema';

const collections = [
  { name: User.name, schema: UserSchema },
  { name: Role.name, schema: RoleSchema },
  { name: Permission.name, schema: PermissionSchema },
  { name: ModuleModel.name, schema: ModuleSchema },
];

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
