import AreaEntity from "../entity/areaEntity";
import DataSourceConfig from "../config/dataSourceConfig";

export const AreaRepository = DataSourceConfig.getRepository(AreaEntity).extend({

    async findAreas(cityId: number): Promise<any[]> {
        const areasLookup = await this.createQueryBuilder('areas')
        .leftJoinAndSelect('areas.city', 'city')
        .where('areas.cityId = :cityId', { cityId })
        .getMany();
        return areasLookup;
    }
})