import AppDataSource from "../config/dataSourceConfig";
import CacheString from "../entity/cacheStringEntity";

export const CacheStringRepository = AppDataSource.getRepository(CacheString).extend({

    fetchById(cacheStringId: number) {
        return this.createQueryBuilder("cache_string")
            .where("(:cacheStringId IS NULL OR cache_string.cacheStringId = :cacheStringId)", {cacheStringId})
            .getOne()
    },

})