import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { ProductController } from "../controllers/product.controller"
import { ProductService } from "src/core/product/service/product.service"
import { ProductDao } from "src/infra/db/dao/product.dao"
import { Product, ProductModel } from "src/infra/db/models/product.model"


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Product.name, schema: ProductModel}
        ])
    ],
    providers: [ProductService, ProductDao],
    controllers: [ProductController]
})


export class ProductsModule {}