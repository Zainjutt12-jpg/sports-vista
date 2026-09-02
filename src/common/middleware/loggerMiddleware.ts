import {NextFunction, Request, Response} from 'express';
import {logger} from "../../config/loggerMiddleware";

export function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    console.log("Middle Ware Logger Called. Request");
    logger.info(`${request.method} ${request.path}`);
    next();
}
