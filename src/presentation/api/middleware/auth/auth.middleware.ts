import { NestMiddleware, Injectable } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

import { Unauthorized } from 'src/core/common/exceptions/unauthorized'


@Injectable()
export class AuthMiddleware implements NestMiddleware {


    async use(req: Request, res: Response, next: NextFunction) {
        if(req.method === "OPTIONS") return next()

        try {
            const authHeaders = req.headers.authorization
            const token = (authHeaders as string).split(' ')[1]

            const decode: any = jwt.verify(token, process.env.JWT_SECRET)

            req.body.id = decode.id
            next()
        } catch (error) {
            throw new Unauthorized('Unauthorized')
        }
    }
    
}