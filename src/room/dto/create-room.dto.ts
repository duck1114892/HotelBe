import { IsArray, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateRoomDto {
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống name',
    })
    name: string;


    hotelId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống description',
    })
    description: string

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống Type',
    })
    type: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống address',
    })
    address: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống price',
    })
    price: number;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống availability',
    })
    availability: number;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống img',
    })
    img: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống silder img',
    })

    @IsArray()
    slider: [string];
}
