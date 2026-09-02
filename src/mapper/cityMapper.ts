import CityResponceDto from "../dto/responce/cityResponceDto";
import CityEntity from "../entity/cityEntity";

export default class CityMapper {
    public static lookupDto(city?: CityEntity[]): CityResponceDto[] {
        let cityData : CityResponceDto[] = [];
        city.forEach((d: any)=>{
            cityData.push({
                cityId: d?.cityId,
                cityName: d?.cityName,
                provinceId: d?.province?.provinceId,
                provinceName: d?.province?.provinceName
            })
        })
        return cityData;
    }
}