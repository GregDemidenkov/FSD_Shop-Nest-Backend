import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"


export type ProductOrderDocument = ProductOrder & Document

@Schema({ collection: 'product_orders' })
export class ProductOrder {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserOrder' })
    user_order_id: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product_id: string | ProductOrderDocument

    @Prop()
    count: number

    @Prop()
    full_price: number
}

export const ProductOrderModel = SchemaFactory.createForClass(ProductOrder)