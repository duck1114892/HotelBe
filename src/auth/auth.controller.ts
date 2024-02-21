import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage, User } from "./decorator/customsize";
import { localAuthGuard } from "./passport/local-auth.guard";
import { CreateUserDto, RegisterUserDto } from "src/users/dto/create-user.dto";
import { IUser } from "src/users/user.interface";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Get('/account')
    handleAccount(@User() user: IUser) {
        return this.authService.getRoleAndPermission(user)
    }

    @Public()
    @UseGuards(localAuthGuard)
    @ResponseMessage("User Login")
    @Post('/login')
    handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
        return this.authService.login(req.user, response);
    }
    @Public()
    @Post('/register')
    @ResponseMessage("Register Success")
    handleRegister(@Body() registerUSerDto: RegisterUserDto) {
        return this.authService.register(registerUSerDto)
    }
    @Public()
    @Get('/refresh')
    handleRefreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const refeshToken = request.cookies["refreshToken"]
        return this.authService.processRefreshToken(refeshToken, response)
    }

    @Post('/logout')
    logout(@User() users: IUser, @Res({ passthrough: true }) response: Response) {
        return this.authService.handleLogout(users, response)
    }
}
