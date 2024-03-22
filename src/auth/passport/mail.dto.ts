import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailDto {
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
}
