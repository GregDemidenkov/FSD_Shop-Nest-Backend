export class LoginResponseDto {
    readonly accessToken: string
    readonly refreshToken: string
    readonly user: {
        id: string,
        name: string,
        email: string
    }
}