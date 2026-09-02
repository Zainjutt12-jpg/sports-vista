import CityEntity from "../entity/cityEntity";
import DataSourceConfig from "../config/dataSourceConfig";

export const CityRepository = DataSourceConfig.getRepository(CityEntity).extend({
    async findCities(cityId: number , provinceId: number): Promise<any[]> {
        return await this.createQueryBuilder('cities')
        .leftJoinAndSelect('cities.province', 'province')
        .where("cities.cityActive = :active", { active: 1 })
        .andWhere("(:cityD IS NULL OR cities.cityId = :cityD)", { cityD: cityId })
        .andWhere("(:provinceD IS NULL OR province.provinceId = :provinceD)", { provinceD: provinceId })
        .getMany();
    }
})