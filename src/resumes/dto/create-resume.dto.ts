import { IsEmail, IsMongoId, IsNotEmpty, isEmail } from "class-validator";
import mongoose from "mongoose";

export class CreateResumeDto {
    @IsEmail({}, { message: 'Định Dạng Phải Là Email' })
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống Email',
    })
    email: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống user id',
    })
    userId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống url',
    })
    url: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống status',
    })
    status: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống company id',
    })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống job id',
    })
    jobId: mongoose.Schema.Types.ObjectId;
}
export class ResumeUserCv {
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống url',
    })
    url: string;

    @IsNotEmpty({ message: 'Không Được Bỏ Trống company id' })
    @IsMongoId({ message: "Phải là định dạng mongo id" })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'Không Được Bỏ Trống job id' })
    @IsMongoId({ message: "Phải là định dạng mongo id" })
    jobId: mongoose.Schema.Types.ObjectId;
}
