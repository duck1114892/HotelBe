import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Permission } from 'src/permissions/schemas/permission.schemas';
import { Role } from 'src/roles/schemas/role.schemas';
export type UsersDocument = HydratedDocument<Users>;
@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  age: string;

  @Prop()
  gender: string;

  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: Permission.name })
  permission: mongoose.Schema.Types.ObjectId
  @Prop()
  address: string;

  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: Role.name })
  role: mongoose.Schema.Types.ObjectId;

  @Prop()
  refreshToken: string;

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedeAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string
  };
}

export const UsersSchema = SchemaFactory.createForClass(Users);
