import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { RegistrationDto } from "src/core/auth/dto/registration.dto"
import { UserShow } from "src/core/user/dto/userShow.dto"
import { User, UserDocument } from "src/infra/db/models/user.model"


export class UserDao {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}


    async findById(id: string): Promise<UserShow> {
        const user = await this.userModel.findById(id)

        return {
            _id: user.id,
            name: user.name,
            email: user.email
        } as UserShow
    }

}