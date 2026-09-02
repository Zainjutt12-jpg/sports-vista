import ArenaMasterEntity from "../entity/arenaMasterEntity";
import DataSourceConfig from "../config/dataSourceConfig";

export const CourtsRepository = DataSourceConfig.getRepository(ArenaMasterEntity).extend({
    async getCourts(arenaId: number): Promise<ArenaMasterEntity[]>{
        return  await this.createQueryBuilder('arena_master')
        .where('(arenaId IS NULL OR arena_master.arenaId =:arenaId)' , { arenaId }).getMany();
    }
})