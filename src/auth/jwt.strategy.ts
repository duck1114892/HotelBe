import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/user.interface';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private roleService: RolesService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_JWT_SECRET'),
    });
  }

  async validate(payload: IUser) {
    const { _id, name, email, role, permission } = payload;
    const roleUser = role as unknown as { _id: string, name: string }
    const temp = (await this.roleService.findOne(roleUser._id))
    return {
      _id,
      name,
      email,
      role,
      permission: temp?.permission ?? []
    };
  }
}
