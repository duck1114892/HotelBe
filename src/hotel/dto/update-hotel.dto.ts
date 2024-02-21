import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './create-hotel.dto';
import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateHotelDto extends PartialType(CreateHotelDto) {
    name: string;
    address: string;
    description: string
    phone: number;
    rating: number;
    logo: string;
    slider: [string];
    roomId: mongoose.Schema.Types.ObjectId[];
}
