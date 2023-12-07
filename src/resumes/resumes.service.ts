import { Injectable } from '@nestjs/common';
import { CreateResumeDto, ResumeUserCv } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';

@Injectable()

export class ResumesService {
  constructor(@InjectModel(Resume.name) private ResumeModel: SoftDeleteModel<ResumeDocument>) { }
  async create(resumeUserCv: ResumeUserCv, user: IUser) {
    const res = await this.ResumeModel.create({
      email: user.email,
      userId: user._id,
      companyId: resumeUserCv.companyId,
      jobId: resumeUserCv.jobId,
      status: "PENDING",
      history: [{
        status: "PENDING",
        updatedAt: new Date,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }],
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
    console.log(res)
    return {
      _id: user._id,
      createAt: res.createdAt
    }
  }

  async findAll(currentPage, limit, queryString) {
    const { filter, projection, population } = aqp(queryString);
    delete filter.current
    delete filter.pageSize
    let { sort } = aqp(queryString);
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.ResumeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.ResumeModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec()

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      result
    }
  }
  async findOne(id: string) {
    return await this.ResumeModel.findOne({ _id: id });
  }

  async update(id: string, user: IUser, status: string) {
    console.log("check this", status)
    return await this.ResumeModel.findByIdAndUpdate({ _id: id }, {
      $push: {
        history: {
          status: status,
          updatedAt: new Date(),
          updatedBy: {
            _id: user._id,
            email: user.email
          }
        }

      }

    });
  }

  async remove(id: string, user: IUser) {
    await this.ResumeModel.findOneAndUpdate({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    });
    return await this.ResumeModel.softDelete({ _id: id })
  }
  async getHistory(id: string) {
    let res = await this.ResumeModel.findOne({ userId: id })
    return res.history
  }
}
