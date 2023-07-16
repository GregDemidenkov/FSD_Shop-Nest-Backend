import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { UserOrder, UserOrderDocument } from "../models/user-order.model"

import { ChangeProductOrderDto } from "src/core/userOrder/dto/changeProductOrder.dto"
import { UpdateCheckOrderDto } from "src/core/userOrder/dto/updateCheckOrder.dto"


export class UserOrderDao {

    constructor(@InjectModel(UserOrder.name) private userOrderModel: Model<UserOrderDocument>) {}


    async createUserOrder(id: string): Promise<UserOrderDocument> {
        return this.userOrderModel.create({user_id: id})
    }

    async getOrderByUserId(id: string): Promise<UserOrderDocument> {
        return this.userOrderModel.findOne({user_id: id, status: "pending"})
    }

    async getOrderById(id: string): Promise<UserOrderDocument> {
        return this.userOrderModel.findOne({_id: id, status: "pending"})
    }

    async changeProductOrderId(dto: ChangeProductOrderDto): Promise<UserOrderDocument> {
        const userOrder = await this.userOrderModel.findById(dto.userOrderId)

        if(dto.action === "add") {
            userOrder.products.push(dto.productOrderId)
            userOrder.check += dto.fullPrice
        } else {
            userOrder.products = userOrder.products.filter(id => id != dto.productOrderId)
            userOrder.check -= dto.fullPrice
        }

        await userOrder.save()

        return userOrder
    }

    async updateOrderStatus(id: string) {
        return this.userOrderModel.findByIdAndUpdate(id, {status: 'closed'}, {new: true})
    }

    async updateCheckOrder(dto: UpdateCheckOrderDto) {
        const userOrder = await this.getOrderById(dto.userOrderId)

        if(dto.action === "add") {
            userOrder.check += dto.absFullPrice
        } else {
            userOrder.check -= dto.absFullPrice
        }

        await userOrder.save()
    }

    async deleteById(id: string) {
        return this.userOrderModel.findByIdAndDelete(id)
    }
    
}