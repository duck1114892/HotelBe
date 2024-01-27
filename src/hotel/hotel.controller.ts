import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { IUser } from 'src/users/user.interface';
import { ResponseMessage, User } from 'src/auth/decorator/customsize';
import { userInfo } from 'os';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) { }
  @Post("/create")
  @ResponseMessage("Create Hotel Thành Công")
  createHotelForHotel(@Body() createHotelDto: CreateHotelDto, @User() user: IUser) {
    return this.hotelService.createHotel(createHotelDto, user);
  }

  @Post()
  @ResponseMessage("Create Hotel Thành Công")
  create(@Body() createHotelDto: CreateHotelDto, @User() user: IUser) {
    return this.hotelService.create(createHotelDto, user);
  }

  @Get()
  findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string) {
    return this.hotelService.findAll(currentPage, limit, queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update Thành Công")
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto, @User() user: IUser) {
    return this.hotelService.update(id, updateHotelDto, user);
  }
  @Patch('/updateRoomId/:id')
  @ResponseMessage("Update Room Id Thành Công")
  updateRoomId(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto, @User() user: IUser) {
    return this.hotelService.updateRoomId(id, updateHotelDto, user);
  }
  @ResponseMessage("Delete Thành Công")
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.hotelService.remove(id, user);
  }
}
