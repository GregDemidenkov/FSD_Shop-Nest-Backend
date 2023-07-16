export class ChangeCountProductOrderDto {
    readonly userOrderId: string
    readonly productOrderId: string
    readonly count: number
    readonly action: "delete" | "add"
}