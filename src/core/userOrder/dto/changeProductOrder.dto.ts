export class ChangeProductOrderDto {
    readonly userOrderId: string
    readonly productOrderId: string
    readonly fullPrice: number
    readonly action: "delete" | "add"
}