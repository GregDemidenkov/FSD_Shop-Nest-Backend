import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { Product, ProductDocument } from "src/infra/db/models/product.model"


export class ProductDao {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}


    async getAll(): Promise<Product[]> {
        return this.productModel.find().exec()
    }
    
}