import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto)
{
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
