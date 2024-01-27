import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { IUser } from 'src/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Rating, RatingDocument } from './schemas/rating.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating.name) private RatingModel: SoftDeleteModel<RatingDocument>) { }
  async create(createRatingDto: CreateRatingDto, user: IUser) {
    return await this.RatingModel.create({
      ...createRatingDto,
      userId: user._id,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
  }

  async findAll() {
    return await this.RatingModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  async remove(id: string) {
    return await this.RatingModel.softDelete({ _id: id });
  }
}
