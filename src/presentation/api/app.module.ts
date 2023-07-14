import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

import config from './config/config'


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('dbUrl'),
            }),
            inject: [ConfigService],
        })
    ]
})


export class AppModule {}