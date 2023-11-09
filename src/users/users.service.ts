import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { genSaltSync, hash, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private UserModel: SoftDeleteModel<UsersDocument>
  ) { }
  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async create(creatUserDTO: CreateUserDto) {
    const { email, password, name } = creatUserDTO;
    const hashPassword = this.hashPassword(password);
    const checkEmail = this.UserModel.findOne({ email })


    return await this.UserModel.create({
      email: email,
      password: hashPassword,
      name: name,
    });


  }

  async findAll() {
    return await this.UserModel.find({});
  }

  async findOne(id: string) {
    return await this.UserModel.findById(id);
  }
  async findOneByEmail(email: string) {
    return await this.UserModel.findOne({
      email: email,
    });
  }
  checkUserPassowrd(password: string, hashPassword: string) {
    const haha = compareSync(password, hashPassword);
    return haha;
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.UserModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.UserModel.softDelete({ _id: id });
  }
}
