import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: string;
  age: number;
  address: string;
  gender: string;
  createdAt: Date;
  updatedeAt: Date;
}
