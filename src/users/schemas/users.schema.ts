import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UsersDocument = HydratedDocument<Users>;
@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  address: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedeAt: Date;
  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
