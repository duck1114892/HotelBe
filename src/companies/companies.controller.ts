import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Version } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public, ResponseMessage, User } from 'src/auth/decorator/customsize';
import { IUser } from 'src/users/user.interface';
import { use } from 'passport';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  //Lấy Thông Tin Companies và phân trang
  @Get()
  @Public()
  @ResponseMessage('Lấy thông tin company thành công')
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string
  ) {
    return this.companiesService.findAll(currentPage, limit, queryString);
  }

  //Tìm Kiếm Companies
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  // Tạo Một Companies
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }

  //Sửa Đổi Companies
  @Patch(':id')
  @ResponseMessage('Cập Nhật thông tin company thành công')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @User() user: IUser) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  //Xóa Companies
  @Delete(':id')
  @ResponseMessage('Xóa thông tin company thành công')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
