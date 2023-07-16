import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { ProductOrder, ProductOrderDocument } from "../models/product-order.model"
import { CreateProductOrderDto } from "src/core/productOrder/dto/createProductOrder.dto"
import { FullProductOrderDto } from "src/core/productOrder/dto/fullProductOrder.dto"


export class ProductOrderDao {

    constructor(@InjectModel(ProductOrder.name) private productOrderModel: Model<ProductOrderDocument>) {}


    async findById(id: string) {
        return this.productOrderModel.findById(id)
    }

    async createProductOrder(dto: CreateProductOrderDto) {
        const productOrderModel: ProductOrder = {
            user_order_id: dto.userOrderId,
            product_id: dto.productId,
            count: dto.count,
            full_price: dto.fullPrice
        }
        return this.productOrderModel.create(productOrderModel)
    }
    
    async getFullById(id: string): Promise<FullProductOrderDto> {
        const product = await this.productOrderModel.findById(id).populate('product_id').exec()

        return {
            userOrderId: product.user_order_id,
            product: typeof product.product_id !== 'string' ? product.product_id : {},
            count: product.count,
            fullPrice: product.full_price
        } as FullProductOrderDto
    }

    async updateProductOrder(id: string, count: number, price: number) {
        const productOrder = await this.productOrderModel.findById(id)

        productOrder.count = count
        productOrder.full_price = count * price

        await productOrder.save()

        return productOrder
    }

    async deleteById(id: string) {
        return this.productOrderModel.findByIdAndDelete(id)
    }

    async deleteManyByUserOrderId(id: string) {
        return this.productOrderModel.deleteMany({user_order_id: id})
    }
}