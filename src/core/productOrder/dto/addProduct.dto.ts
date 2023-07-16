export class AddProductDto {
    readonly userId: string
    readonly productOrder: {
        id: string,
        count: number
    }
}