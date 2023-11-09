import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    @IsNotEmpty({
        message: 'Tên Không Được Bỏ Trống',
    })
    name: string;
    address: string;
    description: string;
    createdAt: Date;
    updatedeAt: Date;
}
