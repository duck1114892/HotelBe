import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Jobs, JobsDocument } from './schemas/job.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Jobs.name) private JobsModel: SoftDeleteModel<JobsDocument>) { }
  async create(createJobDto: CreateJobDto, user: IUser) {
    let res = await this.JobsModel.create({
      ...createJobDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
    return {
      _id: res._id,
      createdAt: res.createdAt
    }
  }

  async findAll(currentPage, limit, queryString) {
    const { filter, projection, population } = aqp(queryString);
    delete filter.current
    delete filter.pageSize
    let { sort } = aqp(queryString);
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.JobsModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    let result = await this.JobsModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate(population)
      .exec()

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result
    }
  }

  async findOne(id: string) {
    return await this.JobsModel.findOne({ _id: id });
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    const res = await this.JobsModel.findByIdAndUpdate({ _id: id }, {
      ...updateJobDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return res
  }

  async remove(id: string, user: IUser) {
    await this.JobsModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    });
    return await this.JobsModel.softDelete({ _id: id })
  }
}
