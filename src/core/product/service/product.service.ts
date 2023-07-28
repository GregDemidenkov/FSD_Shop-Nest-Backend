import { Injectable } from "@nestjs/common"

import { ProductDao } from "src/infra/db/dao/product.dao"
import { Product } from "src/infra/db/models/product.model"
import { GetProductsDto } from "../dto/getProducts.dto"


@Injectable()
export class ProductService {

    constructor(private readonly productDao: ProductDao) {}


    async getAll(dto: GetProductsDto): Promise<Product[]> {
        return this.productDao.getAll(dto)
    }
    
}