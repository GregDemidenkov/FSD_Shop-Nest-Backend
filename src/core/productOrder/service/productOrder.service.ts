import { Injectable } from "@nestjs/common"

import { UserOrderDao } from "src/infra/db/dao/userOrder.dao"
import { ProductOrderDao } from "src/infra/db/dao/productOrder.dao"
import { ProductDao } from "src/infra/db/dao/product.dao"

import { CreateProductOrderDto } from "src/core/productOrder/dto/createProductOrder.dto"
import { AddProductDto } from "../dto/addProduct.dto"
import { ChangeProductOrderDto } from "src/core/userOrder/dto/changeProductOrder.dto"
import { ChangeCountProductOrderDto } from "../dto/changeCountProductOrder.dto"
import { FullProductOrderDto } from "../dto/fullProductOrder.dto"
import { ProductCountExcess } from "../exceptions/productCountExcess"
import { ProductOrderDocument } from "src/infra/db/models/product-order.model"
import { IdDto } from "src/core/common/dto/id.dto"


@Injectable()
export class ProductOrderService {

    constructor(
        private readonly userOrderDao: UserOrderDao,
        private readonly productOrderDao: ProductOrderDao,
        private readonly productDao: ProductDao
    ) {}


    async createProductOrder(dto: AddProductDto) {
        const userId: string = dto.userId
        const isUserOrder = await this.userOrderDao.getOrderByUserId(userId)

        let userOrderId: string
        if(!isUserOrder) {
            const userOrder = await this.userOrderDao.createUserOrder(userId)
            userOrderId = userOrder.id
        }

        const product = await this.productDao.getById(dto.productOrder.id)
        const fullPrice: number = dto.productOrder.count * product.price

        userOrderId = userOrderId || isUserOrder.id
        const productOrderDto: CreateProductOrderDto = {
            userOrderId: userOrderId,
            productId: dto.productOrder.id,
            count: dto.productOrder.count,
            fullPrice: fullPrice
        }

        const productOrder = await this.productOrderDao.createProductOrder(productOrderDto)

        const addProductOrderDto: ChangeProductOrderDto = {
            userOrderId: userOrderId,
            productOrderId: productOrder.id,
            fullPrice: fullPrice,
            action: "add"
        }

        return this.userOrderDao.changeProductOrderId(addProductOrderDto)
    }

    async updateOrder(dto: ChangeCountProductOrderDto, productOrder: FullProductOrderDto) {
        const updatedProductOrder = await this.productOrderDao.updateProductOrder(
            dto.productOrderId, dto.count, productOrder.product.price
        )

        const absFullPrice = Math.abs((dto.count * productOrder.product.price) - productOrder.fullPrice)

        await this.userOrderDao.updateCheckOrder(dto.userOrderId, absFullPrice, dto.action)

        return updatedProductOrder
    }

    async updateCountProductOrder(dto: ChangeCountProductOrderDto): Promise<ProductOrderDocument> {
        const action: string = dto.action
        const productOrder: FullProductOrderDto = await this.productOrderDao.getById(dto.productOrderId)

        if(action === "add") {
            if(dto.count > productOrder.product.count) {
                throw new ProductCountExcess("Not enough product in stock")
            }

            return this.updateOrder(dto, productOrder)
        } else {
            if(dto.count === 0) {
                const deletedProductOrder = await this.productOrderDao.deleteById(dto.productOrderId)

                const changeProductOrderDto: ChangeProductOrderDto = {
                    userOrderId: dto.userOrderId,
                    productOrderId: dto.productOrderId,
                    fullPrice: deletedProductOrder.full_price,
                    action: "delete"
                }

                await this.userOrderDao.changeProductOrderId(changeProductOrderDto)

                return deletedProductOrder
            } else {
                return this.updateOrder(dto, productOrder)
            }
        }
    }

    async deleteProductOrder(dto: IdDto) {
        const deletedProductOrder = await this.productOrderDao.deleteById(dto.id)

        const changeProductOrderDto: ChangeProductOrderDto = {
            userOrderId: deletedProductOrder.user_order_id,
            productOrderId: dto.id,
            fullPrice: deletedProductOrder.full_price,
            action: "delete"
        }

        const updatedUserOrder = await this.userOrderDao.changeProductOrderId(changeProductOrderDto)

        if(updatedUserOrder.products.length === 0) {
            await this.userOrderDao.deleteById(updatedUserOrder.id)
        }
    }
    
}