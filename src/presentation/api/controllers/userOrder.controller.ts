import { Controller, Delete, Get, Param, Patch } from "@nestjs/common"

import { UserOrderService } from "src/core/userOrder/service/UserOrder.service"

import { IdDto } from "src/core/common/dto/id.dto"


@Controller('user-order')
export class UserOrderController {

    constructor(private readonly userOrderService: UserOrderService) {}


    @Get(':id')
    getOrder(@Param() dto: IdDto) {
        return this.userOrderService.getOrder(dto)
    }

    @Patch(':id')
    updateOrderStatus(@Param() dto: IdDto) {
        return this.userOrderService.updateOrderStatus(dto)
    }

    @Delete(':id')
    deleteOrder(@Param() dto: IdDto) {
        return this.userOrderService.deleteOrder(dto)
    }
    
}