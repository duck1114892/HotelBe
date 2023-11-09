import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import { use } from 'passport';
import aqp from 'api-query-params';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private CompanyModel: SoftDeleteModel<CompanyDocument>) { }
  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const { name, description, address } = createCompanyDto
    return await this.CompanyModel.create({
      name: name,
      description: description,
      address: address,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    }
    )
  }

  async findAll(currentPage, limit, queryString) {
    const { filter, projection, population } = aqp(queryString);
    delete filter.page
    delete filter.limit
    let { sort } = aqp(queryString);
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.CompanyModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.CompanyModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate(population)
      .exec()
    console.log(result)
    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    if (await this.CompanyModel.findById(id)) {
      return await this.CompanyModel.findByIdAndUpdate(
        id,
        {
          ...updateCompanyDto, updatedBy: {
            _id: user._id,
            email: user.email
          }
        })
    }
    else {
      return {
        statusCode: 404,
        mess: 'Not found a company'
      }
    }
  }

  async remove(id: string, user: IUser) {
    await this.CompanyModel.updateOne(
      { _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      },

    });
    return await this.CompanyModel.softDelete({ _id: id })
  }
}
