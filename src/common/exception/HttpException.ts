import {HttpError} from "routing-controllers";
import {StatusCodes} from "http-status-codes";

export default class HttpException extends HttpError {

    public httpCode: number;
    public errorCode: number;
    public message: string;
    public detail: string;

    constructor(httpCode = StatusCodes.INTERNAL_SERVER_ERROR,
                message = "Something went wrong, please contact to administration",
                detail = "Something went wrong, please contact to administration",
                errorCode = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(httpCode, message);
        this.httpCode = httpCode;
        this.message = message;
        this.detail = detail;
        this.errorCode = errorCode || httpCode;
    }
}

export class NotFoundException extends HttpException {
    constructor(detail: string, message = "Not Found") {
        super(StatusCodes.NOT_FOUND, message, detail, StatusCodes.NOT_FOUND);
    }
}

export class ConflictException extends HttpException {
    constructor(detail: string, message = "Conflict") {
        super(StatusCodes.CONFLICT, message, detail, StatusCodes.CONFLICT);
    }
}
