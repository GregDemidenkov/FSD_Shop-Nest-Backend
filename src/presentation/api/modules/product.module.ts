import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { ProductController } from "../controllers/product.controller"
import { ProductService } from "src/core/product/service/product.service"
import { ProductDao } from "src/infra/db/dao/product.dao"
import { Product, ProductModel } from "src/infra/db/models/product.model"
import { AuthMiddleware } from "../middleware/auth/auth.middleware"


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Product.name, schema: ProductModel}
        ])
    ],
    providers: [ProductService, ProductDao],
    controllers: [ProductController]
})


export class ProductsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes(ProductController);
    }
}