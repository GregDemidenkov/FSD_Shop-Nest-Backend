import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken'

import { AuthDao } from "src/infra/db/dao/auth.dao"

import { RegistrationDto } from "../dto/registration.dto"
import { LoginDto } from "../dto/login.dto"
import { AuthResponseDto } from "../dto/authResponse.dto"
import { IdDto } from "src/core/common/dto/id.dto"

import { InvalidPassword } from "src/core/user/exceptions/InvalidPassword"
import { UserAlreadyExist } from "src/core/user/exceptions/userAlreadyExist"
import { UserNotExist } from "src/core/user/exceptions/userNotExist"
import { TokenDto } from "../dto/token.dto"
import { LoginResponseDto } from "../dto/loginResponse.dto"


@Injectable()
export class AuthService {

    constructor(private readonly authDao: AuthDao) {}


    private async hashPassword(password: string) {
        return bcrypt.hash(password, 10)
    }


    async registration(dto: RegistrationDto) {
        const user = await this.authDao.findUserByEmail(dto.email)
        if (user) {
            throw new UserAlreadyExist("User with this email already registered")
        }

        dto.password = await this.hashPassword(dto.password)

        return this.authDao.registration(dto)
    }

    async login(dto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.authDao.findUserByEmail(dto.email)
        if (!user) {
            throw new UserNotExist("User with this email is not registered")
        }

        const validatePassword = await bcrypt.compare(dto.password, user.password)
        if (!validatePassword) {
            throw new InvalidPassword("Invalid password")
        }

        const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "10m"})
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"})

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        } as LoginResponseDto
    }

    async checkAuth(dto: IdDto): Promise<AuthResponseDto> {
        const user = await this.authDao.findUserById(dto.id)
        if (!user) {
            throw new UserNotExist("User is not registered")
        }

        const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "10m"})

        return {
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        } as AuthResponseDto
    }

    async refreshToken(dto: TokenDto): Promise<AuthResponseDto> {
        const decode: any = jwt.verify(dto.token, process.env.JWT_SECRET)

        const user = await this.authDao.findUserById(decode.id)
        if (!user) {
            throw new UserNotExist("User is not registered")
        }

        const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "10m"})

        return {
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        } as AuthResponseDto
    }
    
}