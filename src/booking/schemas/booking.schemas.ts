import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Hotel } from "src/hotel/schemas/hotel.schemas";
import { Room } from "src/room/schemas/room.schemas";
import { Users } from "src/users/schemas/users.schema";
export type BookingDocument = HydratedDocument<Booking>;
@Schema({ timestamps: true })
export class Booking {
    @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: Users.name })
    userId: string;

    @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: Room.name })
    roomId: string;

    @Prop({ require: true })
    checkInDate: Date;

    @Prop({ require: true })
    checkOutDate: Date;

    @Prop({ require: true })
    total: string;

    @Prop({ require: true })
    quantity: number;

    @Prop()
    status: string;
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
export const BookingSchema = SchemaFactory.createForClass(Booking);
