import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ResponseMessage, User } from 'src/auth/decorator/customsize';
import { IUser } from 'src/users/user.interface';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  @ResponseMessage("Tạo Permission Thành Công")
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string) {
    return this.permissionsService.findAll(currentPage, limit, queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto, @User() user: IUser) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.permissionsService.remove(id, user);
  }
}
