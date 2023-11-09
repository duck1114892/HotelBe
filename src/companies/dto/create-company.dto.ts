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
    address: string;
    description: string;
    createdAt: Date;
    updatedeAt: Date;
}
