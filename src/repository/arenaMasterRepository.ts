import AppDataSource from "../config/dataSourceConfig";
import ArenaMasterEntity from "../entity/arenaMasterEntity";

export const ArenaMasterRepository = AppDataSource.getRepository(ArenaMasterEntity).extend({
    async findArenas(areaId: number , arenaId: number , vendorId: number , page: number , pageSize: number = 10 , active: boolean): Promise<any[]> {
        let arenas = await this.createQueryBuilder('arena_master')
            .leftJoinAndSelect('arena_master.areas', 'areas')
            .leftJoinAndSelect('arena_master.cities', 'cities')
            .where('(:vendorId IS NULL OR arena_master.vendorId = :vendorId)', { vendorId })
            .andWhere('(:arenaId IS NULL OR arena_master.arenaId = :arenaId)', { arenaId })
            .andWhere('(:areaId IS NULL OR arena_master.areaId = :areaId)', { areaId })
            .andWhere('(:active IS NULL OR arena_master.active = :active)', { active });

        if(page && pageSize){
            await arenas.skip((page - 1) * pageSize).take(pageSize);
        }

        return await arenas.getManyAndCount();

    },

    async fetchArenaMaster(): Promise<any[]>{
        return this.createQueryBuilder('arena_master').getOne();
    },

    async fetchupdateArenaMaster(arenaId: any , vendorId: any): Promise<any>{
        let arenasLookup = await this.createQueryBuilder('arena_master')
        .where(':vendorId IS NULL OR arena_master.vendorId = :vendorId', { vendorId: vendorId })
        .andWhere(':arenaId IS NULL OR arena_master.arenaId = :arenaId', { arenaId: arenaId })
        .getOne();
        return arenasLookup;
    },
    
    async getAllData(): Promise<any[]> {
        return this.createQueryBuilder('arena_master').getMany();
    },

    async searchArena(arenaName: string): Promise<any[]>{
        return await this.createQueryBuilder('arena_master')
            .leftJoinAndSelect('arena_master.areas', 'areas')
            .leftJoinAndSelect('arena_master.cities', 'cities')
            .where("(arena_master.arenaName LIKE :name)", { name: `%${arenaName}%` })
            .getMany();
    }
})