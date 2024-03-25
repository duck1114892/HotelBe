import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/auth/decorator/customsize';
import { IUser } from './user.interface';
import { Response } from 'express';
import path, { join } from 'path';
//localhost:9900/users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Public()
  @Get('/activeAccount/:id')
  @ResponseMessage("Active Successed")
  active(@Param('id') id: string, @Res() res: Response) {
    try {
      const update = this.usersService.updateStatusAccount(id);
      // Lấy đường dẫn tuyệt đối đến tệp index.html trong thư mục public trong mã nguồn
      const filePath = path.join(__dirname,'..','..','..', 'src', 'users', 'index.html');
      // Gửi tệp từ thư mục public trong mã nguồn
      return res.status(HttpStatus.OK).sendFile(filePath);
    } catch (error) {
      throw new NotFoundException('Failed to update status');
    }

  }
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
  @Get('/email/:email')
  @Public()
  findOneEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
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
