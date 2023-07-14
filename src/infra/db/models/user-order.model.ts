import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document, ObjectId } from "mongoose"
import { User } from "./user.model"
import { ProductOrder } from "./product-order.model"


export type UserOrderDocument = UserOrder & Document

@Schema()
export class UserOrder {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: User

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductOrder' }] })
    products: ProductOrder[]

    @Prop()
    check: number
}

export const UserOrderModel = SchemaFactory.createForClass(UserOrder)