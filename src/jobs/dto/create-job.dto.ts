import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Company {
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống company',
    })
    name: string

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống id',
    })
    _id: mongoose.Schema.Types.ObjectId;
}

export class CreateJobDto {
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống name',
    })
    name: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống skill',
    })
    @IsArray({ message: "Định dạng phải là array" })
    @IsString({ each: true, message: "Định dạng trong array phải là string" })
    skills: string[];

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống location',
    })
    location: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống salary',
    })
    salary: number;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống quantity',
    })
    quantity: number;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống level',
    })
    level: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống description',
    })
    description: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống startDate',
    })
    startDate: Date;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống endDate',
    })
    endDate: Date;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống isActive',
    })
    isActive: boolean;

    createdAt: Date;
    updatedeAt: Date;
}
