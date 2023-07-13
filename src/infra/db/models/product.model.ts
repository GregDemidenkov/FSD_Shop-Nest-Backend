import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"


export type ProductDocument = Product & Document

@Schema()
export class Product {
    @Prop()
    name: string

    @Prop()
    img: string

    @Prop()
    country: string

    @Prop()
    carats: number

    @Prop()
    price: number

    @Prop()
    count: number
}

export const ProductModal = SchemaFactory.createForClass(Product)