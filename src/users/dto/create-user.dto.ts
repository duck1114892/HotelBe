import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  IsStrongPassword,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty({
    message: 'Không Được Bỏ Trống company',
  })
  name: string

  @IsNotEmpty({
    message: 'Không Được Bỏ Trống id',
  })
  _id: mongoose.Schema.Types.ObjectId;
}

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Không Được Bỏ Trống gender',
  })
  gender: string;


  @IsNotEmpty({
    message: 'Không Được Bỏ Trống name',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Định Dạng Phải Là Email',
    },
  )
  @IsNotEmpty({
    message: 'Không Được Bỏ Trống Email',
  })
  email: string;

  @IsNotEmpty({
    message: 'Không Được Bỏ Trống age',
  })
  age: number;

  @IsNotEmpty({
    message: 'Không Được Bỏ Trống role',
  })
  role: string;

  @IsNotEmpty({
    message: 'Không được để trống',
  })
  @IsStrongPassword({
    minLength: 3,
  })
  password: string;

  @IsNotEmpty({
    message: 'Không Được Bỏ Trống address',
  })
  address: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  createdAt: Date;
  updatedeAt: Date;
}

export class RegisterUserDto {
  @IsNotEmpty({
    message: 'Không Được Bỏ Trống name',
  })
  name: string;
  @IsEmail(
    {},
    {
      message: 'Định Dạng Phải Là Email',
    },
  )

  @IsNotEmpty({
    message: 'Không Được Bỏ Trống Email',
  })
  email: string;

  @IsNotEmpty({
    message: 'Không Được Bỏ Trống age',
  })
  age: number;

  @IsNotEmpty({
    message: 'Không Được Bỏ Trống address',
  })
  address: string;

  @IsNotEmpty({
    message: 'Không được để trống',
  })
  @IsStrongPassword({
    minLength: 3,
  })
  password: string;


  createdAt: Date;
  updatedeAt: Date;
}

