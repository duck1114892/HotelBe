import { IsArray, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateBookingDto {
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống ID user',
    })
    userId: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống ID room',
    })
    roomId: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống price',
    })
    total: number;
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống price',
    })
    status: string;
    quantity: number;
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống Check In Date',
    })
    checkInDate: Date;
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống Check Out Date',
    })
    checkOutDate: Date;
}
