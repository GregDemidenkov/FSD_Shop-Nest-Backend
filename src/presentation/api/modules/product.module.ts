import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { ProductController } from "../controllers/product.controller"
import { ProductService } from "src/core/services/product.service" 
import { Product, ProductModel } from "src/infra/db/models/product.model"
import { ProductDao } from "src/infra/db/dao/product.dao"


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