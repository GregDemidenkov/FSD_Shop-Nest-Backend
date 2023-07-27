import { Body, Controller, Get, Param, Post } from "@nestjs/common"

import { AuthService } from "src/core/auth/service/auth.service"

import { IdDto } from "src/core/common/dto/id.dto"
import { LoginDto } from "src/core/auth/dto/login.dto"
import { RegistrationDto } from "src/core/auth/dto/registration.dto"
import { TokenDto } from "src/core/auth/dto/token.dto"


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}


    @Post('registration')
    registration(@Body() dto: RegistrationDto) {
        return this.authService.registration(dto)
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @Get('check-auth')
    checkAuth(@Body() dto: IdDto) {
        return this.authService.checkAuth(dto)
    }

    @Get('refresh-token/:token')
    refreshToken(@Param() dto: TokenDto) {
        return this.authService.refreshToken(dto)
    }

}