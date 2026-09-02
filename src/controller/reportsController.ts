import Response from '../common/responce/Responce';
import { MonthlyRevenueRequestDo } from '../dto/request/reportsRequesDto';
import { StatusCodes } from 'http-status-codes';
import { Get, HttpCode, JsonController, QueryParams, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import ReportsService from '../service/reportsService';
import { jwtAuthMiddleware } from '../config/authiddleware';

@JsonController('/report')
export default class ReportsController {

    private reportService: ReportsService = new ReportsService();
    @OpenAPI({
        description: 'Get Monthly Report',
        SUmmary: 'Get Reports Month Wise'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/monthly-revenue')
    async get_Monthly_Revenue_Report_By_Month_Number(@QueryParams({ validate: true }) request: MonthlyRevenueRequestDo) : Promise<Response<any>>{
        return await this.reportService.get_Monthly_Revenue_Report(
            request.month,
            request.year,
            request.vendorId
        );
    }
}