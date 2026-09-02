import AppDataSource from "../config/dataSourceConfig";
import SportsCategoryEntityWrite from "../entity/sportsCategoryEntity";

export const SportsCategoryRepository = AppDataSource.getRepository(SportsCategoryEntityWrite).extend({
    fetchAll(){
        return this.createQueryBuilder('sports_categories').getOne();
    },

    async findCategories(): Promise<any[]> {
        const categoryLookup = await this.createQueryBuilder('sports_categories').getMany();
        return categoryLookup;
    }
})