import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorator/customsize";
import { localAuthGuard } from "./passport/local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(localAuthGuard)
    @Public()
    @Post('/login')
    handleLogin(
        @Request() req) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
