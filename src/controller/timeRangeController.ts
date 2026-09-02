import Response from "../common/responce/Responce";
import { StatusCodes } from "http-status-codes";
import { Get, HttpCode, JsonController, QueryParams, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import TimeRangeService from "../service/timeRangeService";
import AvailaibleTimeRangesDto from "../dto/request/timeRequestDto";

@JsonController('/time')
export default class TimeController{

    private timeService : TimeRangeService = new TimeRangeService();

    @OpenAPI({
        description: 'Get Time Ranges',
        summary: 'Get Time Ranges Lookup'
    })
    @HttpCode(StatusCodes.CREATED)
    @Get('/lookup')
    async getTimingsLookup(): Promise<Response<any>>{
        return await this.timeService.getTimeRangeLookup();
    }

    @OpenAPI({
        description: 'Get Availaible Times by ArenaId',
        summary: 'Get Availaible Times by ArenaId for Booking'
    })
    @HttpCode(StatusCodes.OK)
    @Get('/availaible-arena-times')
    async getAvailaibleTimes(@QueryParams() request: AvailaibleTimeRangesDto): Promise<Response<any>>{
        return await this.timeService.getAvaialibleTimeRanges(request.arenaId , request.date , request?.courtId);
    }
}