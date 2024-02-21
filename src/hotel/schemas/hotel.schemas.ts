import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Room } from "src/room/schemas/room.schemas";
export type HotelDocument = HydratedDocument<Hotel>;
@Schema({ timestamps: true })
export class Hotel {
    @Prop({ require: true })
    name: string;

    @Prop({ require: true })
    address: string;

    @Prop({ required: true })
    description: string;

    @Prop({ require: true })
    rating: number;

    @Prop({ require: true })
    logo: string;
    @Prop({ require: true })
    phone: number;
    @Prop({ require: true })
    slider: []

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Room.name }] })
    roomId: mongoose.Schema.Types.ObjectId[];

    @Prop()
    createdAt: Date;

    @Prop({ require: true })
    updatedAt: Date;

    @Prop()
    deletedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    };
}
export const HotelSchema = SchemaFactory.createForClass(Hotel);
