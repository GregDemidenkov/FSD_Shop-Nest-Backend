import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'


export default async () => {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)

    const port = configService.get<number>('port')
    const prefix = configService.get<string>('dbBasePrefix')

    app.setGlobalPrefix(prefix)

    await app.listen(port)
}