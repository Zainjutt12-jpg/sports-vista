import Response from "../common/responce/Responce";
import ArenaMasterRequestDto, { ArenaRequestCreate, ArenaRequestUpdate, SearchArenaRequestDto } from "../dto/request/arenaCreateRequest";
import { StatusCodes } from "http-status-codes";
import { Body, Get, HttpCode, JsonController, Param, Patch, Post, Put, QueryParams, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import ArenaMasterService from "../service/arenaService";
import CourtsRequestDto from "../dto/request/courtsRequestDto";
import { jwtAuthMiddleware } from "../config/authiddleware";

@JsonController('/arena')
export class ArenaMasterController {
    private arenaService = new ArenaMasterService();

    @OpenAPI({ 
        description: 'Get Nearest Arenas' , 
        summary: 'Get Nearest Arena Lookup' })
    @HttpCode(StatusCodes.OK)
    @Get('/arena-master')
    async getArenaMaster(@QueryParams() query: ArenaMasterRequestDto) : Promise<Response<any>> {
        return await this.arenaService.getArenas_By_AreaId_And_SportsCategory(
            query.areaId,
            query.sportsCategoryId,
            query.arenaId,
            query.vendorId,
            query?.page,
            query?.pageSize,
            query?.active
        );
    }

    @OpenAPI({
        description: 'Create Arena',
        summary: 'Create a New Arena to Show on Nearest List and Arena Detail'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Post('/create')
    async createArena(@Body({validate: true}) request: ArenaRequestCreate): Promise<Response<any>> {
        return this.arenaService.createArena_Master(request);
    }

    @OpenAPI({
        description: 'Update Arena',
        summary: 'Update a Old Arena to Show on Nearest List and Arena Detail'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Put('/update/:arenaId/:vendorId')
    async updateArena(@Body({validate: true}) request: ArenaRequestUpdate , @Param("arenaId") arenaId: number , @Param("vendorId") vendorId: number ): Promise<Response<any>> {
        return this.arenaService.update_Arena_Master(request , arenaId , vendorId);
    }

    @OpenAPI({
        description: 'Get No of Courts',
        summary: 'Get Courts Array by ArenaId'
    })
    @HttpCode(StatusCodes.OK)
    @Get('/court-by-arenaId')
    async getCourts(@QueryParams() query: CourtsRequestDto ): Promise<Response<any>>{
        return await this.arenaService.get_No_Of_Courts_By_ArenaId(query.arenaId);
    }

    @OpenAPI({
        description: 'Get Arenas by Searching',
        summary: 'Get Arena by Searching'
    })
    @HttpCode(StatusCodes.OK)
    @Get('/search-browser')
    async getArenaBySearch(@QueryParams() query: SearchArenaRequestDto ): Promise<Response<any>>{
        return await this.arenaService.get_Arena_By_Searching(query.arenaName);
    }
}