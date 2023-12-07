import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, ResumeUserCv } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/user.interface';
import { ResponseMessage, User } from 'src/auth/decorator/customsize';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }
  @Get('/by-user/:id')
  getHistory(@Param('id') id: string) {
    return this.resumesService.getHistory(id);
  }
  @Post()
  @ResponseMessage('Tạo Resume Thành Công')
  create(@Body() resumeUserCv: ResumeUserCv, @User() user: IUser) {
    return this.resumesService.create(resumeUserCv, user);
  }

  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string
  ) {
    return this.resumesService.findAll(currentPage, limit, queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('status') status: string, @User() user: IUser) {
    return this.resumesService.update(id, user, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }

}
