export class AuthResponseDto {
    readonly accessToken: string
    readonly user: {
        id: string,
        name: string,
        email: string
    }
}