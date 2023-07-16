import { ProductDocument } from "src/infra/db/models/product.model"

export class FullProductOrderDto {
    readonly userOrderId: string
    readonly product: ProductDocument
    readonly count: number
    readonly fullPrice: number
}