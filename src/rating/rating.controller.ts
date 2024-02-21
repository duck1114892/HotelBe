import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { IUser } from 'src/users/user.interface';
import { User } from 'src/auth/decorator/customsize';
import { ObjectId } from 'mongoose';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) { }

  @Post()
  create(@Body() createRatingDto: CreateRatingDto, @User() user: IUser) {
    return this.ratingService.create(createRatingDto, user);
  }

  @Get(':id')
  findAll(@Param('id') id: ObjectId) {
    return this.ratingService.findAll(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(id);
  }
}
