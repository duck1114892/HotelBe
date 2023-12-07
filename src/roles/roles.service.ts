import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Role, RoleDocument } from './schemas/role.schemas';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private RoleModel: SoftDeleteModel<RoleDocument>) { }
  async create(createRoleDto: CreateRoleDto, user: IUser) {
    let isExist = await this.RoleModel.findOne({ name: createRoleDto.name })
    if (isExist) {
      throw new BadRequestException("name đã tồn tại")
    }
    else {
      return await this.RoleModel.create({
        ...createRoleDto,
        createdBy: {
          email: user.email,
          _id: user._id
        }
      });
    }

  }

  async findAll(currentPage, limit, queryString) {
    const { filter, projection, population } = aqp(queryString);
    delete filter.current
    delete filter.pageSize
    let { sort } = aqp(queryString);
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.RoleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.RoleModel.find(filter)
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("not found role")
    }
    return (await this.RoleModel.findById(id)).populate({
      path: "permission",
      select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 }
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    let isExist = await this.RoleModel.findOne({ name: updateRoleDto.name })
    console.log(isExist)
    if (isExist) {
      throw new BadRequestException("name đã tồn tại")
    }
    else {
      return await this.RoleModel.findByIdAndUpdate({ _id: id },
        {
          ...updateRoleDto,
          updatedBy: {
            email: user.email,
            _id: user._id
          }
        })
    }

  }

  async remove(id: string, user: IUser) {
    await await this.RoleModel.findByIdAndUpdate({
      _id: id
    }, {
      deletedBy: {
        email: user.email,
        _id: user._id
      }
    })
    return await this.RoleModel.softDelete({ _id: id })
  }
}
