import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { AuthController } from "../controllers/auth.controller"
import { AuthService } from "src/core/auth/service/auth.service"
import { AuthDao } from "src/infra/db/dao/auth.dao"
import { User, UserModel } from "src/infra/db/models/user.model"
import { AuthMiddleware } from "../middleware/auth/auth.middleware"


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserModel}
        ])
    ],
    providers: [AuthService, AuthDao],
    controllers: [AuthController]
})


export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .exclude(
            {path: '/auth/registration', method: RequestMethod.POST},
            { path: '/auth/login', method: RequestMethod.POST },
            { path: '/auth/refresh-token/:token', method: RequestMethod.GET },
            )
          .forRoutes(AuthController)
    }
}