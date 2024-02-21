import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Public, ResponseMessage, User } from 'src/auth/decorator/customsize';
import { IUser } from 'src/users/user.interface';
import { HotelService } from 'src/hotel/hotel.service';
import { UpdatePermissionDto } from 'src/permissions/dto/update-permission.dto';
import mongoose, { ObjectId } from 'mongoose';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Post()
  @ResponseMessage("Create room thành công")
  create(@Body() createRoomDto: CreateRoomDto, @User() user: IUser) {
    return this.roomService.create(createRoomDto, user);
  }

  @Post('/create')//creat room danh cho admin-hotel
  createForHotelAdmin(@Body() createRoomDto: CreateRoomDto, @User() user: IUser) {
    return this.roomService.creatRoomForHotelAdmin(createRoomDto, user);
  }


  @Get()
  @Public()
  @ResponseMessage("Get room thành công")
  findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string) {
    return this.roomService.findAll(currentPage, limit, queryString);
  }

  @Get(':id')
  @Public()
  @ResponseMessage("Get room by id thành công")
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update room thành công")
  update(@Param('id') id: ObjectId, @Body() updateRoomDto: UpdateRoomDto, @User() user: IUser) {
    return this.roomService.update(id, updateRoomDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete room thành công")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.roomService.remove(id, user);
  }
}
