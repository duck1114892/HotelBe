import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from 'src/permissions/schemas/permission.schemas';
import { Role, RoleDocument } from 'src/roles/schemas/role.schemas';
import { Users, UsersDocument } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
    constructor(
        @InjectModel(Users.name) private UserModel: SoftDeleteModel<UsersDocument>,
        @InjectModel(Permission.name) private PermissionModel: SoftDeleteModel<PermissionDocument>,
        @InjectModel(Role.name) private RoleModel: SoftDeleteModel<RoleDocument>,
        private configService: ConfigService,
        private userService: UsersService
    ) { }
    async onModuleInit() {
        const isCreateFakeData = this.configService.get<string>('IS_CREATE_FAKE_DATA')
        if (Boolean(isCreateFakeData)) {
            const isEmtyPermission = await this.PermissionModel.count({})
            const isEmtyRole = await this.PermissionModel.count({})
            const isEmtyUser = await this.PermissionModel.count({})

            if (isEmtyPermission === 0) {
                await this.PermissionModel.insertMany(INIT_PERMISSIONS)
            }
            if (isEmtyRole === 0) {
                console.log("role emty")
                const permissions = await this.PermissionModel.find({}).select("_id");
                await this.RoleModel.insertMany([
                    {
                        name: ADMIN_ROLE,
                        description: "Admin thì full quyền :v",
                        isActive: true,
                        permission: permissions
                    },
                    {
                        name: USER_ROLE,
                        description: "Người dùng/Ứng viên sử dụng hệ thống",
                        isActive: true,
                        permission: [] //không set quyền, chỉ cần add ROLE
                    }
                ]);
            }
            if (isEmtyUser === 0) {
                console.log("user emty")
                const adminRole = await this.RoleModel.findOne({ name: ADMIN_ROLE });
                const userRole = await this.RoleModel.findOne({ name: USER_ROLE })
                await this.UserModel.insertMany([
                    {
                        name: "I'm admin",
                        email: "admin@gmail.com",
                        password: this.userService.hashPassword(this.configService.get<string>("FAKE_PASSWORD")),
                        age: 69,
                        gender: "MALE",
                        address: "VietNam",
                        role: adminRole?._id
                    },
                    {
                        name: "I'm normal user",
                        email: "user@gmail.com",
                        password: this.userService.hashPassword(this.configService.get<string>("FAKE_PASSWORD")),
                        age: 69,
                        gender: "MALE",
                        address: "VietNam",
                        role: userRole?._id
                    },
                ])
            }

            if (isEmtyRole > 0 && isEmtyPermission > 0 && isEmtyUser > 0) {
                console.log('>>> ALREADY INIT SAMPLE DATA...');
            }
        }
    }
}
