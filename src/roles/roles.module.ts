import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchemas } from './schemas/role.schemas';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchemas }]),
  ],
  exports: [RolesService]
})
export class RolesModule { }
