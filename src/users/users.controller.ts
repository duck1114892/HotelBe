import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/auth/decorator/customsize';
import { IUser } from './user.interface';

//localhost:9900/users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  //Tạo Người dùng mới
  @Post()
  @ResponseMessage("Register a new user")
  create(@Body() createUserDTO: CreateUserDto, @User() user: IUser) {
    return this.usersService.create(createUserDTO, user);
  }
  // lấy người dùng
  @Get()
  @ResponseMessage("Get a user succeeded")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string) {
    return this.usersService.findAll(currentPage, limit, queryString);
  }
  // lấy người dùng theo id
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // cập nhật người dùng
  @Patch()
  @ResponseMessage("Update User Succeeded")
  update(@Body() req, @Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return this.usersService.update(req._id, updateUserDto, user);
  }

  // xóa người dùng theo id.(cập nhật delete)
  @Delete(':id')
  @ResponseMessage("Delete User Succeeded")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }

}
