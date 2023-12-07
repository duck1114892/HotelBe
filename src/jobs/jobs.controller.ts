import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from 'src/auth/decorator/customsize';
import { IUser } from 'src/users/user.interface';
import { Users } from 'src/users/schemas/users.schema';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  @ResponseMessage("Created a new job")
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  @Public()
  @ResponseMessage("Get a jobs succeeded")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() queryString: string) {
    return this.jobsService.findAll(currentPage, limit, queryString);
  }

  @Get(':id')
  @Public()
  @ResponseMessage("Success")
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Updated a new job")
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user: IUser) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Jobs has been deleted")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
