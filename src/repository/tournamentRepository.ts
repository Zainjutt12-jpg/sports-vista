import AppDataSource from "../config/dataSourceConfig";
import TournamentEntity from "../entity/tournamentEntity";

export const TournamentRepository = AppDataSource.getRepository(TournamentEntity).extend({
    async fetchOne(): Promise<TournamentEntity> {
        return this.createQueryBuilder('user_info').getOne();
    },

    async seachTournamentByPagination(date: string, page: number , pageSize: number , vendorId: number , tournamentId: number , cityId: number): Promise<any> {
        let tournament = await this.createQueryBuilder('tournament')
        .leftJoin('tournament.arena', 'arena')
        .addSelect(['arena.arenaId', 'arena.arenaName', 'arena.cityId'])
        .leftJoin('tournament.vendor', 'vendor')
        .addSelect(['vendor.vendorId', 'vendor.fullName'])
        .leftJoinAndSelect('tournament.timeStart', 'timeStart')
        .leftJoinAndSelect('tournament.timeEnd', 'timeEnd')
        .leftJoinAndSelect('tournament.sportsCategory', 'sportsCategory')
        .where('(:vendorId IS NULL OR tournament.vendorId = :vendorId)' , { vendorId })
        .andWhere('(:date IS NULL OR tournament.date = :date)' , { date })
        .andWhere('(:tournamentId IS NULL OR tournament.tournamentId = :tournamentId)' , { tournamentId })
        .andWhere('(:cityId IS NULL OR arena.cityId = :cityId)' , { cityId })
        .orderBy('tournament.tournamentId', 'DESC');

        if(page && pageSize){
            await tournament.skip((page - 1) * pageSize).take(pageSize);
        }

        return await tournament.getManyAndCount();
    }
});