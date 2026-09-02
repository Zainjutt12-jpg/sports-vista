import TournamentMapper from "../mapper/tournamentMapper";
import Response from "../common/responce/Responce";
import { CREATED, UPDATED } from "../common/responce/StatusCode";
import { AddTournamentRequestDto, UpdateTournamentRequestDto } from "../dto/request/tournamentRequest";
import TournamentEntity from "../entity/tournamentEntity";
import { TournamentRepository } from "../repository/tournamentRepository";
import { EntityManager } from "typeorm";
import { GetTournamentResponceDto } from "../dto/responce/tournamentResponceDto";
import PageResponse from "../common/responce/PageResponce";

export default class TournamentService {

    private tournamentRepo = TournamentRepository;

    async addTournament(request: AddTournamentRequestDto){
        let tournament : TournamentEntity;

        await this.tournamentRepo.manager.transaction(async (entityManager: EntityManager) => {
            tournament = TournamentMapper.addMapper(request);
            tournament = await entityManager.save(tournament);
        });
        return new Response<any>(CREATED);
    }

    async getTournamentsByCriteria(date: string , page : number , pageSize: number , vendorId: number , tournamentId: number , cityId: number , isActive: boolean) : Promise<Response<any>>{
        let [data , total] : any[] = await this.tournamentRepo.seachTournamentByPagination(date , page , pageSize , vendorId , tournamentId , cityId);
        let tournamentDto : GetTournamentResponceDto[] = await TournamentMapper.getCriteriaMapper(data , isActive);
        let pagination: PageResponse = new PageResponse(pageSize , page , total)
        return new Response<any>(tournamentDto , pagination);
    }

    async updateTournament(request: UpdateTournamentRequestDto , tournamentId: number) : Promise<Response<any>>{
        let tournament: TournamentEntity = await this.tournamentRepo.findOne({ where: { tournamentId } });
        if (!tournament) {
            throw new Error('Tournament does not exist');
        }
        await this.tournamentRepo?.manager.transaction(async (entityManager: EntityManager) => {
            tournament.arenaId = request.arenaId;
            tournament.hostCnic = request.hostCnic;
            tournament.hostName = request.hostName;
            tournament.isThirdParty = request.isThirdParty;
            tournament.noOfTeams = request.noOfTeams;
            tournament.registrationFee = request.registrationFee;
            tournament.runnerUpPrize = request.runnerUpPrize;
            tournament.tournamentDesc = request.tournamentDesc;
            tournament.tournamentName = request.tournamentName;
            tournament.winningPrize = request.winningPrize;
            await entityManager.save(tournament);
        });
        return new Response<any>(UPDATED);
    }
}