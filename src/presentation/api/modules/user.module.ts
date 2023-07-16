import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { UserController } from "../controllers/user.controller"
import { UserService } from "src/core/user/service/user.service"
import { UserDao } from "src/infra/db/dao/user.dao"
import { User, UserModel } from "src/infra/db/models/user.model"

import { AuthMiddleware } from "../middleware/auth/auth.middleware"


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserModel}
        ])
    ],
    providers: [UserService, UserDao],
    controllers: [UserController]
})


export class UserModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes(UserController)
    }
}