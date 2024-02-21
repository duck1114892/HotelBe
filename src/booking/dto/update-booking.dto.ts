import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    userId: mongoose.Schema.Types.ObjectId;
    roomId: mongoose.Schema.Types.ObjectId;
    total: number;
    status: string;
    quantity: number;
    checkInDate: Date;
    checkOutDate: Date;
}
