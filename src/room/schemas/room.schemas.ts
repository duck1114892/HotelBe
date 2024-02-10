import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Hotel } from "src/hotel/schemas/hotel.schemas";
export type RoomDocument = HydratedDocument<Room>;
@Schema({ timestamps: true })
export class Room {
    @Prop({ require: true })
    name: string;

    @Prop({ require: true, ref: 'Hotel' })
    hotelId: string;

    @Prop({ required: true })
    description: string;

    @Prop({ require: true })
    type: string;

    @Prop({ require: true })
    address: string;

    @Prop({ require: true })
    price: number;

    @Prop({ require: true })
    availability: string;

    @Prop({ require: true })
    img: string;

    @Prop({ require: true })
    slider: [string];

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
export const RoomSchema = SchemaFactory.createForClass(Room);
