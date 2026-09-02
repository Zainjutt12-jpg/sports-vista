import StatusEntity from "../entity/statusEntity";
import AppDataSource from "../config/dataSourceConfig";

export const StatusRepository = AppDataSource.getRepository(StatusEntity).extend({
    fetchAll(){
        return this.createQueryBuilder('sports_categories').getManyAndCount();
    },
})