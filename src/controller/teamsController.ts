import Response from '../common/responce/Responce';
import { jwtAuthMiddleware } from '../config/authiddleware';
import { Body, Get, HttpCode, JsonController, Post, Put, Param, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { StatusCodes } from 'http-status-codes';
import teamsService from '../service/teamsService';
import teamPostDto, { teamPutDto } from '../dto/request/teamsRequest';
import teamsResponseDto from '../dto/responce/teamsResponse';

@JsonController('/teams')
export default class TeamsController {

    private teamsService: teamsService = new teamsService();

    @OpenAPI({
        description: 'Add Team',
        summary: 'Create a new team'
    })
    @HttpCode(StatusCodes.CREATED)
    @Post('/add-team')
    async addTeams(@Body({ validate: true }) request: teamPostDto): Promise<Response<any>> {
        return await this.teamsService.addTeam(request);
    }

    @OpenAPI({
        description: 'Update Teams',
        summary: 'Update a previous team'
    })
    @HttpCode(StatusCodes.CREATED)
    @UseBefore(jwtAuthMiddleware)
    @Put('/update-team/:teamId')
    async updateUser(@Param('teamId') teamId: number, @Body({ validate: true }) updateTeamDto: teamPutDto) {
        return await this.teamsService.updateTeam(teamId, updateTeamDto);
    }

    @OpenAPI({
        description: 'Get Teams',
        summary: 'Get a list of teams'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/list')
    async getTeams(): Promise<Response<teamsResponseDto[]>> {
        return await this.teamsService.getTeams();
    }

    @OpenAPI({
        description: 'Get Teams by User ID',
        summary: 'Get teams associated with a specific user'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/:userId')
    async getTeamsByUserId(@Param('userId') userId: number): Promise<Response<teamsResponseDto[]>> {
        return await this.teamsService.getTeamsByUserId(userId);
    }

    @OpenAPI({
        description: 'Get Teams by Team ID',
        summary: 'Get teams associated with a specific TEAMId'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/teams/:teamId')
    async letsGetTeamsByTeamId(@Param('teamId') teamId: number): Promise<Response<teamsResponseDto[]>> {
        return await this.teamsService.letsGetTeamsByTeamId(teamId);
    }
}
