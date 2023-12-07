import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Permission } from "src/permissions/schemas/permission.schemas";
export type RoleDocument = HydratedDocument<Role>;
@Schema({ timestamps: true })
export class Role {
    @Prop({ require: true })
    name: string;

    @Prop({ require: true })
    description: string;

    @Prop({ required: true })
    isActive: boolean;

    @Prop({ require: true, type: [{ type: mongoose.Schema.Types.ObjectId }], ref: Permission.name })
    permission: Permission[];

    @Prop()
    createdAt: Date;

    @Prop({ require: true })
    updatedAt: Date;

    @Prop()
    deletedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId } })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId } })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId } })
    deleteddBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };
}
export const RoleSchemas = SchemaFactory.createForClass(Role);