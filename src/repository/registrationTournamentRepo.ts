import { Repository } from 'typeorm';
import AppDataSource from "../config/dataSourceConfig";
import RegistrationOfTeamEntity from '../entity/registrationOfTeamsEntity';

export const RegistrationInfoRepository = AppDataSource.getRepository(RegistrationOfTeamEntity).extend({
    async fetchFirst(tournamentId: any): Promise<RegistrationOfTeamEntity | undefined> {
        return this.createQueryBuilder('tournament_registrations')
            .where('(tournament_registrations.tournamentId = :tournamentId)', { tournamentId }) 
            .leftJoinAndSelect('tournament_registrations.teams', 'team') 
            .orderBy('tournament_registrations.registrationId', 'ASC') 
            .getOne(); 
    },
});
