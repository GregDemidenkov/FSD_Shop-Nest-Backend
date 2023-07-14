import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './middleware/exceptions/exceptionFilter'


export default async () => {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)

    const port = configService.get<number>('port')
    const prefix = configService.get<string>('dbBasePrefix')

    app.setGlobalPrefix(prefix)
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(port)
}