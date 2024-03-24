import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: string;
  age: number;
  address: string;
  gender: string;
  hotel: string;
  statusAccount: boolean;
  createdAt: Date;
  updatedeAt: Date;
}
