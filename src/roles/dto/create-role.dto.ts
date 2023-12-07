import { Type } from "@nestjs/common";
import { IsArray, IsMongoId, IsNotEmpty, IsObject } from "class-validator";
import mongoose, { isValidObjectId } from "mongoose";

export class CreateRoleDto {
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
