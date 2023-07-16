import { Injectable } from "@nestjs/common"

import { UserOrderDocument } from "src/infra/db/models/user-order.model"

import { UserOrderDao } from "src/infra/db/dao/userOrder.dao"
import { ProductOrderDao } from "src/infra/db/dao/productOrder.dao"
import { ProductDao } from "src/infra/db/dao/product.dao"

import { IdDto } from "src/core/common/dto/id.dto"
import { ProductCountExcess } from "src/core/productOrder/exceptions/productCountExcess"


@Injectable()
export class UserOrderService {

    constructor(
        private readonly userOrderDao: UserOrderDao,
        private readonly productOrderDao: ProductOrderDao,
        private readonly productDao: ProductDao
    ) {}


    async getOrder(dto: IdDto): Promise<UserOrderDocument> {
        return this.userOrderDao.getOrderByUserId(dto.id)
    }

    async updateOrderStatus(dto: IdDto): Promise<UserOrderDocument> {
        const userOrder = await this.userOrderDao.getOrderById(dto.id)

        for(let id of userOrder.products) {
            const productOrder = await this.productOrderDao.getFullById(id)
            const product_id = productOrder.product.id

            if(productOrder.count > productOrder.product.count) {
                throw new ProductCountExcess("Not enough product in stock")
            }

            await this.productDao.updateCount(product_id, productOrder.count)
        }

        return this.userOrderDao.updateOrderStatus(dto.id)
    }

    async deleteOrder(dto: IdDto) {
        await this.userOrderDao.deleteById(dto.id)

        await this.productOrderDao.deleteManyByUserOrderId(dto.id)
    }
    
}