import { BadGatewayException, BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schemas/booking.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name) private BookingModel: SoftDeleteModel<BookingDocument>,
    private roomService: RoomService
  ) { }
  async create(createBookingDto: CreateBookingDto, user: IUser) {
    const getRoomId: any = await this.roomService.findOne(createBookingDto.roomId)
    let handleRoomQuantity = getRoomId.availability
    let status = getRoomId.type
    if (getRoomId.availability <= 0) {
      handleRoomQuantity = 0
      status = 'OUT_OFF'
      throw new BadRequestException("Đã Hết Phòng")
    }
    else {
      handleRoomQuantity = getRoomId.availability - createBookingDto.quantity
      status = 'READY'
    }
    await this.roomService.updateQuantity(createBookingDto.roomId, handleRoomQuantity, status, user)
    return await this.BookingModel.create({
      ...createBookingDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async findAll(currentPage, limit, queryString) {
    const { filter, projection, population } = aqp(queryString);
    delete filter.current
    delete filter.pageSize
    let { sort } = aqp(queryString);
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.BookingModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    let result = await this.BookingModel.find(filter).select("-password -refreshToken")
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate(
        [
          {
            path: "userId",
            select: { _id: 1, name: 1, email: 1 }
          },
          {
            path: "roomId",
            select: { _id: 1, name: 1, img: 1 }
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
    return await this.BookingModel.findById({ _id: id }).populate(
      [
        {
          path: "userId",
          select: { _id: 1, name: 1, email: 1 }
        },
        {
          path: "roomId",
          select: { _id: 1, name: 1, img: 1 }
        }
      ]

    );
  }
  async findBookingByUser(id: string) {
    return await this.BookingModel.find({
      userId: id
    }).populate([{
      path: "roomId",
      select: { _id: 1, name: 1, img: 1, address: 1 }
    }])
  }
  async update(id: string, updateBookingDto: UpdateBookingDto, user: IUser) {
    return await this.BookingModel.findByIdAndUpdate({ _id: id }, {
      ...updateBookingDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async remove(id: string, user: IUser) {
    await this.BookingModel.findByIdAndUpdate({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    });
    await this.BookingModel.softDelete({ _id: id })
  }

}
