import { UnauthorizedException, ForbiddenException, BadGatewayException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response } from 'express';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private roleService: RolesService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && this.usersService.checkUserPassowrd(pass, user.password)) {
      return user;
    } else {
      return null;
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    return await this.usersService.registerUser(registerUserDto);
  }

  async existMail(mail) {
    return await this.usersService.checkMailExist(mail)
  }
  async login(user: IUser, response: Response) {
    const { _id, name, email, role, permission } = user;
    const payload = {
      sub: "token login",
      iss: "from server",
      _id,
      name,
      email,
      role,
      permission
    }

    const refreshToken = this.createRefreshToken(payload);
    response.clearCookie("refreshToken");
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('REFESH_JWT_EXPIRE'))
    });

    await this.usersService.updateUserToken(_id, refreshToken);

    const findRole = await this.roleService.findOne(role);
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role: findRole
      },
    };
  }

  createRefreshToken = (payload) => {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFESH_JWT_SECRET'),
      expiresIn: ms(this.configService.get<string>('REFESH_JWT_EXPIRE'))
    });
  }

  async processRefreshToken(token: string, response: Response) {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: this.configService.get<string>('REFESH_JWT_SECRET')
      });

      const user = await this.usersService.findUserbyToken(token);

      if (user) {
        console.log(user)
        const { _id, name, email, role, permission } = decodedToken;
        const payload = {
          sub: "token login",
          iss: "from server",
          _id,
          name,
          email,
          role,
          permission
        }

        const refreshToken = this.createRefreshToken(payload);
        response.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>('REFESH_JWT_EXPIRE'))
        });

        await this.usersService.updateUserToken(_id.toString(), refreshToken);

        const findRole = await this.roleService.findOne(role._id.toString());

        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id,
            name,
            email,
            role: findRole
          },
        };
      }
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException("Token Không Hợp Lệ");
    }
  }

  async handleLogout(user: IUser, response: Response) {
    const res = await this.usersService.logout(user._id);
    if (res) {
      response.clearCookie("refreshToken");
      return 'ok';
    }
  }

  async getRoleAndPermission(user: IUser) {
    const findRole = await this.roleService.findOne(user.role);
    const { _id, name, email, permission } = user;
    return {
      _id, name, email, role: findRole, permission
    };
  }
}
