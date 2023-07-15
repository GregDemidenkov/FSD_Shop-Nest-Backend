export class CreateProductOrderDto {
    readonly userOrderId: string
    readonly productId: string
    readonly count: number
    readonly fullPrice: number
}