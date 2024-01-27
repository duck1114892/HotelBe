import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    name: string;
    description: string;
    type: string;
    address: string;
    price: number;
    availability: number;
    img: string;
    slider: [string];
}
