import { Get, HttpCode, JsonController, QueryParams, UseBefore } from "routing-controllers";
import StatsService from "../service/statsService";
import { OpenAPI } from "routing-controllers-openapi";
import { StatusCodes } from "http-status-codes";
import Response from "../common/responce/Responce";
import { DashboardStatsRequestDto } from "../dto/request/statsRequest";
import { jwtAuthMiddleware } from "../config/authiddleware";

@JsonController('/stats')
export default class StatsController{

    private statsService: StatsService = new StatsService;

    @OpenAPI({
        description: 'Get Upfront Balance',
        summary: 'Get Upfront Balance'
    })
    @HttpCode(StatusCodes.CREATED)
    @Get('/upfront-balance')
    async getUpfrontBalance(@QueryParams({ validate: true }) request: DashboardStatsRequestDto): Promise<Response<any>>{
        return await this.statsService.getUpfrontBalance(
            request?.vendorId
        );
    }

    @OpenAPI({
        description: 'Get Dashboard Stats',
        summary: 'Get Dashboard Stats'
    })
    @HttpCode(StatusCodes.CREATED)
    @Get('/dashboard-stats')
    async getDashboardStats(@QueryParams({ validate: true }) request: DashboardStatsRequestDto): Promise<Response<any>>{
        return await this.statsService.getDashboardStats(
            request?.vendorId
        );
    }
}