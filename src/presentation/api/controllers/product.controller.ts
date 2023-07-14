import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common"

import { ProductService } from "src/core/services/product.service"
import { Product } from "src/infra/db/models/product.model"


@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}


    @Get('all')
    getAll(): Promise<Product[]> {
        return this.productService.getAll()
    }

}