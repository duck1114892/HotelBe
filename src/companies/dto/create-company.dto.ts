import {
    IsEmail,
    IsNotEmpty,
    Min,
    Max,
    IsStrongPassword,
} from 'class-validator';
export class CreateCompanyDto {
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

    @IsNotEmpty({
        message: 'Mô Tả Không Được Bỏ Trống',
    })
    logo: string;

    createdAt: Date;
    updatedeAt: Date;
}
