import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './schemas/permission.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel(Permission.name) private PermissionModel: SoftDeleteModel<PermissionDocument>) { }
  async create(createPermissionDto: CreatePermissionDto) {
    let isExist = await this.PermissionModel.findOne({
      name: createPermissionDto.name,
      apiPath: createPermissionDto.apiPath,
    });

    console.log("isExist:", isExist);

    if (isExist !== null) {
      throw new BadRequestException("Permission Đã Tồn Tại");
    } else {
      const newPermission = await this.PermissionModel.create(createPermissionDto);
      console.log("New Permission created:", newPermission);
      return newPermission;
    }
  }

  async findAll(currentPage, limit, queryString) {
    const { filter, projection, population } = aqp(queryString);
    delete filter.current
    delete filter.pageSize
    let { sort } = aqp(queryString);
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.PermissionModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    let result = await this.PermissionModel.find(filter).select("-password -refreshToken")
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate(population)
      .select(projection as any)
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
    return await this.PermissionModel.findById({ _id: id });
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
    return await this.PermissionModel.findByIdAndUpdate({ _id: id }, {
      ...updatePermissionDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async remove(id: string, user: IUser) {
    await this.PermissionModel.findByIdAndUpdate({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return this.PermissionModel.softDelete({ _id: id })
  }
}
