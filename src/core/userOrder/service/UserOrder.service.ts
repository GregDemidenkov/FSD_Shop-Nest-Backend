import { Injectable } from "@nestjs/common"

import { UserOrderDocument } from "src/infra/db/models/user-order.model"

import { UserOrderDao } from "src/infra/db/dao/userOrder.dao"
import { ProductOrderDao } from "src/infra/db/dao/productOrder.dao"
import { ProductDao } from "src/infra/db/dao/product.dao"

import { CreateProductOrderDto } from "src/core/productOrder/dto/createProductOrder.dto"
import { AddProductOrderDto } from "../dto/addProductOrder.dto"
import { CreateOrderDto } from "../dto/createOrder.dto"


@Injectable()
export class UserOrderService {

    constructor(
        private readonly userOrderDao: UserOrderDao,
        private readonly productOrderDao: ProductOrderDao,
        private readonly productDao: ProductDao
    ) {}


    async createOrder(dto: CreateOrderDto): Promise<UserOrderDocument> {
        const userId: string = dto.userId
        const userOrder = await this.userOrderDao.createOrder(userId)
        const userOrderId: string = userOrder.id

        const product = await this.productDao.getById(dto.productOrder.id)
        const fullPrice: number = dto.productOrder.count * product.price

        const productOrderDto: CreateProductOrderDto = {
            userOrderId: userOrderId,
            productId: dto.productOrder.id,
            count: dto.productOrder.count,
            fullPrice: fullPrice
        }

        const productOrder = await this.productOrderDao.createOrder(productOrderDto)

        const addProductOrderDto: AddProductOrderDto = {
            userOrderId: userOrderId,
            productId: productOrder.id,
            fullPrice: fullPrice
        }

        return this.userOrderDao.AddProductOrderId(addProductOrderDto)
    }
    
}