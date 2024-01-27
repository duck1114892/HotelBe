import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './schemas/room.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import { UsersService } from 'src/users/users.service';
import { HotelService } from 'src/hotel/hotel.service';
import { ObjectId } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name)
  private RoomModel: SoftDeleteModel<RoomDocument>,
    private userService: UsersService,
    private hotelService: HotelService) { }
  async create(createRoomDto: CreateRoomDto, user: IUser) {
    let type = createRoomDto.type
    if (createRoomDto.availability <= 0) {
      type = 'OUT_OFF'
    }
    else {
      type = 'READY'
    }
    const req = await this.RoomModel.create({
      ...createRoomDto,
      type: type,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return req
  }


  async creatRoomForHotelAdmin(createRoomDto: CreateRoomDto, user: IUser) {
    let getHotelId = await this.userService.findOne(user._id)
    let res = await this.RoomModel.create({
      ...createRoomDto,
      hotelId: getHotelId.hotel,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return res
  }

  async findAll(currentPage, limit, queryString) {
    await this.RoomModel.updateMany({ availability: 0 }, { type: 'OUT_OFF' }, { multi: true })
    const { filter, projection, population } = aqp(queryString);
    delete filter.current
    delete filter.pageSize
    let { sort } = aqp(queryString);
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.RoomModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    let result = await this.RoomModel.find(filter).select("-password -refreshToken")
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate(
        [
          {
            path: "hotelId",
            select: { _id: 1, name: 1, logo: 1, rating: 1 }
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

  async findOne(id: ObjectId) {
    return await this.RoomModel.findById({ _id: id }).populate(
      [
        {
          path: "hotelId",
          select: { _id: 1, name: 1, logo: 1 }
        }
      ]
    );
  }

  async update(id: ObjectId, updateRoomDto: UpdateRoomDto, user: IUser) {
    return await this.RoomModel.findByIdAndUpdate({ _id: id }, {
      ...updateRoomDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });
  }
  async updateQuantity(id: ObjectId, quantity, type, user: IUser) {
    console.log("check>>>>>", type)
    return await this.RoomModel.findByIdAndUpdate({ _id: id }, {
      type: type,
      availability: quantity,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async remove(id: string, user: IUser) {
    await this.RoomModel.findByIdAndUpdate({ _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      })
    await this.RoomModel.softDelete({ _id: id });
  }
}
