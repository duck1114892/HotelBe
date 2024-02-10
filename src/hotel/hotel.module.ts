import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotel.schemas';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { RatingModule } from 'src/rating/rating.module';

@Module({
  controllers: [HotelController],
  providers: [HotelService],
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    UsersModule,
    RatingModule
  ],
  exports: [HotelService]
})
export class HotelModule { }
