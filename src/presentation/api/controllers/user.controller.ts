import { Controller, Get, Param } from "@nestjs/common"

import { UserService } from "src/core/user/service/user.service"

import { IdDto } from "src/core/common/dto/id.dto"


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}


    @Get(':id')
    getUser(@Param() dto: IdDto) {
        return this.userService.getUser(dto)
    }

}