import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'


export default async () => {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('/api/')
    await app.listen(5000)
}