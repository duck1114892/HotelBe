import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { IUser } from 'src/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel, HotelDocument } from './schemas/hotel.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { UsersService } from 'src/users/users.service';
import mongoose, { Types } from 'mongoose';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel.name)
  private HotelModel: SoftDeleteModel<HotelDocument>,
    private userService: UsersService
  ) { }
  async create(createHotelDto: CreateHotelDto, user: IUser) {
    const req = await this.HotelModel.create({
      ...createHotelDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });

    return req
  }

  async createHotel(createHotelDto: CreateHotelDto, user: IUser) {
    const isExist = await this.userService.findOne(user._id)
    if (isExist.hotel) {
      throw new BadRequestException("Mỗi User Chỉ Tạo Được 1 Hotel")
    }
    const res = await this.HotelModel.create({
      ...createHotelDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    await this.userService.updateUserHotelId(user, res._id)
    return res
  }

  async findAll(currentPage, limit, queryString) {
    const { filter } = aqp(queryString);
    delete filter.current
    delete filter.pageSize
    let { sort } = aqp(queryString);
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.HotelModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    let result = await this.HotelModel.find(filter).select("-password -refreshToken")
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate(
        [
          {
            path: "roomId",
            select: {}
          }
        ]
      )
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
    return await this.HotelModel.findById({ _id: id }).exec();
  }

  async update(id: string, updateHotelDto: UpdateHotelDto, user: IUser) {
    await this.HotelModel.findByIdAndUpdate({ _id: id }, {
      ...updateHotelDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async updateRoomId(id: string, updateHotelDto: UpdateHotelDto, user: IUser) {
    const room = await this.findOne(id);
    const co = room.roomId as mongoose.Schema.Types.ObjectId[];
    const arrToString: mongoose.Schema.Types.ObjectId[] = updateHotelDto.roomId

    await this.HotelModel.findByIdAndUpdate({ _id: id }, {
      ...updateHotelDto,
      roomId: [...co, ...arrToString],
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async remove(id: string, user: IUser) {
    await this.HotelModel.findByIdAndUpdate({ _id: id },
      {
        deletedBy: {
          _id: user._id,
          name: user.name
        }
      })
    await this.HotelModel.softDelete({ _id: id })
  }
}
