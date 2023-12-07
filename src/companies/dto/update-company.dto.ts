import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    @IsNotEmpty({
        message: 'Tên Không Được Bỏ Trống',
    })
    name: string;

    @IsNotEmpty({
        message: 'Địa Chỉ Không Được Bỏ Trống',
    })
    address: string;

    @IsNotEmpty({
        message: 'Mô Tả Không Được Bỏ Trống',
    })
    description: string;

    createdAt: Date;
    updatedeAt: Date;
}
