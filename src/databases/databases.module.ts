import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schemas/users.schema';
import { Role, RoleSchemas } from 'src/roles/schemas/role.schemas';
import { Permission, PermissionSchema } from 'src/permissions/schemas/permission.schemas';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Role.name, schema: RoleSchemas },
      { name: Permission.name, schema: PermissionSchema },
    ]),
    UsersModule
  ],
  controllers: [DatabasesController],
  providers: [DatabasesService]
})
export class DatabasesModule { }
