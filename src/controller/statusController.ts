import { Get, HttpCode, JsonController, UseBefore } from "routing-controllers";
import StatusService from "../service/statusService";
import { OpenAPI } from "routing-controllers-openapi";
import { StatusCodes } from "http-status-codes";
import { jwtAuthMiddleware } from "../config/authiddleware";


@JsonController('/admin-status')
export default class StatusController {

    private statusService = new StatusService();

    @OpenAPI({
        description: 'Get Status Lookup',
        summary: 'Get Admin Booking Status Array'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/lookup')
    async get_admin_status_lookup(): Promise<any>{
        return await this.statusService.get_Booking_Statuses_Admin_Lookup();
    }
}