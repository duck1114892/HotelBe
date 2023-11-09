import {
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  IsStrongPassword,
} from 'class-validator';
export class CreateUserDto {
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
    message: 'Không được để trống',
  })
  @IsStrongPassword({
    minLength: 3,
  })
  password: string;
  name: string;
  age: number;
  address: string;
  createdAt: Date;
  updatedeAt: Date;
}
