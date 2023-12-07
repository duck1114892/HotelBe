import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsNotEmpty({ message: "Vui Lòng Nhập Tên" })
    name: string;
    description: string;
    @IsNotEmpty({ message: "Active true or false" })
    isActive: boolean;
    @IsNotEmpty({ message: "Vui Lòng Nhập Permission" })
    @IsArray({ message: "Định Dạng Phải Là Array" })
    @IsMongoId({ each: true, message: "Định dạng phải là Mongo Id" })
    permission: mongoose.Schema.Types.ObjectId[];
}
