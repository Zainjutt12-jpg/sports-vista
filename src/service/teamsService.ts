import TeamEntity from "../entity/teamEntity";
import teamPostDto, { teamPutDto } from "../dto/request/teamsRequest";
import StatusCode from '../common/responce/StatusCode';
import * as swaggerUI from 'swagger-ui-express';
import Response from "../common/responce/Responce";
import { CREATED } from '../common/responce/StatusCode';
import { EntityManager } from "typeorm";
import teamsMapper from "../mapper/teamsMapper";
import { TeamsInfoRepository } from "../repository/teamsRepository";
import UserEntity from "../entity/userEntity";
import teamsResponseDto from "../dto/responce/teamsResponse";
export default class teamsService {
    private teamRepo = TeamsInfoRepository
    async addTeam(request:teamPostDto){
        const user = await this.teamRepo.manager.findOne(UserEntity, { where: { userId: request.createdById } });

        if (!user) {
            throw new Error(`User with ID ${request.createdById} does not exist.`);
        }

        const existingTeam = await this.teamRepo.manager.findOne(TeamEntity, { where: { createdById: request.createdById } });

        if (existingTeam) {
            throw new Error(`User with ID ${request.createdById} already has a team.`);
            return new Response<any>({detail:'Team is Created Already'});
        }
        let team : TeamEntity;
        await this.teamRepo.manager.transaction(async (entityManager: EntityManager) => {
            team = teamsMapper.toEntity(request);
            team = await entityManager.save(team);
        });

        return new Response<any>({ team },CREATED.status);


    }

    async updateTeam(teamId:number,req:teamPutDto){
        const team = await this.teamRepo.findOne({ where: { teamId } });
        if(!team){
            throw new Error('User not found');
        }

        if (req.teamName !== undefined) team.teamName = req.teamName;
        if (req.createdBy !== undefined) team.createdBy = req.createdBy;
        if (req.createdById !== undefined) team.createdById = req.createdById;
        if (req.teamDesc !== undefined) team.teamDesc = req.teamDesc;
        if (req.teamLogo  !== undefined) team.teamLogo = req.teamLogo;
        if(req.player1 !==undefined) team.player1 = req.player1;
        if(req.player2 !==undefined) team.player2 = req.player2;
        if(req.player3 !==undefined) team.player3 = req.player3;
        if(req.player4 !==undefined) team.player4 = req.player4;
        if(req.player5 !==undefined) team.player5 = req.player5;
        if(req.player6 !==undefined) team.player6 = req.player6;
        if(req.player7 !==undefined) team.player7 = req.player7;
        await this.teamRepo.save(team);
        return team;
    }

    async getTeams(){
        let data : TeamEntity[] = await this.teamRepo.find();
        let teamDto : teamsResponseDto[] =  await teamsMapper.lookupDto(data);
        return new Response<any>(teamDto);
    }


    async getTeamsByUserId(userId: number): Promise<Response<any>> {
        const teams = await this.teamRepo.findTeamsByUserId(userId);

        if (!teams.length) {
            throw new Error('No Team found for this users');
        }

        const teamsData: teamsResponseDto[] =  await teamsMapper.lookupDto(teams);
        return new Response<any>(teamsData);
    }

    async letsGetTeamsByTeamId(teamId: number): Promise<Response<any>> {
        const teams = await this.teamRepo.letsFindTeamsByTeamId(teamId);

        if (!teams.length) {
            throw new Error('No Team found for this');
        }

        const teamsData: teamsResponseDto[] = await teamsMapper.lookupDto(teams);
        return new Response<any>(teamsData);
    }





}
