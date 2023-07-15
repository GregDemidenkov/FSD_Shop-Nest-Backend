import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"


export type UserOrderDocument = UserOrder & Document

@Schema({ collection: 'user_orders' })
export class UserOrder {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductOrder' }] })
    products: string[]

    @Prop({default: 0})
    check: number

    @Prop({default: 'pending'})
    status: 'pending' | 'closed'
}

export const UserOrderModel = SchemaFactory.createForClass(UserOrder)