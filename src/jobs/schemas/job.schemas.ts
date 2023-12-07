import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type JobsDocument = HydratedDocument<Jobs>;
@Schema({ timestamps: true })
export class Jobs {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    skills: string[];

    @Prop({ type: Object })
    company: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
        logo: string
    };

    @Prop()
    location: string;

    @Prop()
    salary: number;

    @Prop()
    quantity: number;

    @Prop()
    level: string;

    @Prop({ type: String })
    description: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    isActive: boolean;

    @Prop()
    isDeleted: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedeAt: Date;

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



export const JobsSchema = SchemaFactory.createForClass(Jobs);
