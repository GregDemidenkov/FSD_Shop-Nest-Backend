export class AuthResponseDto {
    readonly token: string
    readonly user: {
        id: string,
        name: string,
        email: string
    }
}