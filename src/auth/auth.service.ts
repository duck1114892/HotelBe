import { BadGatewayException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.interface';
import { CreateUserDto, RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user) {
      const isValid = this.usersService.checkUserPassowrd(pass, user.password);
      if (isValid) {
        return user;
      }
    } else {
      return null;
    }
  }

  async register(registerUserDto: RegisterUserDto, user: IUser): Promise<any> {
    return await this.usersService.registerUser(registerUserDto, user)
  }

  async login(user: IUser, response: Response) {
    const { _id, name, email, role } = user;
    const payload = {
      sub: "token login",
      iss: "from server",
      _id,
      name,
      email,
      role,
    }
    const refeshToken = this.createRefeshToken(payload)
    response.clearCookie("refreshToken")
    response.cookie('refreshToken', refeshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('REFESH_JWT_EXPIRE'))
    })
    await this.usersService.updateUserToken(_id, refeshToken)
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
      },
    };
  }

  createRefeshToken = (payload) => {
    const refeshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFESH_JWT_SECRET'),
      expiresIn: ms(this.configService.get<string>('REFESH_JWT_EXPIRE')) / 1000
    })
    return refeshToken
  }

  async processRefreshToken(Token: string, response: Response) {
    try {
      let e = this.jwtService.verify(Token, {
        secret: this.configService.get<string>('REFESH_JWT_SECRET')
      })

      let user = await this.usersService.findUserbyToken(Token)
      if (user) {
        const { _id, name, email, role } = user;
        const payload = {
          sub: "token login",
          iss: "from server",
          _id,
          name,
          email,
          role,
        }
        const refeshToken = this.createRefeshToken(payload)
        response.cookie("refreshToken", refeshToken, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>('REFESH_JWT_EXPIRE'))
        })
        await this.usersService.updateUserToken(_id.toString(), refeshToken)
        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id,
            name,
            email,
            role
          },
        };
      }
      else {
        console.log("looi")
      }
    } catch (error) {
      console.log(error)
      throw new BadGatewayException("Token Không Hợp Lệ")
    }
  }

  async handleLogout(user: IUser, response: Response) {
    const res = await this.usersService.logout(user._id)
    if (res) {
      response.clearCookie("refreshToken")
      return 'ok'
    }
  }
}
