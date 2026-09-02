import Response from "../common/responce/Responce";
import CreateSportsCategoryRequest from "../dto/request/sportsCategoryRequest";
import { StatusCodes } from "http-status-codes";
import { Body, Get, HttpCode, JsonController, Post, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import SportsCategoryWriteService from "../service/sportsCategoriesService-w";
import { jwtAuthMiddleware } from "../config/authiddleware";

@JsonController('/sports-category')
export default class SportsCategoryController{

    private sportsService: SportsCategoryWriteService = new SportsCategoryWriteService();

    @OpenAPI({
        description: 'Add Sports Category',
        summary: 'Add a Sports Category for Arenas'
    })
    @HttpCode(StatusCodes.CREATED)
    @UseBefore(jwtAuthMiddleware)
    @Post('/create')
    async addSportsCategory(@Body({ validate: true }) request: CreateSportsCategoryRequest): Promise<Response<any>> {
        return await this.sportsService.addSportCategory(request);
    }

    @OpenAPI({
        description: 'Get Sports Categories',
        summary: 'Get Lookup of Sports Categories'
    })
    @HttpCode(StatusCodes.CREATED)
    @Get('/lookup')
    async getSportsCategories(): Promise<Response<any>>{
        return await this.sportsService.getSportsCategories();
    }
}