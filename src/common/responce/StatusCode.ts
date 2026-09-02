import {StatusCodes} from "http-status-codes";

export default class StatusCode {
    message: any;
    detail: string;
    status: any;
    errorCode: number;

    constructor(message: string, detail: string, errorCode: number, status: number) {
        this.message = message;
        this.detail = detail;
        this.errorCode = errorCode;
        this.status = status;
    }
}

export const CREATED: StatusCode = new StatusCode(
    "Created",
    "Operation Success",
    StatusCodes.CREATED,
    StatusCodes.CREATED
);

export const SUCCESS: StatusCode = new StatusCode(
    "Success",
    "Operation Success",
    StatusCodes.OK,
    StatusCodes.OK);

export const INTERNAL_SERVER_ERROR: StatusCode = new StatusCode(
    "Error",
    "Internal Server Error",
    StatusCodes.INTERNAL_SERVER_ERROR,
    StatusCodes.INTERNAL_SERVER_ERROR);

export const BAD_REQUEST: StatusCode = new StatusCode(
    "Error",
    "Bad Request Error",
    StatusCodes.BAD_REQUEST,
    StatusCodes.BAD_REQUEST);

/* Custom Error codes:
 * Bad Request: 400X
 * Internal Server 500X */

export const Arena_Not_Found = new StatusCode(
    "Something went wrong, please contact to administration",
    "Arena Not Found for Update",
    4001,
    StatusCodes.BAD_REQUEST);

export const Employee_Not_Found = new StatusCode(
    "Something went wrong, please contact to administration",
    "Employee Not Found for Update",
    4001,
    StatusCodes.BAD_REQUEST);

export const UPDATED = new StatusCode(
    "Updated",
    "Data Updated Scccessfully",
    200,
    StatusCodes.OK);

export const UNAUTHORIZED: StatusCode = new StatusCode(
    "Error",
    "Authorization Key Not Found",
    StatusCodes.UNAUTHORIZED,
    StatusCodes.UNAUTHORIZED);

export const DUBLICATE_EMAIL: StatusCode = new StatusCode(
    "Error",
    `Dublicate Email Found!
    Please Change your Email`,
    StatusCodes.UNAUTHORIZED,
    StatusCodes.UNAUTHORIZED);