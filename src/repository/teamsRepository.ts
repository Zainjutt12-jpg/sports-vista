import AppDataSource from "../config/dataSourceConfig";
import TeamEntity from '../entity/teamEntity';

export const TeamsInfoRepository = AppDataSource.getRepository(TeamEntity).extend({
    async fetchFirst(): Promise<TeamEntity | undefined> {
        return this.createQueryBuilder('playerTeams').getOne();
    }  ,
      async findTeams(): Promise<TeamEntity[]> {
        return this.createQueryBuilder('playerTeams').getMany();
    } ,
       // Fetch teams by team ID (returns an array)
    async letsFindTeamsByTeamId(teamId: number): Promise<TeamEntity[]> {
        return this.createQueryBuilder('playerTeams')
            .where('(:teamId IS NULL OR playerTeams.teamId = :teamId)', { teamId })
            .getMany();  
    },

    // Fetch teams by user ID (returns an array)
    async findTeamsByUserId(userId: number): Promise<TeamEntity[]> {
        return this.createQueryBuilder('playerTeams')
            .where('(playerTeams.createdById = :userId)', { userId })
            .getMany();
    }




});
