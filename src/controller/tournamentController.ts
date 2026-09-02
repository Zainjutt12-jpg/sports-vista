import Response from "../common/responce/Responce";
import { AddTournamentRequestDto, GetTournamentRequestDto, UpdateTournamentRequestDto } from "../dto/request/tournamentRequest";
import { StatusCodes } from "http-status-codes";
import { JsonController, HttpCode, Post, Body, UseBefore, Get, QueryParams, Put, Param } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import TournamentService from "../service/tournamentService";

@JsonController('/tournament')
export default class TournamentController{

    private tournamentService = new TournamentService();

    @OpenAPI({
        description: 'Add Tournament',
        summary: 'Create a new tounament'
    })
    @HttpCode(StatusCodes.CREATED)
    @Post('')
    async addTournament(@Body({ validate: true }) request: AddTournamentRequestDto): Promise<Response<any>> {
        return await this.tournamentService.addTournament(request);
    }

    @OpenAPI({
        description: 'Add Tournament',
        summary: 'Create a new tounament'
    })
    @HttpCode(StatusCodes.CREATED)
    @Put('/:tournamentId')
    async updateTournament(@Body({ validate: true }) request: UpdateTournamentRequestDto , @Param('tournamentId') tournamentId: number): Promise<Response<any>> {
        return await this.tournamentService.updateTournament(request , tournamentId);
    }

    @OpenAPI({
        description: 'Get Tournaments',
        summary: 'Get tournament logs'
    })
    @HttpCode(StatusCodes.OK)
    @Get('')
    async getTournamentsByCriteria(@QueryParams({ validate: true }) request : GetTournamentRequestDto): Promise<any>{
        return await this.tournamentService.getTournamentsByCriteria(
            request?.date, 
            request?.page, 
            request?.pageSize,
            request?.vendorId,
            request?.tournamentId,
            request?.cityId,
            request?.isActive
        );
    }

}