import { ExceptionFilter, Catch, ArgumentsHost, } from '@nestjs/common'
import { Response } from 'express'

import { Unauthorized } from 'src/core/common/exceptions/unauthorized'
import { ProductCountExcess } from 'src/core/productOrder/exceptions/productCountExcess'
import { UserAlreadyExist } from 'src/core/user/exceptions/userAlreadyExist'


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        
        let status: number
        let message: string

        if (exception instanceof UserAlreadyExist) {
            message = exception.message
            status = 400
        } else if(exception instanceof Unauthorized) {
            message = exception.message
            status = 401
        } else if (exception instanceof ProductCountExcess) {
            message = exception.message
            status = 400
        } else {
            message = "Internal serever error"
            status = 500
        }

        response
        .status(status)
        .json({
            message: message,
        })
    }
    
}