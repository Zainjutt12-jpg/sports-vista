import StatusCode, {SUCCESS} from "./StatusCode";
import PageResponse from "../responce/PageResponce";

export default class Response<T> {

    payload: Record<string, T>;
    pagination: PageResponse;
    message: string;
    detail: string
    statusCode: number;

    constructor(payload: Record<string, T>, pagination: PageResponse = undefined, status: StatusCode = SUCCESS) {
        this.payload = payload;
        this.message = status.message;
        this.detail = status.detail;
        this.statusCode = status.status;
        this.pagination = pagination;
    }
}