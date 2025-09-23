import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Permission } from './permission.schema';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Permission.name }] })
  permissions: Permission[] | Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
