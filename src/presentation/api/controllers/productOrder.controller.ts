import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common"

import { ProductOrderService } from "src/core/productOrder/service/productOrder.service"

import { AddProductDto } from "src/core/productOrder/dto/addProduct.dto"
import { ChangeCountProductOrderDto } from "src/core/productOrder/dto/changeCountProductOrder.dto"
import { IdDto } from "src/core/common/dto/id.dto"


@Controller('product-order')
export class ProductOrderController {

    constructor(private readonly productOrderService: ProductOrderService) {}


    @Post('create')
    createProductOrder(@Body() dto: AddProductDto) {
        return this.productOrderService.createProductOrder(dto)
    }

    @Patch('update-count')
    updateCountProductOrder(@Body() dto: ChangeCountProductOrderDto) {
        return this.productOrderService.updateCountProductOrder(dto)
    }

    @Delete(':id')
    deleteProductOrder(@Param() dto: IdDto) {
        return this.productOrderService.deleteProductOrder(dto)
    }

}