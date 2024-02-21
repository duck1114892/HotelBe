import { IsArray, IsEmail, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateHotelDto {
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống Email',
    })
    name: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống address',
    })
    address: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống description',
    })
    description: string

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống phone',
    })
    phone: number;

    rating: number;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống logo',
    })
    logo: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống silder img',
    })
    @IsArray()
    slider: [string];
    roomId: mongoose.Schema.Types.ObjectId[];
}
