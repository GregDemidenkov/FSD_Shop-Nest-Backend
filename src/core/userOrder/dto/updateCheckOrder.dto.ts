export class UpdateCheckOrderDto {
    readonly userOrderId: string
    readonly absFullPrice: number
    readonly action: "add" | "delete"
}