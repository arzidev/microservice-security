import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Module as ModuleModel } from './module.schema';

@Schema({ timestamps: true })
export class Permission extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: ModuleModel.name, required: true })
  module: ModuleModel | Types.ObjectId;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
