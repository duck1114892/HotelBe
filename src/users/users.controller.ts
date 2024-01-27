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
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
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
  @Public()
  @Post('/signIn')
  @ResponseMessage("Register a new user")
  Register(@Body() createUserDTO: RegisterUserDto) {
    return this.usersService.registerUser(createUserDTO);
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
  @Patch(':id')
  @ResponseMessage("Update User Succeeded")
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return this.usersService.update(id, updateUserDto, user);
  }

  // xóa người dùng theo id.(cập nhật delete)
  @Delete(':id')
  @ResponseMessage("Delete User Succeeded")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }

}
