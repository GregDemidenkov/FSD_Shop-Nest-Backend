import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { RegistrationDto } from "src/core/auth/dto/registration.dto"
import { User, UserDocument } from "src/infra/db/models/user.model"


export class AuthDao {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}


    async findUserByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({email: email})
    }

    async findUserById(id: string): Promise<UserDocument> {
        return this.userModel.findOne({_id: id})
    }

    async registration(dto: RegistrationDto) {
        const user: User = {
            name: dto.name,
            email: dto.email,
            password: dto.password
        }

        await this.userModel.create(user)
    }
    
}