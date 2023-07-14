import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"

import { UserOrder } from "./user-order.model"
import { Product } from "./product.model"


export type ProductOrderDocument = ProductOrder & Document

@Schema()
export class ProductOrder {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserOrder' })
    user_order_id: UserOrder

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product_id: Product[]

    @Prop()
    count: number

    @Prop()
    full_price: number
}

export const ProductOrderModel = SchemaFactory.createForClass(ProductOrder)