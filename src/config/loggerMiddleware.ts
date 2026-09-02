import * as winston from "winston";

export const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'})
    ]
});