import { Model } from 'mongoose';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { genSaltSync, hash, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './user.interface';
import aqp from 'api-query-params';
@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private UserModel: SoftDeleteModel<UsersDocument>
  ) { }
  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async create(creatUserDTO: CreateUserDto, user: IUser) {
    let checkEmail = await this.UserModel.findOne({ email: creatUserDTO.email })
    if (checkEmail) {
      throw new BadRequestException(`Email : ${creatUserDTO.email} đã tồn tại`);
    }
    const { password, company } = creatUserDTO;
    const hashPassword = this.hashPassword(password);
    let res = await this.UserModel.create({
      ...creatUserDTO,
      password: hashPassword,
      company: company,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });

    return {
      _id: res._id,
      createdAt: res.createdAt
    }
  }
  async registerUser(registerUserDto: RegisterUserDto, user: IUser) {

    const { password } = registerUserDto;
    const hashPassword = this.hashPassword(password);
    const emailDto = registerUserDto.email;
    const checkEmail = this.UserModel.findOne({ email: emailDto });
    if (checkEmail) {

      throw new BadRequestException(`Email : ${emailDto} đã tồn tại`);
    }
    let res = await this.UserModel.create({
      ...registerUserDto,
      password: hashPassword,
    });

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
    const totalItems = (await this.UserModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    let result = await this.UserModel.find(filter).select("-password -refreshToken")
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate([
        {
          path: "role",
          select: { _id: 1, name: 1 }
        },])
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
    return await (this.UserModel.findById({ _id: id }, { password: 0, refreshToken: 0 }))
      .populate([{
        path: "role",
        select: { _id: 1, name: 1 }
      }
      ])
  }
  async findOneByEmail(email: string) {
    return await this.UserModel.findOne({
      email: email,
    }).populate({
      path: "role",
      select: { _id: 1, permission: 1 }
    });
  }
  checkUserPassowrd(password: string, hashPassword: string) {
    const haha = compareSync(password, hashPassword);
    return haha;
  }
  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    const res = await this.UserModel.findByIdAndUpdate(id, {
      ...updateUserDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });
    return {

    }
  }

  async remove(id: string, user: IUser) {
    await this.UserModel.updateOne({ _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    });
    return await this.UserModel.softDelete({ _id: id })
  }

  async updateUserToken(_id: string, refreshToken: string) {
    return await this.UserModel.findByIdAndUpdate({
      _id
    }, {
      refreshToken
    })
  }

  async findUserbyToken(token: string) {
    return await this.UserModel.findOne({ refreshToken: token })
  }

  async logout(id: string) {
    const res = await this.UserModel.findByIdAndUpdate({ _id: id }, {
      refreshToken: null
    })
    return res
  }
}
