import { StatusCodes } from "http-status-codes";
import { Body, Get, HttpCode, JsonController, Param, Post, QueryParams, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import CityService from "../service/cityService";
import Response from "../common/responce/Responce";
import getCityRequestDto from "../dto/request/cityRequestDto";
import AreaService from "../service/areaService";
import { jwtAuthMiddleware } from "../config/authiddleware";
import CreateAreaRequest from "../dto/request/areaRequest";

@JsonController('/location')
export class LocationsController {

    private cityService = new CityService();

    @OpenAPI({ description: 'Get All Cities' , summary: 'Get Cities Lookup' })
    @HttpCode(StatusCodes.OK)
    @Get('/city')
    async getCitiesLookup(@QueryParams() query: getCityRequestDto) : Promise<Response<any>> {
        return await this.cityService.getCitiesLookup(
            query.cityId,
            query.provinceId
        );
    }

    private areaService = new AreaService();

    @OpenAPI({ description: 'Get Locations By City Ids' , summary: 'Locations by City Ids'})
    @HttpCode(StatusCodes.OK)
    @Get('/areas/:cityId')
    async getAreasByCityId(@Param("cityId") cityId: number ) : Promise<Response<any>> {
        return await this.areaService.getAreasByCityId(cityId);
    }

    @OpenAPI({
        description: 'Add Area',
        summary: 'Add a New Area'
    })
    @HttpCode(StatusCodes.CREATED)
    @UseBefore(jwtAuthMiddleware)
    @Post('/area')
    async addArea(@Body({validate: true}) request: CreateAreaRequest): Promise<Response<any>> {
        return await this.areaService.addArea(request);
    }

}