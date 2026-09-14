import AppDataSource from '../config/dataSourceConfig';
import TeamEntity from '../entity/teamEntity';

export const TeamsInfoRepository = AppDataSource.getRepository(TeamEntity).extend({
    async fetchFirst(): Promise<TeamEntity | undefined> {
        return this.createQueryBuilder('playerTeams')
            .leftJoinAndSelect('playerTeams.players', 'players')
            .getOne();
    },

    async findTeams(): Promise<TeamEntity[]> {
        return this.createQueryBuilder('playerTeams')
            .leftJoinAndSelect('playerTeams.players', 'players')
            .getMany();
    },

    async letsFindTeamsByTeamId(teamId: number): Promise<TeamEntity[]> {
        return this.createQueryBuilder('playerTeams')
            .leftJoinAndSelect('playerTeams.players', 'players')
            .where('playerTeams.teamId = :teamId', { teamId })
            .getMany();
    },

    async findTeamsByUserId(userId: number): Promise<TeamEntity[]> {
        return this.createQueryBuilder('playerTeams')
            .leftJoinAndSelect('playerTeams.players', 'players')
            .where('playerTeams.createdById = :userId', { userId })
            .getMany();
    },
});
