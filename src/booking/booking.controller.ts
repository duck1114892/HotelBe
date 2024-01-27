import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { IUser } from 'src/users/user.interface';
import { ResponseMessage, User } from 'src/auth/decorator/customsize';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  @ResponseMessage("Create Booking Thanh Cong")
  create(@Body() createBookingDto: CreateBookingDto, @User() user: IUser) {
    return this.bookingService.create(createBookingDto, user);
  }
  @Get('/byUser')
  @ResponseMessage("Get booking with id thành công")
  finBookingByUserId(@User() user: IUser) {
    return this.bookingService.findBookingByUser(user._id);
  }
  @Get()
  @ResponseMessage("Get booking thành công")
  findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string) {
    return this.bookingService.findAll(currentPage, limit, queryString);
  }

  @Get(':id')
  @ResponseMessage("Get booking with id thành công")
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }


  @Patch(':id')
  @ResponseMessage("Update booking with id thành công")
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto, @User() user: IUser) {
    return this.bookingService.update(id, updateBookingDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete booking with id thành công")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.bookingService.remove(id, user);
  }
}
