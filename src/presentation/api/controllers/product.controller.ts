import { Controller, Get, Param } from "@nestjs/common"

import { ProductService } from "src/core/product/service/product.service"
import { GetProductsDto } from "src/core/product/dto/getProducts.dto"

import { Product } from "src/infra/db/models/product.model"


@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}


    @Get('all/:type')
    getAll(@Param() dto: GetProductsDto): Promise<Product[]> {
        return this.productService.getAll(dto)
    }

}