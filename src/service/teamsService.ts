import TeamEntity from '../entity/teamEntity';
import TeamPlayerEntity from '../entity/teamPlayerEntity';
import teamPostDto, { teamPutDto } from '../dto/request/teamsRequest';
import Response from '../common/responce/Responce';
import { CREATED } from '../common/responce/StatusCode';
import { EntityManager } from 'typeorm';
import teamsMapper from '../mapper/teamsMapper';
import { TeamsInfoRepository } from '../repository/teamsRepository';
import UserEntity from '../entity/userEntity';
import teamsResponseDto from '../dto/responce/teamsResponse';
import { ConflictException, NotFoundException } from '../common/exception/HttpException';

export default class teamsService {
    private teamRepo = TeamsInfoRepository;

    async addTeam(request: teamPostDto) {
        const user = await this.teamRepo.manager.findOne(UserEntity, { where: { userId: request.createdById } });

        if (!user) {
            throw new NotFoundException(`User with ID ${request.createdById} does not exist.`);
        }

        const existingTeam = await this.teamRepo.manager.findOne(TeamEntity, { where: { createdById: request.createdById } });

        if (existingTeam) {
            throw new ConflictException(`User with ID ${request.createdById} already has a team.`);
        }

        let team: TeamEntity;
        await this.teamRepo.manager.transaction(async (entityManager: EntityManager) => {
            team = teamsMapper.toEntity(request);
            team = await entityManager.save(team);
        });

        return new Response({ team }, undefined, CREATED);
    }

    async updateTeam(teamId: number, req: teamPutDto) {
        const team = await this.teamRepo.findOne({ where: { teamId }, relations: ['players'] });
        if (!team) {
            throw new NotFoundException('Team not found');
        }

        if (req.teamName !== undefined) team.teamName = req.teamName;
        if (req.createdBy !== undefined) team.createdBy = req.createdBy;
        if (req.createdById !== undefined) team.createdById = req.createdById;
        if (req.teamDesc !== undefined) team.teamDesc = req.teamDesc;
        if (req.teamLogo !== undefined) team.teamLogo = req.teamLogo;
        if (req.players !== undefined) {
            await this.teamRepo.manager.delete(TeamPlayerEntity, { teamId: team.teamId });
            team.players = teamsMapper.toPlayerEntities(req.players, team.teamId);
        }

        await this.teamRepo.save(team);
        return team;
    }

    async getTeams() {
        const data: TeamEntity[] = await this.teamRepo.find({
            relations: ['players'],
            order: { teamId: 'ASC', players: { rosterOrder: 'ASC' } },
        });
        const teamDto: teamsResponseDto[] = await teamsMapper.lookupDto(data);
        return new Response(teamDto);
    }

    async getTeamsByUserId(userId: number): Promise<Response<teamsResponseDto[]>> {
        const teams = await this.teamRepo.findTeamsByUserId(userId);

        if (!teams.length) {
            throw new NotFoundException('No team found for this user');
        }

        const teamsData: teamsResponseDto[] = await teamsMapper.lookupDto(teams);
        return new Response(teamsData);
    }

    async letsGetTeamsByTeamId(teamId: number): Promise<Response<teamsResponseDto[]>> {
        const teams = await this.teamRepo.letsFindTeamsByTeamId(teamId);

        if (!teams.length) {
            throw new NotFoundException('No team found for this team ID');
        }

        const teamsData: teamsResponseDto[] = await teamsMapper.lookupDto(teams);
        return new Response(teamsData);
    }
}
