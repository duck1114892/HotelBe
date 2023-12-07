import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/companies/schemas/company.schemas';
import { Jobs } from 'src/jobs/schemas/job.schemas';
import { Users } from 'src/users/schemas/users.schema';
export type ResumeDocument = HydratedDocument<Resume>;
@Schema({ timestamps: true })
export class Resume {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Users.name })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop()
    url: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Users.name })
    status: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    companyId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Jobs.name })
    jobId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.Array })
    history: {
        status: string;

        updatedAt: Date;
        updatedBy: {
            _id: string,
            email: string
        }
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



export const ResumeSchema = SchemaFactory.createForClass(Resume);
