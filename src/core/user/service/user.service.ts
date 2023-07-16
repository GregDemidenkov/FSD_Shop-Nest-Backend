import { Injectable } from "@nestjs/common"
import { IdDto } from "src/core/common/dto/id.dto"

import { UserDao } from "src/infra/db/dao/user.dao"
import { UserShow } from "../dto/userShow.dto"


@Injectable()
export class UserService {

    constructor(private readonly userDao: UserDao) {}


    async getUser(dto: IdDto): Promise<UserShow> {
        return this.userDao.findById(dto.id)
    }
    
}