import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { ProductOrder, ProductOrderDocument } from "../models/product-order.model"
import { CreateProductOrderDto } from "src/core/productOrder/dto/createProductOrder.dto"


export class ProductOrderDao {

    constructor(@InjectModel(ProductOrder.name) private productOrderModel: Model<ProductOrderDocument>) {}


    async createOrder(dto: CreateProductOrderDto) {
        const productOrderModel: ProductOrder = {
            user_order_id: dto.userOrderId,
            product_id: dto.productId,
            count: dto.count,
            full_price: dto.fullPrice
        }
        return this.productOrderModel.create(productOrderModel)
    }
    
}