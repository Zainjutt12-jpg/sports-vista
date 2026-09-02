import { EntityManager } from "typeorm";
import Response from "../common/responce/Responce";
import { CREATED } from "../common/responce/StatusCode";
import RegistrationTeamsReq, { registrationTeamsTournamentReq ,RegistrationAndInvoices} from "../dto/request/registrationTournamentReq";
import RegistrationInfoMapper from "../mapper/registrationTeamMapper";
import RegistrationOfTeamEntity from "../entity/registrationOfTeamsEntity";
import { RegistrationInfoRepository } from "../repository/registrationTournamentRepo";
import { jwtAuthMiddleware } from "../config/authiddleware";
import { Body, Get, HttpCode, JsonController, Post,Put,Param, UseBefore, QueryParams } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { StatusCodes } from "http-status-codes";
import RegistrationInfoService from "../service/registrationOfTournamentService";
import registeredTeamsInfo from "../dto/responce/registrationResponseDto";

@JsonController('/tournament_registrations')
export default class RegistrationInfoController{

    private registrationService: RegistrationInfoService = new RegistrationInfoService();
    @OpenAPI({
        description: 'Add Registration',
        summary: 'Create a new Registration'
    })
    @HttpCode(StatusCodes.CREATED)
    @Post('/add-registration')
    async addRegistration(@Body({ validate: true }) request: RegistrationAndInvoices): Promise<Response<any>> {
        return await this.registrationService.addRegistration(request);
    }
 

    @OpenAPI({
        description: 'Get Teams',
        summary: 'Get a list of registered teams'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/list')
    async getTeamsRegistrations(@QueryParams() query: registrationTeamsTournamentReq): Promise<Response<registeredTeamsInfo[]>> {
        return await this.registrationService.getTeamsRegistrations(query.tournamentId);
    }




}
