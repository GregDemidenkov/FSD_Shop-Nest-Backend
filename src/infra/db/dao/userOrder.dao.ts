import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { UserOrder, UserOrderDocument } from "../models/user-order.model"

import { AddProductOrderDto } from "src/core/userOrder/dto/addProductOrder.dto"


export class UserOrderDao {

    constructor(@InjectModel(UserOrder.name) private userOrderModel: Model<UserOrderDocument>) {}


    async createOrder(id: string) {
        return this.userOrderModel.create({user_id: id})
    }

    async AddProductOrderId(dto: AddProductOrderDto): Promise<UserOrderDocument> {
        const userOrder = await this.userOrderModel.findById(dto.userOrderId)

        userOrder.products.push(dto.productId)
        userOrder.check += dto.fullPrice

        await userOrder.save()

        return userOrder
    }
    
}