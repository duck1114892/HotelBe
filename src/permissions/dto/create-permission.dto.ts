import { IsEmail, IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
    @IsNotEmpty({
        message: 'Không Được Bỏ Trống Email',
    })
    name: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống apiPath',
    })
    apiPath: string;

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống method',
    })
    method: string

    @IsNotEmpty({
        message: 'Không Được Bỏ Trống module',
    })
    module: string;

}
