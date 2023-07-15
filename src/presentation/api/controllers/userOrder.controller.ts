import { Body, Controller, Post } from "@nestjs/common"

import { UserOrderService } from "src/core/userOrder/service/UserOrder.service"

import { CreateOrderDto } from "src/core/userOrder/dto/createOrder.dto"


@Controller('user-order')
export class UserOrderController {

    constructor(private readonly userOrderService: UserOrderService) {}


    @Post('create')
    createOrder(@Body() dto: CreateOrderDto) {
        return this.userOrderService.createOrder(dto)
    }

}