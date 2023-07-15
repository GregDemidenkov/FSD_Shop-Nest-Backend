export class CreateOrderDto {
    readonly userId: string
    readonly productOrder: {
        id: string,
        count: number
    }
}