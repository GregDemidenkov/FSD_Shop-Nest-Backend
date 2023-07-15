import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { ProductsModule } from './modules/product.module'
import { AuthModule } from './modules/auth.module'

import config from './config/config'
import { UserOrderModule } from './modules/userOrder.module'


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
        }),
        ProductsModule,
        AuthModule,
        UserOrderModule
    ]
})


export class AppModule {}