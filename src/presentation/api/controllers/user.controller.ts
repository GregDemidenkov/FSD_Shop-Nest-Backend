import { Controller, Get, Param } from "@nestjs/common"

import { IdDto } from "src/core/common/dto/id.dto"
import { UserService } from "src/core/user/service/user.service"



@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}


    @Get(':id')
    getUser(@Param() dto: IdDto) {
        return this.userService.getUser(dto)
    }

}