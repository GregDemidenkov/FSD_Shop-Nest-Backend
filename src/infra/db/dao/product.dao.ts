import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { GetProductsDto } from "src/core/product/dto/getProducts.dto"
import { UpdateCountDto } from "src/core/product/dto/updateCount.dto"
import { Product, ProductDocument } from "src/infra/db/models/product.model"


export class ProductDao {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    
    async getById(id: string) {
        return this.productModel.findById(id)
    }

    async getAll(dto: GetProductsDto): Promise<Product[]> {
        if (dto.type === "default") {
            return this.productModel.find().exec()
        } else if(dto.type === 'up') {
            return this.productModel.find().sort({'price': 1}).exec()
        } else if(dto.type === 'down') {
            return this.productModel.find().sort({'price': -1}).exec()
        }
    }

    async updateCount(dto: UpdateCountDto) {
        const product = await this.productModel.findById(dto.id)

        product.count -= dto.count

        await product.save()

        return product
    }
    
}